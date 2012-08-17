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
            $('.Header2 a .ui-icon').css('color', fontColor)
            $('.navigator h2').css('background-color', color)
                .prepend('<style type = "text/css"> .navigator h2{color:' + sFontColor + ';}</style>');
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


    ApplyCollapseBackground();
    MoveNavBar();
    AppendCarat();
    AddScrollLinks();

});

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

    return (Luma > 200);
}