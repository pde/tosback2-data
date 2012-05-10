var epulse_info, pagename, urltoken, i, url, pos, hostloc;
var num = Math.random()*100000000;
var num = Math.round(num);
var cg1 = "WWW";
var xp1 = '';
var loc = window.location.href;
var screenRes = 'NA';
var xp1VsTimer = 0;

// START CODE BLOCK
if (loc.indexOf("/canada/")      != -1 ||
    loc.indexOf("capitalone.ca") != -1)
{
    cg1 = "Canada";
}
else if (loc.indexOf("corporate-ir.net") != -1)
{
    cg1 = "CCBN";
}
else if (loc.indexOf("resources.capitalone.com") != -1)
{
    cg1 = "FinanceCenter";
}

if (loc.indexOf("qamain") != -1 ||
    loc.indexOf("qawww")  != -1 ||
    loc.indexOf("rabin")  != -1 ||
    loc.indexOf("dev")    != -1 ||
    loc.indexOf("localhost") != -1)
{
    cg1 = "QA" + cg1;
}
// END CODE BLOCK

if (typeof cg2=="undefined") //split up URLs for other cgs
{
        url = loc;
        url = url.replace(location.protocol+"//","");
        if (url.indexOf("?")>-1) url = url.substring(0,url.indexOf("?"));
        urltoken = url.split("/");
        cg2=urltoken[1];
        cg3=urltoken[2];
        cg4=urltoken[3];
        cg5=urltoken[4];
        if ((typeof cg2 != "undefined")&&(cg2.indexOf("#")>-1)) cg2=cg2.substring(0,(cg2.indexOf("#")));
        if ((typeof cg3 != "undefined")&&(cg3.indexOf("#")>-1)) cg3=cg3.substring(0,(cg3.indexOf("#")));
        if ((typeof cg4 != "undefined")&&(cg4.indexOf("#")>-1)) cg4=cg4.substring(0,(cg4.indexOf("#")));
        if ((typeof cg5 != "undefined")&&(cg5.indexOf("#")>-1)) cg5=cg5.substring(0,(cg5.indexOf("#")));
}
if (typeof pagename=="undefined") pagename="";
if ((typeof cg1=="undefined")||(cg1=="")) cg1="";
        else {
          cg1 = escape(cg1);
          pagename=cg1;}
if ((typeof cg2=="undefined")||(cg2=="")) cg2="";
        else {
          cg2 = escape(cg2);
          pagename+="_"+cg2;}
if ((typeof cg3=="undefined")||(cg3=="")) cg3="";
        else {
          cg3 = escape(cg3);
          pagename+="_"+cg3;}
if ((typeof cg4=="undefined")||(cg4=="")) cg4="";
        else {
          cg4 = escape(cg4);
          pagename+="_"+cg4;}
if ((typeof cg5=="undefined")||(cg5=="")) cg5="";
        else {
          cg5 = escape(cg5);
          pagename+="_"+cg5;}
var testsshown="";
if (typeof test_a1=="undefined") test_a1=""; else testsshown=test_a1+",";
if (typeof test_a2=="undefined") test_a2=""; else testsshown+=test_a2+",";
if (typeof test_a3=="undefined") test_a3=""; else testsshown+=test_a3+",";
if (typeof test_a4=="undefined") test_a4=""; else testsshown+=test_a4+",";
if (typeof test_a5=="undefined") test_a5=""; else testsshown+=test_a5;
if (testsshown.charAt(testsshown.length-1)==",") testsshown=testsshown.substring(0,testsshown.length-1);
// START CODE BLOCK
if ((loc.indexOf("qawww")>-1) ||
    (loc.indexOf("rabin")>-1) ||
    (loc.indexOf("dev")>-1) ||
    (loc.indexOf("localhost")>-1) ||
    (loc.indexOf("qamain")>-1)){
    hostloc=location.protocol+"//" + window.location.host;
}
else if ((loc.indexOf("/canada/")>-1) || (loc.indexOf("capitalone.ca")>-1)) {
    hostloc=location.protocol+"//www.capitalone.ca";
}
// END CODE BLOCK
else {
    hostloc=location.protocol+"//www.capitalone.com";
}

