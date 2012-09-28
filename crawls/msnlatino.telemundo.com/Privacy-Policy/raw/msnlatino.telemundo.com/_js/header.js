function get_mp_height(selector){
    var to_check=['padding-top','padding-bottom','margin-top','margin-bottom'];
    var height=0;
    for(var i=0;i<to_check.length;i++){
        height+=parseInt($(selector).css(to_check[i]));
    }
    return height;
}
// drop down list in header
(function($){
    
    $.fn.menuHover = function(options){
        this.rolled_out=false;
        this.menu_timeout=false;
        this.settings = $.extend({}, $.fn.menuHover.defaults, options);
        $(this.settings.content_selector,this).height(this.settings.menu_height-get_mp_height($(this.settings.content_selector,this)));
        if(!($.browser.msie)){
            $(this.settings.content_selector,this).jScrollPane(this.settings.jScrollPaneData);
        }

        var self=this;
        $(this.settings.trigger_selector,this).bind('click',
            function(){
                if(self.rolled_out){
                    $.fn.menuHover.roll_up(self);
                }
                else{
                    $.fn.menuHover.roll_down(self);
                }
            }
        );
    };
    $.fn.menuHover.roll_up = function(curr){
        $.fn.menuHover.unbind_leave(curr);
        curr.rolled_out=false;
        $(curr.settings.wrapper_selector,curr).animate({height:0},function(){
            if(curr.settings.addBorder){
                $(curr.settings.wrapper_selector,curr).css('border','none');
            }
            });
    };
    $.fn.menuHover.roll_down = function(curr){
        if(curr.settings.addBorder){
            $(curr.settings.wrapper_selector,curr).css('border',curr.settings.addBorder);
        }
        $(curr.settings.wrapper_selector,curr).animate({height:curr.settings.menu_height},function(){
            curr.rolled_out=true;
            $.fn.menuHover.bind_leave(curr);
        });
    };
    $.fn.menuHover.unbind_leave = function(curr){
        curr.rolled_out=false;
        curr.menu_timeout=false;
        $(curr.settings.hover_area_selector,curr).unbind('mouseenter');
        $(curr.settings.hover_area_selector,curr).unbind('mouseleave');

    };
    $.fn.menuHover._bind_mouse_leave = function(curr){
        if(curr.rolled_out){
            if(curr.menu_timeout){
                window.clearTimeout(curr.menu_timeout);
            }
        }
        curr.menu_timeout=window.setTimeout(function(){
            $(curr.settings.wrapper_selector,curr).animate(
                {height:0},
                    function(){
                        if(curr.settings.addBorder){
                            $(curr.settings.wrapper_selector,curr).css('border','none');
                        }
                        $.fn.menuHover.unbind_leave(curr);
                    });
                },
            curr.settings.mouseout_length);
    };
    $.fn.menuHover._bind_mouse_enter = function(curr){
        if(curr.rolled_out){
            if(curr.menu_timeout){
                window.clearTimeout(curr.menu_timeout);
            }
        }
    };
    $.fn.menuHover.bind_leave = function(curr){
        $(curr.settings.hover_area_selector,curr).bind('mouseleave',function(){$.fn.menuHover._bind_mouse_leave(curr);});
        $(curr.settings.hover_area_selector,curr).bind('mouseenter',function(){$.fn.menuHover._bind_mouse_enter(curr);});
    };
    $.fn.menuHover.defaults = {
        mouseout_length:2000,
        jScrollPaneData:{
            scrollbarWidth:6,
            dragMinHeight:33,
            dragMaxHeight:33
        },
        hover_area_selector:'.dropdown_hover_area',
        wrapper_selector:'.dropdown_wrapper',
        content_selector:'.dropdown_content',
        trigger_selector:'.dropdown_trigger',
        menu_height:250
        
    };
})(jQuery);

function search_submit(event,search_site){

    if(!$('#buscar_input').attr('value')){
        event.preventDefault();
        m.alertbox('¿Qué estás buscando?');
    }
    else{
        if(!search_site){
            $('input#search_web').attr('value',1);
        }
    }
}
function initialize_header(){
    $('li#msn_dropdown').menuHover({addBorder:'1px solid white',menu_height:260});
    $('form#buscar').bind('submit',function(e){search_submit(e,true);});
    $('form#buscar button#btn_search_site').bind('click',function(e){search_submit(e,true);});
    $('form#buscar button#btn_search_web').bind('click',function(e){search_submit(e,false);});
}

$(document).ready(function() {
    var location = document.location.href.toLowerCase();
    if (window.Msn !== undefined && typeof(Msn) === 'object' && Msn.Flash !== undefined) {
        var path_exceptions = [];
        path_exceptions.push(/^\/$/);
        path_exceptions.push(/photo_gallery/);
        var valid = true;
        for (var i=0; i<path_exceptions.length; i++) {
            if (location.match(path_exceptions[i])) {
                valid = false;
                break;
            }
        }
        if (valid) {
            DARTad.startRefreshTimer('AUTOREFRESH', 120, 'AUTO');
        }
    } else if((document.title != 'Mainsite | Telemundo' )
        && (document.title != 'videos | Telemundo') 
        && (location.indexOf('/tras_el_lente') == -1)) //WO 14320
    {
        DARTad.startRefreshTimer('AUTOREFRESH', 60, 'AUTO');
    }
});
