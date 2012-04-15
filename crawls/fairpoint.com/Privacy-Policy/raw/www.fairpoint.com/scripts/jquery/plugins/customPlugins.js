/**
 * jQuery Custom Plugins
 *
 * @author	FairPoint
 * @version	1.0
 *
 * Dependancies:
 * jQuery Library (This version is written and tested with jQuery 1.4)
**/

/*======================== Plugin: capsuleTab()											  =================== */
/* ======================= Creates capsule tabs, i.e. rounded cornered first and last tab =================== */
/*
	USAGE: 
		* Attach jQuery library
		* Attach customPlugins.js
		* Make sure, you have capsuleTab CSS attached. Currently using from common.css
		  "styles for capsule tabs start" through "styles for capsule tabs end" section
		* Write your tab markup. You must use <ul> or <ol> and then write each tab text inside <li>
		* on document ready, call: $('your jQuery selector').capsuleTab(options, callbackFunction);
		  Example: $('.capsule-tab').capsuleTab(); or
		  		   $('.capsule-tab').capsuleTab({defaultTab: 1}, function(){alert('tab initialization done');});
				   
		* Options:
			tabEvent: 'click' or 'hover' 									| default: 'click'
			defaultTab: index of tab starting from 0 						| default: 0
			mapTo: classname of the content divs for the tab 				| default: '.capsule-tab-content'
			debugMode: whether to display verbose output? true or false 	| default: false
		
		* callback function: Optional. A callback function can be passed, and it will be executed after tabs are ready.
*/

