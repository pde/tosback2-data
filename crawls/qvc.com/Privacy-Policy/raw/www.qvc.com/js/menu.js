/* script to take out text in search bar */
window.addEvent('domready', function() {
	//SEARCH INPUT
	var eSearchInput = $('searchinput');
   if(eSearchInput != undefined){
	eSearchInput.value = '';
	eSearchInput.onblur = function() {
		var eSI = $('searchinput');
		if(eSI.value == '') {
			eSI.value = '';
		}
	};

	eSearchInput.onfocus = function() {
		var eSI = $('searchinput');
		if(eSI.value == '') {
			eSI.value = '';
		}
	};	
   }
  //checkTerm();
});


// QVC CODE Change 
// addEvent was changed from 'domready' to 'load' to account for the rest of the DOM that's on the page 
window.addEvent('load', function()
  {
    new RolloverMenu($ES('a', $E('#navlinks')), $ES('.sn')); 
	//THIS SETS FFANY LINK TO PINK	
	 $$('#fashion .snbtm ul li a').each(function(item, index) { //loops through array, gets href for each
			var currentLink = item.getProperty('href').contains('ffany_2008_main');
			if(currentLink == true){
				item.addClass('ffanylink');
			}
	  	});	
  }
);

//window.addEvent('load', function()
//  {
//    var myStyle = $E('.snbtm');
//    myStyle.style.background = 'red';
//  }
//);

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
            target.setStyles( { 'z-index': -1000 } );
            var activate = self.activate.bind(self, [trigger, target]);
            trigger.addEvent('mouseover', activate);
            trigger.addEvent('mouseout', deactivate);
            target.addEvent('mouseover', activate);
            target.addEvent('mouseout', deactivate);
        });

        // for ie6, create an iframe underneath the active target
        if (window.ie6) {
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




/*START SMOOTHBOX**********************************************************/

/*
 * Smoothbox by Boris Popoff (http://gueschla.com)
 *
 * Based on Cody Lindley's Thickbox, MIT License
 *
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

// on page load call TB_init
window.addEvent('domready', TB_init);

// prevent javascript error before the content has loaded
TB_WIDTH = 0;
TB_HEIGHT = 0;
var TB_doneOnce = 0 ;

// add smoothbox to href elements that have a class of .smoothbox
function TB_init(){
	$$("a.smoothbox").each(function(el){el.onclick=TB_bind});
}

function TB_bind(event) {
	var event = new Event(event);
	// stop default behaviour
	event.preventDefault();
	// remove click border
	this.blur();
	// get caption: either title or name attribute
	var caption = this.title || this.name || "";
	// get rel attribute for image groups
	var group = this.rel || false;
	// display the box for the elements href
	TB_show(caption, this.href, group);
	this.onclick=TB_bind;
	return false;
}


// called when the user clicks on a smoothbox link
function TB_show(caption, url, rel) {

	// create iframe, overlay and box if non-existent

	if ( !$("TB_overlay") )
	{
		new Element('iframe').setProperty('id', 'TB_HideSelect').setProperty('src', 'https://quality-s.qvc.com/blank.html').injectInside(document.body);
		new Element('div').setProperty('id', 'TB_overlay').injectInside(document.body);
		TB_overlaySize();
		new Element('div').setProperty('id', 'TB_load').injectInside(document.body);
		$('TB_load').innerHTML = "<img src='/pic/loading.gif' />";
		TB_load_position();
		new Fx.Style('TB_overlay', 'opacity',{duration: 400, transition: Fx.Transitions.sineInOut}).start(0,0.6);
	}
	
	if ( !$("TB_load") )
	{		
		new Element('div').setProperty('id', 'TB_load').injectInside(document.body);
		$('TB_load').innerHTML = "<img src='/pic/loading.gif' />";
		TB_load_position();
	}
	
	if ( !$("TB_window") )
	{
		new Element('div').setProperty('id', 'TB_window').injectInside(document.body);
	}
	
	$("TB_overlay").onclick=TB_remove;
	window.onscroll=TB_positionEffect;

	// check if a query string is involved
	var baseURL = url.match(/(.+)?/)[1] || url;

	// regex to check if a href refers to an image
	var imageURL = /\.(jpe?g|png|gif|bmp)/gi;

	// check for images
	if ( baseURL.match(imageURL) ) {
		var dummy = { caption: "", url: "", html: "" };
		
		var prev = dummy,
			next = dummy,
			imageCount = "";
			
		// if an image group is given
		if ( rel ) {
			function getInfo(image, id, label) {
				return {
					caption: image.title,
					url: image.href,
					html: "<span id='TB_" + id + "'>&nbsp;&nbsp;<a href='#'>" + label + "</a></span>"
				}
			}
		
		
		
		
		
			// find the anchors that point to the group
			var imageGroup = [] ;
			$$("a.smoothbox").each(function(el){
				if (el.rel==rel) {imageGroup[imageGroup.length] = el ;}
			})

			var foundSelf = false;
			
			// loop through the anchors, looking for ourself, saving information about previous and next image
			for (var i = 0; i < imageGroup.length; i++) {
				var image = imageGroup[i];
				var urlTypeTemp = image.href.match(imageURL);
				
				// look for ourself
				if ( image.href == url ) {
					foundSelf = true;
					imageCount = "Image " + (i + 1) + " of "+ (imageGroup.length);
				} else {
					// when we found ourself, the current is the next image
					if ( foundSelf ) {
						next = getInfo(image, "next", "Next &gt;");
						// stop searching
						break;
					} else {
						// didn't find ourself yet, so this may be the one before ourself
						prev = getInfo(image, "prev", "&lt; Prev");
					}
				}
			}
		}
		
		imgPreloader = new Image();
		imgPreloader.onload = function() {
			imgPreloader.onload = null;

			// Resizing large images
			var x = window.getWidth() - 150;
			var y = window.getHeight() - 150;
			var imageWidth = imgPreloader.width;
			var imageHeight = imgPreloader.height;
			if (imageWidth > x) {
				imageHeight = imageHeight * (x / imageWidth); 
				imageWidth = x; 
				if (imageHeight > y) { 
					imageWidth = imageWidth * (y / imageHeight); 
					imageHeight = y; 
				}
			} else if (imageHeight > y) { 
				imageWidth = imageWidth * (y / imageHeight); 
				imageHeight = y; 
				if (imageWidth > x) { 
					imageHeight = imageHeight * (x / imageWidth); 
					imageWidth = x;
				}
			}
			// End Resizing
			
			// TODO don't use globals
			TB_WIDTH = imageWidth + 30;
			TB_HEIGHT = imageHeight + 60;
			
			// TODO empty window content instead //  CLOSE BUTTON MOVED TO TOP-RIGHT OF OVERLAY 3/18/09 mdm//
			$("TB_window").innerHTML += "<div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a></div><a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='TB_caption'>"+caption+"<div id='TB_secondLine'>" + imageCount + prev.html + next.html + "</div></div>";
			
			//call to remove / close X window
			$("TB_closeWindowButton").onclick = TB_remove;
			
			function buildClickHandler(image) {
				return function() {
					$("TB_window").remove();
					new Element('div').setProperty('id', 'TB_window').injectInside(document.body);
					
					TB_show(image.caption, image.url, rel);
					return false;
				};
			}
			var goPrev = buildClickHandler(prev);
			var goNext = buildClickHandler(next);
			if ( $('TB_prev') ) {
				$("TB_prev").onclick = goPrev;
			}
			
			if ( $('TB_next') ) {		
				$("TB_next").onclick = goNext;
			}
			
			document.onkeydown = function(event) {
				var event = new Event(event);
				switch(event.code) {
				case 27:
					TB_remove();
					break;
				case 190:
					if( $('TB_next') ) {
						document.onkeydown = null;
						goNext();
					}
					break;
				case 188:
					if( $('TB_prev') ) {
						document.onkeydown = null;
						goPrev();
					}
					break;
				}
			}
			
			// TODO don't remove loader etc., just hide and show later
			$("TB_ImageOff").onclick = TB_remove;
			TB_position();
			TB_showWindow();
		}
		imgPreloader.src = url;
		
	} else { //code to show html pages
		
		var queryString = url.match(/\?(.+)/)[1];
		var params = TB_parseQuery( queryString );
		
		TB_WIDTH = (params['width']*1) + 30;
		TB_HEIGHT = (params['height']*1) + 40;
		
		// makes sure that the height of the overlay doesn't extend past the screen height
		if (TB_HEIGHT > window.getHeight()){
			TB_HEIGHT = window.getHeight();
			TB_WIDTH += 15;
		}		

		var ajaxContentW = TB_WIDTH - 30,
			ajaxContentH = TB_HEIGHT - 45;			
		
		if(url.indexOf('TB_iframe') != -1){				
			urlNoQuery = url.split('TB_');		
			//$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' onload='tb_showIframe()'> </iframe>");
			$("TB_window").innerHTML += "<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>Close</a></div></div><iframe frameBorder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' onload='TB_showWindow()'> </iframe>";
		} else {
			if(params['modal'] = "true"){
				$("TB_window").innerHTML += "<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>Close</a></div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>";
				$("TB_overlay").onclick=null;			
			}
		}
				
		$("TB_closeWindowButton").onclick = TB_remove;
				
			if(url.indexOf('TB_inline') != -1){	
				$("TB_ajaxContent").innerHTML = ($(params['inlineId']).innerHTML);
				TB_position();
				TB_showWindow();
			}else if(url.indexOf('TB_iframe') != -1){
				TB_position();
				if(frames['TB_iframeContent'] == undefined){//be nice to safari
					$(document).keyup( function(e){ var key = e.keyCode; if(key == 27){TB_remove()} });
					TB_showWindow();
				}
			}else{
				var handlerFunc = function(){
					TB_position();
					TB_showWindow();
				};
				var myRequest = new Ajax(url, {method: 'get',update: $("TB_ajaxContent"),onComplete: handlerFunc}).request();
			}
	}

	window.onresize=function(){ TB_position(); TB_load_position(); TB_overlaySize();}  
	
	document.onkeyup = function(event){ 	
		var event = new Event(event);
		if(event.code == 27){ // close
			TB_remove();
		}	
	}
		
}

//helper functions below

function TB_showWindow(){
	//$("TB_load").remove();
	//$("TB_window").setStyles({display:"block",opacity:'0'});
	
	if (TB_doneOnce==0) {
		TB_doneOnce = 1;
		var myFX = new Fx.Style('TB_window', 'opacity',{duration: 250, transition: Fx.Transitions.sineInOut, onComplete:function(){if ($('TB_load')) { $('TB_load').remove();}} }).start(0,1);
	} else {
		$('TB_window').setStyle('opacity',1);
		if ($('TB_load')) { $('TB_load').remove();}
	}
}

function TB_remove() {
 	$("TB_overlay").onclick=null;
	document.onkeyup=null;
	document.onkeydown=null;
	
	if ($('TB_imageOff')) $("TB_imageOff").onclick=null;
	if ($('TB_closeWindowButton')) $("TB_closeWindowButton").onclick=null;
	if ( $('TB_prev') ) { $("TB_prev").onclick = null; }
	if ( $('TB_next') ) { $("TB_next").onclick = null; }

	new Fx.Style('TB_window', 'opacity',{duration: 250, transition: Fx.Transitions.sineInOut, onComplete:function(){$('TB_window').remove();} }).start(1,0);
	new Fx.Style('TB_overlay', 'opacity',{duration: 400, transition: Fx.Transitions.sineInOut, onComplete:function(){$('TB_overlay').remove();} }).start(0.6,0);

	window.onscroll=null;
	window.onresize=null;	
	
	$('TB_HideSelect').remove();
	TB_init();
	TB_doneOnce = 0;
	return false;
}

function TB_position() {
	//$("TB_window").setStyles({width: TB_WIDTH+'px', 
	//			 left: (window.getScrollLeft() + (window.getWidth() - TB_WIDTH)/2)+'px',
	//			 top: (window.getScrollTop() + (window.getHeight() - TB_HEIGHT)/2)+'px'});
				 
  $("TB_window").setStyles({width: TB_WIDTH+'px', 
				 left: (window.getScrollLeft() + (window.getWidth() - TB_WIDTH)/2)+'px',
				 top: (window.getScrollTop() + (window.getHeight() - TB_HEIGHT)/2)+'px'});
        
}

function TB_positionEffect() {
	var pxwinTop = $('TB_window').style.top;
	var windowTop = pxwinTop.substr(0, pxwinTop.length-2);
	var windowBottom = (parseInt(windowTop) + TB_HEIGHT);
	// if overlay has scroll off the screen, need to recalc the windowTop
	if (windowTop < window.getScrollTop())
	{
	    windowTop = window.getScrollTop() + 'px';
	}
	else if (windowBottom  > (window.getHeight() + window.getScrollTop()))
	{
	    windowTop = windowTop - (windowBottom -(window.getScrollTop() + window.getHeight()));
	}
	new Fx.Styles('TB_window', {duration: 75, transition: Fx.Transitions.sineInOut}).start({
		'left':(window.getScrollLeft() + (window.getWidth() - TB_WIDTH)/2)+'px',
			'top': (windowTop) });
			

}

function TB_overlaySize(){
	// we have to set this to 0px before so we can reduce the size / width of the overflow onresize 
	// JR [9/13/2007] :: updated code to fix horizontal scroll in IE when the overlay is active.
	$("TB_overlay").setStyles({"height": '0px', "width": '0px'});
	$("TB_HideSelect").setStyles({"height": '0px', "width": '0px'});
	$("TB_overlay").setStyles({"height": window.getScrollHeight()+'px', "width": (window.getScrollWidth() - 25)+'px'});
	$("TB_HideSelect").setStyles({"height": window.getScrollHeight()+'px',"width": (window.getScrollWidth() - 25)+'px'});
}

function TB_load_position() {
	if ($("TB_load")) { $("TB_load").setStyles({left: (window.getScrollLeft() + (window.getWidth() - 56)/2)+'px', top: (window.getScrollTop() + ((window.getHeight()-20)/2))+'px',display:"block"}); }
}

function TB_parseQuery ( query ) {
	// return empty object
	if( !query )
		return {};
	var params = {};
	
	// parse query
	var pairs = query.split(/[;&]/);
	for ( var i = 0; i < pairs.length; i++ ) {
		var pair = pairs[i].split('=');
		if ( !pair || pair.length != 2 )
			continue;
		// unescape both key and value, replace "+" with spaces in value
		params[unescape(pair[0])] = unescape(pair[1]).replace(/\+/g, ' ');
   }
   return params;
}
window.addEvent("domready", function(){
var metaRA = new Array('fashion', 'handbags', 'jewelry', 'beauty', 'kitchen', 'forthehome', 'electronics', 'wellness', 'seasonal');
for (n= 0; n <= (metaRA.length - 1); n++) {
	getCommunityLinks(metaRA[n]);
}

});

function getCommunityLinks(metaName) {
//loop thru all links in footer section
	var commRA = $$('#' +  metaName + ' .snbtm a');
	for (i=0; i<= (commRA.length -1); i++){
		tempSRC = new String(commRA[i].getProperty('manual_cm_sp'));	
		//alert(tempSRC);
		var strLoc = tempSRC.indexOf('COMMUNITY1');
		//alert(strLoc);
		if (strLoc > 0)
		{
			commRA[i].addClass('snbtmCommunity');
		}
		var strLoc2 = tempSRC.indexOf('COMMUNITY2');
		if (strLoc2 > 0)
		{
			commRA[i].addClass('snbtmCommunity2');
		}
	} 
}
