/*********************************************
 * submit email address update message
*********************************************/	
addNamespace = function(name){
  var ns = name.split('.');
  var c = window;
  for (var i in ns) {
    if (!c[ns[i]]) { c[ns[i]] = {}; }
    c = c[ns[i]];
  }
};
// build namespaces
addNamespace('CARS.users');
addNamespace('CARS.users.signup');
CARS.users.signup = function(){
	var theAddress = $("#sign-up-user-email").val();
		//quick email check
	if( /(.+)@(.+){2,}\.(.+){2,}/.test(theAddress) ){
		// valid email address
				$("#sign-in-content").html("<h4>Thanks for your interest!</h4><div class='sign-up-message'><p>We will send a message to <strong>" + theAddress + "</strong> when sign-in is live.</p></div>");
				setTimeout(function() {  $("#sign-in-wrap").slideUp() }, 3200);
		$.post("/go/includes/_signInPost.jsp", { email:theAddress },
			function(data) {			
					var si_expir = new Date();
					si_expir.setTime(si_expir.getTime()+(1000 * 60 * 60 * 24 * 30));
					document.cookie = 'userInfo=' + theAddress + ';expires='+si_expir.toGMTString()+'; path=/';
			}, 
			"json"
		);
	}else{
		// invalid email address
		$("#sign-up-error").html("");
		$("#sign-up-error").html("<br/><p>Please enter a valid email address.</p>");
	};
};
/*********************************************
 * interaction based events
*********************************************/	
if((window.jQuery || window.$)){

$(document).ready(function(){
	//check for default and gray the text
	if($('#sign-up-user-email').val() == ''){  $("#sign-up-user-email").val('Email address').addClass('revLab');  }
	$("#sign-up-user-email").focus(function(){  if($(this).val() == 'Email address'){  $(this).val('').removeClass('revLab');  }  });
	$("#sign-up-user-email").blur(function(){  if($(this).val() == ''){  $(this).val('Email address').addClass('revLab');  }  });
	$("#sign-up-user-email").click(function(){  $(this).select();  });

	$("#sign-in-expand").click(function(si){   
	  si.preventDefault(); 
	  $("#sign-in-wrap").slideDown();  
		if($("#sign-up-user-email").length < 1){  setTimeout(function() {  $("#sign-in-wrap").slideUp(); }, 3200);  
		  try{trackLink($(this), "user-sign-up-exists")} catch(e){}  
		}else{
		  try{trackLink($(this), "user-sign-up-new")} catch(e){}  
		}
		});
	$("#sign-in-hide").click(function(){   $("#sign-in-wrap").slideUp('fast');   });
	$("#send-sign-up").click(function(){   CARS.users.signup();   });
	
	$("#sign-up-user-email").keypress(function(e){
            code= (e.keyCode ? e.keyCode : e.which);
            if (code == 13){
			//	post on pressing enter
				CARS.users.signup();
		   }
	});
});

}
