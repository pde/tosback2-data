//version '3.1';
var p39_cc_1406 = '9OvF4mq1gL8PLUSSIGNdC8mHTEU35BLi85rd85KPLUSSIGNkUjyNnfuAw=';
var p39_pu_1406 = null;
var p39_finished_1406 = '0';
var p39_al_1406 = '1';
var p39_cb_1406 = '1';
var p39_aid = '1406';

/////////////////////////
//
//
/////////////////////////

//<Tags_Functions>

//KVP Short function
function p39_KVP_Short(key_value,delimiter)
{
	//getting the category part from the resposne
	var cats = getTargetingTags_1406().substr(9);

	//removing Ad_Stats if exist
	var hashloc = cats.indexOf("#");
	if (hashloc >= 0) {
		cats = cats.substr(0,hashloc);
	}

	var catsArr = cats.split(';');
	var finalArr = [];

	//building the response
	for (var i = 0; i < catsArr.length; i++) {
		var val = catsArr[i].split(":")[0];
		if (val != null && val.length > 0) {
			finalArr.push(val);
		}
	}
	var ret = '';
	if (finalArr.length > 0) {
		ret = key_value + "=" + finalArr.join(delimiter + key_value + "=") + delimiter;
	}
	return ret;
}

//<Main Static Functions>

//encode a url
function p39_ae(su, p, v) {
    if (v) {
        return su + '&' + p + '=' + encodeURIComponent(v);
    }
    return su;
}


//cleaning the ad.yieldmanager.com as server from the url
function p39_cu(u) {
    if (u) {
        if (u.indexOf('ad.yieldmanager.com') > 0) {
            var link_pos = u.indexOf('link=$,http');
            u = u.substring(link_pos, u.length);
            u = u.replace('link=$,http', 'http');
        }
    }
    return u;
}


//zero padding, add 5 digits to the account_id and site_id in the akamai call
function p39_zp(n, c) {
    var nz = n + '';
    while (nz.length < c) {
        nz = "0" + nz;
    }
    return nz;
}

//build the Hashcode ,last part of the string (xxx) EX:(222/333/xxxxxxxxxx)
function p39_hc(s) {
    var h = 0;
    var len = s.length;

    var u = 2147483647;
    var d = 2147483648;

    for (i = 0; i < len; i++) {
        h = 31 * h + s.charCodeAt(i);

        if (h > u) {
            h -= d;
            h = -d + h % (u + d + 1);
        } else if (h < -d) {
            h -= -d - 1;
            h = u + h % (u + d + 1);
        }
    }

    if (h < 0) {
        return -h;
    }
    return h;
}

//build the Akamai directory structure 222/333/44444444
function p39_bau(u) {
    if (u) {
        var uh = p39_hc(u);
        var d1 = uh % 500;
        var d2 = parseInt(uh / 500, 10) % 500;

        var au = d1 + '/' + d2 + '/' + uh;
        au = au + p39_aid;
        return au;
    }

    return u;
}
//</Main Static Functions>


//<Show Targeting Function>

//Main function - call to Peer39
function p39_exec_1406(ct, useDOM) {
    var w = window;
    var su = null;
    var p39_pr_1406 = null; //page referer
    var p39_cc_v_1406 = p39_cc_1406; //client code
    var p39_sd_v_1406 = null;
    var p39_akamai_v_1406 = '1';
    var p39_au_v_1406 = 'http://catrg.peer39.net/';
    var p39_aid_v_1406 = '1406';
    var p39_sid_v_1406 = null;


    p39_sd_v_1406 = Math.floor(Math.random() * 1000000);

    if (w.p39_mpu_1406) {
        p39_pu_1406 = w.p39_mpu_1406;
    }

    if (!p39_pu_1406) {


        p39_pu_1406 = document.location.href;
        var ip = '0';

        try {
            p39_pu_1406 = top.location.href;
            p39_pr_1406 = document.referrer;

            if (top.location != document.location) {
                ip = '1';
            }
        } catch (e) {
            try {
                p39_pu_1406 = window.parent.document.referrer;
                ip = '2';
            } catch (ee) {
                p39_pu_1406 = document.referrer;
                ip = '3';
            }
            p39_pr_1406 = null;
        }

        p39_sd_v_1406 = p39_sd_v_1406.toString() + '' + ip;
    }

    p39_pu_1406 = p39_cu(p39_pu_1406);

//run the cleaning function.

    if (typeof (p39_clean_url_1406) == "function") {
        if (p39_pu_1406) {
            p39_pu_1406 = p39_clean_url_1406(p39_pu_1406);
        }
    }

    if (p39_akamai_v_1406 == '1') {

        //here comes the magic :-)
        su = p39_au_v_1406 + p39_bau("pu=" + decodeURIComponent(p39_pu_1406) + "&cc=" + p39_cc_v_1406);
        su = su + "?aid=" + p39_zp(p39_aid_v_1406, 5);
        if (p39_sid_v_1406) {
            su = su + "&sid=" + p39_zp(p39_sid_v_1406, 5);
        } else {
            su = su + "&sid=00000";
        }
        su = p39_ae(su, "pu", decodeURIComponent(p39_pu_1406));
        su = p39_ae(su, "cc", p39_cc_v_1406);

	//not Akamai call
    } else {
        su = p39_au_v_1406 + 'cc=' + p39_cc_v_1406;
        su = p39_ae(su, "pu", p39_pu_1406);
    }

	su = p39_ae(su, "ct", w.ct);
  	su = p39_ae(su, "sd", p39_sd_v_1406);
  	su = p39_ae(su, "et", w.p39_extrk_1406);



    su = su.substring(0, 1000);
    su = su.replace(/%\w?$/, '');

    if (useDOM) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = su;
        document.getElementsByTagName("head")[0].appendChild(s);
    } else {
        document.write('<scr' + 'ipt type="text/javascript" src="' + su + '"> </script>');
    }


}

//Manual cleaning functions.
function p39_clean_url_1406(u) {

//global cleans
	u = u.replace(/#.*/g, "");
    	u = u.replace(/\/$/g, "");

    return u;
}


//</Show Targeting Function>
//<Main Static Module>
//run the main call to peer39
p39_exec_1406(null, true);
//</Main Static Module>


//add reformatting function
    function getCategoryString(catXml) {
            //reformat xml response as string
            categoryArray=[];
            //find category ids
            var regex = / id=[\"\"]{0,1}(\w+)/g;
            while ((catlist = regex.exec(catXml)) != null) {
                //put them into a list
                categoryArray.push('p'+catlist[1]);
            }
            //join the list with &
            var catsAsString=categoryArray.join('&');
            return catsAsString;
    }

//<Extract Categories Function>
function extractCategories(t)
{
	if((t) && (t.length > 0))
	{
		var p = t.indexOf("name=");
		var ep = 0;
		var i = 0;
		var res = [];

		while ((p <= t.length) && (p > 0))
		{
			ep = t.indexOf('"',p+6);
			res[i]=t.substring(p+6,ep);
			p = t.indexOf("name=",ep+1);
			i++;
		}

		return res;
	}

    return;
}
//</Extract Categories Function>