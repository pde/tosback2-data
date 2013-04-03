var _ndnBkmHost = 'pp-serve.newsinc.com';
var _ndnBuyerId = 'christiansciencemonitor_90962';


var NDNRender = (typeof(NDNRender) == 'undefined') ? {} : NDNRender;

NDNRender.vh = "javascript:void(null);";

NDNRender.url = document.URL ;

NDNRender.beacon = function(opts) {
    // Make sure we have a base object for opts
    opts = opts || {};

    // Setup defaults for options
    opts.url = opts.url ||  ('https:' == document.location.protocol ? 'https://' : 'http://') + _ndnBkmHost + "/images/ad.gif";
    opts.vars = opts.vars || {};
    opts.error = opts.error || function(){};
    opts.success = opts.success || function(){};
 
    // Split up vars object into an array
    var varsArray = [];
    for (var key in opts.vars){ varsArray.push(key+'='+opts.vars[key]); }

    // Build query string
    var qString = varsArray.join('&');
 
    // Create a beacon if a url is provided
    if ( opts.url )
    {
        // Create a brand NEW image object
        var beacon = new Image();

        // Attach the event handlers to the image object
        if ( beacon.onerror ) { 
            beacon.onerror = opts.error; 
        }
        if ( beacon.onload ) { 
            beacon.onload  = opts.success; 
        }
        // Attach the src for the script call
        beacon.src = opts.url + '?' + qString;
    }
}

NDNRender.setAttribute = function(e, k, v) {
  if (k == "class") {
    e.setAttribute("className", v);   // set both "class" and "className"
  }
  return e.setAttribute(k, v);
};

NDNRender.createElement = function(e, attrs) {
    var el = document.createElement(e);
    for (var k in attrs) {
        if (k == "text") {
            el.appendChild(document.createTextNode(attrs[k]));
        } else {
            NDNRender.setAttribute(el, k, attrs[k]);
        }
    }
    return el;
};

NDNRender.remove = function(e)  {
    e.parentNode.removeChild(e);
};

NDNRender.loadScript = function(_src) { 
    var e = document.createElement('script'); 
    e.src = _src;
    e.type = "text/javascript";
    e.async = true;
    document.body.appendChild(e); 
};

NDNRender.listen = function(elem, evnt, func) {
    if (elem.addEventListener) // W3C DOM
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) { // IE DOM
        var r = elem.attachEvent("on"+evnt, func);
        return r;
    }
};

NDNRender.urlVars = function() {

  var uparts = NDNRender.url.split('?');
  var splits = uparts[0].split('/');
  
  var joins = new Array();
  for (i=3; i < splits.length ; i++) {
     var subsplits = splits.slice(0,i);
     joins[i-3] = subsplits.join('/') + "/";
  }
  
  joins[joins.length] = uparts[0];
  
  var newarr = splits.slice(0, (splits.length - 2));
  newarr[newarr.length] = '*';
  newarr[newarr.length] = splits[splits.length - 1];
  
  joins[joins.length] = newarr.join('/');

  if (uparts.length > 1) {
    joins[joins.length] = uparts.join('?');
  } 
  
  return "'" + joins.join("','") + "'";
};

NDNRenderUnits = function(unitsdata) {

    for ( var i = 0; unitsdata.length > i; ++i ) {
       var pardiv = document.getElementById(unitsdata[i].target);
       if (pardiv) {
           var el = NDNRender.createElement("iframe", {"src": unitsdata[i].url, "height": unitsdata[i].height , "width": unitsdata[i].width, "scrolling": "no", "frameborder": "no", "noresize": "noresize", "marginwidth": "0px", "marginheight": "0px" });
           pardiv.appendChild(el);
           pardiv.style.cssText = 'display: block; margin: 0px;';
           NDNRender.beacon( {
              "vars": {
                   "bid": _ndnBuyerId,
                   "event": "player_iframe",
                   "vid": unitsdata[i].ndn_vid_id,
                   "target": unitsdata[i].target,
                   "rapp": unitsdata[i].render_app,
                   "iurl": encodeURIComponent(unitsdata[i].url),
                   "turl": encodeURIComponent(unitsdata[i].target_url),
                   "cb": (Math.random() * 100000000000000)

               }
           });
       }
    }
};

var NDNDynVideoWidgets = function() {

   var theScript = ('https:' == document.location.protocol ? 'https://' : 'http://') + _ndnBkmHost + "/repub/"+ _ndnBuyerId + "/unitsdata.js?loc=" + encodeURIComponent(NDNRender.url) + "&matchers="  + encodeURIComponent(NDNRender.urlVars());
   NDNRender.loadScript(theScript);

};
      