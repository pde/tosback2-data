function getLeft(x){
	var  n = 0;
  while(x){
		n += x.offsetLeft;
    x = x.offsetParent;
  }
  return n;
}

if(!$defined(window.rtl)){//if flag rtl is not defined create a default ltr 
	window.rtl=false;
}


var CustomPopUp = new Class ({
	el:null,
	target:null,
	others:[],
	class_over:null,
	class_out:null,
	footer:null,
	timer:null, //timer for mouseout
	implements:[Selectors],
	initialize: function(el,target,others,class_over,class_out, footer){
		var me = this;
		this.el = el;
		this.target = target;
		this.isOpen = false;
		this.others=others;
		this.class_over=class_over;
		this.class_out=class_out;
		this.footer=footer;
		//this.position=position;
		this.timer=0;
		  	
    el.addEvent('mouseenter',function(){
			$clear(me.timer);
			var right_coords=$$('#header .left .pad .logo')[0].getCoordinates();
			
			if(!me.footer) {
				me.target.setStyle('display','block');
			}
			
			window.submenuOpen = true;	
            /* if(me.target==$('searchContainerInner')){				
				var increment=$('searchContainerInner').getCoordinates().width;	
				
				while($('searchBox').getCoordinates().bottom<$$('.searchSubmit ')[0].getCoordinates().bottom){
				$('searchContainerInner').setStyle('min-width',increment+'px');	
				increment=increment+20;
				
				}
			} */
			if(me.footer){
			if (rtl==true){
					var x = 0;
					var y = 0;
					me.timer= (
						function(){
							me.target.setStyle('display', 'block');

							me.target.setStyle('top', y);
							me.target.setStyle('right', x);
							if(Browser.Engine.trident){
								me.target.setStyle('left', x);
								if(Browser.Engine.trident4){
									me.target.setStyle('left', x);
									me.target.setStyle('right', y);
								}
							}
						}).delay(500);
						
					me.target.setStyle('display', 'block');
					x = right_coords.right- this.getCoordinates().right-14;
					y = this.getCoordinates().top-me.target.getCoordinates().height+4;
					if(Browser.Engine.trident){
						x = this.getCoordinates().right-me.target.getCoordinates().width+18;
						if(Browser.Engine.trident4){
							x = getLeft(this) - me.target.getCoordinates().width + this.getCoordinates().width + 20;
							y = document.body.getCoordinates().width - this.getCoordinates().width - getLeft(this)-3;
						}
					}
					me.target.setStyle('display', 'none');
				}
			else
				{
					var x = 0;
					var y = 0;
					me.timer= (
						function(){
							me.target.setStyle('display', 'block');

							me.target.setStyle('top',y);
							me.target.setStyle('left',x);
						}).delay(500);
					
					me.target.setStyle('display', 'block');
					x = this.getCoordinates().left - ($('body').getPosition().x+20);
					y = this.getCoordinates().top-me.target.getCoordinates().height+4;
					if(Browser.Engine.trident){
						y = this.getCoordinates().top-me.target.getCoordinates().height+8;
						me.target.setStyle('border-bottom', '4px solid #1E1E1E');
					}
					me.target.setStyle('display', 'none');
				}
			}
			else if (me.footer==false){
				if(rtl==true){
					if(this==$('hnl_l1_p1_trigger')){
						me.target.setStyle('right',right_coords.right-this.getCoordinates().right-5);	
					}
					else{
						me.target.setStyle('right',right_coords.right-this.getCoordinates().right-9);
					}
				}
				else{
				if(this==$('hnl_l1_p1_trigger')){
					me.target.setStyle('left',this.getCoordinates().left-($('body').getPosition().x+11));	
				}
				else{
					me.target.setStyle('left',this.getCoordinates().left-($('body').getPosition().x+15));
				}
				}
			}
			
			if($defined($('communityContainerInner'))){
				if(me.target==$('communityContainerInner')){
				   if(rtl==true){
					if(Browser.Engine.trident4){
						me.target.setStyle('left',this.getCoordinates().left-38);
					}
					else me.target.setStyle('left',this.getCoordinates().left-12);
				   }			
				}
			}
			me.others.each(function(other){
			other.setStyle('display','none');					
			});
			if($('cselector').status) {
				$('cselector').parent.set('tween',{}).tween('background-color','#1E1E1E');
				$('cselector').set('tween',{duration:0}).tween('opacity', 0);
				$('cselector').status=0;
				}          
		});
	
		el.addEvent('mouseleave',function(){
			if(!me.footer) {
				me.timer= (function(){me.target.setStyle('display', 'none');}).delay(500);
			}
			else {
				me.target.setStyle('display', 'none');
			}
			window.submenuOpen = false;
		});

		el.addEvent('focus',function(){
			$clear(me.timer);
			window.submenuOpen = true;
			
if($defined($('communityContainerInner'))){
				if(me.target==$('communityContainerInner')){
					if(!Browser.Engine.trident4){
						me.el.addClass(me.class_over);
					}
					else{
						if(rtl!=true){
							if($defined($('communityContainerInner'))){
								if(me.target==$('communityContainerInner')){
									me.el.setStyle('background', 'url(/us/en/images/i/community_over_462697.gif)');
									me.el.setStyle('height', '35px');
								}
							}
				
						}
					}
				}
			
				
			}				
			me.others.each(function(other){
				other.setStyle('display','none');
			});
		});
		
		//clear the footer timer if the mouse moves away
		el.addEvent('mouseleave',function(){
			if(me.target.getStyle('display') == 'none') {
				$clear(me.timer);
				window.submenuOpen = false;
				
				me.others.each(function(other){
					other.setStyle('display','none');
				});
			}
		});
		
		el.addEvent('keypress',function(e){
			if(e.key=="enter"){	
			    window.submenuOpen = true;
				
					var right_coords=$$('#header .left .pad .logo')[0].getCoordinates();					
					me.target.setStyle('display','block');
					// if(me.target==$('searchContainerInner')){	//Fix for wrapping issues in searchbox			
						// var increment=$('searchContainerInner').getCoordinates().width;	
						
						// while($('searchBox').getCoordinates().bottom<$$('.searchSubmit ')[0].getCoordinates().bottom){
							// $('searchContainerInner').setStyle('min-width',increment+'px');	
							// increment=increment+20;
							// }
					// }
					if(me.footer){
						if (window["rtl"] == true){
							me.target.setStyle('top',this.getCoordinates().top-me.target.getCoordinates().height+4);
							me.target.setStyle('right',(right_coords.right- this.getCoordinates().right-14));
							if(Browser.Engine.trident){
								me.target.setStyle('left',(this.getCoordinates().right-me.target.getCoordinates().width+18));
								if(Browser.Engine.trident4){
									me.target.setStyle('left', getLeft(this) - me.target.getCoordinates().width + this.getCoordinates().width + 20);
									me.target.setStyle('right',document.body.getCoordinates().width - this.getCoordinates().width - getLeft(this)-3);
								}
							}
						}
						else
						{
							me.target.setStyle('top',this.getCoordinates().top-me.target.getCoordinates().height+4);
							me.target.setStyle('left',this.getCoordinates().left- ($('body').getPosition().x+20));
						}
					}
					else if (me.footer==false){
						if (window["rtl"] == true){
							if(this==$('hnl_l1_p1_trigger')){
								me.target.setStyle('right',right_coords.right-this.getCoordinates().right-5);	
							}
							else{
								me.target.setStyle('right',right_coords.right-this.getCoordinates().right-9);
							}
						}
						else{
							if(this==$('hnl_l1_p1_trigger')){
								me.target.setStyle('left',this.getCoordinates().left-($('body').getPosition().x+11));	
							}
					else{
						me.target.setStyle('left',this.getCoordinates().left-($('body').getPosition().x+15));
					}
				}
			}
				$clear(me.timer);
				me.target.setStyle('display', 'block');
				me.others.each(function(other){
					other.setStyle('display','none');					
				});
			if($('cselector').status) {
				$('cselector').parent.set('tween',{}).tween('background-color','#1E1E1E');
				$('cselector').set('tween',{duration:0}).tween('opacity', 0);
				$('cselector').status=0;
				}          
			}
			else if(e.key=="esc"){
				$clear(me.timer);
			    window.submenuOpen = false;				   
				me.target.setStyle('display', 'none');
				me.others.each(function(other){
					other.setStyle('display','none');					
				});
			}
		});

		target.addEvent('mouseenter',function(){
			$clear(me.timer);
			me.target.setStyle('display', 'block');
			window.submenuOpen = true;
			me.el.removeClass(me.class_out);
			me.el.addClass(me.class_over);
			
			
		});
		
		target.addEvent('mouseleave',function(){
			if(!me.footer) {
				me.timer= (function(){me.target.setStyle('display', 'none');}).delay(500);
			}
			else {
				me.target.setStyle('display', 'none');
			}
			window.submenuOpen = false;			
			me.el.removeClass(me.class_over);
			me.el.addClass(me.class_out);
		});
/*
		target.addEvent('focus',function(){
			$clear(me.timer);
		    window.submenuOpen = true;				   
			me.target.setStyle('display', 'block');
			me.el.removeClass(me.class_out);
			me.el.addClass(me.class_over);
		});
*/
		target.addEvent('blur',function(){
			if(!me.footer) {
				target.timer= (function(){me.target.setStyle('display', 'none');}).delay(500);
			}
			else {
				me.target.setStyle('display', 'none');
			}
			me.el.removeClass(me.class_over);
			me.el.addClass(me.class_out);
		});

		target.addEvent('keypress', function(k){
			if(k.key=='esc'){
			    window.submenuOpen = false;				   
				me.el.focus();
				me.target.setStyle('display', 'none');
			}
		});
	}
});

if($defined($('lastitemNav')))
$("lastitemNav").addEvent("keydown", function(e){
	if(e.key=="tab"){
	    window.submenuOpen = false;				   
		$("connectContainerInnerHP").setStyles.delay(500,$("connectContainerInnerHP"),{'display': 'none'});
	}
});

if($defined($('lastitemMenu')))
$("lastitemMenu").addEvent("keydown", function(e){
	if(e.key=="tab"){
    window.submenuOpen = false;				   
	$("hnl_l2_p2_inner").setStyles.delay(500,$("hnl_l2_p2_inner"),{'display': 'none'});
	}
});

if($defined($('lastitemFooter')))
	$("lastitemFooter").addEvent("keydown", function(e){
		if(e.key=="tab"){
		window.submenuOpen = false;
	$("fnr_l1_p3_popup").setStyles.delay(500,$("fnr_l1_p3_popup"),{'display': 'none'});
		}
	});



var CustomTooltip = new Class({
  Implements:[Lib.Core,Options], 

    options: {
		highlightClass: 'highlight',
		classToRemove: 'odd_row',
		needToRemoveClass: false,
		tooltipCaratSelector: '.lv_tooltip_carat',
		caratHeight: 24,
		tooltipHeight: 428, //from CSS - shadow pixels
		listViewTableTop: 136,
		listViewTableHeight:495
    },
initialize: function(container,el,target, options){
	var me=this;
	this.container=container;
	this.el=el;
	this.target=target;
	//set options
  this.setOptions(options);
	
	var tooltip= function() {
			me.setTooltipPosition(me.container, me.el, me.target);
			me.target.setStyle('display', 'block');
		}
		
	this.supTrigger = new Lib.Trigger(this.el, {
			over: function(e) {
				this.clickableToolTip=tooltip.delay(1250);
			}, 
			out: function(e) {
				$clear(this.clickableToolTip);
				me.hide(me.target);
			}
		});
	},
	setTooltipPosition: function(listContainer, highlightRow, tooltip) {
		var tooltipTop = 80; //initialize to a default
		var adjustedTableTop = listContainer.getCoordinates().top //this.options.listViewTableTop;
		var adjustedTableBottom = listContainer.getCoordinates().bottom //this.options.listViewTableTop + this.options.listViewTableHeight;
		var rowTop = highlightRow.getCoordinates(listContainer).top;
		var rowHeight = highlightRow.getCoordinates().height;
		var toolTipHeight = this.options.tooltipHeight;
		if (Browser.Engine.trident){ this.options.listViewTableTop = 134; } //if IE
		var visibleWindowTop = this.options.listViewTableTop - adjustedTableTop;
		var visibleWindowBottom = visibleWindowTop + this.options.listViewTableHeight;
		if(Browser.Engine.trident){ rowTop = rowTop + visibleWindowTop; } //if IE
		var shiftUpAmount = (rowTop + toolTipHeight) - visibleWindowBottom;
	
		if ( shiftUpAmount > 0){
			//shift up
			tooltipTop = rowTop - shiftUpAmount;
		} else {
			shiftUpAmount = 0;
			tooltipTop = rowTop;
		}

		tooltip.set({
			'styles': {
				'left': '625px',
				'top': tooltipTop.toString() + 'px'
			}
		});
		this.setCaratPosition(tooltip, shiftUpAmount, rowHeight); //shifting tooltip up means shifting the carat down an equal amount
	},
	setCaratPosition: function(tooltip, shiftDownAmount, rowHeight) {
		var tooltipCarat = tooltip.getElement(this.options.tooltipCaratSelector);
		var caratTop = (( (rowHeight - this.options.caratHeight))) + shiftDownAmount;
		// console.log(caratTop);
		tooltipCarat.setStyle('top', caratTop.toString() + 'px');
	},
	hide: function(elToHide){
		elToHide.setStyle('display','none');
	}
});



