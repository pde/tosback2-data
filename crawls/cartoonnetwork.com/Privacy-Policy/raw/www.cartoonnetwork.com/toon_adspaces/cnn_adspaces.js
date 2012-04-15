var cnnad_tileID = cnnad_getID();
var cnnad_enabled = true;
var cnnad_adIframes = new Array();
var cnnad_adVault = new Array();
var cnnad_adCache = new Array();
var cnnad_interstitialPID = null;
var cnnad_interstitialPlaying = false;
var cnnad_transactionID = null;

// flag for geo targetting image
var alreadySwappedDETargetImage = false;
var cnnDEadDEonCookie = false;

// document domain security issues
var cnnDocDomain = cnnad_getTld(location.hostname);
if(cnnDocDomain) {document.domain = cnnDocDomain;}

function cnnad_parseReferrer(url) {
	// take a url, typically document.referrer, and parse out the domain,
	// eg "http://edition.cnn.com/story/otherstuff&refresh=1" returns "cnn.com"
	if (!url) {
		return null;
	}
	var data = url.substring(0, url.indexOf('/', 7));
	if (data.indexOf(':', 5) > 0)
		data = data.substring(0, url.indexOf(':', 5));
	data = data.substring(data.lastIndexOf('/')+1);
	var datachop = data.split('.');
	return(datachop[datachop.length-2] + '.' + datachop[datachop.length-1]);
}

function cnnad_getParamValue(paramString, parameter, endCharacter){
	if(paramString.match(parameter)){
		var startOfString = paramString.indexOf(parameter)+parameter.length;
		var endOfString = paramString.indexOf(endCharacter,startOfString);
		var parameterValue = paramString.substring(startOfString,endOfString);
		return parameterValue;
	}
	else{
		return "";
	}
}

//DYNAMIC TYLEID
var cnnad_adTileIDGroup = new Array();
var cnnad_newTileIDIteration = 0;
var cnnad_tileExemptions = new Array();

function cnnad_addExemptCriteria() {
        var idx = cnnad_tileExemptions.length;
        if (arguments.length % 2 != 0) {
                // Arguments must be sent in pairs
                return;
        }
        cnnad_tileExemptions[idx] = new Array();
        for (var i = 0; i < arguments.length; i+=2) {
                cnnad_tileExemptions[idx][arguments[i]] = arguments[i+1];
        }
}

function cnnad_checkTileExempt(adUrl) {
        var exempt;
        for (var i = 0; i < cnnad_tileExemptions.length; i++) {
                exempt = true;
                for (adKey in cnnad_tileExemptions[i]) {
                        adValue = cnnad_getParamValue(adUrl, adKey + '=', '&');
                        if (cnnad_tileExemptions[i][adKey] != adValue) {
                                exempt = false;
                                break;
                        }
                }
                if (exempt) {
                        return true;
                }
        }
        return false;
}

function cnnad_newTileIDGroup(newGroupArray) {
        var newTileID = (cnnad_tileID * 1 + 4*(++cnnad_newTileIDIteration));
        for (var i = 0; i < newGroupArray.length; i++) {
                cnnad_adTileIDGroup[cnnad_adTileIDGroup.length] = {tileID:newTileID, adName:newGroupArray[i]};
        }
}

function cnnad_getDynamicTileID(adURL) {
        var returnId = cnnad_tileID;
        if (cnnad_checkTileExempt(adURL)) {
                return returnId;
        }
        if(cnnad_adTileIDGroup.length > 0){
                var ad_position;
                if(adURL.match("_position=") ){
                        ad_position = cnnad_getParamValue(adURL, "_position=", "&");
                }
                else if(adURL.match("_pos=")){
                        ad_position = cnnad_getParamValue(adURL, "_pos=", "&");
                }
                else {
                        ad_position = "";
                }
                for (var i = 0; i < cnnad_adTileIDGroup.length; i++) {
                        var adName = cnnad_adTileIDGroup[i].adName;
                        if(ad_position == adName){
                                returnId = cnnad_adTileIDGroup[i].tileID;
                                break;
                        }
                }
        }
        return returnId;
}
//END DYNAMIC TYLEID


