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

    function requestLocatorService() {

        if (!window.jQuery && $api.jqueryAttempts < 10) {
            $api.jqueryAttempts++;
            setTimeout(requestLocatorService, 500);
            return;
        }


        jQuery.get("/emmd/service/locator/getcloseststores?geoip=", "",  function(data) {
            var oldFormat = {};
            if (data.stores.length>0)
            {
                oldFormat["name"] = data.stores[0].name;
                oldFormat["city"] = data.stores[0].city;
                oldFormat["state"] = data.stores[0].state;
                oldFormat["phone"] = data.stores[0].phone;
                oldFormat["address1"] = data.stores[0].address;
                oldFormat["latitude"] = data.stores[0].latitude;
                oldFormat["longitude"] = data.stores[0].longitude;
                oldFormat["brandid"] = data.stores[0].brandId;
                oldFormat["divname"] = data.stores[0].divName;
                oldFormat["divnumber"] = data.stores[0].divNumber;
                oldFormat["postalcode"] = data.stores[0].postCode;
                oldFormat["pharmacyfaxnumber"] = data.stores[0].metaData.pharmacyFaxNumber;
                oldFormat["pharmacyhours1"] = data.stores[0].metaData.pharmacyHours;
                oldFormat["pharmacyphonenumber"] = data.stores[0].metaData.pharmacyPhoneNumber;
                oldFormat["storehours1"] = data.stores[0].metaData.storeHours;

                // Data we have in new format but wasn't in old; adding in case.
                oldFormat["storeid"] = data.stores[0].storeId;
                oldFormat["externalstoreid"] = data.stores[0].externalStoreId;
                oldFormat["distance"] = data.stores[0].distance;

                var storeDetails = data.stores[0].metaData.storeDetails.split(/, /);

                for (var x=0;x<storeDetails.length;x++) {
                    if (storeDetails[x] === "Bakery") { oldFormat["bakery"] = "1"; }
                    if (storeDetails[x] === "Blockbuster Express") { oldFormat["blockbusterexpress"] = "1"; }
                    if (storeDetails[x] === "Chase Bank") { oldFormat["chasebank"] = "1"; }
                    if (storeDetails[x] === "Deli") { oldFormat["deli"] = "1"; }
                    if (storeDetails[x] === "Floral") { oldFormat["floral"] = "1"; }
                    if (storeDetails[x] === "Liquor") { oldFormat["liquor"] = "1"; }
                    if (storeDetails[x] === "Meat") { oldFormat["meat"] = "1"; }
                    if (storeDetails[x] === "Pharmacy") { oldFormat["pharmacy"] = "1"; }
                    if (storeDetails[x] === "Produce") { oldFormat["produce"] = "1"; }
                    if (storeDetails[x] === "Seafood") { oldFormat["seafood"] = "1"; }
                    if (storeDetails[x] === "Starbuck's") { oldFormat["starbucks"] = "1"; }
                    // Not sure of these keys; Need clarifications
                    if (storeDetails[x] === "Sushi Bar") { oldFormat["sushi_bar"] = "1"; }
                    if (storeDetails[x] === "DVD Play Kiosk") { oldFormat["dvdplay_kiosk"] = "1"; }
                    if (storeDetails[x] === "Digital") { oldFormat["digital"] = "1"; }
                    if (storeDetails[x] === "Flushot Ondemand") { oldFormat["flushot_ondemand"] = "1"; }
                }
            }
            $api.storedata = data;
            $api.oldstoredata = oldFormat;
            setCookie('GeoAPI_json', jsonEncode(oldFormat));
            dequeueCallbacks();
        }, "json");

    }
    // DEFINE THE API
    var $api = {
          jqueryAttempts: 0,
          callbacks: [],
          storedata: null,
          oldstoredata: null,
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

    if ($api.cookie && eval('$api.storedata = ' + $api.cookie)) {
        // data is cached
        $api.cached = true; // helpful for debug
    } else {
        requestLocatorService();
    }
    // PUBLIC INTERFACE
    return $api;
})();



