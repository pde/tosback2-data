function hasImageCompleted(img) {
    var comp = img.complete;
    
    if (typeof comp == 'undefined') {
        // Work-around for Safari:
        var test = new Image();
        test.src = img.src;
        comp = test.complete;
    }
    
    var retVal;
    
    if (comp === false) {
        retVal = false;
    } else if (comp === true && this.naturalWidth == 0) {
        // Possible weird case for Firefox:
        retVal = false;
    } else {
        retVal = true;
    }
    
    return retVal;
};

/**************** START IMAGE STACK FLIPPER STUFF *********************************/

var ImageStackFlipper = Class.create({

    initialize: function(div, forward, back, flipCompletedHandler) {
        this.flipperDiv = $(div);
        this.forwardButton = $(forward);
        this.backButton = $(back);
        this.flipCompletedHandler = flipCompletedHandler;

        this.flipForwardEvent = this.flipForward.bindAsEventListener(this);
        this.flipBackwardEvent = this.flipBackward.bindAsEventListener(this);

        this.zIndexMultiplier = 20;  // This may require some tweaking...

        this.reset();
    },
  
    reset: function() {
        this.resetStacks();

        var divOffset = this.flipperDiv.positionedOffset();
        var divDimensions = this.flipperDiv.getDimensions();
        this.calculatePagePositions(divOffset, divDimensions);

        this.leftPageStack.each(function(page, i) {
            page.show();
            this.calculatePageSizes(page, divOffset, divDimensions);
            this.calculatePageOffsets(page);

            page.setStyle({ left: page.leftStackOffset.left + 'px',
                            top: page.leftStackOffset.top + 'px',
                            width: page.stackSize.width + 'px',
                            height: page.stackSize.height + 'px',
                            zIndex: (i + 1) * this.zIndexMultiplier });
        }.bind(this));

        this.flipForward();
    },
  
    resetStacks: function() {
        this.leftPageStack = [];
        this.selectedPage = null;
        this.rightPageStack = [];

        this.flipperDiv.select('img').reverse().each(function(page) {
            var p = $(page);

            if (!p.src.blank() && hasImageCompleted(p)) {
                if (!p.originalSize) {
                    p.originalSize = p.getDimensions();
                }

                this.leftPageStack.push(p);
            }
        }.bind(this));
    },
  
    calculatePagePositions: function(divOffset, divDimensions) {
        function createPosition(widthFactor, heightFactor) {
            return { left: divOffset.left + divDimensions.width * widthFactor, 
                     top: divOffset.top + divDimensions.height * heightFactor };
        }

        this.leftStackCenter = createPosition(0.125, 0.5);
        this.selectedCenter = createPosition(0.5, 0.5);
        this.rightStackCenter = createPosition(0.875, 0.5);
    },
  
    calculatePageSizes: function(page, divOffset, divDimensions) {
        function scaleToSmallerDimension(original, target) {
            var percent = { width: target.width / original.width,
                            height: target.height / original.height };

            var scale = percent.width < percent.height ? percent.width : percent.height;

            return { width: parseInt(original.width * scale), 
                     height: parseInt(original.height * scale) };
        }

        var maxStackSize = { width: divDimensions.width * 0.15,
                             height: divDimensions.height * 0.2 };
                         
        page.stackSize = scaleToSmallerDimension(page.originalSize, maxStackSize);

        var maxSelectedSize = { width: divDimensions.width * 0.5,
                                height: divDimensions.height * 0.9 };
                            
        page.selectedSize = scaleToSmallerDimension(page.originalSize, maxSelectedSize);
    },
  
    calculatePageOffsets: function(page) {
        function createOffset(pos, size) {
            return { left: parseInt(pos.left - size.width * 0.5),
                     top: parseInt(pos.top - size.height * 0.5) };
        }
        
        page.leftStackOffset = createOffset(this.leftStackCenter, page.stackSize);
        page.selectedOffset = createOffset(this.selectedCenter, page.selectedSize);
        page.rightStackOffset = createOffset(this.rightStackCenter, page.stackSize);
    },
  
    flipForward: function(e) {
        this.flip(e, 'forward');
    },
  
    flipBackward: function(e) {
        this.flip(e, 'backward');
    },

    flip: function(e, direction) {
        this.disableBothStacksClick();
        var fromStack = direction == 'forward' ? this.leftPageStack : this.rightPageStack;
        var toStack = direction == 'forward' ? this.rightPageStack : this.leftPageStack;
        var page = fromStack.pop();

        if (page) {
            var effects = [];
            effects.push(this.createSlideEffects(page, 'center'));

            if (this.selectedPage) {
                this.selectedPage.style.zIndex = (toStack.size() + 1) * this.zIndexMultiplier;
                
                effects.push(this.createSlideEffects(this.selectedPage, 
                                                     direction == 'forward' ? 'right' : 'left'));
                
                toStack.push(this.selectedPage);
            }

            this.launchEffects(effects, page);
        } else {
            this.enableBothStacksClick();
        }

        if (e) {
            Event.stop(e);
        }
    },
    
    launchEffects: function(effects, page) {
        var handleFinish = function() {
            this.selectedPage = page;
            this.enableBothStacksClick();

            if (this.flipCompletedHandler) {
                this.flipCompletedHandler(page);
            }
        }
    
        new Effect.Parallel(effects, { afterFinish: handleFinish.bind(this) });
    },
  
    createSlideEffects: function(page, position) {
        var effectSize;
        var effectPosition;

        switch (position) {
            case 'left':
                effectSize = page.stackSize;
                effectPosition = page.leftStackOffset
                break;

            case 'center':
                effectSize = page.selectedSize;
                effectPosition = page.selectedOffset
                break;

            case 'right':
                effectSize = page.stackSize;
                effectPosition = page.rightStackOffset
                break;
        }

        var sizeStyle = new Template('width: #{width}px; height: #{height}px;').evaluate(effectSize);
        var posStyle = new Template('left: #{left}px; top: #{top}px;').evaluate(effectPosition);

        return new Effect.Morph(page, { sync: true, style: sizeStyle + posStyle });
    },
  
    disableBothStacksClick: function() {
        this.forwardButton.stopObserving('click', this.flipForwardEvent);
        this.backButton.stopObserving('click', this.flipBackwardEvent);
    },

    enableBothStacksClick: function() { 
        this.forwardButton.observe('click', this.flipForwardEvent);
        this.backButton.observe('click', this.flipBackwardEvent);
    }

});

/**************** END IMAGE STACK FLIPPER STUFF ***********************************/
/**************** START GOOGLE ADSENSE FOR SEARCH STUFF ***************************/

function renderAds( adsSource, adTarget, redirectUrl, numberOfAdsWrittenBefore ) {
    var numberOfAdsWritten = 0;
    var gasOuterDiv = $( adTarget.divId );
    
    if ( gasOuterDiv != null ) {
        if ( adsSource.length > 0 ) {
            var targetDiv = gasOuterDiv.select( '.gasAfsInner' ).first();
        
            if ( targetDiv !== undefined && targetDiv != null ) {                            
                adTarget.numberOfAds.times( function( n ) {
                    var googleAd = adsSource.shift();
                    
                    if ( googleAd !== undefined && googleAd != null ) {
                        var currentAdIndex = numberOfAdsWritten + numberOfAdsWrittenBefore;
                        
                        targetDiv.appendChild(createGoogleAdElement(buildAdRedirectUrl(redirectUrl,
                                                                                       currentAdIndex,
                                                                                       googleAd),
                                                                    googleAd,
                                                                    adTarget.adFormat));
                                                                      
                        if ( n < adTarget.numberOfAds - 1 ) {
                            targetDiv.appendChild( document.createElement( 'br' ) );
                            targetDiv.appendChild( document.createElement( 'br' ) );
                        }

                        numberOfAdsWritten++;
                    }
                } );
            }
        } else {
            gasOuterDiv.hide();
        }
    }
    
    return numberOfAdsWritten;
}


function insertAdSeparators( adElements ) {
    return adElements.inject( [], 
                              function( acc, elm, index ) { 
                                  acc.push( elm );
                                  
                                  if ( index < adElements.size() - 1 ) {
                                      acc.push( document.createElement( 'br' ) );
                                      acc.push( document.createElement( 'br' ) );
                                  }
                                  
                                  return acc;
                              } );
}

/*
function emitNotEnoughAdsPixel( numberOfAdsRequested, 
                                numberOfAdsReturned,
                                query,
                                siteId,
                                channelIds,
                                adFormat ) {
    
    var img = new Image();
    
    img.src = 'http://pt.crossmediaservices.com/pt/default.aspx?' + 
                    'action=adsense' + 
                    '&adsrequested=' + numberOfAdsRequested + 
                    '&n=' + numberOfAdsReturned + 
                    '&keyword=' + query + 
                    '&siteid=' + siteId +
                    '&channel=' + channelIds +
                    '&format=' + adFormat;
    
    img.height = 1;
    img.width = 1;
    img.border = 0;
}
*/


function buildAdRedirectUrl( redirectUrl, currentAdIndex, currentGoogleAd ) {
    return redirectUrl + 
            '&position=' + currentAdIndex +
            '&regionname=' + escape( currentGoogleAd.regionname ) +
            '&redirect=' + escape( currentGoogleAd.url );
}


function createGoogleAdElement(adUrl, googleAd, adFormat) {
    var adLink = document.createElement( 'a' );    
    adLink.href = 'javascript:void(null);'
    adLink.style.textDecoration = 'none';
    adLink.className = 'gasAfsText';
    adLink.rel = 'nofollow';
    
    adLink.onclick = function() { 
        window.open(    adUrl, 
                        "_blank",
                        "width=800,height=600,toolbar=1,scrollbars=1,status=1,location=1,menubar=1,resizable=1");
    };
    
    adLink.onmouseout = function() { 
        window.status = '';
        return true;
    };
    
    adLink.onmouseover = function() { 
        window.status = 'go to ' + googleAd.visible_url;
        return true;
    };
    
    adLink.appendChild( createGoogleAdLine( 'div', 'gasAfsLineOne', googleAd.line1 ) );
    
    if (adFormat == "WideFormat") { 
        adLink.appendChild(createGoogleAdLine('div', 'gasAfsLineTwo', googleAd.line2 + ' ' + googleAd.line3));
    } else {
        adLink.appendChild(createGoogleAdLine('div', 'gasAfsLineTwo', googleAd.line2));
        adLink.appendChild(createGoogleAdLine('div', 'gasAfsLineTwo', googleAd.line3));
    }
    
    adLink.appendChild( createGoogleAdLine( 'span', 'gasAfsSiteName', googleAd.visible_url ) );

    return adLink;
}


function createGoogleAdLine( tagName, className, innerHTML ) {
    var line = document.createElement( tagName );  
    line.className = className;
    line.innerHTML = innerHTML;
    return line;
}

/************************* END GOOGLE ADSENSE FOR SEARCH STUFF *********************/

window.onerror = null;
document.slh = true;
self.slh = true;

// Browser Detection
isMac = (navigator.appVersion.indexOf("Mac")!=-1) ? true : false;
NS4 = (document.layers) ? true : false;
IEmac = ((document.all)&&(isMac)) ? true : false;
IE4plus = (document.all) ? true : false;
IE4 = ((document.all)&&(navigator.appVersion.indexOf("MSIE 4.")!=-1)) ? true : false;
IE5 = ((document.all)&&(navigator.appVersion.indexOf("MSIE 5.")!=-1)) ? true : false;
ver4 = (NS4 || IE4plus) ? true : false;
NS6 = (!document.layers) && (navigator.userAgent.indexOf('Netscape')!=-1)?true:false;

