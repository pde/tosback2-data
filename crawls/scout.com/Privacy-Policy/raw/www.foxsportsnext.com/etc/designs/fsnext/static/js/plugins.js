
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// FOR DEBUGGING IN IE7/8
var alertFallback = true;
   if (typeof console === "undefined" || typeof console.log === "undefined") {
     console = {};
     if (alertFallback) {
         console.log = function(msg) {
              alert(msg);
         };
     } else {
         console.log = function() {};
     }
   }



// place any jQuery/helper plugins in here, instead of separate, slower script files.

/* jQuery Carousel 0.9.8
Copyright 2010 Thomas Lanciaux and Pierre Bertet.
This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/
(function(g){g.fn.carousel=function(q){var q=g.extend({direction:"horizontal",loop:false,dispItems:1,pagination:false,paginationPosition:"inside",nextBtn:'<input type="button" value="Next" />',prevBtn:'<input type="button" value="Previous" />',btnsPosition:"inside",nextBtnInsert:"insertAfter",prevBtnInsert:"insertBefore",nextBtnInsertFn:false,prevBtnInsertFn:false,autoSlide:false,autoSlideInterval:3000,delayAutoSlide:false,combinedClasses:false,effect:"slide",slideEasing:"swing",animSpeed:300,equalWidths:"true",verticalMargin:0,callback:function(){},useAddress:false,adressIdentifier:"carousel",tabLabel:function(r){return r},showEmptyItems:true,ajaxMode:false,ajaxUrl:"",stopSlideBtn:false,stopSlideTextPause:"Pause",stopSlideTextPlay:"Play"},q);if(q.btnsPosition=="outside"){q.prevBtnInsert="insertBefore";q.nextBtnInsert="insertAfter"}q.delayAutoSlide=0+q.delayAutoSlide;return this.each(function(){var r={$elts:{},params:q,launchOnLoad:[]};r.$elts.carousel=g(this).addClass("js");r.$elts.content=g(this).children().css({position:"absolute",top:0});r.$elts.wrap=r.$elts.content.wrap('<div class="carousel-wrap"></div>').parent().css({overflow:"hidden",position:"relative"});r.steps={first:0,count:r.$elts.content.children().length};r.$elts.loader=g('<div class="loader"></div>').css({position:"absolute"});r.steps.last=r.steps.count-1;if(r.params.pagination){o(r)}if(g.isFunction(r.params.prevBtnInsertFn)){r.$elts.prevBtn=r.params.prevBtnInsertFn(r.$elts)}else{if(q.btnsPosition=="outside"){r.$elts.prevBtn=g(q.prevBtn)[q.prevBtnInsert](r.$elts.carousel)}else{r.$elts.prevBtn=g(q.prevBtn)[q.prevBtnInsert](r.$elts.wrap)}}if(g.isFunction(r.params.nextBtnInsertFn)){r.$elts.nextBtn=r.params.nextBtnInsertFn(r.$elts)}else{if(q.btnsPosition=="outside"){r.$elts.nextBtn=g(q.nextBtn)[q.nextBtnInsert](r.$elts.carousel)}else{r.$elts.nextBtn=g(q.nextBtn)[q.nextBtnInsert](r.$elts.wrap)}}r.$elts.nextBtn.addClass("carousel-control next carousel-next");r.$elts.prevBtn.addClass("carousel-control previous carousel-previous");r.lastItemsToLoad;d(r);r.$elts.carousel.attr("tabindex",0).add(r.$elts.carousel.children()).bind({focus:function(s){g(document).bind("keypress",function(t){switch(t.keyCode){case 39:r.$elts.nextBtn.click();break;case 37:r.$elts.prevBtn.click();break}switch(t.charCode){case 110:r.$elts.nextBtn.click();break;case 112:r.$elts.prevBtn.click();break}})},blur:function(){g(document).unbind("keypress")}});n(r);g(function(){c(r);g.each(r.launchOnLoad,function(s,t){t()});if(r.params.autoSlide){f(r)}if(q.stopSlideBtn==true){r.$elts.stopSlideBtn=g('<button type="button" class="slide-control play">'+q.stopSlideTextPause+"</button>");a(r)}})})};function c(s){var t=s.$elts.content.children();var r=0;t.each(function(){$item=g(this);$itemHeight=$item.outerHeight();if($itemHeight>r){r=$itemHeight}});if(s.params.verticalMargin>0){r=r+s.params.verticalMargin}t.height(r);var q=s.$elts.content.children(":first");s.itemWidth=q.outerWidth();if(s.params.direction=="vertical"){s.contentWidth=s.itemWidth}else{if(s.params.equalWidths){s.contentWidth=s.itemWidth*s.steps.count}else{s.contentWidth=(function(){var u=0;s.$elts.content.children().each(function(){u+=g(this).outerWidth()});return u})()}}s.$elts.content.width(s.contentWidth);s.itemHeight=r;if(s.params.direction=="vertical"){s.$elts.content.css({height:s.itemHeight*s.steps.count+"px"});s.$elts.content.parent().css({height:s.itemHeight*s.params.dispItems+"px"})}else{s.$elts.content.parent().css({height:s.itemHeight+"px"})}i(s)}function d(q){q.$elts.nextBtn.add(q.$elts.prevBtn).bind("enable",function(){var r=g(this).unbind("click").bind("click",function(){if(q.params.ajaxMode&&r.is(".next")&&b(q)==(p(q)-1)&&!q.lastItemsToLoad){h(q);q.$elts.content.ajaxSuccess(function(){})}else{e(q,j(q,(r.is(".next")?"next":"prev")));if(q.params.stopSlideBtn==true){q.$elts.stopSlideBtn.trigger("pause")}else{m(q)}}}).removeClass("disabled").removeAttr("disabled");if(q.params.combinedClasses){r.removeClass("next-disabled previous-disabled").removeAttr("disabled")}}).bind("disable",function(){var r=g(this).unbind("click").addClass("disabled").attr("disabled","disabled");if(q.params.combinedClasses){if(r.is(".next")){r.addClass("next-disabled")}else{if(r.is(".previous")){r.addClass("previous-disabled")}}}}).hover(function(){g(this).toggleClass("hover")})}function o(q){q.$elts.pagination=g('<div class="center-wrap"><div class="carousel-pagination"><p></p></div></div>')[((q.params.paginationPosition=="outside")?"insertAfter":"appendTo")](q.$elts.carousel).find("p");q.$elts.paginationBtns=g([]);q.$elts.content.find("li").each(function(r){if(r%q.params.dispItems==0){k(q,r)}})}function k(r,q){if(r.params.pagination){r.$elts.paginationBtns=r.$elts.paginationBtns.add(g('<a role="button"><span>'+r.params.tabLabel(r.$elts.paginationBtns.length+1)+"</span></a>").data("firstStep",q)).appendTo(r.$elts.pagination);r.$elts.paginationBtns.slice(0,1).addClass("active");r.$elts.paginationBtns.click(function(s){e(r,g(this).data("firstStep"));if(r.params.stopSlideBtn==true){r.$elts.stopSlideBtn.trigger("pause")}else{m(r)}})}}function n(q){if(q.params.useAddress&&g.isFunction(g.fn.address)){g.address.init(function(s){var r=g.address.pathNames();if(r[0]===q.params.adressIdentifier&&!!r[1]){e(q,r[1]-1)}else{g.address.value("/"+q.params.adressIdentifier+"/1")}}).change(function(s){var r=g.address.pathNames();if(r[0]===q.params.adressIdentifier&&!!r[1]){e(q,r[1]-1)}})}else{q.params.useAddress=false}}function e(q,r){q.params.callback(r);l(q,r);q.steps.first=r;i(q);if(q.params.useAddress){g.address.value("/"+q.params.adressIdentifier+"/"+(r+1))}}function j(r,q){if(q=="prev"){if(!r.params.showEmptyItems){if(r.steps.first==0){return((r.params.loop)?(r.steps.count-r.params.dispItems):false)}else{return Math.max(0,r.steps.first-r.params.dispItems)}}else{if((r.steps.first-r.params.dispItems)>=0){return r.steps.first-r.params.dispItems}else{return((r.params.loop)?(r.steps.count-r.params.dispItems):false)}}}else{if(q=="next"){if((r.steps.first+r.params.dispItems)<r.steps.count){if(!r.params.showEmptyItems){return Math.min(r.steps.first+r.params.dispItems,r.steps.count-r.params.dispItems)}else{return r.steps.first+r.params.dispItems}}else{return((r.params.loop)?0:false)}}}}function l(q,r){switch(q.params.effect){case"no":if(q.params.direction=="vertical"){q.$elts.content.css("top",-(q.itemHeight*r)+"px")}else{q.$elts.content.css("left",-(q.itemWidth*r)+"px")}break;case"fade":if(q.params.direction=="vertical"){q.$elts.content.hide().css("top",-(q.itemHeight*r)+"px").fadeIn(q.params.animSpeed)}else{q.$elts.content.hide().css("left",-(q.itemWidth*r)+"px").fadeIn(q.params.animSpeed)}break;default:if(q.params.direction=="vertical"){q.$elts.content.stop().animate({top:-(q.itemHeight*r)+"px"},q.params.animSpeed,q.params.slideEasing)}else{q.$elts.content.stop().animate({left:-(q.itemWidth*r)+"px"},q.params.animSpeed,q.params.slideEasing)}break}}function i(q){if(j(q,"prev")!==false){q.$elts.prevBtn.trigger("enable")}else{q.$elts.prevBtn.trigger("disable")}if(j(q,"next")!==false){q.$elts.nextBtn.trigger("enable")}else{q.$elts.nextBtn.trigger("disable")}if(q.params.pagination){q.$elts.paginationBtns.removeClass("active").filter(function(){return(g(this).data("firstStep")==q.steps.first)}).addClass("active")}}function f(q){q.delayAutoSlide=window.setTimeout(function(){q.autoSlideInterval=window.setInterval(function(){e(q,j(q,"next"))},q.params.autoSlideInterval)},q.params.delayAutoSlide)}function m(q){window.clearTimeout(q.delayAutoSlide);window.clearInterval(q.autoSlideInterval);q.params.delayAutoSlide=0}function a(r){var q=r.$elts.stopSlideBtn;q.bind({play:function(){f(r);q.removeClass("pause").addClass("play").html(r.params.stopSlideTextPause)},pause:function(){m(r);q.removeClass("play").addClass("pause").html(r.params.stopSlideTextPlay)}});q.click(function(s){if(q.is(".play")){q.trigger("pause")}else{if(q.is(".pause")){q.trigger("play")}}});q.prependTo(r.$elts.wrap)}function p(q){return q.$elts.pagination.children().length}function b(q){return q.steps.first/q.params.dispItems}function h(q){q.$elts.carousel.prepend(q.$elts.loader);g.ajax({url:q.params.ajaxUrl,dataType:"json",success:function(r){q.lastItemsToLoad=r.bLastItemsToLoad;g(q.$elts.content).append(r.shtml);q.steps={first:q.steps.first+q.params.dispItems,count:q.$elts.content.children().length};q.steps.last=q.steps.count-1;c(q);k(q,q.steps.first);e(q,q.steps.first);if(q.params.stopSlideBtn==true){q.$elts.stopSlideBtn.trigger("pause")}else{m(q)}q.$elts.loader.remove()}})}})(jQuery);


/*
 * jQuery selectbox plugin
 *
 * Copyright (c) 2007 Sadri Sahraoui (brainfault.com)
 * Licensed under the GPL license and MIT:
 *   http://www.opensource.org/licenses/GPL-license.php
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * The code is inspired from Autocomplete plugin (http://www.dyve.net/jquery/?autocomplete)
 *
 * Revision: $Id$
 * Version: 0.5
 * 
 * Changelog :
 *  Version 0.5 
 *  - separate css style for current selected element and hover element which solve the highlight issue 
 *  Version 0.4
 *  - Fix width when the select is in a hidden div   @Pawel Maziarz
 *  - Add a unique id for generated li to avoid conflict with other selects and empty values @Pawel Maziarz
 */