var ControlPanel = new Class({
	Implements:Lib.Core, 
	el:null, 
	dock:null, 
	tray:null, 
	initialize: function(el, options) {
		this.el = el;
		
		// Create our subcomponents
		if($chk(options.tray))
			this.tray = new Tray(options.tray.el, options.tray.views, options.tray.sliderEl, options.tray.sliderHandleEl, options.tray.leftArrowEl, options.tray.rightArrowEl);
		
		if($chk(options.dock))
			this.dock = new Dock(options.dock.el, this, options.dock.options);
	}, 
	childResizing:function(childWidth) {
		var sizeDeterminingEl = this.el.getChildren()[0];
		if(childWidth > sizeDeterminingEl.getSize().x)
			sizeDeterminingEl.setStyle('width', (childWidth+12)+'px');
	}
});

var Tray = new Class({
	trayEl:null, 
	contentEls:[], // all the views that hook into the slider & tray
	contentElsOptions:[], // any user-specified options passed in for each view (if the scroll bar is visible, etc)
	contentElsPositions:[], // the stored scroll positions of each view
	contentElsDefaultOptions: {
		noSort:false, 
		noScroll:false
	}, 
	currentContentIndex:-1,  // which contentEl is currently responding to the scrollbar
	slider:null, 
	sliderEl:null, 
	sliderHandleEl:null,
	leftArrow:null, 
	rightArrow:null, 
	ARROW_TRIGGER_FREQUENCY:50, 
	ARROW_SCROLL_AMOUNT:25, 
	MIN_TRAY_WIDTH:1200, 
	initialize: function(trayEl, views, sliderEl, sliderHandleEl, leftArrowEl, rightArrowEl)
	{
	
		var me = this;
		this.trayEl = $(trayEl);
		this.sliderEl = sliderEl; 
		this.sliderHandleEl = sliderHandleEl; 
		this.leftArrowEl = leftArrowEl;
		this.rightArrowEl = rightArrowEl;
		
		this.initContentEls(views);
		this.initControls();
		
		// Record the current content element
		if(this.contentEls.length > 0)
			this.setCurrentContent(0);
	}, 
	arrowScrollLeft: function()
	{
		this.slider.set(this.slider.step - this.ARROW_SCROLL_AMOUNT);
	}, 
	arrowScrollRight: function()
	{
		this.slider.set(this.slider.step + this.ARROW_SCROLL_AMOUNT);
	}, 
	initContentEls: function(views) {
		var me = this;
		this.contentEls = [];
		this.contentElsOptions = [];
		this.contentElsPositions = [];
	
		views.each(function(view) {
			contentEl = $(view.el);
			
			// Compute the width based on the width of each direct child if it's not already provided
			var trayWidth = contentEl.getSize().x;
			
			if(trayWidth <= this.MIN_TRAY_WIDTH)
			{
				trayWidth = 0;
				contentEl.getChildren().each(function(el) {
					if(el.get('tag') != 'shape')  // Damn IE6 PNG fix
						trayWidth += el.getSize().x + el.getStyle('margin-left').toInt() + el.getStyle('margin-right').toInt();
				});

				if(trayWidth < this.MIN_TRAY_WIDTH)
					trayWidth = this.MIN_TRAY_WIDTH;
				
				contentEl.setStyle('width', trayWidth+"px");
			}
			
			me.contentEls.push(contentEl);
			me.contentElsOptions.push($merge(me.contentElsDefaultOptions, view.options));
			me.contentElsPositions.push(0);
		});
	}, 
	initControls: function() {
		var me = this;
	
		if(!$chk(this.sliderEl)) return;
		
		var pageSliderWidth = this.sliderEl.getSize().x;
		
		// Set up the slider
		this.slider = new Slider(this.sliderEl, this.sliderHandleEl, {
			wheel: true,
			snap: false,
			steps: pageSliderWidth,
			onChange: function(pos){
				var contentWidth = me.getCurrentContent().getSize().x;
				if(contentWidth > me.MIN_TRAY_WIDTH) 
					me.trayEl.setStyle('left',(pos/this.steps) * (me.MIN_TRAY_WIDTH - contentWidth)+'px');
				else
					me.trayEl.setStyle('left', 0);
			}
		});
		
		// Set up the arrow buttons
		//this.leftArrow  = new PageArrow(this.leftArrowEl,  this.slider, this.arrowScrollLeft.bind(this),  this.ARROW_TRIGGER_FREQUENCY);
		//this.rightArrow = new PageArrow(this.rightArrowEl, this.slider, this.arrowScrollRight.bind(this), this.ARROW_TRIGGER_FREQUENCY);
	}, 
	setCurrentContent: function(index) {
		// Record the scroll position of the current view
		if(this.slider && this.currentContentIndex != -1)
			this.contentElsPositions[this.currentContentIndex] = this.slider.step;
		
		// Hide the current view
		if(this.currentContentIndex != -1)
			this.contentEls[this.currentContentIndex].addClass('hidden');
		
		// Show the new view
		this.currentContentIndex = index;
		this.contentEls[this.currentContentIndex].removeClass('hidden');
		
		if(!this.slider) return;
	
		// Set the scroll position of the new view to the stored value
		if(this.contentElsOptions[this.currentContentIndex].noScroll)
		{
			this.slider.set(0);
			this.hideScrollbar();
		}
		else
		{
			this.showScrollbar();
			this.slider.set(this.contentElsPositions[this.currentContentIndex]);
		}
		
		// Show the sort as necessary
		if(this.contentElsOptions[this.currentContentIndex].noSort)
			this.hideSort();
		else
			this.showSort();
	}, 
	getCurrentContent: function() {
		return this.contentEls[this.currentContentIndex];
	}, 
	showScrollbar: function() { 
		$('scrollbar_controls').setStyle('visibility', 'visible');
	}, 
	hideScrollbar: function() { 
		$('scrollbar_controls').setStyle('visibility', 'hidden');
	}, 
	showSort: function() { 
		$('master_sort_controller').setStyle('visibility', 'hidden');
	}, 
	hideSort: function() {
		$('master_sort_controller').setStyle('visibility', 'hidden');
	}
});

var PageArrow = new Class({
	el:null, 
	slider:null, 
	callback:null, 
	arrowIsDown:false, 
	arrowScrollingTimerID:null, 
	triggerFrequency:50, 
	initialize: function(el, slider, callback, triggerFrequency) {
		var me = this;
		this.el = el;
		this.slider = slider; 
		this.callback = callback;
		if($chk(triggerFrequency))
			this.triggerFrequency = triggerFrequency; 
		
		el.addEvents({
			mousedown: function(e) {
				me.arrowScrollingTimerID = me.callback.periodical(me.triggerFrequency);
				me.arrowIsDown = true;
			}, 
			mouseup: function(e) {
				$clear(me.arrowScrollingTimerID);
				me.arrowIsDown = true;
			}, 
			mouseout: function(e) {
				if(me.arrowIsDown)
				{
					$clear(me.arrowScrollingTimerID);
					me.arrowIsDown = true;
				}
			}
		});
	}
});



var Scrollbox = new Class({
	contentEl:null, 
	sliderEl:null, 
	sliderHandleEl:null, 
	slider:null, 
	initialize:function(contentEl, sliderEl, sliderHandleEl) {
		var me = this;
		this.contentEl = contentEl;
		this.sliderEl = sliderEl; 
		this.sliderHandleEl = sliderHandleEl;
		
		// Determine if this item needs a scroll
		var contentSize = this.contentEl.getScrollSize().y;
		if(contentSize <= this.contentEl.getSize().y) return;
		
		// Add some padding to the content so the scrollbar isn't covering anything
		var rightPad = this.contentEl.getStyle('padding-right').toInt();
		if(!$chk(rightPad) || rightPad == 'NaN') rightPad = 0;
		rightPad += 8;
		this.contentEl.setStyle('padding-right', rightPad+'px');
		
		// Display the scrollbar to the right of the contentEl
		var offsetParent = this.contentEl.getOffsetParent();
		var coords = null;
		if(offsetParent)
			coords = this.contentEl.getCoordinates(offsetParent);
		else
			coords = this.contentEl.getCoordinates();
			
		
		this.sliderEl.setStyles({
			display:"block", 
			height:coords.height, 
			position:'absolute', 
			top:coords.top+'px', 
			left:coords.right+'px'
		});
		

		
		// Connect the scrolling functionality
		this.slider = new Slider(this.sliderEl, this.sliderHandleEl, {
			wheel: true,
			snap: false,
			steps: contentSize-coords.height,
			mode: 'vertical', 
			onChange: function(pos){
				me.contentEl.scrollTo(0, pos);
			}
		});
	}
});


var GatewayScrollbox = new Class({
	contentEl:null, 
	sliderEl:null, 
	sliderHandleEl:null, 
	slider:null, 
	initialize:function(contentEl, sliderEl, sliderHandleEl) {
		var me = this;
		this.contentEl = contentEl;
		this.sliderEl = sliderEl; 
		this.sliderHandleEl = sliderHandleEl;
		
		// Determine if this item needs a scroll
		var contentSize = this.contentEl.getScrollSize().y;
		if(contentSize <= this.contentEl.getSize().y) { return;};
		
		// Add some padding to the content so the scrollbar isn't covering anything
		var rightPad = this.contentEl.getStyle('padding-right').toInt();
		if(!$chk(rightPad) || rightPad == 'NaN') rightPad = 0;
		rightPad += 8;
		this.contentEl.setStyle('padding-right', rightPad+'px');
		
		// Display the scrollbar to the right of the contentEl
		var offsetParent = this.contentEl.getOffsetParent();
		var coords = null;
		if(offsetParent)
			coords = this.contentEl.getCoordinates(offsetParent);
		else
			coords = this.contentEl.getCoordinates();
			
		// arturp: updated the top coords to include eventual initial scroll position of news article, if called with url with anchor:
//alert("here:" + " " + this.contentEl.scrollTop);
		this.sliderEl.setStyles({
			display:"block", 
			height:coords.height, 
			position:'absolute', 
			top:(coords.top+this.contentEl.scrollTop)+'px', 
			left:coords.right+'px'
		});

				
		// Connect the scrolling functionality
		this.slider = new Slider(this.sliderEl, this.sliderHandleEl, {
			wheel: true,
			snap: false,
			steps: contentSize-coords.height,
			mode: 'vertical', 
			onChange: function(pos){
				//alert(me.contentEl.id + " " + pos);
				me.contentEl.scrollTo(0, pos);
				//alert(me.contentEl.getPosition().y);
			}
		});

		// arturp: set the initial value of slider's knob to current newsroom article scroll position:
		this.slider.set(this.contentEl.scrollTop);
		
		// arturp: add scrollbox object to content element, in order to have it accessible
		contentEl.scrollbox = this;

		// arturp: add onscroll event, so that when anchor link is clicked on the article, scroller gets to be updated
		this.contentEl.addEvent('scroll', function(){ /*alert(this.scrollTop); */ this.scrollbox.slider.set(this.scrollTop); });
		
		
		// Scroll the content element when the mousewheel is used within the scrollable content.
		this.contentEl.addEvent('mousewheel', function(e){	
				e = new Event(e).stop();
				var step = me.slider.step - e.wheel * 30;	
				me.slider.set(step);					
			});
			
		// Make text inside scroller area selectable by dragging mouse
		this.contentEl.addEvent('mousedown', function(e){	
				var yStart = e.client.y;
				me.contentEl.addEvent('mousemove',function(e){
					if (e.client.y >= yStart + 1) {
						var step1 = me.slider.step + 10;	
						me.slider.set(step1);
					}
					if (e.client.y < yStart - 1) {
					    var step1 = me.slider.step - 10;	
						me.slider.set(step1);
					}
					yStart = e.client.y;
					});
				me.contentEl.addEvent('mouseup',function(e){
					me.contentEl.removeEvents('mousemove');
					});
			});	
				
					
				
	}
		
});


