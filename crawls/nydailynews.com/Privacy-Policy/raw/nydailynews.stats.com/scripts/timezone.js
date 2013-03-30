function getObject(strName) {
    var myobject
    if (document.all) {
        myobject = document.all[strName];
    }
    else if (document.getElementById) {
        myobject = document.getElementById(strName);
    }
    return myobject;
}

function getLocalizedDateObject(existingDate, newtimezone, timezone) {
    var timePattern = /(\d\d?)\/(\d\d?)\/(\d\d\d\d) (\d\d?):(\d\d) *([ap]?\.?m?\.?) *(e?t?)/i;
    var timearr = existingDate.match(timePattern);
    var month, day, year, hour, mins, ampm = "", tz = "";
    if (timearr.length == 8) { tz = timearr[7]; ampm = timearr[6]; }
    if (timearr.length == 7) { tz = timearr[6]; ampm = ""; }
    if (timearr.length >= 6) mins = timearr[5];
    if (timearr.length >= 5) hour = timearr[4];
    if (timearr.length >= 4) year = timearr[3];
    if (timearr.length >= 3) day = timearr[2];
    if (timearr.length >= 2) month = timearr[1];
    var cleanampm = ampm.replace(/\./g, "");
    var mydate = new Date();
    var mytime = (month + "/" + day + "/" + year + " " + hour + ":" + mins + " " + cleanampm).toUpperCase();
    mydate.setTime(Date.parse(mytime));
    mydate = adjustDateForLocalTimezone(mydate, newtimezone, timezone);
    return mydate;
}

function localizeTime(existingTime, newtimezone, timezone) {
    var timePattern = /(\d\d?):(\d\d) *([ap]?\.?m?\.?) *(e?t?)/i;
    var timearr = existingTime.match(timePattern);
    var hour, mins, ampm = "", tz = "";
    if (timearr.length == 5) { tz = timearr[4]; ampm = timearr[3]; }
    if (timearr.length == 4) { tz = timearr[3]; ampm = ""; }
    if (timearr.length >= 3) mins = timearr[2];
    if (timearr.length >= 2) hour = timearr[1];
    var cleanampm = ampm.replace(/\./g, "");
    var mydate = new Date();
    var mytime = ((mydate.getMonth() + 1) + "/" + mydate.getDate() + "/" + mydate.getFullYear() + " " + hour + ":" + mins + " " + cleanampm).toUpperCase();
    mydate.setTime(Date.parse(mytime));
    mydate = adjustDateForLocalTimezone(mydate, newtimezone, timezone);
    if (ampm == "p.m.") ampm = "a.m.";
    else if (ampm == "P.M.") ampm = "A.M.";
    else if (ampm == "pm") ampm = "am";
    else if (ampm == "PM") ampm = "AM";
    if (ampm != "") ampm = " " + ampm;
    if (tz != "") tz = " TZ";
    if (ampm != "")
        return formatDate(mydate, "HH:MI" + ampm + tz, newtimezone);
    else
        return formatDate(mydate, "HH24:MI" + tz, newtimezone);
}

function zeroPad(target_string, desired_width) {
    var pad_string = "";
    target_string = "" + target_string;
    for (var x = 0; x < desired_width - target_string.length; x++)
        pad_string += "0";
    return pad_string + target_string;
}
function formatDate(dDate, sPattern, newtimezone) {
    if (sPattern.indexOf("MM") >= 0)
        sPattern = sPattern.replace(/MM/, dDate.getMonth() + 1);
    if (sPattern.indexOf("YYYY") >= 0)
        sPattern = sPattern.replace(/YYYY/, dDate.getFullYear());
    if (sPattern.indexOf("DD") >= 0)
        sPattern = sPattern.replace(/DD/, zeroPad(dDate.getDate(), 2));
    if (sPattern.indexOf("DAY") >= 0)
        sPattern = sPattern.replace(/DAY/, getDayName(dDate.getDay()));
    if (sPattern.indexOf("HH24") >= 0)
        sPattern = sPattern.replace(/HH24/, dDate.getHours());
    if (sPattern.indexOf("HH") >= 0)
        sPattern = sPattern.replace(/HH/, dDate.getHours() % 12 == 0 ? 12 : dDate.getHours() % 12);
    if (sPattern.indexOf("MI") >= 0)
        sPattern = sPattern.replace(/MI/, zeroPad(dDate.getMinutes(), 2));
    if (sPattern.indexOf("AM") >= 0)
        sPattern = sPattern.replace(/AM/, dDate.getHours() >= 12 ? "PM" : "AM");
    if (sPattern.indexOf("am") >= 0)
        sPattern = sPattern.replace(/am/, dDate.getHours() >= 12 ? "pm" : "am");
    if (sPattern.indexOf("A.M.") >= 0)
        sPattern = sPattern.replace(/A.M./, dDate.getHours() >= 12 ? "P.M." : "A.M.");
    if (sPattern.indexOf("a.m.") >= 0)
        sPattern = sPattern.replace(/a.m./, dDate.getHours() >= 12 ? "p.m." : "a.m.");
    if (sPattern.indexOf("TZ") >= 0) {
        if (newtimezone == null) {
            var timezone = "";
            switch (dDate.getTimezoneOffset()) {
                case -330: timezone = "IST"; break;
                case -120: timezone = "CET"; break;
                case -60: timezone = "GMT"; break;
                case 240: timezone = "ET"; break;
                case 300: timezone = "CT"; break;
                case 360: timezone = "MT"; break;
                case 420: timezone = "PT"; break;
            }
            sPattern = sPattern.replace(/TZ/, timezone);
        }
        else if (parseInt(newtimezone) == newtimezone)
            sPattern = sPattern.replace(/TZ/, "");
        else
            sPattern = sPattern.replace(/TZ/, newtimezone);
    }
    return sPattern;
}

