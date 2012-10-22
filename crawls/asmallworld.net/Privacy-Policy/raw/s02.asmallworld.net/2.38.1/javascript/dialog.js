//dialog.js : styles an element with the selected border style

var dialog = {
  
  /* generic cross-browser addEvent function */
  addEvent : function(obj, type, fn){
    if(obj.addEventListener){
      obj.addEventListener(type, fn, false);
    }else if(obj.attachEvent){
      obj['e' + type + fn ] = fn;
      obj[type + fn] = function(){
        obj[ 'e' + type + fn ]( window.event );
      }
      obj.attachEvent( 'on' + type, obj[type + fn] );
    }
  },  
  /* converts string to camel case version */
  camelize : function(s){
    return s.replace(/-(\w)/g, function (strMatch, p1){
      return p1.toUpperCase();
    });
  },
  /* converts string to hyphenated version */
  uncamelize : function(s, sep){
    sep = sep || '-';
    return s.replace(/([a-z])([A-Z])/g, function (strMatch, p1, p2){
      return p1 + sep + p2.toLowerCase();
    });
  },
  /* updates the element with the given styles */
  setStyles : function(element, styles){
    for(property in styles){
      if(!styles.hasOwnProperty(property)) continue;
      if(element.style.setProperty) {
        //DOM2 style method
        element.style.setProperty(
        dialog.uncamelize(property,'-'),styles[property],null);
      } else {
        //alternative method
        element.style[dialog.camelize(property)] = styles[property];
      }
    }
  },
  /* adds a class to the given element */
  addClass : function(element, className){
    element.className += (element.className ? ' ' : '' ) + className;
  },
  isIgnorable : function(element){
    return ( (element.nodeType == 8) || ( element.nodeType == 3) );
  },
  getFirstNode : function(element){
    var first = element.firstChild;
    while(first){
      if(!dialog.isIgnorable(first)) return first;
      first = first.nextSibling;
    }
    return null;
  },
  /* styles the given element based on the name given (dialog|balloon) */
  modify : function(element, name){
    
    var arrowError = (name.contains("-balloon"));
    if (name == "error") name = "error-balloon";
    
    dialog.addClass(element, name + '-cb');
    var container = document.createElement('div');
    dialog.addClass(container, 'overlay-content');
    
    //setup content element
    /*
    var contentNodes = element.childNodes;
    alert(contentNodes.length);
    for(var i = 0; i < contentNodes.length; i++){
        var content = contentNodes[i];
        alert(content.nodeType);
        content.parentNode.removeChild(content);
        container.appendChild(content);
    }
    */
               
    var content = dialog.getFirstNode(element);
    if(content){
      content.parentNode.removeChild(content);
      container.appendChild(content);
    }
    
    //add top border
    var topBorder = document.createElement('div');    
    dialog.addClass(topBorder, name + '-bt');
    topBorder.appendChild( document.createElement('div') );
    element.appendChild(topBorder);
    
    //add left border
    var midBorder1 = document.createElement('div');                    
    dialog.addClass(midBorder1, name + '-i1');
    element.appendChild(midBorder1);
    
    //add right border
    var midBorder2 = document.createElement('div');
    dialog.addClass(midBorder2, name + '-i2');
    midBorder1.appendChild(midBorder2);    
    
    //inner container
    var midBorder3 = document.createElement('div');
    dialog.addClass(midBorder3, name + '-i3');
    midBorder2.appendChild(midBorder3);
    midBorder3.appendChild(container);
    
    //add bottom border
    var botBorder = document.createElement('div');
    dialog.addClass(botBorder, name + '-bb');
    botBorder.appendChild( document.createElement('div') );
    element.appendChild(botBorder);
    
    //if balloon add arrow
    if(name == 'balloon'){
      var arr = document.createElement('div');
      dialog.addClass(arr, name + '-arrow');
      container.appendChild(arr);
      // arrow is now a background image on above element
	  // please see balloon.css for definition
    }
    
    //if error-balloon add arrow
    if(arrowError){
        var arr = document.createElement('div');
      dialog.addClass(arr, name + '-arrow');
      container.appendChild(arr);
      
      var arrImg = document.createElement('img');
      arrImg.setAttribute('alt', name);
      arrImg.setAttribute('src', static_server + '/images/dialog/error-arrow.gif');
      arr.appendChild(arrImg);
    }    
    
  }
};

