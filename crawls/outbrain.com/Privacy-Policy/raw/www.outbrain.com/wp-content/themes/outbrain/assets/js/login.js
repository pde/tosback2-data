// LOGIN


$("#login").click(function(e) {
e.preventDefault();
e.stopPropagation();
$('#login-form').attr('action',myURL+'/login');
$('#login-form').css("width","400");
$('.login-form').css("width","400");
$("#login-cms").fadeIn("fast");
$('#loginUsername').focus();
if ($.browser.msie && $.browser.version < 9) {
          $("#open-id-url").css('display','none');
          $("#normal-login").css('display','none');
          $("#loggedIn-cms").css('display','none');
          $('.user-pwd:hidden').show();
          $('.forgot-pass:hidden').show();
          $('#signin-openid').show();
          $('#signin-openid a').show();     

        }else{
          $("#loggedIn-cms").hide();
          $("#normal-login").hide();
          $("#open-id-url").hide();

          $('.user-pwd:hidden').show();
          $('#signin-openid a:hidden').show();
          $('.forgot-pass:hidden').show();
        }
});

$('html').click(function() {

    if ($.browser.msie && $.browser.version < 9) {
      $('#login-cms').hide();

    }else{
      $('#login-cms').fadeOut();
    }

});



function submitLogin() {
        $("#login-form").submit();
}

$('.login-form').click(function(e){
e.stopPropagation();
});

$("#login-form").listenForChange(); //autoComplete hack for using inField labels plugin

$('#signin-openid a').click(function() {
               $('#signin-openid a').hide();
		$('.user-pwd').hide();
    		$('.forgot-pass').hide();
                $('#normal-login').show();
		$('#login-form').css("width","300");
		$('#login-cms').css("width","300");
                $('#open-id-url').fadeIn( function() {
                      $('#signin-openurl').focus();
                    });
                 $('#login-form').attr('action',myURL+'/openid-login-call');
                return false;
              });

            $('#normal-login a').click(function() {
                $('#open-id-url').hide();
                $('#normal-login').hide();
                $('#signin-openid a').show();
		$('.forgot-pass').show();
		$('#login-form').css("width","400");
		$('#login-cms').css("width","400");
                $('.user-pwd').fadeIn(function() {
                      $('#username').focus();
                    });
                $('#login-form').attr('action',myURL+'/login');
                return false;
              });


$('.login-form input[type="submit"]').click(submitLogin); 


$(".login-form label, .footer label").inFieldLabels({ fadeDuration: 100});   

        
     
            $("#password").keypress(
                function(e) {
                  if ((e.which && e.which == 13)
                      || (e.keyCode && e.keyCode == 13)) {
                    submitLogin();
                    return false;
                  }
                  return true;
                });



$.ajax({
  url: myURL+'/query-session',
  dataType: 'jsonp',
  data: {},
  timeout:5000,
  success: function(data) { 
    if (data.username) { 
      $("#loggedIn-cms").show();
      $("#login-cms").hide();
      $(".login").hide();
      $("#loggedIn-cms .name").html(data['username']);
   }
}
});