if (window.screen && (window.screen.width && window.screen.height)) 
{
    screenRes = screen.width + 'x' + screen.height;
}
if(cg1.search('Canada') == -1){
	function setvsxp1()
	{
		if (xp1VsTimer < 20)
		{
			if (xp_exp == '' || typeof xp_exp == 'undefined')
			{	
				window.setTimeout("setvsxp1()",150);
				xp1VsTimer++;
				return;
			}
		}
		if (typeof xp_exp == 'undefined' || xp_exp == '')
			xp1 = '-timedout';
		else
			xp1 = "-" + xp_exp;
		
		$('body').prepend("<img src='" + hostloc + "/images/https-common/tracker.gif?Log=1&pn=" + pagename + xp1 + "&cg1=" + cg1 + "&cg2=" + cg2 + "&cg3=" + cg3 + "&cg4=" + cg4 + "&cg5=" + cg5 + xp1 + "&testsshown=" + testsshown + "&num=" + num + "&sres=" + screenRes + "' style='display:none;' height='0' width='0'>");
	}
	
	if (typeof xp1_timeout != 'undefined' && xp1_timeout != '')
	{
		setvsxp1();
	}
	else
	{
		document.write("<img src='" + hostloc + "/images/https-common/tracker.gif?Log=1&pn=" + pagename + "&cg1=" + cg1 + "&cg2=" + cg2 + "&cg3=" + cg3 + "&cg4=" + cg4 + "&cg5=" + cg5 + "&testsshown=" + testsshown + "&num=" + num + "&sres=" + screenRes + "' style='display:none;' height='0' width='0'>");
	}
}
else
{
	if(typeof xPlusOneGlobal == 'undefined' || xPlusOneGlobal.shouldReceive == false)
		document.write("<img src='" + hostloc + "/images/https-common/tracker.gif?Log=1&pn=" + pagename + "&cg1=" + cg1 + "&cg2=" + cg2 + "&cg3=" + cg3 + "&cg4=" + cg4 + "&cg5=" + cg5 + "&testsshown=" + testsshown + "&num=" + num + "&sres=" + screenRes + "' style='display:none;' height='0' width='0'>");
}
/* ***********************************************************************************
   ******************************* SMARTTRACKING BELOW *******************************
   *********************************************************************************** */

/**
 * dynamically author x+1 smarttracking script tags
 */