function loadToolTip(options){
  var currTime = new Date().getTime();
  var toolTipID = "tooltip-dialog-" + currTime;

  if (options.target && options.compositeField && options.defaultField) {
    var i = 0;
    var f = options.target;
    targetEl = f[options.compositeField[options.defaultField]];
  } else if (options.target) {
    targetEl = options.target;
  }

  if (options.target && options.relative) {
    var toolTipWrpID = 'balloon-dialog-wrp' + currTime;

    // If balloon wrap doesn't exist, then create.  Otherwise, replace ID
    if (!jQuery(targetEl.parentNode).hasClass("balloon-dialog-wrp"))
      jQuery(targetEl).wrap('<span id="' + toolTipWrpID + '" class="balloon-dialog-wrp"></span>');
    else 
      targetEl.parentNode.id = toolTipWrpID;

    insertEl = jQuery('#'+toolTipWrpID);
    var floatedTarget = jQuery(targetEl).css("float");
    if (floatedTarget != "none") jQuery(insertEl).css({ 'float' : floatedTarget });
  } else {
    insertEl = 'body';
  }
  jQuery(insertEl).prepend("<div id='" + toolTipID + "'><strong>" + options.errorMsg + "</strong></div>");
  var toolTip = jQuery("#"+toolTipID)[0];
  jQuery(toolTip).addClass("balloon-dialog");
  //use dialog js to style rounded corners 
  dialog.modify(toolTip, options.name);
  
  //set width
  if (options.width) {
    jQuery(toolTip).css({
      width: options.width + 'px'
    });
  }
  
  if (options.target) {
    // get heights
    var toolTipHeight = jQuery(toolTip).height();
    var targetHeight = jQuery(targetEl).height();
    var topOffset = 25;
    var leftOffset = 39;
    var toolTipTop = (options.relative) ? "-" + (toolTipHeight + topOffset) : jQuery(targetEl).offset().top - toolTipHeight - topOffset;
    var toolTipLeft = (options.relative) ? "-" + leftOffset : jQuery(targetEl).offset().left - leftOffset;

    var isIE=(navigator.userAgent.indexOf("IE")>-1)?true:false;
    if (isIE && jQuery("#new-event-form")){ /* bugfix in the new event page in IE */
        toolTipTop-=15;
    }

    jQuery(toolTip).css({
      'visibility': 'visible',
      'top': toolTipTop + "px",
      'left': toolTipLeft + "px"
    });
    
    if (options.compositeField) {
      for (field in options.compositeField) {
        jQuery(f[field]).change(function(){
          jQuery("div").remove("#" + toolTipID);
        });
      }
    } else {
      if (targetEl.tagName.toLowerCase() == "select") {
        jQuery(targetEl).change(function(){
          jQuery("div").remove("#" + toolTipID);
          // unbind this listener after tooltip removal
          jQuery(targetEl).unbind('change');
        });
      }
      else {
        if (isCheckableInput(targetEl)) {
          jQuery(targetEl).click(function(){
            jQuery("div").remove("#" + toolTipID);
          });
        }
        else {
          jQuery(targetEl).focus(function(){
            jQuery("div").remove("#" + toolTipID);
          });
        }
      }
    }
        
    if (options.scroll) {
      var scrollOffset = toolTipHeight + targetHeight + 25;
      myScroller.stepDelay = 5;
      myScroller.anchorScroll(YAHOO.util.Dom.getDocumentScrollTop(), targetEl, {
        checkBottom: false,
        includeHeight: false,
        offset: scrollOffset
      });
    }
  }
}


