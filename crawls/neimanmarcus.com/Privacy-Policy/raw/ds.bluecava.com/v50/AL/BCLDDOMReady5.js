//Version: 5.0.0.17
/*
 * Copyright (c) 2010-2012 by BlueCava, Inc. ALL RIGHTS RESERVED.
 * This document contains CONFIDENTIAL, PROPRIETARY, PATENTABLE 
 * and/or TRADE SECRET information belonging to BlueCava, Inc. and may
 * not be reproduced or adapted, in whole or in part, without prior
 * written permission from BlueCava, Inc.
 *
 * Additional copyright notices can be found here: http://lookup.bluecava.com/copyright/copyrights.htm
 */
 /*
* file: BCLDDOMReady.js
*
*
* Copyright (c) 2010 by BlueCava USA, Inc. ALL RIGHTS RESERVED.
* This document contains CONFIDENTIAL, PROPRIETARY, PATENTABLE 
* and/or TRADE SECRET information belonging to BlueCava, Inc. and may
* not be reproduced or adapted, in whole or in part, without prior
* written permission from BlueCava, Inc.
*
* version: 1.0
*
*/

//
//this was adapted from the jquery $(element).ready() implementation
//it does not support multiple functions to call when the DOM is ready as the jquery version does
//
//
var lW = false;
var lS = false;
var lV = {};

function lK() {
    // Make sure that the DOM is not already loaded
    if (!lW) {
        // Remember that the DOM is ready
        lW = true;
        // If there is a function bound, to execute
        if (lV) {         
            // Execute it
            lV();
            // Reset the function pointer
            lV = null;
        }
        // Trigger any bound ready events
        //jQuery(document).triggerHandler("ready");
    }
}

function BCLDReady(fn) {
    // Attach the listeners
    lQ();

    // If the DOM is already ready
    if (lW) {
        // Execute the function immediately
        fn.call(document);
    } else { // Otherwise, remember the function for later
        // store the function pointer
        lV = fn;
    }
    return this;
}


function lQ() {
    if (lS) {
        return;
    }

    lS = true;

    // Mozilla, Opera and webkit nightlies currently support this event
    if (document.addEventListener) {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", function () {
            document.removeEventListener("DOMContentLoaded", arguments.callee, false);
            lK();
        }, false);

        // If IE event model is used
    } else if (document.attachEvent) {
        // ensure firing before onload,
        // maybe late but safe also for iframes
        document.attachEvent("onreadystatechange", function () {
            if (document.readyState === "complete") {
                document.detachEvent("onreadystatechange", arguments.callee);
                lK();
            }
        });

        // If IE and not an iframe
        // continually check to see if the document is ready
        if (document.documentElement.doScroll && window == window.top) (function () {
            if (lW) return;

            try {
                // If IE is used, use the trick by Diego Perini
                // http://javascript.nwbox.com/IEContentLoaded/
                document.documentElement.doScroll("left");
            } catch (error) {
                setTimeout(arguments.callee, 0);
                return;
            }

            // and execute any waiting functions
            lK();
        })();
    }

    // A fallback to window.onload, that will always work
    window.onload = lK;
}
