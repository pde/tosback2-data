jQuery.fn.clearDefault = function(options) {       
    
    settings = jQuery.extend({
        highlightClass: "highlight"
    }, options);
    
    return this.each(function() {
        jQuery(this).focus(function() {
            if( this.value == this.defaultValue )
                jQuery(this).attr("value", "");
        });        
    });
};

$(function(){

    //repaint certain things
    function redraw() {
        //make event and news boxes equal height
        //clear styles on news and events
        $('#news, #events, .promo_col_same_size').css('height', 'auto');
        var h = Math.max($('#news').height(), $('#events').height());
        $('#news').height(h);
        $('#events').height(h);
        
        //clear styles on promo columns
        var promo_max = 0;
        $('.promo_col_same_size').each(function(){
            var padding = parseInt($(this).css('padding-top')) + parseInt($(this).css('padding-bottom'));
            if ($(this).height()+padding > promo_max)
                promo_max = $(this).height()+padding;
        });
        $('.promo_col_same_size').each(function(){
           var padding = parseInt($(this).css('padding-top')) + parseInt($(this).css('padding-bottom'));
           $(this).height(promo_max - padding); 
        });
    }

    $("#promos li:last-child").addClass('last');

   //find a park dropdown action
    $("#park_query").change(function(){
        if (!!$(this).val()) window.location = $(this).val();
    });

    //text size adjustor
    $("#text_sizes li a, #text_sizes_sub li a").click(function(e){
        e.preventDefault();
        if ($(this).hasClass('active')) return;
        $(this).parents('ul').find("a").removeClass('active');
        $(this).addClass('active');
        $('body').attr('class', $(this).parent().attr('class'));
        redraw();
    });
    var size = "medium"; 
    $("#text_sizes li."+size+" a").click();
    $("#text_sizes_sub li."+size+" a").click();
    redraw();
});
