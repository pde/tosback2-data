msa = {};
msa.Vowels = function ($, ttl, cdns, numImages, RID, zcdns, sslcdns, cSizes, gImages, zprob, sslprob, nprob)
{
    this.magic = "5SnM";
    this.$ = $;
    this.ttl = ttl;
    this.RID = RID;
    this.cdnDomains = cdns;
    this.imagePrefix = "/images/C/";
    this.numImages = numImages;
    this.protocol = 'http';
    this.cookieName = this.magic + "amzvowels";
    this.divName = this.magic + "vowelsdiv";
    this.imageCounter = 0;
    this.pool = null;
    this.expectLoadSuccess = null;
    this.sslExp = /ssl-images-amazon/;
    this.browserAgent = navigator.userAgent.toLowerCase();
    this.cdnSSLDomain = sslcdns;
    this.cdnCompressedDomains = zcdns;
    this.imageList = gImages;
    this.sizeList = cSizes;
    this.zprob = zprob;
    this.sslprob = sslprob;
    this.nprob = nprob;
    this.totalDomainList = [];

	// By default, old array representation is true
	this.oldArrayRepresentation = 1;
	
	// If any entry does not have the old array representation
	// then it will set OldArrayRepresentation to false
	// Written in this way so that the loop exits as soon as possible
	// when we switch to new representation
	// After complete migration, we can comment out this for loop
	for(var i = 0; i < this.imageList.length; i += 1)
	{
		var uri = this.imageList[i];
		if(uri.search("/images/G/") == -1)
		{
			this.oldArrayRepresentation = 0;
			break;
		}
	}
	
	// If new representation, then we prefix the uris
	// so that that the rest of the code does not have to change
	if(this.oldArrayRepresentation == 0)
	{
		for(var i = 0; i < this.imageList.length; i += 1)
		{
			this.imageList[i] = "/images/G/01/msa/vowels/" + this.imageList[i];
		}		
	}

    if (Math.random() * 100 < this.nprob)
    {
        for (var i = 0; i < this.cdnDomains.length; i += 1)
        {
            this.totalDomainList.push(this.cdnDomains[i]);
        }
    }
    if (Math.random() * 100 <= this.zprob)
    {
        for (var i = 0; i < this.cdnCompressedDomains.length; i += 1)
        {
            this.totalDomainList.push(this.cdnCompressedDomains[i]);
        }
    }
    if (Math.random() * 100 <= this.sslprob)
    {
        if (this.cdnSSLDomain != "")
        {
            this.totalDomainList.push(this.cdnSSLDomain);
        }
    }
    var numImages = this.imageList.length;
    var index  = Math.floor(Math.random() * numImages);
    var sIndex = Math.floor(Math.random() * this.sizeList.length);
    this.originalFile = this.imageList[index];
    this.sizeForTTLAlgorithm = this.sizeList[sIndex];
    this.originalFileExt = "jpg";
};
msa.Vowels.prototype.setDivName = function (divName)
{
    this.divName = divName;
};
msa.Vowels.prototype.setExpectLoadSucces = function (v)
{
    this.expectLoadSuccess = v;
};
msa.Vowels.prototype.attachLoadEvent = function (elem, func)
{
    if (elem.load)
    {
        if (this.pool != null)
        {
            elem.ready(function ()
            {
                elem.load(this.pool.add(func));
            });
        }
        else
        {
            elem.ready(function ()
            {
                elem.load(func);
            });
        }
    }
};
msa.Vowels.prototype.attachErrorEvent = function (elem, func)
{
    if (elem.error)
    {
        if (this.pool != null)
        {
            elem.ready(function ()
            {
                elem.error(this.pool.add(func));
            });
        }
        else
        {
            elem.ready(function ()
            {
                elem.error(func);
            });
        }
    }
};
msa.Vowels.prototype.setCallbackPool = function (pool)
{
    if (typeof pool == 'function')
    {
        this.pool = pool;
    }
};
msa.Vowels.prototype.getCookie = function (name)
{
    var returnValue = {};
    var found = false;
    if (document.cookie)
    {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++)
        {
            var cookie = this.$.trim(cookies[i]);
            if (!name)
            {
                var nameLength = cookie.indexOf('=');
                returnValue[cookie.substr(0, nameLength)] = decodeURIComponent(cookie.substr(nameLength + 1));
                found = true;
            }
            else
            {
                if (cookie.substr(0, name.length + 1) == (name + '='))
                {
                    returnValue = decodeURIComponent(cookie.substr(name.length + 1));
                    found = true;
                    break;
                }
            }
        }
    }
    if (found)
    {
        return returnValue;
    }
    else
    {
        return null;
    }
};
msa.Vowels.prototype.setCookie = function (name, value, options)
{
    if (typeof name == 'string')
    {
        options = options || {};
        if (value === null)
        {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString))
        {
            var date;
            if (typeof options.expires == 'number')
            {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 60 * 60 * 1000));
            }
            else
            {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = name + '=' + encodeURIComponent(value) + expires + path + domain + secure;
    }
    else
    {
        for (var n in name)
        {
            jQuery.cookie(n, name[n], value || options);
        }
    }
};
msa.Vowels.prototype.getNextId = function ()
{
    var imageId = this.magic + this.imageCounter;
    this.imageCounter += 1;
    return imageId;
};
msa.Vowels.prototype.sendToCLOG = function (cdn, i, eventType, t, pos)
{
    var l = (new Date).getTime() - t;
    var params = {};
    params.src = i.attr('src');
    params.l = l;
    params.s = document.domain;
    params.u = window.location.pathname;
    params.b = pos;
    params.sy = this.RID;
    params.tz = this.browserAgent;

    if (typeof(window.ue) !== 'undefined' && typeof(window.ue.furl) !== 'undefined')
    {
        new Image().src = this.generateUrl(params);
    }
};
msa.Vowels.prototype.generateUrl = function(params)
{
    var url = '//' + window.ue.furl + '/1/msa-vowels/1/OP/?';

    var key;
    var value;
    for (key in params)
    {
        value = params[key];

        url = url + window.escape(key);
        url = url + '=';
        url = url + window.escape(value);
        url = url + '&';
    }

    return url;
};
msa.Vowels.prototype.addImageEventToDOM = function (proto, cdn, url, pos)
{
    var imageId = this.getNextId();
    var imageUrl = proto + "://" + cdn + url;
    var vowels = this;
    var startTime = (new Date).getTime();
    this.$("#" + this.divName).append("<img style='overflow:hidden;visibility:hidden;font-size=0px;' id='" + imageId + "' width='0' height='0' src='" + imageUrl + "'></img>");
    var vowels = this;
    this.$("#" + imageId).ready(function ()
    {
        if (this.expectLoadSuccess == null || this.expectLoadSuccess == true)
        {
            vowels.attachLoadEvent(vowels.$("#" + imageId), function ()
            {
                vowels.sendToCLOG(cdn, vowels.$("#" + imageId), "l", startTime, pos);
            });
        }
        vowels.attachErrorEvent(vowels.$("#" + imageId), function ()
        {
            vowels.sendToCLOG(cdn, vowels.$("#" + imageId), "e", startTime, pos);
        });
    });
};
msa.Vowels.prototype.sendRequestToCDN = function (proto, cdnDomain, imagePath, pos)
{
    this.addImageEventToDOM(proto, cdnDomain, imagePath, pos);
};
msa.Vowels.prototype.sendRequestToAllCDNs = function (proto, imagePath, pos)
{
    for (var i = 0; i < this.cdnDomains.length; i += 1)
    {
        var cdnDomain = this.cdnDomains[i];
        this.sendRequestToCDN(proto, cdnDomain, imagePath, pos);
    }
};
msa.Vowels.prototype.attachTimeToName = function (name, ext)
{
    var currTime = (new Date()).getTime();
    var imagePath = name + "." + ext + "?time=" + currTime;
    return imagePath;
};
msa.Vowels.prototype.attachSTIDToName = function (name, ext)
{
    var sessionId = this.getCookie("session-id");
    if (!sessionId)
    {
        sessionId = "";
    }
    var versionTag = "STID" + sessionId + "-" + (new Date).getTime();
    var imagePath = name + "._" + versionTag + "_." + ext;
    return imagePath;
};
msa.Vowels.prototype.initStatisticalAlgorithm = function ()
{};
msa.Vowels.prototype.proto = function (cdn)
{
    if (cdn.search(this.sslExp) != -1)
    {
        return 'https';
    }
    return 'http';
};
msa.Vowels.prototype.start = function ()
{
//    var shouldRunStatisticalAlgorithm = 0;
//    var posCookieName = this.cookieName + "-" + this.sizeForTTLAlgorithm + ".pos";
//    var options = {
//        expires: 3650,
//        path: '/',
//        domain: document.domain,
//        secure: false
//    };
//    var pos = this.getCookie(posCookieName);
//    if (pos == null)
//    {
//        pos = "0";
//    }
//    pos = parseInt(pos);
//    pos = pos % this.numImages;
//    var timeCookieName = this.cookieName + "-" + this.sizeForTTLAlgorithm + ".time." + pos;
//    var time = this.getCookie(timeCookieName);
//    if (time != null)
//    {
//        time = parseInt(time);
//    }
//    var currTime = (new Date()).getTime();
//    if (time == null || currTime - time > this.ttl * 60 * 1000)
//    {
//        shouldRunStatisticalAlgorithm = 1;
//    }
    for (var i = 0; i < this.totalDomainList.length; i += 1)
    {
        var cdn = this.totalDomainList[i];
        var imageId = this.getNextId();
        var imageUrl = this.proto(cdn) + "://" + cdn + "/images/C/" + imageId + ".jpg";
        this.$("#" + this.divName).append("<img style='overflow:hidden;visibility:hidden;font-size=0px;' id='" + imageId + "' width='0' height='0' src='" + imageUrl + "'></img>");
        var vowels = this;
        this.$("#" + imageId).ready(function ()
        {
            var _cdn = cdn;
            vowels.attachLoadEvent(vowels.$("#" + imageId), function ()
            {
                vowels.sendRequestToCDN(vowels.proto(_cdn), _cdn, vowels.attachTimeToName(vowels.originalFile, vowels.originalFileExt), -500);
                vowels.sendRequestToCDN(vowels.proto(_cdn), _cdn, vowels.attachSTIDToName(vowels.originalFile, vowels.originalFileExt), -600);
//                if (shouldRunStatisticalAlgorithm == 1)
//                {
//                    vowels.sendRequestToCDN(vowels.proto(_cdn), _cdn, vowels.imagePrefix + pos + "-" + vowels.sizeForTTLAlgorithm + "B", pos);
//                }
            });
        });
    }
//    if (shouldRunStatisticalAlgorithm == 1)
//    {
//        this.setCookie(posCookieName, pos + 1, options);
//        this.setCookie(timeCookieName, currTime, options);
//    }
};
msa.Vowels.prototype.initializeAndStart = function ()
{
    if (location && location.href)
    {
        if (location.href.substring(0, 5) == "https")
        {}
        else
        {
            this.protocol = 'http';
            var vowels = this;
            vowels.$("body").ready(function ()
            {
                var existingDivElem = vowels.$("#" + vowels.divName);
                if (existingDivElem.length)
                {
                    vowels.$("body").append(existingDivElem);
                }
                else
                {
                    vowels.$("body").append("<div style='font-size:0px;' id='" + vowels.divName + "'>Fooooo</div>");
                }
                vowels.$("#" + vowels.divName).ready(function ()
                {
                    vowels.divElem = vowels.$("#" + vowels.divName);
                    vowels.divElem.empty();
                    vowels.start();
                });
            });
        }
    }
};