var DockPopup = new Class({
	el:null, 
	panel:null, 
	dock:null, 
	currentTab:null,
	initialize: function(el, panel, dock) {
		var me = this;
		this.el = el; 
		this.panel = panel; 
		this.dock = dock;
		this.PopupIsOpen=false;
		
		
		// Figure out which element should listen for the open/close events
		var relEl = this.el.getParent('.preset');
		
		var showPopUp= function() {
			me.el.setStyles({ visibility: 'visible', display: 'block' });
		}				
		
			// Create listeners to open/close the popups
			var trigger = new Lib.Trigger(relEl, {
				mouseup: function(event) {
					if(me.PopupIsOpen==false) {
						showPopUp.delay(500);
						me.PopupIsOpen=true;
						event.stopPropagation();
					}
				},			
				over: function(event) {
					if(me.PopupIsOpen==false && relEl.hasClass('current')) {
						showPopUp.delay(500);
						me.PopupIsOpen=true;
					}
				}, 
				out: function(event) {
					if(me.PopupIsOpen==true){
						me.el.setStyles({ visibility: 'hidden', display: 'none' });
						me.PopupIsOpen=false;
					}
					else
					{
						me.PopupIsOpen=false;
					}
				}
			});

			//if mouse is over of the popup
			var trigger_popup = new Lib.Trigger(el,  {
				over: function(event) {
					if(me.PopupIsOpen==false && relEl.hasClass('current')) {
						showPopUp;
						me.PopupIsOpen=true;
					}
				}, 
				out: function(event) {
					if(me.PopupIsOpen==true){
						me.el.setStyles({ visibility: 'hidden', display: 'none' });
						me.PopupIsOpen=false;
					}
					else
					{
						me.PopupIsOpen=false;
					}
				}
			});

		// Allow the popups to overflow out of the panel
		dock.addOverflowAllowers([relEl], this.panel); 
		
		// Create any expanding tabs we need to
		this.el.getElements('.tab').each(function(tab) {
			tab.getElements('h2 a').each(function(tabAEl) {
				// Display the expanded tab panel when the tab is clicked
				new Lib.Trigger(tabAEl, {
					click: function(e) {
						// If the current panel is this panel, close it
						if(me.currentTab == tab)
						{
							me.hideTabPanel(me.currentTab);
							me.currentTab = null;
						}
						// If there is no current panel, open this one
						else if(me.currentTab == null)
						{
							me.showTabPanel(tab);
							me.currentTab = tab;
						}
						// Otherwise, close the other panel and open this one
						else
						{
							// close current, open new, set current = new
							me.hideTabPanel(me.currentTab);
							me.showTabPanel(tab);
							me.currentTab = tab;
						}
					}
				});
			});
		});
	}, 
	showTabPanel: function(tab) {
		tab.getChildren('h2')[0].addClass('current');
		var tabPanel = this._getTabPanelFromTab(tab);
		if(tabPanel == null) return; 
		
		this.addWidth(tabPanel.getStyle('width').toInt());
		
		this.matchPanelHeights(tab);
	}, 
	hideTabPanel: function(tab) {
		tab.getChildren('h2')[0].removeClass('current');
		var tabPanel = this._getTabPanelFromTab(tab);
		if(tabPanel == null) return; 
		
		this.addWidth(-tabPanel.getStyle('width').toInt());
		tabPanel.setStyle('display', 'none');
	}, 
	addWidth: function(w) {
		this.el.setStyle('width', (this.el.getSize().x+w)+'px');
	}, 
	matchPanelHeights: function(tab) { 
		if(!$chk(tab)) tab = this.currentTab; 
		if(tab == null) return;
		
		// Make sure the tab panel is the same height as the tab list
		var tabPanel = this._getTabPanelFromTab(tab);
		var h = tab.getParent().getSize().y;
		if(Browser.Engine.trident && Browser.Engine.version == 4) // IE6
		{
			h -= 20; // HACK!!!
			tabPanel.setStyle('display', 'none');
		}
		
		tabPanel.setStyle('display', 'block');
		tabPanel.setStyle('height', h+'px');
	}, 
	_getTabPanelFromTab: function(tab) {
		return $(tab.getElements('a')[0].get('rel'));
	}
});



var Dock = new Class({
	Implements:Lib.Core, 
	initialize: function(dockEl, controlPanel, options) {
		var me=this;
		this.current=null;
		this.total=5;
		this.last=null;
		this.to=null;
		this.triggers=[];
		this.dockEl=$(dockEl);
		this.controlPanel=controlPanel;
		this.panelMaxWidth=620;
		this.panelMinWidth=120;
		this.controlsWidth=180;
		this.panelOpenDelay=400;
		this.allOpen=false;
		this.panels=this.dockEl.getElements('div.panel');
		this.panelPopups=[];
		this.effectSettings = {link:'cancel', duration:me.panelOpenDelay, transition:Fx.Transitions.Cubic.easeOut};
		
		if($chk(options))
			this.setProperties(options);
		
		// Calculate the width of the dock
		var dockWidth = 0;
		if(this.allOpen) // All are open all the time
			dockWidth = this.panels.length*this.panelMaxWidth + this.controlsWidth;
		else  // Only one is open at a time
			dockWidth = this.panelMaxWidth + (this.panels.length-1)*this.panelMinWidth  + this.controlsWidth;
		
		this.controlPanel.childResizing(dockWidth);
		this.dockEl.setStyle('width', dockWidth+"px");
		
		// Create the panel sliding listeners
		if(!this.allOpen)
		{
			this.panels.each(function(el,i) {
				var myFunction = function(){
					me.show(i);
				};
				this.triggers[i]=new Lib.Trigger(el,{
					click:function() {
						this.to=myFunction.delay(me.panelOpenDelay);
					},
					out:function() {
						$clear(this.to);
					}
				});
			}, this);
		}
		
		// Turn off the overflow hiding on the panel when we're supposed to show a submenu popup
		this.panels.each(function(panel) {
			this.addOverflowAllowers(panel.getElements('.preset_popups'), panel);
		}, this);

		

		this.panels.each(function(panel) {
			panel.getElements(".preset").each(function(preset) {
				preset.addEvent('click', function(event){
					panel.getElements(".preset").each(function(temppreset){
						temppreset.removeClass('current');
					
					});
					this.addClass('current');
					event.stopPropagation();
				});
			});
		});
		
// Instantiate any popups that exist
		this.panels.each(function(panel) {
			panel.getElements(".preset_popup").each(function(preset_popup) {
				me.panelPopups.push(new DockPopup(preset_popup, panel, me));
			});
		});
		
		// Show the panels
		if(this.allOpen)
			this.showAll();
		else
			this.show(0);
	},
	show: function(i) {
		var el = this.panels[i];
		
		if (el!=this.current)
		{
			var mm = new MorphManager(this.effectSettings);
			
			if (this.current!=null)
			{
				this.current.removeClass('current');
				// Create anim to collapse the previously open panel
				mm.addAnimation(this.current, {
					'width': [this.panelMaxWidth,this.panelMinWidth]
				});
				
				// Remove title highlight
				mm.addAnimation(this.current.getElement("span.title"), {
					'color': '#ffffff'
				});
				
				// Hide the open content, and show the closed content
				mm.addAnimation(this.current.getElements(".open"), {
					'opacity': 0
				});
				mm.addAnimation(this.current.getElements(".closed"), {
					'opacity': 1
				});
			}
			
			// Bookkeeping
			this.last=this.current;
			this.current=el;
			this.current.addClass('current');
			
			// Create anim to open the new panel
			mm.addAnimation(this.current, {
				'width': [this.panelMinWidth,this.panelMaxWidth]
			});
			
			// Highlight the title
			mm.addAnimation(this.current.getElement("span.title"), {
				'color': '#ffffff'
			});
			
			// Hide the closed content, and show the open content
			mm.addAnimation(this.current.getElements(".closed"), {
				'opacity': 0
			});
			mm.addAnimation(this.current.getElements(".open"), {
				'opacity': 1
			});
			
			// Do the animations
			mm.start();
		}
	}, 
	showAll: function() {
		var me = this;
		var mm = new MorphManager(this.effectSettings);
		
		// Open all the panels
		this.panels.each(function(panel) {
			// Create anim to open the panel
			mm.addAnimation(panel, {
				'width': [me.panelMinWidth,me.panelMaxWidth]
			});
			// Highlight the title
			mm.addAnimation(panel.getElement("span.title"), {
				'color': '#9cf39f'
			});
			// Hide the closed content, and show the open content
			mm.addAnimation(panel.getElements(".closed"), {
				'opacity': 0
			});
			mm.addAnimation(panel.getElements(".open"), {
				'opacity': 1
			});
		});
		
		// Do the animations
		mm.start();
	}, 
	// Allow hovering over certain elements to temporarily enable & disable element overflow for the panels
	addOverflowAllowers: function(els, panel) {
		if($type(els) != 'array')
			els = [els];
		
		els.each(function(el) {
			new Lib.Trigger(el, {
					over:function() {
						panel.setStyle('overflow', 'visible');
					}, 
					out:function() {
						panel.setStyle('overflow', 'hidden');
					}
				});
		}, this);
	}
});

var Hover = new Class({
		
    Implements:[Lib.Core,Options], 
 
    options: {
        defaultState: 'none',
		rolloverEl: 'div.tags'
    },
    
    initialize: function(elToHover, options) {
		var me = this;
		this.pane = elToHover;
		
		//set options
        this.setOptions(options);
		
		// set default state -- may show up on slow browsers before style is set, so best to set default in CSS
		var rollOverEl = this.pane.getElement(this.options.rolloverEl);
		if(!$chk(rollOverEl)) return this; 
		
		rollOverEl.setStyle('display', this.options.defaultState);

		// Create listeners to show/hide the rollover overlay
		new Lib.Trigger(this.pane, {
			over: function(e) {
				me.showRollover(me.options.rolloverEl);
			}, 
			out: function(e) {
				me.hideRollover(me.options.rolloverEl);
			}
		});
    },
     
    //method for showing rollover state
	showRollover: function(rolloverEl) {
		var rolloverOverlay = this.pane.getElement(rolloverEl);
		if (rolloverOverlay == null) return; //If there's no overlay for this element
		rolloverOverlay.setStyle('display', 'block');
	},
    //method for hiding rollover state
	hideRollover: function(rolloverEl) {
		var rolloverOverlay = this.pane.getElement(rolloverEl);
		if (rolloverOverlay == null) return; //If there's no overlay for this element
		rolloverOverlay.setStyle('display', 'none');
	}
});

var GridHover = new Class({
	Implements:Lib.Core, 
	triggerEl:null, 
	hoverEl:null, 
	initialize: function(triggerEl, hoverEl) {
		var me = this; 
		this.triggerEl = triggerEl; 
		this.hoverEl = hoverEl;
		
		// Display the hover element on mouseover
		new Lib.Trigger(this.triggerEl, {
			over: function(e) {
				me.hoverEl.removeClass('gone');
			}
		});
		
		// Hide it when you mouseout
		new Lib.Trigger(this.hoverEl, {
			out: function(e) {
				me.hoverEl.addClass('gone');
			}
		});
	}
});

