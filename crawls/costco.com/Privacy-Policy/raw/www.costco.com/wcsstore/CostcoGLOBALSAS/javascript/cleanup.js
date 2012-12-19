// LanguageSelectForm.jsp
    setLangCookie = function() {
        $.cookie("selectedLanguage", $('#languageSelection').val(), { expires: 7, path: '/' });
    };

    getLangCookie = function() {
    	//Defect CIS100069188 : Regression_Logging in after a session time out in CA France display the language as English but content in French
        if ($.cookie("selectedLanguage") != null && $.cookie("selectedLanguage") == wcs.langId) {
           $('#languageSelection').val($.cookie("selectedLanguage"));
        } else { 
           $.cookie("selectedLanguage", $('#languageSelection').val(), {expires: 7, path: '/'});
        }
    };
    
    $(window).load(function() {
      getLangCookie();
    });
    
    
    $(window).load(function() {
        
        $(".jqselect dt a").bind('click focus', function() {
            $(".jqselect dd ul").toggle();
        });
                    
        $(".jqselect dd ul li a").click(function() {
            var text = $(this).html();
            $(".jqselect dt a span").html(text);
            $(".jqselect dd ul").hide();
        });
                    
        function getSelectedValue(id) {
            return $("#" + id).find("dt a span.value").html();
        }

        $(document).bind('click', function(e) {
            var $clicked = $(e.target);
            if (! $clicked.parents().hasClass("jqselect"))
                $(".jqselect dd ul").hide();
        });
    });
    
    var miniCart = new Object();
    miniCart.baseText = '';
    
// MiniShopCartDisplay.jsp
miniShopCartRefresh = function() {
	var c = $.cookie(cookies.CART_COUNT_COOKIE);
	if (miniCart.baseText == '')
	{
		miniCart.baseText = $('#mini-shopping-cart a').html();
	}
	$('#mini-shopping-cart a').empty().append(miniCart.baseText + '(' + ((c && c != '""') ? c : 0) + ')');
};

function signInOutContainerInit(){
	 // executes when HTML-Document is loaded and DOM is ready, prior to the (window).load()
	var c = $.cookie('hashedUserId');
	if(c && c != '""') {
		$('#signInOutContainer #logon').toggle();
	} else {
		$('#signInOutContainer #logoff').toggle();
	}
};
