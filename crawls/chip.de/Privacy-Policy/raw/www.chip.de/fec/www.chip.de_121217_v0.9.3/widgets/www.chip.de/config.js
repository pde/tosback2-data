(function(){
    var VERSION = (("undefined" !== typeof feDev) && feDev.VERSION) ? feDev.VERSION : "",
        JS = (("undefined" !== typeof feDev) && feDev.fedUrl) ? 'http://'+feDev.fedUrl+'.cxo.name'+feDev.jsOff : 'http://www.chip.de/fec/'+VERSION+'/js/',
        CSS = (("undefined" !== typeof feDev) && feDev.fedUrl) ? 'http://'+feDev.fedUrl+'.cxo.name'+feDev.cssOff : 'http://www.chip.de/fec/'+VERSION+'/css/',
        FLASH = (("undefined" !== typeof feDev) && feDev.fedUrl) ? 'http://'+feDev.fedUrl+'.cxo.name'+feDev.flashOff : 'http://www.chip.de/fec/'+VERSION+'/flash/',
        WIDGETS = (("undefined" !== typeof feDev) && feDev.fedUrl) ? 'http://'+feDev.fedUrl+'.cxo.name'+feDev.wOff : 'http://www.chip.de/fec/'+VERSION+'/widgets/';

    window.moduleConfig = {
    baseUrl : JS,
    paths : {        
        css: CSS,
        flash: FLASH,
        widgets: WIDGETS,
            
        text : 'vendor/requirejs/2.0.1/text',

		"tracking/trackingConfig" : WIDGETS+"/www.chip.de/tracking/tracking.jsonp?callback=define" ,
		"tracking/trackingConfig_mobile" : WIDGETS+"/www.chip.de/tracking/trackingMobile.jsonp?callback=define",

		"require-plugins": "vendor/require-plugins",
        depend : 'vendor/require-plugins/1.0/depend',
        json : 'vendor/require-plugins/1.0/json',        
        requireCSS : 'vendor/RequireCSS/css',
        queue: 'vendor/chip-require-plugins/1.0/queue',
        "flowplayer/css" : CSS+"/flowplayer",
        
        "flowplayer/chip.flowplayer" : "modules/flowplayer/chip.flowplayer",
        "chip.video-stars" : "modules/videorating/chip.video-stars",
        "chip.video-thumbs" : "modules/videorating/chip.video-thumbs",
        "videorating/chip.video" : "modules/videorating/chip.video",
        "mvt" : "modules/videorating/mvt",
               
        "vendor/jQuery":"vendor/jquery/1.8.0",
        "vendor/jquery-plugins/jquery.rating":"vendor/jquery-plugins/jquery.rating.3.14.def",
        "vendor/jquery-plugins/jquery.available":"vendor/jquery-plugins/jquery.available.1.6.1.b02.def"
       }
    };
})();
