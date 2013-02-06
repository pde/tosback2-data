(function($)
{
    $.PrgTrackEvents = function(options)
    {
        var defaults = {
            ajaxUtilsUrl: "http://www.progressive.com/controls/pages/ajaxutils.aspx/LogEventActivity"
} // defaults
            var options = $.extend(defaults, options);
            $("[class^='Prg_TrackAs-'],[class*=' Prg_TrackAs-']").click(function()
            {
                var objId; var eventData; var eventDesc; var tranTypeId;var prodCode;
                try
                {
                    var trackID = $(this).attr('class');
					$.trim(trackID);
                    var allClasses = trackID.split(' ');
                    for (var i = 0; i < allClasses.length; i++)
                    {
                        var index = allClasses[i].indexOf("Prg_TrackAs");
                        if (index != -1)
                        {
                            eventData = allClasses[i].split('-');
                            eventDesc = eventData[1];
                            prodCode = eventData[2];
                            tranTypeId = eventData[3];
                        } //end  index if
                    } //end for
                } // end try
                catch (e)
                                { }

               
                    $.ajax({
                        type: "POST",
                        url: options.ajaxUtilsUrl, 
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: "{page:'" + location.href + "',eventType:'" + eventDesc + "',prodCode:'" + prodCode + "',tranType:'" + tranTypeId + "'}",
                        async: false
                    }); // ajax end
                
            }); // ends .click
        } // function wrapper
    })(jQuery);