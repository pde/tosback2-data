// This is a generic JS footer file that is included in all of our website
// pages.  The purpose of this is to easily drop in JS that is controlled
// to load when the end JSP for a page has loaded.
//<!-- CR 199 - Add  Monetate to the headers of the page -->
//<!-- Begin Monetate tag v6. Place at start of document head. DO NOT ALTER. -->

try {
var monetateT = new Date().getTime();
(function() {
    var p = document.location.protocol;
    if (p == "http:" || p == "https:") {
        var m = document.createElement('script'); m.type = 'text/javascript'; m.async = true; m.src = (p == "https:" ? "https://s" : "http://") + "b.monetate.net/js/1/a-ffc9d1d5/p/brookstone.com/" + Math.floor((monetateT + 216533) / 3600000) + "/g";
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(m, s);
    }
})();
} catch (e) {}

var g_b_Monetate_Loded = true;

// End Monetate tag.

