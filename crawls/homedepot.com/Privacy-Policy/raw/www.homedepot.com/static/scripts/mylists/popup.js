//SETTING UP OUR POPUP
//0 means disabled; 1 means enabled;
var popupStatus = 0;
var emailPasswordChanged; 
var qvFlagCheck = 1;
var popupFromPage;
var iframeURL;
//Loading Create New list popup
var loadFancyPopup = function(data, fromPage, opCode){
		parent.popupFromPage = fromPage;		
		var checkLogin = data.indexOf('popupSignIn'); 
			var overlayContainer, appendContent = data, popupCtn = data;
			if (fromPage == "quickView" ) 
			{
			overlayContainer = $('.SSKU_Overlay_Container').html();
			appendContent = '<div id="addToListResponse" class="addToListRemove">'+'<input type="hidden" id="quickViewRef" value="quickViewPage" />'+popupCtn+'<div style="display:none;">'+overlayContainer+'</div></div>';
			var tempURLValue = $('iframe#fancybox-frame', top.document).attr('src');
			if(tempURLValue && tempURLValue.length > 0){
			parent.iframeURL = $('iframe#fancybox-frame', top.document).attr('src');
			iframeURL = $('iframe#fancybox-frame', top.document).attr('src');
			}
			}
			if(fromPage == "shoppingCart" && data.indexOf('popupSignIn') < 0){
				var BgOpacity = 0;
			}
			else{
				var BgOpacity =0.7;
			}
			var fixWidth = 380;
			var fixHeight = 377;
			
			if(fromPage=="productDetail"){													 
			 fixHeight = 257;
					//for ie7 & ie8 set separate height to display 
					if(browserCompare()=="microsoft internet explorer7.0")
					fixHeight = 207;					
					else if(browserCompare()=="microsoft internet explorer8.0")
					 fixHeight = 217;		
					
			}
			if (data.indexOf('popupSignIn') >= 0) {
			fixHeight = 330;
			fixWidth = 460;
			}
			if (data.indexOf('popupCreateListFromCart') >= 0) {
			fixHeight = 197;
			fixWidth = 380;
			}
			if (data.indexOf('popupAddToYour') >= 0) {
			fixHeight = 177;
			fixWidth = 394;
			}
			if (data.indexOf('CreateAccount') >= 0) 
			fixHeight = 560; 
			if (fromPage == "shoppingCart" && data.indexOf('popupCreateNewList') >= 0 && (opCode==2 || opCode==1)){
				$('body').append("<div id='tempResponseData' style='display:none;'>"+data+"</div>");
				displayInlineConfirmation();
			}
			else{
			if($.browser.msie && parseInt(document.documentMode) == 9){
				var $iframe = parent.$;}
				parent.jQuery.fancybox({ 
					'content': appendContent,
					'scrolling': 'no',
					'titleShow': false,
					'showCloseButton': false,
					'hideOnOverlayClick': false,
					'width': fixWidth, 
					'autoDimensions': false, 
					'height': fixHeight, 
					'padding':0,
					'overlayOpacity':BgOpacity,
					'overlayColor':'#333',
					'autoScale': false,
					'transitionIn':'none', 
					'transitionOut': 'none',
					afterLoad: function (){
					if($.browser.msie && parseInt(document.documentMode) == 9){
						$iframe('#fancybox-content').css({'height':'auto'});
						$iframe('#fancybox-content').children('div:first').css({'height':'auto'});
						$iframe('#popupSignIn').append('<div style="clear:both"></div>');
						$iframe('.cartPopup').append('<div style="clear:both"></div>');
					}else{
						$('#fancybox-content').css({'height':'auto'});
						$('#fancybox-content').children('div:first').css({'height':'auto'});
						$('#popupSignIn').append('<div style="clear:both"></div>');
						$('.cartPopup').append('<div style="clear:both"></div>');
					}
					}
				});
			}
}

function browserCompare(){				 
				var userAgent = navigator.userAgent.toLowerCase();
				var userBrowserName  = navigator.appName.toLowerCase();
				// Figure out what browser is being used
				$.browser = {
				version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
				safari: /webkit/.test( userAgent ),
				opera: /opera/.test( userAgent ),
				msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
				mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ),
				name:userBrowserName
				};
				return $.browser.name+$.browser.version;
}
function loadPopup(a){

		var PopupWidth, PopupHeight;
 
		PopupWidth = 440;
		PopupHeight = 149;
		if (a=="popupDeleteList") {
					PopupHeight = 197;
					PopupWidth = 380;
		}
		if (a=="popupEmailList") {
					PopupHeight = 574;
		}
		if (a=="popupCreateNewList") {
					PopupWidth = 380;
					PopupHeight = 197;
		}
		if (a=="popupListToCart") {
					PopupWidth = 430;
					PopupHeight = 146;
		}
		if(a=="ajaxResponseDiv"){		 
		PopupWidth = 890;
		PopupHeight = 595;		
		}
		
		
		 
			$.fancybox({ 
							'href':'#'+a,
							'scrolling': 'no',
							'titleShow': false,
							'showCloseButton': false,
							'hideOnOverlayClick': false,
							'width': PopupWidth, 
							'autoDimensions': false, 
							'height': PopupHeight, 
							'padding':0,
							'autoScale': false,
							'transitionIn':'none', 
							'transitionOut': 'none',
							'onComplete': function (a){
									$('#popupEmailList').append('<div style="clear:both"></div>');
									$('#popupCreateNewList').append('<div style="clear:both"></div>');
									$('#popupAddToYour').append('<div style="clear:both"></div>');
									$('#fancybox-content').css({'height':'auto'});
									$('#fancybox-content').children('div:first').css({'height':'auto'});	
								}
						});
						
}


