/* =========================================================

// jquery.innerfade.js

// Datum: 2008-02-14
// Firma: Medienfreunde Hofmann & Baldes GbR
// Author: Torsten Baldes
// Mail: t.baldes@medienfreunde.com
// Web: http://medienfreunde.com

// based on the work of Matt Oakes http://portfolio.gizone.co.uk/applications/slideshow/
// and Ralf S. Engelschall http://trainofthoughts.org/

 *
 *  <ul id="news"> 
 *      <li>content 1</li>
 *      <li>content 2</li>
 *      <li>content 3</li>
 *  </ul>
 *  
 *  $('#news').innerfade({ 
 *	  animationtype: Type of animation 'fade' or 'slide' (Default: 'fade'), 
 *	  speed: Fading-/Sliding-Speed in milliseconds or keywords (slow, normal or fast) (Default: 'normal'), 
 *	  timeout: Time between the fades in milliseconds (Default: '2000'), 
 *	  type: Type of slideshow: 'sequence', 'random' or 'random_start' (Default: 'sequence'), 
 * 		containerheight: Height of the containing element in any css-height-value (Default: 'auto'),
 *	  runningclass: CSS-Class which the container get’s applied (Default: 'innerfade'),
 *	  children: optional children selector (Default: null)
 *	 'slide_timer_on':	default slider is on like 'yes' but you stop auto play using 'no'
 *   'slide_ui_parent':	'news',
 *	 'slide_ui_text':	profilio text ul id
 *   'pause_button_id':  pause button id,
 *   'slide_nav_id':		slide navigation ul id
 *  }); 
 *

// ========================================================= */


