/* OnlineOpinion v5.4.8 */
/* Released: 11/9/2011 */
/* Components: Full */
/* The following code is Copyright 1998-2011 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab.com */

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

var SC = getCookie('SC');
var RCUSID = '';

if (SC.search(/rc\.usid/i) !== -1) {
    var scArray = SC.split('RC.USID');
    if (scArray[1].search(/&/i) !== -1) {
        var rcArray = scArray[1].split('&');
        RCUSID = rcArray[0].substring(1, rcArray[0].length);
    }
    else {
        RCUSID = scArray[1].substring(1, scArray[1].length);
    }
}

/* Inline configuration */
var oo_feedback = new OOo.Ocode({
    customVariables: {
        visitorID: RCUSID
    }
});