var Highlight = new Class({
	
    Implements:[Lib.Core,Options], 

    options: {
		highlightClass: 'highlight',
		classToRemove: 'odd_row',
		needToRemoveClass: false,
		tooltipCaratSelector: '.lv_tooltip_carat',
		caratHeight: 24,
		tooltipHeight: 428, //from CSS - shadow pixels
		listViewTableTop: 136,
		listViewTableHeight:495
    },
    
    initialize: function(listContainer, elToHighlight, overlayEl, options) {
		var me = this;
		this.highlightElement = elToHighlight;
		this.overlayElement = overlayEl;
		this.listContainer = listContainer;
		//set list view window top & bottom coords
		// this.options.listViewTableDims.top = listContainer.getCoordinates().top;
		// this.options.listViewTableDims.bottom = listContainer.getCoordinates().bottom;
		
		//set options
        this.setOptions(options);

		// Display overlay if there is one to display
		var displayOverlay= function() {
			me.setTooltipPosition(me.listContainer, me.highlightElement, me.overlayElement);
			me.overlayElement.setStyle('display', 'block');
		}

		// Create listeners to highlight and eventually display overlay as well as unhighlight
		this.rowTrigger = new Lib.Trigger(this.highlightElement, {
			over: function(e) {
				me.highlight(me.highlightElement);
				this.clickableToolTip=displayOverlay.delay(1250);
			}, 
			out: function(e) {
				$clear(this.clickableToolTip);
				me.unhighlight(me.highlightElement);
				me.hide(me.overlayElement);
			}
		});
		
    },
     
	highlight: function(elToHighlight) {

		elToHighlight.addClass(this.options.highlightClass);
		if(elToHighlight.hasClass(this.options.classToRemove)){
			elToHighlight.removeClass(this.options.classToRemove);
			this.options.needToRemoveClass = true;
		}
	},
	unhighlight: function(elToHighlight) {
		elToHighlight.removeClass(this.options.highlightClass);
		if (this.options.needToRemoveClass){
			elToHighlight.addClass(this.options.classToRemove);
		}
	},
	hide: function(elToHide){
		elToHide.setStyle('display','none');
	},
	setTooltipPosition: function(listContainer, highlightRow, tooltip) {
		var tooltipTop = 80; //initialize to a default
		var adjustedTableTop = listContainer.getCoordinates().top //this.options.listViewTableTop;
		var adjustedTableBottom = listContainer.getCoordinates().bottom //this.options.listViewTableTop + this.options.listViewTableHeight;
		var rowTop = highlightRow.getCoordinates(listContainer).top;
		var rowHeight = highlightRow.getCoordinates().height;
		var toolTipHeight = this.options.tooltipHeight;
		if (Browser.Engine.trident){ this.options.listViewTableTop = 134; } //if IE
		var visibleWindowTop = this.options.listViewTableTop - adjustedTableTop;
		var visibleWindowBottom = visibleWindowTop + this.options.listViewTableHeight;
		if(Browser.Engine.trident){ rowTop = rowTop + visibleWindowTop; } //if IE
		var shiftUpAmount = (rowTop + toolTipHeight) - visibleWindowBottom;
	
		if ( shiftUpAmount > 0){
			//shift up
			tooltipTop = rowTop - shiftUpAmount;
		} else {
			shiftUpAmount = 0;
			tooltipTop = rowTop;
		}

		tooltip.set({
			'styles': {
				'left': '625px',
				'top': tooltipTop.toString() + 'px'
			}
		});
		this.setCaratPosition(tooltip, shiftUpAmount, rowHeight); //shifting tooltip up means shifting the carat down an equal amount
	},
	setCaratPosition: function(tooltip, shiftDownAmount, rowHeight) {
		var tooltipCarat = tooltip.getElement(this.options.tooltipCaratSelector);
		var caratTop = ((.5 * (rowHeight - this.options.caratHeight))) + shiftDownAmount;
		// console.log(caratTop);
		tooltipCarat.setStyle('top', caratTop.toString() + 'px');
	}
});

var Bookmark = new Class({
		
    Implements:[Lib.Core,Options], 
 
    options: {
		markedState: 'unmarked', //marked or unmarked
        earMarkClass: 'tab_folded',
		unEarMarkClass: 'tab',
		forceIE6Redraw: false
    },
    
    initialize: function(earMarkEl, options) {
		var me = this;
		this.earMarkEl = earMarkEl;
		
		//set options
        this.setOptions(options);
		
		// set initial state
		this.setInitialState(this.earMarkEl)

		// Create listeners to show/hide the rollover overlay
		new Lib.Trigger(this.earMarkEl, {
			click: function(e) {
				me.toggleMark(me.earMarkEl);
			}
		});
    },
     
	toggleMark: function(earMarkEl){
		var markedState = this.options.markedState;
		if (markedState == 'unmarked'){
			this.bookmark(earMarkEl);
		} else if (markedState == 'marked'){
			this.unbookmark(earMarkEl);
		}
		// alert(this.options.markedState);
	},
	bookmark: function(earMarkEl) {
		earMarkEl.removeClass(this.options.unEarMarkClass);
		earMarkEl.addClass(this.options.earMarkClass);
		this.options.markedState = 'marked';

		if(Browser.Engine.trident && Browser.Engine.version == 4 && this.options.forceIE6Redraw) // IE6
		{
			earMarkEl.setStyle('border', '1px solid white');
			earMarkEl.setStyle('border', 'none');
		}
	},
	unbookmark: function(earMarkEl) {
		earMarkEl.removeClass(this.options.earMarkClass);
		earMarkEl.addClass(this.options.unEarMarkClass);
		this.options.markedState = 'unmarked';

		if(Browser.Engine.trident && Browser.Engine.version == 4 && this.options.forceIE6Redraw) // IE6
		{
			earMarkEl.setStyle('border', '1px solid white');
			earMarkEl.setStyle('border', 'none');
		}
	},
	//method for setting the initial earMark state
	setInitialState: function(earMarkEl) {
		var markedState = this.options.markedState;
		if (markedState == 'unmarked'){
			this.unbookmark(earMarkEl);
		} else if (markedState == 'marked'){
			this.bookmark(earMarkEl);
		} else { //default to unbookmarked
 			this.unbookmark(earMarkEl);
		}
	}
});

var MorphManager = new Class(
{
	initialize:function(animSettings)
	{
		this.animSettings = animSettings;
		this.els = new Array();
		this.anims = {};
	}, 
	addAnimation: function(el, anim)
	{
		var i;
		
		// Add each element if 'el' is an array
		switch($type(el))
		{
			case "array":
				el.each(function(el1)
					{
						this.addAnimation(el1, anim);
					}, this);
				break;
				
			default:
				i = this.els.length;
				this.els[i] = el;
				this.anims[i] = anim;
				break;
		}
	}, 
	start: function()
	{
		var fx = new Fx.Elements(this.els, this.animSettings);
		fx.start(this.anims);
	}
});

var DateSort = new Class({
	/*implements:Lib.Core,
	
	initialize:function(dateSortEl) {
		var me = this;
		
		this.triggers = new Lib.Trigger(dateSortEl, {
			click:function() {
				$('sort_by_popup').style.display = "block";
			},
			out:function() {
				$('sort_by_popup').style.display = "none";
			}
		});
	}*/
	
	
	target:null,
	initialize:function(dateSortEl,target){
	var me=this;
	this.dateSortEL=dateSortEl;
	this.target = target;
	this.sortIsOpen=false;
		
			var trigger= new Lib.Trigger(dateSortEl, {
									 
						over:function(){
							if(me.sortIsOpen==false){
								me.target.setStyle('display', 'block');
								me.sortIsOpen=true;
			
							}
						},
						
						
			out: function() {
				if(me.sortIsOpen!=true)
				{
				me.target.setStyle('display', 'none');
				}
				else
				{	
				 me.sortIsOpen=false;
				  
				}
			}					
	
		    });
	
		var trigger_popup = new Lib.Trigger(target, {
			over: function() {			
				me.target.setStyle('display', 'block');
			
			
			}, 
			out: function() {				
				me.target.setStyle('display', 'none');
				me.sortIsOpen=false;
			}
		});
		
		
	}	
	
	
});

var RateStars = new Class({
	Implements:Lib.Core, 
	el:null, 
	currentStars:0, 
	maxStars:5, 
	onSetCallback:null,
	isUsingClasses:false, 
	initialize:function(el, options) {
		var me = this;
		this.el = $(el);
		this.setProperties(options);
		
		// Find out if the # of stars is set by a class on our el
		var results = this.el.getProperty('class').match(/\bn([0-9]+)\b/);
		if(results != null)
		{
			this.isUsingClasses = true;
			this.currentStars = results[1];
		}
			
		// Attach the listeners to the el
		var stars = 0;
		new Lib.Trigger(this.el, {
			over:function(e) {
				// Use the position of the mouse to determine the star the user is over
				// TODO
				// NOTE: It looks like the JS attached to items in the dialog gets lost
				//   We'll need to set them once the dialog is set up ... ?

				if(this.isUsingClasses)
				{
					
				}
				else
				{
					
				}
			}.bind(me), 
			out:function(e) {
				// Reset display to this.numStars
				// TODO
			}.bind(me), 
			click:function(e) {
				// TODO
			}.bind(me)
		});
	}, 
	setStars:function(i) {
		this.setStarsDisplay(i);
		
		this.currentStars = i;
	},
	setStarsDisplay:function(i) {
	}
});

var TagListManager = new Class({
	Implements:Lib.Core, 
	activeTagsListContainerEl:null, 
	sourceTagEls:[], 
	tagSelectCallback:$lambda, 
	tagRemoveCallback:$lambda, 
	tagClickCallback:$lambda, 
	onlyOneSelectedAtATime:false, 
	initialize: function(activeTagsListContainerEl, sourceTagEls, options) {
		var me = this;
		this.activeTagsListContainerEl = activeTagsListContainerEl;
		this.sourceTagEls = sourceTagEls;
		
		if($chk(options))
			this.setProperties(options);
		
		// Attach click listeners to the source tags
		this.sourceTagEls.each(function(sourceTag) {
			new Lib.Trigger(sourceTag, {
				click: function(e) {
					me.onTagSelect(sourceTag);
				}
			});
		});
	}, 
	onTagSelect: function(sourceTag) { 
		var me = this;
		
		// Determine what to hide when the link is clicked
		var sourceElToHide = this._getSourceTagElToHide(sourceTag);
		
		// Make this source tag invisible
		var sourceTagDisplay = sourceElToHide.getStyle('display');
		sourceElToHide.setStyle('display', 'none');
		
		var text = sourceTag.get('text');
		
		var existingTags = this.activeTagsListContainerEl.getChildren();
		var replacingExistingTag = (this.onlyOneSelectedAtATime && existingTags.length > 0) ? true : false;
		
		// Make the active tags container visible if this is the first element added
		if(existingTags.length == 0)
			this.activeTagsListContainerEl.removeClass('hidden');
		
		// Create an active tag object in the active tags list container
		var activeTag = this._createActiveTagEl({
			tagName:text,
			tagRemoveTitle:'Remove tag \''+text+'\''
		});
		
		// Attach listeners to the active tag
		var tagLinkEl = activeTag.getElements('div.text a')[0];
		new Lib.Trigger(tagLinkEl, {
			click: function(e) {
				me.tagClickCallback(activeTag);
			}
		});
		var removeLinkEl = activeTag.getElements('div.remove a')[0];
		new Lib.Trigger(removeLinkEl, {
			click: function(e) {
				me.onTagRemove(activeTag, sourceTag, sourceTagDisplay);
			}
		});
		
		this.tagSelectCallback(sourceTag, replacingExistingTag);
		
		// If we're only showing one at a time, remove any existing active tags from the list
		if(this.onlyOneSelectedAtATime)
		{
			existingTags.each(function(at) { 
				at.getElements('div.remove a')[0].fireEvent('click');
			});
		}
	}, 
	onTagRemove: function(activeTag, sourceTag, sourceTagDisplay) {
		var text = activeTag.getElements('div.text a')[0].get('text');
		
		// Remove the element from the DOM
		activeTag.destroy();
		
		// Make the active tags container invisible if this was the last element
		if(this.activeTagsListContainerEl.getChildren().length == 0)
			this.activeTagsListContainerEl.addClass('hidden');
		
		// Reenable the source tag
		var sourceElToHide = this._getSourceTagElToHide(sourceTag);
		sourceElToHide.setStyle('display', sourceTagDisplay);
		
		this.tagRemoveCallback(text);
	}, 
	onTagClick: function(activeTag) {
		var text = activeTag.getElements('div.text a')[0].get('text');
		this.tagClickCallback(text);
	}, 
	_createActiveTagEl: function(replacements) {
		// Replace the tokens in the template with the values for this particular active tag
		var str = TagListManager.ACTIVE_TAG_TEMPLATE;
		$each(replacements, function(value, token) {
			str = str.replace("{"+token+"}", value);
		});
		
		// Make the element and inject it into the active tags list container
		var activeTag = str.makeDom().getChildren()[0];
		activeTag.inject(this.activeTagsListContainerEl);
		
		return activeTag;
	}, 
	// If a source tag that we're going to hide from the list is in a parent we should hide, let's hide it instead
	_getSourceTagElToHide: function(el) {
		var sourceParent = el.getParent();
		if($chk(sourceParent) && sourceParent.get('tag') == 'li')
			return sourceParent;

		return el;
		
	}
});
TagListManager.ACTIVE_TAG_TEMPLATE = 
	'<div class="active_tag clearfix">\
		<div class="text png">\
			<a href="javascript:void(0);">{tagName}</a>\
		</div>\
		<div class="remove png">\
			<a href="javascript:void(0);" title="{tagRemoveTitle}" class="png"></a>\
		</div>\
	</div>';