function swap_images ( imageName, imageSource  )
	{
		window.document.images[imageName].src = imageSource;
	}
	function SubmitSearch() {
		strSearch= document.search_terms_form.Ntt.value;
		if (strSearch=="") {     //is it blank?		
			
			alert("Please enter a term in the search box.");
			//return false;
		}
		else{
			document.search_terms_form.submit();
		}
	}
	
function openWindow(strPage, strName, strFeatures) {
	var x = window.open(strPage, strName, strFeatures);
}

function popUp(URL, lngheight, lngwidth) {
day = new Date();
id = day.getTime();
eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=" + lngwidth + ",height=" + lngheight + "');");
}

// print tracking ...
var bolPageWasPrinted = false;

function oap() {
	if(!bolPageWasPrinted) {
		var tmpImg = new Image();
		var strPage = window.location.pathname;
		strPage = strPage.substring(1, strPage.length);
		var i = strPage.indexOf('/');
		if(i > 0) strPage = strPage.substring(i+1, strPage.length);
		tmpImg.src = 'http://pt.crossmediaservices.com/pt/<%=AppGlobal.BaseDir%>/track_print.asp?page='+strPage+'&'+window.location.search.substring(1,window.location.search.length);
		bolPageWasPrinted = true;	
	}
}
window.onafterprint = oap;
//Hide broken images			
function FixMissingImage(img)
{
	try{
		img.onerror = null;
		img.src = "http://akimages.shoplocal.com/images/dot_clear.gif";
	}
	catch(e){}
	
}
function DrawFlashMovie(id, url, width, height, flashvars)
{		
		
		document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + width + '" height="' + height + '" id="' + id + '" align="middle">');
	    document.write('<param name="allowScriptAccess" value="sameDomain"/\>');
	    document.write('<param name="movie" value="' + url + '?' + flashvars + '" />');
	    document.write('<param name="quality" value="high" /><param name="scale" value="exactfit" /><param name="bgcolor" value="#ffffff" /><embed src="' + url + '?' + flashvars + '" quality="high" scale="exactfit" bgcolor="#ffffff" width="' + width + '" height="' + height + '" align="top" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
	    document.write('</embed>');
	    document.write('</object>');
}
function changeCMSLink(link)
{
   window.location.href=link; 
   return false;
}
// AJAX Helper functions -------------------------------------------------------------
    function createXMLHttp() {
		var xmlhttp;
        try {
            xmlhttp = new XMLHttpRequest();
        } catch (e) {
            var MSXML_XMLHTTP_PROGIDS = new Array(
                'MSXML2.XMLHTTP.5.0',
                'MSXML2.XMLHTTP.4.0',
                'MSXML2.XMLHTTP.3.0',
                'MSXML2.XMLHTTP',
                'Microsoft.XMLHTTP'
            );
            var success = false;
            for (var i=0;i < MSXML_XMLHTTP_PROGIDS.length && !success; i++) {
                try {
                    xmlhttp = new ActiveXObject(MSXML_XMLHTTP_PROGIDS[i]);
                    success = true;
                } catch (e) {}
            }
            if ( !success ) {
                alert('Cannot create XMLHttpRequest - not supported');
            }
        }
        return xmlhttp;
    }
    
    function CallService(xmlhttp, url, handler) {
        // Places a async call - third arg is true
        xmlhttp.open("GET", url, true);
        
        // Set the callback
        xmlhttp.onreadystatechange = handler;
        xmlhttp.send(null);	                  
    }    

function getTheObject(objectId) {
    // cross-browser function to get an object's style object given its
    if(document.getElementById && document.getElementById(objectId)) {
	// W3C DOM
	return document.getElementById(objectId);
    } else if (document.all && document.all(objectId)) {
	// MSIE 4 DOM
	return document.all(objectId);
    } else if (document.layers && document.layers[objectId]) {
	// NN 4 DOM.. note: this won't find nested layers
	return document.layers[objectId];
    } else {
	return false;
    }
}

// adds a trim() method to strings
String.prototype.trim = function() {
 // skip leading and trailing whitespace
 // and return everything in between
  var x=this;
  x=x.replace(/^\s*(.*)/, "$1");
  x=x.replace(/(.*?)\s*$/, "$1");
  return x;
}

function gc(key, subkey, defaultvalue, nounescape) {
	var retval;
	var defval = null;
	if (defaultvalue != null && defaultvalue != undefined) defval = defaultvalue;
	var strKey = key;
	var strSubKey = '';
	if(subkey) strSubKey = subkey;

	var cookiestr = " " + document.cookie + ';';
	var rx = new RegExp('[^&]' + strKey + '=([^;]+)', 'i');
	if(rx.test(cookiestr)) {
		rx.exec(cookiestr);
		if(strSubKey == '') {
			// no subkey, return the match
			retval = (nounescape) ? RegExp.$1 : unescape(RegExp.$1);
			retval = retval.replace(/\+/ig,' ').trim();
			if (retval == '')
				return defval;	// empty string, return default
			else
				return retval;
		}
		else {
			// get the subkey
			var val = (nounescape) ? RegExp.$1 + '&' : unescape(RegExp.$1 + '&');
			rx = new RegExp(strSubKey + '=([^&]+)', 'i');
			if(rx.test(val)) {
				// it's in there
				rx.exec(val);
				retval = (nounescape) ? RegExp.$1 : unescape(RegExp.$1);
				retval = retval.replace(/\+/ig,' ').trim();
				if (retval == '')
					return defval;	// empty string, return default
				else
					return retval;
			}
			else {
				// not in there
				return defval;
			}
		}
	}
	else {
		// no match on the key
		return defval;
	}    
}

function readSubCookie(name,subname)
{
	var tmpCookie=getCookie(name);//this is the values in the cookie
	if(tmpCookie)
	{
		uCookies=(tmpCookie.split("&"));
		var found=-1;
		for(i=0;i<uCookies.length;i++)
		{
			if (uCookies[i].indexOf(subname)!=-1) 	 
				{//extract the value
					var start =uCookies[i].indexOf("=");
					return uCookies[i].substring(start+1);
				}
		}	
	}		
}

// cms_getCookie
// defaultvalue is optional. If passed, then 
// if "key" doesn't exist or is "", defaultvalue
// is returned. Otherwise null is returned on a mismatch.
function cms_getCookie(key, subkey, defaultvalue, nounescape) {
    var retval;
    var defval = null;
    if (defaultvalue != null && defaultvalue != undefined) defval = defaultvalue;
    var strKey = key;
    var strSubKey = '';
    if(subkey) strSubKey = subkey;

    var cookiestr = " " + document.cookie + ';';
    var rx = new RegExp('[^&]' + strKey + '=([^;]+)', 'i');
    if(rx.test(cookiestr)) {
        rx.exec(cookiestr);
        if(strSubKey == '') {
            // no subkey, return the match
            retval = (nounescape) ? RegExp.$1 : unescape(RegExp.$1);
            retval = retval.replace(/\+/ig,' ').trim();
            if (retval == '')
                return defval;  // empty string, return default
            else
                return retval;
        }
        else {
            // get the subkey
            var val = (nounescape) ? RegExp.$1 + '&' : unescape(RegExp.$1 + '&');
            rx = new RegExp(strSubKey + '=([^&]+)', 'i');
            if(rx.test(val)) {
                // it's in there
                rx.exec(val);
                retval = (nounescape) ? RegExp.$1 : unescape(RegExp.$1);
                retval = retval.replace(/\+/ig,' ').trim();
                if (retval == '')
                    return defval;  // empty string, return default
                else
                    return retval;
            }
            else {
                // not in there
                return defval;
            }
        }
    }
    else {
        // no match on the key
        return defval;
    }    
}

function getUrlParameter( name )
{
  return (getUrlParameter(document.location, name));
}

function getUrlParameter( url, name )
{
  var regexS = "[\\?&]"+name+"=([^&$]+)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  if( results == null )
  {
    return "";
  }
  else
  {
    return results[1];
  }
}

function setSubCookieWithVdir(uName, name, value)
{
	uValue = getCookie(uName)
	if(uValue) {            
				uCookies = uValue.split("&")
				var found = -1
				for( c = 0; c < uCookies.length; c++ )
				{                       
					t = uCookies[c].split( '=' );
					if(t[0] == name) {
						found = 1
						t[1] = value
						uCookies[c] = t.join( '=' )
						break;
					}
				}
				if( found == -1 )
				{
					uCookies[uCookies.length] = name + '=' + value
		        }                                    
				uValue = uCookies.join( '&' )
	} else
				uValue = name + '=' + value
	
	// update real cookie
	setCookie(uName, uValue,"",'/' + GetVdir())
}

function ValidateEmailSignup(emailaddress)
{
    return ValidateEmailWithCallBack(emailaddress, function(){alert("Please enter a valid email address");});
}

function ValidateEmailWithCallBack(emailaddress, callBack)
{
    if((emailaddress == "") || (validateEmailRegex(emailaddress) == false))
    {
        callBack();
        return false;
    }
    return true;
}

function EmailSignup(emailaddress)
{
    location.href = "default.aspx?action=mylogin&email=" + emailaddress + "&edit=y";
}

function ValidatePriceAlertSignUp(emailaddress, price, currentprice)
{   
		currentprice = currentprice.replace(",", "");
		price = price.replace(",", "");
        var dbCurrentPrice = parseFloat(currentprice);
        var dbPrice = parseFloat(price);
	    var allOk = true;
	    if ((emailaddress == null)||(emailaddress == ""))
	    {
	        alert("Please enter your email address.");
	        allOk = false;
	    }
	    else if ((price == null)||(price == ""))
	    {
	        alert("Please enter a price");
	        allOk = false;
	    }
	    else if (validateEmailRegex(emailaddress) == false)
	    {
			alert("Please enter a valid email address.");
	        allOk = false;
	    }
	    else if ((price.indexOf("-") >= 0)||(validatePriceRegex(price) == false))
	    {
			alert("Please enter a valid price (ex: $50.00)");
			allOk = false;
	    }
	    else if (dbPrice >= dbCurrentPrice)
	    {
	        alert("Your alert price cannot be higher than, or equal to, the current price. Please try again.");
			allOk = false;
	    }
	    return (allOk);	
}

function validateZIP(field) 
{
	var valid = "0123456789-";
	var hyphencount = 0;

	if (field.length!=5 && field.length!=10) 
	{
		return false;
	}
	
	for (var i=0; i < field.length; i++) 
	{
		temp = "" + field.substring(i, i+1);
		if (temp == "-") hyphencount++;
		if (valid.indexOf(temp) == "-1") {
			return false;
		}
		if ((hyphencount > 1) || ((field.length==10) && ""+field.charAt(5)!="-")) {
			return false;
		}
	}
}

function validatePriceUpdate()
{
	var totalAlertsElementVal = catchElementVal("price_alerts_count");
	if ((totalAlertsElementVal != null)&&(totalAlertsElementVal != ""))
	{
		var totalAlertsCount = parseInt(totalAlertsElementVal);
		for (var i = 0; i < totalAlertsCount; ++i)
		{
			//Get element value of the desired price
			var desiredPriceValue = catchElementVal("desired_price_" + String(i));
			var currentPriceValue = catchElementVal("current_price_" + String(i));
			
			if (validatePrice(desiredPriceValue, currentPriceValue)== false)
			{
				return false;
			}
		}
	}
	return (true);
}

function validatePriceRegex(inputPrice)
{	
	var RegularExpression  =  new RegExp("^[$]?[0-9]*(\.)?[0-9]?[0-9]?$");
	return (RegularExpression.test(inputPrice));
}

function validateEmailRegex(inputEmail)
{
	var filter = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/;
	return(filter.test(inputEmail));
}

function validatePrice(desiredPriceString, currentPriceString )
{
	var desPrice = parseFloat(desiredPriceString);
	var curPrice = parseFloat(currentPriceString);
	var allOk = true;
	
	if (validatePriceRegex(desiredPriceString) == false)
	{
		allOk = false;
	}
	else if (desPrice >= curPrice)
	{
	    allOk = false;
	}
	return (allOk);
}