(function($) {

    $.fn.innerfade = function(options) 
	{
    		var settings;
    		var elements;
    		var elements_title;
    		var curr_slide_id_number;
    		var next_slide_id_number;
        	return this.each(function() 
			{   
            	$.innerfade(this, options);
        	});
    };
    settings = {
        	'animationtype':    'fade',
            'speed':            'normal',
            'type':             'sequence',
            'timeout':           5000,
            'containerheight':  'auto',
            'runningclass':     'innerfade',
            'children':         null,
            'slide_timer_on':	'yes',
            'slide_ui_parent':	null,
            'slide_ui_text':	null,
            'pause_button_id':  null,
            'slide_nav_id':		null
        };
    //control play and  pause functionality 
    jQuery.pause = function() {
    			var elements = $("ul#"+settings.slide_ui_parent+" li");
    			var isPlay = $("#"+settings.pause_button_id+" span").html();
                if(isPlay == "pause")
                {
                	$("#"+settings.pause_button_id+" span").html("play");
                	settings.slide_timer_on = 'no'
                	$("#"+settings.pause_button_id).attr("class", "paused_button");
                }
                else
                {
                	$("#"+settings.pause_button_id+" span").html("pause");
					settings.slide_timer_on = 'yes'
					$("#"+settings.pause_button_id).attr("class", "pause_button");
					button_class = $("#button_selected").attr("class");
                    split_button_class_string = button_class.split("_");
                    button_class_string   = split_button_class_string.pop();
                    curr_slide_id_number  = parseFloat(button_class_string);
                   	next_slide_id_number  = curr_slide_id_number - 1;;
                    setTimeout(function(){
					$.innerfade.next(elements, settings, curr_slide_id_number, next_slide_id_number);
								}, 0);
				}
   
            }  
            
    // next button
    jQuery.next = function(){
    				var elements = $("ul#"+settings.slide_ui_parent+" li");
    				$("#"+settings.pause_button_id+" span").html("play");
    				//alert("#"+settings.pause_button_id+"span");
    				
    				
    				
                	$("#"+settings.pause_button_id).attr("class", "paused_button");		
					button_class = $("#button_selected").attr("class");
                    split_button_class_string = button_class.split("_");
                    button_class_string   = split_button_class_string.pop();
                    curr_slide_id_number  = parseFloat(button_class_string)+1;
                    next_slide_id_number  = curr_slide_id_number - 1;
                    settings.slide_timer_on = 'no'
                    
                	if ((curr_slide_id_number) < elements.length) 
					{
                    	$.skip();
                	}
	}
	
	// prev button
    jQuery.prev = function(){
    				var elements = $("ul#"+settings.slide_ui_parent+" li");
    				$("#"+settings.pause_button_id+" span").html("play");
                	$("#"+settings.pause_button_id).attr("class", "paused_button");
					button_class = $("#button_selected").attr("class");
                    split_button_class_string = button_class.split("_");
                    button_class_string   = split_button_class_string.pop();
                    curr_slide_id_number  = parseFloat(button_class_string)- 1;
                    next_slide_id_number  = curr_slide_id_number - 1;
                    settings.slide_timer_on = 'no'
                  	if ((curr_slide_id_number) >= 0) 
					{
                    $.skip();
                    }
	}
	
	//first button
	jQuery.first = function(){
					$("#"+settings.pause_button_id+" span").html("play");
                	$("#"+settings.pause_button_id).attr("class", "paused_button");		
					curr_slide_id_number  = 0;
                    next_slide_id_number  = curr_slide_id_number - 1;
                    settings.slide_timer_on = 'no'
                    $.skip();
               
	}
	
	//last button
	jQuery.last = function(){
					var elements = $("ul#"+settings.slide_ui_parent+" li");
					$("#"+settings.pause_button_id+" span").html("play");
                	$("#"+settings.pause_button_id).attr("class", "paused_button");		
                	curr_slide_id_number  = elements.length - 1;
                    next_slide_id_number  = curr_slide_id_number - 1;
                    settings.slide_timer_on = 'no'
                    $.skip();
               
	}
	
	
            
    
    //set options button click event
    jQuery.setOptionsButtonEvent = function()
    {
    	
  
    $("#"+settings.slide_nav_id+" li").each(function() {
                // add click functionality to buttons
                
                $(this).click(function() {
                	
                	$("#"+settings.pause_button_id+" span").html("play");
                	$("#"+settings.pause_button_id).attr("class", "paused_button");
                    button_class = $(this).attr("class");
                    split_button_class_string = button_class.split("_");
                    button_class_string   = split_button_class_string.pop();
                    curr_slide_id_number  = parseFloat(button_class_string);
                    next_slide_id_number  = curr_slide_id_number - 1;
                    settings.slide_timer_on = 'no'
                  	$.skip();
   
                }); // click
            }); //each
    
	}
    

    $.innerfade = function(container, options) 
	{
         settings = {
        	'animationtype':    'fade',
            'speed':            'normal',
            'type':             'sequence',
            'timeout':           5000,
            'containerheight':  'auto',
            'runningclass':     'innerfade',
            'children':         null,
            'slide_timer_on':	'yes',
            'slide_ui_parent':	null,
            'slide_ui_text':	null,
            'pause_button_id':  null,
            'slide_nav_id':		null
        };
        var elements;
        var elements_title;
        if (options)
            $.extend(settings, options);
        if (settings.children === null)
            elements = $(container).children();
        else
            elements = $(container).children(settings.children);
        if (elements.length > 1) 
		{
			if(settings.slide_ui_text != 'null')
			{
				elements_title = $("ul#"+settings.slide_ui_text+" li")
			}
			
        	$(container).css('position', 'relative').css('height', settings.containerheight).addClass(settings.runningclass);
            for (var i = 0; i < elements.length; i++) 
			{
                $(elements[i]).css('z-index', String(elements.length-i)).css('position', 'absolute').hide();
                if(settings.slide_ui_text != 'null')
				{
                	$(elements_title[i]).css('z-index', String(elements_title.length-i)).css('position', 'absolute').hide();
                }
            };
            if (settings.type == "sequence") 
			{
            	setTimeout(function() {
                $.innerfade.next(elements, settings, 1, 0);
                	}, settings.timeout);
                $(elements[0]).show();
                if(settings.slide_ui_text != 'null')
				{
                	$(elements_title[0]).show();
                }
                if(settings.slide_nav_id != 'null')
                {
                	$("#"+settings.slide_nav_id+" li").removeAttr("id");
            		$("#"+settings.slide_nav_id+" .slide_0").attr("id", "button_selected");
            	}
                
            } 
			else if (settings.type == "random") 
			{
            	next_slide_id_number = Math.floor ( Math.random () * ( elements.length ) );
            	setTimeout(function() {
                    do { 
												curr_slide_id_number = Math.floor ( Math.random ( ) * ( elements.length ) );
										} while (next_slide_id_number == curr_slide_id_number );             
										$.innerfade.next(elements, settings, curr_slide_id_number, next_slide_id_number);
                }, settings.timeout);
                $(elements[next_slide_id_number]).show();
                if(settings.slide_ui_text != 'null')
				{
                	$(elements_title[next_slide_id_number]).show();
                }
            } 
			else if ( settings.type == 'random_start' ) 
			{
					settings.type = 'sequence';
					curr_slide_id_number = Math.floor ( Math.random () * ( elements.length ) );
					setTimeout(function(){
									$.innerfade.next(elements, settings, (curr_slide_id_number + 1) %  elements.length, curr_slide_id_number);
								}, settings.timeout);
								
					$(elements[curr_slide_id_number]).show();
					
					if(settings.slide_ui_text != 'null')
					{
                		$(elements_title[curr_slide_id_number]).show();
                	}
					
			}
			else 
			{
					alert('Innerfade-Type must either be \'sequence\', \'random\' or \'random_start\'');
			}
		}
    };
    
    
    $.skip = function() {
    	
    			
				var elements = $("ul#"+settings.slide_ui_parent+" li");
				if(settings.slide_ui_text != 'null')
				{
					var elements_title = $("ul#"+settings.slide_ui_text+" li")
				}
				for (var i = 0; i < elements.length; i++) 
				{
					if (settings.animationtype == 'fade')
					{
    					$(elements[i]).fadeOut(settings.speed);
    					if(settings.slide_ui_text != 'null')
						{
						
    						$(elements_title[i]).fadeOut(settings.speed);
    					}
    				}
    				else
    				{
						$(elements[i]).slideUp(settings.speed);
						if(settings.slide_ui_text != 'null')
						{
						
    						$(elements_title[i]).slideUp(settings.speed);
    					}
					}
    				
    			}
    			if (settings.animationtype == 'fade')
				{
            		$(elements[curr_slide_id_number]).fadeIn(settings.speed, function() {
							removeFilter($(this)[0]);
						});
					if(settings.slide_ui_text != 'null')
					{
						$(elements_title[curr_slide_id_number]).fadeIn(settings.speed, function() {
							removeFilter($(this)[0]);
						});
					}
				}
				else
				{
					$(elements[curr_slide_id_number]).slideDown(settings.speed, function() {
							removeFilter($(this)[0]);
						});
					if(settings.slide_ui_text != 'null')
					{
						$(elements_title[curr_slide_id_number]).slideDown(settings.speed, function() {
							removeFilter($(this)[0]);
						});
					}
					
				}
				if(settings.slide_nav_id != 'null')
				{
					$("#"+settings.slide_nav_id+" li").removeAttr("id");
            		$("#"+settings.slide_nav_id+" .slide_"+curr_slide_id_number).attr("id", "button_selected");
            	}
						
            
            } //skip
    

    $.innerfade.next = function(elements, settings, curr_slide_id_number, next_slide_id_number) 
	{
		var elements_title;
		if(settings.slide_ui_text != 'null')
		{
			elements_title = $("ul#"+settings.slide_ui_text+" li");
		}
		
    	if(settings.slide_timer_on == 'yes')
    	{
    		
    		//alert(elements.length+"yes");
        	if (settings.animationtype == 'slide') 
			{
            	$(elements[next_slide_id_number]).slideUp(settings.speed);
            	$(elements[curr_slide_id_number]).slideDown(settings.speed);
            	
            	$(elements[next_slide_id_number]).slideUp(settings.speed);
            	if(settings.slide_ui_text != 'null')
				{
            		$(elements_title[next_slide_id_number]).slideUp(settings.speed);
            	}
            	$(elements[curr_slide_id_number]).slideDown(settings.speed, function() {
							removeFilter($(this)[0]);
						});
				if(settings.slide_ui_text != 'null')
				{
					$(elements_title[curr_slide_id_number]).slideDown(settings.speed, function() {
							removeFilter($(this)[0]);
						});
				}
				if(settings.slide_nav_id != 'null')
				{
					$("#"+settings.slide_nav_id+" li").removeAttr("id");
            		$("#"+settings.slide_nav_id+" .slide_"+curr_slide_id_number).attr("id", "button_selected");
            	}
        	} 
			else if (settings.animationtype == 'fade') 
			{
            	$(elements[next_slide_id_number]).fadeOut(settings.speed);
            	if(settings.slide_ui_text != 'null')
				{
            		$(elements_title[next_slide_id_number]).fadeOut(settings.speed);
            	}
            	$(elements[curr_slide_id_number]).fadeIn(settings.speed, function() {
							removeFilter($(this)[0]);
						});
				if(settings.slide_ui_text != 'null')
				{
					$(elements_title[curr_slide_id_number]).fadeIn(settings.speed, function() {
							removeFilter($(this)[0]);
						});
				}
				if(settings.slide_nav_id != 'null')
				{
					$("#"+settings.slide_nav_id+" li").removeAttr("id");
            		$("#"+settings.slide_nav_id+" .slide_"+curr_slide_id_number).attr("id", "button_selected");
            	}
        	} 
			else
            alert('Innerfade-animationtype must either be \'slide\' or \'fade\'');
        
			if (settings.type == "sequence") 
			{
				
            	//alert(curr_slide_id_number);
            	if ((curr_slide_id_number + 1) < elements.length) 
				{
					
            		//alert(curr_slide_id_number);
                	curr_slide_id_number = curr_slide_id_number + 1;
                	next_slide_id_number = curr_slide_id_number - 1;
                	//alert(curr_slide_id_number+"if");
            	} 
				else 
				{
					//alert(curr_slide_id_number+"else");
                	curr_slide_id_number = 0;
                	next_slide_id_number = elements.length - 1;
            	}
            	
        	} 
			else if (settings.type == "random") 
			{
            	next_slide_id_number = curr_slide_id_number;
            	while (curr_slide_id_number == next_slide_id_number)
                curr_slide_id_number = Math.floor(Math.random() * elements.length);
        	} 
			else
            alert('Innerfade-Type must either be \'sequence\', \'random\' or \'random_start\'');
            
            
        	setTimeout((function() {
            $.innerfade.next(elements, settings, curr_slide_id_number, next_slide_id_number);
        	}), settings.timeout);
        	
        //	alert(curr_slide_id_number);
        };
    }
    
    


})(jQuery);

