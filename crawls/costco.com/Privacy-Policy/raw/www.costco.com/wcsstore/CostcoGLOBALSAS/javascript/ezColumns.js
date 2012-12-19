/**
 * jQuery-Plugin "ezColumns"
 * 
 * @version: 1.0.0, 1.07.2011
 * 
 * @author: Andres Vidal
 *          code@andresvidal.com
 *          http://www.andresvidal.com/labs/ezcolumns.html
 *
 * Instructions: Pass in a jQuery selector to the parent of the children to organize in columns.
 * When using UL LI, a {target} and {colWrapper} may be defined to properly set up the columns.
 *
 * @example: JavaScript: $("ul.list").ezColumns({colWrapper: '<ul class="col"></ul>', target: $("div.countries")});
 * HTML: <div class="countries"></div> <ul class="list"> <li>example1</li><li>example2</li> <li>example3</li> ... </ul>
 *
 * @colWrapper    string or DOM object  The HTML wrapper for each column. Default: <div class="col"></div>
 * @target        DOM object            The target element to append the columns. Default: plugin selector
 * @groups        DOM object collection A collection of DOM objects to organize into columns. Default: plugin selector children
 * @columns       string                The max number of columns to use. Default: 3
 * @callback      function              A function to run after the plugin finishes appending all elements to the DOM.
 * 
 */

(function($) {
	$.fn.ezColumns = function(options) {
		
		var heights = [];

 		$(this).children().each(function(index) {
                     heights[index] = $(this).outerHeight();
//                        $(this).css('width', cellWidth);
                    });


//		if( ! $(this).data("groups") ){
			//removes current elements after adding to data property
			$(this).data("groups", $(this).children().remove());
//		}		
		
		var $data = $(this).data("groups").clone();
		
		var s = jQuery.extend({
			colWrapper: '<div class="col"></div>',
			target: this,
			groups: false,
			columns: 3,
			callback: function(){}
		}, options);
		
		s.groups = (s.groups) ? s.groups : $data;
		s.columns = (s.columns > s.groups.length) ? s.groups.length : s.columns;
		s.perColumn = Math.floor(s.groups.length / s.columns);
		s.mod = (s.groups.length % s.columns);
		
		$(s.target).empty();
		for(var x=0; x < s.columns; x++){			
			var g; //temp var
			if (x <= (s.mod-1)){
				g = s.groups.splice(0, s.perColumn + 1);				
			} else {
				g = s.groups.splice(0, s.perColumn);
			}			
			$(s.target).append( $(s.colWrapper).append(g) );
		}
/*
		var ch = 0;
		for(var x=0; x < $(s.groups).size();){			
			var g; //temp var
			//$(s.groups)[i]
			ch += heights[x];
			if (ch > 400){
				g = s.groups.splice(0, x-1);
				$(s.target).append( $(s.colWrapper).append(g) );
				ch = 0;	x=0;
			} else if(x == $(s.groups).size() - 1) {
				$(s.target).append( $(s.colWrapper).append(s.groups) );
				x=10;
			} else {		
				x++;
			}
		}*/
		s.callback.call(this);
		return this; // return to jQuery
	};
})(jQuery);