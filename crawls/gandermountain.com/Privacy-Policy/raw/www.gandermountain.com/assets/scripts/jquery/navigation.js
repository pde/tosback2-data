jQuery(document).ready(function() {

    // *****************************************************
    //              Main Navigation
    // *****************************************************
    //On Hover Over
    function navHoverOver() {
        jQuery(this).find('.navsub').stop().fadeTo(200, 1).show(); //Find sub and fade it in
        (function(jQuery) {
            //Function to calculate total width of all ul's
            jQuery.fn.calcSubWidth = function() {
                rowWidth = 0;
                //Calculate row
                jQuery(this).find('ul').each(function() { //for each ul...
                    rowWidth += jQuery(this).width(); //Add each ul's width together
                });
            };
        })(jQuery);

        var pos = jQuery(this).parent().offset();
        var height = jQuery(this).parent().height();

        if (jQuery(this).find('.row').length > 0) { //If row exists...

            var biggestRow = 0;

            jQuery(this).find('.row').each(function() {	//for each row...
                jQuery(this).calcSubWidth(); //Call function to calculate width of all ul's
                //Find biggest row
                if (rowWidth > biggestRow) {
                    biggestRow = rowWidth;
                }
            });

            jQuery(this).find('.navsub').css({
                'width': biggestRow,
                'top': (pos.top + height) + "px",
                'left': "0px"
            }); //Set width       
            jQuery(this).find('.row:last').css({ 'margin': '0' });  //Kill last row's margin

        } else { //If row does not exist...

            jQuery(this).calcSubWidth();  //Call function to calculate width of all ul's
            jQuery(this).find('.navsub').css({
                'top': (pos.top + height) + "px",
                'left': "5px"
            });

        }
    }
    //On Hover Out
    function navHoverOut() {
        jQuery(this).find('.navsub').stop().fadeTo(400, 0, function() { //Fade to 0 opactiy
            jQuery(this).hide();  //after fading, hide it
        });
    }

    //Set custom configurations
    var config = {
        sensitivity: 100, // number = sensitivity threshold (must be 1 or higher)
        interval: 50, // number = milliseconds for onMouseOver polling interval
        over: navHoverOver, // function = onMouseOver callback (REQUIRED)
        timeout: 150, // number = milliseconds delay before onMouseOut
        out: navHoverOut // function = onMouseOut callback (REQUIRED)
    };

    jQuery('#topnav li .navsub').css({ 'opacity': '0' }); //Fade sub nav to 0 opacity on default
    jQuery('#topnav li').hoverIntent(config); //Trigger Hover intent with custom configurations


});

// *****************************************************
//          Main Navigation Hover
// *****************************************************
//
//  Add class 'j-hover' to menu container elements
// 
jQuery(document).ready(function() {
    jQuery('#topnav li').hover(function() {
        jQuery(this).addClass('j-hover');
    }, function() {
        jQuery(this).removeClass('j-hover');
    });
});
// JavaScript Document