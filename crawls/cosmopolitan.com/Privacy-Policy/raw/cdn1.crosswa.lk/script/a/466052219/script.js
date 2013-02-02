/*! 
 * onDomReady.js 1.2 (c) 2012 Tubal Martin - MIT license
 */
(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===e.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==
typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.increment people.append people.track_charge".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||
[]);
mixpanel.init("ff221ddb77d7ceb07ffcdafb6ea78a15");
!function (definition) {
    if (typeof define === "function" && define.amd) {
        // Register as an AMD module.
        define(definition);
    } else {
        // Browser globals
        window.onXwDomReady = definition();
    }
}(function() {
    
    'use strict';

    var win = window,
        doc = win.document,
        docElem = doc.documentElement,

        FALSE = false,
        COMPLETE = "complete",
        READYSTATE = "readyState",
        ATTACHEVENT = "attachEvent",
        ADDEVENTLISTENER = "addEventListener",
        DOMCONTENTLOADED = "DOMContentLoaded",
        ONREADYSTATECHANGE = "onreadystatechange",

        // W3C Event model
        w3c = ADDEVENTLISTENER in doc,
        top = FALSE,

        // isReady: Is the DOM ready to be used? Set to true once it occurs.
        isReady = FALSE,

        // Callbacks pending execution until DOM is ready
        callbacks = [];
    
    // Handle when the DOM is ready
    function ready( fn ) {
        if ( !isReady ) {
            
            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if ( !doc.body ) {
                return defer( ready );
            }
            
            // Remember that the DOM is ready
            isReady = true;

            // Execute all callbacks
            while ( fn = callbacks.shift() ) {
                defer( fn );
            }
        }    
    }

    // The document ready event handler
    function DOMContentLoadedHandler() {
        if ( w3c ) {
            doc.removeEventListener( DOMCONTENTLOADED, DOMContentLoadedHandler, FALSE );
            ready();
        } else if ( doc[READYSTATE] === COMPLETE ) {
            // we're here because readyState === "complete" in oldIE
            // which is good enough for us to call the dom ready!
            doc.detachEvent( ONREADYSTATECHANGE, DOMContentLoadedHandler );
            ready();
        }
    }
    
    // Defers a function, scheduling it to run after the current call stack has cleared.
    function defer( fn, wait ) {
        // Allow 0 to be passed
        setTimeout( fn, +wait >= 0 ? wait : 1 );
    }
    
    // Attach the listeners:

    // Catch cases where onDomReady is called after the browser event has already occurred.
    // we once tried to use readyState "interactive" here, but it caused issues like the one
    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
    if ( doc[READYSTATE] === COMPLETE ) {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        defer( ready );

    // Standards-based browsers support DOMContentLoaded    
    } else if ( w3c ) {
        // Use the handy event callback
        doc[ADDEVENTLISTENER]( DOMCONTENTLOADED, DOMContentLoadedHandler, FALSE );

        // A fallback to window.onload, that will always work
        win[ADDEVENTLISTENER]( "load", ready, FALSE );

    // If IE event model is used
    } else {            
        // ensure firing before onload,
        // maybe late but safe also for iframes
        doc[ATTACHEVENT]( ONREADYSTATECHANGE, DOMContentLoadedHandler );

        // A fallback to window.onload, that will always work
        win[ATTACHEVENT]( "onload", ready );

        // If IE and not a frame
        // continually check to see if the document is ready
        try {
            top = win.frameElement == null && docElem;
        } catch(e) {}

        if ( top && top.doScroll ) {
            (function doScrollCheck() {
                if ( !isReady ) {
                    try {
                        // Use the trick by Diego Perini
                        // http://javascript.nwbox.com/IEContentLoaded/
                        top.doScroll("left");
                    } catch(e) {
                        return defer( doScrollCheck, 50 );
                    }

                    // and execute any waiting functions
                    ready();
                }
            })();
        } 
    } 
    
    function onXwDomReady( fn ) { 
        // If DOM is ready, execute the function (async), otherwise wait
        isReady ? defer( fn ) : callbacks.push( fn );
    }
    
    // Add version
    onXwDomReady.version = "1.2";
    
    return onXwDomReady;
});

var xwalkAppId = "466052219";
var xwShowOnReady = false;
var xwReady = false;

window.addEventListener("message", function( event ) {
    var eventData = JSON.parse(event.data);
    if (eventData && eventData.statusCategory === "xwalk.window" ) {
        if (eventData.statusMessage === "ready") {

            // iframe has been loaded
            xwReady = true;
            if (xwShowOnReady) {
                revealCrosswalkDialog();
            }

        }
    	if (eventData.statusMessage === "close") {
      		document.getElementById('divCrosswalk').style.display='none';
    	}
        if (eventData.statusMessage === "navigate") {
            window.location = eventData.location;
        }
    }
}, false );

function revealCrosswalkDialog() {

    if (document.getElementById('divCrosswalkLoading'))
        document.getElementById('divCrosswalkLoading').style.display='none';
    document.getElementById('divCrosswalk').style.display='block';
    window["ifrCrosswalk"].postMessage("xwalk.dialog.show", "*");
}

function showCrosswalkDialog() {
    var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
    if (iOS) {
        try { mixpanel.track("Button - Clicked and Redirected to App Store", {'AppID' : xwalkAppId}); } catch (ex) {}
        window.location = "itms://itunes.apple.com/us/app/facebook/id"+xwalkAppId+"?mt=8&uo=6";
    } else {
        try {mixpanel.track("Button - Clicked", {'AppID' : xwalkAppId}); } catch (ex) {}

        if (xwReady) {
            revealCrosswalkDialog();
        } else {
            xwShowOnReady = true;
            loadCrosswalkIframe();
        }
    }
}

function loadCrosswalkIframe() {
    onXwDomReady(function() {
        var container = document.createElement('div');
        var xwLoaderHtml = xwShowOnReady ? '<div id="divCrosswalkLoading" style="position:absolute; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.5);"><div style="position:absolute; left:50%; top:50%; background-color:#fff; width:32px; height:32px; margin:-25px -25px 0 0; padding:9px; border-radius:10px"><img src="https://api.crosswa.lk/assets/popup/ajax-loader-for-dialog.gif" width="32" height="32" /></div></div>' : ''; 
        container.innerHTML = xwFrameHtml + xwLoaderHtml;
        document.body.appendChild(container);
    });
}

function updateCrosswalkDialogWithNewApp(id, icon){
	window["ifrCrosswalk"].postMessage("xwalk.dialog.updateApp----"+id+"----"+icon, "*");
    xwalkAppId = id;
}

    var xwButtonHtml = '';
    var xwFrameHtml = '<div id="divCrosswalk" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%;"><iframe id="ifrCrosswalk" name="ifrCrosswalk" src="https://api.crosswa.lk/widget/button2?app_ids=466052219" style="border:none; position:fixed; z-index:99999; top:0%; left:0%; width:100%; height:100%;" scrolling="no"></iframe></div>';

    document.write(xwButtonHtml);
