// Utilizing MooTools Library http://www.mootools.net

// Custom event handler to prevent conflict between libraries using window.addEvent 
var AC = {
	addEvent: function (el, type, fn) {
		if (el.attachEvent) {
			el['e'+type+fn] = fn;
			el[type+fn] = function(){el['e'+type+fn](window.event);}
			el.attachEvent('on'+type,el[type+fn]);
		} else {
			el.addEventListener(type,fn,false);
		}
	},
	removeEvent: function (el, type, fn) {
		if (el.detachEvent) {
			el.detachEvent('on'+type,el[type+fn]);
			el[type+fn] = null;
		} else {
			el.removeEventListener(type,fn,false);
		}
	}
};


// On page load setup function
AC.addEvent(window, 'load', setup);
function setup(){
	new FlyoutMenu({ menuItems: $$('#navGlobal .toptier') });	/* Initialize Flyout Menu */
	new FlyoutMenu({ menuItems: $$('#navCBEGlobal .toptier') });	/* Initialize Flyout Menu */
	if($$('#AC-TabCt').length > 0){ new Tabs({ tabs: $$('#AC-TabCt .AC-Block')}); };	/* Call for Tabs */
	
	if($chk($('AC-PhotoList'))){ var PhotoThumb = new ACThumbnailer('AC-PhotoList','AC-PhotoThumbs','AC-PhotoImage','AC-NewsStory'); }


// active faq accordion
var accordion = new Accordion('div.toggleHead', 'div.toggleBody', {opacity: false,show: -1,alwaysHide: true, onBackground:function(toggler,el){toggler.removeClass('toggleHeadActive');},onActive:function(toggler,el){toggler.addClass('toggleHeadActive');}}, $('AC-Accordion'));


	//use if slider is NOT using the nav
	if($chk($('AC-SliderWithoutNav'))) { 

		//var random = Math.floor(Math.random()* $$('.slide').length);  
    	    	      
		new SimpleSlideShowDemo({
		          startIndex: 0,
		          slides: $$('.slide'),
		          currentIndexContainer: 'slide', //an element or it's id
		          maxContainer: 'slideMax',
		          nextLink: 'AC-Next',
		          prevLink: 'AC-Prev', 
		          autoStart: true
		});	
 	}
	
}


// Flyout Menu Class
var FlyoutMenu = new Class({
	options: {
		menuItems: [],
		direction: 'vertical'
	}, 
	initialize: function(options){
		this.setOptions(options)
		this.menuItems = [];
		this.addMenuItems(this.options.menuItems);
	},
	addMenuItems: function(menuItems) {
		$$(menuItems).each(function(menuItem){
		this.menuItems.include($(menuItem));
			if (this.options.direction == 'horizontal') {
				var slideFx = new Fx.Tween(menuItem.getElement('div'));
				menuItem.addEvents({
					'mouseenter': function(){ 
						slideFx.cancel();
						menuItem.addClass('active');
						(function() {slideFx.start('width', menuItem.getElement('ul').getSize().x)}).delay(200);
					},
					'mouseleave': function(){ 
						slideFx.cancel(); 
						slideFx.start('width', '0').chain(function() { 
							//if(menuItem.getElement('ul').getStyle('width').toInt() == 0){ 
								menuItem.removeClass('active');
							//}
						});
					}
				});				
			} else { 
				var slideFx = new Fx.Tween(menuItem.getElement('div'));
				menuItem.addEvents({
					'mouseenter': function(){ 
						slideFx.cancel();
						menuItem.addClass('active');
						(function() {slideFx.start('height', menuItem.getElement('ul').getSize().y)}).delay(250);
					},
					'mouseleave': function(){ 
						slideFx.cancel(); 
						slideFx.start('height', '0').chain(function() { 
							//if(menuItem.getElement('ul').getStyle('height').toInt() == 0){ 
								menuItem.removeClass('active');
							//}
						});
					}
				});
			}
			
			
			
		}, this);
	} 
	
});
FlyoutMenu.implement(new Options, new Events);