//The jQuery wrapper to avoid any conflict with other JS libraries
(function( $ ){

//Check and load/initialize any pre-requisits (any other js lib. or any variable initialization etc.) HERE


//Constructor function
  $.fn.capsuleTab = function(options, callbackFnk) {
		if(options && options.debugMode)	{
		  $.fn.capsuleTab.defaults.debugMode = options.debugMode;
		  _debug('Fired capsuleTab constructor');
		  _debug('Debug Mode is: '+options.debugMode);
		}
		
		// Build main options before iteration
		if (options) { 
			var opts = $.extend({}, $.fn.capsuleTab.defaults, options);
			$.fn.capsuleTab.defaults.debugMode = options.debugMode;
			if(typeof callbackFnk == 'function'){
			   opts.callBack = callbackFnk;
			}
		} else {
			var opts = $.extend({}, $.fn.capsuleTab.defaults, {});
		}
	
		return this.each(function() {
	
			//Assigning container UL reference into the options object
			opts.container = $(this);
			
			//Setup and prepare the DOM elements for action
			opts.list = (opts.container.is('ul') || opts.container.is('ol'))? true : false;
			opts.listItems = (opts.list)? opts.container.children('li') : null;
			opts.listLength = (opts.list && opts.listItems.length > 0)? opts.listItems.length : 0;
			
			if(opts.list && opts.listLength) {
				opts.container.addClass('capsule-tab');
				if(opts.listLength) {
					if(opts.debugMode) _debug('Preparing markup...');
					if(opts.debugMode) _debug('Identifying first and last list item and assigning them with proper class...');
					opts.container.children('li:first').addClass('first');
					opts.container.children('li:last').addClass('last');
					opts.container.children('li:gt(0)').css({'border-left':'1px #ccc solid'});
					if(opts.debugMode) _debug('Adding start cap and end cap...');
					opts.container.prepend('<li class="caps"></li>');
					opts.container.append('<li class="cape"></li>');
					
				}
				if(opts.debugMode) _debug('Okay to go...');
				opts.listItems.each(function(c){
					var lItem = $(this);
					//if(opts.debugMode) _debug(lItem.css('backgroundPosition'));
					if(opts.list && lItem.is('li')) {
						if(opts.debugMode) _debug('Is LI: '+true+'. Count: '+c+'. Binding click and hover events to it...');
						lItem.addClass('c-reg');
						lItem.hover(function(){
							if(!lItem.hasClass('active')) {
								if(c == 0){lItem.prev().addClass('hover').css({'background-position': '0px -22px'});}
								if(c == opts.listLength-1){lItem.next().addClass('hover').css({'background-position': 'right -22px'});}
								lItem.css({'background-position': '0px -66px'}).addClass('hover');
							}
						},function(){
							if(!lItem.hasClass('active')) {
								if(c == 0){lItem.prev().removeClass('hover').css({'background-position': '0px 0px'});}
								if(c == opts.listLength-1){lItem.next().removeClass('hover').css({'background-position': 'right 0px'});}
								lItem.css({'background-position': '0px -44px'}).removeClass('hover');
							}
						}).bind(opts.tabEvent, function(){
							$(opts.mapTo).hide();
							opts.container.children('li').each(function(c){
								if(c==0){
									$(this).css({'background-position':'0 0'});
								} else if(c == opts.container.children('li').length-1){
									$(this).css({'background-position':'right 0'});
								} else {
									$(this).css({'background-position': '0 -44px'});
								}
								$(this).removeClass('active').removeClass('hover');
							});
							if(c == 0){lItem.prev().addClass('active').css({'background-position': '0px -22px'});}
							if(c == opts.listLength-1){lItem.next().addClass('active').css({'background-position': 'right -22px'});}
							lItem.css({'background-position': '0px -66px'}).addClass('active');
							$(opts.mapTo).eq(c).show();
						});
					}
				});
				if(opts.debugMode) _debug('Storing default BG positions...');
				opts.container.children('li').each(function(){
					$(this).data('bgPos',$(this).css('backgroundPosition'));
				});
				if(opts.debugMode) _debug('Activating the default/selected tab...');
				$(opts.mapTo).hide();
				opts.container.children('li').removeClass('active');
				if(opts.defaultTab == 0) {opts.container.children('li:first').addClass('active').css({'background-position': '0px -22px'})}
				if(opts.defaultTab == opts.listLength-1) {opts.container.children('li:last').addClass('active').css({'background-position': 'right -22px'})}
				opts.listItems.eq(opts.defaultTab).addClass('active').css({'background-position': '0px -66px'});
				if(opts.debugMode) _debug('Making content visible mapped to selected tab...');
				$(opts.mapTo).eq(opts.defaultTab).show();
				if(opts.callBack)	opts.callBack.call(opts);
			} else {
				if(opts.debugMode) _debug('Invalid markup found... terminating...');
				return false;
			}
		
		});

	}
  
  /*$.fn.capsuleTab.sampleFunc = function(opts) {
	  if(opts.debugMode) _debug('sampleFunc called');
  	var localVar = null;
		
  	try{
		
	}catch(err) {
		
	}
  }*/
  	
	// Default settings
	$.fn.capsuleTab.defaults =
	{
		tabEvent: 'click',
		defaultTab: 0,
		mapTo: '.capsule-tab-content',
		debugMode: false
	};
	
//End of closure  
})( jQuery );
/*======================== Plugin: capsuleTab()											            =================== */
/* ======================= Creates capsule tabs, i.e. rounded cornered first and last tab ends here =================== */


/*======================== Plugin: fpTopNav()											  =================== */
/* ======================= Creates Top Navigation for fairpoint.com website =================== */
/*
	USAGE: 
		* Attach jQuery library
		* Attach customPlugins.js
		* Make sure, you have fpTopNav CSS attached. Currently using from common.css
		* Write your menu markup as <ul>, <li>, or provide a URL of XML containing menu data. Refer: /common_module/top-menu.xml
		* on document ready, call: $('your jQuery selector').fpTopNav(options, callbackFunction);
				   
		* Options:
		
		* callback function: Optional. A callback function can be passed, and it will be executed after menu is ready.
*/

