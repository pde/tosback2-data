/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

try {
	document.execCommand('BackgroundImageCache', false, true);
} catch(e) {}

$('li.cs_clickable').bind('mouseover', function() {
	$(this).addClass('cs_hover');
}).bind('mouseout', function() {
	$(this).removeClass('cs_hover');
}).bind('click', function() {
	if (!$(this).find('a').attr('href').match(/^javascript/)) {
		document.location = $(this).find('a').attr('href');
		return false;
	}
});

$('#cs_most_popular_recent li:first a').bind('click', function() {
	
	$('#cs_most_popular_recent li a.cs_active').removeClass('cs_active');
	$(this).addClass('cs_active');
	
	$('#cs_most_popular_recent li.cs_recent, #cs_most_popular_recent li.cs_popular').toggle();
	
	return false;
	
});

$('.cs_module h3 > a').bind('click', function() {
	
	var hash = $(this).attr('href').match(/#(.*?)$/)[1];
	
	if (document.location.hash != '#' + hash) {
		
		document.location.hash = hash;
		
	} else if ($(this).closest('.cs_module_subsection').length) {
		
		document.location.hash = $(this).closest('.cs_module_section').find('a').attr('href').match(/#(.*?)$/)[1];
		$('.cs_module_subsection').removeClass('cs_active').find('.cs_module_subsection_content').hide();
		
	} else {
		
		document.location.hash = '';
		$('.cs_module_section').removeClass('cs_active').find('.cs_module_section_content').hide();
		
	}
	
	return false;
	
});

$(window).hashchange(function() {
	
	if (!document.location.hash) { return false; }
	
	var section = $('a[href$=' + document.location.hash.replace(/\?.+$/, '') + ']');
	
	$('.cs_module_subsection').removeClass('cs_active').find('.cs_module_subsection_content').hide();
	$('.cs_module_section').removeClass('cs_active').find(' > .cs_module_section_content').hide();
	
	if (!section.length) { return false; }
	
	section.closest('div.cs_module_section').addClass('cs_active').find(' > .cs_module_section_content').show();
	
	if (section.closest('div').hasClass('cs_module_subsection')) {
		section.closest('div.cs_module_subsection').addClass('cs_active').find(' > .cs_module_subsection_content').show();
	}
	
	$('html,body').animate({scrollTop: $(section).offset().top -55}, 250);
	
	return false;
	
});

var jqueryanimate = false;

jQuery.fx.step.scrollTop = function(e) {
	jqueryanimate = true;
	e.elem.scrollTop = e.now;
	jqueryanimate = false;
};

$(document).scroll(function() {
	if (!jqueryanimate) { $('html,body').stop(); }
});

$(window).hashchange();

// if (document.cookie) { $('#nocookies').remove(); }