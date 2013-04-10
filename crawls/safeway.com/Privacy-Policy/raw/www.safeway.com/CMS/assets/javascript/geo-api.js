/**
 * Geolocation API -- Example usage:
 *
 *   var mycallback = function(data) { console.log(data); };
 *   GeoAPI.getStoreData(mycallback);
 */
var GeoAPI = (function() {

    // PRIVATE METHODS 

    function setCookie(name, value) {
        var argv = arguments,
            argc = arguments.length,
            expires = (argc > 2) ? argv[2] : null,
            path = (argc > 3) ? argv[3] : '/',
            domain = (argc > 4) ? argv[4] : null,
            secure = (argc > 5) ? argv[5] : false;

        document.cookie = name + "=" + escape(value) + ((expires === null) ? "" : ("; expires=" + expires.toGMTString())) + ((path === null) ? "" : ("; path=" + path)) + ((domain === null) ? "" : ("; domain=" + domain)) + ((secure === true) ? "; secure" : "");
    }

    function getCookie(name){
        var arg = name + "=",
            alen = arg.length,
            clen = document.cookie.length,
            i = 0,
            j = 0,
            endstr;
            
        while(i < clen) {
            j = i + alen;
            if (document.cookie.substring(i, j) == arg) {
                endstr = document.cookie.indexOf(";", j);
                if(-1===endstr) endstr = document.cookie.length;
                return unescape(document.cookie.substring(j, endstr));
            }
            i = document.cookie.indexOf(" ", i) + 1;
            if (i===0) break;
        }
        return null;
    }

    function requestWhere2GetIt() {
        if ($api.url) return;
        $api.url = getWhere2GetItUrl();

        request = YAHOO.util.Connect.asyncRequest('GET', $api.url, {
            success: function(o) {
                var text = o.responseText,
                    xmlDoc = getXmlDoc(o.responseText),
                    poi = xmlDoc.getElementsByTagName('poi'),
                    obj = poi && poi.length ? xmlToObj(poi.item(0)) : {};

                setCookie('GeoAPI_json', jsonEncode(obj));
                $api.storedata = obj;
                dequeueCallbacks();
            },
            failure: function(o) { console.log('GeoAPI request failed'); },
            xdr: true
        });
    }

    function getWhere2GetItUrl() {
        var parts = window.location.hostname.split('.'),
            domain = parts.slice(parts.length - 2).join('.'),
            DOMAIN_API_KEY = {
                'carrsqc.com':   '3499C810-EAD2-11E0-830B-7018E525BB5D',
                'dominicks.com': 'C28D5DE0-EAD1-11E0-A1EC-290A97B4DA77',
                'genuardis.com': '5C04F122-EAD2-11E0-B93F-1EC34D48D7F4',
                'pavilions.com': '47DEA148-EAD2-11E0-A1E8-8CD0A858831C',
                'randalls.com':  'FD8E4742-EAD1-11E0-B183-AD1AE525BB5D',
                'safeway.com':   'A73D27DC-EAD1-11E0-A74D-F7CEA858831C',
                'tomthumb.com':  '1298A7AE-EAD2-11E0-A151-EC14E525BB5D',
                'vons.com':      'EC6EA920-EAD1-11E0-8FA6-D6EFDDB2B31E'
            },
            apikey = DOMAIN_API_KEY[domain] || DOMAIN_API_KEY['safeway.com'],
            storeid = getCookie('mylocation'),
            xml;

        xml = storeid
            ? '<request><appkey>' + apikey + '</appkey><formdata id="getlist"><objectname>Locator::Store</objectname><where><clientkey><eq>' + storeid + '</eq></clientkey></where></formdata></request>'
            : '<request><appkey>'+ apikey + '</appkey><geoip>1</geoip><formdata id="locatorsearch"><geolocs><geoloc><addressline></addressline><country></country></geoloc></geolocs><limit>1</limit><proximitymethod>straightline</proximitymethod><searchradius>5|10|20</searchradius><radiusuom>mile</radiusuom><where><fuelparticipating><distinctfrom>1</distinctfrom></fuelparticipating></where></formdata></request>';

        return 'http://api.slippymap.com/rest?xml_request=' + encodeURI(xml);
    }

    function getXmlDoc(text) {
        var xmlDoc, xmlDocs;

        if (window.ActiveXObject)  {  
            var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async="false";
            xmlDoc.loadXML(text);
        } else {
            var xmlDoc = (new DOMParser()).parseFromString(text, "text/xml");
            var xmlDocS = (new XMLSerializer()).serializeToString(xmlDoc);
        }

        return xmlDoc;
    }

    function xmlToObj(parentNode) {
        var obj = {},
            TEXT_NODE = 3,
            ELEMENT = 1,
            i, _i, node, ch;

        for (i=0, _i=parentNode.childNodes.length; i < _i; i++) {
            var node = parentNode.childNodes[i];

            if (ELEMENT===node.nodeType) {
                ch = node.firstChild;
                if (ch && TEXT_NODE===ch.nodeType) {
                    obj[node.nodeName] = ch.nodeValue.replace(/^ *| *$/g, '');
                }
            }
        }

        return obj;
    }

    /**
     * Converts a simple object into a json string.
     */
    function jsonEncode(o) {
        var keyvals = [],
            keyval, key, val;

        for (key in o) {
            val = o[key];
            vtype = typeof val;
            keyval = '"' + key + '":';

            if ('string'===vtype) keyval += '"' + val.replace(/"/g,'\\"').replace(/\r*\n/g, '\\n') + '"';
            else if ('boolean'===vtype || 'number'===vtype) keyval += val;
            else continue;
        
            keyvals.push(keyval);
        }

        return '{' + keyvals.join(',') + '}';
    }
    
    function dequeueCallbacks() {
        var fn;
        while (fn = $api.callbacks.shift()) fn($api.storedata);
    }

    // DEFINE THE API

    var $api = {
          callbacks: [],
          storedata: null,
          cookie: getCookie('GeoAPI_json'),
          getStoreData: function(callbackFn) {
              // if the storedata is already available, immediately invoke the callback
              if ($api.storedata) {
                  callbackFn($api.storedata);
              } else {
                  $api.callbacks.push(callbackFn);
              }
          }            
      };

    // API INITIALIZATION

    if ($api.cookie && eval('$api.storedata = ' + $api.cookie)) {
        // data is cached
        $api.cached = true; // helpful for debug
    } else {
        YAHOO.util.Event.onDOMReady (function (ev) { 
            YAHOO.util.Connect.transport('/CMS/assets/javascript/connection.swf');
            YAHOO.util.Connect.xdrReadyEvent.subscribe(requestWhere2GetIt);
        });
    }

    // PUBLIC INTERFACE

    return $api;

})();
