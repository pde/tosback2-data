$(document).ready(function(){
    jQuery(".static-ratings-overlay").dialog({
        autoOpen: false,

        modal:true,

        dialogClass: ' no-border',

        display:'inline-block',

        width:'auto',

        height:'auto',

        dialogClass:'no-title-border'

    }).siblings('div.ui-dialog-titlebar').remove();

    jQuery(".static-ratings-overlay").parent().removeClass('ui-corner-all').removeClass("ui-widget").removeClass("ui-widget-content");

    jQuery(".interactive-modal-content").parent().removeClass('ui-corner-all');

    jQuery(".interactive-content-link").bind("click", function(event){

        event.preventDefault();

        jQuery(".interactive-modal-content").dialog('open');

    });

    jQuery(".close-btn-wrap").bind("click", function(event){

        event.preventDefault();

        jQuery(".interactive-modal-content").dialog('close');

        jQuery(".static-ratings-overlay").dialog('close');

    });

    jQuery(".static-ratings-overlay").hide();
    var last_link = jQuery('.ratings-overlay:last');
    if(last_link.html() != null){
        last_link.html(last_link.html().replace('|',''));
    }

    jQuery(".staticRatingsLink").css('display','inline');

});