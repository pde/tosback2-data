/*
Script: incMenu.js
version: v1.0.2
*/

// QVC CODE Change 
// addEvent was changed from 'domready' to 'load' to account for the rest of the DOM that's on the page 
window.addEvent('load', function()
  {	  
  	if ( $('divMenuHeader') ){
		new RolloverMenu(($('divMenuHeader').getElements('a')), document.getElements('.dropdown'));
	}
  }
);

var RolloverMenu = new Class({
    options: {
        
        mouseoverTimeout: 200,
        mouseoutTimeout: 200,
        rolloverClass: 'highlighted'
    },

    initialize: function (rolloverElements, menuElements) {
        this.setOptions(this.options);
        var self = this;
        var deactivate = this.deactivate.bind(this);
		
        // Bindings on mouseover and mouseout for each trigger and target
        rolloverElements.each(function (trigger, index) {
            self.rightTrigger = trigger;  // the rightmost menu item
            var target = menuElements[index];
			
            // set z-order in case it isn't set in css
			if ( target != null && target  != 'undefined' ){
				target.setStyles( { 'z-index': -1000 } );
				var activate = self.activate.bind(self, [trigger, target]);
				trigger.addEvent('mouseover', activate);
				trigger.addEvent('mouseout', deactivate);
				target.addEvent('mouseover', activate);
				target.addEvent('mouseout', deactivate);
			}
        });

        // for ie6, create an iframe underneath the active target
        if (Browser.Engine.trident) {
            this.mask = new Element('iframe', { styles: {
                position: 'absolute', border: 0,
                'z-index': 999, display: 'none'
            }});
                  this.mask.src = "javascript:'<html></html>';";
                  this.mask.inject(document.body);
        }
    },

    // activate will be triggered on every mouseover
    activate: function (trigger, target) {
        // if we're set to process another mouseover of mouseout, suppress it
        if (this.timeout) { $clear(this.timeout); }
        this.timeout = this.styleActive.delay(
            this.options.mouseoverTimeout, this, [target, true, trigger]);
    },

    // deactivate will be triggered on every mouseout
    deactivate: function () {
        // if we're set to process another mouseover of mouseout, suppress it
        if (this.timeout) { $clear(this.timeout); }
        this.timeout = this.styleActive.delay(
            this.options.mouseoutTimeout, this);
    },

    // set styles on target and trigger elements. (the real state change)
    styleActive: function (target, active, trigger) {
        // if need be, deactive a previously active trigger/target pair
        if (this.lastTarget && target != this.lastTarget) {
            this.lastTrigger.removeClass(this.options.rolloverClass);
            this.lastTarget.setStyles({
                visibility: 'hidden', position: 'absolute', 'z-index': -1000
            });
            // hide mask as well, if we have one
            if (this.mask) { this.mask.setStyle('display', 'none'); }
        }

        if (target && active) {
            // activate target and trigger, and remember the selection
            this.lastTarget = target;
            if (trigger) {
                this.lastTrigger = trigger;


                trigger.addClass(this.options.rolloverClass);
                this.positionTarget(target, trigger);
            }
            target.setStyles({ visibility: 'visible', 'z-index': 1000 });
        } else {
            // we don't have an active selection
            this.lastTarget = this.lastTrigger = null;
        }
    },

    positionTarget: function (target, trigger) {
        var rightBoundary = this.rightTrigger.getCoordinates().right;
        var triggerDims = trigger.getCoordinates();
        var targetDims = target.getCoordinates();

        // left-align target with trigger menu item, space permitting
        var left = triggerDims.left;
        if (left + targetDims.width > rightBoundary) {
            // otherwise, we right-align the pair
            left = triggerDims.right - targetDims.width;
        }
        target.setStyles({ top: triggerDims.bottom, left: left });

        // position mask for ie6
        if (this.mask) {
            this.mask.setStyles({
                display: 'block',
                top: triggerDims.bottom, left: left,
                width: targetDims.width, height: targetDims.height
            });
        }
    }
});

RolloverMenu.implement(new Options);

function getElementsByClass( searchClass ) {
	
	var classElements = new Array();
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	
	var allHTMLElements = document.getElementsByTagName("*");
	
	for (i=0; i<allHTMLElements.length; i++) {
		if (pattern.test(allHTMLElements[i].className) ) {
			classElements.push(allHTMLElements[i]) 
		}
	}
	return classElements;

}

window.addEvent('domready', function(){
	$$('#divMenuText a').each(function (ele){	
			ele.addEvent('click', function(){
			 								
				var url = ele.getProperty('href');
				var categoryIndex = url.indexOf('.category');
				var siteIndex = url.indexOf('.com/');
					if(siteIndex < 0) siteIndex = url.indexOf('.net/');					
					
				if(categoryIndex > -1 && siteIndex > -1){
					var canonDesc = url.substring(siteIndex+5,categoryIndex);
					Cookie.dispose('canonicalDesc',{path: '/'});
					Cookie.dispose('frombreadcrumbs',{path: '/'});
					Cookie.write('canonicalDesc',canonDesc,{path: '/'});
				}
			});
	});
});