/* pawel maziarz: work around for ie logging */
if (!window.console) {
	var console = {
		log: function(msg) { 
	 }
	}
}
/* */

jQuery.SelectBox = function(selectobj, options) {
	
	var opt = options || {};
	opt.inputClass = opt.inputClass || "selectbox";
	opt.containerClass = opt.containerClass || "selectbox-wrapper";
	opt.hoverClass = opt.hoverClass || "current";
	opt.currentClass = opt.selectedClass || "selected"
	opt.debug = opt.debug || false;
	
	var elm_id = selectobj.id;
	var active = -1;
	var inFocus = false;
	var hasfocus = 0;
	//jquery object for select element
	var $select = $(selectobj);
	// jquery container object
	var $container = setupContainer(opt);
	//jquery input object 
	var $input = setupInput(opt);
	// hide select and append newly created elements
	$select.hide().before($input).before($container);
	
	
	init();
	
	$input
	.click(function(){
    if (!inFocus) {
		  $container.toggle();
		}
	})
	.focus(function(){
	   if ($container.not(':visible')) {
	       inFocus = true;
	       $container.show();
	   }
	   $("#location-list_input").addClass('input_has_focus');
	})
	.keydown(function(event) {	   
		switch(event.keyCode) {
			case 38: // up
				event.preventDefault();
				moveSelect(-1);
				break;
			case 40: // down
				event.preventDefault();
				moveSelect(1);
				break;
			//case 9:  // tab 
			case 13: // return
				event.preventDefault(); // seems not working in mac !
				$('li.'+opt.hoverClass).trigger('click');
				break;
			case 27: //escape
			  hideMe();
			  break;
		}
		
	})
	.blur(function() {
		if ($container.is(':visible') && hasfocus > 0 ) {
			if(opt.debug) console.log('container visible and has focus')
			//console.log('A');
		} else {
			hideMe();	
			$("#location-list_input").removeClass('input_has_focus');
		}
	});


	function hideMe() { 
		hasfocus = 0;
		$container.hide(); 
	}
	
	function init() {
		$container.append(getSelectOptions($input.attr('id'))).hide();
		var width = $input.css('width');
		$container.width(width);
    }
	
	function setupContainer(options) {
		var container = document.createElement("div");
		$container = $(container);
		$container.attr('id', elm_id+'_container');
		$container.addClass(options.containerClass);
		
		return $container;
	}
	
	function setupInput(options) {
		var input = document.createElement("input");
		var $input = $(input);
		$input.attr("id", elm_id+"_input");
		$input.attr("type", "text");
		$input.addClass(options.inputClass);
		$input.attr("autocomplete", "off");
		$input.attr("readonly", "readonly");
		$input.attr("tabIndex", $select.attr("tabindex")); // "I" capital is important for ie
		
		return $input;	
	}
	
	function moveSelect(step) {
		var lis = $("li", $container);
		if (!lis) return;

		active += step;

		if (active < 0) {
			active = 0;
		} else if (active >= lis.size()) {
			active = lis.size() - 1;
		}

		lis.removeClass(opt.hoverClass);

		$(lis[active]).addClass(opt.hoverClass);
	}
	
	function setCurrent() {	
		var li = $("li."+opt.currentClass, $container).get(0);
		var ar = (''+li.id).split('_');
		var el = ar[ar.length-1];
		$select.val(el);
		$input.val($(li).html());
		return true;
	}
	
	// select value
	function getCurrentSelected() {
		return $select.val();
	}
	
	// input value
	function getCurrentValue() {
		return $input.val();
	}
	
	function getSelectOptions(parentid) {
		var select_options = new Array();
		var ul = document.createElement('ul');
		$select.children('option').each(function() {
			var li = document.createElement('li');
			li.setAttribute('id', parentid + '_' + $(this).val());
			li.innerHTML = $(this).html();
			if ($(this).is(':selected')) {
				$input.val($(this).html());
				$(li).addClass(opt.currentClass);
			}
			ul.appendChild(li);
			$(li)
			.mouseover(function(event) {
				hasfocus = 1;
				if (opt.debug) console.log('over on : '+this.id);
				jQuery(event.target, $container).addClass(opt.hoverClass);
			})
			.mouseout(function(event) {
				hasfocus = -1;
				if (opt.debug) console.log('out on : '+this.id);
				jQuery(event.target, $container).removeClass(opt.hoverClass);
			})
			.click(function(event) {
			  var fl = $('li.'+opt.hoverClass, $container).get(0);
				if (opt.debug) console.log('click on :'+this.id);
				$('li.'+opt.currentClass).removeClass(opt.currentClass); 
				$(this).addClass(opt.currentClass);
				setCurrent();
				hideMe();
				$("#location-list_input").removeClass('input_has_focus');
			});
		});
		return ul;
	}
	
};