function cnnad_debug (m)
{
	if (typeof(console) != 'undefined' && typeof(console.debug) != 'undefined')
	{
		console.debug(m);
	}
}

function cnnad_error (m)
{
	if (typeof(console) != 'undefined' && typeof(console.error) != 'undefined')
	{
		console.error(m);
	}
}

function cnnad_reverseString (input)
{
	// convert everything to a string
	input = "" + input;
	var output = '';

	if (input.length)
	{
		var i;
		for (i = input.length; i > 0; i--)
		{
			output += input.charAt(i-1);
		}
	}
	return(output);
}

function cnnad_getID() {
	return (cnnad_reverseString(new Date().getTime()));
}

function cnnad_renderAd(cnnad_url) {
	cnnad_url = cnnad_preview(cnnad_url);
	cnnad_url = cnnad_statusCodeQA(cnnad_url);
	if(cnnad_enabled == true) {
		document.write("<script type=\"text/javascript\"");
		document.write(" src=\""+cnnad_url+"&tile="+cnnad_getDynamicTileID(cnnad_url)+"&transactionID="+cnnad_getTransactionID()+"\"></scr");
		document.write("ipt>");
	}
}

function cnnad_preview(cnnad_adstring) {
	if ( location.host.indexOf("turner.com") > -1) {
		// we are on preview (or on local subnet, so we have to use internal names)
		cnnad_adstring = cnnad_adstring.replace(new RegExp("ads\..*?\.com","gi"),"ads.turner.com");
		cnnad_adstring = cnnad_adstring.replace(new RegExp("ads\..*?\.tv","gi"),"ads.turner.com");
	}
	var cnnad_ug = cnnad_readCookie("ug");
	if (cnnad_ug) {
		cnnad_adstring = cnnad_adstring + "&Params.User.UserID=" + cnnad_ug;
	} else {
		cnnad_adstring = cnnad_adstring + "&Params.User.UserID=";
	}
	return cnnad_adstring;
}

function cnnad_getTransactionID() {
	if (cnnad_transactionID == null) {
		cnnad_transactionID = "";
		cnnad_transactionID = Math.floor(Math.random()*9007199254740992);
	}
	return cnnad_transactionID;
}

function cnnad_isBlocking (id) {
	var blocking = false;
	if(document.getElementById('ad-'+id) != null && document.getElementById('ad-'+id).style.display === 'none') {
		blocking = true;
	} else if (cnnad_interstitialPlaying === true) {
		blocking = true;
	}
	return blocking;
}

function cnnad_createIframe (id, cnnad_url)
{
	var iframe = document.createElement('iframe');
	iframe.id = id;
	iframe.name = id;
	iframe.width = 0;
	iframe.height = 0;
	iframe.style.position = 'absolute';
	iframe.style.top = '-20px';
	iframe.style.left = '-20px';
	iframe.marginWidth = 0;
	iframe.marginHeight = 0;
	iframe.frameBorder = 0;
	iframe.scrolling = "no";
	iframe.allowTransparency = 'true';
	iframe.src = cnnad_url;

	return iframe;
}

function cnnad_createAdHelper (adId, cnnad_url, cnnad_height, cnnad_width, target) {
	if (cnnad_isBlocking(adId)) {
		window.setTimeout(function(){cnnad_createAdHelper(adId,cnnad_url,cnnad_height,cnnad_width,target);},1000);
	} else {
		var d = document.getElementById('ad-' + adId);
		if (d) {
			d.appendChild(cnnad_createIframe(adId,cnnad_url));
		} else {
			if (!target) {
				document.write('<iframe ALLOWTRANSPARENCY="true" hspace="0" vspace="0" marginHeight="0" marginWidth="0" src="' + cnnad_url + '" border="0" frameBorder="0" height="0" width="0" scrolling="no"  id="'+adId+'" style="position: absolute; top: -20px; left: -20px;" ></iframe>');
			} else {
				document.getElementById(target).innerHTML = '<iframe ALLOWTRANSPARENCY="true" hspace="0" vspace="0" marginHeight="0" marginWidth="0" src="' + cnnad_url + '" border="0" frameBorder="0" height="0" width="0" scrolling="no"  id="'+adId+'" style="position: absolute; top: -20px; left: -20px;" ></iframe>';
			}
		}
	}
}

