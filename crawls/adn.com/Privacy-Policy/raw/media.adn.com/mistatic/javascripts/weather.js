/*******************************************************************************
* $Id: weather.js 1603 2011-03-24 20:29:00Z bjones $
*******************************************************************************/
function weather()
{
    // Current Conditions
    $.ajax({
        type: "GET",
        url: "/static/accuweather/current.xml",
        dataType: "xml",
        success: function(xml) {
            //var temp_units   = $(xml).find('units').find('temp').text();
            var temp = $(xml).find('currentconditions').find('temperature').text();
            var icon = $(xml).find('currentconditions').find('weathericon').text();
            var text = $(xml).find('currentconditions').find('weathertext').text();
    
            // Current Conditions
            $("#weather_icon").attr('src','/mistatic/images/weather/icons/'+icon+'.png');
            $("#weather_icon").attr('alt',text);

            $("#weather_curr_temp").html(temp + '&deg;');
        }
    });

    // Watches/Warnings
    $.ajax({
        type: "GET",
        url: "/static/accuweather/watchwarn.xml",
        dataType: "xml",
        success: function(xml) {
        
            var is_active = $(xml).find('watchwarnareas').attr('isactive');
            if (is_active == 1)
            {
                $("#weather_alert").show();
            }
        }
    });

    // Hi/Low
    $.ajax({
        type: "GET",
        url: "/static/accuweather/forecast.xml",
        dataType: "xml",
        success: function(xml) {
        
            var high_temp = $(xml).find('day:first')
                                  .find('daytime').find('hightemperature').text();
            var low_temp =  $(xml).find('day:first')
                                  .find('daytime').find('lowtemperature').text();

            hi_low = 'H: ' + high_temp+'&deg; L: '+low_temp+'&deg;';
            $("#weather_hi_low_temps").html(hi_low + ' <a href="/weather">Forecast</a>');
        }
    });
}