jQuery.fn.extend({
	selectbox: function(options) {
		return this.each(function() {
			new jQuery.SelectBox(this, options);
		});
	}
});


/*
 * jqModal - Minimalist Modaling with jQuery
 *   (http://dev.iceburg.net/jquery/jqModal/)
 *
 * Copyright (c) 2007,2008 Brice Burgess <bhb@iceburg.net>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * $Version: 03/01/2009 +r14
 */
(function($) {
$.fn.jqm=function(o){
var p={
overlay: 50,
overlayClass: 'jqmOverlay',
closeClass: 'jqmClose',
trigger: '.jqModal',
ajax: F,
ajaxText: '',
target: F,
modal: F,
toTop: F,
onShow: F,
onHide: F,
onLoad: F
};
return this.each(function(){if(this._jqm)return H[this._jqm].c=$.extend({},H[this._jqm].c,o);s++;this._jqm=s;
H[s]={c:$.extend(p,$.jqm.params,o),a:F,w:$(this).addClass('jqmID'+s),s:s};
if(p.trigger)$(this).jqmAddTrigger(p.trigger);
});};

$.fn.jqmAddClose=function(e){return hs(this,e,'jqmHide');};
$.fn.jqmAddTrigger=function(e){return hs(this,e,'jqmShow');};
$.fn.jqmShow=function(t){return this.each(function(){t=t||window.event;$.jqm.open(this._jqm,t);});};
$.fn.jqmHide=function(t){return this.each(function(){t=t||window.event;$.jqm.close(this._jqm,t)});};

$.jqm = {
hash:{},
open:function(s,t){var h=H[s],c=h.c,cc='.'+c.closeClass,z=(parseInt(h.w.css('z-index'))),z=(z>0)?z:3000,o=$('<div></div>').css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:c.overlay/100});if(h.a)return F;h.t=t;h.a=true;h.w.css('z-index',z);
 if(c.modal) {if(!A[0])L('bind');A.push(s);}
 else if(c.overlay > 0)h.w.jqmAddClose(o);
 else o=F;

 h.o=(o)?o.addClass(c.overlayClass).prependTo('body'):F;
 if(ie6){$('html,body').css({height:'100%',width:'100%'});if(o){o=o.css({position:'absolute'})[0];for(var y in {Top:1,Left:1})o.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'");}}

 if(c.ajax) {var r=c.target||h.w,u=c.ajax,r=(typeof r == 'string')?$(r,h.w):$(r),u=(u.substr(0,1) == '@')?$(t).attr(u.substring(1)):u;
  r.html(c.ajaxText).load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));e(h);});}
 else if(cc)h.w.jqmAddClose($(cc,h.w));

 if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);	
 (c.onShow)?c.onShow(h):h.w.show();e(h);return F;
},
close:function(s){var h=H[s];if(!h.a)return F;h.a=F;
 if(A[0]){A.pop();if(!A[0])L('unbind');}
 if(h.c.toTop&&h.o)$('#jqmP'+h.w[0]._jqm).after(h.w).remove();
 if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove();} return F;
},
params:{}};
var s=0,H=$.jqm.hash,A=[],ie6=$.browser.msie&&($.browser.version == "6.0"),F=false,
i=$('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),
e=function(h){if(ie6)if(h.o)h.o.html('<p style="width:100%;height:100%"/>').prepend(i);else if(!$('iframe.jqm',h.w)[0])h.w.prepend(i); f(h);},
f=function(h){try{$(':input:visible',h.w)[0].focus();}catch(_){}},
L=function(t){$()[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m);},
m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents('.jqmID'+h.s)[0]);if(r)f(h);return !r;},
hs=function(w,t,c){return w.each(function(){var s=this._jqm;$(t).each(function() {
 if(!this[c]){this[c]=[];$(this).click(function(){for(var i in {jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return F;});}this[c].push(s);});});};
})(jQuery);



