//version '2.3';
var p39_cc_712 = '/7QnkE80XLKzILiqpjgeKxf/yYqPe70zfdO7mPRtaGk=';
var p39_pu_712 = null;
var p39_finished_712 = '0';
var p39_al_712 = '1';
var p39_cb_712 = '1';
var p39_aid = '0712';

/////////////////////////
//Last Update 01/11/11
//Adding Client_ID to the script
//Last Update 20/11/11 - v2.2
//Update cleaning function
//Last Update 28/02/12 - v2.3
//Update cleaning function , adding refresh to clean
/////////////////////////

//<Tags_Functions>

//KVP function
function p39_KVP(key_value,delimiter) {

       var idList = '';
       var arrayResults = p39_resultsArray('','id',false);
       for (var i in arrayResults) {
  
          idList += (key_value +'=' + arrayResults[i] + delimiter);
       }
	return(idList)
   }

//XML function 1 - pulling the values from the XML.

function p39_getTagValues(xml, vid) {
    var xml_obj;
    var res = [];
    try {
        xml_obj = new ActiveXObject("Microsoft.XMLDOM");
        xml_obj.async = false;
        xml_obj.loadXML(xml);
    } catch (e) {
        try {
            var parser = new DOMParser();
            xml_obj = parser.parseFromString(xml, "text/xml");
        } catch (ee) {
            return;
        }
    }
    if (xml_obj) {
        var categories = xml_obj.getElementsByTagName('category');
        for (catNo = 0; catNo < categories.length; catNo++) {
            if (categories[catNo].getAttribute(vid) != '0000') {
                res[res.length] = categories[catNo].getAttribute(vid);
            }
        }
    }
    return res;
}

//XML function 2 - build array of categories from the XML response.
function p39_resultsArray(default_content_type, value_id, append_default) {
    var results = [];
    var pxml = getTargetingTags_712();
    results = p39_getTagValues(pxml, value_id);
    if ((append_default) || (results.length === 0)) {
        results[results.length] = default_content_type;
    }
    return results;
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
function p39_exec_712(ct, useDOM) {
    var w = window;
    var su = null;
    var p39_pr_712 = null; //page referer
    var p39_cc_v_712 = p39_cc_712; //client code
    var p39_sd_v_712 = null;
    var p39_akamai_v_712 = '1';
    var p39_au_v_712 = 'http://catrg.peer39.net/';
    // var p39_au_v_712 = 'http://adaptv.api.peer39.net/proxy/targeting?';
    var p39_aid_v_712 = '712';
    var p39_sid_v_712 = null;


    p39_sd_v_712 = Math.floor(Math.random() * 1000000);

    if (w.p39_mpu_712) {
        p39_pu_712 = w.p39_mpu_712;
    }

    if (!p39_pu_712) {


        p39_pu_712 = document.location.href;
        var ip = '0';

        try {
            p39_pu_712 = top.location.href;
            p39_pr_712 = document.referrer;

            if (top.location != document.location) {
                ip = '1';
            }
        } catch (e) {
            try {
                p39_pu_712 = window.parent.document.referrer;
                ip = '2';
            } catch (ee) {
                p39_pu_712 = document.referrer;
                ip = '3';
            }
            p39_pr_712 = null;
        }

        p39_sd_v_712 = p39_sd_v_712.toString() + '' + ip;
    }

    p39_pu_712 = p39_cu(p39_pu_712);

//run the cleaning function.

    if (typeof (p39_clean_url_712) == "function") {
        if (p39_pu_712) {
            p39_pu_712 = p39_clean_url_712(p39_pu_712);
        }
    }

    if (p39_akamai_v_712 == '1') {

        //here comes the magic :-)
        su = p39_au_v_712 + p39_bau("pu=" + decodeURIComponent(p39_pu_712) + "&cc=" + p39_cc_v_712);
        su = su + "?aid=" + p39_zp(p39_aid_v_712, 5);
        if (p39_sid_v_712) {
            su = su + "&sid=" + p39_zp(p39_sid_v_712, 5);
        } else {
            su = su + "&sid=00000";
        }
        su = p39_ae(su, "pu", decodeURIComponent(p39_pu_712));
        su = p39_ae(su, "cc", p39_cc_v_712);

	//not Akamai call
    } else {
        su = p39_au_v_712 + 'cc=' + p39_cc_v_712;
        su = p39_ae(su, "pu", p39_pu_712);
    }

	su = p39_ae(su, "ct", w.ct);
  	su = p39_ae(su, "sd", p39_sd_v_712);
  	su = p39_ae(su, "et", w.p39_extrk_712);
    


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
function p39_clean_url_712(u) {

//global cleans
	u = u.replace(/\?(mod|ru|sms_ss|mg|hat_input|dlbk|reflink|KEYWORDS|fbresult|fb_ref|grcc|q|siteid|imgurl|refresh).*/g, "");
	u = u.replace(/#.*/g, "");
    return u;
}


//</Show Targeting Function>
//<Main Static Module>
//run the main call to peer39
p39_exec_712(null, false);
//</Main Static Module>