function emCheck(str) {
		var at="@"
		var dot="."
		var lat=str.indexOf(at)
		var lstr=str.length
		var ldot=str.indexOf(dot)
		if (str.indexOf(at)==-1){
		   alert("Invalid E-mail ID")
		   return false
		}
		if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
		   alert("Invalid E-mail ID")
		   return false
		}

		if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
		    alert("Invalid E-mail ID")
		    return false
		}
		 if (str.indexOf(at,(lat+1))!=-1){
		    alert("Invalid E-mail ID")
		    return false
		 }
		 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		    alert("Invalid E-mail ID")
		    return false
		 }
		 if (str.indexOf(dot,(lat+2))==-1){
		    alert("Invalid E-mail ID")
		    return false
		 }
		 if (str.indexOf(" ")!=-1){
		    alert("Invalid E-mail ID")
		    return false
		 }
 		 return true					
	}

function AddPriceAlertsToInput(index, update_or_remove)
{
		if (document.getElementById)
		{
			var docElement = document.getElementById('sl_td_alert_' + index);
			var docElementPreferredID = document.getElementById('product_id_' + index);
			var docElementMinimum = document.getElementById('desired_price_' + index);
			var docElementRemoveOrUpdate = document.getElementById(update_or_remove);
		}
		else if (document.all)
		{
			var docElement = document.all('sl_td_alert_' + index);
			var docElementPreferredID = document.all('product_id_' + index);
			var docElementMinimum = document.all('desired_price_' + index);
			var docElementRemoveOrUpdate = document.all(update_or_remove);
		}
		if (update_or_remove == "price_alerts_remove")
		{
			docElement.style.display = 'none';
		}
		if (docElementRemoveOrUpdate.value == "")
		{
			docElementRemoveOrUpdate.value = docElementPreferredID.value + "," + docElementMinimum.value;
		}
		else
		{
			docElementRemoveOrUpdate.value += "," + docElementPreferredID.value + "," + docElementMinimum.value;
		}
}

function RemovePriceAlerts(index)
{
	var removeElement = catchElement('price_alerts_remove')
	var alertToRemove = catchElement('sl_salert_remove_' + index);
	var docElementPreferredID = catchElement('product_id_' + index);
	var docElementMinimum = catchElement('desired_price_' + index);
	
	if (alertToRemove.checked == true)
	{
		if (removeElement.value == "")
		{
			removeElement.value = docElementPreferredID.value + "," + docElementMinimum.value;
		}
		else
		{
			removeElement.value += "," + docElementPreferredID.value + "," + docElementMinimum.value;
		}
	}
	else
	{
		var arrSplit = removeElement.value.split(',');
		var stringToRemove = docElementPreferredID.value + "," + docElementMinimum.value;
		removeElement.value = removeElement.value.replace(stringToRemove,"");
	
		if (removeElement.value.length > 0)
		{
			var stringAtZero = removeElement.value.substring(0, 1);
			var stringAtLast = removeElement.value.substring(removeElement.value.length - 1);
			if (stringAtZero == ",")
			{
				removeElement.value = removeElement.value.replace(",","");
			}
			else if (stringAtLast == ',')
			{
				removeElement.value = removeElement.value.substring(0, removeElement.value.length - 1);
			}
			else if (removeElement.value.indexOf(",,") >= 0)
			{
				removeElement.value = removeElement.value.replace(",,",",");
			}
		}
	}
}

function catchElementVal(namee)
{
	if (document.getElementById) {
		if (document.getElementById(namee))
		{
			return document.getElementById(namee).value;
		}
		else
		{
			return ('notexist');
		}
    }
     else if(document.all) {
		if (document.all.namee)
		{
			return document.all.namee.value;
		}
		else
		{
			return ('notexist');
		}
    }
}

function catchElement(namee)
{

	if (document.getElementById) {
        return document.getElementById(namee);
    }
     else if(document.all) {
		return document.all.namee;
    }
}

function toggleAlertsItemDetail(id)
{
	if (document.getElementById) {
	    var alertsToggle1 = document.getElementById(id);
	    if ((alertsToggle1.style.display == "")||(alertsToggle1.style.display == "none"))
	    {
		    alertsToggle1.style.display = "block";
		}
		else
	    {
	        alertsToggle1.style.display = "none";
	    }
	}
	else if(document.all) {
	    var alertsToggle2 = document.all.id;
	    if ((alertsToggle2.style.display == "")||(alertsToggle2.style.display == "none"))
	    {
		    alertsToggle2.style.display = "block";
		}
		else
	    {
	        alertsToggle2.style.display = "none";
	    }
	}
}

function toggleAlerts(id, listingcount, imagepath, errorMessage)
	{
	    var alertsToggle1 = catchElement(id);
	    if ((alertsToggle1.style.display == "")||(alertsToggle1.style.display == "none"))
	    {
	        if (id.indexOf("thanks") < 0)
	        {
	           var swapDiv = catchElement('pricealertswap' + listingcount);
	           var htmlToAdd = "<div class='sl_palerts_top_border'>";
               htmlToAdd += "<div class='sl_palerts_signup_bg'>"; 
               htmlToAdd += "<div class='sl_price_alerts_title_close'>";
               htmlToAdd += "<div class='sl_palerts_close_all'>";
	           htmlToAdd += "<div class=\"sl_palerts_close_text\"><a href=\"javascript:toggleAlerts('" + id + "','" + listingcount + "','" + imagepath + "','" + errorMessage + "');\">close</a></div>";
               htmlToAdd += "<div class=\"sl_palerts_close_img\"><a href=\"javascript:toggleAlerts('" + id + "','" + listingcount + "','" + imagepath + "','" + errorMessage + "');\"><img src=\"" + imagepath + "/broadreach2/images/shoplocal2006/sl_palert_close.gif\" border=\"0\" /></a></div>";
	           htmlToAdd += "</div>";
               htmlToAdd += "<div class=\"sl_price_alerts_header_text\">ShopLocal Price Alert Sign-Up</div>";
               htmlToAdd += "</div>"
               if ((errorMessage != null)&&(errorMessage != ""))
               {
                    htmlToAdd += "<div style=\"padding-left:82px; padding-top:15px; color: Red; font-weight: bold;\">" + errorMessage + "</div>"; 
               }
               htmlToAdd += "<div style=\" height:30px;\"></div>" 
               htmlToAdd += "<div style=\"  height:12px;\" id=\"sl_price_alerts_text\">Sign-up to receive a <span class=\"sl_palerts_blue_med\">Price Alert E-mail</span> on this item and save loads of cash!</div>";
               htmlToAdd +=  "<div class=\"sl_price_alerts_container\">";
	           htmlToAdd += "<div class=\"sl_price_alerts_email_all\">";
	           htmlToAdd += "<label for=\"paemail\" class=\"sl_label_palert_add\">Enter your e-mail address:</label><br />";
	           htmlToAdd += "<input name=\"paemail\" class=\"sl_label_palert_add\" id=\"paemail" + listingcount+ "\" value=\"enter your email address\" onfocus=\"javascript: if (this.value == 'enter your email address') { this.value='';}\" />";
	           htmlToAdd += "</div><div class=\"sl_price_alerts_price_all\">";
	           htmlToAdd += "<label for=\"paprice\" class=\"sl_label_palert_add\">Desired price:</label><br />";
	           htmlToAdd += "<label for=\"paprice\" class=\"sl_label_palert_price\">$</label><input name=\"paprice\" class=\"sl_label_palert_price\" maxlength=\"10\" id=\"paprice" + listingcount + "\" /><label for=\"paprice\" class=\"sl_label_palert_price\">.00</label>";
	           htmlToAdd += "</div><div id=\"sl_label_palert_price_btn\"><input type=\"image\" name=\"Submit\" value=\"Submit\" src=\"" + imagepath + "/broadreach2/images/shoplocal2006/sl_ealert_SubmitButton.gif\" border=\"0\"/></div>";
	           htmlToAdd += "</div></div></div>";
               swapDiv.innerHTML = htmlToAdd;
	        }
	        else
	        {
	            var swapDiv = catchElement("pricealerts" + listingcount + "_thanks");
	            var htmlToAdd = "<div class=\"sl_palerts_top_border\">";
                htmlToAdd += "<div class=\"sl_palerts_signup_bg\" >";
                htmlToAdd += "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"sl_pralerts_thumb_table\"><tr>";
                htmlToAdd += "<td class=\"sl_price_alerts_text\"><div class=\"sl_price_alerts_header_text\">ShopLocal Price Alert Sign-Up</div></td>";
	            htmlToAdd += "<td align=\"right\" colspan=\"2\">";
	            htmlToAdd += "<div class=\"sl_palerts_close_all\">";
	            htmlToAdd += "<div class=\"sl_palerts_close_text\"><a href=\"javascript:toggleAlerts('" + id + "','" + listingcount + "','" + imagepath + "','" + errorMessage + "');\">close</a></div>";
                htmlToAdd += "<div class=\"sl_palerts_close_img\"><a href=\"javascript:toggleAlerts('" + id + "','" + listingcount + "','" + imagepath + "','" + errorMessage + "');\"><img src=\"" + imagepath + "/broadreach2/images/shoplocal2006/sl_palert_close.gif\" border=\"0\" /></a></div>";
	            htmlToAdd += "</div></td></tr><tr><td colspan=\"2\" valign=\"top\">";
	            htmlToAdd += "<div id=\"sl_L2_thanku_text\">Thank You!</div><div id=\"sl_L2_palert_all\">";
	            htmlToAdd += "<div id=\"sl_L2_palert_text\"> You will receive a <b>Price Alert Confirmation</b> email very soon.</div>";
	            htmlToAdd += "</div></td></tr></table></div></div>";
	            swapDiv.innerHTML = htmlToAdd;
	        }
		    alertsToggle1.style.display = "block";
		}
		else
	    {
	        alertsToggle1.style.display = "none";
	    }
	}
function ClearNewUserForm()
{
	var formObjects = new Array(7);
	formObjects[0] = catchElement("emailid");
	formObjects[1] = catchElement("fname");
	formObjects[2] = catchElement("lname");
	formObjects[3] = catchElement("zip");
	formObjects[4] = catchElement("newpassword");
	formObjects[5] = catchElement("duppassword");
	formObjects[6] = catchElement("duplemail");
	
	for (var i = 0; i < formObjects.length; ++i)
	{
		formObjects[i].value = "";	
	}
	
	var gender = catchElement("gender");
	var birthmonth = catchElement("birthmonth");
	var birthday = catchElement("birthday");

	gender.value = "0";
	birthmonth.value = "0";
	birthday.value = "0";
	
}

//For Deals, save to client

function SaveToClient(listingCount)
{
	var saveDealElement = catchElement("savingDeal_" + listingCount);
	var saveDealForm = catchElement("dealForm");
	saveDealElement.value = "Y";
}

