/**
 * TapIt! adRequest method
 */

function adrequest( params ) {
  
  var el = document.createElement( "script" );
  
  if( typeof el == 'object' ) {
    el.type = "text/javascript";
    if( params.zone )
    {
      src_data = "http://r.tapit.com/adrequest.php?zone=" + params.zone;
	        
	  if( typeof params.cookieUDID != "undefined" ) {
        src_data += "&udid=" + escape(params.cookieUDID);
      }
      if( typeof params.source != "undefined" ) {
        src_data += "&source=" + escape(params.source);
      }
      if( params.mode == 'test' ) {
        src_data = src_data + "&mode=test";
      }
      if( typeof params.width != "undefined" ) {
        src_data += "&w=" + escape(params.width);
      }
      if( typeof params.height != "undefined" ) {
        src_data += "&h=" + escape(params.height);
      }
      if( typeof params.adtype != "undefined" ) {
        src_data += "&adtype=" + escape(params.adtype);
      }
      if( typeof params.keywords != "undefined" ) {
        src_data += "&=" + escape(params.keywords);
      }
    }
    
	if( typeof( adZones[0] != "undefined" ) ) {
      adZones[0].parentNode.appendChild(el);
    } else {
      document.getElementsByTagName("head")[0].appendChild(el);
    }
    var checkLocation = true;
    if( typeof params.location != "undefined" && params.location == false ) {
      checkLocation = false;
    }

    if( checkLocation && navigator.geolocation )
    {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          src_data = src_data + "&lat=" + position.coords.latitude;
          src_data = src_data + "&long=" + position.coords.longitude;
          el.src = src_data;
        },
        function(error) { el.src = src_data; }
      );
    }
    else {
      el.src = src_data;
    }
  }
}

// show result
function addisplay(html) {
    try {
	document.getElementById('tapitBanner').style.display="block";
    } catch(e) {};
	html = html.replace(/&amp;/g,"&");
    html = html.replace(/&lt;/g,"<");
    html = html.replace(/&gt;/g,">");
    html = html.replace(/&quot;/g,"\"");
    html = html.replace(/&#039;/g,"'");
	
    var reg_all = /<script.*?>.*?<\/script.*?>/gi;

    // get all scripts
    var results_all = html.match(reg_all);
	
    // insert HTML content of Ad
    if(html.search(/[\w]/) != -1) {
		var D = document.createElement("div");
        html = html.replace(/&#rn;/g,"\r\n");
        html = html.replace(/&#n;/g,"\n");
        D.innerHTML = html;

        if(adZones[tapit_ad.count] != undefined) {
            adZones[tapit_ad.count].parentNode.insertBefore(D,adZones[tapit_ad.count]);
        }
    } else {
		
	}

    // if there are any script tags in Ads
    if( results_all ) {

        // backup document.write function
        var dw_saved = document.write;
        var dw_output = "";

        // overload document.write()
        document.write = function( pString ){
            dw_output +=  pString;
        }

        var reg = /<script(?:(?:[^>]+?language=(?:"|')javascript(?:'|"))|(?:[^>]+?type=(?:"|')text\/javascript(?:'|")))*?[^>]*?>(.*?)<\/script[^>]*?>/i;

        for (var i = 0; i < results_all.length; i++) {
           if (results_all[i].match(reg)) {
                var r = results_all[i].replace(reg,'$1');
                r = r.replace(/&#rn;/g,"\r\n");
                r = r.replace(/&#n;/g,"\n");

                // Replacing unnecessary symbols.
                r = r.replace(/<\!\-\-|\-\->/g,"");
                r = r.replace(/<\!\[CDATA\[\/\/>|<\!\]\]>/g,"");
                r = r.replace(/<\!\[CDATA\[|\]\]>/g,"");
                // we need to eval all scripts in global window scope
                try {
                    with (window) {
                        window.eval(r);
                    }
                }
                catch(err) {}
            }
        }

        // restore document.write function
        document.write = dw_saved;

        // insert the whole content created by document.write()
        var D = document.createElement("div");
		D.innerHTML = dw_output;
		
        if(adZones[tapit_ad.count] != undefined) {
            adZones[tapit_ad.count].parentNode.insertBefore(D,adZones[tapit_ad.count]);
        }
    }

    tapit_ad.count++;
}

// collect zones in html where we append ads
var adZones = [];
var src_data = '';
var latitude = 0;
var longitude = 0;

// Find script locations
// 
var documentScripts = document.getElementsByTagName("script");
for( var i = 0; i < documentScripts.length; i++ ) {
  if (documentScripts[i].src.match(/tapit.js/)) {
    adZones.push(documentScripts[i]);
  }
}
if( typeof tapit_ad == 'undefined' ) {
  var tapit_ad = {"count": 0};
}
