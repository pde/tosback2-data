sfHover=function(){var sfEls=jQuery("#guide-dropdown LI");for(var i=0;i<sfEls.length;i++){sfEls[i].onmouseover=function(){this.className+=" sfhover";}
sfEls[i].onmouseout=function(){this.className=this.className.replace(new RegExp(" sfhover\\b"),"");}}}
if(window.attachEvent)window.attachEvent("onload",sfHover);;function showdiv(div){jQuery("#category"+ div).show();jQuery("#cat"+ div).addClass("current");}
function hidediv(divarray){for(var x=0;x<divarray.length;x++){jQuery("#category"+ divarray[x]).hide();jQuery("#cat"+ divarray[x]).removeClass("current");}}
jQuery(document).ready(function(){jQuery("#cat1").click(function(){showdiv(1);hidediv([2,3,4,5,6,7,8,9]);})});jQuery(document).ready(function(){jQuery("#cat2").click(function(){showdiv(2);hidediv([1,3,4,5,6,7,8,9]);})});jQuery(document).ready(function(){jQuery("#cat3").click(function(){showdiv(3);hidediv([1,2,4,5,6,7,8,9]);})});jQuery(document).ready(function(){jQuery("#cat4").click(function(){showdiv(4);hidediv([1,2,3,5,6,7,8,9]);})});jQuery(document).ready(function(){jQuery("#cat5").click(function(){showdiv(5);hidediv([1,2,3,4,6,7,8,9]);})});jQuery(document).ready(function(){jQuery("#cat6").click(function(){showdiv(6);hidediv([1,2,3,4,5,7,8,9]);})});jQuery(document).ready(function(){jQuery("#cat7").click(function(){showdiv(7);hidediv([1,2,3,4,5,6,8,9]);})});jQuery(document).ready(function(){jQuery("#cat8").click(function(){showdiv(8);hidediv([1,2,3,4,5,6,7,9]);})});jQuery(document).ready(function(){jQuery("#cat9").click(function(){showdiv(9);hidediv([1,2,3,4,5,6,7,8]);})});;jQuery(document).ready(function(){jQuery('#uncheck').click(function(){jQuery('input:checkbox').removeAttr('checked');});jQuery('#skyrightside iframe').attr('width','120');jQuery("body").removeClass("no-js");jQuery('#edit-comment-body-und-0-format').hide();jQuery('#edit-comment-body-und-0-format--3').hide();jQuery('#edit-field-inappropriate-und').hide();jQuery('#profile-settings').click(function(){jQuery('#edit-profile').show();jQuery('#edit-email').hide();jQuery('#edit-account').hide();jQuery('#profile-settings').addClass('black-no-link');jQuery('#account-settings').removeClass('black-no-link');jQuery('#email-settings').removeClass('black-no-link');});jQuery('#account-settings').click(function(){jQuery('#edit-account').show();jQuery('#edit-profile').hide();jQuery('#edit-email').hide();jQuery('#account-settings').addClass('black-no-link');jQuery('#profile-settings').removeClass('black-no-link');jQuery('#email-settings').removeClass('black-no-link');});jQuery('#email-settings').click(function(){jQuery('#edit-email').show();jQuery('#edit-profile').hide();jQuery('#edit-account').hide();jQuery('#account-settings').removeClass('black-no-link');jQuery('#profile-settings').removeClass('black-no-link');jQuery('#email-settings').addClass('black-no-link');});var localHash=window.location.hash
if(localHash){if(localHash=='#profile'){jQuery('#profile-settings').click();}else if(localHash=='#account'){jQuery('#account-settings').click();}else if(localHash=='#email'){jQuery('#email-settings').click();}}
jQuery('#change-password-button').click(function(e){e.preventDefault();jQuery('#change-password').slideDown(400);jQuery('#change-password-button').hide();});jQuery("#edit-search-block-form--2").keyup(function(){if((!jQuery.browser.msie)||(jQuery.browser.msie&&jQuery.browser.version!="10.0")){jQuery("#x").fadeIn();}
if(jQuery.trim(jQuery("#edit-search-block-form--2").val())==""){jQuery("#x").fadeOut();}});jQuery(".ie8 #edit-search-block-form--2, .ie7 #edit-search-block-form--2").keyup(function(){jQuery("#edit-search-block-form--2").addClass("grey-head");jQuery("#edit-search-block-form--2").removeClass("search-grey");});var active=document.activeElement;var $=jQuery;$("input, textarea").each(function(){if($(this).val()==""&&$(this).attr("placeholder")!=""){$(".ie8 #edit-search-block-form--2, .ie7 #edit-search-block-form--2").removeClass("grey-head");$(".ie8 #edit-search-block-form--2, .ie7 #edit-search-block-form--2").addClass("search-grey");$(this).val($(this).attr("placeholder"));$(this).focus(function(){if($(this).val()==$(this).attr("placeholder"))$(this).val("");});$(this).blur(function(){if($(this).val()=="")$(this).val($(this).attr("placeholder"));});}});jQuery("#x").click(function(){jQuery("#edit-search-block-form--2").val(jQuery(this).attr('placeholder')).addClass('hasPlaceholder');jQuery(':text').blur();jQuery(this).hide();jQuery("#edit-search-block-form--2").focus();jQuery(".ie8 #edit-search-block-form--2, .ie7 #edit-search-block-form--2").removeClass("grey-head");jQuery(".ie8 #edit-search-block-form--2, .ie7 #edit-search-block-form--2").addClass("search-grey");});url=window.location.pathname;if(!(typeof searchedKeyword==='undefined')&&url.match(/keyword/)){jQuery('#edit-search-block-form--2').val(searchedKeyword).removeClass("search-grey");if((!jQuery.browser.msie)||(jQuery.browser.msie&&jQuery.browser.version!="10.0")){jQuery("#x").fadeIn();}}
jQuery("#comments a[id^='ajax_comment_inappropriate_'], #activity a[id^='ajax_comment_inappropriate_']").click(function(){id=this.getAttribute('id');match=id.match(/\d+$/);commentId=parseInt(match);data='commentId='+commentId+'&form=inappropriateComment';successFunction=function(response){if(response.status){jQuery('.ajax_comment_content_'+commentId).text('Comment pending approval.');jQuery('.ajax_comment_hide_'+commentId).hide();}};fn_ajax_call(data,successFunction,'fn_general')});});function getMetaDescription(){metas=document.getElementsByTagName("meta");description=false;jQuery(metas).each(function(index,value){if(jQuery(value).attr('name')=='description'){description=jQuery(value).attr('content');}});return description;}
function signupWithAction(action,id,redirect,bundle){data='action='+action+'&id='+id+'&form=signupWithAction';if(typeof redirect!='undefined'){data+='&redirect='+redirect;}
if(typeof bundle!='undefined'){data+='&bundle='+bundle;}
successFunction=function(response){if(response.status){}};fn_ajax_call(data,successFunction,'fn_user');signupPopup();}
function signupPopup(){if(typeof ltIE9=='undefined'){jQuery.colorbox.close();}
setTimeout(function(){jQuery.colorbox({href:"/colorbox/form/user_register_form",initialWidth:"100px",initialHeight:"100px"});},500);}
function loginWithAction(action,id,redirect){data='action='+action+'&form=loginWithAction'+'&redirect='+redirect;successFunction=function(response){};fn_ajax_call(data,successFunction,'fn_user');loginPopup();}
function loginPopup(){if(typeof ltIE9=='undefined'){jQuery.colorbox.close();}
setTimeout(function(){jQuery.colorbox({href:"/colorbox/form/user_login",initialWidth:"100px",initialHeight:"100px"});},500);}
function loadPopup(url){jQuery.colorbox.close();setTimeout(function(){jQuery.colorbox({href:url,initialWidth:"100px",initialHeight:"100px",scrolling:false});},500);}
function iKnowThisTechnique(techniqueId,techniqueTitle){data='techniqueId='+techniqueId+'&form=iKnowThisTechnique';techniqueClass=techniqueTitle.replace(/\s/g,'-');techniqueClass=techniqueClass.toLowerCase();techniqueClass='technique-'+techniqueClass;successFunction=function(response){if(response.status){technique=jQuery('.'+techniqueClass);technique.each(function(index,value){tecniqueWrapper=jQuery(this);textReplacement=tecniqueWrapper.find('span.wordReplacement').text();tecniqueWrapper.replaceWith(textReplacement);});}};fn_ajax_call(data,successFunction,'fn_technique');}
function newsletterSubscription(element){checkboxStatus=0;if(jQuery(element).is(':checked')){checkboxStatus=1;}
data='form=newsletterSubscription&element='+element.id+'&status='+checkboxStatus;successFunction=function(response){if(response.status){}};fn_ajax_call(data,successFunction,'fn_user');}
function getUrlVars(urlVar){hashes=window.location.href.slice(window.location.href.indexOf('?')+ 1).split('&');urlVars=new Array();for(var i=0;i<hashes.length;i++)
{hash=hashes[i].split('=');urlVars[hash[0]]=hash[1];}
if(urlVar){if(urlVars[urlVar]){return urlVars[urlVar];}else{return'';}}else{return urlVars;}}
var refreshBannersTimer;function refreshBanners(count){if(refreshBannersTimer){return;}
doRefreshBanners();}
function doRefreshBanners(){if(googletag.pubads){googletag.pubads().refresh([slot_rectangle_1]);googletag.pubads().refresh([slot_skyscraper_1]);refreshBannersTimer=setTimeout(clearDelay,5000);}}
function clearDelay(){clearTimeout(refreshBannersTimer);refreshBannersTimer=null;}
function omPGClickEvent_foodfight(){if(typeof _gaq!='undefined'){_gaq.push(['_trackPageview',location.pathname]);}
if(typeof s!='undefined'){vars=new Object();vars.pageName=s.pageName;s.t(vars);}}
function omPGClickEvent(id,type){if(typeof type=='undefined'){type='slide';}
_gaq.push(['_trackPageview',location.pathname+'?'+ type+'='+ id]);if(typeof s!='undefined'){vars=new Object();vars.pageName=s.pageName+'?'+ type+'='+ id;s.t(vars);}}
jQuery(function(){jQuery('#changePasswordButton').click(function(){changePassword();});});function changePassword(){pass1=jQuery('#pass1').val();pass2=jQuery('#pass2').val();data='pass1='+pass1+'&pass2='+pass2+'&form=changePassword';successFunction=function(response){if(response.status){}};fn_ajax_call(data,successFunction,'fn_user');}
function updateUsersWhoLoveThisBlock(nid){data='form=updateUsersWhoLoveThisBlock';if(!(typeof nid==='undefined')){data+='&nid='+nid;}else{url=window.location.pathname;data+='&url='+url;}
successFunction=function(response){if(response.status){jQuery('#loves-this-ajax-container').html(response.html);}};fn_ajax_call(data,successFunction,'fn_loved');}
function signup(){sendOmnitureTracking('event43');data=jQuery('#user-registration').serialize();data+='&form=signup';successFunction=function(response){if(response.status){jQuery('#reg-step1, #social_tabs').hide();jQuery('#reg-step2').show();food.validateBio();jQuery.colorbox.resize();jQuery('#page-title').text('What else should we know?');}};fn_ajax_call(data,successFunction,'fn_user');}
function disableAccount(){data='form=disableAccount';successFunction=function(response){if(response.status){window.location.href="/";}else{alert('Try again later..');}}
fn_ajax_call(data,successFunction,'fn_user');}
function commentLoad(page,opt){data='opt='+opt+'&page='+page+'&form=commentPage';jQuery('#retrieved-data').html("<img src='/sites/all/themes/foodnetwork/images/ajax-loader.gif' />");successFunction=function(response){if(response){jQuery('#retrieved-data').html(response);}else{}}
fn_ajax_call(data,successFunction,'fn_general','html');}
function reportComment(id){data='id='+id+'&form=reportComment';successFunction=function(response){if(response){jQuery('#comment'+id).html(response);}else{}}
fn_ajax_call(data,successFunction,'fn_general','html');}
function deleteComment(id){data='id='+id+'&form=deleteComment';successFunction=function(response){if(response){jQuery('#comment'+id).html(response);}else{}}
fn_ajax_call(data,successFunction,'fn_general','html');}
function publishComment(id){data='id='+id+'&form=publishComment';successFunction=function(response){if(response){jQuery('#comment'+id).html(response);}else{}}
fn_ajax_call(data,successFunction,'fn_general','html');}
function removeComment(id){data='id='+id+'&form=removeComment';successFunction=function(response){if(response){jQuery('#comment'+id).html(response);}else{}}
fn_ajax_call(data,successFunction,'fn_general','html');}
function flag_video_as_watched(videoId){data='videoId='+videoId+'&form=updateVideoWatched';successFunction=function(response){if(response){}}
fn_ajax_call(data,successFunction,'fn_video');}
function fn_ajax_call(data,successFunction,module,dType){if(!dType){dType='json';}
switch(module){case'fn_general':url='/sites/all/modules/custom/fn_general/fn_general_ajax.inc.php';break;case'fn_loved':url='/sites/all/modules/custom/fn_loved/fn_loved_ajax.inc.php';break;case'fn_technique':url='/sites/all/modules/custom/fn_technique/fn_technique_ajax.inc.php';break;case'fn_user':url='/sites/all/modules/custom/fn_user/fn_user_ajax.inc.php';break;case'fn_video':url='/sites/all/modules/custom/fn_video/fn_video_ajax.inc.php';break;}
jQuery.ajax({url:url,type:'POST',dataType:dType,data:data,success:successFunction});}
function skipForm(popup,url){if(popup==true){if(url){window.top.location=url;}else{window.top.location='/user';}}else{if(url){window.location=url;}else{window.location='/user';}}}
var $=jQuery;var uniqueUN
var uniquePW
var popWin
var whichPop
food={buildArray:new Array(),init:function(){this.hideStart();this.noFbLogin();this.unPreview();this.emailPreview();this.isValid();this.generalSignUp();this.forgotPassword();this.signIn();this.connectWithFacebook();this.connectWithTwitter();},editProfile:function(){food.unPreview();food.generalSignUp();food.validateBio();},hideStart:function(){$('.jshide').hide();},firstCheck:function(){$('#name,#mail').each(function(i,el){var val=$(this).val()
if(val){$(this).keyup();}});},generalSignUp:function(){var el=jQuery('#bio'),counter=jQuery('#bio-desc');food.charLimit(el,counter);var twitter=jQuery('#twitterName'),tw_preview=twitter.parent().find('small .preview');food.textPreview(twitter,tw_preview);twitter.focus(function(){tw_preview.addClass('typing');}).keyup(function(e){food.textPreview(twitter,tw_preview);}).blur(function(){tw_preview.removeClass('typing');});},checkPopUp:function(){if(popWin.closed){if(whichPop=='facebook'){}else if(whichPop=='twitter'){}
food.checkPopulated();}else{setTimeout("food.checkPopUp(whichPop);",500);}},checkPopulated:function(){sendOmnitureTracking('event42');$('#sign-up-info').show(1,function(){jQuery.colorbox.resize();$("#user-registration").find('input').not('input[type=submit]').each(function(i,e){if($(e).val().length>0){$("#user-registration").validate().element(e);}});pageTitle="You're almost there";if(whichPop=='twitter'){if(jQuery('#name').val()){jQuery('#page-title').text(pageTitle);}}else if(whichPop=='facebook'){if(jQuery('#mail').val()){jQuery('#page-title').text(pageTitle);}}});$('#reg-step1').show();},noFbLogin:function(){$('.social-signin .toggle').bind('click',function(e){e.preventDefault();var id=$(this).attr('id');$('#sign-up-info').toggle();if(id=='showNoSocialLogIn'){$(this).parent().hide();}
else if(id=='show_social'){$('#social_tabs').show();$('#showNoSocialLogIn').parent().show();}
else if(id=='show_signin'){$('#forgottenPassword').hide();$('#social_tabs').show();$('#sign-in-form').show();}
jQuery.colorbox.resize();});var p=window.location.pathname,h=window.location.hash;if((p=='/signup')){$('#sign-in-form').hide();var title=$('#sign-in-form .action a:first').attr('title');$('#page-title').text(title);}else if((p=='/login')){$('#reg-step1, #reg-step2, #forgottenPassword').hide();var title=$('#reg-step1 .action a:first').attr('title');$('#page-title').text(title);}
$('.action a').live('click',function(e){e.preventDefault();var id=$(this).attr("id");if(id=='showSignIn'){$('#reg-step1').hide();$('#sign-in-form').show();}else if(id=='showStep1'){$('#reg-step1').show();$('#sign-in-form').hide();}else if(id=='skipForm'){skipForm();}
var title=$(this).attr("title");$('#page-title').text(title);jQuery.colorbox.resize();});},forgotPassword:function(){$('.social-signin .toggle').bind('click',function(e){e.preventDefault();var id=$(this).attr('id'),title=$(this).attr('title');if(id=='fg_pw'){$('#sign-in-form').hide();$('#social_tabs').hide();$('#forgottenPassword').show();$('#page-title').text(title);}
$.colorbox.resize();});var p=window.location.pathname,h=window.location.hash;if((p=='/signup')){$('#forgottenPassword').hide();var title=$('#sign-in-form .action a:first').attr('title');$('#page-title').text(title);}else if((p=='/login')){$('#reg-step1, #reg-step2, #forgottonPassword').hide();var title=$('#reg-step1 .action a:first').attr('title');$('#sign-in-form').show();$('#page-title').text(title);}
$('.action a').click(function(e){e.preventDefault();target=$(this).attr("href");title=$(this).attr("title");$('.form-state').hide();$(target).show();$('#page-title').text(title);});},showStatus:function(status_el,msg,a){var status='status '+ a
if(a!='good'){status_el.attr('class','').show().addClass(status).text(msg);}else{this.hideStatus();}},hideStatus:function(){var status='status'
$('.status').delay(1000).fadeTo(400,0,function(){$(this).hide().attr('class','').addClass(status).text('').css({'opacity':1});});},unPreview:function(){var el=$('#name'),preview=$('#un-preview');food.textPreview(el,preview);el.parent().append('<span class="status"></span>');var status_el=el.parent().find('.status');status_el.hide();el.focus(function(){preview.addClass('typing');}).keyup(function(e){e.preventDefault();food.textPreview(el,preview);}).keypress(function(e){if(e.which===32){return false;}}).blur(function(){preview.removeClass('typing');});},emailPreview:function(){var el=$('#mail');el.parent().append('<span class="status"></span>');var status_el=el.parent().find('.status');status_el.hide();el.keypress(function(e){if(e.which===32){return false;}});},isValid:function(){$("#user-register-form").validate({onkeyup:false,errorElement:"span",errorPlacement:function(error,element){error.appendTo(element.parent());},rules:{mail:{required:true,email:true,remote:{url:"/sites/all/modules/custom/fn_user/fn_user_ajax.inc.php",type:"POST",dataType:'json',data:{mail:function(){return $("#mail").val();},form:'checkEmailAvailability'}}},},messages:{mail:{required:'Please enter your email address.',email:'Please check your email address.',remote:'This email address is already in use.'},},success:function(label){},submitHandler:function(){if(typeof window.userRegistrationFormSubmitted!="undefined"){return false;}
window.userRegistrationFormSubmitted=true;form.submit();}});},accountSettings:function(){$("#edit-account form").validate({onkeyup:false,errorElement:"span",errorPlacement:function(error,element){error.appendTo(element.parent());},rules:{display_name:{required:true,minlength:3,maxlength:30,remote:{url:"/sites/all/modules/custom/fn_user/fn_user_ajax.inc.php",type:"POST",dataType:'json',data:{name:function(){return $("#display_name").val();},form:'checkDisplayName'},complete:function(data){if(data.responseText!="true"){$('#un-preview').attr('class','sad');}else{$('#un-preview').attr('class','good');}}}},name:{required:true,regex:"^[A-Za-z][A-Za-z0-9-]+$",minlength:3,maxlength:30,remote:{url:"/sites/all/modules/custom/fn_user/fn_user_ajax.inc.php",type:"POST",dataType:'json',data:{name:function(){return $("#name").val();},form:'checkUsernameAvailability'},complete:function(data){if(data.responseText!="true"){$('#un-preview').attr('class','sad');}else{$('#un-preview').attr('class','good');}}}},mail:{required:true,email:true,remote:{url:"/sites/all/modules/custom/fn_user/fn_user_ajax.inc.php",type:"POST",dataType:'json',data:{mail:function(){return $("#mail").val();},form:'checkEmailAvailability'}}},pass1:{minlength:6},pass2:{equalTo:"#pass1"}},messages:{display_name:{required:'Choose a display name.',minlength:function(x){return'Please enter '+ x+' or more characters.'},maxlength:function(x){return'You have entered too many characters ('+ x+' max).'}},name:{required:'Please choose a user name.',regex:'User name has to start with a letter can only contain alphanumerics or dashes.',minlength:function(x){return'Please enter '+ x+' or more characters.'},maxlength:function(x){return'You have entered too many characters ('+ x+' max).'},remote:'This user name is already taken.'},mail:{required:'Please enter your email address.',email:'Please check your email address.',remote:'This email address is already in use.'},pass1:{minlength:function(x){return'Your password should be '+ x+' or more characters.'}},pass2:{equalTo:'Your passwords do not match.'}},submitHandler:function(form){form.submit();}});$('#closeToggle, #close-acc-toggle .cancel').click(function(e){e.preventDefault();$('#close-acc-toggle').toggle();});},charLimit:function(el,counter){var cap=el.attr('maxlength');var a=el.val().length
if((a<=cap)&&(a!=0)){counter.text(cap- a);counter.removeClass('sad').addClass('happy');}else if(a>=cap){counter.text(a- cap);counter.removeClass('happy').addClass('sad');}
el.keydown(function(){var b=el.val().length
counter.text(cap- b);if(b<=cap){counter.removeClass('sad').addClass('happy');}else{counter.removeClass('happy').addClass('sad');}}).blur(function(e){var b=el.val().length
counter.text(cap- b);if(b<=cap){counter.removeClass('sad').addClass('happy');}else{counter.removeClass('happy').addClass('sad');}});},charLimitMessage:function(el,characterlimit){var messageLimitCap=el.attr('maxlength');el.attr('maxlength',messageLimitCap+10);var a=el.val().length
if((a<=messageLimitCap)&&(a!=0)){}else if(a>=messageLimitCap){characterlimit.text('Comments can only be '+ messageLimitCap+' characters long');}
el.blur,el.keydown(function(){var b=el.val().length
if(b>=messageLimitCap){characterlimit.text('Comments can only be '+ messageLimitCap+' characters long');}else if(b<messageLimitCap){characterlimit.text('');}});},textPreview:function(watching,output){def=watching.defaultValue,prev_def='______________'
var un=watching.val();if(un==def){un=prev_def}
output.text(un);},validateBio:function(){$('#user-details').validate({onfocusout:false,onkeyup:false,errorElement:"span",errorPlacement:function(error,element){error.appendTo(element.parent());},rules:{bio:{rangelength:[1,140]}},messages:{bio:{rangelength:function(range,input){return['You are only allowed between ',range[0],' and ',range[1],' You have typed ',$(input).val().length,' characters'].join('');}}},success:function(label){label.remove();}});},signIn:function(){$("#user-login").validate({onkeyup:false,errorElement:"span",errorPlacement:function(error,element){error.appendTo(element.parent());},rules:{name:{required:true},pass:{required:true}},messages:{name:{required:'Please enter your email address.'},pass:{required:'Please enter your password.'}}});$('#edit-name').keypress(function(e){if(e.which===32){return false;}});},forgottenPassword:function(){$("#user-pass").validate({onkeyup:false,errorElement:"span",errorPlacement:function(error,element){error.appendTo(element.parent());},rules:{name:{required:{depends:function(a){return true;}},email:true}},messages:{name:{required:'You need to enter an email address.',email:'Your email address is invalid.'}},success:function(label){}});},resetPass:function(){$("#reset-password").validate({onkeyup:false,errorElement:"span",errorPlacement:function(error,element){error.appendTo(element.parent());},rules:{newpass:{required:true},confirmnewpass:{required:true,equalTo:"#newpass"}},messages:{confirmnewpass:{equalTo:'Your passwords do not match.'}},success:function(label){label.remove();}});},commentCount:function(){var el=jQuery('#comment-form textarea');el.parents('form').prepend('<p id="commentCount" class="characterlimit float-r"></p>');var characterlimit=jQuery('#commentCount');el.attr('maxlength',2000);food.charLimitMessage(el,characterlimit);}};jQuery(document).ready(function(){jQuery(".colorbox-signup").each(function(){if((navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))){var iw=500,h=false,t=100,l=0}else{var iw=500,h=402,t=false,l=false}
var href=jQuery(this).attr('href');jQuery(this).colorbox({href:href+' #main-wrapper',transition:'fade',initialWidth:50,initialHeight:50,opacity:0.75,scrolling:false,fastIframe:false,innerWidth:iw,height:h,top:t,left:l,onComplete:function(){$=jQuery
food.init(food);$.colorbox.resize();$('#user-login').attr('action',href);sendOmnitureTracking('event41');}});});});function sendOmnitureTracking(key)
{omni=s_gi('scrippsfoodtvuk');omni.events=key;omni.tl();}
jQuery(document).ready(function(){var accept_cookie_name='FN_UK_cookie_accept';if(!jQuery.cookie(accept_cookie_name)){jQuery(".cookie-warning").once("cookie-warning",function(){jQuery(this).toggle();jQuery(this).find("input").click(function(){jQuery("#cookie-div").toggle();});jQuery.cookie(accept_cookie_name,true,{path:'/',expires:365*10});});}});function addPopupEvents(){jQuery(".colorbox-standard").click(function(){ulTopElement=jQuery(this).parents('ul')[1];showTitle=jQuery(ulTopElement).find('li.fn_epg_title a.colorbox-standard').text();if((navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))){var iw=500,h=false,t=100,l=0}else{var iw=500,h=402,t=false,l=false}
var href=jQuery(this).attr('href');jQuery(this).colorbox({href:href+' #main-wrapper',transition:'fade',initialWidth:50,initialHeight:50,opacity:0.75,scrolling:false,speed:10,innerWidth:iw,height:h,top:t,left:l,onLoad:function(){omPGClickEvent(encodeURIComponent(showTitle.replace(/[^\w]/gi,'')),'EPG-TvListing');},onComplete:function(){jQuery('div#main-wrapper').css('min-height','200px');jQuery.colorbox.resize();}});});}
function FNCommentLogin(eventObj){alert('login clicked');}
function refreshPageSkinSkyscraper(){slot_skyscraper_1.clearTargeting();slot_skyscraper_1.setTargeting("pageskin","false");googletag.pubads().refresh([slot_skyscraper_1]);}
function fn_load_brandscape(brandscape_image,thirdparty_impression_track,thirdparty_click_url,click_track){var patt=/_pushdown_1/gi;for(var i=0;i<parent.frames.length;i++)
{if(patt.test(parent.frames[i].name))
{brandscape_image=parent.frames[i].fn_brandscape_image;thirdparty_impression_track=parent.frames[i].fn_thirdparty_impression_track;thirdparty_click_url=parent.frames[i].fn_thirdparty_click_url;click_track=parent.frames[i].fn_click_track;break;}}
var focused=true;top.window.onfocus=function(){setTimeout(function(){focused=true;},300);};top.window.onblur=function(){focused=false;};if(brandscape_image)
{if(thirdparty_impression_track)
{impression_image=new Image();impression_image.src=thirdparty_impression_track;}
top.document.getElementById('fn-background').style.backgroundImage='url('+ brandscape_image+')';if(thirdparty_click_url)
{top.document.getElementById('fn-background').onclick=function(event)
{if(focused&&event.target.id=='fn-background')
{if(click_track)
{click_image=new Image();click_image.src=click_track;}
window.open(thirdparty_click_url,'_blank');}}}}};function ismobile(){return(window.navigator&&window.navigator.userAgent&&(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)));}
(function($){Drupal.behaviors.mobile={attach:function(context,settings){if(ismobile()){if(window.FN_Gallery)FN_Gallery.persistent_interface_mode=true;}}};})(jQuery);;(function($){$.cookie=function(key,value,options){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(value))||value===null||value===undefined)){options=$.extend({},options);if(value===null||value===undefined){options.expires=-1;}
if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+ days);}
value=String(value);return(document.cookie=[encodeURIComponent(key),'=',options.raw?value:encodeURIComponent(value),options.expires?'; expires='+ options.expires.toUTCString():'',options.path?'; path='+ options.path:'',options.domain?'; domain='+ options.domain:'',options.secure?'; secure':''].join(''));}
options=value||{};var decode=options.raw?function(s){return s;}:decodeURIComponent;var pairs=document.cookie.split('; ');for(var i=0,pair;pair=pairs[i]&&pairs[i].split('=');i++){if(decode(pair[0])===key)return decode(pair[1]||'');}
return null;};})(jQuery);;(function($){$.tiny=$.tiny||{};$.tiny.carousel={options:{start:1,display:1,axis:'x',controls:true,pager:false,interval:false,intervaltime:3000,rewind:false,animation:true,duration:1000,callback:null}};$.fn.tinycarousel=function(options){var options=$.extend({},$.tiny.carousel.options,options);this.each(function(){$(this).data('tcl',new Carousel($(this),options));});return this;};$.fn.tinycarousel_start=function(){$(this).data('tcl').start();};$.fn.tinycarousel_stop=function(){$(this).data('tcl').stop();};$.fn.tinycarousel_move=function(iNum){$(this).data('tcl').move(iNum-1,true);};function Carousel(root,options){var oSelf=this;var oViewport=$('.viewport:first',root);var oContent=$('.overview:first',root);var oPages=oContent.children();var oBtnNext=$('.next:first',root);var oBtnPrev=$('.prev:first',root);var oPager=$('.pager:first',root);var iPageSize,iSteps,iCurrent,oTimer,bPause,bForward=true,bAxis=options.axis=='x';function initialize(){iPageSize=bAxis?$(oPages[0]).outerWidth(true):$(oPages[0]).outerHeight(true);var iLeftover=Math.ceil(((bAxis?oViewport.outerWidth():oViewport.outerHeight())/(iPageSize*options.display))-1);iSteps=Math.max(1,Math.ceil(oPages.length/options.display)- iLeftover);iCurrent=Math.min(iSteps,Math.max(1,options.start))-2;oContent.css(bAxis?'width':'height',(iPageSize*oPages.length));oSelf.move(1);setEvents();return oSelf;};function setEvents(){if(options.controls&&oBtnPrev.length>0&&oBtnNext.length>0){oBtnPrev.click(function(){oSelf.move(-1);return false;});oBtnNext.click(function(){oSelf.move(1);return false;});}
if(options.interval){root.hover(oSelf.stop,oSelf.start);}
if(options.pager&&oPager.length>0){$('a',oPager).click(setPager);}};function setButtons(){if(options.controls){oBtnPrev.toggleClass('prevdisable',!(iCurrent>0));oBtnNext.toggleClass('nextdisable',!(iCurrent+1<iSteps));}
if(options.pager){var oNumbers=$('.pagenum',oPager);oNumbers.removeClass('active');$(oNumbers[iCurrent]).addClass('active');}};function setPager(oEvent){if($(this).hasClass('pagenum')){oSelf.move(parseInt(this.rel),true);}
return false;};function setTimer(){if(options.interval&&!bPause){clearTimeout(oTimer);oTimer=setTimeout(function(){iCurrent=iCurrent+1==iSteps?-1:iCurrent;bForward=iCurrent+1==iSteps?false:iCurrent==0?true:bForward;oSelf.move(bForward?1:-1);},options.intervaltime);}};this.stop=function(){clearTimeout(oTimer);bPause=true;};this.start=function(){bPause=false;setTimer();};this.move=function(iDirection,bPublic){iCurrent=bPublic?iDirection:iCurrent+=iDirection;if(iCurrent>-1&&iCurrent<iSteps){var oPosition={};oPosition[bAxis?'left':'top']=-(iCurrent*(iPageSize*options.display));oContent.animate(oPosition,{queue:false,duration:options.animation?options.duration:0,complete:function(){if(typeof options.callback=='function')
options.callback.call(this,oPages[iCurrent],iCurrent);}});setButtons();setTimer();}};return initialize();};})(jQuery);;(function($,undefined){$.tools=$.tools||{version:'1.2.6'};var instances=[],tool,KEYS=[75,76,38,39,74,72,40,37],LABELS={};tool=$.tools.dateinput={conf:{format:'mm/dd/yy',selectors:false,yearRange:[-5,5],lang:'en',offset:[0,0],speed:0,firstDay:0,min:undefined,max:undefined,trigger:0,toggle:0,editable:0,css:{prefix:'cal',input:'date',root:0,head:0,title:0,prev:0,next:0,month:0,year:0,days:0,body:0,weeks:0,today:0,current:0,week:0,off:0,sunday:0,focus:0,disabled:0,trigger:0}},localize:function(language,labels){$.each(labels,function(key,val){labels[key]=val.split(",");});LABELS[language]=labels;}};tool.localize("en",{months:'January,February,March,April,May,June,July,August,September,October,November,December',shortMonths:'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',days:'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',shortDays:'Sun,Mon,Tue,Wed,Thu,Fri,Sat'});function dayAm(year,month){return new Date(year,month+ 1,0).getDate();}
function zeropad(val,len){val=''+ val;len=len||2;while(val.length<len){val="0"+ val;}
return val;}
var Re=/d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g,tmpTag=$("<a/>");function format(date,fmt,lang){var d=date.getDate(),D=date.getDay(),m=date.getMonth(),y=date.getFullYear(),flags={d:d,dd:zeropad(d),ddd:LABELS[lang].shortDays[D],dddd:LABELS[lang].days[D],m:m+ 1,mm:zeropad(m+ 1),mmm:LABELS[lang].shortMonths[m],mmmm:LABELS[lang].months[m],yy:String(y).slice(2),yyyy:y};var ret=fmt.replace(Re,function($0){return $0 in flags?flags[$0]:$0.slice(1,$0.length- 1);});return tmpTag.html(ret).html();}
function integer(val){return parseInt(val,10);}
function isSameDay(d1,d2){return d1.getFullYear()===d2.getFullYear()&&d1.getMonth()==d2.getMonth()&&d1.getDate()==d2.getDate();}
function parseDate(val){if(val===undefined){return;}
if(val.constructor==Date){return val;}
if(typeof val=='string'){var els=val.split("-");if(els.length==3){return new Date(integer(els[0]),integer(els[1])-1,integer(els[2]));}
if(!(/^-?\d+$/).test(val)){return;}
val=integer(val);}
var date=new Date;date.setDate(date.getDate()+ val);return date;}
function Dateinput(input,conf){var self=this,now=new Date,yearNow=now.getFullYear(),css=conf.css,labels=LABELS[conf.lang],root=$("#"+ css.root),title=root.find("#"+ css.title),trigger,pm,nm,currYear,currMonth,currDay,value=input.attr("data-value")||conf.value||input.val(),min=input.attr("min")||conf.min,max=input.attr("max")||conf.max,opened,original;if(min===0){min="0";}
value=parseDate(value)||now;min=parseDate(min||new Date(yearNow+ conf.yearRange[0],1,1));max=parseDate(max||new Date(yearNow+ conf.yearRange[1]+ 1,1,-1));if(!labels){throw"Dateinput: invalid language: "+ conf.lang;}
if(input.attr("type")=='date'){var original=input.clone(),def=original.wrap("<div/>").parent().html(),clone=$(def.replace(/type/i,"type=text data-orig-type"));if(conf.value)clone.val(conf.value);input.replaceWith(clone);input=clone;}
input.addClass(css.input);var fire=input.add(self);if(!root.length){root=$('<div><div><a/><div/><a/></div><div><div/><div/></div></div>').hide().css({position:'absolute'}).attr("id",css.root);root.children().eq(0).attr("id",css.head).end().eq(1).attr("id",css.body).children().eq(0).attr("id",css.days).end().eq(1).attr("id",css.weeks).end().end().end().find("a").eq(0).attr("id",css.prev).end().eq(1).attr("id",css.next);title=root.find("#"+ css.head).find("div").attr("id",css.title);if(conf.selectors){var monthSelector=$("<select/>").attr("id",css.month),yearSelector=$("<select/>").attr("id",css.year);title.html(monthSelector.add(yearSelector));}
var days=root.find("#"+ css.days);for(var d=0;d<7;d++){days.append($("<span/>").text(labels.shortDays[(d+ conf.firstDay)%7]));}
$("body").append(root);}
if(conf.trigger){trigger=$("<a/>").attr("href","#").addClass(css.trigger).click(function(e){conf.toggle?self.toggle():self.show();return e.preventDefault();}).insertAfter(input);}
var weeks=root.find("#"+ css.weeks);yearSelector=root.find("#"+ css.year);monthSelector=root.find("#"+ css.month);function select(date,conf,e){value=date;currYear=date.getFullYear();currMonth=date.getMonth();currDay=date.getDate();e=e||$.Event("api");e.type="beforeChange";fire.trigger(e,[date]);if(e.isDefaultPrevented()){return;}
input.val(format(date,conf.format,conf.lang));e.type="change";fire.trigger(e);input.data("date",date);self.hide(e);}
function onShow(ev){ev.type="onShow";fire.trigger(ev);$(document).bind("keydown.d",function(e){if(e.ctrlKey){return true;}
var key=e.keyCode;if(key==8){input.val("");return self.hide(e);}
if(key==27||key==9){return self.hide(e);}
if($(KEYS).index(key)>=0){if(!opened){self.show(e);return e.preventDefault();}
var days=$("#"+ css.weeks+" a"),el=$("."+ css.focus),index=days.index(el);el.removeClass(css.focus);if(key==74||key==40){index+=7;}
else if(key==75||key==38){index-=7;}
else if(key==76||key==39){index+=1;}
else if(key==72||key==37){index-=1;}
if(index>41){self.addMonth();el=$("#"+ css.weeks+" a:eq("+(index-42)+")");}else if(index<0){self.addMonth(-1);el=$("#"+ css.weeks+" a:eq("+(index+42)+")");}else{el=days.eq(index);}
el.addClass(css.focus);return e.preventDefault();}
if(key==34){return self.addMonth();}
if(key==33){return self.addMonth(-1);}
if(key==36){return self.today();}
if(key==13){if(!$(e.target).is("select")){$("."+ css.focus).click();}}
return $([16,17,18,9]).index(key)>=0;});$(document).bind("click.d",function(e){var el=e.target;if(!$(el).parents("#"+ css.root).length&&el!=input[0]&&(!trigger||el!=trigger[0])){self.hide(e);}});}
$.extend(self,{show:function(e){if(input.attr("readonly")||input.attr("disabled")||opened){return;}
e=e||$.Event();e.type="onBeforeShow";fire.trigger(e);if(e.isDefaultPrevented()){return;}
$.each(instances,function(){this.hide();});opened=true;monthSelector.unbind("change").change(function(){self.setValue(yearSelector.val(),$(this).val());});yearSelector.unbind("change").change(function(){self.setValue($(this).val(),monthSelector.val());});pm=root.find("#"+ css.prev).unbind("click").click(function(e){if(!pm.hasClass(css.disabled)){self.addMonth(-1);}
return false;});nm=root.find("#"+ css.next).unbind("click").click(function(e){if(!nm.hasClass(css.disabled)){self.addMonth();}
return false;});self.setValue(value);var pos=input.offset();if(/iPad/i.test(navigator.userAgent)){pos.top-=$(window).scrollTop();}
root.css({top:pos.top+ input.outerHeight({margins:true})+ conf.offset[0],left:pos.left+ conf.offset[1]});if(conf.speed){root.show(conf.speed,function(){onShow(e);});}else{root.show();onShow(e);}
return self;},setValue:function(year,month,day){var date=integer(month)>=-1?new Date(integer(year),integer(month),integer(day==undefined||isNaN(day)?1:day)):year||value;if(date<min){date=min;}
else if(date>max){date=max;}
if(typeof year=='string'){date=parseDate(year);}
year=date.getFullYear();month=date.getMonth();day=date.getDate();if(month==-1){month=11;year--;}else if(month==12){month=0;year++;}
if(!opened){select(date,conf);return self;}
currMonth=month;currYear=year;currDay=day;var tmp=new Date(year,month,1- conf.firstDay),begin=tmp.getDay(),days=dayAm(year,month),prevDays=dayAm(year,month- 1),week;if(conf.selectors){monthSelector.empty();$.each(labels.months,function(i,m){if(min<new Date(year,i+ 1,1)&&max>new Date(year,i,0)){monthSelector.append($("<option/>").html(m).attr("value",i));}});yearSelector.empty();var yearNow=now.getFullYear();for(var i=yearNow+ conf.yearRange[0];i<yearNow+ conf.yearRange[1];i++){if(min<new Date(i+ 1,0,1)&&max>new Date(i,0,0)){yearSelector.append($("<option/>").text(i));}}
monthSelector.val(month);yearSelector.val(year);}else{title.html(labels.months[month]+" "+ year);}
weeks.empty();pm.add(nm).removeClass(css.disabled);for(var j=!begin?-7:0,a,num;j<(!begin?35:42);j++){a=$("<a/>");if(j%7===0){week=$("<div/>").addClass(css.week);weeks.append(week);}
if(j<begin){a.addClass(css.off);num=prevDays- begin+ j+ 1;date=new Date(year,month-1,num);}else if(j>=begin+ days){a.addClass(css.off);num=j- days- begin+ 1;date=new Date(year,month+1,num);}else{num=j- begin+ 1;date=new Date(year,month,num);if(isSameDay(value,date)){a.attr("id",css.current).addClass(css.focus);}else if(isSameDay(now,date)){a.attr("id",css.today);}}
if(min&&date<min){a.add(pm).addClass(css.disabled);}
if(max&&date>max){a.add(nm).addClass(css.disabled);}
a.attr("href","#"+ num).text(num).data("date",date);week.append(a);}
weeks.find("a").click(function(e){var el=$(this);if(!el.hasClass(css.disabled)){$("#"+ css.current).removeAttr("id");el.attr("id",css.current);select(el.data("date"),conf,e);}
return false;});if(css.sunday){weeks.find(css.week).each(function(){var beg=conf.firstDay?7- conf.firstDay:0;$(this).children().slice(beg,beg+ 1).addClass(css.sunday);});}
return self;},setMin:function(val,fit){min=parseDate(val);if(fit&&value<min){self.setValue(min);}
return self;},setMax:function(val,fit){max=parseDate(val);if(fit&&value>max){self.setValue(max);}
return self;},today:function(){return self.setValue(now);},addDay:function(amount){return this.setValue(currYear,currMonth,currDay+(amount||1));},addMonth:function(amount){var targetMonth=currMonth+(amount||1),daysInTargetMonth=dayAm(currYear,targetMonth),targetDay=currDay<=daysInTargetMonth?currDay:daysInTargetMonth;return this.setValue(currYear,targetMonth,targetDay);},addYear:function(amount){return this.setValue(currYear+(amount||1),currMonth,currDay);},destroy:function(){input.add(document).unbind("click.d").unbind("keydown.d");root.add(trigger).remove();input.removeData("dateinput").removeClass(css.input);if(original){input.replaceWith(original);}},hide:function(e){if(opened){e=$.Event();e.type="onHide";fire.trigger(e);$(document).unbind("click.d").unbind("keydown.d");if(e.isDefaultPrevented()){return;}
root.hide();opened=false;}
return self;},toggle:function(){return self.isOpen()?self.hide():self.show();},getConf:function(){return conf;},getInput:function(){return input;},getCalendar:function(){return root;},getValue:function(dateFormat){return dateFormat?format(value,dateFormat,conf.lang):value;},isOpen:function(){return opened;}});$.each(['onBeforeShow','onShow','change','onHide'],function(i,name){if($.isFunction(conf[name])){$(self).bind(name,conf[name]);}
self[name]=function(fn){if(fn){$(self).bind(name,fn);}
return self;};});if(!conf.editable){input.bind("focus.d click.d",self.show).keydown(function(e){var key=e.keyCode;if(!opened&&$(KEYS).index(key)>=0){self.show(e);return e.preventDefault();}
return e.shiftKey||e.ctrlKey||e.altKey||key==9?true:e.preventDefault();});}
if(parseDate(input.val())){select(value,conf);}}
$.expr[':'].date=function(el){var type=el.getAttribute("type");return type&&type=='date'||!!$(el).data("dateinput");};$.fn.dateinput=function(conf){if(this.data("dateinput")){return this;}
conf=$.extend(true,{},tool.conf,conf);$.each(conf.css,function(key,val){if(!val&&key!='prefix'){conf.css[key]=(conf.css.prefix||'')+(val||key);}});var els;this.each(function(){var el=new Dateinput($(this),conf);instances.push(el);var input=el.getInput().data("dateinput",el);els=els?els.add(input):input;});return els?els:this;};})(jQuery);(function($){$.tools=$.tools||{version:'1.2.6'};$.tools.overlay={addEffect:function(name,loadFn,closeFn){effects[name]=[loadFn,closeFn];},conf:{close:null,closeOnClick:true,closeOnEsc:true,closeSpeed:'fast',effect:'default',fixed:!$.browser.msie||$.browser.version>6,left:'center',load:false,mask:null,oneInstance:true,speed:'normal',target:null,top:'10%'}};var instances=[],effects={};$.tools.overlay.addEffect('default',function(pos,onLoad){var conf=this.getConf(),w=$(window);if(!conf.fixed){pos.top+=w.scrollTop();pos.left+=w.scrollLeft();}
pos.position=conf.fixed?'fixed':'absolute';this.getOverlay().css(pos).fadeIn(conf.speed,onLoad);},function(onClose){this.getOverlay().fadeOut(this.getConf().closeSpeed,onClose);});function Overlay(trigger,conf){var self=this,fire=trigger.add(self),w=$(window),closers,overlay,opened,maskConf=$.tools.expose&&(conf.mask||conf.expose),uid=Math.random().toString().slice(10);if(maskConf){if(typeof maskConf=='string'){maskConf={color:maskConf};}
maskConf.closeOnClick=maskConf.closeOnEsc=false;}
var jq=conf.target||trigger.attr("rel");overlay=jq?$(jq):null||trigger;if(!overlay.length){throw"Could not find Overlay: "+ jq;}
if(trigger&&trigger.index(overlay)==-1){trigger.click(function(e){self.load(e);return e.preventDefault();});}
$.extend(self,{load:function(e){if(self.isOpened()){return self;}
var eff=effects[conf.effect];if(!eff){throw"Overlay: cannot find effect : \""+ conf.effect+"\"";}
if(conf.oneInstance){$.each(instances,function(){this.close(e);});}
e=e||$.Event();e.type="onBeforeLoad";fire.trigger(e);if(e.isDefaultPrevented()){return self;}
opened=true;if(maskConf){$(overlay).expose(maskConf);}
var top=conf.top,left=conf.left,oWidth=overlay.outerWidth({margin:true}),oHeight=overlay.outerHeight({margin:true});if(typeof top=='string'){top=top=='center'?Math.max((w.height()- oHeight)/2,0):parseInt(top,10)/100*w.height();}
if(left=='center'){left=Math.max((w.width()- oWidth)/2,0);}
eff[0].call(self,{top:top,left:left},function(){if(opened){e.type="onLoad";fire.trigger(e);}});if(maskConf&&conf.closeOnClick){$.mask.getMask().one("click",self.close);}
if(conf.closeOnClick){$(document).bind("click."+ uid,function(e){if(!$(e.target).parents(overlay).length){self.close(e);}});}
if(conf.closeOnEsc){$(document).bind("keydown."+ uid,function(e){if(e.keyCode==27){self.close(e);}});}
return self;},close:function(e){if(!self.isOpened()){return self;}
e=e||$.Event();e.type="onBeforeClose";fire.trigger(e);if(e.isDefaultPrevented()){return;}
opened=false;effects[conf.effect][1].call(self,function(){e.type="onClose";fire.trigger(e);});$(document).unbind("click."+ uid).unbind("keydown."+ uid);if(maskConf){$.mask.close();}
return self;},getOverlay:function(){return overlay;},getTrigger:function(){return trigger;},getClosers:function(){return closers;},isOpened:function(){return opened;},getConf:function(){return conf;}});$.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(i,name){if($.isFunction(conf[name])){$(self).bind(name,conf[name]);}
self[name]=function(fn){if(fn){$(self).bind(name,fn);}
return self;};});closers=overlay.find(conf.close||".close");if(!closers.length&&!conf.close){closers=$('<a class="close"></a>');overlay.prepend(closers);}
closers.click(function(e){self.close(e);});if(conf.load){self.load();}}
$.fn.overlay=function(conf){var el=this.data("overlay");if(el){return el;}
if($.isFunction(conf)){conf={onBeforeLoad:conf};}
conf=$.extend(true,{},$.tools.overlay.conf,conf);this.each(function(){el=new Overlay($(this),conf);instances.push(el);$(this).data("overlay",el);});return conf.api?el:this;};})(jQuery);(function($){var t=$.tools.overlay,w=$(window);$.extend(t.conf,{start:{top:null,left:null},fadeInSpeed:'fast',zIndex:9999});function getPosition(el){var p=el.offset();return{top:p.top+ el.height()/2,left:p.left+ el.width()/2};}
var loadEffect=function(pos,onLoad){var overlay=this.getOverlay(),conf=this.getConf(),trigger=this.getTrigger(),self=this,oWidth=overlay.outerWidth({margin:true}),img=overlay.data("img"),position=conf.fixed?'fixed':'absolute';if(!img){var bg=overlay.css("backgroundImage");if(!bg){throw"background-image CSS property not set for overlay";}
bg=bg.slice(bg.indexOf("(")+ 1,bg.indexOf(")")).replace(/\"/g,"");overlay.css("backgroundImage","none");img=$('<img src="'+ bg+'"/>');img.css({border:0,display:'none'}).width(oWidth);$('body').append(img);overlay.data("img",img);}
var itop=conf.start.top||Math.round(w.height()/2),ileft=conf.start.left||Math.round(w.width()/2);if(trigger){var p=getPosition(trigger);itop=p.top;ileft=p.left;}
if(conf.fixed){itop-=w.scrollTop();ileft-=w.scrollLeft();}else{pos.top+=w.scrollTop();pos.left+=w.scrollLeft();}
img.css({position:'absolute',top:itop,left:ileft,width:0,zIndex:conf.zIndex}).show();pos.position=position;overlay.css(pos);img.animate({top:overlay.css("top"),left:overlay.css("left"),width:oWidth},conf.speed,function(){overlay.css("zIndex",conf.zIndex+ 1).fadeIn(conf.fadeInSpeed,function(){if(self.isOpened()&&!$(this).index(overlay)){onLoad.call();}else{overlay.hide();}});}).css("position",position);};var closeEffect=function(onClose){var overlay=this.getOverlay().hide(),conf=this.getConf(),trigger=this.getTrigger(),img=overlay.data("img"),css={top:conf.start.top,left:conf.start.left,width:0};if(trigger){$.extend(css,getPosition(trigger));}
if(conf.fixed){img.css({position:'absolute'}).animate({top:"+="+ w.scrollTop(),left:"+="+ w.scrollLeft()},0);}
img.animate(css,conf.closeSpeed,onClose);};t.addEffect("apple",loadEffect,closeEffect);})(jQuery);(function($){$.tools=$.tools||{version:'1.2.6'};var tool;tool=$.tools.rangeinput={conf:{min:0,max:100,step:'any',steps:0,value:0,precision:undefined,vertical:0,keyboard:true,progress:false,speed:100,css:{input:'range',slider:'slider',progress:'progress',handle:'handle'}}};var doc,draggable;$.fn.drag=function(conf){document.ondragstart=function(){return false;};conf=$.extend({x:true,y:true,drag:true},conf);doc=doc||$(document).bind("mousedown mouseup",function(e){var el=$(e.target);if(e.type=="mousedown"&&el.data("drag")){var offset=el.position(),x0=e.pageX- offset.left,y0=e.pageY- offset.top,start=true;doc.bind("mousemove.drag",function(e){var x=e.pageX-x0,y=e.pageY-y0,props={};if(conf.x){props.left=x;}
if(conf.y){props.top=y;}
if(start){el.trigger("dragStart");start=false;}
if(conf.drag){el.css(props);}
el.trigger("drag",[y,x]);draggable=el;});e.preventDefault();}else{try{if(draggable){draggable.trigger("dragEnd");}}finally{doc.unbind("mousemove.drag");draggable=null;}}});return this.data("drag",true);};function round(value,precision){var n=Math.pow(10,precision);return Math.round(value*n)/n;}
function dim(el,key){var v=parseInt(el.css(key),10);if(v){return v;}
var s=el[0].currentStyle;return s&&s.width&&parseInt(s.width,10);}
function hasEvent(el){var e=el.data("events");return e&&e.onSlide;}
function RangeInput(input,conf){var self=this,css=conf.css,root=$("<div><div/><a href='#'/></div>").data("rangeinput",self),vertical,value,origo,len,pos;input.before(root);var handle=root.addClass(css.slider).find("a").addClass(css.handle),progress=root.find("div").addClass(css.progress);$.each("min,max,step,value".split(","),function(i,key){var val=input.attr(key);if(parseFloat(val)){conf[key]=parseFloat(val,10);}});var range=conf.max- conf.min,step=conf.step=='any'?0:conf.step,precision=conf.precision;if(precision===undefined){try{precision=step.toString().split(".")[1].length;}catch(err){precision=0;}}
if(input.attr("type")=='range'){var def=input.clone().wrap("<div/>").parent().html(),clone=$(def.replace(/type/i,"type=text data-orig-type"));clone.val(conf.value);input.replaceWith(clone);input=clone;}
input.addClass(css.input);var fire=$(self).add(input),fireOnSlide=true;function slide(evt,x,val,isSetValue){if(val===undefined){val=x/len*range;}else if(isSetValue){val-=conf.min;}
if(step){val=Math.round(val/step)*step;}
if(x===undefined||step){x=val*len/range;}
if(isNaN(val)){return self;}
x=Math.max(0,Math.min(x,len));val=x/len*range;if(isSetValue||!vertical){val+=conf.min;}
if(vertical){if(isSetValue){x=len-x;}else{val=conf.max- val;}}
val=round(val,precision);var isClick=evt.type=="click";if(fireOnSlide&&value!==undefined&&!isClick){evt.type="onSlide";fire.trigger(evt,[val,x]);if(evt.isDefaultPrevented()){return self;}}
var speed=isClick?conf.speed:0,callback=isClick?function(){evt.type="change";fire.trigger(evt,[val]);}:null;if(vertical){handle.animate({top:x},speed,callback);if(conf.progress){progress.animate({height:len- x+ handle.height()/2},speed);}}else{handle.animate({left:x},speed,callback);if(conf.progress){progress.animate({width:x+ handle.width()/2},speed);}}
value=val;pos=x;input.val(val);return self;}
$.extend(self,{getValue:function(){return value;},setValue:function(val,e){init();return slide(e||$.Event("api"),undefined,val,true);},getConf:function(){return conf;},getProgress:function(){return progress;},getHandle:function(){return handle;},getInput:function(){return input;},step:function(am,e){e=e||$.Event();var step=conf.step=='any'?1:conf.step;self.setValue(value+ step*(am||1),e);},stepUp:function(am){return self.step(am||1);},stepDown:function(am){return self.step(-am||-1);}});$.each("onSlide,change".split(","),function(i,name){if($.isFunction(conf[name])){$(self).bind(name,conf[name]);}
self[name]=function(fn){if(fn){$(self).bind(name,fn);}
return self;};});handle.drag({drag:false}).bind("dragStart",function(){init();fireOnSlide=hasEvent($(self))||hasEvent(input);}).bind("drag",function(e,y,x){if(input.is(":disabled")){return false;}
slide(e,vertical?y:x);}).bind("dragEnd",function(e){if(!e.isDefaultPrevented()){e.type="change";fire.trigger(e,[value]);}}).click(function(e){return e.preventDefault();});root.click(function(e){if(input.is(":disabled")||e.target==handle[0]){return e.preventDefault();}
init();var fix=vertical?handle.height()/2:handle.width()/2;slide(e,vertical?len-origo-fix+ e.pageY:e.pageX-origo-fix);});if(conf.keyboard){input.keydown(function(e){if(input.attr("readonly")){return;}
var key=e.keyCode,up=$([75,76,38,33,39]).index(key)!=-1,down=$([74,72,40,34,37]).index(key)!=-1;if((up||down)&&!(e.shiftKey||e.altKey||e.ctrlKey)){if(up){self.step(key==33?10:1,e);}else if(down){self.step(key==34?-10:-1,e);}
return e.preventDefault();}});}
input.blur(function(e){var val=$(this).val();if(val!==value){self.setValue(val,e);}});$.extend(input[0],{stepUp:self.stepUp,stepDown:self.stepDown});function init(){vertical=conf.vertical||dim(root,"height")>dim(root,"width");if(vertical){len=dim(root,"height")- dim(handle,"height");origo=root.offset().top+ len;}else{len=dim(root,"width")- dim(handle,"width");origo=root.offset().left;}}
function begin(){init();self.setValue(conf.value!==undefined?conf.value:conf.min);}
begin();if(!len){$(window).load(begin);}}
$.expr[':'].range=function(el){var type=el.getAttribute("type");return type&&type=='range'||!!$(el).filter("input").data("rangeinput");};$.fn.rangeinput=function(conf){if(this.data("rangeinput")){return this;}
conf=$.extend(true,{},tool.conf,conf);var els;this.each(function(){var el=new RangeInput($(this),$.extend(true,{},conf));var input=el.getInput().data("rangeinput",el);els=els?els.add(input):input;});return els?els:this;};})(jQuery);(function($){$.tools=$.tools||{version:'1.2.6'};$.tools.scrollable={conf:{activeClass:'active',circular:false,clonedClass:'cloned',disabledClass:'disabled',easing:'swing',initialIndex:0,item:'> *',items:'.items',keyboard:true,mousewheel:false,next:'.next',prev:'.prev',size:1,speed:400,vertical:false,touch:true,wheelSpeed:0}};function dim(el,key){var v=parseInt(el.css(key),10);if(v){return v;}
var s=el[0].currentStyle;return s&&s.width&&parseInt(s.width,10);}
function find(root,query){var el=$(query);return el.length<2?el:root.parent().find(query);}
var current;function Scrollable(root,conf){var self=this,fire=root.add(self),itemWrap=root.children(),index=0,vertical=conf.vertical;if(!current){current=self;}
if(itemWrap.length>1){itemWrap=$(conf.items,root);}
if(conf.size>1){conf.circular=false;}
$.extend(self,{getConf:function(){return conf;},getIndex:function(){return index;},getSize:function(){return self.getItems().size();},getNaviButtons:function(){return prev.add(next);},getRoot:function(){return root;},getItemWrap:function(){return itemWrap;},getItems:function(){return itemWrap.find(conf.item).not("."+ conf.clonedClass);},move:function(offset,time){return self.seekTo(index+ offset,time);},next:function(time){return self.move(conf.size,time);},prev:function(time){return self.move(-conf.size,time);},begin:function(time){return self.seekTo(0,time);},end:function(time){return self.seekTo(self.getSize()-1,time);},focus:function(){current=self;return self;},addItem:function(item){item=$(item);if(!conf.circular){itemWrap.append(item);next.removeClass("disabled");}else{itemWrap.children().last().before(item);itemWrap.children().first().replaceWith(item.clone().addClass(conf.clonedClass));}
fire.trigger("onAddItem",[item]);return self;},seekTo:function(i,time,fn){if(!i.jquery){i*=1;}
if(conf.circular&&i===0&&index==-1&&time!==0){return self;}
if(!conf.circular&&i<0||i>self.getSize()||i<-1){return self;}
var item=i;if(i.jquery){i=self.getItems().index(i);}else{item=self.getItems().eq(i);}
var e=$.Event("onBeforeSeek");if(!fn){fire.trigger(e,[i,time]);if(e.isDefaultPrevented()||!item.length){return self;}}
var props=vertical?{top:-item.position().top}:{left:-item.position().left};index=i;current=self;if(time===undefined){time=conf.speed;}
itemWrap.animate(props,time,conf.easing,fn||function(){fire.trigger("onSeek",[i]);});return self;}});$.each(['onBeforeSeek','onSeek','onAddItem'],function(i,name){if($.isFunction(conf[name])){$(self).bind(name,conf[name]);}
self[name]=function(fn){if(fn){$(self).bind(name,fn);}
return self;};});if(conf.circular){var cloned1=self.getItems().slice(-1).clone().prependTo(itemWrap),cloned2=self.getItems().eq(1).clone().appendTo(itemWrap);cloned1.add(cloned2).addClass(conf.clonedClass);self.onBeforeSeek(function(e,i,time){if(e.isDefaultPrevented()){return;}
if(i==-1){self.seekTo(cloned1,time,function(){self.end(0);});return e.preventDefault();}else if(i==self.getSize()){self.seekTo(cloned2,time,function(){self.begin(0);});}});var hidden_parents=root.parents().add(root).filter(function(){if($(this).css('display')==='none'){return true;}});if(hidden_parents.length){hidden_parents.show();self.seekTo(0,0,function(){});hidden_parents.hide();}
else{self.seekTo(0,0,function(){});}}
var prev=find(root,conf.prev).click(function(e){e.stopPropagation();self.prev();}),next=find(root,conf.next).click(function(e){e.stopPropagation();self.next();});if(!conf.circular){self.onBeforeSeek(function(e,i){setTimeout(function(){if(!e.isDefaultPrevented()){prev.toggleClass(conf.disabledClass,i<=0);next.toggleClass(conf.disabledClass,i>=self.getSize()-1);}},1);});if(!conf.initialIndex){prev.addClass(conf.disabledClass);}}
if(self.getSize()<2){prev.add(next).addClass(conf.disabledClass);}
if(conf.mousewheel&&$.fn.mousewheel){root.mousewheel(function(e,delta){if(conf.mousewheel){self.move(delta<0?1:-1,conf.wheelSpeed||50);return false;}});}
if(conf.touch){var touch={};itemWrap[0].ontouchstart=function(e){var t=e.touches[0];touch.x=t.clientX;touch.y=t.clientY;};itemWrap[0].ontouchmove=function(e){if(e.touches.length==1&&!itemWrap.is(":animated")){var t=e.touches[0],deltaX=touch.x- t.clientX,deltaY=touch.y- t.clientY;self[vertical&&deltaY>0||!vertical&&deltaX>0?'next':'prev']();e.preventDefault();}};}
if(conf.keyboard){$(document).bind("keydown.scrollable",function(evt){if(!conf.keyboard||evt.altKey||evt.ctrlKey||evt.metaKey||$(evt.target).is(":input")){return;}
if(conf.keyboard!='static'&&current!=self){return;}
var key=evt.keyCode;if(vertical&&(key==38||key==40)){self.move(key==38?-1:1);return evt.preventDefault();}
if(!vertical&&(key==37||key==39)){self.move(key==37?-1:1);return evt.preventDefault();}});}
if(conf.initialIndex){self.seekTo(conf.initialIndex,0,function(){});}}
$.fn.scrollable=function(conf){var el=this.data("scrollable");if(el){return el;}
conf=$.extend({},$.tools.scrollable.conf,conf);this.each(function(){el=new Scrollable($(this),conf);$(this).data("scrollable",el);});return conf.api?el:this;};})(jQuery);(function($){var t=$.tools.scrollable;t.autoscroll={conf:{autoplay:true,interval:3000,autopause:true}};$.fn.autoscroll=function(conf){if(typeof conf=='number'){conf={interval:conf};}
var opts=$.extend({},t.autoscroll.conf,conf),ret;this.each(function(){var api=$(this).data("scrollable"),root=api.getRoot(),timer,stopped=false;function scroll(){timer=setTimeout(function(){api.next();},opts.interval);}
if(api){ret=api;}
api.play=function(){if(timer){return;}
stopped=false;root.bind('onSeek',scroll);scroll();};api.pause=function(){timer=clearTimeout(timer);root.unbind('onSeek',scroll);};api.resume=function(){stopped||api.play();};api.stop=function(){stopped=true;api.pause();};if(opts.autopause){root.add(api.getNaviButtons()).hover(api.pause,api.resume);}
if(opts.autoplay){api.play();}});return opts.api?ret:this;};})(jQuery);(function($){var t=$.tools.scrollable;t.navigator={conf:{navi:'.navi',naviItem:null,activeClass:'active',indexed:false,idPrefix:null,history:false}};function find(root,query){var el=$(query);return el.length<2?el:root.parent().find(query);}
$.fn.navigator=function(conf){if(typeof conf=='string'){conf={navi:conf};}
conf=$.extend({},t.navigator.conf,conf);var ret;this.each(function(){var api=$(this).data("scrollable"),navi=conf.navi.jquery?conf.navi:find(api.getRoot(),conf.navi),buttons=api.getNaviButtons(),cls=conf.activeClass,hashed=conf.history&&!!history.pushState,size=api.getConf().size;if(api){ret=api;}
api.getNaviButtons=function(){return buttons.add(navi);};if(hashed){history.pushState({i:0});$(window).bind("popstate",function(evt){var s=evt.originalEvent.state;if(s){api.seekTo(s.i);}});}
function doClick(el,i,e){api.seekTo(i);e.preventDefault();if(hashed){history.pushState({i:i});}}
function els(){return navi.find(conf.naviItem||'> *');}
function addItem(i){var item=$("<"+(conf.naviItem||'a')+"/>").click(function(e){doClick($(this),i,e);});if(i===0){item.addClass(cls);}
if(conf.indexed){item.text(i+ 1);}
if(conf.idPrefix){item.attr("id",conf.idPrefix+ i);}
return item.appendTo(navi);}
if(els().length){els().each(function(i){$(this).click(function(e){doClick($(this),i,e);});});}else{$.each(api.getItems(),function(i){if(i%size==0)addItem(i);});}
api.onBeforeSeek(function(e,index){setTimeout(function(){if(!e.isDefaultPrevented()){var i=index/size,el=els().eq(i);if(el.length){els().removeClass(cls).eq(i).addClass(cls);}}},1);});api.onAddItem(function(e,item){var i=api.getItems().index(item);if(i%size==0)addItem(i);});});return conf.api?ret:this;};})(jQuery);(function($){$.tools=$.tools||{version:'1.2.6'};$.tools.tabs={conf:{tabs:'a',current:'current',onBeforeClick:null,onClick:null,effect:'default',initialIndex:0,event:'click',rotate:false,slideUpSpeed:400,slideDownSpeed:400,history:false},addEffect:function(name,fn){effects[name]=fn;}};var effects={'default':function(i,done){this.getPanes().hide().eq(i).show();done.call();},fade:function(i,done){var conf=this.getConf(),speed=conf.fadeOutSpeed,panes=this.getPanes();if(speed){panes.fadeOut(speed);}else{panes.hide();}
panes.eq(i).fadeIn(conf.fadeInSpeed,done);},slide:function(i,done){var conf=this.getConf();this.getPanes().slideUp(conf.slideUpSpeed);this.getPanes().eq(i).slideDown(conf.slideDownSpeed,done);},ajax:function(i,done){this.getPanes().eq(0).load(this.getTabs().eq(i).attr("href"),done);}};var
animating,w;$.tools.tabs.addEffect("horizontal",function(i,done){if(animating)return;var nextPane=this.getPanes().eq(i),currentPane=this.getCurrentPane();w||(w=this.getPanes().eq(0).width());animating=true;nextPane.show();currentPane.animate({width:0},{step:function(now){nextPane.css("width",w-now);},complete:function(){$(this).hide();done.call();animating=false;}});if(!currentPane.length){done.call();animating=false;}});function Tabs(root,paneSelector,conf){var self=this,trigger=root.add(this),tabs=root.find(conf.tabs),panes=paneSelector.jquery?paneSelector:root.children(paneSelector),current;if(!tabs.length){tabs=root.children();}
if(!panes.length){panes=root.parent().find(paneSelector);}
if(!panes.length){panes=$(paneSelector);}
$.extend(this,{click:function(i,e){var tab=tabs.eq(i);if(typeof i=='string'&&i.replace("#","")){tab=tabs.filter("[href*="+ i.replace("#","")+"]");i=Math.max(tabs.index(tab),0);}
if(conf.rotate){var last=tabs.length-1;if(i<0){return self.click(last,e);}
if(i>last){return self.click(0,e);}}
if(!tab.length){if(current>=0){return self;}
i=conf.initialIndex;tab=tabs.eq(i);}
if(i===current){return self;}
e=e||$.Event();e.type="onBeforeClick";trigger.trigger(e,[i]);if(e.isDefaultPrevented()){return;}
effects[conf.effect].call(self,i,function(){current=i;e.type="onClick";trigger.trigger(e,[i]);});tabs.removeClass(conf.current);tab.addClass(conf.current);return self;},getConf:function(){return conf;},getTabs:function(){return tabs;},getPanes:function(){return panes;},getCurrentPane:function(){return panes.eq(current);},getCurrentTab:function(){return tabs.eq(current);},getIndex:function(){return current;},next:function(){return self.click(current+ 1);},prev:function(){return self.click(current- 1);},destroy:function(){tabs.unbind(conf.event).removeClass(conf.current);panes.find("a[href^=#]").unbind("click.T");return self;}});$.each("onBeforeClick,onClick".split(","),function(i,name){if($.isFunction(conf[name])){$(self).bind(name,conf[name]);}
self[name]=function(fn){if(fn){$(self).bind(name,fn);}
return self;};});if(conf.history&&$.fn.history){$.tools.history.init(tabs);conf.event='history';}
tabs.each(function(i){$(this).bind(conf.event,function(e){self.click(i,e);return e.preventDefault();});});panes.find("a[href^=#]").bind("click.T",function(e){self.click($(this).attr("href"),e);});if(location.hash&&conf.tabs=="a"&&root.find("[href="+location.hash+"]").length){self.click(location.hash);}else{if(conf.initialIndex===0||conf.initialIndex>0){self.click(conf.initialIndex);}}}
$.fn.tabs=function(paneSelector,conf){var el=this.data("tabs");if(el){el.destroy();this.removeData("tabs");}
if($.isFunction(conf)){conf={onBeforeClick:conf};}
conf=$.extend({},$.tools.tabs.conf,conf);this.each(function(){el=new Tabs($(this),paneSelector,conf);$(this).data("tabs",el);});return conf.api?el:this;};})(jQuery);(function($){var tool;tool=$.tools.tabs.slideshow={conf:{next:'.forward',prev:'.backward',disabledClass:'disabled',autoplay:false,autopause:true,interval:3000,clickable:true,api:false}};function Slideshow(root,conf){var self=this,fire=root.add(this),tabs=root.data("tabs"),timer,stopped=true;function find(query){var el=$(query);return el.length<2?el:root.parent().find(query);}
var nextButton=find(conf.next).click(function(){tabs.next();});var prevButton=find(conf.prev).click(function(){tabs.prev();});function next(){timer=setTimeout(function(){tabs.next();},conf.interval);}
$.extend(self,{getTabs:function(){return tabs;},getConf:function(){return conf;},play:function(){if(timer){return self;}
var e=$.Event("onBeforePlay");fire.trigger(e);if(e.isDefaultPrevented()){return self;}
stopped=false;fire.trigger("onPlay");fire.bind('onClick',next);next();return self;},pause:function(){if(!timer){return self;}
var e=$.Event("onBeforePause");fire.trigger(e);if(e.isDefaultPrevented()){return self;}
timer=clearTimeout(timer);fire.trigger("onPause");fire.unbind('onClick',next);return self;},resume:function(){stopped||self.play();},stop:function(){self.pause();stopped=true;}});$.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","),function(i,name){if($.isFunction(conf[name])){$(self).bind(name,conf[name]);}
self[name]=function(fn){return $(self).bind(name,fn);};});if(conf.autopause){tabs.getTabs().add(nextButton).add(prevButton).add(tabs.getPanes()).hover(self.pause,self.resume);}
if(conf.autoplay){self.play();}
if(conf.clickable){tabs.getPanes().click(function(){tabs.next();});}
if(!tabs.getConf().rotate){var disabled=conf.disabledClass;if(!tabs.getIndex()){prevButton.addClass(disabled);}
tabs.onBeforeClick(function(e,i){prevButton.toggleClass(disabled,!i);nextButton.toggleClass(disabled,i==tabs.getTabs().length-1);});}}
$.fn.slideshow=function(conf){var el=this.data("slideshow");if(el){return el;}
conf=$.extend({},tool.conf,conf);this.each(function(){el=new Slideshow($(this),conf);$(this).data("slideshow",el);});return conf.api?el:this;};})(jQuery);(function($){$.tools=$.tools||{version:'1.2.6'};var tool;tool=$.tools.expose={conf:{maskId:'exposeMask',loadSpeed:'slow',closeSpeed:'fast',closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,startOpacity:0,color:'#fff',onLoad:null,onClose:null}};function viewport(){if($.browser.msie){var d=$(document).height(),w=$(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,d- w<20?w:d];}
return[$(document).width(),$(document).height()];}
function call(fn){if(fn){return fn.call($.mask);}}
var mask,exposed,loaded,config,overlayIndex;$.mask={load:function(conf,els){if(loaded){return this;}
if(typeof conf=='string'){conf={color:conf};}
conf=conf||config;config=conf=$.extend($.extend({},tool.conf),conf);mask=$("#"+ conf.maskId);if(!mask.length){mask=$('<div/>').attr("id",conf.maskId);$("body").append(mask);}
var size=viewport();mask.css({position:'absolute',top:0,left:0,width:size[0],height:size[1],display:'none',opacity:conf.startOpacity,zIndex:conf.zIndex});if(conf.color){mask.css("backgroundColor",conf.color);}
if(call(conf.onBeforeLoad)===false){return this;}
if(conf.closeOnEsc){$(document).bind("keydown.mask",function(e){if(e.keyCode==27){$.mask.close(e);}});}
if(conf.closeOnClick){mask.bind("click.mask",function(e){$.mask.close(e);});}
$(window).bind("resize.mask",function(){$.mask.fit();});if(els&&els.length){overlayIndex=els.eq(0).css("zIndex");$.each(els,function(){var el=$(this);if(!/relative|absolute|fixed/i.test(el.css("position"))){el.css("position","relative");}});exposed=els.css({zIndex:Math.max(conf.zIndex+ 1,overlayIndex=='auto'?0:overlayIndex)});}
mask.css({display:'block'}).fadeTo(conf.loadSpeed,conf.opacity,function(){$.mask.fit();call(conf.onLoad);loaded="full";});loaded=true;return this;},close:function(){if(loaded){if(call(config.onBeforeClose)===false){return this;}
mask.fadeOut(config.closeSpeed,function(){call(config.onClose);if(exposed){exposed.css({zIndex:overlayIndex});}
loaded=false;});$(document).unbind("keydown.mask");mask.unbind("click.mask");$(window).unbind("resize.mask");}
return this;},fit:function(){if(loaded){var size=viewport();mask.css({width:size[0],height:size[1]});}},getMask:function(){return mask;},isLoaded:function(fully){return fully?loaded=='full':loaded;},getConf:function(){return config;},getExposed:function(){return exposed;}};$.fn.mask=function(conf){$.mask.load(conf);return this;};$.fn.expose=function(conf){$.mask.load(conf,this);return this;};})(jQuery);(function(){var IE=document.all,URL='http://www.adobe.com/go/getflashplayer',JQUERY=typeof jQuery=='function',RE=/(\d+)[^\d]+(\d+)[^\d]*(\d*)/,GLOBAL_OPTS={width:'100%',height:'100%',id:"_"+(""+ Math.random()).slice(9),allowfullscreen:true,allowscriptaccess:'always',quality:'high',version:[3,0],onFail:null,expressInstall:null,w3c:false,cachebusting:false};if(window.attachEvent){window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};});}
function extend(to,from){if(from){for(var key in from){if(from.hasOwnProperty(key)){to[key]=from[key];}}}
return to;}
function map(arr,func){var newArr=[];for(var i in arr){if(arr.hasOwnProperty(i)){newArr[i]=func(arr[i]);}}
return newArr;}
window.flashembed=function(root,opts,conf){if(typeof root=='string'){root=document.getElementById(root.replace("#",""));}
if(!root){return;}
if(typeof opts=='string'){opts={src:opts};}
return new Flash(root,extend(extend({},GLOBAL_OPTS),opts),conf);};var f=extend(window.flashembed,{conf:GLOBAL_OPTS,getVersion:function(){var fo,ver;try{ver=navigator.plugins["Shockwave Flash"].description.slice(16);}catch(e){try{fo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");ver=fo&&fo.GetVariable("$version");}catch(err){try{fo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");ver=fo&&fo.GetVariable("$version");}catch(err2){}}}
ver=RE.exec(ver);return ver?[ver[1],ver[3]]:[0,0];},asString:function(obj){if(obj===null||obj===undefined){return null;}
var type=typeof obj;if(type=='object'&&obj.push){type='array';}
switch(type){case'string':obj=obj.replace(new RegExp('(["\\\\])','g'),'\\$1');obj=obj.replace(/^\s?(\d+\.?\d*)%/,"$1pct");return'"'+obj+'"';case'array':return'['+ map(obj,function(el){return f.asString(el);}).join(',')+']';case'function':return'"function()"';case'object':var str=[];for(var prop in obj){if(obj.hasOwnProperty(prop)){str.push('"'+prop+'":'+ f.asString(obj[prop]));}}
return'{'+str.join(',')+'}';}
return String(obj).replace(/\s/g," ").replace(/\'/g,"\"");},getHTML:function(opts,conf){opts=extend({},opts);var html='<object width="'+ opts.width+'" height="'+ opts.height+'" id="'+ opts.id+'" name="'+ opts.id+'"';if(opts.cachebusting){opts.src+=((opts.src.indexOf("?")!=-1?"&":"?")+ Math.random());}
if(opts.w3c||!IE){html+=' data="'+opts.src+'" type="application/x-shockwave-flash"';}else{html+=' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';}
html+='>';if(opts.w3c||IE){html+='<param name="movie" value="'+opts.src+'" />';}
opts.width=opts.height=opts.id=opts.w3c=opts.src=null;opts.onFail=opts.version=opts.expressInstall=null;for(var key in opts){if(opts[key]){html+='<param name="'+ key+'" value="'+ opts[key]+'" />';}}
var vars="";if(conf){for(var k in conf){if(conf[k]){var val=conf[k];vars+=k+'='+ encodeURIComponent(/function|object/.test(typeof val)?f.asString(val):val)+'&';}}
vars=vars.slice(0,-1);html+='<param name="flashvars" value=\''+ vars+'\' />';}
html+="</object>";return html;},isSupported:function(ver){return VERSION[0]>ver[0]||VERSION[0]==ver[0]&&VERSION[1]>=ver[1];}});var VERSION=f.getVersion();function Flash(root,opts,conf){if(f.isSupported(opts.version)){root.innerHTML=f.getHTML(opts,conf);}else if(opts.expressInstall&&f.isSupported([6,65])){root.innerHTML=f.getHTML(extend(opts,{src:opts.expressInstall}),{MMredirectURL:location.href,MMplayerType:'PlugIn',MMdoctitle:document.title});}else{if(!root.innerHTML.replace(/\s/g,'')){root.innerHTML="<h2>Flash version "+ opts.version+" or greater is required</h2>"+"<h3>"+
(VERSION[0]>0?"Your version is "+ VERSION:"You have no flash plugin installed")+"</h3>"+
(root.tagName=='A'?"<p>Click here to download latest version</p>":"<p>Download latest version from <a href='"+ URL+"'>here</a></p>");if(root.tagName=='A'){root.onclick=function(){location.href=URL;};}}
if(opts.onFail){var ret=opts.onFail.call(this);if(typeof ret=='string'){root.innerHTML=ret;}}}
if(IE){window[opts.id]=document.getElementById(opts.id);}
extend(this,{getRoot:function(){return root;},getOptions:function(){return opts;},getConf:function(){return conf;},getApi:function(){return root.firstChild;}});}
if(JQUERY){jQuery.tools=jQuery.tools||{version:'1.2.6'};jQuery.tools.flashembed={conf:GLOBAL_OPTS};jQuery.fn.flashembed=function(opts,conf){return this.each(function(){jQuery(this).data("flashembed",flashembed(this,opts,conf));});};}})();(function($){var hash,iframe,links,inited;$.tools=$.tools||{version:'1.2.6'};$.tools.history={init:function(els){if(inited){return;}
if($.browser.msie&&$.browser.version<'8'){if(!iframe){iframe=$("<iframe/>").attr("src","javascript:false;").hide().get(0);$("body").prepend(iframe);setInterval(function(){var idoc=iframe.contentWindow.document,h=idoc.location.hash;if(hash!==h){$(window).trigger("hash",h);}},100);setIframeLocation(location.hash||'#');}}else{setInterval(function(){var h=location.hash;if(h!==hash){$(window).trigger("hash",h);}},100);}
links=!links?els:links.add(els);els.click(function(e){var href=$(this).attr("href");if(iframe){setIframeLocation(href);}
if(href.slice(0,1)!="#"){location.href="#"+ href;return e.preventDefault();}});inited=true;}};function setIframeLocation(h){if(h){var doc=iframe.contentWindow.document;doc.open().close();doc.location.hash=h;}}
$(window).bind("hash",function(e,h){if(h){links.filter(function(){var href=$(this).attr("href");return href==h||href==h.replace("#","");}).trigger("history",[h]);}else{links.eq(0).trigger("history",[h]);}
hash=h;});$.fn.history=function(fn){$.tools.history.init(this);return this.bind("history",fn);};})(jQuery);(function($){$.fn.mousewheel=function(fn){return this[fn?"bind":"trigger"]("wheel",fn);};$.event.special.wheel={setup:function(){$.event.add(this,wheelEvents,wheelHandler,{});},teardown:function(){$.event.remove(this,wheelEvents,wheelHandler);}};var wheelEvents=!$.browser.mozilla?"mousewheel":"DOMMouseScroll"+($.browser.version<"1.9"?" mousemove":"");function wheelHandler(event){switch(event.type){case"mousemove":return $.extend(event.data,{clientX:event.clientX,clientY:event.clientY,pageX:event.pageX,pageY:event.pageY});case"DOMMouseScroll":$.extend(event,event.data);event.delta=-event.detail/3;break;case"mousewheel":event.delta=event.wheelDelta/120;break;}
event.type="wheel";return $.event.handle.call(this,event,event.delta);}})(jQuery);(function($){$.tools=$.tools||{version:'1.2.6'};$.tools.tooltip={conf:{effect:'toggle',fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,fadeIE:false,position:['top','center'],offset:[0,0],relative:false,cancelDefault:true,events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:'<div/>',tipClass:'tooltip'},addEffect:function(name,loadFn,hideFn){effects[name]=[loadFn,hideFn];}};var effects={toggle:[function(done){var conf=this.getConf(),tip=this.getTip(),o=conf.opacity;if(o<1){tip.css({opacity:o});}
tip.show();done.call();},function(done){this.getTip().hide();done.call();}],fade:[function(done){var conf=this.getConf();if(!$.browser.msie||conf.fadeIE){this.getTip().fadeTo(conf.fadeInSpeed,conf.opacity,done);}
else{this.getTip().show();done();}},function(done){var conf=this.getConf();if(!$.browser.msie||conf.fadeIE){this.getTip().fadeOut(conf.fadeOutSpeed,done);}
else{this.getTip().hide();done();}}]};function getPosition(trigger,tip,conf){var top=conf.relative?trigger.position().top:trigger.offset().top,left=conf.relative?trigger.position().left:trigger.offset().left,pos=conf.position[0];top-=tip.outerHeight()- conf.offset[0];left+=trigger.outerWidth()+ conf.offset[1];if(/iPad/i.test(navigator.userAgent)){top-=$(window).scrollTop();}
var height=tip.outerHeight()+ trigger.outerHeight();if(pos=='center'){top+=height/2;}
if(pos=='bottom'){top+=height;}
pos=conf.position[1];var width=tip.outerWidth()+ trigger.outerWidth();if(pos=='center'){left-=width/2;}
if(pos=='left'){left-=width;}
return{top:top,left:left};}
function Tooltip(trigger,conf){var self=this,fire=trigger.add(self),tip,timer=0,pretimer=0,title=trigger.attr("title"),tipAttr=trigger.attr("data-tooltip"),effect=effects[conf.effect],shown,isInput=trigger.is(":input"),isWidget=isInput&&trigger.is(":checkbox, :radio, select, :button, :submit"),type=trigger.attr("type"),evt=conf.events[type]||conf.events[isInput?(isWidget?'widget':'input'):'def'];if(!effect){throw"Nonexistent effect \""+ conf.effect+"\"";}
evt=evt.split(/,\s*/);if(evt.length!=2){throw"Tooltip: bad events configuration for "+ type;}
trigger.bind(evt[0],function(e){clearTimeout(timer);if(conf.predelay){pretimer=setTimeout(function(){self.show(e);},conf.predelay);}else{self.show(e);}}).bind(evt[1],function(e){clearTimeout(pretimer);if(conf.delay){timer=setTimeout(function(){self.hide(e);},conf.delay);}else{self.hide(e);}});if(title&&conf.cancelDefault){trigger.removeAttr("title");trigger.data("title",title);}
$.extend(self,{show:function(e){if(!tip){if(tipAttr){tip=$(tipAttr);}else if(conf.tip){tip=$(conf.tip).eq(0);}else if(title){tip=$(conf.layout).addClass(conf.tipClass).appendTo(document.body).hide().append(title);}else{tip=trigger.next();if(!tip.length){tip=trigger.parent().next();}}
if(!tip.length){throw"Cannot find tooltip for "+ trigger;}}
if(self.isShown()){return self;}
tip.stop(true,true);var pos=getPosition(trigger,tip,conf);if(conf.tip){tip.html(trigger.data("title"));}
e=$.Event();e.type="onBeforeShow";fire.trigger(e,[pos]);if(e.isDefaultPrevented()){return self;}
pos=getPosition(trigger,tip,conf);tip.css({position:'absolute',top:pos.top,left:pos.left});shown=true;effect[0].call(self,function(){e.type="onShow";shown='full';fire.trigger(e);});var event=conf.events.tooltip.split(/,\s*/);if(!tip.data("__set")){tip.unbind(event[0]).bind(event[0],function(){clearTimeout(timer);clearTimeout(pretimer);});if(event[1]&&!trigger.is("input:not(:checkbox, :radio), textarea")){tip.unbind(event[1]).bind(event[1],function(e){if(e.relatedTarget!=trigger[0]){trigger.trigger(evt[1].split(" ")[0]);}});}
if(!conf.tip)tip.data("__set",true);}
return self;},hide:function(e){if(!tip||!self.isShown()){return self;}
e=$.Event();e.type="onBeforeHide";fire.trigger(e);if(e.isDefaultPrevented()){return;}
shown=false;effects[conf.effect][1].call(self,function(){e.type="onHide";fire.trigger(e);});return self;},isShown:function(fully){return fully?shown=='full':shown;},getConf:function(){return conf;},getTip:function(){return tip;},getTrigger:function(){return trigger;}});$.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(i,name){if($.isFunction(conf[name])){$(self).bind(name,conf[name]);}
self[name]=function(fn){if(fn){$(self).bind(name,fn);}
return self;};});}
$.fn.tooltip=function(conf){var api=this.data("tooltip");if(api){return api;}
conf=$.extend(true,{},$.tools.tooltip.conf,conf);if(typeof conf.position=='string'){conf.position=conf.position.split(/,?\s/);}
this.each(function(){api=new Tooltip($(this),conf);$(this).data("tooltip",api);});return conf.api?api:this;};})(jQuery);(function($){var t=$.tools.tooltip;t.dynamic={conf:{classNames:"top right bottom left"}};function getCropping(el){var w=$(window);var right=w.width()+ w.scrollLeft();var bottom=w.height()+ w.scrollTop();return[el.offset().top<=w.scrollTop(),right<=el.offset().left+ el.width(),bottom<=el.offset().top+ el.height(),w.scrollLeft()>=el.offset().left];}
function isVisible(crop){var i=crop.length;while(i--){if(crop[i]){return false;}}
return true;}
$.fn.dynamic=function(conf){if(typeof conf=='number'){conf={speed:conf};}
conf=$.extend({},t.dynamic.conf,conf);var confOrigin=$.extend(true,{},conf),cls=conf.classNames.split(/\s/),orig;this.each(function(){var api=$(this).tooltip().onBeforeShow(function(e,pos){var tip=this.getTip(),tipConf=this.getConf();if(!orig){orig=[tipConf.position[0],tipConf.position[1],tipConf.offset[0],tipConf.offset[1],$.extend({},tipConf)];}
$.extend(tipConf,orig[4]);tipConf.position=[orig[0],orig[1]];tipConf.offset=[orig[2],orig[3]];tip.css({visibility:'hidden',position:'absolute',top:pos.top,left:pos.left}).show();var conf=$.extend(true,{},confOrigin),crop=getCropping(tip);if(!isVisible(crop)){if(crop[2]){$.extend(tipConf,conf.top);tipConf.position[0]='top';tip.addClass(cls[0]);}
if(crop[3]){$.extend(tipConf,conf.right);tipConf.position[1]='right';tip.addClass(cls[1]);}
if(crop[0]){$.extend(tipConf,conf.bottom);tipConf.position[0]='bottom';tip.addClass(cls[2]);}
if(crop[1]){$.extend(tipConf,conf.left);tipConf.position[1]='left';tip.addClass(cls[3]);}
if(crop[0]||crop[2]){tipConf.offset[0]*=-1;}
if(crop[1]||crop[3]){tipConf.offset[1]*=-1;}}
tip.css({visibility:'visible'}).hide();});api.onBeforeShow(function(){var c=this.getConf(),tip=this.getTip();setTimeout(function(){c.position=[orig[0],orig[1]];c.offset=[orig[2],orig[3]];},0);});api.onHide(function(){var tip=this.getTip();tip.removeClass(conf.classNames);});ret=api;});return conf.api?ret:this;};})(jQuery);(function($){var t=$.tools.tooltip;$.extend(t.conf,{direction:'up',bounce:false,slideOffset:10,slideInSpeed:200,slideOutSpeed:200,slideFade:!$.browser.msie});var dirs={up:['-','top'],down:['+','top'],left:['-','left'],right:['+','left']};t.addEffect("slide",function(done){var conf=this.getConf(),tip=this.getTip(),params=conf.slideFade?{opacity:conf.opacity}:{},dir=dirs[conf.direction]||dirs.up;params[dir[1]]=dir[0]+'='+ conf.slideOffset;if(conf.slideFade){tip.css({opacity:0});}
tip.show().animate(params,conf.slideInSpeed,done);},function(done){var conf=this.getConf(),offset=conf.slideOffset,params=conf.slideFade?{opacity:0}:{},dir=dirs[conf.direction]||dirs.up;var sign=""+ dir[0];if(conf.bounce){sign=sign=='+'?'-':'+';}
params[dir[1]]=sign+'='+ offset;this.getTip().animate(params,conf.slideOutSpeed,function(){$(this).hide();done.call();});});})(jQuery);(function($){$.tools=$.tools||{version:'1.2.6'};var typeRe=/\[type=([a-z]+)\]/,numRe=/^-?[0-9]*(\.[0-9]+)?$/,dateInput=$.tools.dateinput,emailRe=/^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i,urlRe=/^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i,v;v=$.tools.validator={conf:{grouped:false,effect:'default',errorClass:'invalid',inputEvent:null,errorInputEvent:'keyup',formEvent:'submit',lang:'en',message:'<div/>',messageAttr:'data-message',messageClass:'error',offset:[0,0],position:'center right',singleError:false,speed:'normal'},messages:{"*":{en:"Please correct this value"}},localize:function(lang,messages){$.each(messages,function(key,msg){v.messages[key]=v.messages[key]||{};v.messages[key][lang]=msg;});},localizeFn:function(key,messages){v.messages[key]=v.messages[key]||{};$.extend(v.messages[key],messages);},fn:function(matcher,msg,fn){if($.isFunction(msg)){fn=msg;}else{if(typeof msg=='string'){msg={en:msg};}
this.messages[matcher.key||matcher]=msg;}
var test=typeRe.exec(matcher);if(test){matcher=isType(test[1]);}
fns.push([matcher,fn]);},addEffect:function(name,showFn,closeFn){effects[name]=[showFn,closeFn];}};function getPosition(trigger,el,conf){var top=trigger.offset().top,left=trigger.offset().left,pos=conf.position.split(/,?\s+/),y=pos[0],x=pos[1];top-=el.outerHeight()- conf.offset[0];left+=trigger.outerWidth()+ conf.offset[1];if(/iPad/i.test(navigator.userAgent)){top-=$(window).scrollTop();}
var height=el.outerHeight()+ trigger.outerHeight();if(y=='center'){top+=height/2;}
if(y=='bottom'){top+=height;}
var width=trigger.outerWidth();if(x=='center'){left-=(width+ el.outerWidth())/2;}
if(x=='left'){left-=width;}
return{top:top,left:left};}
function isType(type){function fn(){return this.getAttribute("type")==type;}
fn.key="[type="+ type+"]";return fn;}
var fns=[],effects={'default':[function(errs){var conf=this.getConf();$.each(errs,function(i,err){var input=err.input;input.addClass(conf.errorClass);var msg=input.data("msg.el");if(!msg){msg=$(conf.message).addClass(conf.messageClass).appendTo(document.body);input.data("msg.el",msg);}
msg.css({visibility:'hidden'}).find("p").remove();$.each(err.messages,function(i,m){$("<p/>").html(m).appendTo(msg);});if(msg.outerWidth()==msg.parent().width()){msg.add(msg.find("p")).css({display:'inline'});}
var pos=getPosition(input,msg,conf);msg.css({visibility:'visible',position:'absolute',top:pos.top,left:pos.left}).fadeIn(conf.speed);});},function(inputs){var conf=this.getConf();inputs.removeClass(conf.errorClass).each(function(){var msg=$(this).data("msg.el");if(msg){msg.css({visibility:'hidden'});}});}]};$.each("email,url,number".split(","),function(i,key){$.expr[':'][key]=function(el){return el.getAttribute("type")===key;};});$.fn.oninvalid=function(fn){return this[fn?"bind":"trigger"]("OI",fn);};v.fn(":email","Please enter a valid email address",function(el,v){return!v||emailRe.test(v);});v.fn(":url","Please enter a valid URL",function(el,v){return!v||urlRe.test(v);});v.fn(":number","Please enter a numeric value.",function(el,v){return numRe.test(v);});v.fn("[max]","Please enter a value no larger than $1",function(el,v){if(v===''||dateInput&&el.is(":date")){return true;}
var max=el.attr("max");return parseFloat(v)<=parseFloat(max)?true:[max];});v.fn("[min]","Please enter a value of at least $1",function(el,v){if(v===''||dateInput&&el.is(":date")){return true;}
var min=el.attr("min");return parseFloat(v)>=parseFloat(min)?true:[min];});v.fn("[required]","Please complete this mandatory field.",function(el,v){if(el.is(":checkbox")){return el.is(":checked");}
return!!v;});v.fn("[pattern]",function(el){var p=new RegExp("^"+ el.attr("pattern")+"$");return p.test(el.val());});function Validator(inputs,form,conf){var self=this,fire=form.add(self);inputs=inputs.not(":button, :image, :reset, :submit");form.attr("novalidate","novalidate");function pushMessage(to,matcher,returnValue){if(!conf.grouped&&to.length){return;}
var msg;if(returnValue===false||$.isArray(returnValue)){msg=v.messages[matcher.key||matcher]||v.messages["*"];msg=msg[conf.lang]||v.messages["*"].en;var matches=msg.match(/\$\d/g);if(matches&&$.isArray(returnValue)){$.each(matches,function(i){msg=msg.replace(this,returnValue[i]);});}}else{msg=returnValue[conf.lang]||returnValue;}
to.push(msg);}
$.extend(self,{getConf:function(){return conf;},getForm:function(){return form;},getInputs:function(){return inputs;},reflow:function(){inputs.each(function(){var input=$(this),msg=input.data("msg.el");if(msg){var pos=getPosition(input,msg,conf);msg.css({top:pos.top,left:pos.left});}});return self;},invalidate:function(errs,e){if(!e){var errors=[];$.each(errs,function(key,val){var input=inputs.filter("[name='"+ key+"']");if(input.length){input.trigger("OI",[val]);errors.push({input:input,messages:[val]});}});errs=errors;e=$.Event();}
e.type="onFail";fire.trigger(e,[errs]);if(!e.isDefaultPrevented()){effects[conf.effect][0].call(self,errs,e);}
return self;},reset:function(els){els=els||inputs;els.removeClass(conf.errorClass).each(function(){var msg=$(this).data("msg.el");if(msg){msg.remove();$(this).data("msg.el",null);}}).unbind(conf.errorInputEvent||'');return self;},destroy:function(){form.unbind(conf.formEvent+".V").unbind("reset.V");inputs.unbind(conf.inputEvent+".V").unbind("change.V");return self.reset();},checkValidity:function(els,e){els=els||inputs;els=els.not(":disabled");if(!els.length){return true;}
e=e||$.Event();e.type="onBeforeValidate";fire.trigger(e,[els]);if(e.isDefaultPrevented()){return e.result;}
var errs=[];els.not(":radio:not(:checked)").each(function(){var msgs=[],el=$(this).data("messages",msgs),event=dateInput&&el.is(":date")?"onHide.v":conf.errorInputEvent+".v";el.unbind(event);$.each(fns,function(){var fn=this,match=fn[0];if(el.filter(match).length){var returnValue=fn[1].call(self,el,el.val());if(returnValue!==true){e.type="onBeforeFail";fire.trigger(e,[el,match]);if(e.isDefaultPrevented()){return false;}
var msg=el.attr(conf.messageAttr);if(msg){msgs=[msg];return false;}else{pushMessage(msgs,match,returnValue);}}}});if(msgs.length){errs.push({input:el,messages:msgs});el.trigger("OI",[msgs]);if(conf.errorInputEvent){el.bind(event,function(e){self.checkValidity(el,e);});}}
if(conf.singleError&&errs.length){return false;}});var eff=effects[conf.effect];if(!eff){throw"Validator: cannot find effect \""+ conf.effect+"\"";}
if(errs.length){self.invalidate(errs,e);return false;}else{eff[1].call(self,els,e);e.type="onSuccess";fire.trigger(e,[els]);els.unbind(conf.errorInputEvent+".v");}
return true;}});$.each("onBeforeValidate,onBeforeFail,onFail,onSuccess".split(","),function(i,name){if($.isFunction(conf[name])){$(self).bind(name,conf[name]);}
self[name]=function(fn){if(fn){$(self).bind(name,fn);}
return self;};});if(conf.formEvent){form.bind(conf.formEvent+".V",function(e){if(!self.checkValidity(null,e)){return e.preventDefault();}
e.target=form;e.type=conf.formEvent;});}
form.bind("reset.V",function(){self.reset();});if(inputs[0]&&inputs[0].validity){inputs.each(function(){this.oninvalid=function(){return false;};});}
if(form[0]){form[0].checkValidity=self.checkValidity;}
if(conf.inputEvent){inputs.bind(conf.inputEvent+".V",function(e){self.checkValidity($(this),e);});}
inputs.filter(":checkbox, select").filter("[required]").bind("change.V",function(e){var el=$(this);if(this.checked||(el.is("select")&&$(this).val())){effects[conf.effect][1].call(self,el,e);}});var radios=inputs.filter(":radio").change(function(e){self.checkValidity(radios,e);});$(window).resize(function(){self.reflow();});}
$.fn.validator=function(conf){var instance=this.data("validator");if(instance){instance.destroy();this.removeData("validator");}
conf=$.extend(true,{},v.conf,conf);if(this.is("form")){return this.each(function(){var form=$(this);instance=new Validator(form.find(":input"),form,conf);form.data("validator",instance);});}else{instance=new Validator(this,this.eq(0).closest("form"),conf);return this.data("validator",instance);}};})(jQuery);;(function($){$.fn.dcMegaMenu=function(options){var defaults={classParent:'dc-mega',classContainer:'sub-container',classSubParent:'mega-hdr',classSubLink:'mega-hdr',classWidget:'dc-extra',rowItems:3,speed:'fast',effect:'fade',event:'hover',fullWidth:false,onLoad:function(){},beforeOpen:function(){},beforeClose:function(){}};var options=$.extend(defaults,options);var $dcMegaMenuObj=this;return $dcMegaMenuObj.each(function(options){var clSubParent=defaults.classSubParent;var clSubLink=defaults.classSubLink;var clParent=defaults.classParent;var clContainer=defaults.classContainer;var clWidget=defaults.classWidget;megaSetup();function megaOver(){var subNav=$('.sub',this);$(this).addClass('mega-hover');if(defaults.effect=='fade'){$(subNav).fadeIn(defaults.speed);}
if(defaults.effect=='slide'){$(subNav).show(defaults.speed);}
defaults.beforeOpen.call(this);}
function megaAction(obj){var subNav=$('.sub',obj);$(obj).addClass('mega-hover');$(obj).addClass('mega-hover');if(defaults.effect=='fade'){$(subNav).fadeIn(defaults.speed);}
if(defaults.effect=='slide'){$(subNav).show(defaults.speed);}
defaults.beforeOpen.call(this);}
function megaOut(){var subNav=$('.sub',this);$(this).removeClass('mega-hover');$(subNav).hide();defaults.beforeClose.call(this);}
function megaActionClose(obj){var subNav=$('.sub',obj);$(obj).removeClass('mega-hover');$(subNav).hide();defaults.beforeClose.call(this);}
function megaReset(){$('li',$dcMegaMenuObj).removeClass('mega-hover');$('.sub',$dcMegaMenuObj).hide();}
function megaSetup(){$arrow='<span class="dc-mega-icon"></span>';var clParentLi=clParent+'-li';var menuWidth=$dcMegaMenuObj.outerWidth();$('> li',$dcMegaMenuObj).each(function(){var $mainSub=$('> ul',this);var $primaryLink=$('> a',this);if($mainSub.length){$primaryLink.addClass(clParent).append($arrow);$mainSub.addClass('sub').wrap('<div class="'+clContainer+'" />');var pos=$(this).position();pl=pos.left;if($('ul',$mainSub).length){$(this).addClass(clParentLi);$('.'+clContainer,this).addClass('mega');$('> li',$mainSub).each(function(){if(!$(this).hasClass(clWidget)){$(this).addClass('mega-unit');if($('> ul',this).length){$(this).addClass(clSubParent);$('> a',this).addClass(clSubParent+'-a');}else{$(this).addClass(clSubLink);$('> a',this).addClass(clSubLink+'-a');}}});var hdrs=$('.mega-unit',this);rowSize=parseInt(defaults.rowItems);for(var i=0;i<hdrs.length;i+=rowSize){hdrs.slice(i,i+rowSize).wrapAll('<div class="row" />');}
$mainSub.show();var pw=$(this).width();var pr=pl+ pw;var mr=menuWidth- pr;var subw=$mainSub.outerWidth();var totw=$mainSub.parent('.'+clContainer).outerWidth();var cpad=totw- subw;if(defaults.fullWidth==true){var fw=menuWidth- cpad;$mainSub.parent('.'+clContainer).css({width:fw+'px'});$dcMegaMenuObj.addClass('full-width');}
var iw=$('.mega-unit',$mainSub).outerWidth(true);var rowItems=$('.row:eq(0) .mega-unit',$mainSub).length;var inneriw=iw*rowItems;var totiw=inneriw+ cpad;$('.row',this).each(function(){$('.mega-unit:last',this).addClass('last');var maxValue=undefined;$('.mega-unit > a',this).each(function(){var val=parseInt($(this).height());if(maxValue===undefined||maxValue<val){maxValue=val;}});$('.mega-unit > a',this).css('height',maxValue+'px');$(this).css('width',inneriw+'px');});if(defaults.fullWidth==true){params={left:0};}else{var ml=mr<ml?ml+ ml- mr:(totiw- pw)/2;var subLeft=pl- ml;var params={left:pl+'px',marginLeft:-ml+'px'};if(subLeft<0){params={left:0};}else if(mr<ml){params={right:0};}}
$('.'+clContainer,this).css(params);$('.row',$mainSub).each(function(){var $imgElement=$(this).find("img");$imgElement.load(function(){var rh=$(this).height();$('.mega-unit',this).css({height:rh+'px'});$(this).parent('.row').css({height:rh+'px'});});});$mainSub.hide();}else{$('.'+clContainer,this).addClass('non-mega').css('left',pl+'px');}}});var menuHeight=$('> li > a',$dcMegaMenuObj).outerHeight(true);$('.'+clContainer,$dcMegaMenuObj).css({top:menuHeight+'px'}).css('z-index','400');if(defaults.event=='hover'){var config={sensitivity:2,interval:100,over:megaOver,timeout:400,out:megaOut};$('li',$dcMegaMenuObj).hoverIntent(config);}
if(defaults.event=='click'){$('body').mouseup(function(e){if(!$(e.target).parents('.mega-hover').length){megaReset();}});$('> li > a.'+clParent,$dcMegaMenuObj).click(function(e){var $parentLi=$(this).parent();if($parentLi.hasClass('mega-hover')){megaActionClose($parentLi);}else{megaAction($parentLi);}
e.preventDefault();});}
defaults.onLoad.call(this);}});};})(jQuery);;(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+ Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}
if(p==this){return false;}
var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}
if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);;(function($){$.extend($.fn,{validate:function(options){if(!this.length){options&&options.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");return;}
var validator=$.data(this[0],'validator');if(validator){return validator;}
this.attr('novalidate','novalidate');validator=new $.validator(options,this[0]);$.data(this[0],'validator',validator);if(validator.settings.onsubmit){var inputsAndButtons=this.find("input, button");inputsAndButtons.filter(".cancel").click(function(){validator.cancelSubmit=true;});if(validator.settings.submitHandler){inputsAndButtons.filter(":submit").click(function(){validator.submitButton=this;});}
this.submit(function(event){if(validator.settings.debug)
event.preventDefault();function handle(){if(validator.settings.submitHandler){if(validator.submitButton){var hidden=$("<input type='hidden'/>").attr("name",validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);}
validator.settings.submitHandler.call(validator,validator.currentForm);if(validator.submitButton){hidden.remove();}
return false;}
return true;}
if(validator.cancelSubmit){validator.cancelSubmit=false;return handle();}
if(validator.form()){if(validator.pendingRequest){validator.formSubmitted=true;return false;}
return handle();}else{validator.focusInvalid();return false;}});}
return validator;},valid:function(){if($(this[0]).is('form')){return this.validate().form();}else{var valid=true;var validator=$(this[0].form).validate();this.each(function(){valid&=validator.element(this);});return valid;}},removeAttrs:function(attributes){var result={},$element=this;$.each(attributes.split(/\s/),function(index,value){result[value]=$element.attr(value);$element.removeAttr(value);});return result;},rules:function(command,argument){var element=this[0];if(command){var settings=$.data(element.form,'validator').settings;var staticRules=settings.rules;var existingRules=$.validator.staticRules(element);switch(command){case"add":$.extend(existingRules,$.validator.normalizeRule(argument));staticRules[element.name]=existingRules;if(argument.messages)
settings.messages[element.name]=$.extend(settings.messages[element.name],argument.messages);break;case"remove":if(!argument){delete staticRules[element.name];return existingRules;}
var filtered={};$.each(argument.split(/\s/),function(index,method){filtered[method]=existingRules[method];delete existingRules[method];});return filtered;}}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(element),$.validator.classRules(element),$.validator.attributeRules(element),$.validator.staticRules(element)),element);if(data.required){var param=data.required;delete data.required;data=$.extend({required:param},data);}
return data;}});$.extend($.expr[":"],{blank:function(a){return!$.trim(""+ a.value);},filled:function(a){return!!$.trim(""+ a.value);},unchecked:function(a){return!a.checked;}});$.validator=function(options,form){this.settings=$.extend(true,{},$.validator.defaults,options);this.currentForm=form;this.init();};$.validator.format=function(source,params){if(arguments.length==1)
return function(){var args=$.makeArray(arguments);args.unshift(source);return $.validator.format.apply(this,args);};if(arguments.length>2&&params.constructor!=Array){params=$.makeArray(arguments).slice(1);}
if(params.constructor!=Array){params=[params];}
$.each(params,function(i,n){source=source.replace(new RegExp("\\{"+ i+"\\}","g"),n);});return source;};$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(element,event){this.lastActive=element;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,element,this.settings.errorClass,this.settings.validClass);this.addWrapper(this.errorsFor(element)).hide();}},onfocusout:function(element,event){if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){this.element(element);}},onkeyup:function(element,event){if(element.name in this.submitted||element==this.lastElement){this.element(element);}},onclick:function(element,event){if(element.name in this.submitted)
this.element(element);else if(element.parentNode.name in this.submitted)
this.element(element.parentNode);},highlight:function(element,errorClass,validClass){if(element.type==='radio'){this.findByName(element.name).addClass(errorClass).removeClass(validClass);}else{$(element).addClass(errorClass).removeClass(validClass);}},unhighlight:function(element,errorClass,validClass){if(element.type==='radio'){this.findByName(element.name).removeClass(errorClass).addClass(validClass);}else{$(element).removeClass(errorClass).addClass(validClass);}}},setDefaults:function(settings){$.extend($.validator.defaults,settings);},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var groups=(this.groups={});$.each(this.settings.groups,function(key,value){$.each(value.split(/\s/),function(index,name){groups[name]=key;});});var rules=this.settings.rules;$.each(rules,function(key,value){rules[key]=$.validator.normalizeRule(value);});function delegate(event){var validator=$.data(this[0].form,"validator"),eventType="on"+ event.type.replace(/^validate/,"");validator.settings[eventType]&&validator.settings[eventType].call(validator,this[0],event);}
$(this.currentForm).validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, "+"[type='number'], [type='search'] ,[type='tel'], [type='url'], "+"[type='email'], [type='datetime'], [type='date'], [type='month'], "+"[type='week'], [type='time'], [type='datetime-local'], "+"[type='range'], [type='color'] ","focusin focusout keyup",delegate).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",delegate);if(this.settings.invalidHandler)
$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);},form:function(){this.checkForm();$.extend(this.submitted,this.errorMap);this.invalid=$.extend({},this.errorMap);if(!this.valid())
$(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid();},checkForm:function(){this.prepareForm();for(var i=0,elements=(this.currentElements=this.elements());elements[i];i++){this.check(elements[i]);}
return this.valid();},element:function(element){element=this.validationTargetFor(this.clean(element));this.lastElement=element;this.prepareElement(element);this.currentElements=$(element);var result=this.check(element);if(result){delete this.invalid[element.name];}else{this.invalid[element.name]=true;}
if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers);}
this.showErrors();return result;},showErrors:function(errors){if(errors){$.extend(this.errorMap,errors);this.errorList=[];for(var name in errors){this.errorList.push({message:errors[name],element:this.findByName(name)[0]});}
this.successList=$.grep(this.successList,function(element){return!(element.name in errors);});}
this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();},resetForm:function(){if($.fn.resetForm)
$(this.currentForm).resetForm();this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass);},numberOfInvalids:function(){return this.objectLength(this.invalid);},objectLength:function(obj){var count=0;for(var i in obj)
count++;return count;},hideErrors:function(){this.addWrapper(this.toHide).hide();},valid:function(){return this.size()==0;},size:function(){return this.errorList.length;},focusInvalid:function(){if(this.settings.focusInvalid){try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");}catch(e){}}},findLastActive:function(){var lastActive=this.lastActive;return lastActive&&$.grep(this.errorList,function(n){return n.element.name==lastActive.name;}).length==1&&lastActive;},elements:function(){var validator=this,rulesCache={};return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&validator.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in rulesCache||!validator.objectLength($(this).rules()))
return false;rulesCache[this.name]=true;return true;});},clean:function(selector){return $(selector)[0];},errors:function(){return $(this.settings.errorElement+"."+ this.settings.errorClass,this.errorContext);},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=$([]);this.toHide=$([]);this.currentElements=$([]);},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers);},prepareElement:function(element){this.reset();this.toHide=this.errorsFor(element);},check:function(element){element=this.validationTargetFor(this.clean(element));var rules=$(element).rules();var dependencyMismatch=false;for(var method in rules){var rule={method:method,parameters:rules[method]};try{var result=$.validator.methods[method].call(this,element.value.replace(/\r/g,""),element,rule.parameters);if(result=="dependency-mismatch"){dependencyMismatch=true;continue;}
dependencyMismatch=false;if(result=="pending"){this.toHide=this.toHide.not(this.errorsFor(element));return;}
if(!result){this.formatAndAdd(element,rule);return false;}}catch(e){this.settings.debug&&window.console&&console.log("exception occured when checking element "+ element.id
+", check the '"+ rule.method+"' method",e);throw e;}}
if(dependencyMismatch)
return;if(this.objectLength(rules))
this.successList.push(element);return true;},customMetaMessage:function(element,method){if(!$.metadata)
return;var meta=this.settings.meta?$(element).metadata()[this.settings.meta]:$(element).metadata();return meta&&meta.messages&&meta.messages[method];},customMessage:function(name,method){var m=this.settings.messages[name];return m&&(m.constructor==String?m:m[method]);},findDefined:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined)
return arguments[i];}
return undefined;},defaultMessage:function(element,method){return this.findDefined(this.customMessage(element.name,method),this.customMetaMessage(element,method),!this.settings.ignoreTitle&&element.title||undefined,$.validator.messages[method],"<strong>Warning: No message defined for "+ element.name+"</strong>");},formatAndAdd:function(element,rule){var message=this.defaultMessage(element,rule.method),theregex=/\$?\{(\d+)\}/g;if(typeof message=="function"){message=message.call(this,rule.parameters,element);}else if(theregex.test(message)){message=jQuery.format(message.replace(theregex,'{$1}'),rule.parameters);}
this.errorList.push({message:message,element:element});this.errorMap[element.name]=message;this.submitted[element.name]=message;},addWrapper:function(toToggle){if(this.settings.wrapper)
toToggle=toToggle.add(toToggle.parent(this.settings.wrapper));return toToggle;},defaultShowErrors:function(){for(var i=0;this.errorList[i];i++){var error=this.errorList[i];this.settings.highlight&&this.settings.highlight.call(this,error.element,this.settings.errorClass,this.settings.validClass);this.showLabel(error.element,error.message);}
if(this.errorList.length){this.toShow=this.toShow.add(this.containers);}
if(this.settings.success){for(var i=0;this.successList[i];i++){this.showLabel(this.successList[i]);}}
if(this.settings.unhighlight){for(var i=0,elements=this.validElements();elements[i];i++){this.settings.unhighlight.call(this,elements[i],this.settings.errorClass,this.settings.validClass);}}
this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show();},validElements:function(){return this.currentElements.not(this.invalidElements());},invalidElements:function(){return $(this.errorList).map(function(){return this.element;});},showLabel:function(element,message){var label=this.errorsFor(element);if(label.length){label.removeClass(this.settings.validClass).addClass(this.settings.errorClass);label.attr("generated")&&label.html(message);}else{label=$("<"+ this.settings.errorElement+"/>").attr({"for":this.idOrName(element),generated:true}).addClass(this.settings.errorClass).html(message||"");if(this.settings.wrapper){label=label.hide().show().wrap("<"+ this.settings.wrapper+"/>").parent();}
if(!this.labelContainer.append(label).length)
this.settings.errorPlacement?this.settings.errorPlacement(label,$(element)):label.insertAfter(element);}
if(!message&&this.settings.success){label.text("");typeof this.settings.success=="string"?label.addClass(this.settings.success):this.settings.success(label);}
this.toShow=this.toShow.add(label);},errorsFor:function(element){var name=this.idOrName(element);return this.errors().filter(function(){return $(this).attr('for')==name;});},idOrName:function(element){return this.groups[element.name]||(this.checkable(element)?element.name:element.id||element.name);},validationTargetFor:function(element){if(this.checkable(element)){element=this.findByName(element.name).not(this.settings.ignore)[0];}
return element;},checkable:function(element){return/radio|checkbox/i.test(element.type);},findByName:function(name){var form=this.currentForm;return $(document.getElementsByName(name)).map(function(index,element){return element.form==form&&element.name==name&&element||null;});},getLength:function(value,element){switch(element.nodeName.toLowerCase()){case'select':return $("option:selected",element).length;case'input':if(this.checkable(element))
return this.findByName(element.name).filter(':checked').length;}
return value.length;},depend:function(param,element){return this.dependTypes[typeof param]?this.dependTypes[typeof param](param,element):true;},dependTypes:{"boolean":function(param,element){return param;},"string":function(param,element){return!!$(param,element.form).length;},"function":function(param,element){return param(element);}},optional:function(element){return!$.validator.methods.required.call(this,$.trim(element.value),element)&&"dependency-mismatch";},startRequest:function(element){if(!this.pending[element.name]){this.pendingRequest++;this.pending[element.name]=true;}},stopRequest:function(element,valid){this.pendingRequest--;if(this.pendingRequest<0)
this.pendingRequest=0;delete this.pending[element.name];if(valid&&this.pendingRequest==0&&this.formSubmitted&&this.form()){$(this.currentForm).submit();this.formSubmitted=false;}else if(!valid&&this.pendingRequest==0&&this.formSubmitted){$(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false;}},previousValue:function(element){return $.data(element,"previousValue")||$.data(element,"previousValue",{old:null,valid:true,message:this.defaultMessage(element,"remote")});}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(className,rules){className.constructor==String?this.classRuleSettings[className]=rules:$.extend(this.classRuleSettings,className);},classRules:function(element){var rules={};var classes=$(element).attr('class');classes&&$.each(classes.split(' '),function(){if(this in $.validator.classRuleSettings){$.extend(rules,$.validator.classRuleSettings[this]);}});return rules;},attributeRules:function(element){var rules={};var $element=$(element);for(var method in $.validator.methods){var value;if(method==='required'&&typeof $.fn.prop==='function'){value=$element.prop(method);}else{value=$element.attr(method);}
if(value){rules[method]=value;}else if($element[0].getAttribute("type")===method){rules[method]=true;}}
if(rules.maxlength&&/-1|2147483647|524288/.test(rules.maxlength)){delete rules.maxlength;}
return rules;},metadataRules:function(element){if(!$.metadata)return{};var meta=$.data(element.form,'validator').settings.meta;return meta?$(element).metadata()[meta]:$(element).metadata();},staticRules:function(element){var rules={};var validator=$.data(element.form,'validator');if(validator.settings.rules){rules=$.validator.normalizeRule(validator.settings.rules[element.name])||{};}
return rules;},normalizeRules:function(rules,element){$.each(rules,function(prop,val){if(val===false){delete rules[prop];return;}
if(val.param||val.depends){var keepRule=true;switch(typeof val.depends){case"string":keepRule=!!$(val.depends,element.form).length;break;case"function":keepRule=val.depends.call(element,element);break;}
if(keepRule){rules[prop]=val.param!==undefined?val.param:true;}else{delete rules[prop];}}});$.each(rules,function(rule,parameter){rules[rule]=$.isFunction(parameter)?parameter(element):parameter;});$.each(['minlength','maxlength','min','max'],function(){if(rules[this]){rules[this]=Number(rules[this]);}});$.each(['rangelength','range'],function(){if(rules[this]){rules[this]=[Number(rules[this][0]),Number(rules[this][1])];}});if($.validator.autoCreateRanges){if(rules.min&&rules.max){rules.range=[rules.min,rules.max];delete rules.min;delete rules.max;}
if(rules.minlength&&rules.maxlength){rules.rangelength=[rules.minlength,rules.maxlength];delete rules.minlength;delete rules.maxlength;}}
if(rules.messages){delete rules.messages;}
return rules;},normalizeRule:function(data){if(typeof data=="string"){var transformed={};$.each(data.split(/\s/),function(){transformed[this]=true;});data=transformed;}
return data;},addMethod:function(name,method,message){$.validator.methods[name]=method;$.validator.messages[name]=message!=undefined?message:$.validator.messages[name];if(method.length<3){$.validator.addClassRules(name,$.validator.normalizeRule(name));}},methods:{required:function(value,element,param){if(!this.depend(param,element))
return"dependency-mismatch";switch(element.nodeName.toLowerCase()){case'select':var val=$(element).val();return val&&val.length>0;case'input':if(this.checkable(element))
return this.getLength(value,element)>0;default:return $.trim(value).length>0;}},remote:function(value,element,param){if(this.optional(element))
return"dependency-mismatch";var previous=this.previousValue(element);if(!this.settings.messages[element.name])
this.settings.messages[element.name]={};previous.originalMessage=this.settings.messages[element.name].remote;this.settings.messages[element.name].remote=previous.message;param=typeof param=="string"&&{url:param}||param;if(this.pending[element.name]){return"pending";}
if(previous.old===value){return previous.valid;}
previous.old=value;var validator=this;this.startRequest(element);var data={};data[element.name]=value;$.ajax($.extend(true,{url:param,mode:"abort",port:"validate"+ element.name,dataType:"json",data:data,success:function(response){validator.settings.messages[element.name].remote=previous.originalMessage;var valid=response===true;if(valid){var submitted=validator.formSubmitted;validator.prepareElement(element);validator.formSubmitted=submitted;validator.successList.push(element);validator.showErrors();}else{var errors={};var message=response||validator.defaultMessage(element,"remote");errors[element.name]=previous.message=$.isFunction(message)?message(value):message;validator.showErrors(errors);}
previous.valid=valid;validator.stopRequest(element,valid);}},param));return"pending";},minlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)>=param;},maxlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)<=param;},rangelength:function(value,element,param){var length=this.getLength($.trim(value),element);return this.optional(element)||(length>=param[0]&&length<=param[1]);},min:function(value,element,param){return this.optional(element)||value>=param;},max:function(value,element,param){return this.optional(element)||value<=param;},range:function(value,element,param){return this.optional(element)||(value>=param[0]&&value<=param[1]);},email:function(value,element){return this.optional(element)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);},url:function(value,element){return this.optional(element)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);},date:function(value,element){return this.optional(element)||!/Invalid|NaN/.test(new Date(value));},dateISO:function(value,element){return this.optional(element)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);},number:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);},digits:function(value,element){return this.optional(element)||/^\d+$/.test(value);},creditcard:function(value,element){if(this.optional(element))
return"dependency-mismatch";if(/[^0-9 -]+/.test(value))
return false;var nCheck=0,nDigit=0,bEven=false;value=value.replace(/\D/g,"");for(var n=value.length- 1;n>=0;n--){var cDigit=value.charAt(n);var nDigit=parseInt(cDigit,10);if(bEven){if((nDigit*=2)>9)
nDigit-=9;}
nCheck+=nDigit;bEven=!bEven;}
return(nCheck%10)==0;},accept:function(value,element,param){param=typeof param=="string"?param.replace(/,/g,'|'):"png|jpe?g|gif";return this.optional(element)||value.match(new RegExp(".("+ param+")$","i"));},equalTo:function(value,element,param){var target=$(param).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(element).valid();});return value==target.val();}}});$.format=$.validator.format;})(jQuery);;(function($){var pendingRequests={};if($.ajaxPrefilter){$.ajaxPrefilter(function(settings,_,xhr){var port=settings.port;if(settings.mode=="abort"){if(pendingRequests[port]){pendingRequests[port].abort();}
pendingRequests[port]=xhr;}});}else{var ajax=$.ajax;$.ajax=function(settings){var mode=("mode"in settings?settings:$.ajaxSettings).mode,port=("port"in settings?settings:$.ajaxSettings).port;if(mode=="abort"){if(pendingRequests[port]){pendingRequests[port].abort();}
return(pendingRequests[port]=ajax.apply(this,arguments));}
return ajax.apply(this,arguments);};}})(jQuery);;(function($){if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){$.each({focus:'focusin',blur:'focusout'},function(original,fix){$.event.special[fix]={setup:function(){this.addEventListener(original,handler,true);},teardown:function(){this.removeEventListener(original,handler,true);},handler:function(e){arguments[0]=$.event.fix(e);arguments[0].type=fix;return $.event.handle.apply(this,arguments);}};function handler(e){e=$.event.fix(e);e.type=fix;return $.event.handle.call(this,e);}});};$.extend($.fn,{validateDelegate:function(delegate,type,handler){return this.bind(type,function(event){var target=$(event.target);if(target.is(delegate)){return handler.apply(target,arguments);}});}});})(jQuery);jQuery.validator.addMethod("regex",function(value,element,regexp){var check=false;var re=new RegExp(regexp);return this.optional(element)||re.test(value);},"Some of the Characters you have entered are not supported.");jQuery.validator.addMethod("uidValid",function(uid,element){return(this.optional(element)||uid.match(/^[a-z][a-z0-9]*$/i));},"Please specify a valid user id");;(function($){var undef,window=this,doc=window.document,$doc=$(doc),$win=$(window),VERSION=1.25,DEBUG=true,TIMEOUT=30000,DUMMY=false,NAV=navigator.userAgent.toLowerCase(),HASH=window.location.hash.replace(/#\//,''),IE=(function(){var v=3,div=doc.createElement('div'),all=div.getElementsByTagName('i');do{div.innerHTML='<!--[if gt IE '+(++v)+']><i></i><![endif]-->';}while(all[0]);return v>4?v:undef;}()),DOM=function(){return{html:doc.documentElement,body:doc.body,head:doc.getElementsByTagName('head')[0],title:doc.title};},_eventlist='data ready thumbnail loadstart loadfinish image play pause progress '+'fullscreen_enter fullscreen_exit idle_enter idle_exit rescale '+'lightbox_open lightbox_close lightbox_image',_events=(function(){var evs=[];$.each(_eventlist.split(' '),function(i,ev){evs.push(ev);if(/_/.test(ev)){evs.push(ev.replace(/_/g,''));}});return evs;}()),_legacyOptions=function(options){var n;if(typeof options!=='object'){return options;}
$.each(options,function(key,value){if(/^[a-z]+_/.test(key)){n='';$.each(key.split('_'),function(i,k){n+=i>0?k.substr(0,1).toUpperCase()+ k.substr(1):k;});options[n]=value;delete options[key];}});return options;},_patchEvent=function(type){if($.inArray(type,_events)>-1){return Galleria[type.toUpperCase()];}
return type;},_timeouts={trunk:{},add:function(id,fn,delay,loop){loop=loop||false;this.clear(id);if(loop){var old=fn;fn=function(){old();_timeouts.add(id,fn,delay);};}
this.trunk[id]=window.setTimeout(fn,delay);},clear:function(id){var del=function(i){window.clearTimeout(this.trunk[i]);delete this.trunk[i];},i;if(!!id&&id in this.trunk){del.call(_timeouts,id);}else if(typeof id==='undefined'){for(i in this.trunk){if(this.trunk.hasOwnProperty(i)){del.call(_timeouts,i);}}}}},_galleries=[],_instances=[],_hasError=false,_canvas=false,_pool=[],_themeLoad=function(theme){Galleria.theme=theme;$.each(_pool,function(i,instance){instance._init.call(instance);});},Utils=(function(){return{array:function(obj){return Array.prototype.slice.call(obj,0);},create:function(className,nodeName){nodeName=nodeName||'div';var elem=doc.createElement(nodeName);elem.className=className;return elem;},getScriptPath:function(src){src=src||$('script:last').attr('src');var slices=src.split('/');if(slices.length==1){return'';}
slices.pop();return slices.join('/')+'/';},animate:(function(){var transition=(function(style){var props='transition WebkitTransition MozTransition OTransition'.split(' '),i;if(window.opera){return false;}
for(i=0;props[i];i++){if(typeof style[props[i]]!=='undefined'){return props[i];}}
return false;}((doc.body||doc.documentElement).style));var endEvent={MozTransition:'transitionend',OTransition:'oTransitionEnd',WebkitTransition:'webkitTransitionEnd',transition:'transitionend'}[transition];var easings={_default:[0.25,0.1,0.25,1],galleria:[0.645,0.045,0.355,1],galleriaIn:[0.55,0.085,0.68,0.53],galleriaOut:[0.25,0.46,0.45,0.94],ease:[0.25,0,0.25,1],linear:[0.25,0.25,0.75,0.75],'ease-in':[0.42,0,1,1],'ease-out':[0,0,0.58,1],'ease-in-out':[0.42,0,0.58,1]};var setStyle=function(elem,value,suffix){var css={};suffix=suffix||'transition';$.each('webkit moz ms o'.split(' '),function(){css['-'+ this+'-'+ suffix]=value;});elem.css(css);};var clearStyle=function(elem){setStyle(elem,'none','transition');if(Galleria.WEBKIT&&Galleria.TOUCH){setStyle(elem,'translate3d(0,0,0)','transform');if(elem.data('revert')){elem.css(elem.data('revert'));elem.data('revert',null);}}};var change,strings,easing,syntax,revert,form,css;return function(elem,to,options){options=$.extend({duration:400,complete:function(){},stop:false},options);elem=$(elem);if(!options.duration){elem.css(to);options.complete.call(elem[0]);return;}
if(!transition){elem.animate(to,options);return;}
if(options.stop){elem.unbind(endEvent);clearStyle(elem);}
change=false;$.each(to,function(key,val){css=elem.css(key);if(Utils.parseValue(css)!=Utils.parseValue(val)){change=true;}
elem.css(key,css);});if(!change){window.setTimeout(function(){options.complete.call(elem[0]);},options.duration);return;}
strings=[];easing=options.easing in easings?easings[options.easing]:easings._default;syntax=' '+ options.duration+'ms'+' cubic-bezier('+ easing.join(',')+')';window.setTimeout(function(){elem.one(endEvent,(function(elem){return function(){clearStyle(elem);options.complete.call(elem[0]);};}(elem)));if(Galleria.WEBKIT&&Galleria.TOUCH){revert={};form=[0,0,0];$.each(['left','top'],function(i,m){if(m in to){form[i]=(Utils.parseValue(to[m])- Utils.parseValue(elem.css(m)))+'px';revert[m]=to[m];delete to[m];}});if(form[0]||form[1]){elem.data('revert',revert);strings.push('-webkit-transform'+ syntax);setStyle(elem,'translate3d('+ form.join(',')+')','transform');}}
$.each(to,function(p,val){strings.push(p+ syntax);});setStyle(elem,strings.join(','));elem.css(to);},1);};}()),removeAlpha:function(elem){if(IE<9&&elem){var style=elem.style,currentStyle=elem.currentStyle,filter=currentStyle&&currentStyle.filter||style.filter||"";if(/alpha/.test(filter)){style.filter=filter.replace(/alpha\([^)]*\)/i,'');}}},forceStyles:function(elem,styles){elem=$(elem);if(elem.attr('style')){elem.data('styles',elem.attr('style')).removeAttr('style');}
elem.css(styles);},revertStyles:function(){$.each(Utils.array(arguments),function(i,elem){elem=$(elem);elem.removeAttr('style');elem.attr('style','');if(elem.data('styles')){elem.attr('style',elem.data('styles')).data('styles',null);}});},moveOut:function(elem){Utils.forceStyles(elem,{position:'absolute',left:-10000});},moveIn:function(){Utils.revertStyles.apply(Utils,Utils.array(arguments));},elem:function(elem){if(elem instanceof $){return{$:elem,dom:elem[0]};}else{return{$:$(elem),dom:elem};}},hide:function(elem,speed,callback){callback=callback||function(){};var el=Utils.elem(elem),$elem=el.$;elem=el.dom;if(!$elem.data('opacity')){$elem.data('opacity',$elem.css('opacity'));}
var style={opacity:0};if(speed){var complete=IE<9&&elem?function(){Utils.removeAlpha(elem);elem.style.visibility='hidden';callback.call(elem);}:callback;Utils.animate(elem,style,{duration:speed,complete:complete,stop:true});}else{if(IE<9&&elem){Utils.removeAlpha(elem);elem.style.visibility='hidden';}else{$elem.css(style);}}},show:function(elem,speed,callback){callback=callback||function(){};var el=Utils.elem(elem),$elem=el.$;elem=el.dom;var saved=parseFloat($elem.data('opacity'))||1,style={opacity:saved};if(speed){if(IE<9){$elem.css('opacity',0);elem.style.visibility='visible';}
var complete=IE<9&&elem?function(){if(style.opacity==1){Utils.removeAlpha(elem);}
callback.call(elem);}:callback;Utils.animate(elem,style,{duration:speed,complete:complete,stop:true});}else{if(IE<9&&style.opacity==1&&elem){Utils.removeAlpha(elem);elem.style.visibility='visible';}else{$elem.css(style);}}},optimizeTouch:(function(){var node,evs,fakes,travel,evt={},handler=function(e){e.preventDefault();evt=$.extend({},e,true);},attach=function(){this.evt=evt;},fake=function(){this.handler.call(node,this.evt);};return function(elem){$(elem).bind('touchend',function(e){node=e.target;travel=true;while(node.parentNode&&node!=e.currentTarget&&travel){evs=$(node).data('events');fakes=$(node).data('fakes');if(evs&&'click'in evs){travel=false;e.preventDefault();$(node).click(handler).click();evs.click.pop();$.each(evs.click,attach);$(node).data('fakes',evs.click);delete evs.click;}else if(fakes){travel=false;e.preventDefault();$.each(fakes,fake);}
node=node.parentNode;}});};}()),addTimer:function(){_timeouts.add.apply(_timeouts,Utils.array(arguments));return this;},clearTimer:function(){_timeouts.clear.apply(_timeouts,Utils.array(arguments));return this;},wait:function(options){options=$.extend({until:function(){return false;},success:function(){},error:function(){Galleria.raise('Could not complete wait function.');},timeout:3000},options);var start=Utils.timestamp(),elapsed,now,fn=function(){now=Utils.timestamp();elapsed=now- start;if(options.until(elapsed)){options.success();return false;}
if(now>=start+ options.timeout){options.error();return false;}
window.setTimeout(fn,10);};window.setTimeout(fn,10);},toggleQuality:function(img,force){if((IE!==7&&IE!==8)||!img){return;}
if(typeof force==='undefined'){force=img.style.msInterpolationMode==='nearest-neighbor';}
img.style.msInterpolationMode=force?'bicubic':'nearest-neighbor';},insertStyleTag:function(styles){var style=doc.createElement('style');DOM().head.appendChild(style);if(style.styleSheet){style.styleSheet.cssText=styles;}else{var cssText=doc.createTextNode(styles);style.appendChild(cssText);}},loadScript:function(url,callback){var done=false,script=$('<scr'+'ipt>').attr({src:url,async:true}).get(0);script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState==='loaded'||this.readyState==='complete')){done=true;script.onload=script.onreadystatechange=null;if(typeof callback==='function'){callback.call(this,this);}}};DOM().head.appendChild(script);},parseValue:function(val){if(typeof val==='number'){return val;}else if(typeof val==='string'){var arr=val.match(/\-?\d|\./g);return arr&&arr.constructor===Array?arr.join('')*1:0;}else{return 0;}},timestamp:function(){return new Date().getTime();},loadCSS:function(href,id,callback){var link,ready=false,length;$('link[rel=stylesheet]').each(function(){if(new RegExp(href).test(this.href)){link=this;return false;}});if(typeof id==='function'){callback=id;id=undef;}
callback=callback||function(){};if(link){callback.call(link,link);return link;}
length=doc.styleSheets.length;if(DEBUG){href+='?'+ Utils.timestamp();}
if($('#'+id).length){$('#'+id).attr('href',href);length--;ready=true;}else{link=$('<link>').attr({rel:'stylesheet',href:href,id:id}).get(0);window.setTimeout(function(){var styles=$('link[rel="stylesheet"], style');if(styles.length){styles.get(0).parentNode.insertBefore(link,styles[0]);}else{DOM().head.appendChild(link);}
if(IE){if(length>=31){Galleria.raise('You have reached the browser stylesheet limit (31)',true);return;}
link.onreadystatechange=function(e){if(!ready&&(!this.readyState||this.readyState==='loaded'||this.readyState==='complete')){ready=true;}};}else{if(!(new RegExp('file://','i').test(href))){$.ajax({url:href,success:function(){ready=true;},error:function(e){if(e.isRejected()&&Galleria.WEBKIT){ready=true;}}});}else{ready=true;}}},10);}
if(typeof callback==='function'){Utils.wait({until:function(){return ready&&doc.styleSheets.length>length;},success:function(){window.setTimeout(function(){callback.call(link,link);},100);},error:function(){Galleria.raise('Theme CSS could not load',true);},timeout:10000});}
return link;}};}()),_transitions=(function(){var _slide=function(params,complete,fade,door){var easing=this.getOptions('easing'),distance=this.getStageWidth(),from={left:distance*(params.rewind?-1:1)},to={left:0};if(fade){from.opacity=0;to.opacity=1;}
$(params.next).css(from);Utils.animate(params.next,to,{duration:params.speed,complete:(function(elems){return function(){complete();elems.css({left:0});};}($(params.next).add(params.prev))),queue:false,easing:easing});if(door){params.rewind=!params.rewind;}
if(params.prev){from={left:0};to={left:distance*(params.rewind?1:-1)};if(fade){from.opacity=1;to.opacity=0;}
$(params.prev).css(from);Utils.animate(params.prev,to,{duration:params.speed,queue:false,easing:easing,complete:function(){$(this).css('opacity',0);}});}};return{fade:function(params,complete){$(params.next).css('opacity',0).show();Utils.animate(params.next,{opacity:1},{duration:params.speed,complete:complete});if(params.prev){$(params.prev).css('opacity',1).show();Utils.animate(params.prev,{opacity:0},{duration:params.speed});}},flash:function(params,complete){$(params.next).css('opacity',0);if(params.prev){Utils.animate(params.prev,{opacity:0},{duration:params.speed/2,complete:function(){Utils.animate(params.next,{opacity:1},{duration:params.speed,complete:complete});}});}else{Utils.animate(params.next,{opacity:1},{duration:params.speed,complete:complete});}},pulse:function(params,complete){if(params.prev){$(params.prev).hide();}
$(params.next).css('opacity',0).show();Utils.animate(params.next,{opacity:1},{duration:params.speed,complete:complete});},slide:function(params,complete){_slide.apply(this,Utils.array(arguments));},fadeslide:function(params,complete){_slide.apply(this,Utils.array(arguments).concat([true]));},doorslide:function(params,complete){_slide.apply(this,Utils.array(arguments).concat([false,true]));}};}());Galleria=function(){var self=this;this._theme=undef;this._options={};this._playing=false;this._playtime=5000;this._active=null;this._queue={length:0};this._data=[];this._dom={};this._thumbnails=[];this._layers=[];this._initialized=false;this._firstrun=false;this._stageWidth=0;this._stageHeight=0;this._target=undef;this._id=Math.random();var divs='container stage images image-nav image-nav-left image-nav-right '+'info info-text info-title info-description '+'thumbnails thumbnails-list thumbnails-container thumb-nav-left thumb-nav-right '+'loader counter tooltip',spans='current total';$.each(divs.split(' '),function(i,elemId){self._dom[elemId]=Utils.create('galleria-'+ elemId);});$.each(spans.split(' '),function(i,elemId){self._dom[elemId]=Utils.create('galleria-'+ elemId,'span');});var keyboard=this._keyboard={keys:{'UP':38,'DOWN':40,'LEFT':37,'RIGHT':39,'RETURN':13,'ESCAPE':27,'BACKSPACE':8,'SPACE':32},map:{},bound:false,press:function(e){var key=e.keyCode||e.which;if(key in keyboard.map&&typeof keyboard.map[key]==='function'){keyboard.map[key].call(self,e);}},attach:function(map){var key,up;for(key in map){if(map.hasOwnProperty(key)){up=key.toUpperCase();if(up in keyboard.keys){keyboard.map[keyboard.keys[up]]=map[key];}else{keyboard.map[up]=map[key];}}}
if(!keyboard.bound){keyboard.bound=true;$doc.bind('keydown',keyboard.press);}},detach:function(){keyboard.bound=false;keyboard.map={};$doc.unbind('keydown',keyboard.press);}};var controls=this._controls={0:undef,1:undef,active:0,swap:function(){controls.active=controls.active?0:1;},getActive:function(){return controls[controls.active];},getNext:function(){return controls[1- controls.active];}};var carousel=this._carousel={next:self.$('thumb-nav-right'),prev:self.$('thumb-nav-left'),width:0,current:0,max:0,hooks:[],update:function(){var w=0,h=0,hooks=[0];$.each(self._thumbnails,function(i,thumb){if(thumb.ready){w+=thumb.outerWidth||$(thumb.container).outerWidth(true);hooks[i+1]=w;h=Math.max(h,thumb.outerHeight||$(thumb.container).outerHeight(true));}});self.$('thumbnails').css({width:w,height:h});carousel.max=w;carousel.hooks=hooks;carousel.width=self.$('thumbnails-list').width();carousel.setClasses();self.$('thumbnails-container').toggleClass('galleria-carousel',w>carousel.width);carousel.width=self.$('thumbnails-list').width();},bindControls:function(){var i;carousel.next.bind('click',function(e){e.preventDefault();if(self._options.carouselSteps==='auto'){for(i=carousel.current;i<carousel.hooks.length;i++){if(carousel.hooks[i]- carousel.hooks[carousel.current]>carousel.width){carousel.set(i- 2);break;}}}else{carousel.set(carousel.current+ self._options.carouselSteps);}});carousel.prev.bind('click',function(e){e.preventDefault();if(self._options.carouselSteps==='auto'){for(i=carousel.current;i>=0;i--){if(carousel.hooks[carousel.current]- carousel.hooks[i]>carousel.width){carousel.set(i+ 2);break;}else if(i===0){carousel.set(0);break;}}}else{carousel.set(carousel.current- self._options.carouselSteps);}});},set:function(i){i=Math.max(i,0);while(carousel.hooks[i- 1]+ carousel.width>=carousel.max&&i>=0){i--;}
carousel.current=i;carousel.animate();},getLast:function(i){return(i||carousel.current)- 1;},follow:function(i){if(i===0||i===carousel.hooks.length- 2){carousel.set(i);return;}
var last=carousel.current;while(carousel.hooks[last]- carousel.hooks[carousel.current]<carousel.width&&last<=carousel.hooks.length){last++;}
if(i- 1<carousel.current){carousel.set(i- 1);}else if(i+ 2>last){carousel.set(i- last+ carousel.current+ 2);}},setClasses:function(){carousel.prev.toggleClass('disabled',!carousel.current);carousel.next.toggleClass('disabled',carousel.hooks[carousel.current]+ carousel.width>=carousel.max);},animate:function(to){carousel.setClasses();var num=carousel.hooks[carousel.current]*-1;if(isNaN(num)){return;}
Utils.animate(self.get('thumbnails'),{left:num},{duration:self._options.carouselSpeed,easing:self._options.easing,queue:false});}};var tooltip=this._tooltip={initialized:false,open:false,init:function(){tooltip.initialized=true;var css='.galleria-tooltip{padding:3px 8px;max-width:50%;background:#ffe;color:#000;z-index:3;position:absolute;font-size:11px;line-height:1.3'+'opacity:0;box-shadow:0 0 2px rgba(0,0,0,.4);-moz-box-shadow:0 0 2px rgba(0,0,0,.4);-webkit-box-shadow:0 0 2px rgba(0,0,0,.4);}';Utils.insertStyleTag(css);self.$('tooltip').css('opacity',0.8);Utils.hide(self.get('tooltip'));},move:function(e){var mouseX=self.getMousePosition(e).x,mouseY=self.getMousePosition(e).y,$elem=self.$('tooltip'),x=mouseX,y=mouseY,height=$elem.outerHeight(true)+ 1,width=$elem.outerWidth(true),limitY=height+ 15;var maxX=self.$('container').width()- width- 2,maxY=self.$('container').height()- height- 2;if(!isNaN(x)&&!isNaN(y)){x+=10;y-=30;x=Math.max(0,Math.min(maxX,x));y=Math.max(0,Math.min(maxY,y));if(mouseY<limitY){y=limitY;}
$elem.css({left:x,top:y});}},bind:function(elem,value){if(Galleria.TOUCH){return;}
if(!tooltip.initialized){tooltip.init();}
var hover=function(elem,value){tooltip.define(elem,value);$(elem).hover(function(){Utils.clearTimer('switch_tooltip');self.$('container').unbind('mousemove',tooltip.move).bind('mousemove',tooltip.move).trigger('mousemove');tooltip.show(elem);Galleria.utils.addTimer('tooltip',function(){self.$('tooltip').stop().show().animate({opacity:1});tooltip.open=true;},tooltip.open?0:500);},function(){self.$('container').unbind('mousemove',tooltip.move);Utils.clearTimer('tooltip');self.$('tooltip').stop().animate({opacity:0},200,function(){self.$('tooltip').hide();Utils.addTimer('switch_tooltip',function(){tooltip.open=false;},1000);});});};if(typeof value==='string'){hover((elem in self._dom?self.get(elem):elem),value);}else{$.each(elem,function(elemID,val){hover(self.get(elemID),val);});}},show:function(elem){elem=$(elem in self._dom?self.get(elem):elem);var text=elem.data('tt'),mouseup=function(e){window.setTimeout((function(ev){return function(){tooltip.move(ev);};}(e)),10);elem.unbind('mouseup',mouseup);};text=typeof text==='function'?text():text;if(!text){return;}
self.$('tooltip').html(text.replace(/\s/,'&nbsp;'));elem.bind('mouseup',mouseup);},define:function(elem,value){if(typeof value!=='function'){var s=value;value=function(){return s;};}
elem=$(elem in self._dom?self.get(elem):elem).data('tt',value);tooltip.show(elem);}};var fullscreen=this._fullscreen={scrolled:0,crop:self._options.imageCrop,active:false,keymap:self._keyboard.map,enter:function(callback){fullscreen.active=true;Utils.hide(self.getActiveImage());self.$('container').addClass('fullscreen');fullscreen.scrolled=$win.scrollTop();Utils.forceStyles(self.get('container'),{position:'fixed',top:0,left:0,width:'100%',height:'100%',zIndex:10000});var htmlbody={height:'100%',overflow:'hidden',margin:0,padding:0},data=self.getData();Utils.forceStyles(DOM().html,htmlbody);Utils.forceStyles(DOM().body,htmlbody);fullscreen.keymap=$.extend({},self._keyboard.map);self.attachKeyboard({escape:self.exitFullscreen,right:self.next,left:self.prev});if(self._options.fullscreenCrop!==undef){self._options.imageCrop=self._options.fullscreenCrop;}
if(data&&data.big&&data.image!==data.big){var big=new Galleria.Picture(),cached=big.isCached(data.big),index=self.getIndex(),thumb=self._thumbnails[index];self.trigger({type:Galleria.LOADSTART,cached:cached,rewind:false,index:index,imageTarget:self.getActiveImage(),thumbTarget:thumb});big.load(data.big,function(big){self._scaleImage(big,{complete:function(big){self.trigger({type:Galleria.LOADFINISH,cached:cached,index:index,rewind:false,imageTarget:big.image,thumbTarget:thumb});var image=self._controls.getActive().image;if(image){$(image).width(big.image.width).height(big.image.height).attr('style',$(big.image).attr('style')).attr('src',big.image.src);}}});});}
self.rescale(function(){Utils.addTimer('fullscreen_enter',function(){Utils.show(self.getActiveImage());if(typeof callback==='function'){callback.call(self);}},100);self.trigger(Galleria.FULLSCREEN_ENTER);});$win.resize(function(){fullscreen.scale();});},scale:function(){self.rescale();},exit:function(callback){fullscreen.active=false;Utils.hide(self.getActiveImage());self.$('container').removeClass('fullscreen');Utils.revertStyles(self.get('container'),DOM().html,DOM().body);window.scrollTo(0,fullscreen.scrolled);self.detachKeyboard();self.attachKeyboard(fullscreen.keymap);if(self._options.fullscreenCrop!==undef){self._options.imageCrop=fullscreen.crop;}
self.rescale(function(){Utils.addTimer('fullscreen_exit',function(){Utils.show(self.getActiveImage());if(typeof callback==='function'){callback.call(self);}},50);self.trigger(Galleria.FULLSCREEN_EXIT);});$win.unbind('resize',fullscreen.scale);}};var idle=this._idle={trunk:[],bound:false,add:function(elem,to){if(!elem){return;}
if(!idle.bound){idle.addEvent();}
elem=$(elem);var from={},style;for(style in to){if(to.hasOwnProperty(style)){from[style]=elem.css(style);}}
elem.data('idle',{from:from,to:to,complete:true,busy:false});idle.addTimer();idle.trunk.push(elem);},remove:function(elem){elem=jQuery(elem);$.each(idle.trunk,function(i,el){if(el.length&&!el.not(elem).length){self._idle.show(elem);self._idle.trunk.splice(i,1);}});if(!idle.trunk.length){idle.removeEvent();Utils.clearTimer('idle');}},addEvent:function(){idle.bound=true;self.$('container').bind('mousemove click',idle.showAll);},removeEvent:function(){idle.bound=false;self.$('container').unbind('mousemove click',idle.showAll);},addTimer:function(){Utils.addTimer('idle',function(){self._idle.hide();},self._options.idleTime);},hide:function(){if(!self._options.idleMode){return;}
self.trigger(Galleria.IDLE_ENTER);$.each(idle.trunk,function(i,elem){var data=elem.data('idle');if(!data){return;}
elem.data('idle').complete=false;Utils.animate(elem,data.to,{duration:self._options.idleSpeed});});},showAll:function(){Utils.clearTimer('idle');$.each(self._idle.trunk,function(i,elem){self._idle.show(elem);});},show:function(elem){var data=elem.data('idle');if(!data.busy&&!data.complete){data.busy=true;self.trigger(Galleria.IDLE_EXIT);Utils.clearTimer('idle');Utils.animate(elem,data.from,{duration:self._options.idleSpeed/2,complete:function(){$(this).data('idle').busy=false;$(this).data('idle').complete=true;}});}
idle.addTimer();}};var lightbox=this._lightbox={width:0,height:0,initialized:false,active:null,image:null,elems:{},keymap:false,init:function(){self.trigger(Galleria.LIGHTBOX_OPEN);if(lightbox.initialized){return;}
lightbox.initialized=true;var elems='overlay box content shadow title info close prevholder prev nextholder next counter image',el={},op=self._options,css='',abs='position:absolute;',prefix='lightbox-',cssMap={overlay:'position:fixed;display:none;opacity:'+op.overlayOpacity+';filter:alpha(opacity='+(op.overlayOpacity*100)+');top:0;left:0;width:100%;height:100%;background:'+op.overlayBackground+';z-index:99990',box:'position:fixed;display:none;width:400px;height:400px;top:50%;left:50%;margin-top:-200px;margin-left:-200px;z-index:99991',shadow:abs+'background:#000;width:100%;height:100%;',content:abs+'background-color:#fff;top:10px;left:10px;right:10px;bottom:10px;overflow:hidden',info:abs+'bottom:10px;left:10px;right:10px;color:#444;font:11px/13px arial,sans-serif;height:13px',close:abs+'top:10px;right:10px;height:20px;width:20px;background:#fff;text-align:center;cursor:pointer;color:#444;font:16px/22px arial,sans-serif;z-index:99999',image:abs+'top:10px;left:10px;right:10px;bottom:30px;overflow:hidden;display:block;',prevholder:abs+'width:50%;top:0;bottom:40px;cursor:pointer;',nextholder:abs+'width:50%;top:0;bottom:40px;right:-1px;cursor:pointer;',prev:abs+'top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;left:20px;display:none;text-align:center;color:#000;font:bold 16px/36px arial,sans-serif',next:abs+'top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;right:20px;left:auto;display:none;font:bold 16px/36px arial,sans-serif;text-align:center;color:#000',title:'float:left',counter:'float:right;margin-left:8px;'},hover=function(elem){return elem.hover(function(){$(this).css('color','#bbb');},function(){$(this).css('color','#444');});},appends={};if(IE===8){cssMap.nextholder+='background:#000;filter:alpha(opacity=0);';cssMap.prevholder+='background:#000;filter:alpha(opacity=0);';}
$.each(cssMap,function(key,value){css+='.galleria-'+prefix+key+'{'+value+'}';});Utils.insertStyleTag(css);$.each(elems.split(' '),function(i,elemId){self.addElement('lightbox-'+ elemId);el[elemId]=lightbox.elems[elemId]=self.get('lightbox-'+ elemId);});lightbox.image=new Galleria.Picture();$.each({box:'shadow content close prevholder nextholder',info:'title counter',content:'info image',prevholder:'prev',nextholder:'next'},function(key,val){var arr=[];$.each(val.split(' '),function(i,prop){arr.push(prefix+ prop);});appends[prefix+key]=arr;});self.append(appends);$(el.image).append(lightbox.image.container);$(DOM().body).append(el.overlay,el.box);Utils.optimizeTouch(el.box);hover($(el.close).bind('click',lightbox.hide).html('&#215;'));$.each(['Prev','Next'],function(i,dir){var $d=$(el[dir.toLowerCase()]).html(/v/.test(dir)?'&#8249;&nbsp;':'&nbsp;&#8250;'),$e=$(el[dir.toLowerCase()+'holder']);$e.bind('click',function(){lightbox['show'+ dir]();});if(IE<8||Galleria.TOUCH){$d.show();return;}
$e.hover(function(){$d.show();},function(e){$d.stop().fadeOut(200);});});$(el.overlay).bind('click',lightbox.hide);if(Galleria.IPAD){self._options.lightboxTransitionSpeed=0;}},rescale:function(event){var width=Math.min($win.width()-40,lightbox.width),height=Math.min($win.height()-60,lightbox.height),ratio=Math.min(width/lightbox.width,height/lightbox.height),destWidth=Math.round(lightbox.width*ratio)+ 40,destHeight=Math.round(lightbox.height*ratio)+ 60,to={width:destWidth,height:destHeight,'margin-top':Math.ceil(destHeight/2)*- 1,'margin-left':Math.ceil(destWidth/2)*- 1};if(event){$(lightbox.elems.box).css(to);}else{$(lightbox.elems.box).animate(to,{duration:self._options.lightboxTransitionSpeed,easing:self._options.easing,complete:function(){var image=lightbox.image,speed=self._options.lightboxFadeSpeed;self.trigger({type:Galleria.LIGHTBOX_IMAGE,imageTarget:image.image});$(image.container).show();Utils.show(image.image,speed);Utils.show(lightbox.elems.info,speed);}});}},hide:function(){lightbox.image.image=null;$win.unbind('resize',lightbox.rescale);$(lightbox.elems.box).hide();Utils.hide(lightbox.elems.info);self.detachKeyboard();self.attachKeyboard(lightbox.keymap);lightbox.keymap=false;Utils.hide(lightbox.elems.overlay,200,function(){$(this).hide().css('opacity',self._options.overlayOpacity);self.trigger(Galleria.LIGHTBOX_CLOSE);});},showNext:function(){lightbox.show(self.getNext(lightbox.active));},showPrev:function(){lightbox.show(self.getPrev(lightbox.active));},show:function(index){lightbox.active=index=typeof index==='number'?index:self.getIndex();if(!lightbox.initialized){lightbox.init();}
if(!lightbox.keymap){lightbox.keymap=$.extend({},self._keyboard.map);self.attachKeyboard({escape:lightbox.hide,right:lightbox.showNext,left:lightbox.showPrev});}
$win.unbind('resize',lightbox.rescale);var data=self.getData(index),total=self.getDataLength();Utils.hide(lightbox.elems.info);lightbox.image.load(data.big||data.image,function(image){lightbox.width=image.original.width;lightbox.height=image.original.height;$(image.image).css({width:'100.5%',height:'100.5%',top:0,zIndex:99998});Utils.hide(image.image);lightbox.elems.title.innerHTML=data.title||'';lightbox.elems.counter.innerHTML=(index+ 1)+' / '+ total;$win.resize(lightbox.rescale);lightbox.rescale();});$(lightbox.elems.overlay).show();$(lightbox.elems.box).show();}};return this;};Galleria.prototype={constructor:Galleria,init:function(target,options){var self=this;options=_legacyOptions(options);this._original={target:target,options:options,data:null};this._target=this._dom.target=target.nodeName?target:$(target).get(0);_instances.push(this);if(!this._target){Galleria.raise('Target not found.',true);return;}
this._options={autoplay:false,carousel:true,carouselFollow:true,carouselSpeed:400,carouselSteps:'auto',clicknext:false,dataConfig:function(elem){return{};},dataSelector:'img',dataSource:this._target,debug:undef,dummy:undef,easing:'galleria',extend:function(options){},fullscreenCrop:undef,fullscreenDoubleTap:true,fullscreenTransition:undef,height:'auto',idleMode:true,idleTime:3000,idleSpeed:200,imageCrop:false,imageMargin:0,imagePan:false,imagePanSmoothness:12,imagePosition:'50%',imageTimeout:undef,initialTransition:undef,keepSource:false,layerFollow:true,lightbox:false,lightboxFadeSpeed:200,lightboxTransitionSpeed:200,linkSourceImages:true,maxScaleRatio:undef,minScaleRatio:undef,overlayOpacity:0.85,overlayBackground:'#0b0b0b',pauseOnInteraction:true,popupLinks:false,preload:2,queue:true,show:0,showInfo:true,showCounter:true,showImagenav:true,swipe:true,thumbCrop:true,thumbEventType:'click',thumbFit:true,thumbMargin:0,thumbQuality:'auto',thumbnails:true,touchTransition:undef,transition:'fade',transitionInitial:undef,transitionSpeed:400,useCanvas:false,width:'auto'};this._options.initialTransition=this._options.initialTransition||this._options.transitionInitial;if(options&&options.debug===false){DEBUG=false;}
if(options&&typeof options.imageTimeout==='number'){TIMEOUT=options.imageTimeout;}
if(options&&typeof options.dummy==='string'){DUMMY=options.dummy;}
$(this._target).children().hide();if(typeof Galleria.theme==='object'){this._init();}else{_pool.push(this);}
return this;},_init:function(){var self=this;if(this._initialized){Galleria.raise('Init failed: Gallery instance already initialized.');return this;}
this._initialized=true;if(!Galleria.theme){Galleria.raise('Init failed: No theme found.');return this;}
$.extend(true,this._options,Galleria.theme.defaults,this._original.options);(function(can){if(!('getContext'in can)){can=null;return;}
_canvas=_canvas||{elem:can,context:can.getContext('2d'),cache:{},length:0};}(doc.createElement('canvas')));this.bind(Galleria.DATA,function(){this._original.data=this._data;this.get('total').innerHTML=this.getDataLength();var $container=this.$('container');var num={width:0,height:0};var testHeight=function(){return self.$('stage').height();};Utils.wait({until:function(){$.each(['width','height'],function(i,m){if(self._options[m]&&typeof self._options[m]==='number'){num[m]=self._options[m];}else{num[m]=Math.max(Utils.parseValue($container.css(m)),Utils.parseValue(self.$('target').css(m)),$container[m](),self.$('target')[m]());}
$container[m](num[m]);});return testHeight()&&num.width&&num.height>10;},success:function(){if(Galleria.WEBKIT){window.setTimeout(function(){self._run();},1);}else{self._run();}},error:function(){if(testHeight()){Galleria.raise('Could not extract sufficient width/height of the gallery container. Traced measures: width:'+ num.width+'px, height: '+ num.height+'px.',true);}else{Galleria.raise('Could not extract a stage height from the CSS. Traced height: '+ testHeight()+'px.',true);}},timeout:2000});});this.append({'info-text':['info-title','info-description'],'info':['info-text'],'image-nav':['image-nav-right','image-nav-left'],'stage':['images','loader','counter','image-nav'],'thumbnails-list':['thumbnails'],'thumbnails-container':['thumb-nav-left','thumbnails-list','thumb-nav-right'],'container':['stage','thumbnails-container','info','tooltip']});Utils.hide(this.$('counter').append(this.get('current'),' / ',this.get('total')));this.setCounter('&#8211;');Utils.hide(self.get('tooltip'));this.$('container').addClass(Galleria.TOUCH?'touch':'notouch');$.each(new Array(2),function(i){var image=new Galleria.Picture();$(image.container).css({position:'absolute',top:0,left:0}).prepend(self._layers[i]=$(Utils.create('galleria-layer')).css({position:'absolute',top:0,left:0,right:0,bottom:0,zIndex:2})[0]);self.$('images').append(image.container);self._controls[i]=image;});this.$('images').css({position:'relative',top:0,left:0,width:'100%',height:'100%'});this.$('thumbnails, thumbnails-list').css({overflow:'hidden',position:'relative'});this.$('image-nav-right, image-nav-left').bind('click',function(e){if(self._options.clicknext){e.stopPropagation();}
if(self._options.pauseOnInteraction){self.pause();}
var fn=/right/.test(this.className)?'next':'prev';self[fn]();});$.each(['info','counter','image-nav'],function(i,el){if(self._options['show'+ el.substr(0,1).toUpperCase()+ el.substr(1).replace(/-/,'')]===false){Utils.moveOut(self.get(el.toLowerCase()));}});this.load();if(!this._options.keep_source&&!IE){this._target.innerHTML='';}
if(this.get('errors')){this.appendChild('target','errors');}
this.appendChild('target','container');if(this._options.carousel){var count=0,show=this._options.show;this.bind(Galleria.THUMBNAIL,function(){this.updateCarousel();if(++count==this.getDataLength()&&typeof show=='number'&&show>0){this._carousel.follow(show);}});}
if(this._options.swipe){(function(images){var swipeStart=[0,0],swipeStop=[0,0],limitX=30,limitY=100,multi=false,tid=0,data,ev={start:'touchstart',move:'touchmove',stop:'touchend'},getData=function(e){return e.originalEvent.touches?e.originalEvent.touches[0]:e;},moveHandler=function(e){if(e.originalEvent.touches&&e.originalEvent.touches.length>1){return;}
data=getData(e);swipeStop=[data.pageX,data.pageY];if(!swipeStart[0]){swipeStart=swipeStop;}
if(Math.abs(swipeStart[0]- swipeStop[0])>10){e.preventDefault();}},upHandler=function(e){images.unbind(ev.move,moveHandler);if((e.originalEvent.touches&&e.originalEvent.touches.length)||multi){multi=!multi;return;}
if(Utils.timestamp()- tid<1000&&Math.abs(swipeStart[0]- swipeStop[0])>limitX&&Math.abs(swipeStart[1]- swipeStop[1])<limitY){e.preventDefault();self[swipeStart[0]>swipeStop[0]?'next':'prev']();}
swipeStart=swipeStop=[0,0];};images.bind(ev.start,function(e){if(e.originalEvent.touches&&e.originalEvent.touches.length>1){return;}
data=getData(e);tid=Utils.timestamp();swipeStart=swipeStop=[data.pageX,data.pageY];images.bind(ev.move,moveHandler).one(ev.stop,upHandler);});}(self.$('images')));if(this._options.fullscreenDoubleTap){this.$('stage').bind('touchstart',(function(){var last,cx,cy,lx,ly,now,getData=function(e){return e.originalEvent.touches?e.originalEvent.touches[0]:e;};return function(e){now=Galleria.utils.timestamp();cx=getData(e).pageX;cy=getData(e).pageY;if((now- last<500)&&(cx- lx<20)&&(cy- ly<20)){self.toggleFullscreen();e.preventDefault();self.$('stage').unbind('touchend',arguments.callee);return;}
last=now;lx=cx;ly=cy;};}()));}}
Utils.optimizeTouch(this.get('container'));return this;},_createThumbnails:function(){this.get('total').innerHTML=this.getDataLength();var i,src,thumb,data,$container,self=this,o=this._options,active=(function(){var a=self.$('thumbnails').find('.active');if(!a.length){return false;}
return a.find('img').attr('src');}()),optval=typeof o.thumbnails==='string'?o.thumbnails.toLowerCase():null,getStyle=function(prop){return doc.defaultView&&doc.defaultView.getComputedStyle?doc.defaultView.getComputedStyle(thumb.container,null)[prop]:$container.css(prop);},fake=function(image,index,container){return function(){$(container).append(image);self.trigger({type:Galleria.THUMBNAIL,thumbTarget:image,index:index});};},onThumbEvent=function(e){if(o.pauseOnInteraction){self.pause();}
var index=$(e.currentTarget).data('index');if(self.getIndex()!==index){self.show(index);}
e.preventDefault();},onThumbLoad=function(thumb){thumb.scale({width:thumb.data.width,height:thumb.data.height,crop:o.thumbCrop,margin:o.thumbMargin,canvas:o.useCanvas,complete:function(thumb){var top=['left','top'],arr=['Width','Height'],m,css;$.each(arr,function(i,measure){m=measure.toLowerCase();if((o.thumbCrop!==true||o.thumbCrop===m)&&o.thumbFit){css={};css[m]=thumb[m];$(thumb.container).css(css);css={};css[top[i]]=0;$(thumb.image).css(css);}
thumb['outer'+ measure]=$(thumb.container)['outer'+ measure](true);});Utils.toggleQuality(thumb.image,o.thumbQuality===true||(o.thumbQuality==='auto'&&thumb.original.width<thumb.width*3));self.trigger({type:Galleria.THUMBNAIL,thumbTarget:thumb.image,index:thumb.data.order});}});};this._thumbnails=[];this.$('thumbnails').empty();for(i=0;this._data[i];i++){data=this._data[i];if(o.thumbnails===true){thumb=new Galleria.Picture(i);src=data.thumb||data.image;this.$('thumbnails').append(thumb.container);$container=$(thumb.container);thumb.data={width:Utils.parseValue(getStyle('width')),height:Utils.parseValue(getStyle('height')),order:i};if(o.thumbFit&&o.thumbCrop!==true){$container.css({width:0,height:0});}else{$container.css({width:thumb.data.width,height:thumb.data.height});}
thumb.load(src,onThumbLoad);if(o.preload==='all'){thumb.preload(data.image);}}else if(optval==='empty'||optval==='numbers'){thumb={container:Utils.create('galleria-image'),image:Utils.create('img','span'),ready:true};if(optval==='numbers'){$(thumb.image).text(i+ 1);}
this.$('thumbnails').append(thumb.container);window.setTimeout((fake)(thumb.image,i,thumb.container),50+(i*20));}else{thumb={container:null,image:null};}
$(thumb.container).add(o.keepSource&&o.linkSourceImages?data.original:null).data('index',i).bind(o.thumbEventType,onThumbEvent);if(active===src){$(thumb.container).addClass('active');}
this._thumbnails.push(thumb);}},_run:function(){var self=this;self._createThumbnails();Utils.wait({until:function(){if(Galleria.OPERA){self.$('stage').css('display','inline-block');}
self._stageWidth=self.$('stage').width();self._stageHeight=self.$('stage').height();return(self._stageWidth&&self._stageHeight>50);},success:function(){_galleries.push(self);Utils.show(self.get('counter'));if(self._options.carousel){self._carousel.bindControls();}
if(self._options.autoplay){self.pause();if(typeof self._options.autoplay==='number'){self._playtime=self._options.autoplay;}
self.trigger(Galleria.PLAY);self._playing=true;}
if(self._firstrun){if(typeof self._options.show==='number'){self.show(self._options.show);}
return;}
self._firstrun=true;if(self._options.clicknext&&!Galleria.TOUCH){$.each(self._data,function(i,data){delete data.link;});self.$('stage').css({cursor:'pointer'}).bind('click',function(e){if(self._options.pauseOnInteraction){self.pause();}
self.next();});}
if(Galleria.History){Galleria.History.change(function(value){if(isNaN(value)){window.history.go(-1);}else{self.show(value,undef,true);}});}
$.each(Galleria.ready.callbacks,function(){this.call(self,self._options);});self.trigger(Galleria.READY);Galleria.theme.init.call(self,self._options);self._options.extend.call(self,self._options);if(/^[0-9]{1,4}$/.test(HASH)&&Galleria.History){self.show(HASH,undef,true);}else if(self._data[self._options.show]){self.show(self._options.show);}},error:function(){Galleria.raise('Stage width or height is too small to show the gallery. Traced measures: width:'+ self._stageWidth+'px, height: '+ self._stageHeight+'px.',true);}});},load:function(source,selector,config){var self=this;this._data=[];this._thumbnails=[];this.$('thumbnails').empty();if(typeof selector==='function'){config=selector;selector=null;}
source=source||this._options.dataSource;selector=selector||this._options.dataSelector;config=config||this._options.dataConfig;if(/^function Object/.test(source.constructor)){source=[source];}
if(source.constructor===Array){if(this.validate(source)){this._data=source;this._parseData().trigger(Galleria.DATA);}else{Galleria.raise('Load failed: JSON Array not valid.');}
return this;}
$(source).find(selector).each(function(i,img){img=$(img);var data={},parent=img.parent(),href=parent.attr('href'),rel=parent.attr('rel');if(href){data.image=data.big=href;}
if(rel){data.big=rel;}
self._data.push($.extend({title:img.attr('title')||'',thumb:img.attr('src'),image:img.attr('src'),big:img.attr('src'),description:img.attr('alt')||'',link:img.attr('longdesc'),original:img.get(0)},data,config(img)));});if(this.getDataLength()){this.trigger(Galleria.DATA);}else{Galleria.raise('Load failed: no data found.');}
return this;},_parseData:function(){var self=this;$.each(this._data,function(i,data){if('thumb'in data===false){self._data[i].thumb=data.image;}
if(!'big'in data){self._data[i].big=data.image;}});return this;},splice:function(){Array.prototype.splice.apply(this._data,Utils.array(arguments));return this._parseData()._createThumbnails();},push:function(){Array.prototype.push.apply(this._data,Utils.array(arguments));return this._parseData()._createThumbnails();},_getActive:function(){return this._controls.getActive();},validate:function(data){return true;},bind:function(type,fn){type=_patchEvent(type);this.$('container').bind(type,this.proxy(fn));return this;},unbind:function(type){type=_patchEvent(type);this.$('container').unbind(type);return this;},trigger:function(type){type=typeof type==='object'?$.extend(type,{scope:this}):{type:_patchEvent(type),scope:this};this.$('container').trigger(type);return this;},addIdleState:function(elem,styles){this._idle.add.apply(this._idle,Utils.array(arguments));return this;},removeIdleState:function(elem){this._idle.remove.apply(this._idle,Utils.array(arguments));return this;},enterIdleMode:function(){this._idle.hide();return this;},exitIdleMode:function(){this._idle.showAll();return this;},enterFullscreen:function(callback){this._fullscreen.enter.apply(this,Utils.array(arguments));return this;},exitFullscreen:function(callback){this._fullscreen.exit.apply(this,Utils.array(arguments));return this;},toggleFullscreen:function(callback){this._fullscreen[this.isFullscreen()?'exit':'enter'].apply(this,Utils.array(arguments));return this;},bindTooltip:function(elem,value){this._tooltip.bind.apply(this._tooltip,Utils.array(arguments));return this;},defineTooltip:function(elem,value){this._tooltip.define.apply(this._tooltip,Utils.array(arguments));return this;},refreshTooltip:function(elem){this._tooltip.show.apply(this._tooltip,Utils.array(arguments));return this;},openLightbox:function(){this._lightbox.show.apply(this._lightbox,Utils.array(arguments));return this;},closeLightbox:function(){this._lightbox.hide.apply(this._lightbox,Utils.array(arguments));return this;},getActiveImage:function(){return this._getActive().image||undef;},getActiveThumb:function(){return this._thumbnails[this._active].image||undef;},getMousePosition:function(e){return{x:e.pageX- this.$('container').offset().left,y:e.pageY- this.$('container').offset().top};},addPan:function(img){if(this._options.imageCrop===false){return;}
img=$(img||this.getActiveImage());var self=this,x=img.width()/2,y=img.height()/2,destX=parseInt(img.css('left'),10),destY=parseInt(img.css('top'),10),curX=destX||0,curY=destY||0,distX=0,distY=0,active=false,ts=Utils.timestamp(),cache=0,move=0,position=function(dist,cur,pos){if(dist>0){move=Math.round(Math.max(dist*-1,Math.min(0,cur)));if(cache!==move){cache=move;if(IE===8){img.parent()['scroll'+ pos](move*-1);}else{var css={};css[pos.toLowerCase()]=move;img.css(css);}}}},calculate=function(e){if(Utils.timestamp()- ts<50){return;}
active=true;x=self.getMousePosition(e).x;y=self.getMousePosition(e).y;},loop=function(e){if(!active){return;}
distX=img.width()- self._stageWidth;distY=img.height()- self._stageHeight;destX=x/self._stageWidth*distX*-1;destY=y/self._stageHeight*distY*-1;curX+=(destX- curX)/self._options.imagePanSmoothness;curY+=(destY- curY)/self._options.imagePanSmoothness;position(distY,curY,'Top');position(distX,curX,'Left');};if(IE===8){img.parent().scrollTop(curY*-1).scrollLeft(curX*-1);img.css({top:0,left:0});}
this.$('stage').unbind('mousemove',calculate).bind('mousemove',calculate);Utils.addTimer('pan',loop,50,true);return this;},proxy:function(fn,scope){if(typeof fn!=='function'){return function(){};}
scope=scope||this;return function(){return fn.apply(scope,Utils.array(arguments));};},removePan:function(){this.$('stage').unbind('mousemove');Utils.clearTimer('pan');return this;},addElement:function(id){var dom=this._dom;$.each(Utils.array(arguments),function(i,blueprint){dom[blueprint]=Utils.create('galleria-'+ blueprint);});return this;},attachKeyboard:function(map){this._keyboard.attach.apply(this._keyboard,Utils.array(arguments));return this;},detachKeyboard:function(){this._keyboard.detach.apply(this._keyboard,Utils.array(arguments));return this;},appendChild:function(parentID,childID){this.$(parentID).append(this.get(childID)||childID);return this;},prependChild:function(parentID,childID){this.$(parentID).prepend(this.get(childID)||childID);return this;},remove:function(elemID){this.$(Utils.array(arguments).join(',')).remove();return this;},append:function(data){var i,j;for(i in data){if(data.hasOwnProperty(i)){if(data[i].constructor===Array){for(j=0;data[i][j];j++){this.appendChild(i,data[i][j]);}}else{this.appendChild(i,data[i]);}}}
return this;},_scaleImage:function(image,options){image=image||this._controls.getActive();var self=this,complete,scaleLayer=function(img){$(img.container).children(':first').css({top:Math.max(0,Utils.parseValue(img.image.style.top)),left:Math.max(0,Utils.parseValue(img.image.style.left)),width:Utils.parseValue(img.image.width),height:Utils.parseValue(img.image.height)});};options=$.extend({width:this._stageWidth,height:this._stageHeight,crop:this._options.imageCrop,max:this._options.maxScaleRatio,min:this._options.minScaleRatio,margin:this._options.imageMargin,position:this._options.imagePosition},options);if(this._options.layerFollow&&this._options.imageCrop!==true){if(typeof options.complete=='function'){complete=options.complete;options.complete=function(){complete.call(image,image);scaleLayer(image);};}else{options.complete=scaleLayer;}}else{$(image.container).children(':first').css({top:0,left:0});}
image.scale(options);return this;},updateCarousel:function(){this._carousel.update();return this;},rescale:function(width,height,complete){var self=this;if(typeof width==='function'){complete=width;width=undef;}
var scale=function(){self._stageWidth=width||self.$('stage').width();self._stageHeight=height||self.$('stage').height();self._scaleImage();if(self._options.carousel){self.updateCarousel();}
self.trigger(Galleria.RESCALE);if(typeof complete==='function'){complete.call(self);}};if(Galleria.WEBKIT&&!width&&!height){Utils.addTimer('scale',scale,10);}else{scale.call(self);}
return this;},refreshImage:function(){this._scaleImage();if(this._options.imagePan){this.addPan();}
return this;},show:function(index,rewind,_history){if(index===false||(!this._options.queue&&this._queue.stalled)){return;}
index=Math.max(0,Math.min(parseInt(index,10),this.getDataLength()- 1));rewind=typeof rewind!=='undefined'?!!rewind:index<this.getIndex();_history=_history||false;if(!_history&&Galleria.History){Galleria.History.set(index.toString());return;}
this._active=index;Array.prototype.push.call(this._queue,{index:index,rewind:rewind});if(!this._queue.stalled){this._show();}
return this;},_show:function(){var self=this,queue=this._queue[0],data=this.getData(queue.index);if(!data){return;}
var src=this.isFullscreen()&&'big'in data?data.big:data.image,active=this._controls.getActive(),next=this._controls.getNext(),cached=next.isCached(src),thumb=this._thumbnails[queue.index];var complete=(function(data,next,active,queue,thumb){return function(){var win;self._queue.stalled=false;Utils.toggleQuality(next.image,self._options.imageQuality);self._layers[self._controls.active].innerHTML='';$(active.container).css({zIndex:0,opacity:0}).show();$(next.container).css({zIndex:1}).show();self._controls.swap();if(self._options.imagePan){self.addPan(next.image);}
if(data.link||self._options.lightbox){$(next.image).css({cursor:'pointer'}).bind('mouseup',function(){if(data.link){if(self._options.popupLinks){win=window.open(data.link,'_blank');}else{window.location.href=data.link;}
return;}
self.openLightbox();});}
Array.prototype.shift.call(self._queue);if(self._queue.length){self._show();}
self._playCheck();self.trigger({type:Galleria.IMAGE,index:queue.index,imageTarget:next.image,thumbTarget:thumb.image});};}(data,next,active,queue,thumb));if(this._options.carousel&&this._options.carouselFollow){this._carousel.follow(queue.index);}
if(this._options.preload){var p,i,n=this.getNext(),ndata;try{for(i=this._options.preload;i>0;i--){p=new Galleria.Picture();ndata=self.getData(n);p.preload(this.isFullscreen()&&'big'in ndata?ndata.big:ndata.image);n=self.getNext(n);}}catch(e){}}
Utils.show(next.container);$(self._thumbnails[queue.index].container).addClass('active').siblings('.active').removeClass('active');self.trigger({type:Galleria.LOADSTART,cached:cached,index:queue.index,rewind:queue.rewind,imageTarget:next.image,thumbTarget:thumb.image});next.load(src,function(next){$(self._layers[1-self._controls.active]).html(data.layer||'').hide();self._scaleImage(next,{complete:function(next){if('image'in active){Utils.toggleQuality(active.image,false);}
Utils.toggleQuality(next.image,false);self._queue.stalled=true;self.removePan();self.setInfo(queue.index);self.setCounter(queue.index);if(data.layer){$(self._layers[1-self._controls.active]).show();}
self.trigger({type:Galleria.LOADFINISH,cached:cached,index:queue.index,rewind:queue.rewind,imageTarget:next.image,thumbTarget:self._thumbnails[queue.index].image});var transition=self._options.transition;$.each({initial:active.image===null,touch:Galleria.TOUCH,fullscreen:self.isFullscreen()},function(type,arg){if(arg&&self._options[type+'Transition']!==undef){transition=self._options[type+'Transition'];return false;}});if(transition in _transitions===false){complete();}else{var params={prev:active.container,next:next.container,rewind:queue.rewind,speed:self._options.transitionSpeed||400};_transitions[transition].call(self,params,complete);}}});});},getNext:function(base){base=typeof base==='number'?base:this.getIndex();return base===this.getDataLength()- 1?0:base+ 1;},getPrev:function(base){base=typeof base==='number'?base:this.getIndex();return base===0?this.getDataLength()- 1:base- 1;},next:function(){if(this.getDataLength()>1){this.show(this.getNext(),false);}
return this;},prev:function(){if(this.getDataLength()>1){this.show(this.getPrev(),true);}
return this;},get:function(elemId){return elemId in this._dom?this._dom[elemId]:null;},getData:function(index){return index in this._data?this._data[index]:this._data[this._active];},getDataLength:function(){return this._data.length;},getIndex:function(){return typeof this._active==='number'?this._active:false;},getStageHeight:function(){return this._stageHeight;},getStageWidth:function(){return this._stageWidth;},getOptions:function(key){return typeof key==='undefined'?this._options:this._options[key];},setOptions:function(key,value){if(typeof key==='object'){$.extend(this._options,key);}else{this._options[key]=value;}
return this;},play:function(delay){this._playing=true;this._playtime=delay||this._playtime;this._playCheck();this.trigger(Galleria.PLAY);return this;},pause:function(){this._playing=false;this.trigger(Galleria.PAUSE);return this;},playToggle:function(delay){return(this._playing)?this.pause():this.play(delay);},isPlaying:function(){return this._playing;},isFullscreen:function(){return this._fullscreen.active;},_playCheck:function(){var self=this,played=0,interval=20,now=Utils.timestamp(),timer_id='play'+ this._id;if(this._playing){Utils.clearTimer(timer_id);var fn=function(){played=Utils.timestamp()- now;if(played>=self._playtime&&self._playing){Utils.clearTimer(timer_id);self.next();return;}
if(self._playing){self.trigger({type:Galleria.PROGRESS,percent:Math.ceil(played/self._playtime*100),seconds:Math.floor(played/1000),milliseconds:played});Utils.addTimer(timer_id,fn,interval);}};Utils.addTimer(timer_id,fn,interval);}},setPlaytime:function(delay){this._playtime=delay;return this;},setIndex:function(val){this._active=val;return this;},setCounter:function(index){if(typeof index==='number'){index++;}else if(typeof index==='undefined'){index=this.getIndex()+1;}
this.get('current').innerHTML=index;if(IE){var count=this.$('counter'),opacity=count.css('opacity');if(parseInt(opacity,10)===1){Utils.removeAlpha(count[0]);}else{this.$('counter').css('opacity',opacity);}}
return this;},setInfo:function(index){var self=this,data=this.getData(index);$.each(['title','description'],function(i,type){var elem=self.$('info-'+ type);if(!!data[type]){elem[data[type].length?'show':'hide']().html(data[type]);}else{elem.empty().hide();}});return this;},hasInfo:function(index){var check='title description'.split(' '),i;for(i=0;check[i];i++){if(!!this.getData(index)[check[i]]){return true;}}
return false;},jQuery:function(str){var self=this,ret=[];$.each(str.split(','),function(i,elemId){elemId=$.trim(elemId);if(self.get(elemId)){ret.push(elemId);}});var jQ=$(self.get(ret.shift()));$.each(ret,function(i,elemId){jQ=jQ.add(self.get(elemId));});return jQ;},$:function(str){return this.jQuery.apply(this,Utils.array(arguments));}};$.each(_events,function(i,ev){var type=/_/.test(ev)?ev.replace(/_/g,''):ev;Galleria[ev.toUpperCase()]='galleria.'+type;});$.extend(Galleria,{IE9:IE===9,IE8:IE===8,IE7:IE===7,IE6:IE===6,IE:IE,WEBKIT:/webkit/.test(NAV),SAFARI:/safari/.test(NAV),CHROME:/chrome/.test(NAV),QUIRK:(IE&&doc.compatMode&&doc.compatMode==="BackCompat"),MAC:/mac/.test(navigator.platform.toLowerCase()),OPERA:!!window.opera,IPHONE:/iphone/.test(NAV),IPAD:/ipad/.test(NAV),ANDROID:/android/.test(NAV),TOUCH:('ontouchstart'in doc)});Galleria.addTheme=function(theme){if(!theme.name){Galleria.raise('No theme name specified');}
if(typeof theme.defaults!=='object'){theme.defaults={};}else{theme.defaults=_legacyOptions(theme.defaults);}
var css=false,reg;if(typeof theme.css==='string'){$('link').each(function(i,link){reg=new RegExp(theme.css);if(reg.test(link.href)){css=true;_themeLoad(theme);return false;}});if(!css){$('script').each(function(i,script){reg=new RegExp('galleria\\.'+ theme.name.toLowerCase()+'\\.');if(reg.test(script.src)){css=script.src.replace(/[^\/]*$/,'')+ theme.css;Utils.addTimer("css",function(){Utils.loadCSS(css,'galleria-theme',function(){_themeLoad(theme);});},1);}});}
if(!css){Galleria.raise('No theme CSS loaded');}}else{_themeLoad(theme);}
return theme;};Galleria.loadTheme=function(src,options){var loaded=false,length=_galleries.length,err=window.setTimeout(function(){Galleria.raise("Theme at "+ src+" could not load, check theme path.",true);},5000);Galleria.theme=undef;Utils.loadScript(src,function(){window.clearTimeout(err);if(length){var refreshed=[];$.each(Galleria.get(),function(i,instance){var op=$.extend(instance._original.options,{data_source:instance._data},options);instance.$('container').remove();var g=new Galleria();g._id=instance._id;g.init(instance._original.target,op);refreshed.push(g);});_galleries=refreshed;}});};Galleria.get=function(index){if(!!_instances[index]){return _instances[index];}else if(typeof index!=='number'){return _instances;}else{Galleria.raise('Gallery index '+ index+' not found');}};Galleria.addTransition=function(name,fn){_transitions[name]=fn;};Galleria.utils=Utils;Galleria.log=(function(){if('console'in window&&'log'in window.console){return window.console.log;}else{return function(){window.alert(Utils.array(arguments).join(', '));};}}());Galleria.ready=function(fn){$.each(_galleries,function(i,gallery){fn.call(gallery,gallery._options);});Galleria.ready.callbacks.push(fn);};Galleria.ready.callbacks=[];Galleria.raise=function(msg,fatal){var type=fatal?'Fatal error':'Error',self=this,echo=function(msg){var html='<div style="padding:4px;margin:0 0 2px;background:#'+
(fatal?'811':'222')+'";>'+
(fatal?'<strong>'+ type+': </strong>':'')+
msg+'</div>';$.each(_instances,function(){var cont=this.$('errors'),target=this.$('target');if(!cont.length){target.css('position','relative');cont=this.addElement('errors').appendChild('target','errors').$('errors').css({color:'#fff',position:'absolute',top:0,left:0,zIndex:100000});}
cont.append(html);});};if(DEBUG){echo(msg);if(fatal){throw new Error(type+': '+ msg);}}else if(fatal){if(_hasError){return;}
_hasError=true;fatal=false;echo('Image gallery could not load.');}};Galleria.version=VERSION;Galleria.requires=function(version,msg){msg=msg||'You need to upgrade Galleria to version '+ version+' to use one or more components.';if(Galleria.version<version){Galleria.raise(msg,true);}};Galleria.Picture=function(id){this.id=id||null;this.image=null;this.container=Utils.create('galleria-image');$(this.container).css({overflow:'hidden',position:'relative'});this.original={width:0,height:0};this.ready=false;this.tid=null;};Galleria.Picture.prototype={cache:{},show:function(){Utils.show(this.image);},hide:function(){Utils.moveOut(this.image);},clear:function(){this.image=null;},isCached:function(src){return!!this.cache[src];},preload:function(src){$(new Image()).load((function(src,cache){return function(){cache[src]=src;};}(src,this.cache))).attr('src',src);},load:function(src,callback){this.tid=window.setTimeout((function(src){return function(){Galleria.raise('Image not loaded in '+ Math.round(TIMEOUT/1000)+' seconds: '+ src);};}(src)),TIMEOUT);this.image=new Image();var i=0,reload=false,$container=$(this.container),$image=$(this.image),onload=(function(self,callback,src){return function(){var complete=function(){self.original={height:this.height,width:this.width};self.cache[src]=src;window.clearTimeout(self.tid);if(typeof callback=='function'){window.setTimeout(function(){callback.call(self,self);},1);}};if((!this.width||!this.height)){window.setTimeout((function(img){return function(){if(img.width&&img.height){complete.call(img);}else{Galleria.raise('Could not extract width/height from image: '+ img.src+'. Traced measures: width:'+ img.width+'px, height: '+ img.height+'px.');}};}(this)),2);}else{complete.call(this);}};}(this,callback,src));$container.find('img').remove();$image.css('display','block').appendTo(this.container);Utils.hide(this.image);if(this.cache[src]){this.image.src=src;onload.call(this.image);return this.container;}
$(this.image).load(onload).error(function(){if(!reload){reload=true;window.setTimeout((function(image,src){return function(){image.attr('src',src+'?'+ Utils.timestamp());};}($(this),src)),50);}else{if(DUMMY){$(this).attr('src',DUMMY);}else{Galleria.raise('Image not found: '+ src);}}}).attr('src',src);return this.container;},/**
        Scales and crops the image

        @param {Object} options The method takes an object with a number of options:

        <ul>
            <li>width - width of the container</li>
            <li>height - height of the container</li>
            <li>min - minimum scale ratio</li>
            <li>max - maximum scale ratio</li>
            <li>margin - distance in pixels from the image border to the container</li>
            <li>complete - a callback that fires when scaling is complete</li>
            <li>position - positions the image, works like the css background-image property.</li>
            <li>crop - defines how to crop. Can be true, false, 'width' or 'height'</li>
            <li>canvas - set to true to try a canvas-based rescale</li>
        </ul>

        @returns The image container object (jQuery)
    */

    scale: function( options ) {

        // extend some defaults
        options = $.extend({
            width: 0,
            height: 0,
            min: undef,
            max: undef,
            margin: 0,
            complete: function() {},
            position: 'center',
            crop: false,
            canvas: false
        }, options);

        // return the element if no image found
        if (!this.image) {
            return this.container;
        }

        // store locale variables
        var width,
            height,
            self = this,
            $container = $( self.container ),
            data;

        // wait for the width/height
        Utils.wait({
            until: function() {
                width  = options.width ||
                         $container.width() ||
                         Utils.parseValue( $container.css('width') );

                height = options.height ||
                         $container.height() ||
                         Utils.parseValue( $container.css('height') );

                return width && height;
            },
            success: function() {
                // calculate some cropping
                var newWidth = ( width - options.margin * 2 ) / self.original.width,
                    newHeight = ( height - options.margin * 2 ) / self.original.height,
                    cropMap = {
                        'true'  : Math.max( newWidth, newHeight ),
                        'width' : newWidth,
                        'height': newHeight,
                        'false' : Math.min( newWidth, newHeight )
                    },
                    ratio = cropMap[ options.crop.toString() ],
                    canvasKey = '';

                // allow max_scale_ratio
                if ( options.max ) {
                    ratio = Math.min( options.max, ratio );
                }

                // allow min_scale_ratio
                if ( options.min ) {
                    ratio = Math.max( options.min, ratio );
                }

                $.each( ['width','height'], function( i, m ) {
                    $( self.image )[ m ]( self[ m ] = self.image[ m ] = Math.round( self.original[ m ] * ratio ) );
                });

                $( self.container ).width( width ).height( height );

                if ( options.canvas && _canvas ) {

                    _canvas.elem.width = self.width;
                    _canvas.elem.height = self.height;

                    canvasKey = self.image.src + ':' + self.width + 'x' + self.height;

                    self.image.src = _canvas.cache[ canvasKey ] || (function( key ) {

                        _canvas.context.drawImage(self.image, 0, 0, self.original.width*ratio, self.original.height*ratio);

                        try {

                            data = _canvas.elem.toDataURL();
                            _canvas.length += data.length;
                            _canvas.cache[ key ] = data;
                            return data;

                        } catch( e ) {
                            return self.image.src;
                        }

                    }( canvasKey ) );

                }

                // calculate image_position
                var pos = {},
                    mix = {},
                    getPosition = function(value, measure, margin) {
                        var result = 0;
                        if (/\%/.test(value)) {
                            var flt = parseInt( value, 10 ) / 100,
                                m = self.image[ measure ] || $( self.image )[ measure ]();

                            result = Math.ceil( m * -1 * flt + margin * flt );
                        } else {
                            result = Utils.parseValue( value );
                        }
                        return result;
                    },
                    positionMap = {
                        'top': { top: 0 },
                        'left': { left: 0 },
                        'right': { left: '100%' },
                        'bottom': { top: '100%' }
                    };

                $.each( options.position.toLowerCase().split(' '), function( i, value ) {
                    if ( value === 'center' ) {
                        value = '50%';
                    }
                    pos[i ? 'top' : 'left'] = value;
                });

                $.each( pos, function( i, value ) {
                    if ( positionMap.hasOwnProperty( value ) ) {
                        $.extend( mix, positionMap[ value ] );
                    }
                });

                pos = pos.top ? $.extend( pos, mix ) : mix;

                pos = $.extend({
                    top: '50%',
                    left: '50%'
                }, pos);

                // apply position
                $( self.image ).css({
                    position : 'absolute',
                    top :  getPosition(pos.top, 'height', height),
                    left : getPosition(pos.left, 'width', width)
                });

                // show the image
                self.show();

                // flag ready and call the callback
                self.ready = true;
                options.complete.call( self, self );

            },
            error: function() {
                Galleria.raise('Could not scale image: '+self.image.src);
            },
            timeout: 1000
        });
        return this;
    }
};