var MainNav = new Class({
	initialize: function(holder, maskContent, expanderEl) {
		var me=this;
		this.parent = $('header').getElement('div.pad');
		this.holder = $(holder);
		this.maskContent = $(maskContent);
		this.expanderEl = $(expanderEl);
		this.navIsOpen = false;
		this.els = [];
		this.holder.getChildren('li').each(function(li) {
			this.els.push(li.getFirst('a'));
		}, this);
		this.drops=[];
		this.effects=[];
		this.triggers=[];
		this.reverse_triggers=[];
		this.a_triggers=[];
		this.currentlyOpenMenu=null;
		this.pageLoadCloseDelay = 1000;
		this.autoCloseDelay = 2000;
		this.navSlideDuration = 700;
		this.fakeNavElID = 'fake_drop';
window.submenuOpen = false;
		// Make sure the menu is closed if either <a> next to it is focused on
		var prevLink = null;
		var nextLink = null;
		/*for(var i = 0 ; i < document.links.length ; i++)
		{
			if(!prevLink && document.links[i] == this.els[0])
				if(i > 0)
					prevLink = $(document.links[i-1]);
			if(!nextLink && document.links[i] == this.holder.getElements('a').getLast())
				if(i < document.links.length - 1)
					nextLink = $(document.links[i+1]);
		}
		prevLink.addEvent("focus", function() { 
			me.attemptHide(0, {});
		});
		nextLink.addEvent("focus", function() { 
			me.attemptHide(me.drops.length-1, {});
		});
		
		// Attach open/close triggers to the <a>s of the menu
		this.els.each(function(el,index) {
			this.drops[index]=el.getParent().getFirst('ul');
			if ($chk(this.drops[index]))
			{
				this.triggers[index]=new Lib.Trigger(el,{
					over:function() {
						me.attemptShow(index, me.triggers[index].currentEvent);
					},
					out:function() {
						me.attemptHide(index, me.triggers[index].currentEvent);
					}
				});
				this.a_triggers[index] = [];
				this.drops[index].getChildren('li').each(function(li1, i1) {
					anchor = li1.getFirst('a');
					this.a_triggers[index][i1] = new Lib.Trigger(anchor, {
						over:function() {
							me.attemptShow(index, me.a_triggers[index][i1].currentEvent);
						},
						out:function() {
							me.attemptHide(index, me.a_triggers[index][i1].currentEvent);
						} 
					})
				}, this);
				this.effects[index] = new Fx.Morph(this.drops[index],{link:'cancel', duration: 300});
			}
		}, this);
		*/
		// Attach the open trigger to the expander element
		new Lib.Trigger(this.expanderEl, {
			over: function(e) {
				if(me.navIsOpen) return;
				
				me.navIsOpen = true;
				me.open();
			}
		});

        this.parent.addEvent('mouseleave',function(e){
  				if(!me.navIsOpen) return;
				//window.submenuOpen == false;
				var f = function() { me.close();  };
				this.closeTimerID = f.delay(me.autoCloseDelay);
        
        });

		
		// Attach close trigger to the whole nav
		new Lib.Trigger(this.parent, {
/*			out: function(e) {
				if(!me.navIsOpen) return;
				
				var f = function() { me.close(); me.navIsOpen = false; };
				this.closeTimerID = f.delay(me.autoCloseDelay);
			}, */
			over: function(e) {
				if(me.navIsOpen) {
					//window.submenuOpen == true;
					$clear(this.closeTimerID);
				}
			}
		});
				
		// Allow this drop to allow overflows on the nav mask
		this.addOverflowAllowers(holder.getElements('a'));
		
		// Create a fake nav w/ no links so the opening animation doesn't break the mask
		this.createFakeNav();
		
		// Close the nav
		this.close.delay(this.pageLoadCloseDelay, this);
	},
	attemptShow:function(index, e) {
		if(index == this.currentlyOpenMenu) return;

		this.show(index);

		this.currentlyOpenMenu = index;
	},
	show: function(index) {
		// Hide the other navs & show this one
		this.drops.each(function(drop, i) {
			if(i != index)
				this.hide(i);
			else
			{
				// Show this one
				this.drops[index].set({
					'styles': {
						'opacity': 0,
						'left': this.els[index].getCoordinates(this.els[index].getParent()).left+'px',
						'top': (this.els[index].getCoordinates(this.els[index].getParent()).bottom-20)+'px'
					}
				});
				this.effects[index].start({
					'opacity': 1
				});
			}
		}, this);
	},
	attemptHide: function(index, e) {
		// Triggered when hover or focus leaves any A in the nav
		// Only hide the menu if mouse out or focus moves to an item not in the entire menu
		var relatedTarget = e.relatedTarget||window.event.toElement;
		relatedTarget = $(relatedTarget);
		if(relatedTarget && relatedTarget.get('tag')=='a' && this.holder.hasChild(relatedTarget)) return;

		this.hide(index);

		this.currentlyOpenMenu = null;
	},
	hide: function(index) {
		var dd=this.drops[index];
		this.effects[index].start({
			'opacity': 0
		}).chain(
		function(){ 
			dd.set({
				'styles': {
					'left': '-1000em',
					'top': '-1000em'
				}
			})
		});
	}, 
	open: function() { 
		var me = this; 
		
		var ulWidth = this.holder.getSize().x;
		var expanderWidth = this.expanderEl.getStyle('width').toInt();
		
		var maskFx = new Fx.Tween(this.maskContent, {property:'left', duration:me.navSlideDuration});
		
		this.showFakeNav();
		
		// Scroll the expander element out of view
		maskFx.start(
			'-'+(ulWidth+expanderWidth)+'px'
		).chain(
			function() {
				// Hide the expander el & accommodate for the size change
				me.expanderEl.setStyle('display', 'none');
				me.maskContent.setStyle('left', '-'+ulWidth+'px');
				this.callChain();
			}
		).chain( 
			function() {
				// Show the whole nav
				var showAllFx = new Fx.Tween(me.maskContent, {property: 'left', duration:me.navSlideDuration});
				showAllFx.start('0').chain(
					function() { 
						me.hideFakeNav();
					});
			}
		);
	}, 
	close: function() {
//if(window.submenuOpen == false){
var me = this;
		me.navIsOpen = false;
		var ulWidth = this.holder.getSize().x;
		var expanderWidth = this.expanderEl.getStyle('width').toInt();

		var maskFx = new Fx.Tween(this.maskContent, {property:'left', duration:me.navSlideDuration});

		// Move the dock closed enough to show the H1
		maskFx.start(
			'-'+ulWidth+'px'
		).chain(
			function() { 
				// Now show the expander element & accommodate for the size change
				me.expanderEl.setStyle('display', 'block');
				me.maskContent.setStyle('left', '-'+(ulWidth+expanderWidth)+'px');
				this.callChain();
			}
		).chain(
			function() { 
				// Bounce the expander el to be visible
				me.maskContent.tween('left', '-'+ulWidth+'px');
			}
		);
//}
}, 
	showFakeNav: function() {
		this.holder.setStyle('display', 'none');
		$(this.fakeNavElID).setStyle('display', 'block');
	}, 
	hideFakeNav: function() {
		$(this.fakeNavElID).setStyle('display', 'none');
		this.holder.setStyle('display', 'block');
	}, 
	createFakeNav: function() {
		var me = this;
		
		// Create a UL of plain text (no links)
		var ul = new Element('ul', { 
			id:me.fakeNavElID,
			'class':'main_nav',  
			styles: {
				display:'none'
			}
		});		
		ul.inject(this.holder, 'after');
		
		// Copy the text from the real nav to the fake one
		var li = null;
		this.els.each(function(mainNavEl) { 
			li = new Element('li');
			li.set('text', mainNavEl.get('text'));
			li.inject(ul);
		}, this);
	}, 
	// Allow hovering over certain elements to temporarily enable & disable element overflow for the panels
	addOverflowAllowers: function(els) {
		var me = this;
		
		if($type(els) != 'array')
			els = [els];
			
		els.each(function(el) {
			new Lib.Trigger(el, {
					over:function() {
						me.maskContent.getParent().setStyle('overflow', 'visible');
					}, 
					out:function() {
						me.maskContent.getParent().setStyle('overflow', 'hidden');
					}
				});
		}, this);
	}
});


var Checkbox = new Class({
	el:null, 
	checkboxEl:null, 
	checkedClass:"cb_checked",  
	initialize: function(checkboxEl) {
		var me = this;
		this.checkboxEl = $(checkboxEl);
		
		// Hide the real checkbox
		this.checkboxEl.addClass('hidden');
		
		// Insert an <a> after it
		this.el = new Element('a', {
			'class':'checkbox', 
			'href': 'javascript:void(0);', 
			'alt': 'checkbox'
		});
		this.el.inject(this.checkboxEl, 'after');
		
		// Match the display of the checkbox
		if(this.checkboxEl.checked)
			this.markChecked();
		else
			this.markUnchecked();
		
		// Attach a click listener to the <a>
		new Lib.Trigger(this.el, {
			click: function(e) {
				me.onLabelClick(e);
			}
		});
		
		// Attach listeners to the real checkbox too (label click, etc)
		var checkboxID = this.checkboxEl.get('id');
		if($chk(checkboxID))
		{
			$$('label[for='+checkboxID+']').each(function(label) {
				new Lib.Trigger(label, {
					click: function(e) {
						me.onLabelClick(e);
						e.stopPropagation();
					}
				});
			});
		}
	}, 
	onClick: function(e) {
		if(this.checkboxEl.checked)
			this.markUnchecked();
		else
			this.markChecked();
	}, 
	onLabelClick: function(e) {
		this.onClick(e);
	}, 
	markChecked: function() {
		this.el.addClass(this.checkedClass);
		this.checkboxEl.checked = true;
	}, 
	markUnchecked: function() {
		this.el.removeClass(this.checkedClass);
		this.checkboxEl.checked = false;
	}
});

var RadioButton = new Class({
	el:null, 
	radioEl:null, 
	checkedClass:"rb_checked",  
	initialize: function(radioEl) {
		var me = this;
		this.radioEl = $(radioEl);
		
		// Hide the real radio
		this.radioEl.addClass('hidden');
		
		// Insert an <a> after it
		var elID = 'radio_id_'+(Math.round(Math.random()*10000));
		this.el = new Element('a', {
			'id': elID, 
			'class': 'radio', 
			'href': 'javascript:void(0);', 
			'alt': 'radio'
		});
		this.el.inject(this.radioEl, 'after');
		
		// Attach the ID of the fake radio to the 'rel' of the real one
		this.radioEl.set('rel', elID);
		
		// Match the display of the radio
		if(this.radioEl.checked)
			this._markChecked(this.el, this.radioEl);
		else
			this._markUnchecked(this.el, this.radioEl);
		
		// Attach a click listener to the <a>
		new Lib.Trigger(this.el, {
			click: function(e) {
				me.onLabelClick(e);
			}
		});
		
		// Attach listeners to the real radio too (label click, etc)
		var radioID = this.radioEl.get('id');
		if($chk(radioID))
		{
			$$('label[for='+radioID+']').each(function(label) {
				new Lib.Trigger(label, {
					click: function(e) {
						me.onLabelClick(e);
						e.stopPropagation();
					}
				});
			});
		}
	}, 
	onClick: function(e) {
		if(this.radioEl.checked)
			this.mark(false);
		else
			this.mark(true);
	}, 
	onLabelClick: function(e) {
		this.onClick(e);
	}, 
	mark: function(isChecked) {
		var me = this; 
		
		var name = this.radioEl.get('name');
		if(!$chk(name)) 
		{
			this._markedChecked(this.el, this.radioEl);
			return;
		}
		
		// Look at all elements w/ the same name to set their state
		$$('input[name='+name+']').each(function(radio) {
			if(radio == me.radioEl)
				me._markChecked($(radio.get('rel')), radio);
			else
				me._markUnchecked($(radio.get('rel')), radio);
		});
	}, 
	_markChecked: function(fakeEl, radioEl) {
		fakeEl.addClass(this.checkedClass);
		radioEl.checked = true;
	}, 
	_markUnchecked: function(fakeEl, radioEl) {
		fakeEl.removeClass(this.checkedClass);
		radioEl.checked = false;
	}
});