/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.2
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
$.fn.pagination = function(maxentries, opts){
	opts = jQuery.extend({
		items_per_page:10,
		num_display_entries:10,
		current_page:0,
		num_edge_entries:0,
		link_to:"#",
		prev_text:"Prev",
		next_text:"Next",
		ellipse_text:"...",
		prev_show_always:true,
		next_show_always:true,
		callback:function(){return false;}
	},opts||{});
	
	return this.each(function() {
		/**
		 * Calculate the maximum number of pages
		 */
		function numPages() {
			return Math.ceil(maxentries/opts.items_per_page);
		}
		
		/**
		 * Calculate start and end point of pagination links depending on 
		 * current_page and num_display_entries.
		 * @return {Array}
		 */
		function getInterval()  {
			var ne_half = Math.ceil(opts.num_display_entries/2);
			var np = numPages();
			var upper_limit = np-opts.num_display_entries;
			var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
			var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
			return [start,end];
		}
		
		/**
		 * This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number
		 */
		function pageSelected(page_id, evt){
			current_page = page_id;
			drawLinks();
			var continuePropagation = opts.callback(page_id, panel);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
				else {
					evt.cancelBubble = true;
				}
			}
			return continuePropagation;
		}
		
		/**
		 * This function inserts the pagination links into the container element
		 */
		function drawLinks() {
			panel.empty();
			var interval = getInterval();
			var np = numPages();
			// This helper function returns a handler function that calls pageSelected with the right page_id
			var getClickHandler = function(page_id) {
				return function(evt){ return pageSelected(page_id,evt); }
			}
			// Helper function for generating a single link (or a span tag if it's the current page)
			var appendItem = function(page_id, appendopts){
				page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
				appendopts = jQuery.extend({text:page_id+1, classes:""}, appendopts||{});
				if(page_id == current_page){
					var lnk = jQuery("<span class='current'>"+(appendopts.text)+"</span>");
				}
				else
				{
					var lnk = jQuery("<a>"+(appendopts.text)+"</a>")
						.bind("click", getClickHandler(page_id))
						.attr('href', opts.link_to.replace(/__id__/,page_id));
						
						
				}
				if(appendopts.classes){lnk.addClass(appendopts.classes);}
				panel.append(lnk);
			}
			// Generate "Previous"-Link
			if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
				appendItem(current_page-1,{text:opts.prev_text, classes:"prev"});
			}
			// Generate starting points
			if (interval[0] > 0 && opts.num_edge_entries > 0)
			{
				var end = Math.min(opts.num_edge_entries, interval[0]);
				for(var i=0; i<end; i++) {
					appendItem(i);
				}
				if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
				{
					jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
			}
			// Generate interval links
			for(var i=interval[0]; i<interval[1]; i++) {
				appendItem(i);
			}
			// Generate ending points
			if (interval[1] < np && opts.num_edge_entries > 0)
			{
				if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
				{
					jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
				var begin = Math.max(np-opts.num_edge_entries, interval[1]);
				for(var i=begin; i<np; i++) {
					appendItem(i);
				}
				
			}
			// Generate "Next"-Link
			if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
				appendItem(current_page+1,{text:opts.next_text, classes:"next"});
			}
		}
		
		// Extract current_page from options
		var current_page = opts.current_page;
		// Create a sane value for maxentries and items_per_page
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		// Store DOM element for easy access from all inner functions
		var panel = jQuery(this);
		// Attach control functions to the DOM element 
		this.selectPage = function(page_id){ pageSelected(page_id);}
		this.prevPage = function(){ 
			if (current_page > 0) {
				pageSelected(current_page - 1);
				return true;
			}
			else {
				return false;
			}
		}
		this.nextPage = function(){ 
			if(current_page < numPages()-1) {
				pageSelected(current_page+1);
				return true;
			}
			else {
				return false;
			}
		}
		// When all initialisation is done, draw the links
		drawLinks();
        // call callback function
        opts.callback(current_page, this);
	});
}