//The jQuery wrapper to avoid any conflict with other JS libraries
(function( $ ){

//Check and load/initialize any pre-requisits (any other js lib. or any variable initialization etc.) HERE


//Constructor function
  $.fn.fpTopNav = function(options, callbackFnk) {
		if(options && options.debugMode)	{
		  $.fn.fpTopNav.defaults.debugMode = options.debugMode;
		  _debug('Fired fpTopNav constructor');
		  _debug('Debug Mode is: '+options.debugMode);
		}
		
		// Build main options before iteration
		if (options) { 
			var opts = $.extend({}, $.fn.fpTopNav.defaults, options);
			$.fn.fpTopNav.defaults.debugMode = options.debugMode;
			if(typeof callbackFnk == 'function'){
			   opts.callBack = callbackFnk;
			}
		} else {
			var opts = $.extend({}, $.fn.fpTopNav.defaults, {});
		}
		
		if(!opts.drawIn || !opts.tabList) {
			if(opts.debugMode) _debug('Doesn\'t meet minimum requirement... Missing necessary values for drawIn and/or tabList... \nTerminating...');
			return false;
		}
	
		return this.each(function() {
			if(opts.debugMode) _debug(opts);
			if(opts.debugMode) _debug(opts.drawIn);
			if(opts.debugMode) _debug(opts.tabList);
			
			opts.selectedTab = $('li.active', opts.tabList);
			opts.selectedIndex = opts.selectedTab.index();
			if(opts.debugMode) _debug("Tab Index: "+opts.selectedIndex);
			
			if(!opts.navList) {
				if(opts.debugMode) _debug("No static markup found for the menu");
				
				if(!opts.navXML) {
					if(opts.debugMode) _debug('Unable to create menu. CAUSE: Neither static markup nor XML provided');
					if(opts.debugMode) _debug('Terminating');
					return false;
				} else {
					if(opts.debugMode) _debug("XML is provided... retrieving menu details");
					
					$.ajax({
						url: opts.navXML,
				  		dataType: 'xml',
						error: function(){
						    if(opts.debugMode) _debug('Error fetching XML via AJAX');
							if(opts.debugMode) _debug('Terminating');
							return false;
						},
						success: function(xmlData){
							if(opts.debugMode) _debug('XML loaded successfully... processing...');
							opts.xmlLoadedData = xmlData;
							opts.xmlLoaded = true;
							opts.xmlMarkerLength = (opts.xmlLoaded && $('tab',xmlData).length > 0)? $('tab',xmlData).length : 0;
							if(opts.xmlLoaded && opts.xmlMarkerLength) {
								if(opts.debugMode) _debug(opts.selectedIndex);
								opts.currentTabNav = $(opts.xmlLoadedData).find('tab:eq('+opts.selectedIndex+')').find('menu');
								if(opts.debugMode) _debug('Fetched navigation data for this page from XML');
								if(opts.debugMode) _debug(opts.currentTabNav);
								if(opts.debugMode) _debug('Building markup from XML...');
								
								opts.navMarkup = $.fn.fpTopNav.buildMainMenu(opts);
								
								if(opts.debugMode) _debug(opts.navMarkup);
								opts.drawIn.html(opts.navMarkup);
								
								$.fn.fpTopNav.bindEvents(opts);
							}
						}
					});
				}
			} else {
				if(!opts.navList.length) {
					if(opts.debugMode) _debug('Navigation elements not found.\nTerminating...');
					return false;
				} else {
					if(opts.debugMode) _debug('Thanks for saving my work... found markup of menu...');
				}
			}
		});
	}
	
	$.fn.fpTopNav.bindEvents = function(opts) {
		//Bind of events start from here...
		$('.'+opts.subMenuClass, '.'+opts.navListclass).addClass('safehide');
		$('.'+opts.navListclass+'>.'+opts.mainMenuClass+'>a').mouseover(function(){
			_debug('Hovered on: '+$(this).text());
			var currItem = $(this);
			currItem.next('ul').removeClass('safehide').addClass('safeshow').appendTo($(document.body)).position({
				my: 'left top',
				at: 'left bottom',
				of: currItem,
				offset: '0 -2',
				collision: 'none'
			});
		}).mouseout(function(){
			_debug('Mouse out from: '+$(this).text());
			var currItem = $(this);
			currItem.next('ul').removeClass('safeshow').addClass('safehide');
		});
	}
	
	$.fn.fpTopNav.buildMainMenu = function(opts) {
		var menuMarkup = '<ul class="'+opts.navListclass+'">';
		opts.currentTabNav.each(function(c){
			var currMenu =$(this);
			if(opts.debugMode) _debug(currMenu.attr('label'));
			var navUrl = (currMenu.attr('url'))? currMenu.attr('url') : '#';
			var navTitle = (currMenu.attr('title'))? currMenu.attr('title') : $(this).attr('label');
			var hasSubMenu = currMenu.is(':parent');
			if(opts.debugMode) _debug('hasSubMenu: '+hasSubMenu);
			var navClassTxt = (hasSubMenu)? 'class="'+opts.mainMenuClass+'"' : '';
			var subMenus = (hasSubMenu)? currMenu.children() : null;
			if(opts.debugMode) _debug('Submenu in '+currMenu.attr('label')+' menu: ');
			if(opts.debugMode) _debug(subMenus);
			
			menuMarkup += '<li '+navClassTxt+'>';
			menuMarkup += '<a href="'+navUrl+'" title="'+navTitle+'">'+currMenu.attr('label')+'</a>';
			if(hasSubMenu) {
				menuMarkup += $.fn.fpTopNav.buildSubMenu(subMenus, opts);
			}
			menuMarkup += '</li>';
		});
		menuMarkup += '</ul>';
		return menuMarkup;
	}
	
	$.fn.fpTopNav.buildSubMenu = function(nodes, opts) {
		if(opts.debugMode) _debug('buildSubMenu called, and nodes are: ');
		if(opts.debugMode) _debug(nodes);
			
		var nodeMarkup = '<ul class="'+opts.subMenuClass+' safehide">';
		nodes.each(function(){
			var currNode = $(this);
			var nodeUrl = (currNode.attr('url'))? currNode.attr('url') : '#';
			var nodeTitle = (currNode.attr('title'))? currNode.attr('title') : $(this).attr('label');
			var hasSubMenu = currNode.is(':parent');
			var subMenus = (hasSubMenu)? currNode.children() : null;
			
			nodeMarkup += '<li>';
			nodeMarkup += '<a href="'+nodeUrl+'" title="'+nodeTitle+'">'+currNode.attr('label')+'</a>';
			if(opts.debugMode) _debug('Submenu '+currNode.attr('label')+' has submenu -> '+hasSubMenu+': ');
			if(opts.debugMode) _debug(subMenus);
			if(hasSubMenu) {
				nodeMarkup += $.fn.fpTopNav.buildSubMenu(subMenus, opts);
			}
			nodeMarkup += '</li>';
		});
		nodeMarkup += '</ul>';
		
		return nodeMarkup;
	}
  
  /*$.fn.fpTopNav.sampleFunc = function(opts) {
	  if(opts.debugMode) _debug('sampleFunc called');
  	var localVar = null;
		
  	try{
		
	}catch(err) {
		
	}
  }*/
  	
	// Default settings
	$.fn.fpTopNav.defaults =
	{
		drawIn: null,
		tabList: null,
		navList: null,
		navXML: '/common_module/top-menu.xml',
		navListclass: 'top-drop-down',
		mainMenuClass: 'menu',
		subMenuClass: 'sub-menu',
		navEvent: 'mouseover',
		debugMode: false
	};
	
//End of closure  
})( jQuery );
/*======================== Plugin: fpTopNav()											            =================== */
/* ======================= Creates Top Navigation for fairpoint.com website ends here =================== */


