// Microsoft PubCeter AdCall JavaScript File 
// All comments are added for developing purpose only and needs to be removed in PPE and production environment 


(function() {
    // Clears parameters
    function clearCallParams() {
        var w = window;
        w.microsoft_adunitid = w.microsoft_adunit_height = w.microsoft_adunit_width = w.microsoft_lmt = w.microsoft_timezoneid =
  w.microsoft_offset = w.microsoft_adunit_titlefontcolor = w.microsoft_adunit_bodyfontcolor = w.microsoft_adunit_urlfontcolor =
  w.microsoft_adunit_bkcolor = w.microsoft_adunit_bordercolor = w.microsoft_adunit_keywordhints = w.microsoft_adunit_keywordscores =
  w.microsoft_adunit_categoryhints = w.microsoft_adunit_categoryscores = w.microsoft_adunit_channelids = w.microsoft_adunitformat =
  w.microsoft_adunit_legacy = w.microsoft_extrainfo = w.microsoft_adunit_referral = w.microsoft_adunitrotatorid = null;
    }

    // Error Handler: in case of exception clean everything... 
    function microsoftErrorHandler() {
        // Send Error data to Delivery Engine
        // SendError(err); - need DE/Logging support
        // ----------------------------------
        Finalize();
        return true;
    }


    /*
    Trim Url if it exceeds 2000 characters:

On Windows: Opera supports ~4050 characters, 
    IE 4.0+ supports exactly 2083 characters, 
    Netscape 3 -> 4.78 support up to 8192 characters before causing errors on shut-down, 
    and Netscape 6 supports ~2000 before causing errors on start-up. 
    */
    function prepareUrl(url) {

        url = url.substring(0, 2000);
        url = url.replace(/  %  \ w ? $ /, '');
        return url != null ? '"' + url + '"' : '""'
    }

    // Build key="value" pair for query string
    function setValue(n, v, c) {
        if ((v) && (v != 'undefined')) {
            if (c) v = v.replace("#", "");
            return "&" + n + "=" + escape(v);
        }
        return "";
    }

    // Collect all required date for DE in Query String
    function getQueryString(w) {
        var q = "";

        //FEB call
        q += w.microsoft_feb;
        
        if (w.microsoft_adunitrotatorid)
            q += "?p_abtest=" + escape(w.microsoft_adunitrotatorid);
        else
            q += "?adunitid=" + escape(w.microsoft_adunitid);

        q += setValue("v", w.microsoft_ver);

        // Collect all previous adUnits from the page
        var prevAdUnits = "";
        if (w.microsoft_adunits != null)
            for (var i = 0; i < w.microsoft_adunits.length; i++) prevAdUnits += w.microsoft_adunits[i] + "|";

        // Collect all previous adunitrotators from the page
        var prevadunitrotators = "";
        if (w.microsoft_adunitrotators != null)
            for (var i = 0; i < w.microsoft_adunitrotators.length;  i++) prevadunitrotators += w.microsoft_adunitrotators[i] + "|";

        //Set Previous adUnits
        q += setValue("prevadunits", prevAdUnits);

        //Previous adunitrotators
        q += setValue("patr", prevadunitrotators);

        // Extra Client side parameters
        q += setValue("kw", w.microsoft_adunit_keywordhints);
        q += setValue("kwsc", w.microsoft_adunit_keywordscores);
        q += setValue("cat", w.microsoft_adunit_categoryhints);
        q += setValue("catsc", w.microsoft_adunit_categoryscores);
        q += setValue("channelid", w.microsoft_adunit_channelids);

        // Encrypted data
        q += setValue("e", w.microsoft_extrainfo);

        // AdUnit Client Side Looks and Feel Parameters
        q += setValue("w", w.microsoft_adunit_width);
        q += setValue("h", w.microsoft_adunit_height);
        q += setValue("titlecolor", w.microsoft_adunit_titlefontcolor, true);
        q += setValue("bodycolor", w.microsoft_adunit_bodyfontcolor, true);
        q += setValue("urlcolor", w.microsoft_adunit_urlfontcolor, true);
        q += setValue("bkcolor", w.microsoft_adunit_bkcolor, true);
        q += setValue("bordercolor", w.microsoft_adunit_bordercolor, true);

        // End-User information
        q += setValue("url", w.microsoft_adunit_referral ? w.microsoft_adunit_referral : document.location);
        q += setValue("ref", document.referrer);
        q += setValue("lmt", w.microsoft_lmt);
        q += setValue("tz", w.microsoft_offset);
        q += setValue("cc", w.microsoft_cc);
        q += setValue("dt", w.microsoft_dt);

        // Navigator Data
        if (w.screen) {
            q += setValue("uh", w.screen.height);
            q += setValue("uw", w.screen.width);
            q += setValue("uah", w.screen.availHeight);
            q += setValue("uaw", w.screen.availWidth);
            q += setValue("cd", w.screen.colorDepth);
        }

        if (navigator.plugins)
            q += setValue("npl", navigator.plugins.length);

        if (navigator.mimeTypes)
            q += setValue("nmime", navigator.mimeTypes.length);

        q += setValue("ja", navigator.javaEnabled());

        if (navigator.appName)
            q += setValue("app", navigator.appName);

        q += setValue("his", history.length);

        if (navigator.platform)
            q += setValue("plf", navigator.platform);

        return q;
    }

    // Preparation function to initialize some of parameters 
    function collectQueryData() {
        //Add try block to ignore these params if something fails
        try {
            var w = window;
            var d = document;
            var dt = new Date();

            w.microsoft_offset = dt.getTimezoneOffset();
            w.microsoft_lmt = Date.parse(d.lastModified) / 1000;
            w.microsoft_dt = dt.getTime();

            var h, sh;
            if (d.body && d.body.scrollHeight && d.body.clientHeight) {
                h = 100 * d.body.scrollHeight;
                sh = d.body.clientHeight;
            }

            if (h && sh) w.microsoft_cc = Math.round(h / sh);
        } catch (error) { }
    }

    // Initialization  
    function Init() {
        var w = window;
        var d = document;

        w.microsoftErrorHandler = w.onerror;
        w.onerror = microsoftErrorHandler;

        var prefix = document.location.protocol + "//";
        prefix = prefix == "https://" ? prefix : "http://";

        var fes = "http://ac3.msn.com/de.ashx";
        w.microsoft_ver = "pubm12";
        
        if (fes.indexOf("http://") != -1) fes = fes.replace("http://", "");

        w.microsoft_feb = prefix + fes;

        collectQueryData();

    }

    // Rendering Ad
    function Render() {
        var d = document;
        var w = window;
        var url = getQueryString(w);

        if (w.microsoft_adunitformat == 'js') {
            d.write('<script type="text/javascript" src=' + prepareUrl(url) + ' ><br></script>');
        } else {
            d.write('<iframe SRC=' + prepareUrl(url) +
           ' width="' + w.microsoft_adunit_width +
           '" height="' + w.microsoft_adunit_height +
           '" allowTransparency="true"' +
           ' marginwidth="0"  marginheight="0" hspace="0"  vspace="0" frameborder="0" scrolling="no"></iframe>');
        }
    }

    // Clean 
    function Finalize() {
        var w = window;

        if (w.microsoft_adunitid != null) {
            if (w.microsoft_adunits == null) {
                w.microsoft_adunits = new Array;
                w.microsoft_adunits[0] = w.microsoft_adunitid;
            }
            else {
                w.microsoft_adunits[w.microsoft_adunits.length] = w.microsoft_adunitid;
            }
        }


        if (w.microsoft_adunitrotatorid != null) {
            if (w.microsoft_adunitrotators == null) {
                w.microsoft_adunitrotators = new Array;
                w.microsoft_adunitrotators[0] = w.microsoft_adunitrotatorid;
            }
            else {
                w.microsoft_adunitrotators[w.microsoft_adunitrotators.length] = w.microsoft_adunitrotatorid;
            }
        }

        w.onerror = w.microsoftErrorHandler;
        clearCallParams();
    }


    //--------------------------------------
    // Ad display sequence                //
    //--------------------------------------
    Init();
    Render();
    Finalize();

}
)()
