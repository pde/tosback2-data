//SETTING UP OUR POPUP
//0 means disabled; 1 means enabled;
var popupStatus = 0;
var emailPasswordChanged; 
//Loading Create New list popup
function loadPopup(a){
	//disables popup only if it is enabled
	if(popupStatus==1){ 
		$(".backgroundPopup").fadeOut("slow");
		popupStatus = 0;
	}
	if(a == "popupAddToYour"){ 
	$("#addToListResponse").prepend('<div class="backgroundPopup z-index-9998" id="backgroundPopup1" style="opacity: 0.7; display: block;"></div>');
	$("#popupAddToYour").css('z-index', '9999');
	} 
	
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#"+a).height();
	var popupWidth = $("#"+a).width();
	
	if((a=='popupCreateNewList')&&($("#"+a).attr('class')=='cartPopup'))
	{
	//do nothing
	}
	else if(a=="addToListResponse_pip") 
	{
	$("#"+a).css({
		"position": "fixed",
		"top": ((windowHeight/4)-10),  
		"left": (windowWidth/2-popupWidth/2) 
	});
	if (fromPage == "productDetail"){ 
	$("#"+a).prepend('<div class="backgroundPopup z-index-9998" id="backgroundPopup1" style="opacity: 0.7; display: block;"></div>');
	}
	}
	else if(a=="popupAddToYour"){
	$("#"+a).css({
		"position": "fixed",
		"top": windowHeight/2-popupHeight/2,
		"left": windowWidth/2-popupWidth/2
	});
	}
	else if(a=="popupSignIn"){
	$("#"+a).css({
		"position": "fixed",
		"top": "80px",
		"left": "30%"
	});
	}
	else
	{
	$("#"+a).css({
		"position": "fixed",
		"top": ((windowHeight/4)-10),  
		"left": (windowWidth/2-popupWidth/2) 
	});
	}
	
	//only need force for IE6
	$("#backgroundPopup").css({
		"height": windowHeight
	});

	if((a=='popupAddList')||(a=='popupEmailList'))
	{
	if(popupStatus==0){
		$("#backgroundPopup").css({
			"opacity": "0.7"		});
		$("#backgroundPopup").fadeIn("slow");
		$("#popupAddList").fadeIn("slow");
		$("#popupEmailList").fadeIn("slow");
		popupStatus = 1;
	}
	
	if(a=='popupEmailList'){ 
		$("#popupEmailList").css({"position": "absolute", "top":"10%", "left":"33%"});
	}
	
	}
		
	//loads popup only if it is disabled
	if(popupStatus==0){
		$("#backgroundPopup1").css({
			"opacity": "0.7"		});
		$("#backgroundPopup1").fadeIn("slow");
		$("#"+a).fadeIn("slow");
		popupStatus = 1;
	}
	
$(window).resize(function() {
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#"+a).height();
	var popupWidth = $("#"+a).width();
	//centering
	if(a=="popupAddToYour"){
	$("#"+a).css({
		"position": "fixed",
		"top": windowHeight/2-popupHeight/2,
		"left": windowWidth/2-popupWidth/2
		});
	}
	//only need force for IE6
	
	$("#backgroundPopup").css({
		"height": windowHeight
	});
});
if(a == 'popupSignIn'){ 
	$("#email_id, .backgroundPopup #password").css('border','1px solid gray');
	$(".signInError").css('display','none');
	var checkLogin = $('.headerHorzMenuSecondary').html(); 
	if(checkLogin.indexOf('Sign Out') < 0 ){
		$('#email_id').val('');
	}
	if(emailPasswordChanged){
		$(".backgroundPopup #password").val('');
	} 
	} 

}


//CONTROLLING EVENTS IN jQuery
$(document).ready(function(){
	//LOADING POPUP for page PIP
	$("#addToList_button").click(function(){
		loadPopup('popupSignIn');
	});
$("#popupSignIn #userLogin input#email_id, #popupSignIn #userLogin input#password").live('keypress', function(e){
if (e.keyCode == 13)
    $("#popupSignIn #signIn").trigger('click');

});
	$("#signIn").click(function(){	
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
		  else
		  {
		$("#email_id").css('border','1px solid gray');
		$(".signInError").css('display','none');
		loadPopup('popupAddList');	  
		  }
		
	});
	
	$(".toAdd").click(function(){
		loadPopup('popupAddToYour');
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
		//$("#landing_add1").css('border','1px solid gray');
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
	
	

$("#send_email").click(function(){
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
    return (regex.test(emailValue.trim())) ? true : false;
}

function validateMultipleEmailsCommaSeparated(emailValues) {
    var result = emailValues.split(",");
    for(var i = 0;i < result.length;i++){
    if(!validateEmail(result[i])) 
            return false;
	}
    return true;
}


	//CLOSING POPUP
	//and no option in item landing page
	/* $(".popupAddListClose, .no_delete, #cancel_email").click(function(){ 
	if(popupStatus==1){ 
		$(".backgroundPopup").fadeOut("slow");
		popupStatus = 0;
	}	
	}); */ 
	
	//Press Escape event!
	$(document).keypress(function(e){
		if(e.keyCode==27 && popupStatus==1){
			disablePopup();

		}
	});

});