function setCookie(name, value, expires, path, domain, secure)
{
	document.cookie= name + "=" + value +
		((expires) ? "; expires=" + expires.toGMTString() : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
}

function getCookie(Name) {
        var search = Name + "=" 
        var CookieString = document.cookie 
        var result = null 
        if (CookieString.length > 0) { 
			offset = CookieString.indexOf(search) 
			if (offset != -1) { 
					offset += search.length 
					end = CookieString.indexOf(";", offset) 
					if (end == -1) {
						end = CookieString.length }
						result = CookieString.substring(offset, end)
                } 
        }
        return result; 
}



//FOR AKAMAI***********************

function ReplaceQS(url, name, value){
	var token = "?";
	var index1;
	var index2;			
	var fragment;
	
	index1 = url.indexOf("&" + name + "=");
	if(index1 == -1)
		index1 = url.indexOf("?" + name + "=");
	else
		token = "&";
				
	if(index1 == -1){
		//param not found
		token = (url.indexOf("?") == -1) ? "?" : "&";
		url = url + token + name + "=" + value;				
	}
	else{
		//param found								
		index2 = url.indexOf(token, index1+1);		
		if(index2 > -1)
			fragment = url.substr(index2);
		else
			fragment = "";		
		url = url.substring(0, index1) + token + name + "=" + value + fragment;
	}			
	return url
}

function StripQS(url, arrParam)
{
	var index1;
	var index2;
	var name;
	for (var i = 0; i < arrParam.length; ++i)
	{
		name = arrParam[i];
		index1 = url.indexOf("&" + name + "=");
		//alert(name + " 1: " + index1);
		if(index1 == -1)
		{
			index1 = url.indexOf("?" + name + "=");
		}
		
		if (index1 >= 0)
		{
			index2 = url.indexOf('?', index1 + 1);	
			//alert(name + " 2: " + index1);
			if (index2 == -1)
			{
				index2 = url.indexOf('&', index1 + 1);
				if (index2 == -1)
				{
					index2 = url.length;

				}
			}
			if (index2 >= 0)
			{
				//alert(url.substring(index1,index2));
				url = url.replace(url.substring(index1,index2), "");
			}
		}
	}
	return (url);
}

function UrlMinusQueryString(url)
{
	var index1 = url.indexOf("?");
	if (index1 >= 0)
	{
		return(url.substring(0, index1));
	}
	else
	{
		return(url);
	}
}

function IsFPLink(url)
{
	if (url.indexOf(".fp") >= 0)
	{
		return (true);
	}
	else
	{
		return (false);
	}
}


function WriteOutWeatherGlobalNavHTML(city, state, zip)
{
	
    document.write("<span class='topnav_shopping_city'>");   
	document.write(city + ", " + state);
    document.write("</span>");
    document.write("<span class='topnav_shopping_link'>");
    document.write("&nbsp;&nbsp;<br /><a href='javascript:void(null);' onclick='DrawWeatherBubbleChangeZoneForm()'>change location</a>");
    document.write("</span>");
    document.write("</div></td>"); 
    
    
    // please use the user's zip for the forecast link, unless the user does not have a zip code, then the city name is okay to use
    if((zip != null) && (zip != ""))
    {
        document.write("<td><div id='sl_weather_img'>");
        document.write("<a href='http://www.wunderground.com/cgi-bin/findweather/getForecast?query=" + zip + "' target='_new'>");
        document.write("<img src='http://banners.wunderground.com/banner/ban/wxBanner?bannertype=shoplocalV2_cond&zip=" + zip + "' class='topnav_weather_image' border='0'/>");
        document.write("</a>");
        document.write("</div></td></tr></table>");
    }
    else
    {
        document.write("</tr></table>");
    }
}

function WriteOutWeatherWidgetRightNavHTML(zip)
{
	//<div class="sl_weather_div">
	//<img src="http://banners.wunderground.com/banner/ban/wxBanner?bannertype=shoplocal_cond&zip=<%=weatherZip%>" class="sl_weather_image" onerror="FixMissingImage(this)">
	//<div class="sl_weather_link"><a href="http://www.wunderground.com/cgi-bin/findweather/getForecast?query=<%=weatherZip%>" target="_new">Current Weather</a></div>
	//</div>
	document.write("<div class='sl_weather_div'>");
	document.write("<img src='http://banners.wunderground.com/banner/ban/wxBanner?bannertype=shoplocalV2_cond&zip=" + zip + "' class='sl_weather_image' />");
	document.write("<div class='sl_weather_link'><a href='http://www.wunderground.com/cgi-bin/findweather/getForecast?query=" + zip + "' target='_new'>Current Weather</a></div>");
	document.write("</div>");
}

function WriteOutCityStateZipRightNav(city, state, zip)
{
	document.write(city + ", " + state + " " + zip);
}

function WriteOutSniffZoneSelect(currentRadius)
{
	var arrRadius = new Array(5, 10, 15, 20, 25, 30, 40, 50);
	for (var i = 0; i < arrRadius.length; ++i)
	{
		if (arrRadius[i] == currentRadius)
		{
			document.write("<option value='" + arrRadius[i] + "' selected >" + arrRadius[i] + " miles</option>");
		}
		else
		{
			document.write("<option value='" + arrRadius[i] + "'>" + arrRadius[i] + " miles</option>");
		}
	}
}

function DrawWeatherBubbleChangeZoneForm() {    
    var weatherbubblechangezone = $('weatherbubblechangezone');   
    weatherbubblechangezone.show();
    $('citystatezip').focus();       
}

function GetCityStateOrZipText()
{
    var city = gc("SLHCookie", "City", "", true);
    var state = gc("SLHCookie", "State", "", true);
    var zip = gc("SLHCookie", "ZipCode5", "", true);
    
    if ((city != "")&&(state != "")&&(zip != ""))
    {
        return (city + ", " + state + ", " + zip);   
    }
    else if (zip != "")
    {
        return (zip);
    }
    else if ((city != "")&&(state != ""))
    {
        return (city + ", " + state);
    }
    else
    {
        return ("");
    }
}

function CheckCityStateZipCookie()
	{
		if (gc("Prefs", "ctest", "", true) != "y")
		{
			setSubCookieWithVdir("Prefs","ctest","y");
			if (gc("Prefs", "ctest", "", true) == "y")
			{
				if ((gc("SLHCookie", "City", "", true) == "")&&(gc("SLHCookie", "ZipCode5", "", true) == ""))
				{
					location.href = "http://" + document.domain + "/new_user_entry.aspx?redirect=" + escape(location.href);
				}
			}
		}
	}
	
//For Pixel tracking

function _trim(str) 
	{
		if(str != null)
		{
			var x = str;
			x=x.replace(/^\s*(.*)/, "$1");
			x=x.replace(/(.*?)\s*$/, "$1");
			return x;
		}
		return "";
	}

	function GeneratePTQS()
	{				
		var cookievals = document.cookie.split(";");
		var subcookievals = "";
		var qs = "";
		for(var i=0; i<cookievals.length; i++)
		{
			var name = _trim(cookievals[i].split("=")[0]);
			var value = _trim(cookievals[i].split("=")[1]);
			if(	name.toLowerCase().indexOf("slhbanner") > -1 || 
				name.toLowerCase().indexOf("slhcookie") > -1 ||
				name.toLowerCase().indexOf("slhregcookie") > -1 ||
				name.toLowerCase().indexOf("slhtrackingsessionid") > -1 ||
				name.toLowerCase().indexOf("prefs") > -1)
			{
				if(cookievals[i].indexOf("&") > -1)	
				{	
				    var parentName = name.toLowerCase();
					var values = cookievals[i].split("=");
					var prefsFilter = "|adref|detid|matchtype|dimexpand|keywordsearched|wt.srch|DETID|SiteID|";
					values.shift();
					values = values.join("=").split("&");
					for(var x=0; x<values.length; x++)
					{
						name = _trim(values[x].split("=")[0]);
						value = _trim(values[x].split("=")[1]);
						if((name != "") && (parentName != "prefs" || (parentName == "prefs" && prefsFilter.indexOf("|" + name + "|") > -1)))
						{	
							qs += "&" + name + "=" + value;											
					    }
					}
				}	
				else
					qs += "&" + name + "=" + escape(cookievals[i].split("=")[1]);
			}
		}
		return qs;			
	}	
	
	function GetPageCounter()
	{
	    var pageCount = parseInt(gc("Prefs", "SLHPageCounter", "", true)) + 1;
	    setSubCookieWithVdir("Prefs","SLHPageCounter",pageCount.toString());
		return (pageCount.toString());
	}
	
	function GetVdir()
	{
		var url = String(document.location);
		if (url.indexOf(".fp") >= 0)
		{
			return ("");
		}
		var indexOfDomain = url.indexOf(document.domain + "/");
		if (indexOfDomain >= 0)
		{
			var indexOfStartVdir = url.indexOf("/", indexOfDomain);
			if (indexOfStartVdir >= 0)
			{
				if (indexOfStartVdir < url.length - 1)
				{
					var indexOfEndVdir = url.indexOf("/", indexOfStartVdir + 1);
					if (indexOfEndVdir >= 0)
					{
						return (url.substring(indexOfStartVdir + 1, indexOfEndVdir));
					}
				}
			}
		}
		return ("");
	}

	function GetKeywordSearched()
	{
		var referrer = document.referrer;
		var arrReferrers = new Array(new Array("google.com", "q"),
			new Array("search.msn.com", "q"),
			new Array("yahoo.com","p"),
			new Array("images.google.com", "q"),
			new Array("ask.com","q"),
			new Array("aolsearch.aol.com","query"),
			new Array("search.aol.com","query")
        );
        
		if ((referrer != null)&&(referrer != ""))
		{
			for (var i=0; i < arrReferrers.length; ++i)
			{
				var arrEachSearchEngine = arrReferrers[i];
				if (arrEachSearchEngine.length >= 2)
				{
					//alert("referrer length is greater than 2");
					if (referrer.indexOf(arrEachSearchEngine[0]) >= 0)
					{
						var parm = getUrlParameter(referrer, arrEachSearchEngine[1]);
						if (parm != "")
						{
							return ("&keywordsearched=" + parm);
						}
					}
				}
			}
		}
		return ("");
	}
	
	function AddDetIDToCookie()
	{
		var YAHOO_SEARCH = "http://search.yahoo.com";
		var MSN_SEARCH = "http://search.msn.com";
		var MSN_LIVE_SEARCH = "http://search.msn.com";
		var FROOGLE_SEARCH = "http://froogle.google.com";
		var GOOGLE_SEARCH = "http://www.google.com";  
		var YAHOO_SEARCH_DETID = "9922000000";
		var MSN_SEARCH_DETID = "9923000000";
		var MSN_LIVE_SEARCH_ID = "9923100000";
		var FROOGLE_SEARCH_DETID = "9924000000";
		var GOOGLE_SEARCH_DETID  = "9921000000";
		var OTHER_SOURCES = "9900000000"; 
		var DIRECT_DETID = "9940000000";
		
		var referrers = new Array(new Array(YAHOO_SEARCH, YAHOO_SEARCH_DETID),
			new Array(MSN_SEARCH, MSN_SEARCH_DETID),
			new Array(MSN_LIVE_SEARCH, MSN_LIVE_SEARCH_ID),
			new Array(FROOGLE_SEARCH,FROOGLE_SEARCH_DETID),
			new Array(GOOGLE_SEARCH, GOOGLE_SEARCH_DETID)
        );
        
        detid = gc("Prefs", "detid", "", true);
        if (detid == "")
		{
			//grab detid based on referrer
			detid = getDetId(referrers, DIRECT_DETID, OTHER_SOURCES);
			var prefs = getCookie("Prefs");
			if (prefs)
			{
				setSubCookieWithVdir("Prefs","detid",detid);
				
			}
			else
			{
			    setCookie("Prefs", "","",'/' + GetVdir());
			    setSubCookieWithVdir("Prefs", "detid", detid);
			}
		}
	}
	
	function getDetId(arrReferrers, directDetID, otherSourcesDetID)
	{
	    //first check QS
	    var detidFromURL = getUrlParameter(String(document.location).toLowerCase(), "detid");
	    if (detidFromURL != "")
	    {
	        return (detidFromURL);
	    }
	    
        var ref = document.referrer;
        
		if (ref && ref != "")
		{
		    var returnVal;
		    
			for (x = 0; x < arrReferrers.length; x++)
			{
				if (ref.indexOf(arrReferrers[x][0]) == 0)
				{
				    returnVal = arrReferrers[x][1];
				}
			}
		}	
		
		if(ref && returnVal == '')
		{		
            if(ref.indexOf("http://www.shoplocal.com", 0) == 0 || ref == '')
            {
                //direct traffic
                returnVal = directDetID;
            }
            else
            {            
                // from some source not in our list, not direct
                returnVal = otherSourcesDetID;
            }
        }
        
        return returnVal;
    }
		
	function getLocalMode()
	{
		if (getCookie("BroadreachLocalMode") == "N")
		{
			return ("ecommerce");
		}
		else
		{
			return ("local");
		}
	}
	
	//if viewstate=local in the QS, set the local cookie
	function setLocalCookie()
	{
		if ((getUrlParameter(document.location, "viewstate") == "local") && (getCookie("BroadreachLocalMode") != "Y") )
		{
			setCookie("BroadreachLocalMode", "Y","",'/' + '');
		}
		else if (getUrlParameter(document.location, "viewstate") == "ecommerce")
		{
			setCookie("BroadreachLocalMode", "N","",'/' + '');
		}
	}

//draw footer links
	function DrawCityShoppingLink(city, state, servername)
	{
	    if ((city == "")||(city == null))
	    {
	        city = "Chicago";
	        state = "IL";
	    }
		document.write("<a href='http://" + servername + "/st_" + state.toLowerCase() + "_c_" + city.toLowerCase().replace(' ','+') + ".fp' title='Find Sales in a City Near You' name='gnav_shoplist_link' class='footer_top_links'>" + city + " Shopping</a>");
	}
	
function AddViewStateToQS(url)
{
	if (url.indexOf(".fp") >= 0)
	{
		if (url.indexOf("?") >= 0)
		{
			url += "&viewstate=local";
		}
		else
		{
			url += "?viewstate=local";
		}
	}
	else
	{
		if (url.indexOf("?") >= 0)
		{
			url += "&viewstate=local";
		}
		else
		{
			url += "?viewstate=local";
		}
	}
	return (url);
}
	
function DrawUrl (hrefUrl, text)
{
	if (getLocalMode() == "local")
	{
		document.write("<a href='" + hrefUrl + "' onclick='this.href = AddViewStateToQS(this.href);'>" + text + "</a>");	
	}
	else
	{
		document.write("<a href='" + hrefUrl + "'>" + text + "</a>");	
	}
}

function DrawUrlWithImage (hrefUrl, imageSource, imageWidth, imageClass, imageAlign, text)
{
	document.write("<a href='" + hrefUrl + "'><img src='" + imageSource + "' width='" + imageWidth + "' border='0' class='" + imageClass + "' align='" + imageAlign + "'/>" + text + "</a>");		
}

/********Search Box***********************/

function ValidateSearchBox(inputSearchTermValue)
{
    if (inputSearchTermValue == "") {     //is it blank?		
			
		alert("Please enter a term in the search box.");
		return (false);
	}
	else{
		return (true);
	}		
}

function ValidateBlackFridaySearchBox(inputSearchTermValue, inputStoreValue)
{
    if ((inputSearchTermValue == "") && (inputStoreValue == "0")) {     //is it blank?		
			
		alert("Please enter a term in the search box.");
		return (false);
	}
	else{
		return (true);
	}		
}

function ChangeShoppingZone(citystatezip, domain, redirectForChangeShoppingZone)
{
    window.location = domain + "default.aspx"
                          + "?action=changeshoppingzone&postback=true&changeloc=page"
                          + "&citystatezip=" + citystatezip
                          + "&redirect=" + redirectForChangeShoppingZone;
}

function Search(usenational) 
{
alert("test");
        // Get search property and term values from form elements
        var property    = "ALL";
        if ((usenational != null)&&(usenational == "False"))
        {
			property = "COBRAND";
        }
		
        var terms       = encodeURIComponent(document.search_terms_form.searchterms.value);
        var mode        = "matchallpartial";
        var url			= "default.aspx?action=searchbroadreach";
        var N			= "0";
        //var searchwithin= document.search_terms_form.searchwithin.value;

		// Create new url with property search and dimension search
		var removeterms = ["N","viewstate","clickarea","searchwithin", "productdatasourcekey", "title", "ref", "Ne","No","Ns", "DimExpand", "CityStateZip", "postback", "sniff","redirect", "inventoryid", "listingid", "adid", "adretailerid", "contentretailerid", "pretailerid","Nao","Ntk","Ntt","D","Nty","Ntx","Dx","in_dym","in_dim_search","action", "search"];
		
		
			//var addterms = ["Ntk="+property,"Ntt="+terms,"Nty=1","D="+terms,"Ntx=mode+"+mode,"Dx=mode+"+mode, "N="+N];
			//var addterms = ["searchtext="+terms, "N="+N];
		
		var addterms = ["searchtext="+terms, "N="+N];
		
		var newurl = ConstructURL("CURRENTURL", removeterms, addterms);
		location.href  = url+newurl;
}

function SearchByFilter( isnational, searchterm, filter, usenational, domain ) {
  var action = "";
  var searchtype = "";
  var url = "";
  
  if ( filter == "1" ) {
    action = "browsedealssearch";
    url = "default.aspx?action=" + action + "&searchtext=" + escape(searchterm);
  }
  else if ( filter == "2" ){
    action = "browsedealssearch";
    searchtype = "2";
    url = "default.aspx?action=" + action + "&searchtext=" + escape(searchterm);
  } 
  else if ( ( getLocalMode() == "local" ) || ( !usenational ) ) {
    action = "searchbroadreach";
    url = "searchlocal.aspx?searchtext=" + escape(searchterm);
  } 
  else {
    action = "searchonline";
    url = "searchonline.aspx?searchtext=" + escape(searchterm);
  }
  if (searchtype != "")
  {
    url += "&searchtype=" + searchtype;
  }

  if (domain=="" || domain==null)
  {
    location.href = url;
  }
  else
  {
    if (domain!=null && domain.endsWith("/"))
    {
        location.href = domain + url;
    }
    else
    {
        location.href = domain + "/" + url;
    }
  }
} 

function SearchSales(searchterm) 
{
    if(ValidateSearchBox(searchterm))
    {
        var url = "searchlocal.aspx?searchtext=" + escape(searchterm) + "&instore=y";
        window.location = url;
    }
} 

function NullSearch(searchterm,url) 
{      
    if(ValidateSearchBox(searchterm))
    {                     
  
        if (getLocalMode() == "local")
        {
            window.location = "searchlocal.aspx?searchtext=" + escape(searchterm);
        }
        else
        {
            window.location = "searchonline.aspx?searchtext=" + escape(searchterm);
        }             
    }
} 

function SearchStores(searchterm) 
{
    if(ValidateSearchBox(searchterm))
    {
        var url = "searchstores.aspx?storesearchtext=" + escape(searchterm);
        window.location = url;
    }
} 

function SearchDealsByStore(searchterm, dimensionnodeid) {
    var url;
    if(searchterm != "")
    {
        // do a search with the text entered
        url = "default.aspx?action=browsedealssearch&searchtype=2&searchtext=" + escape(searchterm);
        if(dimensionnodeid != 0)
        {
            // optional store filter
            url += "&N=" + dimensionnodeid;
        }
    }
    else
    {
        // browse by store
        url = "default.aspx?action=browsedealscategoryl2&searchtype=2&N=" + dimensionnodeid;
    }
    location.href = url;
} 

function SearchNoFilter(isnational, searchterm, usenational) 
{		
    var property    = "ALL";
    var addterms;
    if ((isnational != null)&&(isnational == "False"))
    {
		property = "COBRAND";
    }
    var terms       = encodeURIComponent(searchterm);
    var mode        = "matchallpartial";
    if ((getLocalMode() == "local")||(!usenational))
	{
		var url = "default.aspx?action=searchbroadreach";
	}
	else
	{
	    var url = "default.aspx?action=searchonline";
	}
    var N = "0";

	// Create new url with property search and dimension search
	var removeterms = ["searchtext","N","viewstate","clickarea","searchwithin","dimensiontext", "productdatasourcekey", "title", "ref", "Ne","No","Ns", "DimExpand", "CityStateZip", "postback", "sniff","redirect", "inventoryid", "listingid", "adid", "adretailerid", "contentretailerid", "pretailerid","Nao","Ntk","Ntt","D","Nty","Ntx","Dx","in_dym","in_dim_search","action", "search","searchtype", "p", "sf", "befid","pgnum","sb"];
	var addterms = ["searchtext="+terms];
	
	var newurl = ConstructURL("CURRENTURL", removeterms, addterms);
	location.href  = url+newurl;
}

function ReSortSDCStoreOffers(inputPid, inputSortSelect)
{
    var url = "detailonline.aspx?spid=" + inputPid + "&" + inputSortSelect;
    location.href = url;
}

function CheckArray(removeterms,checkterm) {

	for (var i=0; i<removeterms.length; i++) {

		if (removeterms[i] == checkterm)

			return 1;

	}

	return -1;

}

function ConstructURL(url,removeterms,addterms) {
	var params = BuildURLArray(url);
	var newurl = "";
	for (var i=0; i<params.length; i++) {
		val = CheckArray(removeterms,params[i][0]);
		if (val == -1)
			newurl = newurl + "&" + params[i][0] + "=" + params[i][1];
	}
	for (var i=0; i<addterms.length; i++) {
		newurl = newurl + "&" + addterms[i];
	}
	if (newurl.length > 0) {
		newurl = newurl.substr(1);
		newurl = "&"+newurl;
	}
	else {
		newurl = "&N="+eneroot;
	}
	return newurl;
}

function BuildURLArray(oldurl) {
	var returnArray = new Array();
	var url;
	if (oldurl == "CURRENTURL")
		url = location.search;
	else if (oldurl == "BLANKURL") {
	}
	else {
		var tokens = oldurl.split("?");
		url = "&"+tokens[1];
	}		
	if (url) {
		url = url.substr(1);
		var params = url.split("&");
		for (var i=0; i<params.length; i++) {
			var param = params[i].split("=");
			returnArray[i] = param;
		}
	}
	return returnArray;
}

function GetValue(url, term) {
	var params = BuildURLArray(url);
	for (var i=0; i<params.length; i++) {
		if (params[i][0] == term) {
			return params[i][1];
		}
	}
	return -1;
}
/*****End of Search Box*******************/

function GetSiteGroup(siteid)
{
    var siteGroup = gc("MarketGroup" + siteid, "Name", "shoplocal", true);
    var sitesArray = new Array("Media News Group", "Forum Communications", "Schurz Communications", "Ogden Newspapers",
                "Brian P. Tierney", "Sound Publishing", "HM Capital Partners");
    for (var i = 0; i < sitesArray.length; ++i)
    {
        if (siteGroup == sitesArray[i])
        {
            return ("shoplocal");
        }
    }
    return (siteGroup);
}

function GetAdvertiserTagInfo(sitegroup, siteid)
{
    var advertiserTagInfo = unescape(gc("MarketGroup" + siteid, "ATI", "shoplocal", true));
    if (sitegroup == "Gannett")
    {
        advertiserTagInfo = advertiserTagInfo.replace("http://", "");
        advertiserTagInfo = advertiserTagInfo.replace("RealMedia/ads/adstream_jx.ads/", "");
        advertiserTagInfo = advertiserTagInfo.replace("/index.html/","");
        var returnString = "/AAMGNRC1=" + advertiserTagInfo.substr(0,advertiserTagInfo.indexOf("/"));
        returnString += "/AAMGNRC2=" + advertiserTagInfo.substr(advertiserTagInfo.indexOf("/")+1, advertiserTagInfo.length -  advertiserTagInfo.indexOf("/")+1);	
        return (returnString);
    }
    else
    {
        return ("/AAMGNRC1=/AAMGNRC2=" + advertiserTagInfo);
    }
}

function StringToFriendlyName(theString, allowableSpecialCharacter)
{
    theString = theString.replace(/\s-\s/g, allowableSpecialCharacter);
    theString = theString.replace(/&/g, allowableSpecialCharacter);
    theString = theString.replace(/\s/g, allowableSpecialCharacter);
    theString = theString.replace(/-/g, allowableSpecialCharacter);
    theString = theString.replace(/\s&\s/g, allowableSpecialCharacter);
    theRegEx = new RegExp("[^" + allowableSpecialCharacter + "A-Za-z0-9]", "g");
    theString = theString.replace(theRegEx, "", "g");
    theString = theString.toLowerCase();
    return (theString);
}

function GetBannerAdString(action, siteid, size, cat, searchText)
{
    return GetBannerAdStringWithSiteGroup(action, siteid, size, cat, searchText, GetSiteGroup(siteid))
}

function GetBannerAdStringWithSiteGroup(action, siteid, size, cat, searchText, siteGroup)
{   
    var targetString = GetAdvertiserTagInfo(siteGroup, siteid);
    targetString += "/area=" + action;
    targetString += "/generic=" + gc("MarketGroup" + siteid, "VD", "shoplocal", true);
    targetString += "/size=" + size;
    targetString += "/AAMSZ=" + size;
    targetString += "/sitegroup=" + siteGroup;
    targetString += "/cat=" + cat;
    targetString += "/keyword=" + searchText;
    targetString += "/AAMGNRC4=" + searchText;
    targetString += "/site=" + gc("MarketGroup" + siteid, "VD", "shoplocal", true);
    targetString += "/pretailer=";
    targetString += "/zip=" + gc("SLHCookie", "ZipCode5", "60601", true);
    targetString += "/AAMGNRC7=" + gc("SLHCookie", "ZipCode5", "60601", true);
    targetString += "/dma=" + StringToFriendlyName(unescape(gc("SLHCookie", "DMAName", "chicago_il", true)), "_");
    targetString += "/AAMGNRC6=" + StringToFriendlyName(unescape(gc("SLHCookie", "DMAName", "chicago_il", true)), "_");
    targetString += "/?>";
    return (targetString);   
}

function WriteOutIframeAdTagSkyScraper(adserver, random, action, siteid, cat, searchtext)
{
    document.write("<iframe src='" + adserver + GetBannerAdString(action,siteid,'SKYSCRAPER',cat,searchtext) + "/pageid=" + random + "' height=650 width=170 frameborder='0' marginheight='0' marginwidth='0' scrolling='no'></iframe>");

}


function CheckMyAccountStatus(currentHref,imagePath,overrideURL,currentSite)
{

    var isLoggedIn = getCookie("Eaps");         
       
    if (isLoggedIn ==null || isLoggedIn =='')
        {                    
	        var redirectStart = window.location.href.indexOf("action=") + 7 ;                 
            var redirect = window.location.href.substring(redirectStart);                                         
            
            currentHref.innerHTML="<img src=\"" + imagePath + "broadreach2/images/shoplocal2007/loginorregisterbang.gif\" 			border=\"0\" /><span class='AddToMyListLogin'><span class='AddToMyListBlue'>Log in</span><span class='AddToMyListBlueoff'> or 			</span><span class='AddToMyListBlue'>Register</span><span class='AddToMyListBlueoff'> first!</span></span>";                
	        var path="";
	        
	        if (redirectStart ==0)
	        {
	            redirectStart = location.host + "/";
	        }
	        
	        if (overrideURL ==null)
	          {
	                if (currentSite=='/')
	                {
	                    currentHref.href="/default.aspx?action=myaccountlogin&redir=" + escape(redirect);     				
	                }
	                else
	                {
	                    currentHref.href="http://www.shoplocal.com/default.aspx?action=myaccountlogin&redir=" + escape(redirect);     				
	                }
	            	
	          }
	          else
	          {
		        redirectStart= overrideURL.indexOf("action=") + 7; 
		        redirect =overrideURL.substring(redirectStart);
		        
		        if (currentSite=='/')
		        {
		            currentHref.href="/default.aspx?action=myaccountlogin&redir=" + escape(redirect );
		        }
		        else
		        {
		            currentHref.href="http://www.shoplocal.com/default.aspx?action=myaccountlogin&redir=" + escape(redirect );
		        }
    	        
	          }
	         currentHref.OnClick="";	        
	         return false;
        }
        else{
            currentHref.style.cursor = 'wait';
              return true;    
        }	          
}
     

function ProcessMyListAddResult(result,currentHref,imagePath,currentSite)
{

    if(result.indexOf("True") > -1)
    {	 
	       currentHref.OnClick="";	
	       currentHref.innerHTML="";           
           currentHref.innerHTML="<img src=\"" + imagePath + "broadreach2/images/shoplocal2007/savedtomylistcheck.gif\" border=\"0\" /><span class='AddToMyListBlueoff'>Saved to </span><span class='AddtoMyListGrey'>MyList</span>";
    	   
    	   if (currentSite=='/')
    	   {
    	        currentHref.href="/default.aspx?action=MyList"; 
    	   }else
    	   {
    	       currentHref.href="http://www.shoplocal.com/default.aspx?action=MyList"; 
    	   }
    }			      
     currentHref.style.cursor = 'pointer';
     return false;
}

function ShowEmailLogin(whichHref)
{
    if (whichHref.href.indexOf("action=myaccountlogin") > -1)
    {		
	    return true;
    } 
}

function CheckMyAccountStatus2(currentHref,imagePath,overrideURL)
{
    var isLoggedIn = getCookie("Eaps");  
   
    if (!isLoggedIn || isLoggedIn==null)
        {               
	        var redirectStart = window.location.href.indexOf("action=") + 7 ;                 
            var redirect = window.location.href.substring(redirectStart);                                         
            var path="";
            
            
            currentHref.innerHTML="<img src=\"" + imagePath + "broadreach2/images/shoplocal2007/loginorregisterbang.gif\" 			border=\"0\" /><span class='AddToMyListLogin'><span class='AddToMyListBlue'>Log in</span><span class='AddToMyListBlueoff'> or 			</span><span class='AddToMyListBlue'>Register</span><span class='AddToMyListBlueoff'> first!</span></span>";                	         	         
	        if (overrideURL ==null)
	        {	      
	            redirectStart= redirect.indexOf("action="); 

	            if (redirectStart ==-1)
	            {	            
	                redirectStart = location.host.length+1;	                
	            }else
	            {
	                redirectStart +=7;
	            }
	            	            	            
		        redirect =redirect.substring(redirectStart);
	          	currentHref.href="/default.aspx?action=myaccountlogin&redir=" + escape(redirect);     	
	         	
	        }
	        else
	        {	    
		        redirectStart= overrideURL.indexOf("action=") + 7; 

	            if (redirectStart.length ==0)
	            {
	                redirectStart = location.host + "/";
	            }
	            
		        redirect =overrideURL.substring(redirectStart);
    	        currentHref.href="/default.aspx?action=myaccountlogin&redir=" + escape(redirect );
	        }
	        
	        currentHref.OnClick="";	        
	        return false;
        }
        else{
            currentHref.style.cursor = 'wait';
            return true;    
        }	          
}
     
function ExpandAllRefinements(groupName, currentMoreLink)
{
    var expandableDivArray = $('slRefinements').getElementsBySelector('[expandedGroup="' + groupName + '"]');
    var originalDivArray = $('slRefinements').getElementsBySelector('[originalGroup="' + groupName + '"]');
    if ((expandableDivArray.size() >= 1)&&(originalDivArray.size() >= 1))
    {
        expandableDivArray[0].setStyle({display: 'block'});
        originalDivArray[0].setStyle({display: 'none'});
        currentMoreLink.setStyle({display: 'none'});
    }
}

/*Web Trends Tracking Code*/

var gService = true;
var gTimeZone = -6;
// Code section for Enable First-Party Cookie Tracking
function dcsCookie(){
	if (typeof(dcsOther)=="function"){
		dcsOther();
	}
	else if (typeof(dcsPlugin)=="function"){
		dcsPlugin();
	}
	else if (typeof(dcsFPC)=="function"){
		dcsFPC(gTimeZone);
	}
}
function dcsGetCookie(name){
	var pos=document.cookie.indexOf(name+"=");
	if (pos!=-1){
		var start=pos+name.length+1;
		var end=document.cookie.indexOf(";",start);
		if (end==-1){
			end=document.cookie.length;
		}
		return unescape(document.cookie.substring(start,end));
	}
	return null;
}
function dcsGetCrumb(name,crumb){
	var aCookie=dcsGetCookie(name).split(":");
	for (var i=0;i<aCookie.length;i++){
		var aCrumb=aCookie[i].split("=");
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
function dcsGetIdCrumb(name,crumb){
	var cookie=dcsGetCookie(name);
	var id=cookie.substring(0,cookie.indexOf(":lv="));
	var aCrumb=id.split("=");
	for (var i=0;i<aCrumb.length;i++){
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
function dcsFPC(offset){
	if (typeof(offset)=="undefined"){
		return;
	}
	var name=gFpc;
	var dCur=new Date();
	dCur.setTime(dCur.getTime()+(dCur.getTimezoneOffset()*60000)+(offset*3600000));
	var dExp=new Date(dCur.getTime()+315360000000);
	var dSes=new Date(dCur.getTime());
	if (document.cookie.indexOf(name+"=")!=-1){
		var id=dcsGetIdCrumb(name,"id");
		var lv=parseInt(dcsGetCrumb(name,"lv"));
		var ss=parseInt(dcsGetCrumb(name,"ss"));
		if ((id==null)||(id=="null")||isNaN(lv)||isNaN(ss)){
			return;
		}
		WT.co_f=id;
		var dLst=new Date(lv);
		dSes.setTime(ss);
		if ((dCur.getTime()>(dLst.getTime()+1800000))||(dCur.getTime()>(dSes.getTime()+28800000))){
			dSes.setTime(dCur.getTime());
			WT.vt_f_s="1";
		}
		if ((dCur.getDay()!=dLst.getDay())||(dCur.getMonth()!=dLst.getMonth())||(dCur.getYear()!=dLst.getYear())){
			WT.vt_f_d="1";
		}
	}
	else{
		var tmpname=name+"_TMP=";
		document.cookie=tmpname+"1";
		if (document.cookie.indexOf(tmpname)!=-1){
			document.cookie=tmpname+"; expires=Thu, 01-Jan-1970 00:00:01 GMT";
			if ((typeof(gWtId)!="undefined")&&(gWtId!="")){
				WT.co_f=gWtId;
			}
			else if ((typeof(gTempWtId)!="undefined")&&(gTempWtId!="")){
				WT.co_f=gTempWtId;
				//WT.vt_f="1";
			}
			else{
				WT.co_f="2";
				var cur=dCur.getTime().toString();
				for (var i=2;i<=(32-cur.length);i++){
					WT.co_f+=Math.floor(Math.random()*16.0).toString(16);
				}
				WT.co_f+=cur;
				//WT.vt_f="1";
			}
			if (typeof(gWtAccountRollup)=="undefined"){
				WT.vt_f_a="1";
			}
			WT.vt_f="1";
			WT.vt_f_s="1";
			WT.vt_f_d="1";
		}
		else{
			WT.vt_f="2";
			WT.vt_f_a="2";
			return;
		}
	}
	WT.co_f=escape(WT.co_f);
	WT.vt_sid=WT.co_f+"."+dSes.getTime();
	var expiry="; expires="+dExp.toGMTString();
	document.cookie=name+"="+"id="+WT.co_f+":lv="+dCur.getTime().toString()+":ss="+dSes.getTime().toString()+expiry+"; path=/"+(((typeof(gFpcDom)!="undefined")&&(gFpcDom!=""))?("; domain="+gFpcDom):(""));
}

// Code section for Use the new first-party cookie generated with this tag.
var gFpc="WT_FPC";
var gWtId="";
var gTempWtId="";
var gConvert=true;

function dcsAdv(){
	dcsFunc("dcsET");
	dcsFunc("dcsCookie");
	dcsFunc("dcsAdSearch");
}

var gImages=new Array;
var gIndex=0;
var DCS=new Object();
var WT=new Object();
var DCSext=new Object();
var gQP=new Array();

var gDomain="statse.webtrendslive.com";
var gDcsId=dcid;

if ((typeof(gConvert)!="undefined")&&gConvert&&(document.cookie.indexOf(gFpc+"=")==-1)){
	document.write("<SCR"+"IPT Language='JavaScript' SRC='"+"http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+"/"+gDcsId+"/wtid.js"+"'></SCR"+"IPT>");
}

function dcsVar(){
	var dCurrent=new Date();
	WT.tz=dCurrent.getTimezoneOffset()/60*-1;
	if (WT.tz==0){
		WT.tz="0";
	}
	WT.bh=dCurrent.getHours();
	WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
	if (typeof(screen)=="object"){
		WT.cd=navigator.appName=="Netscape"?screen.pixelDepth:screen.colorDepth;
		WT.sr=screen.width+"x"+screen.height;
	}
	if (typeof(navigator.javaEnabled())=="boolean"){
		WT.jo=navigator.javaEnabled()?"Yes":"No";
	}
	if (document.title){
		WT.ti=document.title;
	}
	WT.js="Yes";
	if (typeof(gVersion)!="undefined"){
		WT.jv=gVersion;
	}
	if (document.body&&document.body.addBehavior){
		document.body.addBehavior("#default#clientCaps");
		if (document.body.connectionType){
			WT.ct=document.body.connectionType;
		}
		document.body.addBehavior("#default#homePage");
		WT.hp=document.body.isHomePage(location.href)?"1":"0";
	}
	if (parseInt(navigator.appVersion)>3){
		if ((navigator.appName=="Microsoft Internet Explorer")&&document.body){
			WT.bs=document.body.offsetWidth+"x"+document.body.offsetHeight;
		}
		else if (navigator.appName=="Netscape"){
			WT.bs=window.innerWidth+"x"+window.innerHeight;
		}
	}
	WT.fi="No";
	if (window.ActiveXObject){
		if ((typeof(gFV)!="undefined")&&(gFV.length>0)){
			WT.fi="Yes";
			WT.fv=gFV;
		}
	}
	else if (navigator.plugins&&navigator.plugins.length){
		for (var i=0;i<navigator.plugins.length;i++){
			if (navigator.plugins[i].name.indexOf('Shockwave Flash')!=-1){
				WT.fi="Yes";
				WT.fv=navigator.plugins[i].description.split(" ")[2];
				break;
			}
		}
	}
	WT.sp="@@SPLITVALUE@@";
	DCS.dcsdat=dCurrent.getTime();
	DCS.dcssip=window.location.hostname;
	DCS.dcsuri=window.location.pathname;
	if (window.location.search){
		DCS.dcsqry=window.location.search;
		if (gQP.length>0){
			for (var i=0;i<gQP.length;i++){
				var pos=DCS.dcsqry.indexOf(gQP[i]);
				if (pos!=-1){
					var front=DCS.dcsqry.substring(0,pos);
					var end=DCS.dcsqry.substring(pos+gQP[i].length,DCS.dcsqry.length);
					DCS.dcsqry=front+end;
				}
			}
		}
	}
	if ((window.document.referrer!="")&&(window.document.referrer!="-")){
		if (!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4)){
			DCS.dcsref=window.document.referrer;
		}
	}
}

function A(N,V){
	return "&"+N+"="+dcsEscape(V);
}

function dcsEscape(S){
	if (typeof(RE)!="undefined"){
		var retStr = new String(S);
		for (R in RE){
			retStr = retStr.replace(RE[R],R);
		}
		return retStr;
	}
	else{
		return escape(S);
	}
}

function dcsLoadHref(evt){
	if ((typeof(gHref)!="undefined")&&(gHref.length>0)){
		window.location=gHref;
		gHref="";
	}
}

function dcsCreateImage(dcsSrc){
	if (document.images){
		gImages[gIndex]=new Image;
		if ((typeof(gHref)!="undefined")&&(gHref.length>0)){
			gImages[gIndex].onload=gImages[gIndex].onerror=dcsLoadHref;
		}
		gImages[gIndex].src=dcsSrc;
		gIndex++;
	}
	else{
		document.write('<IMG BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+dcsSrc+'">');
	}
}

function dcsMeta(){
	var elems;
	if (document.all){
		elems=document.all.tags("meta");
	}
	else if (document.documentElement){
		elems=document.getElementsByTagName("meta");
	}
	if (typeof(elems)!="undefined"){
		for (var i=1;i<=elems.length;i++){
			var meta=elems.item(i-1);
			if (meta.name){
				if (meta.name.indexOf('WT.')==0){
					if(!WT[meta.name.substring(3)])
						WT[meta.name.substring(3)]=meta.content;
				}
				else if (meta.name.indexOf('DCSext.')==0){
					DCSext[meta.name.substring(7)]=meta.content;
				}
				else if (meta.name.indexOf('DCS.')==0){
					DCS[meta.name.substring(4)]=meta.content;
				}
			}
		}
	}
}

function dcsTag(){
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+(gDcsId==""?'':'/'+gDcsId)+"/dcs.gif?";
	for (N in DCS){
		if (DCS[N]) {
			P+=A(N,DCS[N]);
		}
	}
	for (N in WT){
		if (WT[N]) {
			P+=A("WT."+N,WT[N]);
		}
	}
	for (N in DCSext){
		if (DCSext[N]) {
			P+=A(N,DCSext[N]);
		}
	}
	if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
		P=P.substring(0,2040)+"&WT.tu=1";
	}
	dcsCreateImage(P);
}

function dcsFunc(func){
	if (typeof(window[func])=="function"){
		window[func]();
	}
}


function dcsMultiTrack(){
	for (var i=0;i<arguments.length;i++){
		if (arguments[i].indexOf('WT.')==0){
			WT[arguments[i].substring(3)]=arguments[i+1];
			i++;
		}
		if (arguments[i].indexOf('DCS.')==0){
			DCS[arguments[i].substring(4)]=arguments[i+1];
			i++;
		}
		if (arguments[i].indexOf('DCSext.')==0){
			DCSext[arguments[i].substring(7)]=arguments[i+1];
			i++;
		}
	}
	var dCurrent=new Date();
	DCS.dcsdat=dCurrent.getTime();
	dcsTag();
}

var date3 = new Date();
function StartWebTrendsTracking()
{
    dcsVar();
    dcsMeta();
    dcsFunc("dcsAdv");
    dcsTag();
}

/***********OnlineOpinion**********/

var custom_var,_sp='%3A\\/\\/',_rp='%3A//',_poE=0.0, _poX=0.0,_sH=screen.height,_d=document,_w=window,_ht=escape(_w.location.href),_hr=_d.referrer,_tm=(new Date()).getTime(),_kp=0,_sW=screen.width;_d.onkeypress=_fK;
function _fK(_e)
{
if(!_e)_e=_w.event;
var _k=(typeof _e.which=='number')?_e.which:_e.keyCode;
if((_kp==15&&_k==12))_w.open('https://secure.opinionlab.com/pageviewer/pv_controlboard.html?url='+_fC(_ht),'PageViewer','height=529,width=705,screenX='+((_sW-705)/2)+',screenY='+((_sH-529)/2)+',top='+((_sH-529)/2)+',left='+((_sW-705)/2)+',status=yes,toolbar=no,menubar=no,location=no,resizable=yes');_kp=_k};
function _fC(_u)
{
_aT=_sp+',\\/,\\.,-,_,'+_rp+',%2F,%2E,%2D,%5F';_aA=_aT.split(',');
for(i=0;i<5;i++)
{
eval('_u=_u.replace(/'+_aA[i]+'/g,_aA[i+5])')
}
return _u
};

function O_LC()
{
_w.open('http://ccc01.opinionlab.com/comment_card.asp?time1='+_tm+'&time2='+(new Date()).getTime()+'&prev='+_fC(escape(_hr))+'&referer='+_fC(_ht)+'&height='+_sH+'&width='+_sW+'&custom_var='+custom_var,'comments','width=535,height=192,screenX='+((_sW-535)/2)+',screenY='+((_sH-192)/2)+',top='+((_sH-192)/2)+',left='+((_sW-535)/2)+',resizable=yes,copyhistory=yes,scrollbars=no')
};

function _fPe()
{
	if(Math.random()>=1.0-_poE)
	{
	O_LC();_poX=0.0
	}
};

function _fPx()
{
	if(Math.random()>=1.0-_poX)O_LC()
};

window.onunload=_fPx;

function O_GoT(_p)
{
	_d.write('<a href=\'javascript:O_LC()\'>'+_p+'</a>');
	_fPe()
}

function redirectForSortWithRemoval(newSortValue, sortParameter, currentSortExp, optionalRemoveRegex)
{
    var currentUrl = document.URL;    
    var removeRegex = new RegExp(optionalRemoveRegex);
    currentUrl = currentUrl.replace(removeRegex, "");   
    doRedirectForSort(currentUrl, newSortValue, sortParameter, currentSortExp);
}

function redirectForSort(newSortValue, sortParameter, currentSortExp)
{
  doRedirectForSort(document.URL, newSortValue, sortParameter, currentSortExp);
}

function doRedirectForSort(currentUrl, newSortValue, sortParameter, currentSortExp)
{
    var currentSortRegex = new RegExp("[\\?&]" + sortParameter + "=([^&]+)");
    if(newSortValue == "")
    {
        // remove sort
        currentUrl = currentUrl.replace(currentSortRegex, "");
    }
    else if(currentUrl.indexOf(sortParameter + "=") > -1)
    {
        // replace current sort
        var match = currentUrl.match(currentSortRegex);
        
        if(match[0].indexOf("?") > -1)
        {   
            currentUrl = currentUrl.replace(currentSortRegex, "?" + sortParameter + "=" + newSortValue);
        }
        else
        {
            currentUrl = currentUrl.replace(currentSortRegex, "&" + sortParameter + "=" + newSortValue);
        }
    }
    else
    {
        // add sort
        if(currentUrl.indexOf("?") > -1)
        {
            // already a query, use &
            currentUrl += "&" + sortParameter + "=" + newSortValue;
        }
        else
        {
            // new query
            currentUrl += "?" + sortParameter + "=" + newSortValue;
        }
    }
    window.location.replace(currentUrl);
}

/*************************** START QUICK EMAIL SIGNUP STUFF **********************************/

function processQuickEmailSignup(clientPref, slhuid, siteid, detid, referrer, pagetype, email, button) {   
    $('invalidEmailDisplay').hide();

    if(ValidateEmailWithCallBack(email, function(){ showQuickEmailMessage(false,"invalidEmailDisplay"); })) {
        button.disabled = true;
    
        new Ajax.Request("EmailSignup.ashx?email=" + email + "&pref=" + clientPref, 
                         { method: 'get', 
                           onSuccess: function(transport){ showQuickEmailMessage(true,
                                                                                 "successDisplay",
                                                                                 slhuid,
                                                                                 siteid,
                                                                                 detid,
                                                                                 referrer,
                                                                                 pagetype,
                                                                                 clientPref); }});
    }
}

function showQuickEmailMessage(success,divId, slhuid,siteid,detid,referrer,pagetype,clientPref) {
    var displayDiv = $(divId);
    
    Element.clonePosition(displayDiv, 
                          $("emailad"), 
                          { setWidth: false,
                            setHeight: false,
                            offsetTop: -20 });
    
    if (success)
    {
        var img = new Image();    
        img.src = 'http://pt.crossmediaservices.com/pt/default.aspx?action=quickemailsignup&slhlogon=' + slhuid +
                  '&SiteID=' + siteid + '&detid=' + detid + '&referrer=' + referrer +
                  '&clientPref=' + clientPref + '&pagetype=' + pagetype                         
    }
    
    displayDiv.show();                    
}

function handleEmailEntryKeyPress( e ) {
    if ( e.keyCode == Event.KEY_RETURN ) {
        $( 'quickEmailSignupButton' ).click();
        e.stop();
    }
}

/***************************** END QUICK EMAIL SIGNUP STUFF **********************************/


/***************************** START SALES SEARCH BOX STUFF **********************************/
function handleSearchSalesEntryKeyPress( e ) {
    if ( e.keyCode == Event.KEY_RETURN ) {
        SearchSales($F('searchtext'));
        e.stop();
    }
}

function handleNullEntryKeyPress( e ) {
    if ( e.keyCode == Event.KEY_RETURN ) {
        NullSearch($F('searchtext'));
        e.stop();
    }
}

/***************************** END SALES SEARCH BOX STUFF **********************************/

function handleSearchStoresEntryKeyPress( e ) {
    if ( e.keyCode == Event.KEY_RETURN ) {
        SearchStores($F('storesearchtext'));
        e.stop();
    }
}

/***************************** START ADD TO MY LIST STUFF **********************************/

function addItemToMyList(urlParams, addItem,linkDiv, addedDiv, loginDiv){

    var url = '/AddToMyList.ashx?' + urlParams;   

    //only submit the request if the user is logged in
    if (addItem !='True')
    {
        linkDiv.hide();
        addedDiv.hide();
        loginDiv.show();
    }
    else
    {       
        new Ajax.Request(url, { method: 'get',
                                onSuccess: function(transport) {
                                               linkDiv.hide();
                                               loginDiv.hide()
                                               addedDiv.show();                                           
                                           }});
    }                                       
}

/***************************** END ADD TO MY LIST STUFF **********************************/

function closeChangeLocation()
{      
  var weatherbubblechangezone = $( 'weatherbubblechangezone' );   
    weatherbubblechangezone.style.display = 'none';       
}

function CheckDrivingDirectionInputs()
{   
    var isValid=true;
                                                             
    if (document.getElementById("startingAddress").value =='')
    {
        document.getElementById("addressDiv").style.display="inline";  
        isValid=false;         
    }
    if (document.getElementById("startingCity").value =='')
    {
        document.getElementById("cityDiv").style.display="inline";        
        isValid=false;         
    }
    if (document.getElementById("startingZipCode").value =='')
    {
        document.getElementById("zipCodeDiv").style.display="inline";        
        isValid=false;         
    }        
        
    if (document.getElementById("ctl00_ContentPlaceHolder1_startingState").selectedIndex==0)
    {
        document.getElementById("stateDiv").style.display="inline"; 
        isValid=false; 
   }
    return isValid;
}

/****************************** START GOOGLE MAPS API V3 ************************************/

var GoogleDirectionsManagerV3 = Class.create({
    initialize: function(mapManager, directionsElementId) {
        this.mapMgr = mapManager;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        
        this.directionsDisplay.setMap(this.mapMgr.getMap());        
        if(directionsElementId){
			this.directionsDisplay.setPanel(document.getElementById(directionsElementId));
		}
    },
    self:this,
    getDirections: function(start, end) {
		var request = {
			origin:start, 
			destination:end,
			travelMode: google.maps.DirectionsTravelMode.DRIVING			
		};
		
		var dirDisplay = this.directionsDisplay;
		
		this.directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				dirDisplay.setDirections(response);
			}else{				
				var errorMessage = "An error has occurred while attempting to retrieve directions!";
			    
				if (status.code == google.maps.DirectionsStatus.NOT_FOUND) {
					errorMessage = "We couldn't understand this location";
				}								
				alert(errorMessage);
			}
		});
    }
});

var GoogleMapManagerV3 = Class.create({		
    initialize: function(mapElementId) {
        this.map = new google.maps.Map($(mapElementId), {
			zoom: 8,
			center: new google.maps.LatLng(0, 0),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControlOptions: {  
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU  
			}
        });
    },
    markers : [],
    infoWindow:null,
    getMap: function() {
        return this.map;
    },
    setCenter: function(coords) {
        this.map.setCenter(new google.maps.LatLng(coords.lat, coords.lng), 13);
    },
    clearLocations: function() {        
        for(var x = 0; x <this.markers.length; x++){			
			if(this.markers[x].setMap){
				this.markers[x].setMap(null);
			}
        }
    },
    showNumberedLocations: function(locations, locationPopupHtmlCallback) {
        if (locations.size() > 0) {
			this.clearLocations();
			var map = this.map;
			var markers = this.markers;
			var _infoWindow = this.infoWindow;
            var pointBounds = new google.maps.LatLngBounds();

            locations.each(function(loc) {
                var point = new google.maps.LatLng(loc.lat, loc.lng);
                pointBounds.extend(point);
                
                var numberedIcon = new google.maps.MarkerImage("/images/mappins/pin_" + loc.number + ".gif");
                
                var marker = new google.maps.Marker({
					position:point, 
					icon : "/images/mappins/pin_" + loc.number + ".gif",
					map: map
				});
				
				markers.push(marker);
				
                if (locationPopupHtmlCallback) {
					
                    google.maps.event.addListener(marker, "click", function() {						
						if(_infoWindow != null){
							_infoWindow.close();
						}
						_infoWindow = new google.maps.InfoWindow({
							content: locationPopupHtmlCallback(loc)
						});
						_infoWindow.open(this.map, marker);
                    });
                }
            });
			this.markers = markers;
            this.map.fitBounds(pointBounds);
        }
    },
    showAddress: function(address, latLng, popupHtmlCallback, latLngCallback) {
        var showMapLocation = function(point) {
            if (point) {
                this.map.setCenter(point, 13);
                var map = this.map;
                var marker = new google.maps.Marker({
					position:point, 					
					map: map
				});
				
                this.clearLocations();                
                
//                if (popupHtmlCallback) {
//                    marker.openInfoWindowHtml(popupHtmlCallback());
//                }
                if (popupHtmlCallback) {
                    new google.maps.InfoWindow({
						content: popupHtmlCallback()
                    }).open(this.map, marker);
                }
                
                if (latLngCallback) {
                    latLngCallback(point);
                }
            } else {
                this.map.setCenter(new google.maps.LatLng(41, -92), 3);
            }
        }.bind(this);
    
        if (latLng) {
            showMapLocation(new google.maps.LatLng(latLng.lat, latLng.lng));
        } else {
            this.geocoder.getLatLng(storeAddress, showMapLocation);
        }
    }    
});    

/****************************** START GOOGLE MAPS API ************************************/
var GoogleMapManager = Class.create({
    initialize: function(mapElementId) {
        Event.observe(window, 'unload', GUnload);

        this.map = new GMap2($(mapElementId));
        this.map.addControl(new GSmallMapControl());
        this.map.addControl(new GMenuMapTypeControl());
        this.map.setCenter(new GLatLng(0, 0), 0);
        
        this.geocoder = new GClientGeocoder();
        
        this.baseIcon = new GIcon();
        this.baseIcon.iconSize = new GSize(18, 18);
        this.baseIcon.iconAnchor = new GPoint(9, 34);
        this.baseIcon.infoWindowAnchor = new GPoint(9, 9);
        
    },
    
    getMap: function() {
        return this.map;
    },
    
    setCenter: function(coords) {
        this.map.setCenter(new GLatLng(coords.lat, coords.lng), 13);
    },

    showLocations: function(locations, locationPopupHtmlCallback) {
        this.map.clearOverlays();
        
        if (locations.size() > 0) {
            var pointBounds = new GLatLngBounds();

            locations.each(function(loc) {
                var point = new GLatLng(loc.lat, loc.lng);
                pointBounds.extend(point);
                var marker = new GMarker(point);

                if (locationPopupHtmlCallback) {
                    GEvent.addListener(marker, "click", function() {
                        marker.openInfoWindowHtml(locationPopupHtmlCallback(loc));
                    });
                }
                
                this.map.addOverlay(marker);
            }.bind(this));

            this.map.setCenter(pointBounds.getCenter(),
                               this.map.getBoundsZoomLevel(pointBounds));
        }
    },
    
    showNumberedLocations: function(locations, locationPopupHtmlCallback) {
        this.map.clearOverlays();
        
        if (locations.size() > 0) {
            var pointBounds = new GLatLngBounds();

            locations.each(function(loc) {
                var point = new GLatLng(loc.lat, loc.lng);
                pointBounds.extend(point);
                
                var numberedIcon = new GIcon(this.baseIcon);
                numberedIcon.image = "/images/mappins/pin_" + loc.number + ".gif";
                
                var marker = new GMarker(point, { icon : numberedIcon });

                if (locationPopupHtmlCallback) {
                    GEvent.addListener(marker, "click", function() {
                        marker.openInfoWindowHtml(locationPopupHtmlCallback(loc));
                    });
                }
                
                this.map.addOverlay(marker);
            }.bind(this));

            this.map.setCenter(pointBounds.getCenter(),
                               this.map.getBoundsZoomLevel(pointBounds));
        }
    },
    
    clearLocations: function() {
        this.map.clearOverlays();
    },
    
    showAddress: function(address, latLng, popupHtmlCallback, latLngCallback) {
        var showMapLocation = function(point) {
            if (point) {
                this.map.setCenter(point, 13);
                var marker = new GMarker(point);
                this.map.clearOverlays();
                this.map.addOverlay(marker);
                
                if (popupHtmlCallback) {
                    marker.openInfoWindowHtml(popupHtmlCallback());
                }
                
                if (latLngCallback) {
                    latLngCallback(point);
                }
            } else {
                this.map.setCenter(new GLatLng(41, -92), 3);
            }
        }.bind(this);
    
        if (latLng) {
            showMapLocation(new GLatLng(latLng.lat, latLng.lng));
        } else {
            this.geocoder.getLatLng(storeAddress, showMapLocation);
        }
    }
});

var GoogleDirectionsManager = Class.create({
    initialize: function(mapManager, directionsElementId) {
        this.map = mapManager.getMap();
        this.directions = new GDirections(this.map, $(directionsElementId));
        
        GEvent.addListener(this.directions, 'error', function() {
            
            if(this.directions)
            {
                var status = this.directions.getStatus();
                var errorMessage = "An error has occurred while attempting to retrieve directions!";
                
                if (status.code == G_GEO_UNKNOWN_ADDRESS) {
                    errorMessage = "We couldn't understand this location";
                }
            }
            else
            {
                errorMessage = "We couldn't understand this location";
            }
            alert(errorMessage);
        });
    },
    
    getDirections: function(startAddress, endAddress) {
        this.map.clearOverlays();
        
        this.directions.load("from: " + startAddress + " to: " + endAddress, 
                             { locale: "en_US" });
    }
});
/****************************** END GOOGLE MAPS API **************************************/

/****************************** START MYACCOUNT SESSION PROMPT **************************************/

function ShowRegisterPrompt(objectClicked, encodedurl,url)
{                 
    $('myAccountSignupLink').href = 'register.aspx?redir=' + encodedurl;               
    $('closeLink').href = url;
    
    setCookie("eaps","sessionPromptSet=true");        
    dhtmlmodal.open('registerBox', 'div', 'myAccountDiv', '', 'width=326px,height=147px,left=180px,top=180px,resize=0,scrolling=0')
}


/****************************** END MYACCOUNT SESSION PROMPT **************************************/
