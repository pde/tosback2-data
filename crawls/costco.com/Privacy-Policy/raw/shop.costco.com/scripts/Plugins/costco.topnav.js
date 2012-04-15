jQuery(document).ready(function() { 
  // Fix z-index issue in IE6
  if (jQuery.browser.msie && jQuery.browser.version < 7) {
  jQuery("div.TopNavRow1 > ul > li > ul").bgiframe();
  jQuery("div.TopNavRow2 > ul > li > ul").bgiframe();
  }
  
  // Initialize keyboard support	
	var drow1 = new DickerFisch("div.TopNavRow1",{NavTimeout: new Array(30,250),Fit2ViewportClass:'leftover',LimitLinks:0,Effect:0});
	var drow2 = new DickerFisch("div.TopNavRow2",{NavTimeout: new Array(30,250),Fit2ViewportClass:'leftover',LimitLinks:0,Effect:0});
  // Even Out the Navigation Categories (requires jQuery, jQuery Dimension plugin  
  
  jQuery("div.TopNavRow1 > ul > li").hoverIntent(
    function() {
		// Clear any keyboard popups
		jQuery("#MenuCell * .over").removeClass("over");
		// Check to see if menu should display to right or to left
		checkPulldownDirection(this);
    },
    function() {
      jQuery("div.TopNavRow1 > ul > li > ul").css({ left: ""});
    }
  );
  
  jQuery("div.TopNavRow2 > ul > li").hoverIntent(
    function() {
		// Clear any keyboard popups
		jQuery("#MenuCell * .over").removeClass("over");    
		// Check to see if menu should display to right or to left
		checkPulldownDirection(this);
    },
    function() {
      jQuery("div.TopNavRow2 > ul > li > ul").css({left: ""});
    }
  );  
});