/*$(function(){
	$('.navigation').fpTopNav({
		debugMode: false,
		drawIn: $('.fp-header-nav>.navigation'),
		tabList: $('.fp-header-tabs')
	});
});*/



/*======================== Plugin: fpHiliteBox()											  =================== */
/* ======================= Creates and adjusts Highlight module starts here =================== */


//The jQuery wrapper to avoid any conflict with other JS libraries
(function( $ ){

//Check and load/initialize any pre-requisits (any other js lib. or any variable initialization etc.) HERE


//Constructor function
  $.fn.fpHiliteBox = function(options, callbackFnk) {
		if(options && options.debugMode)	{
		  $.fn.fpHiliteBox.defaults.debugMode = options.debugMode;
		  _debug('Fired fpHiliteBox constructor');
		  _debug('Debug Mode is: '+options.debugMode);
		}
		
		// Build main options before iteration
		if (options) { 
			var opts = $.extend({}, $.fn.fpHiliteBox.defaults, options);
			$.fn.fpHiliteBox.defaults.debugMode = options.debugMode;
			if(typeof callbackFnk == 'function'){
			   opts.callBack = callbackFnk;
			}
		} else {
			var opts = $.extend({}, $.fn.fpHiliteBox.defaults, {});
		}

		return this.each(function() {
			var container = $(this);
			var boxes = $(this).children('ul');
			var boxWidth = 0;
			var aBoxWidth = Math.floor((container.parent().outerWidth()/boxes.length) - (boxes.length*2));
			
			container.addClass('hilite');
			
			if(opts.debugMode) _debug("aBoxWidth: "+aBoxWidth);
			
			//container.wrap('<div class="shadow" />');
			var ulWidth = 0;
			if(boxes.length == 4)
				ulWidth = 242;
			else if(boxes.length == 3)
			{
				ulWidth = 323;
				if($(this).hasClass("service-support-wrapper"))
					ulWidth = 233;
			}
			else if(boxes.length == 2)
			{
				ulWidth = 323;
			}
			boxes.each(function(c){
				var box = $(this);
				box.addClass(opts.boxClasses[c]);
				box.children(':first').addClass(opts.headerClass);
				box.children(':eq(1)').addClass(opts.bodyClass);
				box.children(':last').addClass(opts.footerClass);
				
				if(opts.mode == 'liquid') box.width(aBoxWidth);
				if(opts.debugMode) _debug('boxWidth:: '+boxWidth);
				
				if(box.find("img").length)
				{
					if(box.find("img[width]").length)
						box.width(box.find("img").width());
					else
						box.width(ulWidth);
				}
				boxWidth += box.outerWidth();
			});
			
			container.width(boxWidth);
			if(opts.shadow) container.addClass('shadow');
			
			boxes.find('li:eq(1)').eqHeight({adjustChild: {nodeIndex: 1}});
			if(opts.engrave.index) {
				if(opts.debugMode) _debug('Index of box to be engraved: '+opts.engrave.index);
				
				var engLeft = (opts.engrave.index > 0)? (aBoxWidth*opts.engrave.index)-(opts.engrave.index*2) : aBoxWidth*opts.engrave.index;
				engLeft = (opts.engrave.index == opts.maxBoxes-1)? engLeft-3 : engLeft;
				if($.browser.msie && parseInt($.browser.version) <= 7) {
					var cBox = $('.hilite-internet-landing');
					cBox.css({position: 'absolute'});
					cBox.parent().height(cBox.height());
					
					boxes.eq(opts.engrave.index).addClass('ie-engrave').css({left: engLeft+opts.engrave.offset});
					boxes.eq(opts.engrave.index).before('<ul class="ie-shade" />');
					if(opts.mode == 'liquid') {
						$('.ie-shade').width(aBoxWidth).height(boxes.eq(opts.engrave.index).height()-8).css({left: engLeft-5});
					}
				} else {	
					boxes.eq(opts.engrave.index).addClass('engrave').css({left: engLeft+opts.engrave.offset});
				}
			
				var afterEngv = boxes.filter(':gt('+opts.engrave.index+')');
				
				if(opts.debugMode) _debug(boxes.filter(':gt('+opts.engrave.index+')'));
				
				afterEngv.nextAll('.clear').remove();
				afterEngv.each(function(c){
					var adAfter = container.children().length-(c+1);
					if(c != afterEngv.length-1)
						container.children(':eq('+adAfter+')').after($(this));
					$(this).css({float: 'right'});
				});
			}

			
			opts.maxHeight = 0;
			container.find('ul[class^="box"]').each(function(c){
				var thisHeight = $(this).height();
				if(thisHeight > opts.maxHeight) {
					opts.maxHeight = thisHeight;
					opts.tallest = $(this);
				}
				if(c > 0 && !$(this).hasClass('engrave')) {
					$(this).css({'border-left': 'none'});
					container.width(container.width()-1);
				}
				$(this).find('li:eq(1)>ul>li:last-child').addClass('last');
			});
			if(opts.engrave.index) container.width(container.width()+25);
			if(opts.equalize) {
				_debug("Equalizing: "+opts.equalize);
				boxes.eqHeight({adjustChild: {nodeIndex: opts.equalize}});
			}
			_debug(opts.maxHeight);
			container.height(opts.maxHeight);
			container.append('<div class="clear"></div>');
			if($.browser.msie && parseInt($.browser.version) <= 8) {
				boxes.find('li:last-child').height(18);
			}
		});
	}
  	
	// Default settings
	$.fn.fpHiliteBox.defaults =
	{
		boxClasses: ['box1','box2','box3','box4'],
		bodyClass:	'bdy',
		engrave: {index: false, offset: 0},
		footerClass: 'ftr',
		headerClass: 'hdr',
		maxBoxes: 4,
		mode: 'liquid', //fixed/liquid
		shadow: true,
		debugMode: true
	};
	
//End of closure  
})( jQuery );
/*======================== Plugin: fpHiliteBox()											            =================== */
/* ======================= Creates and adjusts Highlight module ends here =================== */