//CONTROLLING EVENTS IN jQuery
$(document).ready(function(){
//On press Enter key submitting the popup sign in - start
$("#popupSignIn #userLogin input#email_id, #popupSignIn #userLogin input#password").live('keypress', function(e){
if (e.keyCode == 13)
    $("#popupSignIn #signIn").trigger('click');

});
/*
//On press Enter key submitting the popup sign in - end
$("#signIn").live('click', function(e){	
					e.preventDefault();
					var e = $("#email_id").attr('value');
					var f = $(".backgroundPopup #password").attr('value'); 
					var atpos=e.indexOf("@");
					var dotpos=e.lastIndexOf(".");
					 $("#email_id, .backgroundPopup #password").css('border','1px solid gray');
					  if ((e.length==0 && f.length==0) ||((atpos<1 || dotpos<atpos+2 || dotpos+2>=e.length) && f.length==0)) {
						$(".signInError").css('display','none');
						$("#email_id, .backgroundPopup #password").css('border','1px solid red');
						$(".signInError").css({display:'block', color:'red'});
						$(".signInError").html("The following field(s) are required: E-mail Address, Password.");
					  }
					  else if ((atpos<1 || dotpos<atpos+2 || dotpos+2>=e.length) || e.length==0) {
						$(".signInError").css('display','none');
						$("#email_id").css('border','1px solid red');
						$(".signInError").css({display:'block', color:'red'});
						$(".signInError").html("The following field(s) are required: E-mail Address.");
					  }
							else if(f.length==0){
							$(".backgroundPopup #password").css('border','1px solid red'); 
							$(".signInError").css({display:'block', color:'red'});
							$(".signInError").html("The following field(s) are required: Password.");
					}
					else {
						$("#email_id").css('border','1px solid gray');
						$(".signInError").css('display','none');
						$("#userLogin").submit();
					}
					$.fancybox.resize();
					$('#fancybox-content').css({'width':'460px', 'height':'auto'});
					$('#fancybox-content').children('div:first').css({'width':'460px', 'height':'auto'});
			
});
*/

$(".ClosePopup, .popupAddListClose").live('click', function(){ // quick view popup close button - add to list, create list, persistent logon,
	if((popupFromPage == "quickView" || qv_fromPage=="quickview")){
		if(typeof iframeURL == 'undefined' && ($('#iFrame').val() != "" || $('#iFrame').val() != null) ){
			var iframeURL = $('#iFrame').val();
			$('#iFrame').val('');
		}
		if(iframeURL == '' || iframeURL == null){
			var iframeURL = parent.iframeURL;
		}
	}
		if((popupFromPage == "quickView" || qv_fromPage=="quickview") && typeof iframeURL != 'undefined' ){
		parent.jQuery.fancybox({
				'width'				: 710, 
				'height'			: 520,
				'autoScale'			: false,
				'transitionIn'		: 'none',
				'transitionOut'		: 'none',
				'scrolling'			: 'no',
				'showCloseButton'	: false, 
				'overlayOpacity'    : 0, 
				'hideOnOverlayClick':false,
				'type'				: 'iframe',
				'href' : iframeURL
				}); 
			iframeURL ="";
		}
		else{
		$.fancybox.close();
		}
		$('#clickAddToListButton').val("true");
		qv_fromPage = "";
	});	

//close popup fancybox when clicked on Continue Shopping button
$(".continueShoppingBtn").live('click', function(){
$.fancybox.close();
});

	// PIP page create list functionality
	$("#createList_PIP").click(function(){
	var Lname=$("#add_new_list").attr('value');
	var lists;
	 $(".toAdd").each( function(){
		 var list = $(this).html();
		 if(list==Lname)
		 {
		lists = list;	 
		 }
    });
	 
	 var splChar=/[^a-z0-9\s\Q!@#$%^&*()-_+=,.?:;"'\\E]/g; 
	 splChar=Lname.match(splChar);
	 
	var Lcount=Lname.length;
	if((Lname!="or create a new list...")&&(Lname!=""))
	{
	if(Lcount>30)
	{
		$(".error_msg").css('display','none');
		$(".exceedLimit").css('display','block');
		$("#add_new_list").css('border','1px solid red');
	}
	else if(lists==Lname)
	{
		$(".error_msg").css('display','none');
		$(".alreadyExists").css('display','block');
		$("#add_new_list").css('border','1px solid red');
	}
	else if(splChar!=null)
	{
		$(".error_msg").css('display','none');
		$(".otherChar").css('display','block');
		$("#add_new_list").css('border','1px solid red');		
	}
	else
	{
		loadPopup('popupCreateNewList');
		$(".error_msg").css('display','none');
		$("#popupCreateNewList div.toShow").html(Lname);
	}
	}
	});

	//list landing page - create list gray button onclick model window
	$("#createList_gray").click(function(){
		$(".listNamePopUpError").css('display','none');
		$("#landing_add1").css('border','1px solid #cccccc');
		loadPopup('popupCreateNewList');
	});	
	
	//Delete whole list from item landing page
	$(".deleteAll").click(function(){
	var ifList = $(this).attr('class');
	if(ifList!="itemDelete deleteListBtn")
		loadPopup('popupDeleteList');
	});	
	
	$(".clearBtn, #clearTxt").click(function(){
		loadPopup('popupClearList');
	});	
	//Add list to cart from item landing page
	$(".addListToCart").click(function(){
		addListToCart(); 
	});	
	
	//Email list  from item landing page
	
	$(".emailList").click(function(){
		$("#userEmail, #recipientsEmails, #userName").css('border','1px solid #cccccc');
		var defaultTextAreaText = "Here is my wish list of items from Home Depot for my latest project. If you could take a quick look, I'd really appreciate it.Thanks.";
	$("textarea[name='limitedtextarea']").val(defaultTextAreaText); 
		$(".nameExistError3").css('display','none');
		loadPopup('popupEmailList');
			
	});		
	
	

$("#send_email").live('click', function(){
	var uname = $("#userName").val();
	var uemail = $("#userEmail").val();
	var recipient = $("#recipientsEmails").val();
	$("#userEmail, #recipientsEmails, #userName").css('border','1px solid #cccccc');
if((uname == "") || (uemail == "") || (recipient == ""))
{
	if((uname == "")){
	$("#userName").css('border','1px solid red');
	$(".nameExistError3").css('display','block');
	$(".nameExistError3 div.ErrorWithoutIcon").html("The Your fields cannot be blank. Type your name or e-mail in the field and try again.");
	}
	if((uemail == "")){
	$("#userEmail").css('border','1px solid red');
	$(".nameExistError3").css('display','block');
	$(".nameExistError3 div.ErrorWithoutIcon").html("The Your fields cannot be blank. Type your name or e-mail in the field and try again.");
	}
	if((recipient == "")){
	$("#recipientsEmails").css('border','1px solid red');
	
	$(".nameExistError3").css('display','block');
	$(".nameExistError3 div.ErrorWithoutIcon").html("The Your fields cannot be blank. Type your name or e-mail in the field and try again.");/*13 changes by Guru*/
	}

}
else
{
	$(".nameExistError3").css('display','none');
		var atpos= validateEmail(uemail); 
		var atpos1=validateMultipleEmailsCommaSeparated(recipient);
		
		 if (!atpos1 && !atpos)
		  {
			  	$(".nameExistError3").css('display','block');
				$("#recipientsEmails, #userEmail").css('border','1px solid red');
				$(".nameExistError3 div.ErrorWithoutIcon").html("The To e-mail address field is invalid. Type the e-mail address of the person to whom you are sending your list and try again");
		  }
		else if (!atpos || !atpos1)
		  {
			  	if(!atpos1){
				$(".nameExistError3").css('display','block');
				$("#recipientsEmails").css('border','1px solid red');
				$(".nameExistError3 div.ErrorWithoutIcon").html("The To e-mail address field is invalid. Type the e-mail address of the person to whom you are sending your list and try again");
		  
				} else{
				$(".nameExistError3").css('display','block');
				$("#userEmail").css('border','1px solid red');
				$(".nameExistError3 div.ErrorWithoutIcon").html("The To e-mail address field is invalid. Type the e-mail address of the person to whom you are sending your list and try again");
			}
		  }
		 
		  else
		  {
			loadPopup('popupEmailConfirmation'); 
		  }
}
}
);
function validateEmail(emailValue) {
   var regex=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (regex.test($.trim(emailValue))) ? true : false;
}

function validateMultipleEmailsCommaSeparated(emailValues) {
    var result = emailValues.split(",");
    for(var i = 0;i < result.length;i++){
    if(!validateEmail(result[i])) 
            return false;
	}
    return true;
}


});
