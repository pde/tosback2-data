/*
(C) Copyright MarketLive. 2006. All rights reserved.
MarketLive is a trademark of MarketLive, Inc.
Warning: This computer program is protected by copyright law and international treaties.
Unauthorized reproduction or distribution of this program, or any portion of it, may result
in severe civil and criminal penalties, and will be prosecuted to the maximum extent
possible under the law.
*/

/** Preload image function: takes an array of img srouces. **/
function preload(aImgSrc){
    for (var i=0; i<aImgSrc.length; i++){
        var newImg = new Image();
        newImg.src = aImgSrc[i];
        aImgSrc["img_"+i] = newImg;
     }
}

/* ************************************************************************************************** */
/* rollover.js */
/* ************************************************************************************************** */

/** Img rollover function. **/
function rollover(name,source){
    document.images[name].src=source;
}

/**
 * CSS rollover function. Swaps out one css className for another, based on it's On or Off state.
 * @param {Object} oElement This is a DOM element ref.
 * This is modified to include color code based on category level attribute.
 */
function cssRollOver(oElement,colorCode){
	var sCSSClass = oElement.className;
	var elementId="#"+oElement.id+" a";
    if(sCSSClass.indexOf("On") != -1 ) {
      oElement.className = sCSSClass.replace(/On/, "Off");
	  jQuery(elementId).removeAttr("style");
    } else if (sCSSClass.indexOf("Off") != -1 ) {
      oElement.className = sCSSClass.replace(/Off/, "On");
	  if(colorCode!=null)
	  jQuery(elementId).css('color',colorCode);
    }
}
function getVariableValue(variableName) {
    // the "getOmnitureVariable" method is defined in /omniture/parseOmnitureJSON.js
    // check to see if this method is available before calling it
    if (typeof(getOmnitureVariable) != "undefined") {
        return getOmnitureVariable(variableName);
    }
}
/**
 * This function is used for capturing omniture evars events on click event
 * @param {elementClicked} oElement This is a element clicked.
 */
function setOmnitureVar(elementClicked){
		//alert(elementClicked);		
		var omnitureJSONObj = {};
		var socialLikesEvar = 'eVar45';
		varinfoTabsEvent="event25";
		if(elementClicked=='pin')
		omnitureJSONObj[socialLikesEvar] = "pinterest";
		//if(elementClicked=='storyBehind')
		//omnitureJSONObj[varinfoTabsEvent] = null;
		/*if(elementClicked=='tweet')
		omnitureJSONObj[socialLikesEvar] = "tweet";
		alert(omnitureJSONObj);
		alert(JSON.stringify(omnitureJSONObj));*/
		parseOmnitureJSON(omnitureJSONObj);
}

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}