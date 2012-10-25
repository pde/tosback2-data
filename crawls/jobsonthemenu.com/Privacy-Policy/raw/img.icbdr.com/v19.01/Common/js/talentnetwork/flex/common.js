$(function () {

	function AppendCarat() {
        if (window.innerWidth <= 600) {
            $('#footer .container div').not('#social-logos').find('a').append('<div class = "footerCarat"><div class="ui-icon ui-icon-carat-1-e"/></div>');
            $('#footer .container').children('ul').children('li').children('a').append('<div class = "footerCarat"><div class="ui-icon ui-icon-carat-1-e"/></div>');
            $('.hlFooterJoin').append('<div class = "footerCarat"><div class="ui-icon ui-icon-carat-1-e"/></div>');
            $('.footerNav a').append('<div class = "footerCarat"><div class="ui-icon ui-icon-carat-1-e"/></div>');

        }
    }

    function ApplyCollapseBackground() {
        if (window.innerWidth <= 600) {
            var color = $('.MenuBarHorizontal li a').css('background-color');
            var fontColor = $('.MenuBarHorizontal li a').css('color');
            var sFontColor = fontColor.toString();
            sFontColor += '!important';

			$('.MenuBarItemSubmenu').css('background-color', color)
                .css('color', fontColor);
			if (!ScriptVariables.Get("nonBasicTemplate")) {
				$('.Header2 a .ui-icon').css('color', fontColor)
				$('.navigator h2').css('background-color', color)
                .prepend('<style type = "text/css"> .navigator h2{color:' + sFontColor + ';}</style>');
			}
        }
    }

    function MoveNavBar() {
        if (window.innerWidth <= 600) {
            $('.FooterNav').children('li').remove()
            var navigation = $('.MenuBarHorizontal').clone();
            navigation.addClass('footerNav');
            $('a[href*="/search/"]', navigation).closest('ul').parent().remove();
            navigation.appendTo('.FooterNav');
        }

    }

    function hasExternalJoinLink() {
        return $('#nav-bar ul').children('.Last').length >= 1;
    }

    function AddScrollLinks() {
        if (window.innerWidth <= 600) {
            $('#header-container').prepend('<div id="headerScroll" class="scroll"><a href = "#footer">' + ScriptVariables.Get('SkipToNav') + '</a></div>');
            $('#footer').append('<div class="scroll"><a href = "#headerScroll">' + ScriptVariables.Get('BackToTop') + '</a></div>');
        }
    }

    $(document.body).bind('updateLoginStatus', function (loggedInStatus) {
        if (loggedInStatus && window.TN.Profile.IsLoggedIn) {
            $(".profile-login-link").text("Edit Profile");
            $(".profile-login-link").attr("href", $(".profile-login-link").attr("href").replace("login", "view"));
        }
    });

    ApplyCollapseBackground();
    MoveNavBar();
    AppendCarat();
    AddScrollLinks();
	if (ScriptVariables.Get("extraPages")) {
		applyClientStyle();
	}
	UpdateViewportValue();
});

function applyClientStyle() {
	
    if (ScriptVariables.Get("nonBasicTemplate")) {
		if (ScriptVariables.Get("ButtonColor")) {
			var buttonColor = "#"+ScriptVariables.Get("ButtonColor");
			
			var filterBackgroundCSS = "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + buttonColor + "', endColorstr='" + buttonColor + "')";
			var backgroundWebkitCSS = "-webkit-gradient(linear, 0 0, 0 100%, from(" + buttonColor + "), to(" + buttonColor + "))";
			var backgroundMozCSS = "-moz-linear-gradient(" + buttonColor + ", " + buttonColor + ")";
			
			$(".mobile-button").css("background", buttonColor);
			(UseWhiteIconsAndTextFromColor(GetRGBFromHex(buttonColor)) === true) ? $(".mobile-button").css("color", "white") : $(".mobile-button").css("color", "black");
			
			$(".mobile-button").css("filter", filterBackgroundCSS);
			$(".mobile-button").css("background", backgroundWebkitCSS);
			$(".mobile-button").css("background", backgroundMozCSS);
		}
	    
		if (ScriptVariables.Get("NavColor")) {
			var navColor = "#"+ScriptVariables.Get("NavColor");
			
			var filterNavCSS = "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + navColor + "', endColorstr='" + navColor + "')";
			var navWebkitCSS = "-webkit-gradient(linear, 0 0, 0 100%, from(" + navColor + "), to(" + navColor + "))";
			var navMozCSS = "-moz-linear-gradient(" + navColor + ", " + navColor + ")";
			
			$(".mobile-nav").css("filter", filterNavCSS);
			$(".mobile-nav").css("background", navWebkitCSS);
			$(".mobile-nav").css("background", navMozCSS);
		
			$(".mobile-nav").css("background", navColor);	
			
			if(UseWhiteIconsAndTextFromColor(GetRGBFromHex(navColor)) === true) {
				$(".mobile-nav").css("color", "white");
				$(".mobile-nav").children().css("color", "white");
				$(".mobile-nav").children().addClass('use-white-icon');
			}
			else{
				$(".mobile-nav").css("color", "black"); 
				$(".mobile-nav").children().css("color", "black");
				$(".mobile-nav").children().removeClass('use-white-icon');		
			}	
		}
		
		if (ScriptVariables.Get("logoURL")) {
			var logoURL = "url(\"" + ScriptVariables.Get("logoURL") + "\")";
			
			$("#header").css({ "background-image": logoURL });
			$("#header").css({ "background-size": "contain" });
		}
		
		UpdateViewportValue();		
    }
	if(window.innerHeight > window.innerWidth) {
			$('.form-frame').css('width', $('#container').width());
	}
}
	
function UseWhiteIcons(elem) {
    var regex = new RegExp('([\\d]+)', 'g');
    var bgColor = elem.css('color');
    var rgb = [];
    var match;

    while (match = regex.exec(bgColor)) {
        rgb.push(match[1]);
    }

    var rColor = rgb[0];
    var gColor = rgb[1];
    var bColor = rgb[2];
    var alpha = (rgb.length === 4) ? rgb[3] : 1;

    if (alpha < .7)
        return false;

    var Luma = (0.2126 * rColor) + (0.7152 * gColor) + (0.0722 * bColor);
	if (!ScriptVariables.Get("nonBasicTemplate")) {
		return (Luma > 200);
	}
	else{
		return (Luma < 105);
	}
}

function UseWhiteIconsAndTextFromColor(color) {
    var regex = new RegExp('([\\d]+)', 'g');
    var bgColor = color;
    var rgb = [];
    var match;

    while (match = regex.exec(bgColor)) {
        rgb.push(match[1]);
    }

    var rColor = rgb[0];
    var gColor = rgb[1];
    var bColor = rgb[2];
    var alpha = (rgb.length === 4) ? rgb[3] : 1;

    if (alpha < .7)
        return false;

    var Luma = (0.2126 * rColor) + (0.7152 * gColor) + (0.0722 * bColor);

    if (!ScriptVariables.Get("nonBasicTemplate")) {
		return (Luma > 200);
	}
	else{
		return (Luma < 105);
	}
}

function GetRGBFromHex(hex) {
	var rgb = GetRGBFromHexWorker(hex);
	return rgbString = (rgb == null) ? null : "rgb(" + rgb.rgb + ")"; 
}

function GetRGBFromHexWorker(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
			rgb: parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16)
		} : null;
}