var Dropdown = new Class({
	el:null, 
	selectEl:null, 
	initialize:function(selectEl) {
		this.selectEl = selectEl; 
		
		// Hide the real select
		this.selectEl.addClass('hidden');
		
		// Insert the skeleton DOM nodes into the HTML
		this.el = this._createSkeletonNode();
		
		// Fill our control with the info from the select
		this._fillDropdown();
		
		// Add our event listeners
		this._addEventListeners();
	}, 
	_createSkeletonNode: function() {
		var str = Dropdown.HTML_TEMPLATE;
		
		var el = str.makeDom().getChildren()[0];
		el.inject(this.selectEl, 'after');
		
		return el;
	}, 
	_fillDropdown: function() {
		var me = this; 
		
		// Fill in our list
		var ddOptionsEl = this.el.getElement('ul.dd_options_list');
		var li, a; 
		
		// Copy the options to our UL
		this.selectEl.getChildren().each(function(option, i) { 
			li = new Element('li');
			a = new Element('a', {
				'text': option.get('text'), 
				'href': 'javascript:void(0);'
			});
			a.inject(li);
			li.inject(ddOptionsEl);

			// Display the currently-selected item in the drop selector
			if(me.selectEl.selectedIndex == i)
				me.el.getElement('.dd_left .current_item').set('text', option.get('text'));
		});
	}, 
	_addEventListeners: function() {
		var me = this;
		
		// Click and mouseout over the main button
		this.el.addEvent('click', function(e) {
			me.openDropdown();
		});
		this.el.addEvent('mouseleave', function(e) {
			me.closeDropdown(e);
		});
		
		var currentItemEl = this.el.getElement('.dd_left .current_item');
		currentItemEl.addEvent('click', function(e) {
			me.openDropdown();
		});
		
		var optionsEl = this.el.getElement('.dd_options_list');
		
		// Handle item selection
		optionsEl.getElements('a').each(function(a, i) { 
			a.addEvent('click', function(e) {
				me.selectItem(i);
				e.stopPropagation();
			});
		});
	}, 
	selectItem: function(index) {
		// Select this item in the hidden <select>
		this.selectEl.selectedIndex = index;
		
		// Show this item as the selected item
		this.el.getElement('.dd_left .current_item').set('text', this.el.getElements('.dd_options_list a')[index].get('text'));
		
		this.closeDropdown();
	}, 
	openDropdown: function() { 
		this.el.getElement('.dd_options').removeClass('hidden');
	}, 
	closeDropdown: function() { 
		this.el.getElement('.dd_options').addClass('hidden');
	}
});




Dropdown.HTML_TEMPLATE = 
	'<span class="dropdown">\
		<span class="dd_left png">\
			<span class="dd_right png">\
				<a href="javascript:void(0);" class="current_item png"></a>\
			</span>\
		</span>\
		<div class="dd_options hidden">\
			<div class="dd_top png"><div class="png"><div class="png"></div></div></div>\
			<div class="dd_mid_left png">\
				<div class="dd_mid_right png">\
					<ul class="dd_options_list"></ul>\
				</div>\
			</div>\
			<div class="dd_bottom png"><div class="png"><div class="png"></div></div></div>\
		</div>\
	</span>';

Lib.Templates.Html = {
	Layers:{
		DEFAULT:'\
			<div class="layer T:25 R:0 B:15 L:0 hidden">\
				<div class="top clearfix">\
					<span class="close"><a href="javascript:void(0);" class="layer_close"><img src="/us/en/images/i/layers/close_462697.gif" alt="close" width="22" height="20" /></a></span>\
				</div>\
				<div style="visibility:hidden;" class="lib_content"></div>\
			</div>'
	},
		/*Tooltips:{
		DEFAULT:'<div class="lv_tooltip_wrap Carat:31">\
					<div class="lib_content">\
					</div>\
				</div>',
		ORIGINAL:'<div class="tip tip_pad_top T:10 R:10 B:10 L:10 Carat:81 Extra:11">\
					<div class="top">\
						<div>\
							<div>\
								</div>\
							</div>\
						</div>\
					<div class="middle">\
						<div class="pad">\
							<div class="lib_content">\
							</div>\
						</div>\
					</div>\
					<div class="bottom">\
						<div>\
							<div>\
							</div>\
						</div>\
					</div>\
					<div class="tip_carat">\
					</div>\
				</div>'	}*/
		//Tooltips from the old library (this is well positioned)		
		Tooltips:{
		
		DEFAULT:'<div class="tip tip_pad_top T:10 R:10 B:10 L:10 Carat:21 Extra:11"><div class="top"><div><div></div></div></div><div class="middle"><div class="pad"><div class="lib_content"></div></div></div><div class="bottom"><div><div></div></div></div><div class="tip_carat"></div></div>'	}
};