function cnnad_createAdNoTileId(adId,cnnad_url,cnnad_height,cnnad_width,target) {
	cnnad_url = cnnad_preview(cnnad_url);
	cnnad_url = cnnad_statusCodeQA(cnnad_url);
	cnnad_url += "&transactionID=" + cnnad_getTransactionID();
	cnnad_url += '&domId=' + adId;
	cnnad_createAdHelper(adId,cnnad_url,cnnad_height,cnnad_width,target,false);
}

function cnnad_createAd(adId,cnnad_url,cnnad_height,cnnad_width,target) {
	cnnad_url = cnnad_preview(cnnad_url);
	cnnad_url = cnnad_statusCodeQA(cnnad_url);
	cnnad_url += "&transactionID=" + cnnad_getTransactionID();
	cnnad_url += '&tile=' + cnnad_getDynamicTileID(cnnad_url) + '&domId=' + adId;
	cnnad_createAdHelper(adId,cnnad_url,cnnad_height,cnnad_width,target,false);
}

function cnnad_writeAd(cnnad_callid,cnnad_url) {
        if(cnnad_enabled == true) {
                document.write("<script id=\"" + cnnad_callid + "\" type=\"text/javascript\" onload=\"cnnSendData();\"");
                document.write(" src=\""+cnnad_url+"&tile="+cnnad_getDynamicTileID(cnnad_url)+"\"></scr");
                document.write("ipt>");
        }
}

function cnnad_showAd(cnnad_id) {
	var e = document.getElementById(cnnad_id);
	if (e) {
		e.style.position = 'relative';
		e.style.left = '0px';
		e.style.top = '0px';

		if (e.style.visibility === 'hidden') {
			e.style.visibility = 'visible';
		}
		if (e.style.display === 'none') {
			e.style.display = 'block';
		}
	} else {
		cnnad_error("Could not find element by id: " + cnnad_id);
	}
}

function cnnad_setAdSize(docId,height,width) {
	var i = document.getElementById(docId);
    if (i) {
		i.height = height;
		i.width = width;
		i.className +=' adunit_'+width+'x'+height;
    } else {
		cnnad_error("Could not find element by id: " + cnnad_id);
	}
}

function cnnad_readCookie( name ) {
        if ( document.cookie == '' ) { // there is no cookie, so go no further
		return null;
        } else { // there is a cookie
		var ca = document.cookie.split(';');
		var nameEQ = name + "=";
		for(var i=0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1, c.length); //delete spaces
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
        }
}

function cnnad_getTld (hostname)
{
	var data = hostname.split(".");
	if (data.length >= 2) {
		return (data[data.length-2] + "." + data[data.length-1]);
	}
	return(null);
}

function cnnad_refreshAds (type) {
    if (! cnnad_adIframes) {
        return;
    }

    for (var i = 0; i < cnnad_adIframes.length; i++) {
		var targetAd = cnnad_adIframes[i];
		var newAdLoc = cnnad_findAd(type,targetAd.getWidth(),targetAd.getHeight());
		cnnad_swapAd(targetAd.getId(), newAdLoc);
    }
}

