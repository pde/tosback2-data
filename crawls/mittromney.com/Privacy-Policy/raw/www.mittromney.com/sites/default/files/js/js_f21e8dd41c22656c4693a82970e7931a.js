var geolocate = (function(){
  var data = {};
  var callback = [];
  var cookieName = "geolocate";
  var init;

  return {
    init : function(){
      // Init can only happen once.
      if (init) return;
      init = 1;

      // Try cookie first.
      cookie = $.cookie(cookieName);
      if (cookie != null) {
        // Parse cookie.
        data = JSON.parse(cookie);
        data.cookie = true;

        // Execute registered callbacks.
        $.each(callback, function(index, func) {
          callback[index](data);
        });
      }

      // Make json request to geoPlugin service.
      else {
        var url = "http://www.geoplugin.net/json.gp?jsoncallback=?&native=1";
        $.ajax({
          url: url,
          dataType: 'json',
          success : function(json) {
            data.ip = json.geoplugin_request;

            if (json.geoplugin_countryCode == 'US') {
              data.state = json.geoplugin_region;
            }

            // Save cookie.
            $.cookie(cookieName, JSON.stringify(data), { path: '/' });

            // Execute registered callbacks.
            $.each(callback, function(index, func) {
              callback[index](data);
            });
          },
          error : function(json) {
            data.error = true;

            // Execute registered callbacks on errors too.
            $.each(callback, function(index, func) {
              callback[index](data);
            });
          }
        });
      }
    },

    register : function(func){
      callback.push(func);
    }
  };
})();
;
