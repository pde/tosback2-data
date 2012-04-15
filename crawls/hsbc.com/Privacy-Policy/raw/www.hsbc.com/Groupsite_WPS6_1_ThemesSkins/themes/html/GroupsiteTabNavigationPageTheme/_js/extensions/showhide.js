/****************************************************************************
* 																			*
* HW Javascript Showhide Module												*
* -----------------------------												*
* 																			*
* Author:			Leonard Martin (leonard.martin@heathwallace.com)		*
* Version:			0.1.0													*
* Updated:			29 May 2008												*
* 																			*
* **************************************************************************/

/*
--- SHOWHIDE FUNCTIONS ---
Requires:	Core
Optional:	Animate
CSS:		None
--------------------------
*/

HW.ShowHide = {
	// first set the classes for automagical showing and hiding
	
	// hide elements on load
	hideClass:'jvsHide',
	
	// link triggers and targets together
	// links should be made by appending a number to the end of this class - e.g. jvsShowHideItem01, jvsShowHideItem02
	itemClass:'jvsShowHideItem',
	
	// make an item a trigger
	triggerClass:'jvsShowHideTrigger',
	
	// make an item a target
	targetClass:'jvsShowHideTarget',
	
	// set the trigger to either show or hide
	// if the trigger is a link, then omitting these classes will cause the trigger to toggle its targets on and off
	showTrigger:'jvsShowTrigger',
	hideTrigger:'jvsHideTrigger',
	
	// set the transition style
	slideClass:'jvsSlide',
	fadeClass:'jvsFade',
	
	// if selecting one item from a group should hide all of the others
	// append a number to this class to form groups - e.g. jvsHideAll01, jvsHideAll02
	hideAllClass:'jvsHideAll',
	
	// time for transitions to take, in milliseconds
	transitionTime:250,
	
	/*
	* init()
	* set up automagical hiding and showing using classes defined above
	* Returns:	Nothing
	*/
	init:function() {
		// hide anything set to hide on load
		var h = $$(this.hideClass,document.body,null);
		for(var i=0,j=h.length;i<j;i++) {
			// call hide with only one parameter to hide without transition
			HW.hide(h[i]);
		}
		// find trigger elements and attach events to them
		this.attachTriggers();
	},
	/*
	* attachTriggers()
	* find trigger elements and attach events to them
	* Returns:	Nothing
	*/
	attachTriggers:function() {
		var obj = this;
		// get all the trigger elements
		var triggers = $$(this.triggerClass,document.body,null);
		for(var i=0;i<triggers.length;i++) {
			// different trigger types will respond to different events, so sort by tag type
			// add event listeners
			if(triggers[i].tagName == 'A') {
				HW.attachEvent(triggers[i],'click',function(e){HW.preventDefault(e);obj.fireTrigger(e);});
			}
			else if(triggers[i].tagName == 'INPUT' && (triggers[i].type == 'radio' || triggers[i].type == 'checkbox')) {
				HW.attachEvent(triggers[i],'click',function(e){obj.fireTrigger(e);});
			}
			else if(triggers[i].tagName == 'SELECT') {
				HW.attachEvent(triggers[i],'change',function(e){obj.fireTrigger(e);});
			}
			// we need to apply a 1ms timeout to make sure IE has time to catch up so wrap everything in a closure to ensure we are using the right 'i'
			(function(){
				var k=i;
				// fire each trigger so that show/hide state corresponds with trigger state on page load
				setTimeout(function(){obj.fireTrigger(triggers[k],true);},1);
			})()
		}
	},
	/*
	* fireTriggers(e[,onload[,closed]])
	* fires a trigger element when interacted with, or on page load
	* e			Event if responding to user interaction
	*			Object if firing on page load
	* onload	Boolean (optional) set as true on page load, omitted on user interaction
	* closed	Boolean (optional) set as true if this is the recursive call after a hideAll method
	* Returns:	Nothing
	*/
	fireTrigger:function(e,onload,closed) {
		// set up regexps for groupings
		var reg = new RegExp("(^|\\w*)"+this.itemClass+"(\\d*|([\\w* ]))");
		var reg2 = new RegExp("(^|\\w*)"+this.hideAllClass+"(\\d*|([\\w* ]))");
		
		var trg;
		
		// fix events cross browser
		e=e||window.event;
		trg = e.srcElement||e.target;
		
		// if running on page load, get the element
		if(!trg && (onload || closed)) {
			trg = e;
		}
		
		// establish the transition style to use
		// if running on page load, suppress transitions
		var trans;
		if(HW.hasClass(trg,this.slideClass) && !onload) {
			trans = 'slide';
		}
		if(HW.hasClass(trg,this.fadeClass) && !onload) {
			trans = 'fade';
		}
		// need to behave differently dependent on trigger type so sort accordingly
		switch(trg.tagName) {
			case 'A':
				// links do not change state so don't need to check on page load
				if(!onload) {
					// find targets with matching class name
					var cls = reg.exec(trg.className)[0];
					var targets = $$(cls,document.body,null);
					
					// if part of a hideall group, hide others
					if(reg2.exec(trg.className) && !closed) {
						this.hideAll(reg2.exec(trg.className)[0],cls,trans,trg,onload);
						return;
					}
					
					// loop through the targets and show/hide accordingly
					for(var i=0,j=targets.length;i<j;i++) {
						// only act if the element is a target element
						// i.e. don't hide yourself
						if(HW.hasClass(targets[i],this.targetClass)) {
							if(HW.hasClass(trg,this.showTrigger)) {
								HW.show(targets[i],trans,null,this.transitionTime);
							}
							else if(HW.hasClass(trg,this.hideTrigger)) {
								HW.hide(targets[i],trans,null,this.transitionTime);
							}
							else {
								HW.toggle(targets[i],trans,null,this.transitionTime);
							}
						}
					}
				}
				break;
			case 'INPUT':
				// find targets with matching class name
				var cls = reg.exec(trg.className)[0];
				var targets = $$(cls,document.body,null);
				
				// only act on radio buttons and checkboxes which are checked
				if(trg.type == 'radio') {
					//if(trg.checked) {alert(trg.checked);}
					if(trg.checked) {
						// if part of a hideall group, hide other elements
						if(reg2.exec(trg.className) && !closed) {
							this.hideAll(reg2.exec(trg.className)[0],cls,trans,trg,onload);
							return;
						}
						
						// loop through the targets and show/hide accordingly
						for(var i=0,j=targets.length;i<j;i++) {
							// only act if the element is a target element
							// i.e. don't hide yourself
							if(HW.hasClass(targets[i],this.targetClass)) {
								if(HW.hasClass(trg,this.hideTrigger)) {
									HW.hide(targets[i],trans,null,this.transitionTime);
								}
								else if(HW.hasClass(trg,this.showTrigger)) {
									HW.show(targets[i],trans,null,this.transitionTime);
								}
								else {
									HW.toggle(targets[i],trans,null,this.transitionTime);
								}
							}
						}
					}
				}
				else if(trg.type == 'checkbox') {
					// loop through the targets and show/hide accordingly
					for(var i=0,j=targets.length;i<j;i++) {
						// only act if the element is a target element
						// i.e. don't hide yourself
						if(HW.hasClass(targets[i],this.targetClass)) {
							if(!trg.checked) {
								if(HW.hasClass(trg,this.hideTrigger)) {
									HW.show(targets[i],trans,null,this.transitionTime);
								}
								else {
									HW.hide(targets[i],trans,null,this.transitionTime);
								}
							}
							else {
								if(HW.hasClass(trg,this.hideTrigger)) {
									HW.hide(targets[i],trans,null,this.transitionTime);
								}
								else {
									HW.show(targets[i],trans,null,this.transitionTime);
								}
							}
						}
					}
				}
				break;
			case 'SELECT':
				// get the option selected
				var elm = trg.options[trg.selectedIndex];
				
				// find targets with matching class name
				var cls = reg.exec(elm.className)[0];
				var targets = $$(cls,document.body,null);
				
				// if part of a hideall group, hide other elements
				if(reg2.exec(elm.className) && !closed) {
					this.hideAll(reg2.exec(elm.className)[0],cls,trans,trg,onload);
					return;
				}
				
				// loop through the targets and show/hide accordingly
				for(var i=0,j=targets.length;i<j;i++) {
					// only act if the element is a target element
					// i.e. don't hide yourself
					if(HW.hasClass(targets[i],this.targetClass)) {
						if(HW.hasClass(elm,this.hideTrigger)) {
							HW.hide(targets[i],trans,null,this.transitionTime);
						}
						else if(HW.hasClass(elm,this.showTrigger)) {
							HW.show(targets[i],trans,null,this.transitionTime);
						}							
						else {
							HW.toggle(targets[i],trans,null,this.transitionTime);
						}
					}
				}
				break;
		}
	},
	/*
	* hideAll(c,s,t,trg,onload)
	* hide all target elements with a particular class
	* c			Class of elements to hide
	* s			Class of any elements to keep open
	* t			Transition style to use
	* trg		Object we're acting on
	* onload	Boolean value is true if we're running code on page load
	* Returns:	Nothing
	*/
	hideAll:function(c,s,t,trg,onload) {
		var obj = this;
		// get all the matching elements
		var elms = $$(c,document.body,null);
		// reset the counters so we know everything is hidden before we continue
		this.elmsToHide = 0;
		this.elmsHidden = 0;
		// need to loop twice to make sure we're done counting the items we need to hide before we hide them
		for(var i=0,j=elms.length;i<j;i++) {
			// if it doesn't have the class we want to keep, and is a target element then hide it
			if(!HW.hasClass(elms[i],s) && HW.hasClass(elms[i],this.targetClass)) {
				this.elmsToHide++;
			}
		}
		// once we are done counting we can hide the elements
		for(var i=0,j=elms.length;i<j;i++) {
			// hide it
			if(!HW.hasClass(elms[i],s) && HW.hasClass(elms[i],this.targetClass)) {
				// hide the element calling our checking function as a callback
				HW.hide(elms[i],t,function(){obj.checkAllHidden(trg,onload);},this.transitionTime);
			}
		}
	},
	/*
	* checkAllHidden(trg,onload)
	* checks if all the elements to hide are hidden before we continue
	* trg		Object trigger being acted on
	* onload	Boolean flag to track if code is being run on page load
	* Returns:	Nothing
	*/
	checkAllHidden:function(trg,onload) {
		// this function is called as a callback on hide so if it's being called it means an item has just been hidden so count it
		this.elmsHidden++;
		// if they're all hidden
		if(this.elmsHidden == this.elmsToHide) {
			// then fire our trigger again with a third parameter of true to show that it's the response to a hideall
			this.fireTrigger(trg,onload,true);
		}
	}
};
// set up the auto triggers
HW.onload(function(){HW.ShowHide.init();});

/*
--- END SHOWHIDE FUNCTIONS ---
*/
HW.ShowHide.Flash = {}
HW.ShowHide.Flash.show = function(css,trans) {
	_$(css).show(trans);
}
HW.ShowHide.Flash.hide = function(css,trans) {
	_$(css).hide(trans);
}
HW.ShowHide.Flash.toggle = function(css,trans) {
	_$(css).toggle(trans);
}