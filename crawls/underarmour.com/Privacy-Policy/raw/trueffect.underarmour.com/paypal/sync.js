var ppDataSync = {
    merchantid: '',
    id: '',
    prefid: '',
    data: '',
    group: '',
    event: '',
    tag: '',
    domain: '',
    URL: "https://offers.paypal.com/c_banner/retarg?h=##MERCHANTID##&s=##PREFID##&t=N",
    PixelURL: "/ping?spacedesc=##TAG##&db_afcr=123&group=##GROUP##&event=##EVENT##&x_pp_id=##ID##&x_pp_mid=##MERCHANTID##&x_pp_data=##DATA##",
    SyncAttempts: 0,
    SyncMaxAttempts: 3,
    SyncDelay: 2000,
    SyncMode: '',
    DoLog: false,
    Sync: function () {
        ppDataSync.Log('starting');

        if (ppDataSync.SyncMode == '') {
            ppDataSync.SyncMode = ppDataSync.GetQuerystring("SyncMode", "iframe");
        }

        if (ppDataSync.merchantid == '') {
            ppDataSync.merchantid = ppDataSync.GetQuerystring("MerchantID", "@@MERCHANTID@@");
        }

        if (ppDataSync.data == '') {
            ppDataSync.data = ppDataSync.GetQuerystring("Data", "@@DATA@@");
        }

        if (ppDataSync.group == '') {

            ppDataSync.group = ppDataSync.GetQuerystring("Group", "@@GROUP@@");
        }

        if (ppDataSync.event == '') {
            ppDataSync.event = ppDataSync.GetQuerystring("Event", "@@EVENT@@");
        }

        if (ppDataSync.tag == '') {
            ppDataSync.tag = ppDataSync.GetQuerystring('Tag', "@@TAG@@");
        }

        if (ppDataSync.merchantid == undefined || ppDataSync.merchantid == "") {
            ppDataSync.Log('No merchant id was found in the request!');
            return;
        }
        if (ppDataSync.group == undefined || ppDataSync.event == undefined || ppDataSync.group == "" || ppDataSync.event == "") {
            ppDataSync.Log('No group or event was found in the request!');
            return;
        }
        if (ppDataSync.data == undefined || ppDataSync.data == "") {
            ppDataSync.data = "|null|null|null|";
        }

        if (ppDataSync.SyncMode == "iframe") {
            ppDataSync.SyncFrame();
        } else {
            ppDataSync.LoadPrefID();
        }
    },
    LoadPrefID: function () {
        ppDataSync.prefid = ppDataSync.GetCookie("PrefID");

        if (ppDataSync.prefid == "") {
            if (ppDataSync.SyncAttempts < ppDataSync.SyncMaxAttempts) {
                setTimeout(ppDataSync.LoadPrefID, ppDataSync.SyncDelay);
                ppDataSync.SyncAttempts++;
                ppDataSync.Log('prefid not found, waiting...');
                return;
            }
            ppDataSync.Log('failed to load prefid');
            return;
        }

        var scr = document.createElement("SCRIPT");
        scr.type = "text/javascript";
        scr.src = ppDataSync.URL.replace('##MERCHANTID##', ppDataSync.merchantid).replace('##PREFID##', ppDataSync.prefid);

        document.body.appendChild(scr);
    },
    GetCookie: function (name, defValue) {
        var i,
				x,
				y,
				cookies = document.cookie.split(";");

        for (i = 0; i < cookies.length; i++) {
            x = cookies[i].substr(0, cookies[i].indexOf("="));
            y = cookies[i].substr(cookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == name) {
                return unescape(y);
            }
        }

        if (defValue == undefined || defValue.indexOf('@@') >= 0) { defValue = ""; }
        return defValue;
    },
    GetQuerystring: function (name, defValue) {
        //load urlParams
        var e,
				a = /\+/g,  // Regex for replacing addition symbol with a space
				r = /([^&=]+)=?([^&]*)/g,
				d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
				q = window.location.search.substring(1);

        while (e = r.exec(q)) {
            if (d(e[1]).toLowerCase() == name.toLowerCase()) {
                return d(e[2]);
            }
        }

        if (defValue == undefined || defValue.indexOf('@@') >= 0) { defValue = ""; }
        return defValue;
    },
    SyncPing: function () {
        var spacedesc = ppDataSync.tag;
        if (spacedesc == '') { ppDataSync.Log('spacedesc not in querystring'); return; }

        var img = new Image();
        img.src = ppDataSync.ParseDomain() + ppDataSync.PixelURL.replace('##TAG##', spacedesc).replace('##MERCHANTID##', ppDataSync.merchantid).replace('##ID##', ppDataSync.id).replace('##DATA##', ppDataSync.data).replace('##GROUP##', ppDataSync.group).replace('##EVENT##', ppDataSync.event);

        ppDataSync.Log('complete');
    },
    SyncFrame: function () {
        var url = ppDataSync.ParseDomain() + '/paypal/sync.htm?Tag=' + ppDataSync.tag + '&MerchantID=' + ppDataSync.merchantid + '&Data=' + ppDataSync.data + '&Group=' + ppDataSync.group + '&Event=' + ppDataSync.event;

        var iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.width = "1";
        iframe.height = "1";
        iframe.style.display = "none";
        document.body.appendChild(iframe);
    },
    ParseDomain: function () {
        if (ppDataSync.domain == '') {
            var qsdomain = ppDataSync.GetQuerystring('domain', '@@DOMAIN@@');

            if (qsdomain == '') {
                qsdomain = window.location.host;
            }

            ppDataSync.domain = qsdomain;
        }

        if (ppDataSync.domain.substring(0, 4).toLowerCase() == 'http') {
            ppDataSync.domain = ppDataSync.domain.replace('http://', '').replace('https://', '');
        }

        return location.protocol + '//' + ppDataSync.domain;
    },
    Log: function (msg) {
        if (ppDataSync.DoLog) {
            try {
                console.log(msg);
            } catch (e) {
                //alert('Console Not Available!  Disabling logging.');
                ppDataSync.DoLog = false;
            }
        }
    }
}

//JSONP RESPONSE HANDLER, function name hard coded server side
function paypalOfferCbHandler(response) {
    ppDataSync.Log('recieved response with the following payload: ' + response);
    ppDataSync.id = encodeURIComponent(response);
    ppDataSync.SyncPing();
}