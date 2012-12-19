function changeZipText() {
    if (document.getElementById('EditZip').innerHTML == "(edit)") {
        document.getElementById('EditZip').innerHTML = "Save";
    }
    else if (document.getElementById('EditZip').innerHTML == "Save") {
    document.getElementById('EditZip').innerHTML = "(edit)";
    setCookie('ZipCode', document.getElementById('ctl00_ctl00_placeholderHeader_Header_txtCurrentZip').value, 730);
    }
}

function updateZipText(zip) {
    document.getElementById('ctl00$ctl00$placeholderHeader$Header$txtCurrentZip').value = zip;
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

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

function checkKeyPressed(e) {
    var unicode = e.keyCode ? e.keyCode : e.charCode
    alert(unicode)
}

function disableEnterKey(e) {
    var key;
    if (window.event)
        key = window.event.keyCode; //IE
    else
        key = e.which; //firefox      

    return (key != 13);
}