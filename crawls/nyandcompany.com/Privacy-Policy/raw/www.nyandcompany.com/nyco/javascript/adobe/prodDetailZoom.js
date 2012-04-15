var serverURL = "http://s7d2.scene7.com/is/images/";
function setZoomImage(style){
        var viewerRoot = "http://s7d2.scene7.com/is/content/NewYorkCompany/customviewers/";
                                var serverURL = "http://s7d2.scene7.com/is/image/";
                                var imageName = "NewYorkCompany/"+style;

                                var flashvars = {};
                                if (swfobject.getQueryParamValue("image")) { flashvars.asset = swfobject.getQueryParamValue("image"); imageName = swfobject.getQueryParamValue("image"); }
                                if (swfobject.getQueryParamValue("serverURL")) { flashvars.serverURL = swfobject.getQueryParamValue("serverURL"); }

                                var params = {     //Setup param tag elements for the flash object to embed in the page
                                                allowScriptAccess:"Always",
                                                menu:"false",
                                                quality:"high",
                                                scale:"noscale",
                                                salign:"LT",
                                                bgcolor:"#FFFFFF",
                                                wmode:"transparent"
                                };

                                var attributes = {
                                        id: "NYCOViewer",
                                        name: "NYCOViewer"
                                };

                                //Build Viewer Path to Viewer swf
                                var viewerUrl = viewerRoot;
                                        viewerUrl += "NYCO_Viewer_20110831.swf?";
                                        viewerUrl += "&serverUrl=" + serverURL;
                                        viewerUrl += "&asset=" + imageName;

                        swfobject.embedSWF(viewerUrl, "myAlternativeContent", "275", "475", "9.0.0", false, flashvars, params, attributes);
}

function setImage(asset){
                                if (document.embeds && document.embeds["NYCOViewer"]) {
                                        document.embeds["NYCOViewer"].setImage(asset);
                                } else {
                                        document.getElementById("NYCOViewer").setImage(asset);
                                }
                        }

function onLargerImage(){
$.fancybox({
                        'width'                         : 723,
                        'height'                        : 813,
                        'showCloseButton'       :false,
                        'scrolling'                     : 'no',
                        'autoScale'                     : false,
                        'transitionIn'          : 'none',
                        'transitionOut'         : 'none',
                        'type'                          : 'iframe',
                        'href'                          : '/nyco/browse/ViewLargerImage.html?image='+imageName+'&serverUrl='+serverURL,
                        'swf'                   :       {
                                 'wmode'                                : 'transparent',
                                 'allowfullscreen'              : 'true',
                                 'allowScriptAccess'    : 'Always'
                        }
                });
        }