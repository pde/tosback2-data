

function gnIncludeCSS(cssFile) {
    document.write('<link rel="stylesheet" href="/styles/' + cssFile + '" type="text/css" media="screen" />');
}

gnIncludeCSS("globalnav.css");

$(function() {
    var markup = '<div class="site_globalNavWrapperBg"><div class="site_globalNavWrapper"><a href="#" id="closeX"></a>';
    markup += '<ol class="site_globalNav"><li><a  href="#">Americas</a></li><li><a class = "middle" href="#">Europe</a></li><li><a  href="#">Asia, Middle East & Africa</a></li></ol><div style="clear: both;"></div><div id="site_globalNav_countries"><ol><li><a target="_blank" href="http://www.pepsico.com.ar/"><img src="/images/globalIcons/site_global_navicon_argentina.png"> Argentina</a></li><li><a target="_blank" href="http://www.pepsico.com.br/"><img src="/images/globalIcons/site_global_navicon_brazil.png"> Brazil</a></li><li><a target="_blank" href="http://pepsico.ca"><img src="/images/globalIcons/site_global_navicon_canada.png"> Canada</a></li><li><a target="_blank" href="http://www.pepsico.cl/"><img src="/images/globalIcons/site_global_navicon_chile.png"> Chile</a></li><li><a target="_blank" href="http://pepsico.com.mx"><img src="/images/globalIcons/site_global_navicon_mexico.png"> Mexico</a></li><li><a target="_blank" href="http://www.pepsico.com.uy/"><img src="/images/globalIcons/site_global_navicon_uruguay.png"> Uruguay</a></li><li><a target="_blank" href="http://www.pepsico.com/"><img src="/images/globalIcons/site_global_navicon_usa.png"> United States</a></li></ol><ol><li><a target="_blank" href="http://www.pepsico.eu/"><img src="/images/globalIcons/site_global_navicon_eu.png"> Europe</a></li><li><a target="_blank" href="http://www.pepsico.be/"><img src="/images/globalIcons/site_global_navicon_belgium.png"> Belgium</a></li><li><a target="_blank" href="http://www.pepsico.fr/"><img src="/images/globalIcons/site_global_navicon_france.png"> France</a></li><li><a target="_blank" href="http://www.pepsico.de/"><img src="/images/globalIcons/site_global_navicon_germany.png"> Germany</a></li><li><a target="_blank" href="http://www.pepsico.com.gr/"><img src="/images/globalIcons/site_global_navicon_greece.png"> Greece</a></li><li><a target="_blank" href="http://www.pepsico.co.it/"><img src="/images/globalIcons/site_global_navicon_italy.png"> Italy</a></li><li><a target="_blank" href="http://www.pepsico.nl/"><img src="/images/globalIcons/site_global_navicon_holland.png"> The Netherlands</a></li><li><a target="_blank" href="http://www.pepsicopoland.com/"><img src="/images/globalIcons/site_global_navicon_poland.png"> Poland</a></li><li><a target="_blank" href="http://www.pepsico.pt/"><img src="/images/globalIcons/site_global_navicon_portugal.png"> Portugal</a></li><li><a target="_blank" href="http://www.pepsico.ro/"><img src="/images/globalIcons/site_global_navicon_romania.png"> Romania</a></li><li><a target="_blank" href="http://www.pepsico.ru/"><img src="/images/globalIcons/site_global_navicon_russia.png"> Russia</a></li><li><a target="_blank" href="http://www.pepsico.es/"><img src="/images/globalIcons/site_global_navicon_spain.png"> Spain</a></li><li><a target="_blank" href="http://www.PepsiCoTurkey.com/"><img src="/images/globalIcons/site_global_navicon_turkey.png"> Turkey</a></li><li><a target="_blank" href="http://www.pepsicoukraine.com/"><img src="/images/globalIcons/site_global_navicon_ukraine.png"> Ukraine</a></li><li><a target="_blank" href="http://www.pepsico.co.uk/"><img src="/images/globalIcons/site_global_navicon_uk.png"> United Kingdom</a></li></ol><ol><li><a target="_blank" href="http://www.pepsico.com.cn/"><img src="/images/globalIcons/site_global_navicon_china.png"> China</a></li><li><a target="_blank" href="http://www.pepsiindia.co.in/"><img src="/images/globalIcons/site_global_navicon_india.png"> India</a></li><li><a target="_blank" href="http://www.pepsico.com.au/"><img src="/images/globalIcons/site_global_navicon_australia.png"> Australia</a></li></ol></div>';
    markup += '<div style="clear: both;"><h6><a target="_blank" href="/Global-Sites/More.html">All Global Sites &raquo;</a></h6></div></div>';

    $("body").append(markup);
    $("#site_utilityNav_globalLink ol").remove();
    $("#site_utilityNav_globalLink a").hover(function() { return false; }, function() { return false; }).attr("href", "#");

    $("#site_utilityNav_globalLink a").click(function() {
        $(".site_globalNavWrapperBg").fadeIn();
        return false;
    });

    $("#closeX").click(function() {
       $(".site_globalNavWrapperBg").fadeOut(); 
       return false;
    });
    
    var gIctr = 0;
    $(".site_globalNav a").each(function() {
        $(this).attr("href", "#" + gIctr);
        gIctr++;
    });
    
    $(".site_globalNav a").click(function() {
        $(".site_globalNav a").removeClass("selected");
        $(this).addClass("selected");
        $("#site_globalNav_countries ol").hide();
        $("#site_globalNav_countries ol").eq($(this).attr("href").replace("#", "")).show();
        return false;
    });
    
    $(".site_globalNav a").mouseenter(function() {
        $(this).trigger("click");
    });
    
    $(".site_globalNav a:first").trigger("click");
});
