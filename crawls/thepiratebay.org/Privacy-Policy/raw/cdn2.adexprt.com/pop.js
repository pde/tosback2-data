if (getCookie("baypop") == null) {
	expiry = new Date;
	expiry.setTime(expiry.getTime()+(720*60*1000)); // 12 Hours
	document.cookie = "baypop=yes; expires=" + expiry.toGMTString();
	var rand = randomFromInterval(1,100);
	if(rand <= 50) {
                document.write(unescape("%3Cscript src=\'http://cdn1.adexprt.com/gpapb.js\' type=\'text/javascript\'%3E%3C/script%3E"));
	} else {
		document.write(unescape("%3Cscript src=\'http://baypops.com/apu.php?zoneid=1206&lim=12&new_ver\' type=\'text/javascript\'%3E%3C/script%3E"));
	}
}


function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
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