function SmartTracking(params)
{
    /**
     * a template object of the default parameters we'll pass to x+1
     */
    this.urlParams = {
        placement:'15767',
        invocation:'cof-behavior'
    };

    /**
     * the configuration
     */
    this.config = {
        trackingUrl:'https://s.xp1.ru4.com/meta',
        secureTrackingUrl:'https://s.xp1.ru4.com/meta',
        parentDomain:'capitalone.com',
        sessionCookie:'smartTracking',
        displayOnConstruct:false,
        paramsConfig:{
            VS_cookie:          {persist:'current',paramDefault:''}, // the v1st cookie
            cg5:                {persist:'current',paramDefault:''}, // the cg5 variable
            testcell:           {persist:'current',paramDefault:''}, // from the linkid
            source:             {persist:'current',paramDefault:''}, // from the linkid
            location:           {persist:'current',paramDefault:''}, // from the linkid
            destination:        {persist:'current',paramDefault:''}, // from the linkid
            customer_indicator: {persist:'current',paramDefault:''}, // eos cookie present?
            referrer:           {persist:'session',paramDefault:''}, // the entry referrer
            paidornatural:      {persist:'session',paramDefault:''}, // entry was a paid, natural, or non search?
            searchterm:         {persist:'session',paramDefault:''}  // the search terms used in natural or paid search
        }
    };

    this.params = {
        referrer:document.referrer,
        url:document.URL,
        cg3:window.cg3,
        cg5:window.cg5
    };
    if( params )
        for( o in params )
            this.params[o]=params[o];

    /**
     * constructor
     * currently just attachs the document ready event
     */
    this.construct = function()
    {
        if( this.config.displayOnConstruct )
            this.documentReadyEvent();
        else this.constructUrlParams();
    }

    /**
     * attach a document ready event to
     */
    this.documentReadyEvent = function()
    {
        var o = this;
        $(document).ready(function(){o.constructUrlParams();o.render();});
    }

    /**
     * uses document.write to render the script tag
     */
    this.render = function()
    {
        this.url.params.random=Math.random()*100000000;
        var url = this.url.getUrl();
        var s = document.createElement('script');
        s.src=url;
        document.body.insertBefore(s,document.body.firstChild);
    }

    /**
     * determine the appropriate service url and pass that back
     *
     * @return string one of this.config.secureTrackingUrl or this.config.trackingUrl
     */
    this.getServiceUrl = function()
    {
        var url = new this.URL( this.params.url );
        if( url.protocol=='https' )
            return this.config.secureTrackingUrl;
        else return this.config.trackingUrl;
    }

    /**
     * fills in the url parameters using the params array
     */
    this.constructUrlParams = function()
    {
        // cycle over the params, calling each that
        // is designated as a 'current' page parameter
        var desig = this.config.paramsConfig;
        for( param in desig )
        {
            if( desig[param].persist=='current' )
            {
                var func = this.constructUrlParamsFuncs[param];
                func(this,desig[param]); // lol
            }
        }

        // if the referring url is not one of ours,
        // then we may need to update the session persistent cookie values
        // otherwise we can pull the values from there
        var referringUrl = new this.URL( this.params.referrer );
        if( ! referringUrl.isSubOf( this.config.parentDomain ) )
        {
            this.constructSessionUrlParams();
            this.writeCookieParams();
        } else this.readCookieParams();

        // create the url for this SmartTracker page instance
        this.url = new this.URL( this.getServiceUrl() )
        this.url.params = this.urlParams;
    }

    /**
     * call all the urlParams functions that are session based
     */
    this.constructSessionUrlParams = function()
    {
        var sessionParms = this.getSessionParams();
        for( var i=0; i<sessionParms.length; i++ )
        {
            var param = sessionParms[i];
            var paramConf = this.config.paramsConfig[param];
            var func = this.constructUrlParamsFuncs[param];
            func(this,paramConf);

            if( ! ( this.urlParams[param] && this.urlParams[param].length ) )
                this.urlParams[param] = paramConf.paramDefault;
        }
    }

    /**
     * a group of functions for creating each of the url parameters
     * expected by x+1
     */
    this.constructUrlParamsFuncs = {
        VS_cookie:function(sto,conf)
        {
            // get the v1st cookie value and place it in parameters
            sto.urlParams.VS_cookie = sto.cookie('v1st') ? sto.cookie('v1st') : 'NOTFOUND';
        },
        cg5:function(sto,conf)
        {
            if( sto.params.cg5 )
                sto.urlParams.cg5 = sto.params.cg5;
            else sto.urlParams.cg5='';
        },

        testcell:function(sto,conf)
        {
            var match = sto.linkIdPositionValue(sto.linkIdPositions.testCell);
            if( match )
            {
                sto.urlParams.testcell=match;
            } else
            {
                var anchors = document.getElementsByTagName('a');
                for( var i=0; i < anchors.length; i++ )
                {
                    var thisA = anchors[i];
                    var url = thisA.href;
                    if( url.match(/^http(.*)linkid\=/) )
                    {
                        var match = sto.linkIdPositionValue(sto.linkIdPositions.testCell,url);
                        if( match )
                        {
                            sto.urlParams.testcell=match;
                            break;
                        }
                    }
                }
            }
        },
        source:function(sto,conf)
        {
            var match = sto.linkIdPositionValue(sto.linkIdPositions.sourceCode);
            if( match )
                sto.urlParams.source=match;
        },
        destination:function(sto,conf)
        {
            var match = sto.linkIdPositionValue(sto.linkIdPositions.destinationCode);
            if( match )
            {
                sto.urlParams.destination=match;
            } else
            {
                var anchors = document.getElementsByTagName('a');
                for( var i=0; i < anchors.length; i++ )
                {
                    var thisA = anchors[i];
                    var url = thisA.href;
                    if( url.match(/^http(.*)linkid\=/) )
                    {
                        var match = sto.linkIdPositionValue(sto.linkIdPositions.sourceCode,url);
                        if( match )
                        {
                            sto.urlParams.destination=match;
                            break;
                        }
                    }
                }
            }
        },
        location:function(sto,conf)
        {
            var match = sto.linkIdPositionValue(sto.linkIdPositions.area);
            if( match )
                sto.urlParams.location=match;
        },
        referrer:function(sto,conf)
        {
            // it doesn't matter how they got in, search or otherwise,
            // if there is a 3rd party referrer, then we'll record it
            var oUrl = new sto.URL( sto.params.referrer );
            sto.urlParams.referrer = oUrl.domain;
        },
        paidornatural:function(sto,conf)
        {
            sto.urlParams.paidornatural = '';

            // create a url object for each the current url and the referring url
            var oThisUrl = new sto.URL(sto.params.url);
            var oReferringUrl = new sto.URL(sto.params.referrer);

            // if there's an external id and a search terms
            var searchTermFunc = sto.getSearchTermFunc(oReferringUrl);
            if( searchTermFunc && oThisUrl.params.external_id )
                sto.urlParams.paidornatural = 'P';
            else
            // if we aren't paid, then we may be either natural or null
            // determine using the referring domain and query string
            {
                if( searchTermFunc )
                    sto.urlParams.paidornatural='N';

                // if we haven't determined whether it was a paid or natural search by now
                // then it will be considered neither.
            }
        },
        searchterm:function(sto,conf)
        {
            var oReferringUrl = new sto.URL(sto.params.referrer);
            var searchTermFunc = sto.getSearchTermFunc( oReferringUrl );
            if( searchTermFunc )
                sto.urlParams.searchterm = searchTermFunc( oReferringUrl );
        },
        customer_indicator:function(sto,conf)
        {
            var eos = sto.cookie('C1_CSID');
            if( eos )
                sto.urlParams.customer_indicator = 'Y';
            else sto.urlParams.customer_indicator = 'N';
        }
    };

    /**
     * a reference for decoding linkid positions
     */
    this.linkIdPositions = {
            site:0,
            strategy:1,
            wildCard:2,
            testCell:3,
            sourceCode:4,
            area:5,
            subArea:6,
            linkType:7,
            destinationCode:8
        };

    /**
     * a method to determine what value is in a particular position within the current pages linkid
     */
    this.linkIdPositionValue = function(index,url)
    {
        // check to see if there's a linkid and use that for the link_id parameter
        if( url )
            var oUrl = new this.URL( url );
        else var oUrl = new this.URL( this.params.url );

        if( ! oUrl.params.linkid )
            return;
        var matches = oUrl.params.linkid.match(/([a-z0-9]+)_([a-z0-9]+)_([a-z0-9]+)_([a-z0-9]+)_([a-z0-9]+)_([a-z0-9]+)_([a-z0-9]+)_([a-z0-9]+)_([a-z0-9]+)/i);
        if( matches && matches.length>=index+1 )
            return matches[index+1];
        else return false;
    }

    /**
     * pull the entry referrer, paidornatural, searchterm cookie values
     */
    this.readCookieParams = function()
    {
        var ck = this.cookie(this.config.sessionCookie);
        if( ck )
        {
            var cookieParts = ck.split('||');
            for( var i=0; i<cookieParts.length; i++ )
            {
                var thisVal = cookieParts[i].split('::=');
                this.urlParams[thisVal[0]]=thisVal[1];
            }
        }
    }

    /**
     * write the session url parameters to a cookie
     */
    this.writeCookieParams = function()
    {
        var params = this.getSessionParams();
        var val = [];
        for( var i=0; i<params.length; i++ )
            if( this.urlParams[params[i]] )
                val.push( params[i]+'::='+this.urlParams[params[i]] );
        var cookieVal = val.join('||');
        this.cookie(this.config.sessionCookie,cookieVal,{path:'/'});
    }

    /**
     * return only the configuration for the session persistent x+1 parameters
     */
    this.getSessionParams = function()
    {
        // cycle over the params, calling each that
        // is designated as a 'current' page parameter
        var desig = this.config.paramsConfig;
        var arToRet = [];
        for( param in desig )
        {
            if( desig[param].persist=='session' )
                arToRet.push(param);
        }
        return arToRet;
    }

    /**
     * determines which search term parsing function to use
     *
     * @return function the function to pass in the url to
     */
    this.getSearchTermFunc = function(url)
    {
        switch(url.domain)
        {
            case 'www.google.com':   return this.searchTermsFuncs.getGoogleSearchTerms;
            case 'search.yahoo.com': return this.searchTermsFuncs.getYahooSearchTerms;
            case 'search.msn.com':   return this.searchTermsFuncs.getMSNSearchTerms;
            case 'happy.search.com': return this.searchTermsFuncs.getHappySearchTerms;
            default:                 return null;
        }
    }

    /**
     * parse the search terms from a google referring url
     * @param SmartTracking.URL a url object
     */
    this.searchTermsFuncs = {
        getGoogleSearchTerms:function(url)
        {
            // ex. http://www.google.com/#hl=en&q=searching+google&btnG=Google+Search&aq=f&oq=searching+google&fp=Q9hKAq0-8-0
            if( url.params.q )
                return url.params.q;
            else return '';
        },
        // both google and msn use the 'q' url param
        getYahooSearchTerms:function(url)
        {
            // ex. http://search.yahoo.com/search?p=test+search&fr=yfp-t-501&toggle=1&cop=mss&ei=UTF-8
            if( url.params.p )
                return url.params.p;
            else return '';
        }
    };
    this.searchTermsFuncs.getMSNSearchTerms = this.searchTermsFuncs.getGoogleSearchTerms;
    this.searchTermsFuncs.getHappySearchTerms = this.searchTermsFuncs.getYahooSearchTerms;

    /**
     * a child class to ease handling URL's
     *
     * @param string url the url for this URL object to handle
     */
    this.URL = function(url)
    {
        this.url = '';
        this.domain = '';
        this.params = {};
        this.protocol = '';
        this.path = '';
		
		// This edit is to change the values of the variables that are sent to X+1 in a query string 
		this.maskedMapper = {
			mapperConfig:{	
				VS_cookie:          {persist:'current',paramDefault:'ssv_002'}, // the v1st cookie
				cg5:                {persist:'current',paramDefault:'ssv_004'}, // the cg5 variable
				testcell:           {persist:'current',paramDefault:'ssv_010'}, // from the linkid
				source:             {persist:'current',paramDefault:'ssv_021'}, // from the linkid
				location:           {persist:'current',paramDefault:'ssv_022'}, // from the linkid
				destination:        {persist:'current',paramDefault:'ssv_011'}, // from the linkid
				customer_indicator: {persist:'current',paramDefault:'ssv_003'}, // eos cookie present?
				referrer:           {persist:'session',paramDefault:'ssv_007'}, // the entry referrer
				paidornatural:      {persist:'session',paramDefault:'ssv_005'}, // entry was a paid, natural, or non search?
				searchterm:         {persist:'session',paramDefault:'ssv_006'},  // the search terms used in natural or paid search
				placement:          {persist:'current',paramDefault:'_o'}, // defined above in the urlparams
				invocation:         {persist:'current',paramDefault:'_t'}, // defined above in the urlparams
				random:          	{persist:'current',paramDefault:'ssv_023'} // defined in the render function
			}
		};

        /**
         * constructor logic
         * @param string url the url to handle
         */
        this.__construct = function(url)
        {
            if( ! (url && url.length) )
                return;

            this.url = url;

            var arSplit = this.url.split('?');
            var baseUrl = arSplit[0];

            if( baseUrl.match(/:\/\//) )
            {
                // pull out the protocol
                var proto = baseUrl.split('://');
                this.protocol = proto[0];

                // pull out the domain
                var dom = proto[1].split('/');
                var dom1 = dom[0].split(':');
                this.domain = dom1[0];

                // extract the path and paste it back together
                this.path = dom.slice(1).join('/');
            } else
            {
                // pull the protocol from the location
                var prot=location.protocol.split(':');
                this.protocol = prot[0];

                // pull out the domain
                var dom = document.domain;
                var dom1 = dom.split(':');
                this.domain = dom1[0];

                this.path = baseUrl;
            }

            if( arSplit[1] )
            {
                var parms = arSplit[1].split('&');
                for( var i = 0; i < parms.length; i++ )
                {
                    var thisParam = parms[i].split('=');
                    this.params[ thisParam[0] ] = thisParam[1];
                }
            }
        };
        this.__construct(url);

        /**
         * test if this domain is a subdomain of the domain passed in
         *
         * @param string domain the domain to test against
         */
        this.isSubOf = function(domain)
        {
            var parts = this.domain.split('.').reverse();
            var inParts = domain.split('.').reverse();
            for( var i = 0; i<inParts.length; i++ )
                if( inParts[i]!=parts[i] )
                    return false;
            return true;
        }

        /**
         * @return string the full url in string form
         */
        this.getUrl = function()
        {
            return this.protocol+'://'+this.domain+'/'+this.path+'?'+this.getQueryString();
        }

        /**
         * @return string the query string formed by the params (less the '?')
         */	
        this.getQueryString = function()
        {
			// the value of mapper is pulled from the config 
			var mapper = this.maskedMapper.mapperConfig;
			

            var s = [];
            for( o in this.params ){
				//match the values of the mapper array to the value of params array
				//create the variable name and value pairs
				s.push( mapper[o].paramDefault+'='+encodeURI(this.params[o]) );
			}
            return s.join('&');
        }
		
    }

    this.cookie = function(name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var res = cookies[i].match(/\s*(.+)\s*/);
                    if( res[1] )
                    {
                        var cookie = res[1];
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
            }
            return cookieValue;
        }
    }

    this.construct();
}

if (document.location.hostname.indexOf(".capitalone.com" )!= -1)
{
	if( typeof smartTrackingTag == 'undefined' && typeof SmartTracking == 'function' )
		{
			var smartTrackingTag = new SmartTracking();
			smartTrackingTag.render();
		}
}