HP = {
	init:function() {
try{		
		window.addEvent('domready',function() {
			Lib.Bootstrapper.Templates.Html.init();
			Lib.Bootstrapper.BackgroundCache.init();   
			Lib.Bootstrapper.Overlay.init({
				color:'#000000',
				zIndex:4,
				fade:true
			});
			Lib.LayerManager.init();
			Lib.Bootstrapper.Layers.init();  
			Lib.TooltipManager.init();
			Lib.Bootstrapper.Tooltips.init();
			
			HP.Header=$('header');
			HP.Body=$('body');
			HP.Page=$('page');
			HP.Footer=$('footer');
			HP.Url=location.href;
			
			HP.PageLoader.init(HP.Url);
			
			if($defined($('drop')))
 			  new MainNav($('drop'), $('nav_mask_content'), $('main_nav_plus'));
 			  

			if ( typeof(window["sFeed_news"]) != "undefined")
				NewsRoomTicker.init_oldpressroom_feeds(); // Initialise the News Room Ticker with rss url defined in variable newsroom_rss on homepage html
			else if ( typeof(window["newsroom_rss"]) != "undefined")
				NewsRoomTicker.init(window.newsroom_rss); // Initialise the News Room Ticker with rss url defined in variable newsroom_rss on homepage html
			else 
				NewsRoomTicker.hide(); // hide ticker (if placed on page) if no rss feed specified
		});
		}catch(e){}
	},
	PaneLoader:{
		currentPane:null,
		showPane:function(elID, isDialog) {
			if(isDialog)
			{
				Lib.LayerManager.show('html', {
					content:'#'+elID, 
					title: 'test'
				});
				
				// Run any 'show' code associated w/ the dialog
				if(this[elID+"_onShow"])
					this[elID+"_onShow"]();
			}
			else // !isDialog
			{
				if(this.currentPane != null)
				{
					if(this.currentPane.id == elID)
						return;
			
					this.currentPane.addClass("hidden");
				
					// Run any 'hide' code associated w/ the pane
					if(this[this.currentPane.id+"_onHide"])
						this[this.currentPane.id+"_onHide"]();
				}
		
				this.currentPane = $(elID);
				this.currentPane.removeClass("hidden");
				
				// Run any 'show' code associated w/ the pane
				if(this[elID+"_onShow"])
					this[elID+"_onShow"]();
			}
		}
	},
	PageLoader:{
		dockOptions:{},
		currentViewHide:null, 
		controlPanel:null,
		searchBox:null,
		communityBox:null,
		corporateBox:null,
		connectBox:null,
		productBox:null,
		exploreBox:null,

		init:function(page) {
			// Determine the template name
			var str = page.split('/');
			var pattern=/^.[^.]*/;
			var result=pattern.exec(str[str.length-1]);
			var templateName = "w_toolbar";
			
			/*This code doesn't work, since templateType resolves as not defined anyways)
			if ($defined(templateType))	{
				var templateName = templateType;
			}
			*/
			if (window.templateType!=undefined)	{
				var templateName = templateType;
}

			var Others = [];
			/*if (result!=null)
				templateName = result[0]; */
			
			// Call the per-page settings loader
			if(this[templateName+'InitSettings'])
				this[templateName+'InitSettings']();
			
			//Create searchbox popup
			if ($defined($('sound_trigger')) && $defined($('searchContainerInner')))	{
				if ($defined($('connectContainerInnerHP')))	{
					Others = [$('connectContainerInnerHP')];
				}
				else if ($defined($('connectContainerInner')))	{
					Others = [$('connectContainerInner')];
					}
				this.searchBox = new CustomPopUp($('sound_trigger'),$('searchContainerInner'),Others,'search_over','search');
			}
			//Create hp connect popup
/*			
			if ($defined($('connect_trigger')) && $defined($('connectContainerInner')))	{
				if ($defined($('searchContainerInner')))	{
					Others = [$('searchContainerInner')];
				}
				this.connectBox = new CustomPopUp($('connect_trigger'),$('connectContainerInner'),Others,'connect_over','connect');
            }
*/			

			//Create community popup
			if ($defined($('community_trigger')) && $defined($('communityContainerInner')))	{
					if ($defined($('connectContainerInner')))	{
					Others = [$('connectContainerInner'),$('searchContainerInner')];
				}
				this.communityBox = new CustomPopUp($('community_trigger'),$('communityContainerInner'),Others,'communities_over','communities_off');
			}
			//Create hp connect popup
			if ($defined($('connect_trigger')) && $defined($('connectContainerInnerHP')))	{
				if ($defined($('searchContainerInner')))	{
					Others = [$('searchContainerInner')];
				}
				this.connectBox = new CustomPopUp($('connect_trigger'),$('connectContainerInnerHP'),Others,'connect_over','connect');
            }

			//Create dynamic footer popups (up to 20)
			for(var i=1;i<=20;i++){
				var trigger="fnr_l1_p"+i+"_trigger";
				var popup="fnr_l1_p"+i+"_popup";
			if ($defined($(trigger)) && $defined($(popup)))	{
				Others=[];
				for(var j=1;j<=20;j++){
					var other_popup="fnr_l1_p"+j+"_popup";
					if(j!=i){
				    if($defined($(other_popup))) {
					
					Others.push($(other_popup));
					}
					}
				}
				this.corporateBox = new CustomPopUp($(trigger),$(popup),Others,'selected_footer','selected',true);
			 }
			}
			//Create product & services drop menu
			if ($defined($('hnl_l1_p1_trigger')) && $defined($('hnl_l2_p1_inner')))	{
				if($defined($('hnl_l2_p2_inner'))){
					Others=[$('hnl_l2_p2_inner')];
					}
				
				this.productBox = new CustomPopUp($('hnl_l1_p1_trigger'),$('hnl_l2_p1_inner'),Others,'product_over','hnl_l1_p1',false);
            }
			//Create explore & create drop menu
			if ($defined($('hnl_l1_p2_trigger')) && $defined($('hnl_l2_p2_inner')))	{
				if($defined($('hnl_l2_p1_inner'))){
					Others=[$('hnl_l2_p1_inner')];
					}
				this.exploreBox = new CustomPopUp($('hnl_l1_p2_trigger'),$('hnl_l2_p2_inner'),Others,'explore_over','hnl_l1_p2',false);
            }
            /*
			//Create resources popup
			if ($defined($('fnr_l1_p2_trigger')) && $defined($('fnr_l1_p2_popup')))	{
				Others=[];
				if($defined($('fnr_l1_p1_popup'))) {
					
					Others.push($('fnr_l1_p1_popup'));
					}
					if($defined($('fnr_l1_p3_popup'))){
					Others.push($('fnr_l1_p3_popup'));
					}
			
				this.corporateBox = new CustomPopUp($('fnr_l1_p2_trigger'),$('fnr_l1_p2_popup'),Others,'selected_footer','',true);
			}
			
			//Create preferred partners popup
			if ($defined($('fnr_l1_p3_trigger')) && $defined($('fnr_l1_p3_popup')))	{
				Others=[];
				if($defined($('fnr_l1_p2_popup'))) {
					
					Others.push($('fnr_l1_p2_popup'));
					}
				if($defined($('fnr_l1_p1_popup'))){
					Others.push($('fnr_l1_p1_popup'));
					}
				this.corporateBox = new CustomPopUp($('fnr_l1_p3_trigger'),$('fnr_l1_p3_popup'),Others,'selected_footer', '', true);
			}
			*/
			
			//Create hp share popup
			//Dynamic positioning added to share widget, now it just looks for class .social_tagging and adds widget under its position. A page can have more than one
				if ($defined($('shareContainerInner')) && $defined($('share_trigger')))	{	
				 //new CustomPopUp($('share_trigger'),$('shareContainerInner'),[],'share_over','social_tagging');
				 var widgetHTML=$('shareContainerInner').get('html');
				 new shareWidgetClass ($('share_trigger'),$('shareContainerInner'),[],'share_over','social_tagging',widgetHTML,window.title,window.location.href, 3);
            }
			
			// Apply custom graphics
			this.skinUIElements();	
			this.createCustomUIElements();
			
			// Call the per-page init function
			if(this[templateName]){
				this[templateName]();
			}

		},
		skinUIElements: function() { 
/*			HP.Body.getElements('input[type=checkbox]').each(function(el) {
				new Checkbox(el);
			});
			HP.Body.getElements('input[type=radio]').each(function(el) {
				new RadioButton(el);
			});*/
			/* Comented by Alexandru Pricop to remove the skinning of the dropdown menus*/
			/*
			HP.Body.getElements('select').each(function(el) {
				new Dropdown(el);
			});
			*/
		}, 
		createCustomUIElements: function() {
			// Create any scrollbox's we find
			//HP.Body.getElements(".scrollbox_slider").each(function(slider) {
			//	new Scrollbox($(slider.get('rel')), slider, slider.getElements(".handle")[0]);
			//});
			// arturp - for Gateway: Create gateway scrollboxes we find
			HP.Body.getElements(".scrollbox_slider").each(function(slider) {
				new GatewayScrollbox($(slider.get('rel')), slider, slider.getElements(".handle")[0]);
			});
		}, 
		template: function() { this.newsroom(); },
		package_description: function() { this.newsroom(); },
		newsroomInitSettings: function() { 
			this.dockOptions = $merge(this.dockOptions, { allOpen:false });
		}, 

		printable_page: function(){
			
				new Scrollbox($('newsroom_article'), $('article_slider'), $('article_popup1').getElements(".handle")[0]);
			
			
			},
			no_toolbar:function(){
		//	HP.Body.getElements('sup.bubble').each(function(bubble){
				//new CustomTooltip(HP.Body.getElement('#article_body'), HP.Body.getElements('sup.bubble')[0], HP.Body.getElements('#tooltips .lv_tooltip_holder .row_tooltip')[0]);
				//HP.Body.getElements('#tooltips .lv_tooltip_holder .row_tooltip')[0];
			//});
			
			},
		list_only:function() {
			var me = this;
			HP.Body.setStyle('height','100%');
			
			// Call the article init function, since it's in a DIV layer w/ this page
			this.newsroom_article();
			// Create the control panel
			
			this.controlPanel = new ControlPanel(
				$('controls'), {
					dock: {
						el:$('dock'), 
						options:this.dockOptions
					}, 
					tray: {
						el:$('tray'), 
						views: 
						[
							{
								el: $('column_view')
							}, 
							{
								el: $('grid_view'), 
								options: {
									noSort:true
								}
							}, 
							{
								el: $('list_view'), 
								options: {
									noSort: true, 
									noScroll: true
								}
							}
						], 
						sliderEl:$('page_slider'), 
						sliderHandleEl:$('page_slider_handle'), 
						leftArrowEl:$('page_control_left'), 
						rightArrowEl:$('page_control_right')
					}
				});
			
			// Create the tag list managers for this page
/*			new TagListManager($('themes_active_tags'), $('themes_source_tag_list').getElements('a'), {
				tagSelectCallback: function(tag, replacingExistingTag) {
					if(!replacingExistingTag)
						me.controlPanel.dock.panelPopups[0].matchPanelHeights();
				},
				tagRemoveCallback: function() { 
					me.controlPanel.dock.panelPopups[0].matchPanelHeights();
				}, 
				onlyOneSelectedAtATime: true
			});
			new TagListManager($('tags_active_tags'), $('tags_source_tag_list').getElements('a'), {
				tagSelectCallback: function(tag, replacingExistingTag) {
					if(!replacingExistingTag)
						me.controlPanel.dock.panelPopups[0].matchPanelHeights();
				},
				tagRemoveCallback: function() { 
					me.controlPanel.dock.panelPopups[0].matchPanelHeights();
				}, 
				onlyOneSelectedAtATime: true
			}); */
			
			// Add the view-switching listeners to the view buttons
			$('tray_list_view').addEvent('click', function(e){
				me.newsroomOnSelectListView();
			});
			/*$('tray_column_view').addEvent('click', function(e){
				me.newsroomOnSelectColumnView();
			});
			$('tray_grid_view').addEvent('click', function(e){
				me.newsroomOnSelectGridView();
			});*/
			
			//Add Column View Hover functionality - Commented out for sprint
			//HP.Body.getElements('.news_panel').each(function(newspanel) {
			//new Hover($(newspanel));
			//});
			
			// Add Grid View hover functionality
			HP.Body.getElements('#grid_view .grid_group .grid_rollover').each(function(el) {
				new GridHover($(el.get('rel')), el);
			});
			
			//Add AJAX Loading functionality
			//new ArticleGrabber();
			
			//Add Sort By Menu functionality
//			new DateSort($('master_sort_controller'));
			new DateSort($('master_sort_controller'),$('sort_by_popup'));
			
			//Add Column View Bookmarking Functionality
			HP.Body.getElements('.news_panel .meta .tab').each(function(earMarkCorner){
				new Bookmark($(earMarkCorner), {forceIE6Redraw: true});
			});
			
			//Add List View Bookmarking Functionality
			// row bookmarking
			HP.Body.getElements('#list_view .div_table .tab').each(function(earMarkCorner){
				new Bookmark($(earMarkCorner));
			});
			// tooltip bookmarking
			HP.Body.getElements("#list_view .lv_tooltip_content .tooltip_tab").each(function(earMarkCorner){
				new Bookmark($(earMarkCorner), {earMarkClass: 'tooltip_tab_folded',unEarMarkClass: 'tooltip_tab',forceIE6Redraw: true});
			});
			
			//Add List View highlight functionality
			HP.Body.getElements('#list_view .table_contents .div_table .div_row').each(function(highlightRow){
				new Highlight(HP.Body.getElement('#list_view_table_contents'), $(highlightRow), $(highlightRow).getElement('.lv_tooltip_holder .row_tooltip'));
			});

			if (typeof defaultView == 'undefined'){
				this.currentViewSelectEl = $('tray_column_view');
				this.currentViewHide = this.newsroomHideColumnView;
			
			}
			else {
				if (defaultView == "list_view"){
					this.currentViewSelectEl = $('tray_column_view');
					this.currentViewHide = this.newsroomHideColumnView;
					me.newsroomOnSelectListView();
					}
				else if (defaultView == "grid_view"){
					this.currentViewSelectEl = $('tray_column_view');
					this.currentViewHide = this.newsroomHideColumnView;
					me.newsroomOnSelectGridView();
					}
				else{
					this.currentViewSelectEl = $('tray_column_view');
					this.currentViewHide = this.newsroomHideColumnView;
				}
			}
		}, 

		w_toolbar:function() {
			var me = this;
			HP.Body.setStyle('height','82%');
			
			// Call the article init function, since it's in a DIV layer w/ this page
			this.newsroom_article();
			// Create the control panel
			if ($defined($('controls')))	{			
				this.controlPanel = new ControlPanel(
					$('controls'), {
						dock: {
							el:$('dock'), 
							options:this.dockOptions
						}, 
						tray: {
							el:$('tray'), 
							views: 
							[
								{
									el: $('column_view')
								}, 
								{
									el: $('grid_view'), 
									options: {
										noSort:true
									}
								}, 
								{
									el: $('list_view'), 
									options: {
										noSort: true, 
										noScroll: true
									}
								}
							], 
							sliderEl:$('page_slider'), 
							sliderHandleEl:$('page_slider_handle'), 
							leftArrowEl:$('page_control_left'), 
							rightArrowEl:$('page_control_right')
						}
					});
			}
			// Create the tag list managers for this page
/*			new TagListManager($('themes_active_tags'), $('themes_source_tag_list').getElements('a'), {
				tagSelectCallback: function(tag, replacingExistingTag) {
					if(!replacingExistingTag)
						me.controlPanel.dock.panelPopups[0].matchPanelHeights();
				},
				tagRemoveCallback: function() { 
					me.controlPanel.dock.panelPopups[0].matchPanelHeights();
				}, 
				onlyOneSelectedAtATime: true
			});
			new TagListManager($('tags_active_tags'), $('tags_source_tag_list').getElements('a'), {
				tagSelectCallback: function(tag, replacingExistingTag) {
					if(!replacingExistingTag)
						me.controlPanel.dock.panelPopups[0].matchPanelHeights();
				},
				tagRemoveCallback: function() { 
					me.controlPanel.dock.panelPopups[0].matchPanelHeights();
				}, 
				onlyOneSelectedAtATime: true
			}); */
			
			// Add the view-switching listeners to the view buttons
			if ($defined($('tray_list_view')))	{
				$('tray_list_view').addEvent('click', function(e){
					me.newsroomOnSelectListView();
				});
			}
			if ($defined($('tray_column_view')))	{
						$('tray_column_view').addEvent('click', function(e){
							me.newsroomOnSelectColumnView();
						});
			}
			if ($defined($('tray_grid_view')))	{
						$('tray_grid_view').addEvent('click', function(e){
							me.newsroomOnSelectGridView();
						});
			}			
			//Add Column View Hover functionality - Commented out for sprint
			//HP.Body.getElements('.news_panel').each(function(newspanel) {
			//new Hover($(newspanel));
			//});
			
			// Add Grid View hover functionality
			if ($defined($('tray_grid_view')))	{			
				HP.Body.getElements('#grid_view .grid_group .grid_rollover').each(function(el) {
					new GridHover($(el.get('rel')), el);
				});
			}
			//Add AJAX Loading functionality
			//new ArticleGrabber();
			
			//Add Sort By Menu functionality
//			new DateSort($('master_sort_controller'));
			if ($defined($('master_sort_controller')))	{
				new DateSort($('master_sort_controller'),$('sort_by_popup'));
			}
			//Add Column View Bookmarking Functionality
			/*HP.Body.getElements('.news_panel .meta .tab').each(function(earMarkCorner){
				new Bookmark($(earMarkCorner), {forceIE6Redraw: true});
			});*/
			
			//Add List View Bookmarking Functionality
			// row bookmarking
			/*HP.Body.getElements('#list_view .div_table .tab').each(function(earMarkCorner){
				new Bookmark($(earMarkCorner));
			});*/
			// tooltip bookmarking
			/*HP.Body.getElements("#list_view .lv_tooltip_content .tooltip_tab").each(function(earMarkCorner){
				new Bookmark($(earMarkCorner), {earMarkClass: 'tooltip_tab_folded',unEarMarkClass: 'tooltip_tab',forceIE6Redraw: true});
			});*/
			
			//Add List View highlight functionality
			if ($defined($('tray_list_view')))	{
				HP.Body.getElements('#list_view .table_contents .div_table .div_row').each(function(highlightRow){
					new Highlight(HP.Body.getElement('#list_view_table_contents'), $(highlightRow), $(highlightRow).getElement('.lv_tooltip_holder .row_tooltip'));
				});
			}

			if ($defined($('grid_view')) && $('grid_view').hasClass('current')){
				this.currentViewSelectEl = $('tray_grid_view');
				this.currentViewHide = this.newsroomHideGridView;
				me.newsroomOnSelectGridView();
				me.newsroomHideListView();
				me.newsroomHideColumnView();
			}
			else if ($defined($('list_view')) && $('list_view').hasClass('current')){
				this.currentViewSelectEl = $('tray_list_view');
				this.currentViewHide = this.newsroomHideListView;
				me.newsroomOnSelectListView();
				me.newsroomHideGridView();
				me.newsroomHideColumnView();
			}
			else{
				this.currentViewSelectEl = $('tray_column_view');
				this.currentViewHide = this.newsroomHideColumnView;
				me.newsroomOnSelectColumnView();
				me.newsroomHideGridView();
				me.newsroomHideListView();
			}
		}, 
		newsroom_article: function() {
			//new RateStars($('author_rating'));
		}, 
		newsroomOnSelectListView: function() {
			this.currentViewHide();
			this.newsroomShowListView();
			this.currentViewHide = this.newsroomHideListView;
		}, 
		newsroomOnSelectColumnView: function() {
			this.currentViewHide();
			this.newsroomShowColumnView();
			this.currentViewHide = this.newsroomHideColumnView;
		}, 
		newsroomOnSelectGridView: function() {
			this.currentViewHide();
			this.newsroomShowGridView();
			this.currentViewHide = this.newsroomHideGridView;
		}, 
		newsroomShowListView: function() {
			$('tray_list_view').addClass('current');
			
			this.controlPanel.tray.setCurrentContent(2);
		}, 
		newsroomShowColumnView: function() {
        var d = $('tray_column_view');
    if(d)
    {
        d.addClass('current');
        this.controlPanel.tray.setCurrentContent(0);
    }
}, 
		
		newsroomShowGridView: function() {
			$('tray_grid_view').addClass('current');

			
			this.controlPanel.tray.setCurrentContent(1);
		}, 
		newsroomHideListView: function() {
			if ($defined($('tray_list_view'))){
				$('tray_list_view').removeClass('current');
			}
		}, 
		newsroomHideColumnView: function() {
			if ($defined($('tray_column_view'))){
				$('tray_column_view').removeClass('current');
			}
		}, 
		newsroomHideGridView: function() {
			if ($defined($('tray_grid_view'))){
				$('tray_grid_view').removeClass('current');
			}
		}
	}
};