function distributeListItems(selector, tagname)
{
  // Distribute "Extra Padding" by getting the width of multiple items in a container
	var numCategories=0,totalWidth=0,currentLeftover=0,itemPaddingLeft=0,itemPaddingRight=0,currentCounterLeft=0,currentCounterRight=0,itemCounterLeft=0,itemCounterRight=0;

  // Add up the overall width, increment number of categories
  jQuery(selector + " > " + tagname).each(function() {
    totalWidth += jQuery(this).outerWidth();
    numCategories++;
  });
  
  var containerWidth = jQuery(selector).width();  
  // Make sure last li has no margin-right and subtract the last li's margin-right from the total width of the tabs
  var marginRight = jQuery(selector + " > " + tagname + ":last-child").css('marginRight');
  marginRight = (marginRight == 'auto') ? 0 : parseInt(marginRight);
  totalWidth -= marginRight;
  // Set right margin to 0
  jQuery(selector + " > " + tagname + ":last-child").css({marginRight: 0});
  // Determine the number of "leftover" pixels
  var availWidth = containerWidth - totalWidth;  
  // Get the remaining width averaged by number of items
  // If positive, use floor() otherwise use ceil()
  var remainderPerItem = 0;  
  if(availWidth > 0) {
          remainderPerItem = Math.floor(availWidth / numCategories);
  }
  else {
          remainderPerItem = Math.ceil(availWidth / numCategories);
  } 	
  currentLeftover = remainderPerItem + availWidth % numCategories;
  // Different L/R padding if uneven remaining pixels...
  if(remainderPerItem > 0) {
          itemCounterLeft = itemCounterRight = Math.floor(remainderPerItem / 2);
  }
  else {
          itemCounterLeft = itemCounterRight = Math.ceil(remainderPerItem / 2);
  }
  itemCounterRight += remainderPerItem % 2;
  if(currentLeftover > 0) {
          currentCounterLeft = currentCounterRight = Math.floor(currentLeftover / 2);
  }
  else {
          currentCounterLeft = currentCounterRight = Math.ceil(currentLeftover / 2);
  }
  currentCounterRight += currentLeftover % 2;
  var totalRemainder = availWidth - ((itemCounterLeft*numCategories) + (itemCounterRight*numCategories));
  
	//console.log("currentLeftover:" + currentLeftover);
	//console.log("Overall Container:" + containerWidth);
	//console.log("Used Width:" + totalWidth);	
	//console.log("Available Width:" + availWidth);
	//console.log("RemainderPerItem:" + remainderPerItem);  
	//console.log("itemCounterLeft:" + itemCounterLeft); 
	//console.log("itemCounterRight:" + itemCounterRight);
	//console.log("totalRemainder:" + totalRemainder);
  
  // Add leftover width to padding of each category link
  jQuery(selector + " > " + tagname).each(function(i) {
    var padLeft = 0;
    var padRight = 0;
    var li = jQuery(this), 
            padLeft = itemCounterLeft + itemPaddingLeft, 
            padRight = itemCounterRight + itemPaddingRight;
    
    if(totalRemainder > 0)
    {
		padLeft = padLeft + 1;
		totalRemainder--;
	}           
	
    // Last category takes uses leftover pixels / 2 
    //if(i === (numCategories-1)) {
    //        padLeft = currentCounterLeft + itemPaddingLeft;
    //        padRight = currentCounterRight + itemPaddingRight;
    //}
	
    // Padding must be positive
    if(padLeft < 0) {
            padLeft = 0;
    }
    if(padRight < 0) {
            padRight = 0;
    }
	// assign padding results to container
    jQuery('a:first', li).css({paddingLeft: padLeft +'px', paddingRight: padRight +'px'});
  });
}
/* Modified: 10/8/2008 by bperry
* -Version 1.0 - incorporated keyboard support with additional ability to adapt show left/right dropdowns
* -TopNav Dropdown was modified from the DickerFisch system and adapted for jquery version 1.2.6
* -Incorporated updated Dimensioning from jquery Core libraries
*
* @author 	Alexander Farkas <a.farkas@pfirsichmelba.de> // http://pfirsichmelba.de 
* Dual licensed under the MIT (MIT-LICENSE.txt)
* and GPL (GPL-LICENSE.txt) licenses.
* 
* @version 0.5
* @param {String} $selector CSS-selector of the wrapping element, id-selector = beeter performance
* @param {options} [_settings] list of sveral options/settings
* 
* @option {Number|Array} [NavTimeout] delay to hide menu, if ypu use an array of two numbers, first is the delay for firstsubmenu, second for all other submenus, default is 250
* @option {String} [ListType] listtype i.e. ol (default = ul)
* @option {Number} [LimitLinks] 1 = (default) .active and .activepath submenus are available for keyboard users, Opera browser overrirdes this (because of spatial navigation),0 = all submenus are available for keyboard users. if you use this you should remove display:none for submenus -> better consistency for screenreader (the submenus stay hidden / are out of viewport), 2 = .active and .activepath submenus are available for keyboard users (Opera browser doesn�t override this)
*/
function DickerFisch($selector, _settings) {
    //config start
    //classnames: Styles
    var _DF_hoverclass = 'over', _DF_parent_class = 'parent', $ofocusstyle = 'ofocus';
    //Array 0 = ancestors of active li-category | 1 = active li category
    var _DF_ActiveCatnAncestorsofIT = new Array(".activepath", ".active");
    var _jsreadyclass = 'navfxenabled';
    var _DF_hideclass = 'DF_hidelis', _waitingnavclass = 'DF_waitlis';
    // effect css-class: visible class value and hidden class value see/same in CleanCSSAnimation/unMakeInlineCSS, will be removed after animation
    var $nodisClass = "displaynone", $disClass = "displayblock";
    //config end
    var _DF_obj = this;
    //optional parameter
    var _settings = _settings || this;
    this.NavTimeout = _settings.NavTimeout || 250;
    this.ListType = _settings.ListType || 'ul';
    this.Effect = (_settings.Effect) ? _settings.Effect : 0;
    this.ShowEffect = _settings.ShowEffect || 'show';
    this.HideEffect = _settings.HideEffect || 'hide';
    this.EffectSpeed = _settings.EffectSpeed || 300;
    this.FitIfViewportSmaller = _settings.FitIfViewportSmaller || 1111;
    this.Fit2ViewportClass = _settings.Fit2ViewportClass || false;
    this.LimitLinks = (typeof _settings.LimitLinks == "number") ? _settings.LimitLinks : 1;
    _DF_obj.LimitLinks = (jQuery.browser.opera && _DF_obj.LimitLinks == "1") ? 0 : _DF_obj.LimitLinks;
    this._DF_NavTimeID;
    //methods
    this._fastpullout = function(_eventobj) {
        var $fastpullreturn = false;
        if (typeof jQuery($selector + ' li.' + _DF_hoverclass).get(0) == "undefined")
            $fastpullreturn = true;
        else {
            $fastpullreturn = true;
            jQuery(_eventobj).siblings("li").each(function(i) {
                if (jQuery(this).is('.' + _DF_hoverclass)) {
                    $fastpullreturn = false;
                    return false; //=break
                }
            });
        }
        return $fastpullreturn;
    };
    this.$oldtimer = 0;
    this.$fastpullin = function(_eventobj) {
        var $aktimer = (typeof _DF_obj.NavTimeout != "number") ? _DF_obj.NavTimeout[1] : _DF_obj.NavTimeout;
        if (typeof _DF_obj.NavTimeout != "number" && jQuery(_eventobj).parents('li').length == "0" && !jQuery(_eventobj).children(_DF_obj.ListType).children('li').is('.' + _DF_hoverclass))
            $aktimer = _DF_obj.NavTimeout[0];
        if (jQuery(_eventobj).is('.' + _DF_hoverclass) || _DF_obj.$oldtimer != $aktimer) {
            window.clearTimeout(_DF_obj._DF_NavTimeID);
            _DF_obj._DF_NavTimeID = window.setTimeout(_DF_obj._hide, $aktimer);
        }
        _DF_obj.$oldtimer = $aktimer;
    };
    this.$navstatus = function(_eventobj, $action) {
        if ($action == "show") {
            jQuery(_eventobj).addClass(_waitingnavclass).removeClass(_DF_hideclass);
            if (_DF_obj._fastpullout(_eventobj))
                _DF_obj.$show();
        } else if ($action == "hide")
            jQuery(_eventobj).removeClass(_waitingnavclass).addClass(_DF_hideclass);
        _DF_obj.$fastpullin(_eventobj, 'pullin');
    };
    this.$show = function() {
        _showobj = $selector + ' li.' + _waitingnavclass;
        if (_DF_obj.Effect == 1 || _DF_obj.Effect == 2)
            jQuery(_showobj + ':not(.' + _DF_hoverclass + ')>' + _DF_obj.ListType).addClass($nodisClass).CleanCSSAnimation(_DF_obj.ShowEffect, _DF_obj.EffectSpeed, function() {
                jQuery(this).removeClass($disClass);
            });
        jQuery(_showobj).removeClass(_waitingnavclass).addClass(_DF_hoverclass);
    };
    this._hide = function() {
        $hideobj = $selector + ' li.' + _DF_hideclass;
        if (_DF_obj.Effect == 1 || _DF_obj.Effect == 3)
            jQuery($hideobj).removeClass(_DF_hideclass).children(_DF_obj.ListType).CleanCSSAnimation(_DF_obj.HideEffect, _DF_obj.EffectSpeed, function() {
                jQuery(this).removeClass($nodisClass).parent('li').removeClass(_DF_hoverclass);
                _DF_obj.$show();
            });
        else {
            jQuery($hideobj).removeClass(_DF_hoverclass + ' ' + _DF_hideclass);
            _DF_obj.$show();
        }
    };
    this.FitToScreen = function($liobj) {
        var $subpos = jQuery($liobj).addClass(_DF_hoverclass).children(_DF_obj.ListType).css('visibility', 'hidden').offset()['left'] + jQuery($liobj).children(_DF_obj.ListType).outerWidth();
        if (_viewport < $subpos)
            jQuery($liobj).children(_DF_obj.ListType).addClass(_DF_obj.Fit2ViewportClass);
    };
    if (_DF_obj.Fit2ViewportClass) {
        var _viewport = jQuery(document).width();
        _DF_obj.Fit2ViewportClass = (_viewport < _DF_obj.FitIfViewportSmaller) ? _DF_obj.Fit2ViewportClass : false;
    }
    //Init
    jQuery($selector + ">" + _DF_obj.ListType).addClass(_jsreadyclass).find("li:has(" + _DF_obj.ListType + ")").each(function() {
        //Mouse Init
        jQuery(this).hoverIntent(function() {
            _DF_obj.$navstatus(this, 'show');
        }, function() {
            _DF_obj.$navstatus(this, 'hide');
        }
		).addClass(_DF_parent_class).find('a').focus(function() {
		    jQuery(this).addClass($ofocusstyle);
		    if (_DF_obj.LimitLinks < 1)
		        jQuery(this).parents('li').addClass(_DF_hoverclass);
		    else
		        jQuery(this).parents('li').filter(_DF_ActiveCatnAncestorsofIT[0] + ',' + _DF_ActiveCatnAncestorsofIT[1]).addClass(_DF_hoverclass);
		}).blur(function() {
		    jQuery(this).removeClass($ofocusstyle).parents("li").removeClass(_DF_hoverclass);
		});
        if (_DF_obj.Fit2ViewportClass)
            _DF_obj.FitToScreen(this);
    });
    if (_DF_obj.Fit2ViewportClass)
        jQuery($selector + " li:has(" + _DF_obj.ListType + ")").removeClass(_DF_hoverclass).children(_DF_obj.ListType).css('visibility', '');
};