// **** remove Opacity-Filter in ie ****
function removeFilter(element) {
	if(element.style.removeAttribute){
		element.style.removeAttribute('filter');
	}
}


(function($){  
    $.fn.extend({   
        
        sort: function(params) {  

        //expected params
        /*
        {
            sortOn: '.selector',  //selector of the column to sort on
            direction: 'asc' | 'desc' //optional..defaults to asc
            sortType: 'string | date | number' //optional..defaults to string
        }
        
        OR 
        
        an array of the above obj for multi sorting. The order in the array determines
        order of precedence
        */

            //hacky to be backward compatible
            if(!params.length)
            {
                params = [params];
            }

            var sortFunc = function(a, b)
            {
                var retval;
                var typedData;

                for(var i = 0;i<params.length;i++)
                {
                    typedData = getTypedData(a, b, i);
                    retval = innerSort(typedData.a, typedData.b, params[i].direction);
                    if(retval != 0)
                      break;
                }
                return retval;
            }
            
            var getTypedData = function(a, b, index)
            {
                var sortType = params[index].sortType;
                var preA, preB;
                var typedA, typedB;
                
                preA = getValue(a, index);
                preB = getValue(b, index);
                if(sortType =='date')
                {
                    typedA = new Date(Date.parse(preA));
                    typedB = new Date(Date.parse(preB));
                }
                else if(sortType == 'number')
                {
                    typedA = new Number(preA);
                    typedB = new Number(preB);
                }
                else
                {
                    typedA = new String(preA).toLowerCase();
                    typedB = new String(preB).toLowerCase();
                }
                return {a: typedA, b: typedB};
            }
            
            var getValue = function(obj, index)
            {
                var val;
                if(obj.hash[index])
                {
                    val = obj.hash[index];
                }
                else
                {
                    val = findValue(obj.row, params[index].sortOn);
                    obj.hash[index] = val;
                }
                return val;
            }
            
            var findValue = function(row, selector)
            {
                return row.find(selector).text();
            }
            
            var innerSort = function(a, b, direction)
            {
                var retval;
                if(a > b)
                {
                    retval = 1;
                }
                else if(a < b)
                {
                    retval = -1;
                }
                else
                {
                    retval = 0;
                }
                if(direction == 'desc')
                    retval*=-1;
                return retval;
            }

            var getRowHash = function(rows)
            {
                var rowHash = [];
                for(var x = 0;x < rows.length;x++)
                {
                    rowHash[x] = {row: $(rows[x]), hash: []};
                }
                return rowHash;
            }
            
            var addRows = function(container, rowHash)
            {
                var c = $('<div></div>');
                for(var x = 0; x < rowHash.length; x++)
                {
                    c.append(rowHash[x].row);
                }
                container.append(c.children());
            }

            return this.each(function() {  
                var container = $(this);
                var rows = container.children();
                
                var rowHash = getRowHash(rows);
                
                rowHash.sort(sortFunc);

 
                addRows(container, rowHash);

            });  

        }  
    });  
})(jQuery);  