function cnnad_swapAd (id, newAdLoc)
{

	var elem = document.getElementById(id);
	if (elem)
	{
		elem.width = 0;
		elem.height = 0;
		elem.style.display = 'none';

		// if we find our ad in the cache, then use it
		if (cnnad_adCache[newAdLoc])
		{
			//alert("found ad via cache: " + cnnad_adCache[newAdLoc]);
			//elem.src = cnnad_adCache[newAdLoc];

			for (var j = 0; j < window.frames.length; j++) {
				try {
					if (window.frames[j].location.href.indexOf('domId='+id) > -1) {
						window.frames[j].location.replace(cnnad_adCache[newAdLoc]);
					}
				} catch(e) {}
			}		
			return;
		}

		// if not in cache, we fetch it using an Ajax call
		// first we try Prototype
		if ((typeof Ajax != 'undefined') && (typeof Ajax.Request != 'undefined'))
		{
			var temp = new Ajax.Request(
				newAdLoc,
				{
					method:'get',
					onSuccess: function (req) {
						var newLoc = cnnad_parseResponse(req.responseText,id);
						newLoc = cnnad_preview(newLoc);
						newLoc = cnnad_statusCodeQA(newLoc);
						newLoc += "&transactionID=" + cnnad_getTransactionID();
						if (newLoc)
						{
							cnnad_adCache[newAdLoc] = newLoc;
							//elem.src = newLoc;
							for (var j = 0; j < window.frames.length; j++) {
								try {
									if (window.frames[j].location.href.indexOf('domId='+id) > -1) {
										window.frames[j].location.replace(newLoc);
									}
								} catch(e) {}
							}
							return;
						}
					}
			});
		}
		// next try Dojo
		else if (typeof dojo != 'undefined')
		{
			if (typeof dojo.io == 'undefined')
			{
				dojo.require("dojo.io.*");
			}

			dojo.io.bind({
				url: newAdLoc,
				load: function (type, data, evt) {
					var newLoc = cnnad_parseResponse(data,id);
					newLoc = cnnad_preview(newLoc);
					newLoc = cnnad_statusCodeQA(newLoc);
					newLoc += "&transactionID=" + cnnad_getTransactionID();
					if (newLoc)
					{
						cnnad_adCache[newAdLoc] = newLoc;
						elem.src = newLoc;
					}
				}
			});

		}
		// neither worked, we just give up and not do anything
		else
		{
			// do nothing 
			// alert("No way to fetch " + newAdLoc);
		}
	}
}

function cnnad_parseResponse (resp, id)
{
	// chop off everything before callout marker
	var startMarker = "<!-- CALLOUT|";
	var endMarker = "|CALLOUT -->";
	var start = resp.indexOf(startMarker);
	var end = resp.indexOf(endMarker);
	var loc = null;
	
	if (start >= 0 && end > start)
	{
		loc = resp.substring(start + startMarker.length ,end);
	}

	if (loc)
	{
		return(loc  + "&tile=" + cnnad_getDynamicTileID(loc) + "&domId=" + id);
	}
	else
	{
		//alert("Parsing failed!");
		return null;
	}
}

function cnnad_findAd (type, width, height)
{
	var ret = null;
	for (var i = 0; i < cnnad_adVault.length; i++)
	{
		var ad = cnnad_adVault[i];
		if (ad.getType() == type && ad.getHeight() == height && ad.getWidth() == width)
		{
			ret = ad.getUrl();
			break;
		}
	}
	return ret;
}

function cnnad_getDEAdHeadCookie( imageRef ) {
	if (typeof(cnnad_readCookie) != "undefined") {
		cnnDEadDEonCookie = cnnad_readCookie( 'adDEon' );
	}
	var newSrc = "http://gdyn." + cnnad_getTld(location.hostname) + "/1.1/1.gif?" + new Date().getTime();
	if ( !alreadySwappedDETargetImage && !cnnDEadDEonCookie) {
		imageRef.src = newSrc;
		alreadySwappedDETargetImage = true;
	}
}

function cnnad_registerAd (type, width, height, url)
{	
	var ad = new cnnad_AdObject (null, width, height, type, url);
	cnnad_adVault[cnnad_adVault.length] = ad;
}

function cnnad_registerSpace (id, width, height)
{
	var ad = new cnnad_AdObject(id, width, height, null, null);
	cnnad_adIframes[cnnad_adIframes.length] = ad;
}

