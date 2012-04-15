jQuery("#rvi-div").appear( function() {
    var rviDiv = jQuery("#rvi-div");
    jQuery.ajax({
        url    : "/widget/clickstream/_rvi",
        type   : 'POST',
        beforeSend: window.addClickstreamHeadersToAjax,
        dataType: 'html',
        contentType: 'application/x-www-form-urlencoded',
        error  : function(){
            consoleLog('RVI load failed','rvi');
            rviDiv.html("");
        },
        success : function(data, textStatus){
            if ( textStatus != "success" ){
                return this.error();
            }
            rviDiv.html(data);
        }
    });
} );
