function Popup(URL, ID, Height, Width) {
    if (URL.match("GlossaryPopup.aspx") != null)
        {
        URL = "/" + URL;
        URL = URL.replace("//", "/");
        Width=650;Height=400;
        }
    var winW = 800; var winH = 600; if (parseInt(navigator.appVersion) > 3) {
        if (navigator.appName == "Netscape")
        { winW = window.innerWidth; winH = window.innerHeight; }
        if (navigator.appName.indexOf("Microsoft") != -1)
        { winW = document.body.offsetWidth; winH = document.body.offsetHeight; } 
    }
    window.open
(URL + '?id=' + ID, '_blank', 'toolbar=0,' + 'scrollbars=1,' + 'location=0,' + 'statusbar=0,' + 'menubar=0,' + 'resizable=1,' + 'top=' + Math.floor((winH - Height) / 2) + ',' + 'left=' + Math.floor((winW - Width) / 2) + ',' + 'height=' + Height + ',' + 'width=' + Width);
}
function Popdown(URL, ID, Height, Width) {
    if (Width > 800)
    { minWidth = Width }
    var minWidth = 800; var minHeight = 700; var winW = 1024; var winH = 768; if (parseInt(navigator.appVersion) > 3) {
        if (navigator.appName == "Netscape")
        { winW = window.innerWidth; winH = window.innerHeight; }
        if (navigator.appName.indexOf("Microsoft") != -1)
        { winW = document.body.offsetWidth; winH = document.body.offsetHeight; } 
    }
    var win2 = window.open(URL + '?id=' + ID, '_blank', 'toolbar=0,' + 'scrollbars=1,' + 'location=0,' + 'statusbar=0,' + 'menubar=0,' + 'resizable=1,' + 'top=' + Math.floor((winH - Height) / 2) + ',' + 'left=' + Math.floor((winW - minWidth) / 2) + ',' + 'height=' + Height + ',' + 'width=' + minWidth); win2.blur(); window.focus();
}
function OpenEmail()
{ var url = "EmailPage.aspx?url=" + document.location + "&pagetitle=" + document.location; EmailPopup(url, 800, 600); }
function EmailPopup(URL, Height, Width) {
    var winW = 800; var winH = 600; if (parseInt(navigator.appVersion) > 3) {
        if (navigator.appName == "Netscape")
        { winW = window.innerWidth; winH = window.innerHeight; }
        if (navigator.appName.indexOf("Microsoft") != -1)
        { winW = document.body.offsetWidth; winH = document.body.offsetHeight; } 
    }
window.open
(URL, '_blank', 'toolbar=0,' + 'scrollbars=1,' + 'location=0,' + 'statusbar=0,' + 'menubar=0,' + 'resizable=1,' + 'top=' + Math.floor((winH - Height) / 2) + ',' + 'left=' + Math.floor((winW - Width) / 2) + ',' + 'height=' + Height + ',' + 'width=' + Width);
}
function PodCodes(URL, ID, ListingID, Height, Width) {
    var winW = 800; var winH = 600; if (parseInt(navigator.appVersion) > 3) {
        if (navigator.appName == "Netscape")
        { winW = window.innerWidth; winH = window.innerHeight; }
        if (navigator.appName.indexOf("Microsoft") != -1)
        { winW = document.body.offsetWidth; winH = document.body.offsetHeight; } 
    }
    var win2 = window.open
(URL + '?Code=' + ID + '&ListingID=' + ListingID, '_blank', 'toolbar=0,' + 'scrollbars=1,' + 'location=0,' + 'statusbar=0,' + 'menubar=0,' + 'resizable=1,' + 'top=' + Math.floor((winH - Height) / 2) + ',' + 'left=' + Math.floor((winW - Width) / 2) + ',' + 'height=' + Height + ',' + 'width=' + Width);
}
var Bookmark = function () { var browser = navigator.userAgent.toLowerCase(); var keystroke = ((browser.indexOf('mac') != -1) ? 'Command/Cmd' : 'CTRL') + ' + D'; var canBookmarkPage = (typeof window.external == 'object'); return { bookmarkPage: function (url) { if (this.canBookmark()) { window.external.AddFavorite(url); return true; } else { return false; } }, canBookmark: function () { return canBookmarkPage; }, getKeystroke: function () { return keystroke; } }; } (); function sendMailTo(name, company, domain) { locationstring = 'mai' + 'lto:' + name + '@' + company + '.' + domain; window.location.replace(locationstring); }
// !--SUSPECT--NOT IN USE.
function getUserLocation() {
    if (readCookie('EINSuserInfo_zipCode')) { return readCookie('EINSuserInfo_zipCode'); }
    return 'Anonymous';
}
function createCookie(name, value, days) {
    if (days) { var date = new Date(); date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); var expires = "; expires=" + date.toGMTString(); }
    else var expires = ""; document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
    var nameEQ = name + "="; var ca = document.cookie.split(';'); for (var i = 0; i < ca.length; i++) { var c = ca[i]; while (c.charAt(0) == ' ') c = c.substring(1, c.length); if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length); }
    return null;
}
function eraseCookie(name) { createCookie(name, "", -1); }
function page_ReadCookies() {
var C0 = 'EINSuserInfo_'; var C1 = C0 + 'zipCode'; var C2 = C0 + 'emailAddress'; var C3 = C0 + 'productID'; var C4 = C0 + 'productName'; var C5 = C0 + 'categoryName'; var C6 = C0 +  'requestQuote';
var page_cookieName1 = readCookie(C1); var page_cookieName2 = readCookie(C2); var page_cookieName3 = readCookie(C3); var page_cookieName4 = readCookie(C4); var page_cookieName5 = readCookie(C5); var page_cookieName6 = readCookie(C6);
return null; }
function quotepage_RememberMe() {
var cookieName1 = 'EINSuserInfo_zipCode'; var cookieName2 = 'EINSuserInfo_emailAddress'; var cookieName3 = 'EINSuserInfo_productID'; var FN = 'ctl00_ContentPlaceHolder1_';
var FN = 'ctl00_ContentPlaceHolder1_'; var F1 = FN + 'txtZipCode'; var F2 = FN + 'textbox_ZipCode'; var F3 = FN + 'txtEmail'; var F4 = FN + 'hiddenProductID';
var x = readCookie(C1); if (x) { if (document.getElementById(F1)) { document.getElementById(F1).value = x; } }
var x = readCookie(C2); if (x) { if (document.getElementById(F3)) { document.getElementById(F3).value = x; } }
var x = readCookie(C3); if (x) { if (document.getElementById(F4)) { document.getElementById(F4).value = x; } }
return null;
}
function quotepage_WriteCookies() {
var C0 = 'EINSuserInfo_'; var C1 = C0 + 'zipCode'; var C2 = C0 + 'emailAddress'; var C3 = C0 + 'productID'; var EXP = 90;
var FN = 'ctl00_ContentPlaceHolder1_'; var F1 = FN + 'txtZipCode'; var F2 = FN + 'textbox_ZipCode'; var F3 = FN + 'txtEmail'; var F4 = FN + 'hiddenProductID';
if (document.getElementById(F1)) { if (document.getElementById(F1).value.length == 5) { createCookie(C1, document.getElementById(F1).value, EXP); } }
if (document.getElementById(F2)) { if (document.getElementById(F2).value.length == 5) { createCookie(C1, document.getElementById(F2).value, EXP); } }
if (document.getElementById(F3)) { if (document.getElementById(F3).value.length > 0) { createCookie(C2, document.getElementById(F3).value, EXP); } }
if (document.getElementById(F4)) { if (document.getElementById(F4).value.length > 0) { createCookie(C3, document.getElementById(F4).value, EXP); } }
return null;
}
function changeScreenSize(w, h)
{ window.resizeTo(w, h) }
