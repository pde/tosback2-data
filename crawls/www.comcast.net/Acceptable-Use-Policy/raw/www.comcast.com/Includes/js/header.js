// Prevent compression problems
;



(function ($) {

	var subheader = $('#subheader-nav');
	
	// Subnav hover dropdown animation js
	subheader.find('li').mouseenter(function(){
        $(this).find('> div > ul').show();
		$(this).find('> div').slideDown('fast');
	}).mouseleave(function(){
		$(this).find('> div').hide();
	});

	$("#subheader-search-container input[type=\"text\"]").focus(function(){
		$(this).closest('form').toggleClass('focus');
	}).blur(function(){
		$(this).closest('form').toggleClass('focus');
	});

	// If IE, add last-child to subnav
	if($.browser.msie) {
		subheader.find('> li:last-child').addClass('last-child');
	}


    if($("#header-nav > li.selected span").size() > 0)
    {
        if($.trim($("#header-nav > li.selected span").html().toLowerCase()) == "my account"){
            $("#subheader-nav").removeClass();
            $("#subheader-nav").css("list-style-type","none");
            $("#subheader-nav").css("margin-bottom","0px");
            $("#subheader-nav").css("margin-top","0px");
        }
    }

    if($("#cartVisible").length > 0 && $("#anchorShoppingCart").length > 0)
    {
        if($("#cartVisible").html().length > 0)
        {
            if($("#cartVisible").html().toLowerCase() == "true")
            {
                $("#anchorShoppingCart").hide();
            }
            else
            {
                $("#anchorShoppingCart").show();
            }
        }
    }

    //Show Sign in or Sign out
    var customerid = getCookieVal('RC.CID');
    
    $("#header-signin").hide();
    $("#header-signout").hide();
    $("#header-user-info").hide();
    
    $("#user-greetings-info").hide();
    $("#user-location-info").hide();

    if(customerid != ''){
        $("#header-signout").show(); 
        
        //Show greetings for user
        $("#header-user-info").show();
        $("#user-greetings-info").show();
    }
    else {
         $("#header-signin").show();
         //Set location details in header
         $("#header-user-info").show();
         var locHeader =  $("#user-location-info");         
         var locCookie = getCookieVal("Serviceability");
            if (locCookie.length > 0) {
                if (GetCookie("Serviceability", "Zip") != false) {
                    if (window.location.pathname.indexOf("/es/") > 0) {
                        //This should only be valid for CM
                        //the locationInfoEs div does not exist in non-CM pages.                        
                        ///YET TO BE DONE
                    }
                    else {
                        if (locHeader != null) {
                            $("#user-location-info").show();
                            $("#hyperLinkChangeLocation").text(get5DigitZip());                            
                        }
                    }
                }
            }        
        }
     if($("#shop-search-textbox").val() != "")
     {
           $("#shop-search-textbox").val("");
     }
        

    $("#shop-search-textbox").keydown(function(event){
        if(event.keyCode == 13){
            $("#shop-search-submit").click();
        }
    });

    $("#myaccount-search-textbox").keydown(function(event){
        if(event.keyCode == 13){
            $("#myaccount-search-submit").click();
        }
    });

    $("#hyperLinkChangeLocation").click(function(event)
        {            
            var changeLocationURL = $(this).attr('href').replace("{{referrerURL}}", window.location.href);
            window.open(changeLocationURL, "_self", null, false);
            event.preventDefault();
        }    
    );

    $("#hyperlinkSignIn").click(function(event)
        {            
            var signinURL = $(this).attr('href').replace("{{referrerURL}}", window.location.href);
            window.open(signinURL, "_self", null, false);
            event.preventDefault();
        }    
    );

    $("#hyperlinkSignOut").click(function(event)
        {            
            var signoutURL = $(this).attr('href').replace("{{referrerURL}}", window.location.href);
            window.open(signoutURL, "_self", null, false);
            event.preventDefault();
        }    
    );

    $("#shop-search-submit").click(function(event)
    {
        if($("#shop-search-textbox").val() == "")
        {
           alert("Please Enter Search Text");
        }
        else
        {
           location.href = "http://sitesearch.comcast.com/?q=" + $("#shop-search-textbox").val() + "&cat=com";
        }
    });
                
    $("#myaccount-search-submit").click(function(event)
    {
        if($("#myaccount-search-textbox").val() == "")
        {
            alert("Please Enter Search Text");
        }
        else
        {
            location.href = "http://sitesearch.comcast.com/?q=" + $("#myaccount-search-textbox").val() + "&cat=ccentral";
        }
    });
    
})(jQuery);
