/*******************************************************************************
* $Id: weather.js 2870 2012-05-23 20:17:11Z rstorment $
*******************************************************************************/
function weather()
{
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

}