;(function($) {
	// default settings
	$.tinysort = {
		 id: "TinySort"
		,version: "1.0.3"
		,defaults: {
			 order: "asc"	// order: asc, desc or rand
			,attr: ""		// order by attribute value
			,place: "start"	// place ordered elements at position: start, end, org (original position), first
			,returns: false	// return all elements or only the sorted ones (true/false)
		}
	};
	$.fn.extend({
		tinysort: function(_find,_settings) {
			if (_find&&typeof(_find)!="string") {
				_settings = _find;
				_find = null;
			}

			var oSettings = $.extend({}, $.tinysort.defaults, _settings);

			var oElements = {}; // contains sortable- and non-sortable list per parent
			this.each(function(i) {
				// element or sub selection
				var mElm = (!_find||_find=="")?$(this):$(this).find(_find);
				// text or attribute value
				var sSort = oSettings.order=="rand"?""+Math.random():(oSettings.attr==""?mElm.text():mElm.attr(oSettings.attr));
				// to sort or not to sort
				var mParent = $(this).parent();
				if (!oElements[mParent]) oElements[mParent] = {s:[],n:[]};	// s: sort, n: not sort
				if (mElm.length>0)	oElements[mParent].s.push({s:sSort,e:$(this),n:i}); // s:string, e:element, n:number
				else				oElements[mParent].n.push({e:$(this),n:i});
			});
			//
			// sort
			for (var sParent in oElements) {
				var oParent = oElements[sParent];
				oParent.s.sort(
					function zeSort(a,b) {
						var x = a.s.toLowerCase?a.s.toLowerCase():a.s;
						var y = b.s.toLowerCase?b.s.toLowerCase():b.s;
						if (isNum(a.s)&&isNum(b.s)) {
							x = parseFloat(a.s);
							y = parseFloat(b.s);
						}
						return (oSettings.order=="asc"?1:-1)*(x<y?-1:(x>y?1:0));
					}
				);
			}
			//
			// order elements and fill new order
			var aNewOrder = [];
			for (var sParent in oElements) {
				var oParent = oElements[sParent];
				var aOrg = []; // list for original position
				var iLow = $(this).length;
				switch (oSettings.place) {
					case "first": $.each(oParent.s,function(i,obj) { iLow = Math.min(iLow,obj.n) }); break;
					case "org": $.each(oParent.s,function(i,obj) { aOrg.push(obj.n) }); break;
					case "end": iLow = oParent.n.length; break;
					default: iLow = 0;
				}
				var aCnt = [0,0]; // count how much we've sorted for retreival from either the sort list or the non-sort list (oParent.s/oParent.n)
				for (var i=0;i < $(this).length;i++) {
					var bSList = i>=iLow&&i<iLow+oParent.s.length;
					if (contains(aOrg,i)) bSList = true;
					var mEl = (bSList?oParent.s:oParent.n)[aCnt[bSList?0:1]].e;
					mEl.parent().append(mEl);
					if (bSList||!oSettings.returns) aNewOrder.push(mEl.get(0));
					aCnt[bSList?0:1]++;
				}
			}
			//
			return this.setArray(aNewOrder); // setArray or pushStack?
		}
	});
	// is numeric
	function isNum(n) {
		var x = /^\s*?[\+-]?(\d*\.?\d*?)\s*?$/.exec(n);
		return x&&x.length>0?x[1]:false;
	};
	// array contains
	function contains(a,n) {
		var bInside = false;
		$.each(a,function(i,m) {
			if (!bInside) bInside = m==n;
		});
		return bInside;
	};
	// set functions
	$.fn.TinySort = $.fn.Tinysort = $.fn.tsort = $.fn.tinysort;
})(jQuery);