/*======================== Plugin: eqHeight()													   =================== */
/* ======================= GETS THE HEIGHT OF HEIGHEST DIV AND SETS TO ALL OTHER DIVs IN THE ARRAY =================== */

(function( $ ){

//Constructor function
  $.fn.eqHeight = function(options, callbackFnk) {
		if(options && options.debugMode)	{
		  _debug('Fired eqHeight constructor');
		  _debug('Debug Mode is: '+options.debugMode);
		}

		// Build main options before element iteration
		if (options) {
			var opts = $.extend({}, $.fn.eqHeight.defaults, options);
			$.fn.eqHeight.defaults.debugMode = options.debugMode;
			if(typeof callbackFnk == 'function'){
			   opts.callBack = callbackFnk;
			}
		} else {
			var opts = $.extend({}, $.fn.eqHeight.defaults, {});
		}
		opts.maxHeight = (opts.minH)? opts.minH : 0;

		$.fn.eqHeight.getMaxHeight(this,opts);

		if((opts.maxH) && opts.maxHeight > opts.maxH) opts.maxHeight = opts.maxH;

		return this.each(function() {
			if(opts.adjustChild.nodeIndex && typeof(opts.adjustChild.nodeIndex) === 'number') {
				var nodes = $(this).children();
				var theNode = nodes.eq(opts.adjustChild.nodeIndex);
				var otherHeights = 0;
				var heightToSet = 0;
				var paddings = (theNode.css('padding-top') && theNode.css('padding-bottom'))? parseInt(theNode.css('padding-top').replace("px","")) + parseInt(theNode.css('padding-bottom').replace("px","")) : 0;
				nodes.each(function(c){
					if(c != opts.adjustChild.nodeIndex) {
						otherHeights += $(this).innerHeight();
					}
				});
				heightToset = (opts.maxHeight - paddings) - otherHeights;
				theNode.height(heightToset);
				$(this).height(opts.maxHeight);
				if(opts.maxH) $(this).css("overflow","auto");
				if(opts.callBack)	opts.callBack.call(opts);
			} else {
				$(this).height(opts.maxHeight);
				if(opts.maxH) $(this).css("overflow","auto");
				if(opts.callBack)	opts.callBack.call(opts);
			}
		});
	}

	$.fn.eqHeight.getMaxHeight = function(selectors,opts) {
		selectors.each(function(){
			var thisHeight = $(this).height();
			if(thisHeight > opts.maxHeight) {
				opts.maxHeight = thisHeight;
				opts.tallest = $(this);
			}
		});
	}

	// Default settings
	$.fn.eqHeight.defaults =
	{
		callBack: null,
		adjustChild: {nodeIndex: null},
		maxHeight: 0,
		maxH: 0,
		minH: 0,
		tallest: null,
		debugMode: false
	};
//End of closure
})( jQuery );
/*======================== END OF Plugin: eqHeight()													   =================== */