var ArticleGrabber = new Class({
  
  initialize: function(){
	//$('tray').getElements('')[0]
	var me = this;
	
	var req= new Request.HTML({
			url: 'tridion_harcoded/a001.html',
			method: 'get',
			update: 'tray',
			evalScripts: true
							});
	req.send();
	  
	  }
});

document.addEvent('domready', function() {	
	HP.init();
});


function pageControlssubmitform()
{
  document.pageControls.submit();
}

/* =======[ BEGIN SEARCH FORM VALIDATION ]================== */
//Cleans search box
	function clearSearch(el,txt){ if(el.value==txt){searchTxt=el.value; el.value='';} }
	
	//restores search box
	function restoreSearch(el,txt){ if(el.value=='') el.value=txt; }

function validateSearch() {
	if(typeof(searchTxt) == 'undefined')  { searchTxt = '';}
	var searchForm = document.getElementById('searchBox').value;
	if(searchForm == searchTxt) document.getElementById('searchBox').value = '';
	return true;
}


/* =======[ BEGIN News Room Ticker class ]================== */

var NewsRoomTicker = {
	// here comes class to manage the news room ticker ...

	/******* START News Room Ricker Config *******/
	rss : newsroom_rss,		// should point to the live RSS feed; locally saved copy for development purposes
	pause : 5000,			// time to show one news item
	chg_speed : 1000,		// change effect's speed
	/******* END News Room Ricker Config *******/

	news_items : [],			// array to keep RSS items
	curr_item : 0,			// index of currently shown news item
	chg_timer : null,		// timer for effect
	moofx : null,			// our change effect
	mouseover: false,		// flag - if true, mouse pointer is over the news item
	ticker_div: null,
	ticker_content_div: null,
	ticker_size_test_div: null,


	init: function(rss_url) {
		// initialise the ticker

		this.ticker_div = $('newsroom_ticker');
		if (this.ticker_div == null) return false; // no ticker div on the page, exit
		this.ticker_content_div = $('newsroom_ticker_content');
		if (this.ticker_content_div == null) {
			// no ticker div on the page, exit
			this.hide();
			return false;
		}

		this.rss = rss_url;

		var _this = this;

		var req = new Request({ 
			method: 'get',
			url: _this.rss,
			onFailure: function(err) { _this.hide(); },
			onException: function(err) { _this.hide(); },
			onComplete: function(response, responseXML) { _this.loadFeed(responseXML); }
		}).send();
	},


	init_oldpressroom_feeds: function() {

		this.ticker_div = $('newsroom_ticker');
		if (this.ticker_div == null) return false; // no ticker div on the page, exit
		this.ticker_content_div = $('newsroom_ticker_content');
		if (this.ticker_content_div == null) {
			// no ticker div on the page, exit
			this.hide();
			return false;
		}

		if (window.DOMParser) {
			// IE7, Mozilla, Safari, ...
			xmlDoc = (new DOMParser()).parseFromString(sFeed_news, "text/xml"); // arturp - sFeed comes from press room RSS
		}
		else if (window.ActiveXObject) {
			try {
				xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
				xmlDoc.loadXML( sFeed_news );
			} catch (e) {
				try {
					xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.loadXML( sFeed_news );
				} catch (E) {
					xmlDoc = null;
				}
			}
		}



		if (xmlDoc)
			tickerItems = xmlDoc.getElementsByTagName( "item" );
		else return;

		for (var i=0; i<tickerItems.length; i++ ) {
			this.news_items[i] = new Array();
			this.news_items[i].title = this.fix_item_size(tickerItems[i].getElementsByTagName('title')[0].firstChild.nodeValue);
			this.news_items[i].url = tickerItems[i].getElementsByTagName('link')[0].firstChild.nodeValue;
		}

		var newsLength = tickerItems.length;

		//add the second part of feed
		if (window.DOMParser) {
			// IE7, Mozilla, Safari, ...
			xmlDoc = (new DOMParser()).parseFromString(sFeed_feature, "text/xml");
		}
		else if (window.ActiveXObject) {
			try {
				xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
				xmlDoc.loadXML( sFeed_feature );
			} catch (e) {
				try {
					xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.loadXML( sFeed_feature );
				} catch (E) {
					xmlDoc = null;
				}
			}
		}

		if (xmlDoc)
			tickerItems = xmlDoc.getElementsByTagName( "item" );
		else return;

		var j = 0;
		for (var i=0; i<tickerItems.length; i++ ) {
			j = i + newsLength;
			this.news_items[j] = new Array();
			this.news_items[j].title = this.fix_item_size(tickerItems[i].getElementsByTagName('title')[0].firstChild.nodeValue);
			this.news_items[j].url = tickerItems[i].getElementsByTagName('link')[0].firstChild.nodeValue;
		}

		this.startticker();

	},

	loadFeed: function(rss_xml) {
		// load the RSS feed, start ticker if more then one item in RSS

		if (rss_xml) {

			var rss_items = rss_xml.getElementsByTagName( "item" );

			for (var i=0; i < rss_items.length; i++ ) {

				this.news_items[i] = new Array();

				if ( rss_items[i].getElementsByTagName('title')[0].firstChild != null && rss_items[i].getElementsByTagName('link')[0].firstChild != null) { 

					this.news_items[i].title = this.fix_item_size(rss_items[i].getElementsByTagName('title')[0].firstChild.nodeValue);
					if (rss_items[i].getElementsByTagName('link')[0].firstChild.nodeValue.substr(0,7) == "http://") {
						this.news_items[i].url =  rss_items[i].getElementsByTagName('link')[0].firstChild.nodeValue;
					}
					else {
						this.news_items[i].url =  hpAbsDir + 'hp-news/' + rss_items[i].getElementsByTagName('link')[0].firstChild.nodeValue;
					}
				}
			}

			this.startticker();

		}
		else {
			return false;
		}
	},

	startticker: function() {
		// start the ticker, if there are news itmes; hide it otherwise

		if (this.news_items.length == 0) {
			this.hide();
			return true;
		}

		var tmp_html = "<a href=\"" + this.news_items[0].url + "\" onmouseover=\"NewsRoomTicker.mouseover = true;\" onmouseout=\"NewsRoomTicker.mouseover = false;\" style=\"color: #ffffff\" tabindex=\"50\">";
		tmp_html += this.news_items[0].title +"</a>";

		$('newsroom_ticker_content').innerHTML = tmp_html;

		if (this.news_items.legth == 1) return; // only one RSS item in XML, do not start to change items as it makes no sense

		this.moofx = new Fx.Morph(this.ticker_content_div,{duration: 500});

		this.chg_timer = setTimeout( 'NewsRoomTicker.changeItem()', this.pause);

		return true;
	},

	changeItem: function() {
		// changes News Room Ticker item to next one on the list

		if (!this.mouseover) {

			this.curr_item ++;

			if (this.curr_item == this.news_items.length) this.curr_item = 0;

			var _this = this;

			this.moofx.start({
				}).chain(function() {
					this.start.delay(_this.chg_speed, this, {'opacity': 0});
				}).chain(function() {
					var tmp_html = "<a href=\"" + _this.news_items[_this.curr_item].url + "\" onmouseover=\"NewsRoomTicker.mouseover = true;\" onmouseout=\"NewsRoomTicker.mouseover = false;\" style=\"color: #ffffff\" tabindex=\"50\">";
					tmp_html += _this.news_items[_this.curr_item].title +"</a>";

					$('newsroom_ticker_content').innerHTML = tmp_html;

					this.start.delay(0001, this, {'opacity': 1});
				});

		}

		this.chg_timer = setTimeout( 'NewsRoomTicker.changeItem()', this.pause);
	},


	hide: function() {
		// hides newsticker div on page

		this.ticker_div = $('newsroom_ticker');
		if (this.ticker_div != null) {
		//	this.ticker_div.setStyles({ display: 'none'});
		}
	},


	show: function() {
		// shows newsticker div on page

		this.ticker_div = $('newsroom_ticker');
		if (this.ticker_div != null) {
			this.ticker_div.setStyles({ display: 'block'});
		}
	},


	fix_item_size: function(test_text) {
		// checks the real width in pixels of the text used by ticker, and adjusts it to fit in the ticker area - max_sizepx max.

		if ( ($('newsroom_ticker') != null) && ($('newsroom_ticker_left') != null) && ($('newsroom_ticker_right') != null) && ($('newsroom_ticker_header') != null) && ($('newsroom_ticker_pipe') != null) ) {
			var max_size = ($('newsroom_ticker').clientWidth) - ($('newsroom_ticker_left').clientWidth) - ($('newsroom_ticker_right').clientWidth) - ($('newsroom_ticker_header').clientWidth) - ($('newsroom_ticker_pipe').clientWidth) - 35; // 

			this.ticker_size_test_div = $('newsroom_ticker_size_test');

			if (this.ticker_size_test_div != null) {

				this.ticker_size_test_div.innerHTML = test_text;

				if (this.ticker_size_test_div.clientWidth > max_size) {

					test_text = test_text.substring(0, test_text.length -1) + "...";
					this.ticker_size_test_div.innerHTML = test_text;

					if (this.ticker_size_test_div.clientWidth > max_size) {

						var i=test_text.length;

						while ( i > 0 ) {

							test_text = test_text.substring(0, test_text.length -4) + "...";
							this.ticker_size_test_div.innerHTML = test_text;
							if (this.ticker_size_test_div.clientWidth <= max_size) { break; };
							i--;

						}
					}
				}
			}
		}
		else {
			// divs not found so cannot calculate pixel sizes? then lets cut text at 76 chars
			test_text = test_text.substr(0,76)
		}
		return test_text;
	}
};


//01082010


/* UnCompressed - Reason: DISABLED_TARGET-LIVECWADEPLOYER# */

/*
Date: 10/19/2011 12:51:49 PM
All images published
*/