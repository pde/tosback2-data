var siteRootPath = getRootPath();

function include(jsFile)
{
    jsFile = siteRootPath + "/scripts/" + jsFile;
    document.write('<script type="text/javascript" src="' + jsFile + '"></scr' + 'ipt>'); 
}

function include2(jsFile)
{
    document.write('<script type="text/javascript" src="' + jsFile + '"></scr' + 'ipt>'); 
}

function printCSS(cssFile) {
    cssFile = siteRootPath + "/styles/" + cssFile;
    document.write('<link rel="stylesheet" href="' + cssFile + '" type="text/css" media="screen" />');
}

function getRootPath() {
    var els = document.getElementsByTagName("script");
    for (i = 0; i < els.length; i++) {
        var el = els[i];
        var src = el.attributes["src"];
        if (src) {
            src = src.value.toLowerCase();
            if (src.indexOf("scripts.js?rootpath=") != -1) {
                return src.substring(src.indexOf("rootpath=") + 9); 
            }
        }
    }

    return "";
}

include('jquery.js');
include('jquery.wait.js');
include('jquery.outerhtml.js');
include('core.js');
include('swfobject.js');
include('forms.js');
include('jquery.slideshow.js');

include2('http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4de7de76756e3f75');
var addthis_disable_flash = true;
var addthis_config = {
    data_use_flash: false,
    data_ga_property: 'UA-21916759-1',
    data_track_clickback: true
};



include('sharing.js');

include('jquery.fancybox.js');
printCSS('fancybox.css');

include('date.js');
include('jquery.datepicker.js');
printCSS('datepicker.css');

include('jquery.tiptip.js');
printCSS('tiptip.css');

include('urchin.js');
include2('http://www.pepsico.com/scripts/globalnav.js');
include('localcore.js');
