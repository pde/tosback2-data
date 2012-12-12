/**
 * DESCRIPTION
 * 
 * @function
 * @example $('div').equalizeChildHeights();
 * @param {Object} [custom] An object of configuration options.
 * @returns {jQueryCollection} A collection of the matched elements for chaining.
 */
jQuery.fn.equalizeChildHeights = (function (global, $) {
	
    var defaults = {
    		only_visible_children: false,
    		childElement: false
    	};
    
    return function (custom) {
        var options = $.extend({}, defaults, custom);
        
        var result = $(this);
 
        return result.each(function () {
        	
        	if (options.childElement && options.only_visible_children) {
        		var childs = $(this).children(":visible").find(options.childElement);
        	} else {
                var childs = $(this).children();
            }
        	
        	var tallest = 0;
            childs.each(function () {
                var height = $(this).outerHeight();
                if (height > tallest) tallest = height;
            });
            
            childs.each(function () {
                var elem = $(this);
                var thisimg = $(this).children().find('img');
                
            	var remainder = elem.outerHeight() - elem.height();
                var new_height = tallest - remainder;
                elem.css("height", new_height + "px");

            });
        });
    };

}(window, jQuery));

function pullProd1(style, modifier, img) {
	$(img).attr('onError',''); //don't let us get stuck in a loop
	if(typeof modifier == 'undefined' || modifier == null || modifier == '') { modifier = ''; } 
	$(img).attr('src','http://s7d9.scene7.com/is/image/Barneys/' + style + '?' + modifier);
}	
