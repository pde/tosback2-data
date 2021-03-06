﻿var FFCookieStr = "[{\"drop_down_value\": \"JFK > MVY, 10/10/2011\",\"search_type\": \"find_flights\",\"flight_type\": \"round_trip\",\"from_field\": \"New York City, NY (JFK)\",\"departure_field\": \"Thu, Nov 10, 2011\",\"adult_count\": \"1\",\"kid_count\": \"1\",\"infant_count\": \"1\",\"to_field\": \"Martha's Vineyard, MA (MVY)\",\"return_field\": \"Fri, Nov 19, 2011\",\"fare_display\": \"refundable\"},{\"drop_down_value\": \"BOS > LAX, 11/11/2011\",\"search_type\": \"find_flights\",\"flight_type\": \"one_way\",\"from_field\": \"Boston, MA (BOS)\",\"departure_field\": \"Fri, Nov 11, 2011\",\"adult_count\": \"2\",\"kid_count\": \"2\",\"infant_count\": \"2\",\"to_field\": \"Los Angeles, CA (LAX)\",\"return_field\": \"null\",\"fare_display\": \"lowest\"},{\"drop_down_value\": \"MSV > BUF, 12/23/2011\",\"search_type\": \"find_flights\",\"flight_type\": \"round_trip\",\"from_field\": \"New Orleans, LA (MSY)\",\"departure_field\": \"Fri, Dec 23, 2011\",\"adult_count\": \"3\",\"kid_count\": \"3\",\"infant_count\": \"0\",\"to_field\": \"Buffalo, NY (BUF)\",\"return_field\": \"Thu, Dec 29, 2011\",\"fare_display\": \"points\"}]";

function storeHistory(currentEntry, type) {
    var cookie, cookies = readCookie(type);

    if (cookies.length == 0) cookie = [currentEntry];
    if (cookies.length == 1) cookie = [currentEntry, cookies[0]];
    if (cookies.length > 1) cookie = [currentEntry, cookies[0], cookies[1]];

    var cookieStr = escape(JSON.stringify(cookie));
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1000);
    document.cookie = type + " = " + cookieStr + "; expires=" + expireDate.toUTCString() + "; path=/";
}
function readCookie(type) {
    var cookies = document.cookie.split(";");
    var historyCookie;
    if (cookies == null) return [];

    for (var i = 0; i < cookies.length; i++) {
        if (jQuery.trim(cookies[i].substr(0, cookies[i].indexOf("="))) == type)
            historyCookie = unescape(cookies[i].substr(cookies[i].indexOf("=") + 1));
    }

    if (historyCookie == undefined)
        return [];
    else
        return JSON.parse(historyCookie);
}
function getHistory(type) {
    return amplify.store(type, readCookie(type));
}