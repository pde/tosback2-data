    (function($){  
    $.fn.centerTracking = function(options) {  
      var defaults = {  
        convergID:''
        };  
       var options = $.extend(defaults, options); 
       return this.each(function() { 
       
       
                $('.cTrack').live("click", function(){
                var attrType = $(this).attr('eTrack');
                    if (attrType){
                       var tr = $(this).attr('eTrack');
                       var url = $(this).attr('href');
                       Omniture_TrackExitLink(""+options.convergID+"_Click_"+tr+"_US_ENG_01", ""+url+"");
                    } else{
                        var tr = $(this).attr('iTrack');
                        Omniture_TrackInternalLink(""+options.convergID+"_Click_"+tr+"_US_ENG_01");
                    }
                });
                
                $('.povTrack').live("click", function(){
                    var tr = $(this).attr('iTrack');
                    Omniture_TrackInternalLink(""+tr+"_US_ENG_01");
                });
                
                $('.hTrack').mouseover(function() {
                    var tr = $(this).attr('iTrack');
                    Omniture_TrackInternalLink(""+options.convergID+"_Impression_"+tr+"_US_ENG_01");
                });
     
               /* function trackCallbackFunction(event, service)
                {
                        Omniture_TrackInternalLink(''+options.convergID+'_shareThis_Click_'+service+'_US_ENG_01');
                }          
                stLight.subscribe("click",trackCallbackFunction);
                */
       });  
    };  
    })(jQuery); 