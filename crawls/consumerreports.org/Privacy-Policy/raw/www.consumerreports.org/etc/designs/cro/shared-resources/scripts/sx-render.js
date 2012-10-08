function readCookie(inName)
{
    var theNameWithEquals = inName + "=";
    var theCookieArray = document.cookie.split(';');
    for (var i = 0; i < theCookieArray.length; i++)
    {
        var c = theCookieArray[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(theNameWithEquals) == 0) return c.substring(theNameWithEquals.length, c.length);
    }
    return "";
}

function randomString(inStringLength, inSource)
{
    var theText = "";
    for (var i = 0; i < inStringLength; i++)
    {
        var thePosition = Math.floor(Math.random() * inSource.length);
        theText += inSource.substring(thePosition, thePosition + 1);
    }
    return theText;
}

// This is a pretty horrible hack for JIRA task CROP-675
function x04kill()
{
    var theBugs = jQuery("div .bug");
    if (theBugs)
    {
        if (theBugs.length > 0)
        {
            var theBug = theBugs[0];
            var theImgs = theBug.getElementsByTagName("img");
            if (theImgs)
            {
                if (theImgs.length > 0)
                {
                    var theImg = theImgs[0];
                    var theSrc = theImg.getAttribute("src");
                    if (theSrc.indexOf("cro_cr_plus_full_badge.gif") != -1)
                    {
                        var theAd = document.getElementById("x04");
                        if (theAd)
                        {
                            theAd.parentNode.removeChild(theAd);
                        }
                        var theAdContainers = jQuery("dd .bottompremium");
                        if (theAdContainers)
                        {
                            if (theAdContainers.length > 0)
                            {
                                var theAdContainer = theAdContainers[0];
                                if (theAdContainer)
                                {
                                    theAdContainer.innerHTML = "<div style='background: transparent url(/etc/designs/cro/application-resources/modules/common/images/cro_cr_plus_org_slug.gif) no-repeat scroll right bottom; padding-left: 7px; padding-top: 2px; padding-bottom: 0px; margin-bottom: 2px; margin-right: 3px;'>Get unlimited new and used car price reports.<br/><span style='font-weight: normal;'>Choose car above.</span></div>";
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


function renderHomepageAd(divtag){
    if(divtag != undefined){
        renderAd(divtag[0] , "adhomepagetag");
    }
}

function renderAds(){
    x04kill();
    var theDivList = jQuery("div .adtag");
    for (var x = 0; x < theDivList.length; x++){
        renderAd(theDivList[x], "adtag");
    }
}

//this random string has to be same for all the adds in the page irrespective of their location & time of trigger.
var theRandomStr="";
function getRandomString(){
    if(theRandomStr==""){
        theRandomStr = randomString(9, "0123456789");
    }
    return theRandomStr;
}

var thePositionList="";
function getAdPositionList(){
    if(thePositionList==""){
        var theDivList = jQuery("div .adtag,div .adhomepagetag");
        if(theDivList.length > 0){
            thePositionList = theDivList[0].getAttribute("id");
            for (var x = 1; x < theDivList.length; x++){
                thePositionList += "," + theDivList[x].getAttribute("id");
            }
        }
    }
    return thePositionList;
}


function renderAd(theDiv, location){
    var theRandomOverride = getRandomString(); //using getRandomString() instead of randomString(9, "0123456789"); making sure to use: same random number for all ads irrespective of their location & time of trigger.
    var theAd = document.createElement("iframe");
    theAd.setAttribute("width", theDiv.getAttribute("width"));
    theAd.setAttribute("height", theDiv.getAttribute("height"));
    if (theDiv.getAttribute("passthrustyle"))
    {
        if (typeof(theAd.style.cssText) == 'string')
        {
            theAd.style.cssText = theDiv.getAttribute("passthrustyle");
        }
        theAd.setAttribute("style", theDiv.getAttribute("passthrustyle"));
    }
    if (theDiv.getAttribute("passthruclass"))
    {
        theAd.className = theDiv.getAttribute("passthruclass");
        theAd.setAttribute("class", theDiv.getAttribute("passthruclass"));
    }
    if (theDiv.getAttribute("allowtransparency"))
    {
        theAd.allowtransparency = "true";
        theAd.setAttribute("allowtransparency", "true");
    }
    theAd.setAttribute("scrolling", "no");
    var theBrowser = navigator.appName;
    if(theBrowser == "Microsoft Internet Explorer"){
        theAd.frameBorder = theAd.marginWidth = theAd.marginHeight = 0;
    } else {
        theAd.setAttribute("frameborder", "0");
        theAd.setAttribute("marginwidth", "0");
        theAd.setAttribute("marginheight", "0");
    }
    theAd.setAttribute("id", theDiv.getAttribute("id"));
    theAd.setAttribute("name", theDiv.getAttribute("id"));
    var theAdCookie = readCookie("userAds");
    if (!theAdCookie)
    {
        theAdCookie = "";
    }
    else
    {
        if ((theAdCookie.length >= 1) && (theAdCookie.substr(theAdCookie.length - 1) != '&'))
        {
            theAdCookie = theAdCookie + "&";
        }
    }
    var theSrc = "http://oascentral.consumerreports.org/RealMedia/ads/adstream_sx.ads/" + theDiv.getAttribute("path") +
        "/1" + theRandomOverride + "@" + getAdPositionList() + "!" + theDiv.getAttribute("id") + "?" +
        theAdCookie + "article=112345&XE&status=active" + OAS_rdl + "&if_nt_CookieAccept=" + OAS_CA + "&XE";
    // OAS_rdl and OAS_CA are set by https://oascentral.consumerreports.org/Scripts/oas_analytics.js
    theAd.setAttribute("src", theSrc);
    theDiv.parentNode.insertBefore(theAd, theDiv);
    theDiv.parentNode.removeChild(theDiv);
}

function adjustIFrame(iframeId, height) {
    if(iframeId && height) {
        var frame = document.getElementById(iframeId)
        if (frame) {
            frame.height = height;
        }
    }
}

function getFrameId(url) {
    var frames = /@(.*[,!])+(.*)\?/.exec(url);
    return frames ? frames[2] : null;
}

if ((typeof window.postMessage != 'undefined') && (typeof window.addEventListener != 'undefined')) {
    window.addEventListener('message', function(event){
        adjustIFrame(getFrameId(event.data.url), event.data.height);
    }, false);
}

function renderAdSrcs()
{
    x04kill();
    var theRandomOverride = randomString(9, "0123456789");
    var theIFrameList = jQuery("iframe .adtag");
    var thePositionList = "";
    if(theIFrameList.length > 0)
    {
        thePositionList = theIFrameList[0].getAttribute("id");
        for (var x = 1; x < theIFrameList.length; x++)
        {
            thePositionList += "," + theIFrameList[x].getAttribute("id");
        }
    }
    for (var x = 0; x < theIFrameList.length; x++)
    {
        var theAd = theIFrameList[x];
        var theAdCookie = readCookie("userAds");
        if (!theAdCookie)
        {
            theAdCookie = "";
        }
        else
        {
            if ((theAdCookie.length >= 1) && (theAdCookie.substr(theAdCookie.length - 1) != '&'))
            {
                theAdCookie = theAdCookie + "&";
            }
        }
        var theSrc = "http://oascentral.consumerreports.org/RealMedia/ads/adstream_sx.ads/" + theAd.getAttribute("path") +
            "/1" + theRandomOverride + "@" + thePositionList + "!" + theAd.getAttribute("id") + "?" +
            theAdCookie + "article=112345&XE&status=active" + OAS_rdl + "&if_nt_CookieAccept=" + OAS_CA + "&XE";
        // OAS_rdl and OAS_CA are set by https://oascentral.consumerreports.org/Scripts/oas_analytics.js
        theAd.setAttribute("src", theSrc);
    }
}

/*
    Developed by Robert Nyman, http://www.robertnyman.com
    Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/

var getElementsByClassName = function (className, tag, elm){
    if (document.getElementsByClassName) {
        getElementsByClassName = function (className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
                nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
                returnElements = [],
                current;
            for(var i=0, il=elements.length; i<il; i+=1){
                current = elements[i];
                if(!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = "",
                xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
                returnElements = [],
                elements,
                node;
            for(var j=0, jl=classes.length; j<jl; j+=1){
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = [],
                elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
                current,
                returnElements = [],
                match;
            for(var k=0, kl=classes.length; k<kl; k+=1){
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for(var l=0, ll=elements.length; l<ll; l+=1){
                current = elements[l];
                match = false;
                for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
};