/*======================== Plugin: numOnly()													   =================== */
/* ======================= Allows to enter only Numbers and use Delete, Backspace, Arrow, Home, End, and Enter keys =================== */
jQuery.fn.numOnly = function()
{
    return this.each(function()
    {
        $(this).bind('contextmenu', function(e){return false;}).keydown(function(e)
        {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
			return (
				(!e.shiftKey && !e.altKey && !e.ctrlKey) && 
				(key == 8 || 	//Backspace
				key == 9 || 	//Tab
				key == 13 || 	//Enter
				key == 46 ||	//Delete
				(key >= 35 && key <= 40) || //Arrow Keys/Home/End
				(key >= 48 && key <= 57) || //Numbers on Keyboard
				(key >= 96 && key <= 105)) //Numbers on Keypad
			);
        });
    });
};

/*======================== END OF Plugin: numOnly()													   =================== */

/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2011 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license) 
	Version: 1.3
*/
(function(a){var b=(a.browser.msie?"paste":"input")+".mask",c=window.orientation!=undefined;a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn"},a.fn.extend({caret:function(a,b){if(this.length!=0){if(typeof a=="number"){b=typeof b=="number"?b:a;return this.each(function(){if(this.setSelectionRange)this.setSelectionRange(a,b);else if(this.createTextRange){var c=this.createTextRange();c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select()}})}if(this[0].setSelectionRange)a=this[0].selectionStart,b=this[0].selectionEnd;else if(document.selection&&document.selection.createRange){var c=document.selection.createRange();a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length}return{begin:a,end:b}}},unmask:function(){return this.trigger("unmask")},mask:function(d,e){if(!d&&this.length>0){var f=a(this[0]);return f.data(a.mask.dataName)()}e=a.extend({placeholder:"_",completed:null},e);var g=a.mask.definitions,h=[],i=d.length,j=null,k=d.length;a.each(d.split(""),function(a,b){b=="?"?(k--,i=a):g[b]?(h.push(new RegExp(g[b])),j==null&&(j=h.length-1)):h.push(null)});return this.trigger("unmask").each(function(){function v(a){var b=f.val(),c=-1;for(var d=0,g=0;d<k;d++)if(h[d]){l[d]=e.placeholder;while(g++<b.length){var m=b.charAt(g-1);if(h[d].test(m)){l[d]=m,c=d;break}}if(g>b.length)break}else l[d]==b.charAt(g)&&d!=i&&(g++,c=d);if(!a&&c+1<i)f.val(""),t(0,k);else if(a||c+1>=i)u(),a||f.val(f.val().substring(0,c+1));return i?d:j}function u(){return f.val(l.join("")).val()}function t(a,b){for(var c=a;c<b&&c<k;c++)h[c]&&(l[c]=e.placeholder)}function s(a){var b=a.which,c=f.caret();if(a.ctrlKey||a.altKey||a.metaKey||b<32)return!0;if(b){c.end-c.begin!=0&&(t(c.begin,c.end),p(c.begin,c.end-1));var d=n(c.begin-1);if(d<k){var g=String.fromCharCode(b);if(h[d].test(g)){q(d),l[d]=g,u();var i=n(d);f.caret(i),e.completed&&i>=k&&e.completed.call(f)}}return!1}}function r(a){var b=a.which;if(b==8||b==46||c&&b==127){var d=f.caret(),e=d.begin,g=d.end;g-e==0&&(e=b!=46?o(e):g=n(e-1),g=b==46?n(g):g),t(e,g),p(e,g-1);return!1}if(b==27){f.val(m),f.caret(0,v());return!1}}function q(a){for(var b=a,c=e.placeholder;b<k;b++)if(h[b]){var d=n(b),f=l[b];l[b]=c;if(d<k&&h[d].test(f))c=f;else break}}function p(a,b){if(!(a<0)){for(var c=a,d=n(b);c<k;c++)if(h[c]){if(d<k&&h[c].test(l[d]))l[c]=l[d],l[d]=e.placeholder;else break;d=n(d)}u(),f.caret(Math.max(j,a))}}function o(a){while(--a>=0&&!h[a]);return a}function n(a){while(++a<=k&&!h[a]);return a}var f=a(this),l=a.map(d.split(""),function(a,b){if(a!="?")return g[a]?e.placeholder:a}),m=f.val();f.data(a.mask.dataName,function(){return a.map(l,function(a,b){return h[b]&&a!=e.placeholder?a:null}).join("")}),f.attr("readonly")||f.one("unmask",function(){f.unbind(".mask").removeData(a.mask.dataName)}).bind("focus.mask",function(){m=f.val();var b=v();u();var c=function(){b==d.length?f.caret(0,b):f.caret(b)};(a.browser.msie?c:function(){setTimeout(c,0)})()}).bind("blur.mask",function(){v(),f.val()!=m&&f.change()}).bind("keydown.mask",r).bind("keypress.mask",s).bind(b,function(){setTimeout(function(){f.caret(v(!0))},0)}),v()})}})})(jQuery)