// our own easings
$.extend( $.easing, {

    galleria: function (_, t, b, c, d) {
        if ((t/=d/2) < 1) {
            return c/2*t*t*t + b;
        }
        return c/2*((t-=2)*t*t + 2) + b;
    },

    galleriaIn: function (_, t, b, c, d) {
        return c*(t/=d)*t + b;
    },

    galleriaOut: function (_, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    }

});

// the plugin initializer
$.fn.galleria = function( options ) {

    return this.each(function() {
        $( this ).data( 'galleria', new Galleria().init( this, options ) );
    });

};

// phew

}( jQuery ) );;
/* Modernizr 2.5.3 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexbox_legacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-touch-printshiv-mq-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;



window.Modernizr = (function( window, document, undefined ) {

    var version = '2.5.3',

    Modernizr = {},

    enableClasses = true,

    docElement = document.documentElement,

    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    inputElem  = document.createElement('input')  ,

    smile = ':)',

    toString = {}.toString,

    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),



    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),


    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, 


    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node,
          div = document.createElement('div'),
                body = document.body, 
                fakeBody = body ? body : document.createElement('body');

      if ( parseInt(nodes, 10) ) {
                      while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

                style = ['&#173;','<style>', rule, '</style>'].join('');
      div.id = mod;
          (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if(!body){
                fakeBody.style.background = "";
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
        !body ? fakeBody.parentNode.removeChild(fakeBody) : div.parentNode.removeChild(div);

      return !!ret;

    },

    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq).matches;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },
 

    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

            var isSupported = eventName in element;

        if ( !isSupported ) {
                if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

                    if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),


    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProperty;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProperty = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProperty = function (object, property) { 
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }


    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F;

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    function setCss( str ) {
        mStyle.cssText = str;
    }

    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    function is( obj, type ) {
        return typeof obj === type;
    }

    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            if ( mStyle[ props[i] ] !== undefined ) {
                return prefixed == 'pfx' ? props[i] : true;
            }
        }
        return false;
    }

    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                            if (elem === false) return props[i];

                            if (is(item, 'function')){
                                return item.bind(elem || obj);
                }

                            return item;
            }
        }
        return false;
    }

    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.substr(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

            if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

            } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }

    var testBundle = (function( styles, tests ) {
        var style = styles.join(''),
            len = tests.length;

        injectElementWithStyles(style, function( node, rule ) {
            var style = document.styleSheets[document.styleSheets.length - 1],
                                                    cssText = style ? (style.cssRules && style.cssRules[0] ? style.cssRules[0].cssText : style.cssText || '') : '',
                children = node.childNodes, hash = {};

            while ( len-- ) {
                hash[children[len].id] = children[len];
            }

                       Modernizr['touch'] = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch || (hash['touch'] && hash['touch'].offsetTop) === 9; 
             Modernizr['csstransforms3d'] = (hash['csstransforms3d'] && hash['csstransforms3d'].offsetLeft) === 9 && hash['csstransforms3d'].offsetHeight === 3;                  Modernizr['generatedcontent'] = (hash['generatedcontent'] && hash['generatedcontent'].offsetHeight) >= 1;                       Modernizr['fontface'] = /src/i.test(cssText) &&
                                                                  cssText.indexOf(rule.split(' ')[0]) === 0;            }, len, tests);

    })([
                    '@font-face {font-family:"font";src:url("https://")}'                    ,['@media (',prefixes.join('touch-enabled),('),mod,')',
                                '{#touch{top:9px;position:absolute}}'].join('')            ,['@media (',prefixes.join('transform-3d),('),mod,')',
                                '{#csstransforms3d{left:9px;position:absolute;height:3px;}}'].join('')

        ,['#generatedcontent:after{content:"',smile,'";visibility:hidden}'].join('')  
    ],
      [
                'fontface'                         ,'touch'                 ,'csstransforms3d'  
        ,'generatedcontent' 

    ]);    tests['flexbox'] = function() {
      return testPropsAll('flexOrder');
    };


    tests['flexbox-legacy'] = function() {
        return testPropsAll('boxDirection');
    };


    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };    tests['touch'] = function() {
        return Modernizr['touch'];
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    tests['indexedDB'] = function() {
      return !!testPropsAll("indexedDB",window);
    };

    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    tests['websockets'] = function() {
        for ( var i = -1, len = cssomPrefixes.length; ++i < len; ){
          if ( window[cssomPrefixes[i] + 'WebSocket'] ){
            return true;
          }
        }
        return 'WebSocket' in window;
    };


    tests['rgba'] = function() {
        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
            setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
                setCss('background:url(https://),url(https://),red url(https://)');

            return /(url\s*\(.*?){3}/.test(mStyle.background);
    };
    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };



    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
                setCssAll('opacity:.55');

                    return /^0.55$/.test(mStyle.opacity);
    };


    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
                       (str1 + '-webkit- '.split(' ').join(str2 + str1) 
                       + prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

                        if ( ret && 'webkitPerspective' in docElement.style ) {

                      ret = Modernizr['csstransforms3d'];
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };



    tests['fontface'] = function() {
        return Modernizr['fontface'];
    };

    tests['generatedcontent'] = function() {
        return Modernizr['generatedcontent'];
    };
    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

            try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try { 
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

                                                    bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            || 
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
            }
        } catch(e) { }

        return bool;
    };


    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    function webforms() {
                                            Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            if (attrs.list){
                                  attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
                            Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                                                    if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                                        bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                                                                                  (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                                                                                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                                        bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else if ( /^color$/.test(inputElemType) ) {
                                                                docElement.appendChild(inputElem);
                        docElement.offsetWidth;
                        bool = inputElem.value != smile;
                        docElement.removeChild(inputElem);

                    } else {
                                        bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        }
    for ( var feature in tests ) {
        if ( hasOwnProperty(tests, feature) ) {
                                    featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    Modernizr.input || webforms();    setCss('');
    modElem = inputElem = null;


    Modernizr._version      = version;

    Modernizr._prefixes     = prefixes;
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;

    Modernizr.mq            = testMediaQuery;

    Modernizr.hasEvent      = isEventSupported;

    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };

    Modernizr.testAllProps  = testPropsAll;


    Modernizr.testStyles    = injectElementWithStyles;    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                                                    (enableClasses ? ' js ' + classes.join(' ') : '');

    return Modernizr;

})(this, this.document);
/*! HTML5 Shiv v3.4 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed */
;(function(window, document) {

  /** Preset options */
  var options = window.html5 || {};

  /** Used to skip problem elements */
  var reSkip = /^<|^(?:button|form|map|select|textarea)$/i;

  /** Detect whether the browser supports default html5 styles */
  var supportsHtml5Styles;

  /** Detect whether the browser supports unknown elements */
  var supportsUnknownElements;

  (function() {
    var a = document.createElement('a');

    a.innerHTML = '<xyz></xyz>';

    //if the hidden property is implemented we can assume, that the browser supports HTML5 Styles
    supportsHtml5Styles = ('hidden' in a);
    supportsUnknownElements = a.childNodes.length == 1 || (function() {
      // assign a false positive if unable to shiv
      try {
        (document.createElement)('a');
      } catch(e) {
        return true;
      }
      var frag = document.createDocumentFragment();
      return (
        typeof frag.cloneNode == 'undefined' ||
        typeof frag.createDocumentFragment == 'undefined' ||
        typeof frag.createElement == 'undefined'
      );
    }());

  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
  function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
        parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

    p.innerHTML = 'x<style>' + cssText + '</style>';
    return parent.insertBefore(p.lastChild, parent.firstChild);
  }

  /**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
  function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
  }

  /**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   */
  function shivMethods(ownerDocument) {
    var cache = {},
        docCreateElement = ownerDocument.createElement,
        docCreateFragment = ownerDocument.createDocumentFragment,
        frag = docCreateFragment();

    ownerDocument.createElement = function(nodeName) {
      // Avoid adding some elements to fragments in IE < 9 because
      // * Attributes like `name` or `type` cannot be set/changed once an element
      //   is inserted into a document/fragment
      // * Link elements with `src` attributes that are inaccessible, as with
      //   a 403 response, will cause the tab/window to crash
      // * Script elements appended to fragments will execute when their `src`
      //   or `text` property is set
      var node = (cache[nodeName] || (cache[nodeName] = docCreateElement(nodeName))).cloneNode();
      return html5.shivMethods && node.canHaveChildren && !reSkip.test(nodeName) ? frag.appendChild(node) : node;
    };

    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
      'var n=f.cloneNode(),c=n.createElement;' +
      'h.shivMethods&&(' +
        // unroll the `createElement` calls
        getElements().join().replace(/\w+/g, function(nodeName) {
          cache[nodeName] = docCreateElement(nodeName);
          frag.createElement(nodeName);
          return 'c("' + nodeName + '")';
        }) +
      ');return n}'
    )(html5, frag);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivDocument(ownerDocument) {
    var shived;
    if (ownerDocument.documentShived) {
      return ownerDocument;
    }
    if (html5.shivCSS && !supportsHtml5Styles) {
      shived = !!addStyleSheet(ownerDocument,
        // corrects block display not defined in IE6/7/8/9
        'article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}' +
        // corrects audio display not defined in IE6/7/8/9
        'audio{display:none}' +
        // corrects canvas and video display not defined in IE6/7/8/9
        'canvas,video{display:inline-block;*display:inline;*zoom:1}' +
        // corrects 'hidden' attribute and audio[controls] display not present in IE7/8/9
        '[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}' +
        // adds styling not present in IE6/7/8/9
        'mark{background:#FF0;color:#000}'
      );
    }
    if (!supportsUnknownElements) {
      shived = !shivMethods(ownerDocument);
    }
    if (shived) {
      ownerDocument.documentShived = shived;
    }
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
  var html5 = {

    /**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video',

    /**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
    'shivCSS': !(options.shivCSS === false),

    /**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
    'shivMethods': !(options.shivMethods === false),

    /**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
    'type': 'default',

    // shivs the document according to the specified `html5` object options
    'shivDocument': shivDocument
  };

  /*--------------------------------------------------------------------------*/

  // expose html5
  window.html5 = html5;

  // shiv the document
  shivDocument(document);

  /*------------------------------- Print Shiv -------------------------------*/

  /** Used to filter media types */
  var reMedia = /^$|\b(?:all|print)\b/;

  /** Used to namespace printable elements */
  var shivNamespace = 'html5shiv';

  /** Detect whether the browser supports shivable style sheets */
  var supportsShivableSheets = !supportsUnknownElements && (function() {
    // assign a false negative if unable to shiv
    var docEl = document.documentElement;
    return !(
      typeof document.namespaces == 'undefined' ||
      typeof document.parentWindow == 'undefined' ||
      typeof docEl.applyElement == 'undefined' ||
      typeof docEl.removeNode == 'undefined' ||
      typeof window.attachEvent == 'undefined'
    );
  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Wraps all HTML5 elements in the given document with printable elements.
   * (eg. the "header" element is wrapped with the "html5shiv:header" element)
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Array} An array wrappers added.
   */
  function addWrappers(ownerDocument) {
    var node,
        nodes = ownerDocument.getElementsByTagName('*'),
        index = nodes.length,
        reElements = RegExp('^(?:' + getElements().join('|') + ')$', 'i'),
        result = [];

    while (index--) {
      node = nodes[index];
      if (reElements.test(node.nodeName)) {
        result.push(node.applyElement(createWrapper(node)));
      }
    }
    return result;
  }

  /**
   * Creates a printable wrapper for the given element.
   * @private
   * @param {Element} element The element.
   * @returns {Element} The wrapper.
   */
  function createWrapper(element) {
    var node,
        nodes = element.attributes,
        index = nodes.length,
        wrapper = element.ownerDocument.createElement(shivNamespace + ':' + element.nodeName);

    // copy element attributes to the wrapper
    while (index--) {
      node = nodes[index];
      node.specified && wrapper.setAttribute(node.nodeName, node.nodeValue);
    }
    // copy element styles to the wrapper
    wrapper.style.cssText = element.style.cssText;
    return wrapper;
  }

  /**
   * Shivs the given CSS text.
   * (eg. header{} becomes html5shiv\:header{})
   * @private
   * @param {String} cssText The CSS text to shiv.
   * @returns {String} The shived CSS text.
   */
  function shivCssText(cssText) {
    var pair,
        parts = cssText.split('{'),
        index = parts.length,
        reElements = RegExp('(^|[\\s,>+~])(' + getElements().join('|') + ')(?=[[\\s,>+~#.:]|$)', 'gi'),
        replacement = '$1' + shivNamespace + '\\:$2';

    while (index--) {
      pair = parts[index] = parts[index].split('}');
      pair[pair.length - 1] = pair[pair.length - 1].replace(reElements, replacement);
      parts[index] = pair.join('}');
    }
    return parts.join('{');
  }

  /**
   * Removes the given wrappers, leaving the original elements.
   * @private
   * @params {Array} wrappers An array of printable wrappers.
   */
  function removeWrappers(wrappers) {
    var index = wrappers.length;
    while (index--) {
      wrappers[index].removeNode();
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document for print.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivPrint(ownerDocument) {
    var shivedSheet,
        wrappers,
        namespaces = ownerDocument.namespaces,
        ownerWindow = ownerDocument.parentWindow;

    if (!supportsShivableSheets || ownerDocument.printShived) {
      return ownerDocument;
    }
    if (typeof namespaces[shivNamespace] == 'undefined') {
      namespaces.add(shivNamespace);
    }

    ownerWindow.attachEvent('onbeforeprint', function() {
      var imports,
          length,
          sheet,
          collection = ownerDocument.styleSheets,
          cssText = [],
          index = collection.length,
          sheets = Array(index);

      // convert styleSheets collection to an array
      while (index--) {
        sheets[index] = collection[index];
      }
      // concat all style sheet CSS text
      while ((sheet = sheets.pop())) {
        // IE does not enforce a same origin policy for external style sheets
        if (!sheet.disabled && reMedia.test(sheet.media)) {
          for (imports = sheet.imports, index = 0, length = imports.length; index < length; index++) {
            sheets.push(imports[index]);
          }
          try {
            cssText.push(sheet.cssText);
          } catch(er){}
        }
      }
      // wrap all HTML5 elements with printable elements and add the shived style sheet
      cssText = shivCssText(cssText.reverse().join(''));
      wrappers = addWrappers(ownerDocument);
      shivedSheet = addStyleSheet(ownerDocument, cssText);
    });

    ownerWindow.attachEvent('onafterprint', function() {
      // remove wrappers, leaving the original elements, and remove the shived style sheet
      removeWrappers(wrappers);
      shivedSheet.removeNode(true);
    });

    ownerDocument.printShived = true;
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  // expose API
  html5.type += ' print';
  html5.shivPrint = shivPrint;

  // shiv for print
  shivPrint(document);

}(this, document));/*yepnope1.5.3|WTFPL*/
(function(a,b,c){function d(a){return o.call(a)=="[object Function]"}function e(a){return typeof a=="string"}function f(){}function g(a){return!a||a=="loaded"||a=="complete"||a=="uninitialized"}function h(){var a=p.shift();q=1,a?a.t?m(function(){(a.t=="c"?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){a!="img"&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l={},o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};y[c]===1&&(r=1,y[c]=[],l=b.createElement(a)),a=="object"?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),a!="img"&&(r||y[c]===2?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i(b=="c"?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),p.length==1&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&o.call(a.opera)=="[object Opera]",l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return o.call(a)=="[object Array]"},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,i){var j=b(a),l=j.autoCallback;j.url.split(".").pop().split("?").shift(),j.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]||h),j.instead?j.instead(a,e,f,g,i):(y[j.url]?j.noexec=!0:y[j.url]=1,f.load(j.url,j.forceCSS||!j.forceJS&&"css"==j.url.split(".").pop().split("?").shift()?"c":c,j.noexec,j.attrs,j.timeout),(d(e)||d(l))&&f.load(function(){k(),e&&e(j.origUrl,i,g),l&&l(j.origUrl,i,g),y[j.url]=2})))}function i(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var j,l,m=this.yepnope.loader;if(e(a))g(a,0,m,0);else if(w(a))for(j=0;j<a.length;j++)l=a[j],e(l)?g(l,0,m,0):w(l)?B(l):Object(l)===l&&i(l,m);else Object(a)===a&&i(a,m)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);
Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0));};
;;
/*
 * Copyright (C) 2007-2012 Diego Perini
 * All rights reserved.
 *
 * nwmatcher.js - A fast CSS selector engine and matcher
 *
 * Author: Diego Perini <diego.perini at gmail com>
 * Version: 1.2.5
 * Created: 20070722
 * Release: 20120101
 *
 * License:
 *  http://javascript.nwbox.com/NWMatcher/MIT-LICENSE
 * Download:
 *  http://javascript.nwbox.com/NWMatcher/nwmatcher.js
 */

(function(global) {

  var version = 'nwmatcher-1.2.5',

  // export the public API for CommonJS implementations,
  // for headless JS engines or for standard web browsers
  Dom =
    // as CommonJS/NodeJS module
    typeof exports == 'object' ? exports :
    // create or extend NW namespace
    ((global.NW || (global.NW = { })) &&
    (global.NW.Dom || (global.NW.Dom = { }))),

  // processing context & root element
  doc = global.document,
  root = doc.documentElement,

  // save utility methods references
  slice = [ ].slice,
  string = { }.toString,

  // persist previous parsed data
  isSingleMatch,
  isSingleSelect,

  lastSlice,
  lastContext,
  lastPosition,

  lastMatcher,
  lastSelector,

  lastPartsMatch,
  lastPartsSelect,

  // accepted prefix identifiers
  // (id, class & pseudo-class)
  prefixes = '[#.:]?',

  // accepted attribute operators
  operators = '([~*^$|!]?={1})',

  // accepted whitespace characters
  whitespace = '[\\x20\\t\\n\\r\\f]*',

  // 4 combinators F E, F>E, F+E, F~E
  combinators = '[\\x20]|[>+~][^>+~]',

  // an+b format params for pseudo-classes
  pseudoparms = '[-+]?\\d*n?[-+]?\\d*',

  // CSS quoted string values
  quotedvalue = '"[^"]*"' + "|'[^']*'",

  // skip group of round brackets
  skipround = '\\([^()]+\\)|\\(.*\\)',
  // skip group of curly brackets
  skipcurly = '\\{[^{}]+\\}|\\{.*\\}',
  // skip group of square brackets
  skipsquare = '\\[[^[\\]]*\\]|\\[.*\\]',

  // skip [ ], ( ), { } groups in token tails
  skipgroup = '\\[.*\\]|\\(.*\\)|\\{.*\\}',

  // http://www.w3.org/TR/css3-syntax/#characters
  // unicode/ISO 10646 characters 161 and higher
  // NOTE: Safari 2.0.x crashes with escaped (\\)
  // Unicode ranges in regular expressions so we
  // use a negated character range class instead
  encoding = '(?:[-\\w]|[^\\x00-\\xa0]|\\\\.)',

  // CSS identifier syntax
  identifier = '(?:-?[_a-zA-Z]{1}[-\\w]*|[^\\x00-\\xa0]+|\\\\.+)+',

  // build attribute string
  attrcheck = '(' + quotedvalue + '|' + identifier + ')',
  attributes = whitespace + '(' + encoding + '+:?' + encoding + '+)' +
    whitespace + '(?:' + operators + whitespace + attrcheck + ')?' + whitespace,
  attrmatcher = attributes.replace(attrcheck, '([\\x22\\x27]*)((?:\\\\?.)*?)\\3'),

  // build pseudoclass string
  pseudoclass = '((?:' +
    // an+b parameters or quoted string
    pseudoparms + '|' + quotedvalue + '|' +
    // id, class, pseudo-class selector
    prefixes + '|' + encoding + '+|' +
    // nested HTML attribute selector
    '\\[' + attributes + '\\]|' +
    // nested pseudo-class selector
    '\\(.+\\)|' + whitespace + '|' +
    // nested pseudos/separators
    ',)+)',

  // placeholder for extensions
  extensions = '.+',

  // CSS3: syntax scanner and
  // one pass validation only
  // using regular expression
  standardValidator =
    // discard start
    '(?=[\\x20\\t\\n\\r\\f]*[^>+~(){}<>])' +
    // open match group
    '(' +
    //universal selector
    '\\*' +
    // id/class/tag/pseudo-class identifier
    '|(?:' + prefixes + identifier + ')' +
    // combinator selector
    '|' + combinators +
    // HTML attribute selector
    '|\\[' + attributes + '\\]' +
    // pseudo-classes parameters
    '|\\(' + pseudoclass + '\\)' +
    // dom properties selector (extension)
    '|\\{' + extensions + '\\}' +
    // selector group separator (comma)
    '|,' +
    // close match group
    ')+',

  // validator for complex selectors in ':not()' pseudo-classes
  extendedValidator = standardValidator.replace(pseudoclass, '.*'),

  // validator for standard selectors as default
  reValidator = new RegExp(standardValidator, 'g'),

  // whitespace is any combination of these 5 character [\x20\t\n\r\f]
  // http://www.w3.org/TR/css3-selectors/#selector-syntax
  reTrimSpaces = new RegExp('^' +
    whitespace + '|' + whitespace + '$', 'g'),

  // only allow simple selectors nested in ':not()' pseudo-classes
  reSimpleNot = new RegExp('^(' +
    '(?!:not)' +
    '(' + prefixes +
    '|' + identifier +
    '|\\([^()]*\\))+' +
    '|\\[' + attributes + '\\]' +
    ')$'),

  // split comma groups, exclude commas from
  // quotes '' "" and from brackets () [] {}
  reSplitGroup = new RegExp('(' +
    '[^,\\\\\\[\\]]+' +
    '|' + skipsquare +
    '|' + skipround +
    '|' + skipcurly +
    '|\\\\.' +
    ')+', 'g'),

  // split last, right most, selector group token
  reSplitToken = new RegExp('(' +
    '\\[' + attributes + '\\]|' +
    '\\(' + pseudoclass + '\\)|' +
    '[^\\x20>+~]|\\\\.)+', 'g'),

  // for in excess whitespace removal
  reWhiteSpace = /[\x20\t\n\r\f]+/g,

  reOptimizeSelector = new RegExp(identifier + '|^$'),

  /*----------------------------- FEATURE TESTING ----------------------------*/

  // detect native methods
  isNative = (function() {
    var s = (doc.appendChild + '').replace(/appendChild/g, '');
    return function(object, method) {
      var m = object && object[method] || false;
      return m && typeof m != 'string' &&
        s == (m + '').replace(new RegExp(method, 'g'), '');
    };
  })(),

  // NATIVE_XXXXX true if method exist and is callable
  // detect if DOM methods are native in browsers
  NATIVE_FOCUS = isNative(doc, 'hasFocus'),
  NATIVE_QSAPI = isNative(doc, 'querySelector'),
  NATIVE_GEBID = isNative(doc, 'getElementById'),
  NATIVE_GEBTN = isNative(root, 'getElementsByTagName'),
  NATIVE_GEBCN = isNative(root, 'getElementsByClassName'),

  // detect native getAttribute/hasAttribute methods,
  // frameworks extend these to elements, but it seems
  // this does not work for XML namespaced attributes,
  // used to check both getAttribute/hasAttribute in IE
  NATIVE_GET_ATTRIBUTE = isNative(root, 'getAttribute'),
  NATIVE_HAS_ATTRIBUTE = isNative(root, 'hasAttribute'),

  // check if slice() can convert nodelist to array
  // see http://yura.thinkweb2.com/cft/
  NATIVE_SLICE_PROTO =
    (function() {
      var isBuggy = false, id = root.id;
      root.id = 'length';
      try {
        isBuggy = !!slice.call(doc.childNodes, 0)[0];
      } catch(e) { }
      root.id = id;
      return isBuggy;
    })(),

  // supports the new traversal API
  NATIVE_TRAVERSAL_API =
    'nextElementSibling' in root && 'previousElementSibling' in root,

  // BUGGY_XXXXX true if method is feature tested and has known bugs
  // detect buggy gEBID
  BUGGY_GEBID = NATIVE_GEBID ?
    (function() {
      var isBuggy = true, x = 'x' + String(+new Date),
        a = doc.createElementNS ? 'a' : '<a name="' + x + '">';
      (a = doc.createElement(a)).name = x;
      root.insertBefore(a, root.firstChild);
      isBuggy = !!doc.getElementById(x);
      root.removeChild(a);
      return isBuggy;
    })() :
    true,

  // detect IE gEBTN comment nodes bug
  BUGGY_GEBTN = NATIVE_GEBTN ?
    (function() {
      var div = doc.createElement('div');
      div.appendChild(doc.createComment(''));
      return !!div.getElementsByTagName('*')[0];
    })() :
    true,

  // detect Opera gEBCN second class and/or UTF8 bugs as well as Safari 3.2
  // caching class name results and not detecting when changed,
  // tests are based on the jQuery selector test suite
  BUGGY_GEBCN = NATIVE_GEBCN ?
    (function() {
      var isBuggy, div = doc.createElement('div'), test = '\u53f0\u5317';

      // Opera tests
      div.appendChild(doc.createElement('span')).
        setAttribute('class', test + 'abc ' + test);
      div.appendChild(doc.createElement('span')).
        setAttribute('class', 'x');

      isBuggy = !div.getElementsByClassName(test)[0];

      // Safari test
      div.lastChild.className = test;
      return isBuggy || div.getElementsByClassName(test).length != 2;
    })() :
    true,

  // detect IE bug with dynamic attributes
  BUGGY_GET_ATTRIBUTE = NATIVE_GET_ATTRIBUTE ?
    (function() {
      var input = doc.createElement('input');
      input.setAttribute('value', 5);
      return input.defaultValue != 5;
    })() :
    true,

  // detect IE bug with non-standard boolean attributes
  BUGGY_HAS_ATTRIBUTE = NATIVE_HAS_ATTRIBUTE ?
    (function() {
      var option = doc.createElement('option');
      option.setAttribute('selected', 'selected');
      return !option.hasAttribute('selected');
    })() :
    true,

  // detect Safari bug with selected option elements
  BUGGY_SELECTED =
    (function() {
      var select = doc.createElement('select');
      select.appendChild(doc.createElement('option'));
      return !select.firstChild.selected;
    })(),

  // initialized with the loading context
  // and reset for each different context
  BUGGY_QUIRKS_GEBCN,
  BUGGY_QUIRKS_QSAPI,

  QUIRKS_MODE,
  XML_DOCUMENT,

  // detect Opera browser
  OPERA = /opera/i.test(string.call(global.opera)),

  // skip simpe selector optimizations for Opera >= 11
  OPERA_QSAPI = OPERA && parseFloat(opera.version()) >= 11,

  // check Seletor API implementations
  RE_BUGGY_QSAPI = NATIVE_QSAPI ?
    (function() {
      var pattern = [ ], div = doc.createElement('div'), element,

      expect = function(selector, context, element, n) {
        var result = false;
        context.appendChild(element);
        try { result = context.querySelectorAll(selector).length == n; } catch(e) { }
        while (context.firstChild) { context.removeChild(context.firstChild); }
        return result;
      };

      // ^= $= *= operators bugs whith empty values (Opera 10 / IE8)
      element = doc.createElement('p');
      element.setAttribute('class', '');
      expect('[class^=""]', div, element, 1) &&
        pattern.push('[*^$]=[\\x20\\t\\n\\r\\f]*(?:""|' + "'')");

      // :checked bug with option elements (Firefox 3.6.x)
      // it wrongly includes 'selected' options elements
      // HTML5 rules says selected options also match
      element = doc.createElement('option');
      element.setAttribute('selected', 'selected');
      expect(':checked', div, element, 0) &&
        pattern.push(':checked');

      // :enabled :disabled bugs with hidden fields (Firefox 3.5 QSA bug)
      // http://www.w3.org/TR/html5/interactive-elements.html#selector-enabled
      // IE8 QSA has problems too and throws error with these dynamic pseudos
      element = doc.createElement('input');
      element.setAttribute('type', 'hidden');
      expect(':enabled', div, element, 1) &&
        pattern.push(':enabled', ':disabled');

      // :link bugs with hyperlinks matching (Firefox/Safari)
      element = doc.createElement('link');
      element.setAttribute('href', 'x');
      expect(':link', div, element, 1) ||
        pattern.push(':link');

      // avoid attribute selectors for IE QSA
      if (BUGGY_HAS_ATTRIBUTE) {
        // IE fails in reading:
        // - original values for input/textarea
        // - original boolean values for controls
        pattern.push('\\[[\\x20\\t\\n\\r\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)');
      }

      return pattern.length ?
        new RegExp(pattern.join('|')) :
        { 'test': function() { return false; } };

    })() :
    true,

  // matches class selectors
  RE_CLASS = new RegExp('(?:\\[[\\x20\\t\\n\\r\\f]*class\\b|\\.' + identifier + ')'),

  // matches simple id, tag & class selectors
  RE_SIMPLE_SELECTOR = new RegExp(
    !(BUGGY_GEBTN && BUGGY_GEBCN) ? !OPERA ?
      '^(?:\\*|[.#]?-?[_a-zA-Z]{1}' + encoding + '*)$' :
      '^(?:\\*|#-?[_a-zA-Z]{1}' + encoding + '*)$' :
      '^#?-?[_a-zA-Z]{1}' + encoding + '*$'),

  /*----------------------------- LOOKUP OBJECTS -----------------------------*/

  LINK_NODES = { 'a': 1, 'A': 1, 'area': 1, 'AREA': 1, 'link': 1, 'LINK': 1 },

  // boolean attributes should return attribute name instead of true/false
  ATTR_BOOLEAN = {
    'checked': 1, 'disabled': 1, 'ismap': 1,
    'multiple': 1, 'readonly': 1, 'selected': 1
  },

  // dynamic attributes that needs to be checked against original HTML value
  ATTR_DEFAULT = {
    value: 'defaultValue',
    checked: 'defaultChecked',
    selected: 'defaultSelected'
  },

  // attribute referencing URI data values need special treatment in IE
  ATTR_URIDATA = {
    'action': 2, 'cite': 2, 'codebase': 2, 'data': 2, 'href': 2,
    'longdesc': 2, 'lowsrc': 2, 'src': 2, 'usemap': 2
  },

  // HTML 5 draft specifications
  // http://www.whatwg.org/specs/web-apps/current-work/#selectors
  HTML_TABLE = {
    // class attribute must be treated case-insensitive in HTML quirks mode
    // initialized by default to Standard Mode (case-sensitive),
    // set dynamically by the attribute resolver
    'class': 0,
    'accept': 1, 'accept-charset': 1, 'align': 1, 'alink': 1, 'axis': 1,
    'bgcolor': 1, 'charset': 1, 'checked': 1, 'clear': 1, 'codetype': 1, 'color': 1,
    'compact': 1, 'declare': 1, 'defer': 1, 'dir': 1, 'direction': 1, 'disabled': 1,
    'enctype': 1, 'face': 1, 'frame': 1, 'hreflang': 1, 'http-equiv': 1, 'lang': 1,
    'language': 1, 'link': 1, 'media': 1, 'method': 1, 'multiple': 1, 'nohref': 1,
    'noresize': 1, 'noshade': 1, 'nowrap': 1, 'readonly': 1, 'rel': 1, 'rev': 1,
    'rules': 1, 'scope': 1, 'scrolling': 1, 'selected': 1, 'shape': 1, 'target': 1,
    'text': 1, 'type': 1, 'valign': 1, 'valuetype': 1, 'vlink': 1
  },

  // the following attributes must be treated case-insensitive in XHTML mode
  // Niels Leenheer http://rakaz.nl/item/css_selector_bugs_case_sensitivity
  XHTML_TABLE = {
    'accept': 1, 'accept-charset': 1, 'alink': 1, 'axis': 1,
    'bgcolor': 1, 'charset': 1, 'codetype': 1, 'color': 1,
    'enctype': 1, 'face': 1, 'hreflang': 1, 'http-equiv': 1,
    'lang': 1, 'language': 1, 'link': 1, 'media': 1, 'rel': 1,
    'rev': 1, 'target': 1, 'text': 1, 'type': 1, 'vlink': 1
  },

  /*-------------------------- REGULAR EXPRESSIONS ---------------------------*/

  // placeholder to add functionalities
  Selectors = {
    // as a simple example this will check
    // for chars not in standard ascii table
    //
    // 'mySpecialSelector': {
    //  'Expression': /\u0080-\uffff/,
    //  'Callback': mySelectorCallback
    // }
    //
    // 'mySelectorCallback' will be invoked
    // only after passing all other standard
    // checks and only if none of them worked
  },

  // attribute operators
  Operators = {
     '=': "n=='%m'",
    '^=': "n.indexOf('%m')==0",
    '*=': "n.indexOf('%m')>-1",
    '|=': "(n+'-').indexOf('%m-')==0",
    '~=': "(' '+n+' ').indexOf(' %m ')>-1",
    '$=': "n.substr(n.length-'%m'.length)=='%m'"
  },

  // optimization expressions
  Optimize = {
    ID: new RegExp('^\\*?#(' + encoding + '+)|' + skipgroup),
    TAG: new RegExp('^(' + encoding + '+)|' + skipgroup),
    CLASS: new RegExp('^\\*?\\.(' + encoding + '+$)|' + skipgroup)
  },

  // precompiled Regular Expressions
  Patterns = {
    // structural pseudo-classes and child selectors
    spseudos: /^\:((root|empty|nth-)?(?:(first|last|only)-)?(child)?-?(of-type)?)(?:\(([^\x29]*)\))?(.*)/,
    // uistates + dynamic + negation pseudo-classes
    dpseudos: /^\:(link|visited|target|lang|not|active|focus|hover|checked|disabled|enabled|selected)(?:\((["']*)(.*?(\(.*\))?[^'"()]*?)\2\))?(.*)/,
    // element attribute matcher
    attribute: new RegExp('^\\[' + attrmatcher + '\\](.*)'),
    // E > F
    children: /^[\x20\t\n\r\f]*\>[\x20\t\n\r\f]*(.*)/,
    // E + F
    adjacent: /^[\x20\t\n\r\f]*\+[\x20\t\n\r\f]*(.*)/,
    // E ~ F
    relative: /^[\x20\t\n\r\f]*\~[\x20\t\n\r\f]*(.*)/,
    // E F
    ancestor: /^[\x20\t\n\r\f]+(.*)/,
    // all
    universal: /^\*(.*)/,
    // id
    id: new RegExp('^#(' + encoding + '+)(.*)'),
    // tag
    tagName: new RegExp('^(' + encoding + '+)(.*)'),
    // class
    className: new RegExp('^\\.(' + encoding + '+)(.*)')
  },

  /*------------------------------ UTIL METHODS ------------------------------*/

  // concat elements to data
  concatList =
    function(data, elements) {
      var i = -1, element;
      if (!data.length && Array.slice)
        return Array.slice(elements);
      while ((element = elements[++i]))
        data[data.length] = element;
      return data;
    },

  // concat elements to data and callback
  concatCall =
    function(data, elements, callback) {
      var i = -1, element;
      while ((element = elements[++i])) {
        if (false === callback(data[data.length] = element)) { break; }
      }
      return data;
    },

  // change context specific variables
  switchContext =
    function(from, force) {
      var div, oldDoc = doc;
      // save passed context
      lastContext = from;
      // set new context document
      doc = from.ownerDocument || from;
      if (force || oldDoc !== doc) {
        // set document root
        root = doc.documentElement;
        // set host environment flags
        XML_DOCUMENT = doc.createElement('DiV').nodeName == 'DiV';

        // In quirks mode css class names are case insensitive.
        // In standards mode they are case sensitive. See docs:
        // https://developer.mozilla.org/en/Mozilla_Quirks_Mode_Behavior
        // http://www.whatwg.org/specs/web-apps/current-work/#selectors
        QUIRKS_MODE = !XML_DOCUMENT &&
          typeof doc.compatMode == 'string' ?
          doc.compatMode.indexOf('CSS') < 0 :
          (function() {
            var style = doc.createElement('div').style;
            return style && (style.width = 1) && style.width == '1px';
          })();

        div = doc.createElement('div');
        div.appendChild(doc.createElement('p')).setAttribute('class', 'xXx');
        div.appendChild(doc.createElement('p')).setAttribute('class', 'xxx');

        // GEBCN buggy in quirks mode, match count is:
        // Firefox 3.0+ [xxx = 1, xXx = 1]
        // Opera 10.63+ [xxx = 0, xXx = 2]
        BUGGY_QUIRKS_GEBCN =
          !XML_DOCUMENT && NATIVE_GEBCN && QUIRKS_MODE &&
          (div.getElementsByClassName('xxx').length != 2 ||
          div.getElementsByClassName('xXx').length != 2);

        // QSAPI buggy in quirks mode, match count is:
        // At least Chrome 4+, Firefox 3.5+, Opera 10.x+, Safari 4+ [xxx = 1, xXx = 2]
        // Safari 3.2 QSA doesn't work with mixedcase in quirksmode [xxx = 1, xXx = 0]
        // https://bugs.webkit.org/show_bug.cgi?id=19047
        // must test the attribute selector '[class~=xxx]'
        // before '.xXx' or the bug may not present itself
        BUGGY_QUIRKS_QSAPI =
          !XML_DOCUMENT && NATIVE_QSAPI && QUIRKS_MODE &&
          (div.querySelectorAll('[class~=xxx]').length != 2 ||
          div.querySelectorAll('.xXx').length != 2);

        Config.CACHING && Dom.setCache(true, doc);
      }
    },

  /*------------------------------ DOM METHODS -------------------------------*/

  // element by id (raw)
  // @return reference or null
  byIdRaw =
    function(id, elements) {
      var i = -1, element = null;
      while ((element = elements[++i])) {
        if (element.getAttribute('id') == id) {
          break;
        }
      }
      return element;
    },

  // element by id
  // @return reference or null
  _byId = !BUGGY_GEBID ?
    function(id, from) {
      id = id.replace(/\\/g, '');
      return from.getElementById && from.getElementById(id) ||
        byIdRaw(id, from.getElementsByTagName('*'));
    } :
    function(id, from) {
      var element = null;
      id = id.replace(/\\/g, '');
      if (XML_DOCUMENT || from.nodeType != 9) {
        return byIdRaw(id, from.getElementsByTagName('*'));
      }
      if ((element = from.getElementById(id)) &&
        element.name == id && from.getElementsByName) {
        return byIdRaw(id, from.getElementsByName(id));
      }
      return element;
    },

  // publicly exposed byId
  // @return reference or null
  byId =
    function(id, from) {
      switchContext(from || (from = doc));
      return _byId(id, from);
    },

  // elements by tag (raw)
  // @return array
  byTagRaw =
    function(tag, from) {
      var any = tag == '*', element = from, elements = [ ], next = element.firstChild;
      any || (tag = tag.toUpperCase());
      while ((element = next)) {
        if (element.tagName > '@' && (any || element.tagName.toUpperCase() == tag)) {
          elements[elements.length] = element;
        }
        if ((next = element.firstChild || element.nextSibling)) continue;
        while (!next && (element = element.parentNode) && element !== from) {
          next = element.nextSibling;
        }
      }
      return elements;
    },

  // elements by tag
  // @return array
  _byTag = !BUGGY_GEBTN && NATIVE_SLICE_PROTO ?
    function(tag, from) {
      return XML_DOCUMENT || from.nodeType == 11 ? byTagRaw(tag, from) :
        slice.call(from.getElementsByTagName(tag), 0);
    } :
    function(tag, from) {
      var i = -1, j = i, data = [ ],
        element, elements = from.getElementsByTagName(tag);
      if (tag == '*') {
        while ((element = elements[++i])) {
          if (element.nodeName > '@')
            data[++j] = element;
        }
      } else {
        while ((element = elements[++i])) {
          data[i] = element;
        }
      }
      return data;
    },

  // publicly exposed byTag
  // @return array
  byTag =
    function(tag, from) {
      switchContext(from || (from = doc));
      return _byTag(tag, from);
    },

  // publicly exposed byName
  // @return array
  byName =
    function(name, from) {
      return select('[name="' + name.replace(/\\/g, '') + '"]', from);
    },

  // elements by class (raw)
  // @return array
  byClassRaw =
    function(name, from) {
      var i = -1, j = i, data = [ ], element, elements = _byTag('*', from), n;
      name = ' ' + (QUIRKS_MODE ? name.toLowerCase() : name).replace(/\\/g, '') + ' ';
      while ((element = elements[++i])) {
        n = XML_DOCUMENT ? element.getAttribute('class') : element.className;
        if (n && n.length && (' ' + (QUIRKS_MODE ? n.toLowerCase() : n).
          replace(reWhiteSpace, ' ') + ' ').indexOf(name) > -1) {
          data[++j] = element;
        }
      }
      return data;
    },

  // elements by class
  // @return array
  _byClass =
    function(name, from) {
      return (BUGGY_GEBCN || BUGGY_QUIRKS_GEBCN || XML_DOCUMENT || !from.getElementsByClassName) ?
        byClassRaw(name, from) : slice.call(from.getElementsByClassName(name.replace(/\\/g, '')), 0);
    },

  // publicly exposed byClass
  // @return array
  byClass =
    function(name, from) {
      switchContext(from || (from = doc));
      return _byClass(name, from);
    },

  // check element is descendant of container
  // @return boolean
  contains = 'compareDocumentPosition' in root ?
    function(container, element) {
      return (container.compareDocumentPosition(element) & 16) == 16;
    } : 'contains' in root ?
    function(container, element) {
      return container !== element && container.contains(element);
    } :
    function(container, element) {
      while ((element = element.parentNode)) {
        if (element === container) return true;
      }
      return false;
    },

  // attribute value
  // @return string
  getAttribute = !BUGGY_GET_ATTRIBUTE ?
    function(node, attribute) {
      return node.getAttribute(attribute) || '';
    } :
    function(node, attribute) {
      attribute = attribute.toLowerCase();
      if (ATTR_DEFAULT[attribute]) {
        return node[ATTR_DEFAULT[attribute]] || '';
      }
      return (
        // specific URI data attributes (parameter 2 to fix IE bug)
        ATTR_URIDATA[attribute] ? node.getAttribute(attribute, 2) || '' :
        // boolean attributes should return name instead of true/false
        ATTR_BOOLEAN[attribute] ? node.getAttribute(attribute) ? attribute : '' :
          ((node = node.getAttributeNode(attribute)) && node.value) || '');
    },

  // attribute presence
  // @return boolean
  hasAttribute = !BUGGY_HAS_ATTRIBUTE ?
    function(node, attribute) {
      return XML_DOCUMENT ?
        !!node.getAttribute(attribute) :
        node.hasAttribute(attribute);
    } :
    function(node, attribute) {
      attribute = attribute.toLowerCase();
      if (ATTR_DEFAULT[attribute]) {
        return !!node[ATTR_DEFAULT[attribute]];
      }
      // need to get at AttributeNode first on IE
      node = node.getAttributeNode(attribute);
      // use both "specified" & "nodeValue" properties
      return !!(node && (node.specified || node.nodeValue));
    },

  // check node emptyness
  // @return boolean
  isEmpty =
    function(node) {
      node = node.firstChild;
      while (node) {
        if (node.nodeType == 3 || node.nodeName > '@') return false;
        node = node.nextSibling;
      }
      return true;
    },

  // check if element matches the :link pseudo
  // @return boolean
  isLink =
    function(element) {
      return hasAttribute(element,'href') && LINK_NODES[element.nodeName];
    },

  // child position by nodeType
  // @return number
  nthElement =
    function(element, last) {
      var count = 1, succ = last ? 'nextSibling' : 'previousSibling';
      while ((element = element[succ])) {
        if (element.nodeName > '@') ++count;
      }
      return count;
    },

  // child position by nodeName
  // @return number
  nthOfType =
    function(element, last) {
      var count = 1, succ = last ? 'nextSibling' : 'previousSibling', type = element.nodeName;
      while ((element = element[succ])) {
        if (element.nodeName == type) ++count;
      }
      return count;
    },

  /*------------------------------- DEBUGGING --------------------------------*/

  // set working mode
  configure =
    function(options) {
      for (var i in options) {
        Config[i] = !!options[i];
        if (i == 'SIMPLENOT') {
          matchContexts = { };
          matchResolvers = { };
          selectContexts = { };
          selectResolvers = { };
          Config['USE_QSAPI'] = false;
          reValidator = new RegExp(extendedValidator, 'g');
        } else if (i == 'USE_QSAPI') {
          Config[i] = !!options[i] && NATIVE_QSAPI;
          reValidator = new RegExp(standardValidator, 'g');
        }
      }
    },

  // control user notifications
  emit =
    function(message) {
      message = 'SYNTAX_ERR: ' + message + ' ';
      if (Config.VERBOSITY) {
        // FF/Safari/Opera DOMException.SYNTAX_ERR = 12
        if (typeof global.DOMException != 'undefined') {
          throw { code: 12, message: message };
        } else {
          throw new Error(12, message);
        }
      } else {
        if (global.console && global.console.log) {
          global.console.log(message);
        } else {
          global.status += message;
        }
      }
    },

  Config = {

    // used to enable/disable caching of result sets
    CACHING: false,

    // by default do not add missing left/right context
    // to selector string shortcuts like "+div" or "ul>"
    // callable Dom.shortcuts method has to be available
    SHORTCUTS: false,

    // by default disable complex selectors nested in
    // ':not()' pseudo-classes, as for specifications
    SIMPLENOT: true,

    // HTML5 handling for the ":checked" pseudo-class
    USE_HTML5: false,

    // controls enabling the Query Selector API branch
    USE_QSAPI: NATIVE_QSAPI,

    // controls the engine error/warning notifications
    VERBOSITY: true

  },

  /*---------------------------- COMPILER METHODS ----------------------------*/

  // code string reused to build compiled functions
  ACCEPT_NODE = 'r[r.length]=c[k];if(f&&false===f(c[k]))break;else continue main;',

  // compile a comma separated group of selector
  // @mode boolean true for select, false for match
  // return a compiled function
  compile =
    function(selector, source, mode) {

      var parts = typeof selector == 'string' ? selector.match(reSplitGroup) : selector;

      // ensures that source is a string
      typeof source == 'string' || (source = '');

      if (parts.length == 1) {
        source += compileSelector(parts[0], mode ? ACCEPT_NODE : 'f&&f(k);return true;');
      } else {
        // for each selector in the group
        var i = -1, seen = { }, token;
        while ((token = parts[++i])) {
          token = token.replace(reTrimSpaces, '');
          // avoid repeating the same token
          // in comma separated group (p, p)
          if (!seen[token] && (seen[token] = true)) {
            source += compileSelector(token, mode ? ACCEPT_NODE : 'f&&f(k);return true;');
          }
        }
      }

      if (mode) {
        // for select method
        return new Function('c,s,r,d,h,g,f',
          'var N,n,x=0,k=-1,e;main:while((e=c[++k])){' + source + '}return r;');
      } else {
        // for match method
        return new Function('e,s,r,d,h,g,f',
          'var N,n,x=0,k=e;' + source + 'return false;');
      }
    },

  // compile a CSS3 string selector into ad-hoc javascript matching function
  // @return string (to be compiled)
  compileSelector =
    function(selector, source) {

      var a, b, n, k = 0, expr, match, result, status, test, type;

      while (selector) {

        k++;

        // *** Universal selector
        // * match all (empty block, do not remove)
        if ((match = selector.match(Patterns.universal))) {
          // do nothing, handled in the compiler where
          // BUGGY_GEBTN return comment nodes (ex: IE)
          expr = '';
        }

        // *** ID selector
        // #Foo Id case sensitive
        else if ((match = selector.match(Patterns.id))) {
          // document can contain conflicting elements (id/name)
          // prototype selector unit need this method to recover bad HTML forms
          source = 'if(' + (XML_DOCUMENT ?
            's.getAttribute(e,"id")' :
            '(e.submit?s.getAttribute(e,"id"):e.id)') +
            '=="' + match[1] + '"' +
            '){' + source + '}';
        }

        // *** Type selector
        // Foo Tag (case insensitive)
        else if ((match = selector.match(Patterns.tagName))) {
          // both tagName and nodeName properties may be upper/lower case
          // depending on their creation NAMESPACE in createElementNS()
          source = 'if(e.nodeName' + (XML_DOCUMENT ?
            '=="' + match[1] + '"' : '.toUpperCase()' +
            '=="' + match[1].toUpperCase() + '"') +
            '){' + source + '}';
        }

        // *** Class selector
        // .Foo Class (case sensitive)
        else if ((match = selector.match(Patterns.className))) {
          // W3C CSS3 specs: element whose "class" attribute has been assigned a
          // list of whitespace-separated values, see section 6.4 Class selectors
          // and notes at the bottom; explicitly non-normative in this specification.
          source = 'if((n=' + (XML_DOCUMENT ?
            's.getAttribute(e,"class")' : 'e.className') +
            ')&&n.length&&(" "+' + (QUIRKS_MODE ? 'n.toLowerCase()' : 'n') +
            '.replace(' + reWhiteSpace + '," ")+" ").indexOf(" ' +
            (QUIRKS_MODE ? match[1].toLowerCase() : match[1]) + ' ")>-1' +
            '){' + source + '}';
        }

        // *** Attribute selector
        // [attr] [attr=value] [attr="value"] [attr='value'] and !=, *=, ~=, |=, ^=, $=
        // case sensitivity is treated differently depending on the document type (see map)
        else if ((match = selector.match(Patterns.attribute))) {

          // xml namespaced attribute ?
          expr = match[1].split(':');
          expr = expr.length == 2 ? expr[1] : expr[0] + '';

          if (match[2] && !Operators[match[2]]) {
            emit('Unsupported operator in attribute selectors "' + selector + '"');
            return '';
          }

          test = false;
          type = 'false';

          // replace Operators parameter if needed
          if (match[2] && match[4] && (type = Operators[match[2]])) {
            // case treatment depends on document
            HTML_TABLE['class'] = QUIRKS_MODE ? 1 : 0;
            // replace escaped values and HTML entities
            match[4] = match[4].replace(/\\([0-9a-f]{2,2})/, '\\x$1');
            test = (XML_DOCUMENT ? XHTML_TABLE : HTML_TABLE)[expr.toLowerCase()];
            type = type.replace(/\%m/g, test ? match[4].toLowerCase() : match[4]);
          } else if (match[2] == '!=' || match[2] == '=') {
            type = 'n' + match[2] + '="' + match[4] + '"';
          }

          // build expression for has/getAttribute
          expr = 'n=s.' + (match[2] ? 'get' : 'has') +
            'Attribute(e,"' + match[1] + '")' +
            (test ? '.toLowerCase();' : ';');

          source = expr + 'if(' + (match[2] ? type : 'n') + '){' + source + '}';
        }

        // *** Adjacent sibling combinator
        // E + F (F adiacent sibling of E)
        else if ((match = selector.match(Patterns.adjacent))) {
          source = NATIVE_TRAVERSAL_API ?
            'var N' + k + '=e;if(e&&(e=e.previousElementSibling)){' + source + '}e=N' + k + ';' :
            'var N' + k + '=e;while(e&&(e=e.previousSibling)){if(e.nodeName>"@"){' + source + 'break;}}e=N' + k + ';';
        }

        // *** General sibling combinator
        // E ~ F (F relative sibling of E)
        else if ((match = selector.match(Patterns.relative))) {
          source = NATIVE_TRAVERSAL_API ?
            ('var N' + k + '=e;e=e.parentNode.firstElementChild;' +
            'while(e&&e!==N' + k + '){' + source + 'e=e.nextElementSibling;}e=N' + k + ';') :
            ('var N' + k + '=e;e=e.parentNode.firstChild;' +
            'while(e&&e!==N' + k + '){if(e.nodeName>"@"){' + source + '}e=e.nextSibling;}e=N' + k + ';');
        }

        // *** Child combinator
        // E > F (F children of E)
        else if ((match = selector.match(Patterns.children))) {
          source = 'var N' + k + '=e;if(e&&e!==h&&e!==g&&(e=e.parentNode)){' + source + '}e=N' + k + ';';
        }

        // *** Descendant combinator
        // E F (E ancestor of F)
        else if ((match = selector.match(Patterns.ancestor))) {
          source = 'var N' + k + '=e;while(e&&e!==h&&e!==g&&(e=e.parentNode)){' + source + '}e=N' + k + ';';
        }

        // *** Structural pseudo-classes
        // :root, :empty,
        // :first-child, :last-child, :only-child,
        // :first-of-type, :last-of-type, :only-of-type,
        // :nth-child(), :nth-last-child(), :nth-of-type(), :nth-last-of-type()
        else if ((match = selector.match(Patterns.spseudos)) && match[1]) {

          switch (match[2]) {

            case 'root':
              // element root of the document
              if (match[7]) {
                source = 'if(e===h||s.contains(h,e)){' + source + '}';
              } else {
                source = 'if(e===h){' + source + '}';
              }
              break;

            case 'empty':
              // element that has no children
              source = 'if(s.isEmpty(e)){' + source + '}';
              break;

            default:
              if (match[2] && match[6]) {
                if (match[6] == 'n') {
                  source = 'if(e!==h){' + source + '}';
                  break;
                } else if (match[6] == 'even') {
                  a = 2;
                  b = 0;
                } else if (match[6] == 'odd') {
                  a = 2;
                  b = 1;
                } else {
                  // assumes correct "an+b" format, "b" before "a" to keep "n" values
                  b = ((n = match[6].match(/(-?\d+)$/)) ? parseInt(n[1], 10) : 0);
                  a = ((n = match[6].match(/(-?\d*)n/)) ? parseInt(n[1], 10) : 0);
                  if (n && n[1] == '-') a = -1;
                }

                // build test expression out of structural pseudo (an+b) parameters
                // see here: http://www.w3.org/TR/css3-selectors/#nth-child-pseudo
                test =  b < 1 && a > 1 ? '(n-(' + b + '))%' + a + '==0' : a > +1 ?
                  (match[3] == 'last') ? '(n-(' + b + '))%' + a + '==0' :
                  'n>=' + b + '&&(n-(' + b + '))%' + a + '==0' : a < -1 ?
                  (match[3] == 'last') ? '(n-(' + b + '))%' + a + '==0' :
                  'n<=' + b + '&&(n-(' + b + '))%' + a + '==0' : a=== 0 ?
                  'n==' + b :
                  (match[3] == 'last') ?
                    a == -1 ? 'n>=' + b : 'n<=' + b :
                    a == -1 ? 'n<=' + b : 'n>=' + b;

                // 4 cases: 1 (nth) x 4 (child, of-type, last-child, last-of-type)
                source =
                  'if(e!==h){' +
                    'n=s[' + (match[5] ? '"nthOfType"' : '"nthElement"') + ']' +
                      '(e,' + (match[3] == 'last' ? 'true' : 'false') + ');' +
                    'if(' + test + '){' + source + '}' +
                  '}';

              } else {
                // 6 cases: 3 (first, last, only) x 1 (child) x 2 (-of-type)
                a = match[3] == 'first' ? 'previous' : 'next';
                n = match[3] == 'only' ? 'previous' : 'next';
                b = match[3] == 'first' || match[3] == 'last';

                type = match[5] ? '&&n.nodeName!=e.nodeName' : '&&n.nodeName<"@"';

                source = 'if(e!==h){' +
                  ( 'n=e;while((n=n.' + a + 'Sibling)' + type + ');if(!n){' + (b ? source :
                    'n=e;while((n=n.' + n + 'Sibling)' + type + ');if(!n){' + source + '}') + '}' ) + '}';
              }
              break;
          }

        }

        // *** negation, user action and target pseudo-classes
        // *** UI element states and dynamic pseudo-classes
        // CSS3 :not, :checked, :enabled, :disabled, :target
        // CSS3 :active, :hover, :focus
        // CSS3 :link, :visited
        else if ((match = selector.match(Patterns.dpseudos)) && match[1]) {

          switch (match[1]) {
            // CSS3 negation pseudo-class
            case 'not':
              // compile nested selectors, DO NOT pass the callback parameter
              // SIMPLENOT allow disabling complex selectors nested
              // in ':not()' pseudo-classes, breaks some test units
              expr = match[3].replace(reTrimSpaces, '');

              if (Config.SIMPLENOT && !reSimpleNot.test(expr)) {
                // see above, log error but continue execution
                emit('Negation pseudo-class only accepts simple selectors "' + selector + '"');
                return '';
              } else {
                if ('compatMode' in doc) {
                  source = 'if(!' + compile([expr], '', false) + '(e,s,r,d,h,g)){' + source + '}';
                } else {
                  source = 'if(!s.match(e, "' + expr.replace(/\x22/g, '\\"') + '",g)){' + source +'}';
                }
              }
              break;

            // CSS3 UI element states
            case 'checked':
              // for radio buttons checkboxes (HTML4) and options (HTML5)
              test = 'if((typeof e.form!="undefined"&&(/^(?:radio|checkbox)$/i).test(e.type)&&e.checked)';
              source = (Config.USE_HTML5 ? test + '||(/^option$/i.test(e.nodeName)&&e.selected)' : test) + '){' + source + '}';
              break;
            case 'disabled':
              // does not consider hidden input fields
              source = 'if(((typeof e.form!="undefined"&&!(/^hidden$/i).test(e.type))||s.isLink(e))&&e.disabled){' + source + '}';
              break;
            case 'enabled':
              // does not consider hidden input fields
              source = 'if(((typeof e.form!="undefined"&&!(/^hidden$/i).test(e.type))||s.isLink(e))&&!e.disabled){' + source + '}';
              break;

            // CSS3 lang pseudo-class
            case 'lang':
              test = '';
              if (match[3]) test = match[3].substr(0, 2) + '-';
              source = 'do{(n=e.lang||"").toLowerCase();' +
                'if((n==""&&h.lang=="' + match[3].toLowerCase() + '")||' +
                '(n&&(n=="' + match[3].toLowerCase() +
                '"||n.substr(0,3)=="' + test.toLowerCase() + '")))' +
                '{' + source + 'break;}}while((e=e.parentNode)&&e!==g);';
              break;

            // CSS3 target pseudo-class
            case 'target':
              n = doc.location ? doc.location.hash : '';
              if (n) {
                source = 'if(e.id=="' + n.slice(1) + '"){' + source + '}';
              }
              break;

            // CSS3 dynamic pseudo-classes
            case 'link':
              source = 'if(s.isLink(e)&&!e.visited){' + source + '}';
              break;
            case 'visited':
              source = 'if(s.isLink(e)&&e.visited){' + source + '}';
              break;

            // CSS3 user action pseudo-classes IE & FF3 have native support
            // these capabilities may be emulated by some event managers
            case 'active':
              if (XML_DOCUMENT) break;
              source = 'if(e===d.activeElement){' + source + '}';
              break;
            case 'hover':
              if (XML_DOCUMENT) break;
              source = 'if(e===d.hoverElement){' + source + '}';
              break;
            case 'focus':
              if (XML_DOCUMENT) break;
              source = NATIVE_FOCUS ?
                'if(e===d.activeElement&&d.hasFocus()&&(e.type||e.href)){' + source + '}' :
                'if(e===d.activeElement&&(e.type||e.href)){' + source + '}';
              break;

            // CSS2 selected pseudo-classes, not part of current CSS3 drafts
            // the 'selected' property is only available for option elements
            case 'selected':
              // fix Safari selectedIndex property bug
              expr = BUGGY_SELECTED ? '||(n=e.parentNode)&&n.options[n.selectedIndex]===e' : '';
              source = 'if(/^option$/i.test(e.nodeName)&&(e.selected' + expr + ')){' + source + '}';
              break;

            default:
              break;
          }

        }

        else {

          // this is where external extensions are
          // invoked if expressions match selectors
          expr = false;
          status = true;

          for (expr in Selectors) {
            if ((match = selector.match(Selectors[expr].Expression)) && match[1]) {
              result = Selectors[expr].Callback(match, source);
              source = result.source;
              status = result.status;
              if (status) break;
            }
          }

          // if an extension fails to parse the selector
          // it must return a false boolean in "status"
          if (!status) {
            // log error but continue execution, don't throw real exceptions
            // because blocking following processes maybe is not a good idea
            emit('Unknown pseudo-class selector "' + selector + '"');
            return '';
          }

          if (!expr) {
            // see above, log error but continue execution
            emit('Unknown token in selector "' + selector + '"');
            return '';
          }

        }

        // error if no matches found by the pattern scan
        if (!match) {
          emit('Invalid syntax in selector "' + selector + '"');
          return '';
        }

        // ensure "match" is not null or empty since
        // we do not throw real DOMExceptions above
        selector = match && match[match.length - 1];
      }

      return source;
    },

  /*----------------------------- QUERY METHODS ------------------------------*/

  // match element with selector
  // @return boolean
  match =
    function(element, selector, from, callback) {

      var parts;

      if (!(element && element.nodeName > '@')) {
        emit('Invalid element argument');
        return false;
      } else if (!selector || typeof selector != 'string') {
        emit('Invalid selector argument');
        return false;
      } else if (from && from.nodeType == 1 && !contains(from, element)) {
        return false;
      } else if (lastContext !== from) {
        // reset context data when it changes
        // and ensure context is set to a default
        switchContext(from || (from = element.ownerDocument));
      }

      selector = selector.replace(reTrimSpaces, '');

      Config.SHORTCUTS && (selector = NW.Dom.shortcuts(selector, element, from));

      if (lastMatcher != selector) {
        // process valid selector strings
        if ((parts = selector.match(reValidator)) && parts[0] == selector) {
          isSingleMatch = (parts = selector.match(reSplitGroup)).length < 2;
          // save passed selector
          lastMatcher = selector;
          lastPartsMatch = parts;
        } else {
          emit('The string "' + selector + '", is not a valid CSS selector');
          return false;
        }
      } else parts = lastPartsMatch;

      // compile matcher resolver if necessary
      if (!matchResolvers[selector] || matchContexts[selector] !== from) {
        matchResolvers[selector] = compile(isSingleMatch ? [selector] : parts, '', false);
        matchContexts[selector] = from;
      }

      return matchResolvers[selector](element, Snapshot, [ ], doc, root, from, callback);
    },

  // select only the first element
  // matching selector (document ordered)
  first =
    function(selector, from) {
      return select(selector, from, function() { return false; })[0] || null;
    },

  // select elements matching selector
  // using new Query Selector API
  // or cross-browser client API
  // @return array
  select =
    function(selector, from, callback) {

      var i, changed, element, elements, parts, token, original = selector;

      if (arguments.length === 0) {
        emit('Missing required selector parameters');
        return [ ];
      } else if (selector === '') {
        emit('Empty selector string');
        return [ ];
      } else if (typeof selector != 'string') {
        return [ ];
      } else if (from && !(/1|9|11/).test(from.nodeType)) {
        emit('Invalid context element');
        return [ ];
      } else if (lastContext !== from) {
        // reset context data when it changes
        // and ensure context is set to a default
        switchContext(from || (from = doc));
      }

      if (Config.CACHING && (elements = Dom.loadResults(original, from, doc, root))) {
        return callback ? concatCall([ ], elements, callback) : elements;
      }

      if (!OPERA_QSAPI && RE_SIMPLE_SELECTOR.test(selector)) {
        switch (selector.charAt(0)) {
          case '#':
            if ((element = _byId(selector.slice(1), from))) {
              elements = [ element ];
            } else elements = [ ];
            break;
          case '.':
            elements = _byClass(selector.slice(1), from);
            break;
          default:
            elements = _byTag(selector, from);
            break;
        }
      }

      else if (!XML_DOCUMENT && Config.USE_QSAPI &&
        !(BUGGY_QUIRKS_QSAPI && RE_CLASS.test(selector)) &&
        !RE_BUGGY_QSAPI.test(selector)) {
        try {
          elements = from.querySelectorAll(selector);
        } catch(e) { }
      }

      if (elements) {
        elements = callback ? concatCall([ ], elements, callback) :
          NATIVE_SLICE_PROTO ? slice.call(elements) : concatList([ ], elements);
        Config.CACHING && Dom.saveResults(original, from, doc, elements);
        return elements;
      }

      selector = selector.replace(reTrimSpaces, '');

      Config.SHORTCUTS && (selector = NW.Dom.shortcuts(selector, from));

      if ((changed = lastSelector != selector)) {
        // process valid selector strings
        if ((parts = selector.match(reValidator)) && parts[0] == selector) {
          isSingleSelect = (parts = selector.match(reSplitGroup)).length < 2;
          // save passed selector
          lastSelector = selector;
          lastPartsSelect = parts;
        } else {
          emit('The string "' + selector + '", is not a valid CSS selector');
          return [ ];
        }
      } else parts = lastPartsSelect;

      // commas separators are treated sequentially to maintain order
      if (from.nodeType == 11) {

        elements = from.childNodes;

      } else if (!XML_DOCUMENT && isSingleSelect) {

        if (changed) {
          // get right most selector token
          parts = selector.match(reSplitToken);
          token = parts[parts.length - 1];

          // only last slice before :not rules
          lastSlice = token.split(':not')[0];

          // position where token was found
          lastPosition = selector.length - token.length;
        }

        // ID optimization RTL, to reduce number of elements to visit
        if ((parts = lastSlice.match(Optimize.ID)) && (token = parts[1])) {
          if ((element = _byId(token, from))) {
            if (match(element, selector)) {
              callback && callback(element);
              elements = [ element ];
            } else elements = [ ];
          }
        }

        // ID optimization LTR, to reduce selection context searches
        else if ((parts = selector.match(Optimize.ID)) && (token = parts[1])) {
          if ((element = _byId(token, doc))) {
            if ('#' + token == selector) {
              callback && callback(element);
              elements = [ element ];
            }
            if (/[>+~]/.test(selector)) {
              from = element.parentNode;
            } else {
              selector = selector.replace('#' + token, '*');
              lastPosition -= token.length + 1;
              from = element;
            }
          } else elements = [ ];
        }

        if (elements) {
          Config.CACHING && Dom.saveResults(original, from, doc, elements);
          return elements;
        }

        if (!NATIVE_GEBCN && (parts = lastSlice.match(Optimize.TAG)) && (token = parts[1])) {
          if ((elements = _byTag(token, from)).length === 0) { return [ ]; }
          selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace(token, '*');
        }

        else if ((parts = lastSlice.match(Optimize.CLASS)) && (token = parts[1])) {
          if ((elements = _byClass(token, from)).length === 0) { return [ ]; }
          if (reOptimizeSelector.test(selector.charAt(selector.indexOf(token) - 1))) {
            selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace('.' + token, '');
          } else {
            selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace('.' + token, '*');
          }
        }

        else if ((parts = selector.match(Optimize.CLASS)) && (token = parts[1])) {
          if ((elements = _byClass(token, from)).length === 0) { return [ ]; }
          for (i = 0, els = [ ]; elements.length > i; ++i) {
            els = concatList(els, elements[i].getElementsByTagName('*'));
          }
          elements = els;
          if (reOptimizeSelector.test(selector.charAt(selector.indexOf(token) - 1))) {
            selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace('.' + token, '');
          } else {
            selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace('.' + token, '*');
          }
        }

        else if (NATIVE_GEBCN && (parts = lastSlice.match(Optimize.TAG)) && (token = parts[1])) {
          if ((elements = _byTag(token, from)).length === 0) { return [ ]; }
          selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace(token, '*');
        }

      }

      if (!elements) {
        elements = /^(?:applet|object)$/i.test(from.nodeName) ? from.childNodes : _byTag('*', from);
      }
      // end of prefiltering pass

      // compile selector resolver if necessary
      if (!selectResolvers[selector] || selectContexts[selector] !== from) {
        selectResolvers[selector] = compile(isSingleSelect ? [selector] : parts, '', true);
        selectContexts[selector] = from;
      }

      elements = selectResolvers[selector](elements, Snapshot, [ ], doc, root, from, callback);

      Config.CACHING && Dom.saveResults(original, from, doc, elements);

      return elements;
    },

  /*-------------------------------- STORAGE ---------------------------------*/

  // compiled match functions returning booleans
  matchContexts = { },
  matchResolvers = { },

  // compiled select functions returning collections
  selectContexts = { },
  selectResolvers = { },

  // used to pass methods to compiled functions
  Snapshot = {

    // element indexing methods
    nthElement: nthElement,
    nthOfType: nthOfType,

    // element inspection methods
    getAttribute: getAttribute,
    hasAttribute: hasAttribute,

    // element selection methods
    byClass: _byClass,
    byName: byName,
    byTag: _byTag,
    byId: _byId,

    // helper/check methods
    contains: contains,
    isEmpty: isEmpty,
    isLink: isLink,

    // selection/matching
    select: select,
    match: match
  };

  Tokens = {
    prefixes: prefixes,
    encoding: encoding,
    operators: operators,
    whitespace: whitespace,
    identifier: identifier,
    attributes: attributes,
    combinators: combinators,
    pseudoclass: pseudoclass,
    pseudoparms: pseudoparms,
    quotedvalue: quotedvalue
  };

  /*------------------------------- PUBLIC API -------------------------------*/

  // code referenced by extensions
  Dom.ACCEPT_NODE = ACCEPT_NODE;

  // log resolvers errors/warnings
  Dom.emit = emit;

  // retrieve element by id attr
  Dom.byId = byId;

  // retrieve elements by tag name
  Dom.byTag = byTag;

  // retrieve elements by name attr
  Dom.byName = byName;

  // retrieve elements by class name
  Dom.byClass = byClass;

  // read the value of the attribute
  // as was in the original HTML code
  Dom.getAttribute = getAttribute;

  // check for the attribute presence
  // as was in the original HTML code
  Dom.hasAttribute = hasAttribute;

  // element match selector, return boolean true/false
  Dom.match = match;

  // first element match only, return element or null
  Dom.first = first;

  // elements matching selector, starting from element
  Dom.select = select;

  // compile selector into ad-hoc javascript resolver
  Dom.compile = compile;

  // check that two elements are ancestor/descendant
  Dom.contains = contains;

  // handle selector engine configuration settings
  Dom.configure = configure;

  // initialize caching for each document
  Dom.setCache = function() { return; };

  // load previously collected result set
  Dom.loadResults = function() { return; };

  // save previously collected result set
  Dom.saveResults = function() { return; };

  // handle missing context in selector strings
  Dom.shortcuts = function(x) { return x; };

  // options enabing specific engine functionality
  Dom.Config = Config;

  // pass methods references to compiled resolvers
  Dom.Snapshot = Snapshot;

  // operators descriptor
  // for attribute operators extensions
  Dom.Operators = Operators;

  // selectors descriptor
  // for pseudo-class selectors extensions
  Dom.Selectors = Selectors;

  // export string patterns
  Dom.Tokens = Tokens;

  // add or overwrite user defined operators
  Dom.registerOperator =
    function(symbol, resolver) {
      Operators[symbol] || (Operators[symbol] = resolver);
    };

  // add selector patterns for user defined callbacks
  Dom.registerSelector =
    function(name, rexp, func) {
      Selectors[name] || (Selectors[name] = {
        Expression: rexp,
        Callback: func
      });
    };

  /*---------------------------------- INIT ----------------------------------*/

  // init context specific variables
  switchContext(doc, true);

})(this);
;
/*
selectivizr v1.0.2 - (c) Keith Clark, freely distributable under the terms 
of the MIT license.

selectivizr.com
*/
/* 
  
Notes about this source
-----------------------

 * The #DEBUG_START and #DEBUG_END comments are used to mark blocks of code
   that will be removed prior to building a final release version (using a
   pre-compression script)
  
  
References:
-----------
 
 * CSS Syntax          : http://www.w3.org/TR/2003/WD-css3-syntax-20030813/#style
 * Selectors           : http://www.w3.org/TR/css3-selectors/#selectors
 * IE Compatability    : http://msdn.microsoft.com/en-us/library/cc351024(VS.85).aspx
 * W3C Selector Tests  : http://www.w3.org/Style/CSS/Test/CSS3/Selectors/current/html/tests/
 
*/

(function(win) {

	// If browser isn't IE, then stop execution! This handles the script 
	// being loaded by non IE browsers because the developer didn't use 
	// conditional comments.
	if (/*@cc_on!@*/true) return;

	// =========================== Init Objects ============================

	var doc = document;
	var root = doc.documentElement;
	var xhr = getXHRObject();
	var ieVersion = /MSIE (\d+)/.exec(navigator.userAgent)[1];
	
	// If were not in standards mode, IE is too old / new or we can't create
	// an XMLHttpRequest object then we should get out now.
	if (doc.compatMode != 'CSS1Compat' || ieVersion<6 || ieVersion>8 || !xhr) {
		return;
	}
	
	
	// ========================= Common Objects ============================

	// Compatiable selector engines in order of CSS3 support. Note: '*' is
	// a placholder for the object key name. (basically, crude compression)
	var selectorEngines = {
		"NW"								: "*.Dom.select",
		"MooTools"							: "$$",
		"DOMAssistant"						: "*.$", 
		"Prototype"							: "$$",
		"YAHOO"								: "*.util.Selector.query",
		"Sizzle"							: "*", 
		"jQuery"							: "*",
		"dojo"								: "*.query"
	};

	var selectorMethod;
	var enabledWatchers 					= [];     // array of :enabled/:disabled elements to poll
	var ie6PatchID 							= 0;      // used to solve ie6's multiple class bug
	var patchIE6MultipleClasses				= true;   // if true adds class bloat to ie6
	var namespace 							= "slvzr";
	
	// Stylesheet parsing regexp's
	var RE_COMMENT							= /(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*/g;
	var RE_IMPORT							= /@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))[^;]*;/g;
	var RE_ASSET_URL 						= /\burl\(\s*(["']?)(?!data:)([^"')]+)\1\s*\)/g;
	var RE_PSEUDO_STRUCTURAL				= /^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/;
	var RE_PSEUDO_ELEMENTS					= /:(:first-(?:line|letter))/g;
	var RE_SELECTOR_GROUP					= /(^|})\s*([^\{]*?[\[:][^{]+)/g;
	var RE_SELECTOR_PARSE					= /([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g; 
	var RE_LIBRARY_INCOMPATIBLE_PSEUDOS		= /(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g;
	var RE_PATCH_CLASS_NAME_REPLACE			= /[^\w-]/g;
	
	// HTML UI element regexp's
	var RE_INPUT_ELEMENTS					= /^(INPUT|SELECT|TEXTAREA|BUTTON)$/;
	var RE_INPUT_CHECKABLE_TYPES			= /^(checkbox|radio)$/;

	// Broken attribute selector implementations (IE7/8 native [^=""], [$=""] and [*=""])
	var BROKEN_ATTR_IMPLEMENTATIONS			= ieVersion>6 ? /[\$\^*]=(['"])\1/ : null;

	// Whitespace normalization regexp's
	var RE_TIDY_TRAILING_WHITESPACE			= /([(\[+~])\s+/g;
	var RE_TIDY_LEADING_WHITESPACE			= /\s+([)\]+~])/g;
	var RE_TIDY_CONSECUTIVE_WHITESPACE		= /\s+/g;
	var RE_TIDY_TRIM_WHITESPACE				= /^\s*((?:[\S\s]*\S)?)\s*$/;
	
	// String constants
	var EMPTY_STRING						= "";
	var SPACE_STRING						= " ";
	var PLACEHOLDER_STRING					= "$1";

	// =========================== Patching ================================

	// --[ patchStyleSheet() ]----------------------------------------------
	// Scans the passed cssText for selectors that require emulation and
	// creates one or more patches for each matched selector.
	function patchStyleSheet( cssText ) {
		return cssText.replace(RE_PSEUDO_ELEMENTS, PLACEHOLDER_STRING).
			replace(RE_SELECTOR_GROUP, function(m, prefix, selectorText) {	
    			var selectorGroups = selectorText.split(",");
    			for (var c = 0, cs = selectorGroups.length; c < cs; c++) {
    				var selector = normalizeSelectorWhitespace(selectorGroups[c]) + SPACE_STRING;
    				var patches = [];
    				selectorGroups[c] = selector.replace(RE_SELECTOR_PARSE, 
    					function(match, combinator, pseudo, attribute, index) {
    						if (combinator) {
    							if (patches.length>0) {
    								applyPatches( selector.substring(0, index), patches );
    								patches = [];
    							}
    							return combinator;
    						}		
    						else {
    							var patch = (pseudo) ? patchPseudoClass( pseudo ) : patchAttribute( attribute );
    							if (patch) {
    								patches.push(patch);
    								return "." + patch.className;
    							}
    							return match;
    						}
    					}
    				);
    			}
    			return prefix + selectorGroups.join(",");
    		});
	};

	// --[ patchAttribute() ]-----------------------------------------------
	// returns a patch for an attribute selector.
	function patchAttribute( attr ) {
		return (!BROKEN_ATTR_IMPLEMENTATIONS || BROKEN_ATTR_IMPLEMENTATIONS.test(attr)) ? 
			{ className: createClassName(attr), applyClass: true } : null;
	};

	// --[ patchPseudoClass() ]---------------------------------------------
	// returns a patch for a pseudo-class
	function patchPseudoClass( pseudo ) {

		var applyClass = true;
		var className = createClassName(pseudo.slice(1));
		var isNegated = pseudo.substring(0, 5) == ":not(";
		var activateEventName;
		var deactivateEventName;

		// if negated, remove :not() 
		if (isNegated) {
			pseudo = pseudo.slice(5, -1);
		}
		
		// bracket contents are irrelevant - remove them
		var bracketIndex = pseudo.indexOf("(")
		if (bracketIndex > -1) {
			pseudo = pseudo.substring(0, bracketIndex);
		}		
		
		// check we're still dealing with a pseudo-class
		if (pseudo.charAt(0) == ":") {
			switch (pseudo.slice(1)) {

				case "root":
					applyClass = function(e) {
						return isNegated ? e != root : e == root;
					}
					break;

				case "target":
					// :target is only supported in IE8
					if (ieVersion == 8) {
						applyClass = function(e) {
							var handler = function() { 
								var hash = location.hash;
								var hashID = hash.slice(1);
								return isNegated ? (hash == EMPTY_STRING || e.id != hashID) : (hash != EMPTY_STRING && e.id == hashID);
							};
							addEvent( win, "hashchange", function() {
								toggleElementClass(e, className, handler());
							})
							return handler();
						}
						break;
					}
					return false;
				
				case "checked":
					applyClass = function(e) { 
						if (RE_INPUT_CHECKABLE_TYPES.test(e.type)) {
							addEvent( e, "propertychange", function() {
								if (event.propertyName == "checked") {
									toggleElementClass( e, className, e.checked !== isNegated );
								} 							
							})
						}
						return e.checked !== isNegated;
					}
					break;
					
				case "disabled":
					isNegated = !isNegated;

				case "enabled":
					applyClass = function(e) { 
						if (RE_INPUT_ELEMENTS.test(e.tagName)) {
							addEvent( e, "propertychange", function() {
								if (event.propertyName == "$disabled") {
									toggleElementClass( e, className, e.$disabled === isNegated );
								} 
							});
							enabledWatchers.push(e);
							e.$disabled = e.disabled;
							return e.disabled === isNegated;
						}
						return pseudo == ":enabled" ? isNegated : !isNegated;
					}
					break;
					
				case "focus":
					activateEventName = "focus";
					deactivateEventName = "blur";
								
				case "hover":
					if (!activateEventName) {
						activateEventName = "mouseenter";
						deactivateEventName = "mouseleave";
					}
					applyClass = function(e) {
						addEvent( e, isNegated ? deactivateEventName : activateEventName, function() {
							toggleElementClass( e, className, true );
						})
						addEvent( e, isNegated ? activateEventName : deactivateEventName, function() {
							toggleElementClass( e, className, false );
						})
						return isNegated;
					}
					break;
					
				// everything else
				default:
					// If we don't support this pseudo-class don't create 
					// a patch for it
					if (!RE_PSEUDO_STRUCTURAL.test(pseudo)) {
						return false;
					}
					break;
			}
		}
		return { className: className, applyClass: applyClass };
	};

	// --[ applyPatches() ]-------------------------------------------------
	// uses the passed selector text to find DOM nodes and patch them	
	function applyPatches(selectorText, patches) {
		var elms;
		
		// Although some selector libraries can find :checked :enabled etc. 
		// we need to find all elements that could have that state because 
		// it can be changed by the user.
		var domSelectorText = selectorText.replace(RE_LIBRARY_INCOMPATIBLE_PSEUDOS, EMPTY_STRING);
		
		// If the dom selector equates to an empty string or ends with 
		// whitespace then we need to append a universal selector (*) to it.
		if (domSelectorText == EMPTY_STRING || domSelectorText.charAt(domSelectorText.length - 1) == SPACE_STRING) {
			domSelectorText += "*";
		}
		
		// Ensure we catch errors from the selector library
		try {
			elms = selectorMethod( domSelectorText );
		} catch (ex) {
			// #DEBUG_START
			log( "Selector '" + selectorText + "' threw exception '" + ex + "'" );
			// #DEBUG_END
		}


		if (elms) {
			for (var d = 0, dl = elms.length; d < dl; d++) {	
				var elm = elms[d];
				var cssClasses = elm.className;
				for (var f = 0, fl = patches.length; f < fl; f++) {
					var patch = patches[f];
					
					if (!hasPatch(elm, patch)) {
						if (patch.applyClass && (patch.applyClass === true || patch.applyClass(elm) === true)) {
							cssClasses = toggleClass(cssClasses, patch.className, true );
						}
					}
				}
				elm.className = cssClasses;
			}
		}
	};

	// --[ hasPatch() ]-----------------------------------------------------
	// checks for the exsistence of a patch on an element
	function hasPatch( elm, patch ) {
		return new RegExp("(^|\\s)" + patch.className + "(\\s|$)").test(elm.className);
	};
	
	
	// =========================== Utility =================================
	
	function createClassName( className ) {
		return namespace + "-" + ((ieVersion == 6 && patchIE6MultipleClasses) ?
			ie6PatchID++
		:
			className.replace(RE_PATCH_CLASS_NAME_REPLACE, function(a) { return a.charCodeAt(0) }));
	};

	// --[ log() ]----------------------------------------------------------
	// #DEBUG_START
	function log( message ) {
		if (win.console) {
			win.console.log(message);
		}
	};
	// #DEBUG_END

	// --[ trim() ]---------------------------------------------------------
	// removes leading, trailing whitespace from a string
	function trim( text ) {
		return text.replace(RE_TIDY_TRIM_WHITESPACE, PLACEHOLDER_STRING);
	};

	// --[ normalizeWhitespace() ]------------------------------------------
	// removes leading, trailing and consecutive whitespace from a string
	function normalizeWhitespace( text ) {
		return trim(text).replace(RE_TIDY_CONSECUTIVE_WHITESPACE, SPACE_STRING);
	};

	// --[ normalizeSelectorWhitespace() ]----------------------------------
	// tidies whitespace around selector brackets and combinators
	function normalizeSelectorWhitespace( selectorText ) {
		return normalizeWhitespace(selectorText.
			replace(RE_TIDY_TRAILING_WHITESPACE, PLACEHOLDER_STRING).
			replace(RE_TIDY_LEADING_WHITESPACE, PLACEHOLDER_STRING)
		);
	};

	// --[ toggleElementClass() ]-------------------------------------------
	// toggles a single className on an element
	function toggleElementClass( elm, className, on ) {
		var oldClassName = elm.className;
		var newClassName = toggleClass(oldClassName, className, on);
		if (newClassName != oldClassName) {
			elm.className = newClassName;
			elm.parentNode.className += EMPTY_STRING;
		}
	};

	// --[ toggleClass() ]--------------------------------------------------
	// adds / removes a className from a string of classNames. Used to 
	// manage multiple class changes without forcing a DOM redraw
	function toggleClass( classList, className, on ) {
		var re = RegExp("(^|\\s)" + className + "(\\s|$)");
		var classExists = re.test(classList);
		if (on) {
			return classExists ? classList : classList + SPACE_STRING + className;
		} else {
			return classExists ? trim(classList.replace(re, PLACEHOLDER_STRING)) : classList;
		}
	};
	
	// --[ addEvent() ]-----------------------------------------------------
	function addEvent(elm, eventName, eventHandler) {
		elm.attachEvent("on" + eventName, eventHandler);
	};

	// --[ getXHRObject() ]-------------------------------------------------
	function getXHRObject()
	{
		if (win.XMLHttpRequest) {
			return new XMLHttpRequest;
		}
		try	{ 
			return new ActiveXObject('Microsoft.XMLHTTP');
		} catch(e) { 
			return null;
		}
	};

	// --[ loadStyleSheet() ]-----------------------------------------------
	function loadStyleSheet( url ) {
		xhr.open("GET", url, false);
		xhr.send();
		return (xhr.status==200) ? xhr.responseText : EMPTY_STRING;	
	};
	
	// --[ resolveUrl() ]---------------------------------------------------
	// Converts a URL fragment to a fully qualified URL using the specified
	// context URL. Returns null if same-origin policy is broken
	function resolveUrl( url, contextUrl ) {
	
		function getProtocolAndHost( url ) {
			return url.substring(0, url.indexOf("/", 8));
		};
		
		// absolute path
		if (/^https?:\/\//i.test(url)) {
			return getProtocolAndHost(contextUrl) == getProtocolAndHost(url) ? url : null;
		}
		
		// root-relative path
		if (url.charAt(0)=="/")	{
			return getProtocolAndHost(contextUrl) + url;
		}

		// relative path
		var contextUrlPath = contextUrl.split(/[?#]/)[0]; // ignore query string in the contextUrl	
		if (url.charAt(0) != "?" && contextUrlPath.charAt(contextUrlPath.length - 1) != "/") {
			contextUrlPath = contextUrlPath.substring(0, contextUrlPath.lastIndexOf("/") + 1);
		}
		
		return contextUrlPath + url;
	};
	
	// --[ parseStyleSheet() ]----------------------------------------------
	// Downloads the stylesheet specified by the URL, removes it's comments
	// and recursivly replaces @import rules with their contents, ultimately
	// returning the full cssText.
	function parseStyleSheet( url ) {
		if (url) {
			return loadStyleSheet(url).replace(RE_COMMENT, EMPTY_STRING).
			replace(RE_IMPORT, function( match, quoteChar, importUrl, quoteChar2, importUrl2 ) { 
				return parseStyleSheet(resolveUrl(importUrl || importUrl2, url));
			}).
			replace(RE_ASSET_URL, function( match, quoteChar, assetUrl ) { 
				quoteChar = quoteChar || EMPTY_STRING;
				return " url(" + quoteChar + resolveUrl(assetUrl, url) + quoteChar + ") "; 
			});
		}
		return EMPTY_STRING;
	};
	
	// --[ init() ]---------------------------------------------------------
	function init() {
		// honour the <base> tag
		var url, stylesheet;
		var baseTags = doc.getElementsByTagName("BASE");
		var baseUrl = (baseTags.length > 0) ? baseTags[0].href : doc.location.href;
		
		/* Note: This code prevents IE from freezing / crashing when using 
		@font-face .eot files but it modifies the <head> tag and could
		trigger the IE stylesheet limit. It will also cause FOUC issues.
		If you choose to use it, make sure you comment out the for loop 
		directly below this comment.

		var head = doc.getElementsByTagName("head")[0];
		for (var c=doc.styleSheets.length-1; c>=0; c--) {
			stylesheet = doc.styleSheets[c]
			head.appendChild(doc.createElement("style"))
			var patchedStylesheet = doc.styleSheets[doc.styleSheets.length-1];
			
			if (stylesheet.href != EMPTY_STRING) {
				url = resolveUrl(stylesheet.href, baseUrl)
				if (url) {
					patchedStylesheet.cssText = patchStyleSheet( parseStyleSheet( url ) )
					stylesheet.disabled = true
					setTimeout( function () {
						stylesheet.owningElement.parentNode.removeChild(stylesheet.owningElement)
					})
				}
			}
		}
		*/
		
		for (var c = 0; c < doc.styleSheets.length; c++) {
			stylesheet = doc.styleSheets[c]
			if (stylesheet.href != EMPTY_STRING) {
				url = resolveUrl(stylesheet.href, baseUrl);
				if (url) {
					stylesheet.cssText = patchStyleSheet( parseStyleSheet( url ) );
				}
			}
		}
		
		// :enabled & :disabled polling script (since we can't hook 
		// onpropertychange event when an element is disabled) 
		if (enabledWatchers.length > 0) {
			setInterval( function() {
				for (var c = 0, cl = enabledWatchers.length; c < cl; c++) {
					var e = enabledWatchers[c];
					if (e.disabled !== e.$disabled) {
						if (e.disabled) {
							e.disabled = false;
							e.$disabled = true;
							e.disabled = true;
						}
						else {
							e.$disabled = e.disabled;
						}
					}
				}
			},250)
		}
	};
	
	// Bind selectivizr to the ContentLoaded event. 
	ContentLoaded(win, function() {
		// Determine the "best fit" selector engine
		for (var engine in selectorEngines) {
			var members, member, context = win;
			if (win[engine]) {
				members = selectorEngines[engine].replace("*", engine).split(".");
				while ((member = members.shift()) && (context = context[member])) {}
				if (typeof context == "function") {
					selectorMethod = context;
					init();
					return;
				}
			}
		}
	});
	
	
	/*!
	 * ContentLoaded.js by Diego Perini, modified for IE<9 only (to save space)
	 *
	 * Author: Diego Perini (diego.perini at gmail.com)
	 * Summary: cross-browser wrapper for DOMContentLoaded
	 * Updated: 20101020
	 * License: MIT
	 * Version: 1.2
	 *
	 * URL:
	 * http://javascript.nwbox.com/ContentLoaded/
	 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
	 *
	 */

	// @w window reference
	// @f function reference
	function ContentLoaded(win, fn) {

		var done = false, top = true,
		init = function(e) {
			if (e.type == "readystatechange" && doc.readyState != "complete") return;
			(e.type == "load" ? win : doc).detachEvent("on" + e.type, init, false);
			if (!done && (done = true)) fn.call(win, e.type || e);
		},
		poll = function() {
			try { root.doScroll("left"); } catch(e) { setTimeout(poll, 50); return; }
			init('poll');
		};

		if (doc.readyState == "complete") fn.call(win, EMPTY_STRING);
		else {
			if (doc.createEventObject && root.doScroll) {
				try { top = !win.frameElement; } catch(e) { }
				if (top) poll();
			}
			addEvent(doc,"readystatechange", init);
			addEvent(win,"load", init);
		}
	};
})(this);;
(function ($) {

//$.colorbox.settings.maxWidth = 450px;

//$.colorbox.settings.scrolling = false;
//$.colorbox.settings.open = true;
//$.colorbox.settings.transition = 'none';
//$.colorbox.settings.speed = 100;

$(document).bind('cbox_complete', function(){
    //setTimeout($.colorbox.next, 1500);
    //setTimeout($.colorbox.resize, 1500);
    $.colorbox.resize({speed:0});
});
//$.colorbox.settings.height = auto;

Drupal.behaviors.initColorboxDefaultStyle = {
  attach: function (context, settings) {
    $(document).bind('cbox_complete', function () {
      // Only run if there is a title.
      if ($('#cboxTitle:empty', context).length == false) {
        setTimeout(function () { $('#cboxTitle', context).slideUp() }, 1500);
        $('#cboxLoadedContent img', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideDown();
        });
        $('#cboxOverlay', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideUp();
        });
      }
      else {
        $('#cboxTitle', context).hide();
      }
    });
  }
};

})(jQuery);
;
/*!
    jQuery.kinetic v1.8.0
    Dave Taylor http://the-taylors.org/jquery.kinetic

    The MIT License (MIT)
    Copyright (c) <2011> <Dave Taylor http://the-taylors.org>
*/
/*global define,require */
(function(jQuery){
	'use strict';

    var DEFAULT_SETTINGS = {
            /* cursor: 'move', */
            decelerate: true,
            triggerHardware: false,
            y: true,
            x: true,
            slowdown: 0.9,
            maxvelocity: 40,
            throttleFPS: 60,
            movingClass: {
                up: 'kinetic-moving-up',
                down: 'kinetic-moving-down',
                left: 'kinetic-moving-left',
                right: 'kinetic-moving-right'
            },
            deceleratingClass: {
                up: 'kinetic-decelerating-up',
                down: 'kinetic-decelerating-down',
                left: 'kinetic-decelerating-left',
                right: 'kinetic-decelerating-right'
            }
        },
        SETTINGS_KEY = 'kinetic-settings',
        ACTIVE_CLASS = 'kinetic-active';
    /**
     * Provides requestAnimationFrame in a cross browser way.
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
    if ( !window.requestAnimationFrame ) {

        window.requestAnimationFrame = ( function() {

            return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
                window.setTimeout( callback, 1000 / 60 );
            };

        }());

    }

    // add touch checker to jQuery.support
    jQuery.support = jQuery.support || {};
    jQuery.extend(jQuery.support, {
        touch: "ontouchend" in document
    });
    var selectStart = function() { return false; };

    var decelerateVelocity = function(velocity, slowdown) {
        return Math.floor(Math.abs(velocity)) === 0 ? 0 // is velocity less than 1?
               : velocity * slowdown; // reduce slowdown
    };

    var capVelocity = function(velocity, max) {
        var newVelocity = velocity;
        if (velocity > 0) {
            if (velocity > max) {
                newVelocity = max;
            }
        } else {
            if (velocity < (0 - max)) {
                newVelocity = (0 - max);
            }
        }
        return newVelocity;
    };

    var setMoveClasses = function(settings, classes) {
        this.removeClass(settings.movingClass.up)
            .removeClass(settings.movingClass.down)
            .removeClass(settings.movingClass.left)
            .removeClass(settings.movingClass.right)
            .removeClass(settings.deceleratingClass.up)
            .removeClass(settings.deceleratingClass.down)
            .removeClass(settings.deceleratingClass.left)
            .removeClass(settings.deceleratingClass.right);

        if (settings.velocity > 0) {
            this.addClass(classes.right);
        }
        if (settings.velocity < 0) {
            this.addClass(classes.left);
        }
        if (settings.velocityY > 0) {
            this.addClass(classes.down);
        }
        if (settings.velocityY < 0) {
            this.addClass(classes.up);
        }

    };

    var stop = function(jQueryscroller, settings) {
        settings.velocity = 0;
        settings.velocityY = 0;
        settings.decelerate = true;
        if (typeof settings.stopped === 'function') {
            settings.stopped.call(jQueryscroller, settings);
        }
    };

    /** do the actual kinetic movement */
    var move = function(jQueryscroller, settings) {
        var scroller = jQueryscroller[0];
        // set scrollLeft
        if (settings.x && scroller.scrollWidth > 0){
            scroller.scrollLeft = settings.scrollLeft = scroller.scrollLeft + settings.velocity;
            if (Math.abs(settings.velocity) > 0) {
                settings.velocity = settings.decelerate ?
                    decelerateVelocity(settings.velocity, settings.slowdown) : settings.velocity;
            }
        } else {
            settings.velocity = 0;
        }

        // set scrollTop
        if (settings.y && scroller.scrollHeight > 0){
            scroller.scrollTop = settings.scrollTop = scroller.scrollTop + settings.velocityY;
            if (Math.abs(settings.velocityY) > 0) {
                settings.velocityY = settings.decelerate ?
                    decelerateVelocity(settings.velocityY, settings.slowdown) : settings.velocityY;
            }
        } else {
            settings.velocityY = 0;
        }

        setMoveClasses.call(jQueryscroller, settings, settings.deceleratingClass);

        if (typeof settings.moved === 'function') {
            settings.moved.call(jQueryscroller, settings);
        }

        if (Math.abs(settings.velocity) > 0 || Math.abs(settings.velocityY) > 0) {
            // tick for next movement
            window.requestAnimationFrame(function(){ move(jQueryscroller, settings); });
        } else {
            stop(jQueryscroller, settings);
        }
    };

    var callOption = function(method, options) {
        var methodFn = jQuery.kinetic.callMethods[method],
            args = Array.prototype.slice.call(arguments)
        ;
        if (methodFn) {
            this.each(function(){
                var opts = args.slice(1), settings = jQuery(this).data(SETTINGS_KEY);
                opts.unshift(settings);
                methodFn.apply(this, opts);
            });
        }
    };

    var attachListeners = function(jQuerythis, settings) {
        var element = jQuerythis[0];
        if (jQuery.support.touch) {
            jQuerythis.bind('touchstart', settings.events.touchStart)
                .bind('touchend', settings.events.inputEnd)
                .bind('touchmove', settings.events.touchMove)
            ;
        } else {
            jQuerythis
                .mousedown(settings.events.inputDown)
                .mouseup(settings.events.inputEnd)
                .mousemove(settings.events.inputMove)
            ;
        }
        jQuerythis
            .click(settings.events.inputClick)
            .scroll(settings.events.scroll)
            .bind("selectstart", selectStart) // prevent selection when dragging
            .bind('dragstart', settings.events.dragStart);
    };
    var detachListeners = function(jQuerythis, settings) {
        var element = jQuerythis[0];
        if (jQuery.support.touch) {
            jQuerythis.unbind('touchstart', settings.events.touchStart)
                .unbind('touchend', settings.events.inputEnd)
                .unbind('touchmove', settings.events.touchMove);
        } else {
            jQuerythis
            .unbind('mousedown', settings.events.inputDown)
            .unbind('mouseup', settings.events.inputEnd)
            .unbind('mousemove', settings.events.inputMove)
            .unbind('scroll', settings.events.scroll);
        }
        jQuerythis.unbind('click', settings.events.inputClick)
        .unbind("selectstart", selectStart); // prevent selection when dragging
        jQuerythis.unbind('dragstart', settings.events.dragStart);
    };

    var initElements = function(options) {
        this
        .addClass(ACTIVE_CLASS)
        .each(function(){

            var settings = jQuery.extend({}, DEFAULT_SETTINGS, options);

            var self = this,
                jQuerythis = jQuery(this),
                xpos,
                prevXPos = false,
                ypos,
                prevYPos = false,
                mouseDown = false,
                scrollLeft,
                scrollTop,
                throttleTimeout = 1000 / settings.throttleFPS,
                lastMove,
                elementFocused
            ;

            settings.velocity = 0;
            settings.velocityY = 0;

            // make sure we reset everything when mouse up
            var resetMouse = function() {
                xpos = false;
                ypos = false;
                mouseDown = false;
            };
            jQuery(document).mouseup(resetMouse).click(resetMouse);

            var calculateVelocities = function() {
                settings.velocity    = capVelocity(prevXPos - xpos, settings.maxvelocity);
                settings.velocityY   = capVelocity(prevYPos - ypos, settings.maxvelocity);
            };
            var useTarget = function(target) {
                if (jQuery.isFunction(settings.filterTarget)) {
                    return settings.filterTarget.call(self, target) !== false;
                }
                return true;
            };
            var start = function(clientX, clientY) {
                mouseDown = true;
                settings.velocity = prevXPos = 0;
                settings.velocityY = prevYPos = 0;
                xpos = clientX;
                ypos = clientY;
            };
            var end = function() {
                if (xpos && prevXPos && settings.decelerate === false) {
                    settings.decelerate = true;
                    calculateVelocities();
                    xpos = prevXPos = mouseDown = false;
                    move(jQuerythis, settings);
                }
            };
            var inputmove = function(clientX, clientY) {
                if (!lastMove || new Date() > new Date(lastMove.getTime() + throttleTimeout)) {
                    lastMove = new Date();

                    if (mouseDown && (xpos || ypos)) {
                        if (elementFocused) {
                            jQuery(elementFocused).blur();
                            elementFocused = null;
                            jQuerythis.focus();
                        }
                        settings.decelerate = false;
                        settings.velocity   = settings.velocityY  = 0;
                        jQuerythis[0].scrollLeft = settings.scrollLeft = settings.x ? jQuerythis[0].scrollLeft - (clientX - xpos) : jQuerythis[0].scrollLeft;
                        jQuerythis[0].scrollTop  = settings.scrollTop  = settings.y ? jQuerythis[0].scrollTop - (clientY - ypos)  : jQuerythis[0].scrollTop;
                        prevXPos = xpos;
                        prevYPos = ypos;
                        xpos = clientX;
                        ypos = clientY;

                        calculateVelocities();
                        setMoveClasses.call(jQuerythis, settings, settings.movingClass);

                        if (typeof settings.moved === 'function') {
                            settings.moved.call(jQuerythis, settings);
                        }
                    }
                }
            };

            // Events
            settings.events = {
                touchStart: function(e){
                    var touch;
                    if (useTarget(e.target)) {
                        touch = e.originalEvent.touches[0];
                        start(touch.clientX, touch.clientY);
                        e.stopPropagation();
                    }
                },
                touchMove: function(e){
                    var touch;
                    if (mouseDown) {
                        touch = e.originalEvent.touches[0];
                        inputmove(touch.clientX, touch.clientY);
                        if (e.preventDefault) {e.preventDefault();}
                    }
                },
                inputDown: function(e){
                    if (useTarget(e.target)) {
                        start(e.clientX, e.clientY);
                        elementFocused = e.target;
                        if (e.target.nodeName === 'IMG'){
                            e.preventDefault();
                        }
                        e.stopPropagation();
                    }
                },
                inputEnd: function(e){
                    end();
                    elementFocused = null;
                    if (e.preventDefault) {e.preventDefault();}
                },
                inputMove: function(e) {
                    if (mouseDown){
                        inputmove(e.clientX, e.clientY);
                        if (e.preventDefault) {e.preventDefault();}
                    }
                },
                scroll: function(e) {
                    if (typeof settings.moved === 'function') {
                        settings.moved.call(jQuerythis, settings);
                    }
                    if (e.preventDefault) {e.preventDefault();}
                },
                inputClick: function(e){
                    if (Math.abs(settings.velocity) > 0) {
                        e.preventDefault();
                        return false;
                    }
                },
                // prevent drag and drop images in ie
                dragStart: function(e) {
                    if (elementFocused) {
                        return false;
                    }
                }
            };

            attachListeners(jQuerythis, settings);
            jQuerythis.data(SETTINGS_KEY, settings)
                .css("cursor", settings.cursor);

            if (settings.triggerHardware) {
                jQuerythis.css('-webkit-transform', 'translate3d(0,0,0)');
            }
        });
    };

    jQuery.kinetic = {
        settingsKey: SETTINGS_KEY,
        callMethods: {
            start: function(settings, options){
                var jQuerythis = jQuery(this);
                    settings = jQuery.extend(settings, options);
                if (settings) {
                    settings.decelerate = false;
                    move(jQuerythis, settings);
                }
            },
            end: function(settings, options){
                var jQuerythis = jQuery(this);
                if (settings) {
                    settings.decelerate = true;
                }
            },
            stop: function(settings, options){
                var jQuerythis = jQuery(this);
                stop(jQuerythis, settings);
            },
            detach: function(settings, options) {
                var jQuerythis = jQuery(this);
                detachListeners(jQuerythis, settings);
                jQuerythis
                .removeClass(ACTIVE_CLASS)
                .css("cursor", "");
            },
            attach: function(settings, options) {
                var jQuerythis = jQuery(this);
                attachListeners(jQuerythis, settings);
                jQuerythis
                .addClass(ACTIVE_CLASS)
                .css("cursor", "move");
            }
        }
    };
    jQuery.fn.kinetic = function(options) {
        if (typeof options === 'string') {
            callOption.apply(this, arguments);
        } else {
            initElements.call(this, options);
        }
        return this;
    };

}(window.jQuery || window.Zepto));
;
/*!
 * jQuery.ScrollTo
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 4/09/2012
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @author Ariel Flesler
 * @version 1.4.3.1
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 *		- A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *		- The string 'max' for go-to-end. 
 * @param {Number, Function} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number, Function} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends. 
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @desc Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @desc Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');																   
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */

;(function( $ ){
	
	var $scrollTo = $.scrollTo = function( target, duration, settings ){
		$(window).scrollTo( target, duration, settings );
	};

	$scrollTo.defaults = {
		axis:'xy',
		duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
		limit:true
	};

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope ){
		return $(window)._scrollable();
	};

	// Hack, hack, hack :)
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn._scrollable = function(){
		return this.map(function(){
			var elem = this,
				isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

				if( !isWin )
					return elem;

			var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
			
			return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
				doc.body : 
				doc.documentElement;
		});
	};

	$.fn.scrollTo = function( target, duration, settings ){
		if( typeof duration == 'object' ){
			settings = duration;
			duration = 0;
		}
		if( typeof settings == 'function' )
			settings = { onAfter:settings };
			
		if( target == 'max' )
			target = 9e9;
			
		settings = $.extend( {}, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;
		
		if( settings.queue )
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both( settings.offset );
		settings.over = both( settings.over );

		return this._scrollable().each(function(){
			// Null target yields nothing, just like jQuery does
			if (target == null) return;

			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = {},
				win = $elem.is('html,body');

			switch( typeof targ ){
				// A number will pass the regex
				case 'number':
				case 'string':
					if( /^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ) ){
						targ = both( targ );
						// We are done
						break;
					}
					// Relative selector, no break!
					targ = $(targ,this);
					if (!targ.length) return;
				case 'object':
					// DOMElement / jQuery
					if( targ.is || targ.style )
						// Get the real position of the target 
						toff = (targ = $(targ)).offset();
			}
			$.each( settings.axis.split(''), function( i, axis ){
				var Pos	= axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					max = $scrollTo.max(elem, axis);

				if( toff ){// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if( settings.margin ){
						attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
					}
					
					attr[key] += settings.offset[pos] || 0;
					
					if( settings.over[pos] )
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
				}else{ 
					var val = targ[pos];
					// Handle percentage values
					attr[key] = val.slice && val.slice(-1) == '%' ? 
						parseFloat(val) / 100 * max
						: val;
				}

				// Number or 'number'
				if( settings.limit && /^\d+$/.test(attr[key]) )
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

				// Queueing axes
				if( !i && settings.queue ){
					// Don't waste time animating, if there's no need.
					if( old != attr[key] )
						// Intermediate animation
						animate( settings.onAfterFirst );
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				}
			});

			animate( settings.onAfter );			

			function animate( callback ){
				$elem.animate( attr, duration, settings.easing, callback && function(){
					callback.call(this, target, settings);
				});
			};

		}).end();
	};
	
	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function( elem, axis ){
		var Dim = axis == 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;
		
		if( !$(elem).is('html,body') )
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();
		
		var size = 'client' + Dim,
			html = elem.ownerDocument.documentElement,
			body = elem.ownerDocument.body;

		return Math.max( html[scroll], body[scroll] ) 
			 - Math.min( html[size]  , body[size]   );
	};

	function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	};

})( jQuery );;
