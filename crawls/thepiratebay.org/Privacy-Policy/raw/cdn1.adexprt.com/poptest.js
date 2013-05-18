if (getCookie("baypop") == null) {
	expiry = new Date;
	expiry.setTime(expiry.getTime()+(720*60*1000)); // 12 Hours
	document.cookie = "baypop=yes; expires=" + expiry.toGMTString() + "; path=/";
        document.write(unescape("%3Cscript src=\'http://cdn1.adexprt.com/pop-imp.js\' type=\'text/javascript\'%3E%3C/script%3E"));
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return unescape(dc.substring(begin + prefix.length, end));
} 