function checkPulldownDirection(object) {
    // Determine whether to show the menu to the left or to the right
    // Get width of Pulldown
    // Get distance from menu.left to offset + width (right edge) of container
    // If distance > width, switch from left edge to right edge  
    var pulldownWidth = 0;
    var containerWidth = 0;
    var myWidth = 0;
    var leftPosition = 0;
    var distance = 0;
    //alert(jQuery(object).html());
    pulldownWidth = jQuery(object).children("ul").outerWidth();
    var offset = jQuery(object).offset();
    myWidth = jQuery(object).outerWidth();
    leftPosition = offset.left;
    containerWidth = jQuery(object).parent().outerWidth();
    var parentOffset = jQuery(object).parent().offset();
    var distance = (parentOffset.left + containerWidth) - leftPosition;
    //console.log("pulldownWidth: " + pulldownWidth);  
    //console.log("leftPosition: " + leftPosition);
    if (distance < pulldownWidth) {
        var newOffset = 0;
        newOffset = leftPosition - (pulldownWidth - myWidth);
        jQuery(object).children("ul").css({ left: newOffset });
    } else {
        jQuery(object).children("ul").css({ left: leftPosition });
    }
}

// Client-side redirect function
function GtL(s) { top.location.href = s; }

//This was added for web studio problem with
function GtL_S(s) { location.href = s; }

