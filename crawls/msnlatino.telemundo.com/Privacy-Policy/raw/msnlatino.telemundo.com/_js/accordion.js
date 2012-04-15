(function($){
	var settings;
	$.fn.browserNavAccordion = function(options){
		if($(this).length===0){
			return;
		}
		settings = $.extend({}, $.fn.browserNavAccordion.defaults, options);
		settings.navHeight=$('dd',this).height();
		settings.curr=this;
		$('dt a',this).bind('click',function(e){$.fn.browserNavAccordion.clicked(e);});
	};
	$.fn.browserNavAccordion.clicked = function(event){
		var current_dl=$(event.target).parent().parent();
		if($(current_dl).hasClass(settings.selected_class)){
			return;
		}
		$('dl.'+settings.selected_class+' dd.browser_subnav',settings.curr).animate({height:0},function(){});
		$('dl.'+settings.selected_class).removeClass(settings.selected_class);
		$('dd.browser_subnav',current_dl).css('height',0);
		$(current_dl).addClass(settings.selected_class);
		$('dd.browser_subnav',current_dl).animate({height:settings.navHeight},function(){});
		
	}
	$.fn.browserNavAccordion.defaults = {
		'selected_class':'browser_nav_selected'
	};
})(jQuery);

(function($){
	var settings;
	$.fn.browseNavAccordion = function(options){
		if($(this).length===0){
			return;
		}
		settings = $.extend({}, $.fn.browseNavAccordion.defaults, options);
		settings.navHeight=$('ul.browse_sub_nav',this).height();
		settings.curr=this;
		$('h3 a',this).bind('click',function(e){$.fn.browseNavAccordion.clicked(e);});
	};
	$.fn.browseNavAccordion.clicked = function(event){
		var current_li=$(event.target).parent().parent();
		if($(current_li).hasClass(settings.selected_class)){
			return;
		}
		$('li.'+settings.selected_class+' ul.browse_sub_nav',settings.curr).animate({height:0},function(){$(this).css('display','none');});
		$('li.'+settings.selected_class).removeClass(settings.selected_class);
		$('ul.browse_sub_nav',current_li).css('height',0);
		$(current_li).addClass(settings.selected_class);
		$('ul.browse_sub_nav',current_li).animate({height:settings.navHeight},function(){});
		
	}
	$.fn.browseNavAccordion.defaults = {
		'selected_class':'selected'
	};
})(jQuery);



$(document).ready(function(){
	$('ul.browser_nav').browserNavAccordion();
	$('ul.browser_nav_wide').browserNavAccordion();
	$('ul.browse_nav').browseNavAccordion();
});