//adjust a date to match the local time, input string is understood to be Eastern
function adjustDateForLocalTimezone(event_date, newtimezone, timezone) {
    if ((newtimezone != null) && (newtimezone != ""))
        event_date.setTime(event_date.getTime() - (getTimezoneOffsetHelper(timezone) - getTimezoneOffsetHelper(newtimezone)) * 60 * 1000);
    else
        event_date.setTime(event_date.getTime() - (event_date.getTimezoneOffset() + getTimezoneOffsetHelper(timezone)) * 60 * 1000);
    return event_date;
}

//FIXME: this only gets offsets for EST/CST times
function getTimezoneOffsetHelper(timezone) {
    if (parseInt(timezone) == timezone)
        return parseInt(timezone);
    else {
        timezone = timezone.toUpperCase();
        if (timezone == null || timezone == "EST" || timezone == "ET")
            return -240;
        else if (timezone == "CET")
            return 120;
        else if (timezone == "CST" || timezone == "CT")
            return -300;
        else if (timezone == "MST" || timezone == "MT")
            return -360;
        else if (timezone == "PST" || timezone == "PT")
            return -420;
        else if (timezone == "AST")
            return 300;
        else
            return 0;
    }
}

/* based on code from http://www.kryogenix.org/code/browser/searchhi/ */

/**
*        usage: node - XML node to search text within
*        timezone - the timezone of the times that we will find (default EST)
*        newtimezone - the timezone of the times that we want to end up with (default local browser time)
*/
function findTimes(node, newtimezone, timezone) {
    if (timezone == null)
        timezone = "EST";
    // Iterate into this nodes childNodes
    if (node.hasChildNodes) {
        var hi_cn;
        for (hi_cn = 0; hi_cn < node.childNodes.length; hi_cn++) {
            findTimes(node.childNodes[hi_cn], newtimezone, timezone);
        }
    }
    // And do this node itself
    if (node.nodeType == 3) { // text node
        var timePattern = /(\d\d?:\d\d *[ap]?\.?m?\.?  *et)/i;
        if (node.nodeValue.search(timePattern) >= 0) {
            var pn = node.parentNode;
            var newnodes = new Array();
            if (pn.className != "shsLocalTime") {
                // time has not already been converted!
                var nv = node.nodeValue;
                var timearr = nv.match(timePattern);
                for (var x = 1; x < timearr.length; x++) {
                    var oldtime = new RegExp(timearr[x]);
                    var newtime = document.createTextNode(localizeTime(timearr[x], newtimezone, timezone));
                    var newtimespan = document.createElement("span");
                    newtimespan.className = "shsLocalTime";
                    newtimespan.appendChild(newtime);
                    ni = nv.indexOf(timearr[x]);
                    if (ni > 0) {
                        var before = document.createTextNode(nv.substr(0, ni));
                        newnodes[newnodes.length] = before;
                    }
                    nv = nv.substr(ni + timearr[x].length);
                    newnodes[newnodes.length] = newtimespan;
                }
                if (nv != "") {
                    newnodes[newnodes.length] = document.createTextNode(nv);
                }
                for (x = 0; x < newnodes.length; x++) {
                    pn.insertBefore(newnodes[x], node);
                }
                pn.removeChild(node);
            }
        }
    }
}

function getDayName(dayoweek) {
    var weekday = new Array(7);
    weekday[0] = "SUN";
    weekday[1] = "MON";
    weekday[2] = "TUE";
    weekday[3] = "WED";
    weekday[4] = "THU";
    weekday[5] = "FRI";
    weekday[6] = "SAT";
    return weekday[dayoweek]
}
