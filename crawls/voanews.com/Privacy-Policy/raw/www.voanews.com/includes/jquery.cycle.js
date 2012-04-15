/*
 America.gov JavaScript: Feature Cycle
 
 America.gov Web Site
 United States Department of State
 Last Edited: Nov 2007 by Darren W Krape (krapedw@state.gov)v)
 Based on the work of:
 Matt Oakes: http://portfolio.gizone.co.uk/applications/slideshow/
 Torsten Baldes: http://medienfreunde.com/lab/innerfade/
 */
(function($){

    $.fn.cycle = function(options){
    
        this.each(function(){
        
            var settings = {
                animationtype: 'fade',
                speed: 1000,
                timeout: 8000,
                containerheight: 'auto',
                runningclass: 'cycle',
                playState: 'play'
            };
            
            if (options) 
                $.extend(settings, options);
            var elements = $(this).find('ul').children();
            
            if (elements.length > 1) {
            
                $(this).css('float', 'left');
                $(this).find('ul').css('position', 'relative');
                $(this).addClass(settings.runningclass);
                $(this).find('ul').css('height', settings.containerheight);
                $(this).find('li').slice(0, 1).css('display', 'block');
                $(this).append("<div class='nav'><a class='button previous' href='#'>Previous</a><a class='button pause' href='#'>Pause</a><a class='button next' href='#'>Next</a><ul class='numbers'></ul></div>");
                
                $(this).find(".nav").css({
                    marginTop: outerHeight($(this).find("li:eq(0)")) + "px"
                });
                
                settings.parent = $(this);
                
                for (var i = 0; i < elements.length; i++) {
                    $(elements[i]).css('z-index', String(elements.length - i)).css('position', 'absolute');
                    $(elements[i]).hide();
                    $(this).find(".nav .numbers").append('<li><a href="#">' + (i + 1) + '</a></li>');
                };
                
                $(this).find(".nav .numbers li:first").addClass("active");
                $(this).find(".nav .numbers li:last").addClass("last");
                
                settings.next = 1;
                settings.current = 0;
                setTimeout(function(){
                    $.cycle.next(elements, settings);
                }, settings.timeout);
                $(elements[0]).show();
                
            };
            
            //Pause Button	
            $(this).find('.pause').click(function(){
            
                settings.playState = (settings.playState == "pause") ? "play" : "pause";
                $(this).toggleClass("play");
                
                return false;
            });
            
            //Next Button
            $(this).find('.next').click(function(){
            
                settings.playState = "pause";
                $(this).parent(".nav").find(".pause").addClass("play");
                
                $.cycle.transition(settings, elements);
                return false;
            });
            
            //Previous Button
            $(this).find('.previous').click(function(next, current){
            
                settings.playState = "pause";
                $(this).parent(".nav").find(".pause").addClass("play");
                
                if (settings.current == 0) {
                    settings.next = elements.length - 1;
                }
                else {
                    settings.next = settings.current - 1;
                };
                $.cycle.transition(settings, elements, next, current);
                return false;
            });
            
            //Number Buttons
            $(this).find(".numbers li").click(function(){
            
                if (!$(this).hasClass("active")) {
                    $(settings.parent).find(".numbers li").removeClass("active");
                    $(this).addClass("active");
                    
                    settings.playState = "pause";
                    $(settings.parent).find(".nav .pause").addClass("play");
                    
                    settings.next = $(this).find("a").text() - 1;
                    $.cycle.transition(settings, elements);
                }
                
                return false;
            });
            
        });
    };
    
    $.cycle = function(){
    }
    $.cycle.next = function(elements, settings){
        if (settings.playState == 'play') {
            $.cycle.transition(settings, elements);
        };
        setTimeout((function(){
            $.cycle.next(elements, settings);
        }), settings.timeout);
    };
    
    $.cycle.transition = function(settings, elements){
    
        $(settings.parent).find(".nav").css({
            marginTop: outerHeight($(settings.parent).find("li:eq(" + settings.next + ")")) + "px"
        });
        $(settings.parent).find(".nav .numbers li").removeClass("active");
        $(settings.parent).find(".nav .numbers li:eq(" + settings.next + ")").addClass("active");
        
        $(settings.parent).find(".elements li:visible").fadeOut(settings.speed);
        $(elements[settings.next]).fadeIn(settings.speed);
        
        if ((settings.next + 1) < elements.length) {
            settings.next = settings.next + 1;
            settings.current = settings.next - 1;
        }
        else {
            settings.next = 0;
            settings.current = elements.length - 1;
        };
        
            };
})(jQuery);

$(document).ready(function(){
    $(".cycle").cycle();
});
