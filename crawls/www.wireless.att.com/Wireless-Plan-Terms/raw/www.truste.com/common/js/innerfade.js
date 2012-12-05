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
 *	  runningclass: CSS-Class which the container getâ€™s applied (Default: 'innerfade'),
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
var old_slide_id_number = 0;
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
                	
             
                    button_class = $(this).attr("class");
                    split_button_class_string = button_class.split("_");
                    button_class_string  = split_button_class_string.pop();
                    curr_slide_id_number = parseFloat(button_class_string);
                   if(old_slide_id_number != curr_slide_id_number){
                    settings.slide_timer_on = 'yes';
                    resetSquares();
                  	$.skip();
                  	old_slide_id_number = curr_slide_id_number;
                  	}
                    
                    
                  
                }); // click
            }); //each
            
            
            function resetSquares(){
                   $("#"+settings.slide_nav_squares+" table tbody tr td").each(function() {
                  	$(this).attr("id", 'selectedSquare_false');
                  	}); //each
            }
                $("#"+settings.slide_nav_squares+" table tbody tr td").each(function() {
                // add click functionality to buttons
                 
                $(this).bind('mouseover', function() {
                var selectedSquare = $(this).attr("id");
                split_square_class_string = selectedSquare.split("selectedSquare_");
                if(split_square_class_string[1] != "true"){
                    button_class = $(this).attr("class");
                    split_button_class_string = button_class.split("_");
                    button_class_string   = split_button_class_string.pop();
                    curr_slide_id_number  = parseFloat(button_class_string);


                    if(old_slide_id_number != curr_slide_id_number && curr_slide_id_number != 100){
                    settings.slide_timer_on = 'yes'; 
                    resetSquares();
                    $(this).attr("id", "selectedSquare_true");
                  	$.skip();
                  	old_slide_id_number = curr_slide_id_number;
                  	}
                  	}
                  	else {

                  	}
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
            'slide_nav_id':		null,
            'slide_nav_squares': null
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

				for (var i = 0; i < elements.length; i++) 
				{
					if (settings.animationtype == 'fade')
					{
    					$(elements[i]).fadeOut(settings.speed);

    				}
    				else
    				{
						$(elements[i]).slideUp(settings.speed);

					}
    				
    			}
    			
    			
    			if (settings.animationtype == 'fade')
				{
            		$(elements[curr_slide_id_number]).fadeIn(settings.speed, function() {
							removeFilter($(this)[0]);
						});
					
				}
				else
				{
					$(elements[curr_slide_id_number]).slideDown(settings.speed, function() {
							removeFilter($(this)[0]);
						});
					
					
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
            		old_slide_id_number = curr_slide_id_number;
                	curr_slide_id_number = curr_slide_id_number + 1;
                	next_slide_id_number = curr_slide_id_number - 1;
                	
                	//alert(curr_slide_id_number+"if");
            	} 
				else 
				{
				old_slide_id_number = curr_slide_id_number;
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
        	
        
        };
    }
    
    


})(jQuery);

// **** remove Opacity-Filter in ie ****
function removeFilter(element) {
	if(element.style.removeAttribute){
		element.style.removeAttribute('filter');
	}
}