function cnnad_endInterstitial(adId)
{
	// remove the interstitial node
	var adNode = document.getElementById('interstitial'+adId);
	if(adNode && adNode.parentNode)
	{
		adNode.parentNode.removeChild(adNode);
	}

	// remove the interstitial related CSS node
	var styleNode = document.getElementById('interstitialcss' + adId);
	if (styleNode && styleNode.parentNode)
	{
		styleNode.parentNode.removeChild(styleNode);
	}

	// for IE, we need to add another style to make sure tables show up
	if (typeof(document.createStyleSheet) != 'undefined')
	{
		var cssNode = document.createStyleSheet();
		cssNode.addRule('table','{display:inline}');
	}

	cnnad_interstitialPlaying = false;
}

function cnnad_startInterstitial(adId,cnnad_url,timeout) 
{

	cnnad_interstitialPlaying = true;
	var adUrl =  cnnad_url + '&tile=' + cnnad_getDynamicTileID(cnnad_url) + '&domId=' + adId;
	document.write('<div id="interstitial'+adId+'" class="interstitial" align="center"><iframe ALLOWTRANSPARENCY="true" hspace="0" vspace="0" marginHeight="0" marginWidth="0" src="'+adUrl+'" border="0" frameBorder="0" height="0" width="0" scrolling="no" id="'+adId+'"></iframe></div>');
	if(!timeout) { timeout = 1500;}
	cnnad_interstitialPID = window.setTimeout('cnnad_endInterstitial("'+adId+'");',timeout);
}

function cnnad_resetInterstitial(adId,timeout)
{
	cnnad_interstitialPlaying = true;
	var elem = document.getElementById(adId);
	if (null != elem && elem.height > 20 && elem.width > 20)
	{
		if(cnnad_interstitialPID)
		{
			window.clearTimeout(cnnad_interstitialPID);
		}
		if(!timeout) { timeout = 15000;}
		cnnad_interstitialPID = window.setTimeout('cnnad_endInterstitial("'+adId+'");',timeout);
	}
}

function cnnad_getUrlParam(name)
{
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null )
		return "";
	else
		return results[1];
}

function cnnad_statusCodeQA(cnnad_adstring)
{
	var qaparam = cnnad_getUrlParam("adsqa");
	if (qaparam) {
		cnnad_adstring = cnnad_adstring + "&" + qaparam.replace("%3D", "=");
	}
	return cnnad_adstring;
}

function cnnad_updateIframeSource(id, cnnad_url) {
        cnnad_url = cnnad_preview(cnnad_url);
	cnnad_url = cnnad_statusCodeQA(cnnad_url);
	cnnad_url += "&transactionID=" + cnnad_getTransactionID();
        document.getElementById(id).contentWindow.location.replace(cnnad_url + '&tile=' + cnnad_tileID + '&domId=' + id);
}

function cnnad_showAdByKey(adKey, iframeId) {
        cnnad_swapAd(iframeId, cnnad_adUrls[adKey]);
}

function cnnad_haveCookie(name) {
	return cnnad_readCookie(name);
}

function cnnad_ugsync() {
        if (!cnnad_haveCookie('ugs')) {
		document.write('<scr'+'ipt src="http://www.ugdt'+'urner.com/xd.sjs"></scr'+'ipt>');
        }
}

// ----- THE CNN ADS OBJECT ----- //
function cnnad_AdObject (id,width,height,type,url)
{
	this.id = id;
	this.width = width;
	this.height = height;
	this.type = type;
	this.url = url;

	this.getId = function () { return this.id; };
	this.setId = function (id) { this.id = id; };

	this.getWidth = function () { return this.width; };
	this.setWidth = function (width) { this.width = width; };

	this.getHeight = function () { return this.height; };
	this.setHeight = function (height) { this.height = height; };

	this.getType = function () { return this.type; };
	this.setType = function (type) { this.type = type; };

	this.getUrl = function () { return this.url; };
	this.setUrl = function (url) { this.url = url; };

	this.toString = function () { return "[AD|ID=" + this.id + "|WIDTH=" + this.width + "|HEIGHT=" + this.height + "]"; };
}
// ------ /CNN ADS OBJECT ----- //

