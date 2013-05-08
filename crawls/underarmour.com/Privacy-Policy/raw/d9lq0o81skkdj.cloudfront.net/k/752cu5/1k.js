var esmcid = 'underarmor';
var esmref = escape(document.referrer);
var esmtt = escape(document.title);
var random_number = Math.floor(Math.random() * 99999999999);

if (esmoid == undefined) {
    var esmoid = "";
}
if (esmocode == undefined) {
    var esmocode = "";
}
if (esmoamount == undefined) {
    var esmoamount = "";
}

if (esmintent == undefined) {
    var esmintent = "0";
}

if (esmcategory == undefined) {
    var esmcategory = "";
}

if (esmadvertiserpid == undefined) {
    var esmadvertiserpid = "";
}

if (esmsearchsource == undefined) {
    var esmsearchsource = "";
}

if (esmadgroup == undefined) {
    var esmadgroup = "";
}

var longEsmds = '//pix.esm1.net/iframe.php?gn1=1&c1=' + esmcid + '&i1=' + esmintent + '&ct1=' + esmcategory
                    + '&p1=' + esmadvertiserpid + '&s1=' + esmsearchsource + '&ag1=' + esmadgroup + '&t1=' + esmtt + '&r1=' + esmref + '&r=' + random_number;
var esmds = longEsmds.substring(0, 1900);

if (esmoid != "") {

    var random_number = Math.floor(Math.random() * 999999);

    esmds = "https://pix.esm1.net/iframe.php?gn1=1&c1=" + esmcid + "&esmoid=" + esmoid + "&esmocode=" + esmocode + "&r=" + random_number + "&esmamount=" + esmoamount + "&r1=" + esmref + "&t1=" + esmtt;
}


var protocol_url = (location.protocol == 'https:' ? 'https' : 'http');
var scripts = document.getElementsByTagName('script');
var iframe = document.createElement('iframe');
iframe.setAttribute('src', esmds);
iframe.style.width = 0 + "px";
iframe.style.height = 0 + "px";
iframe.setAttribute("frameBorder", "0");
scripts[0].parentNode.insertBefore(iframe, scripts[0]);
