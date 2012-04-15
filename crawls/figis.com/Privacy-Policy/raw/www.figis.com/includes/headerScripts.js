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
 */
function cssRollOver(oElement){
    var sCSSClass = oElement.className;
    if(sCSSClass.indexOf("On") != -1 ) {
      oElement.className = sCSSClass.replace(/On/, "Off");
    } else if (sCSSClass.indexOf("Off") != -1 ) {
      oElement.className = sCSSClass.replace(/Off/, "On");
    }
}

function getVariableValue(variableName) {
    // the "getOmnitureVariable" method is defined in /omniture/parseOmnitureJSON.js
    // check to see if this method is available before calling it
    if (typeof(getOmnitureVariable) != "undefined") {
        return getOmnitureVariable(variableName);
    }
}