var weblinkingUrl, webLinkingModal, webLinkingOverlay;
var isWeblinkingInitialized = isWeblinkingInitialized || false;
// document.ready replacement as pages may not have jQuery
if (!isWeblinkingInitialized) {
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", function () {
            document.removeEventListener("DOMContentLoaded", arguments.callee, false);
            initWebLinking();
        }, false);
    } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", function () {
            if (document.readyState === "complete") {
                document.detachEvent("onreadystatechange", arguments.callee);
                initWebLinking();
            }
        });
    }
    // Window resize and scroll event to position modal 
    if (window.addEventListener) {
        window.addEventListener("scroll", function () {
            positionWebLinkingModal();
        });
        window.addEventListener("resize", function () {
            resizeWeblinkingOverlay();
            positionWebLinkingModal();
        });
    } else if (window.attachEvent) {
        window.attachEvent("onscroll", function () {
            positionWebLinkingModal();
        });
        window.attachEvent("onresize", function () {
            resizeWeblinkingOverlay();
            positionWebLinkingModal();
        });
    }
    isWeblinkingInitialized = true;
}

function initWebLinking() {
        var offSitePopUpURL = "/online/common/document/chase-weblinking-disclosure-modal.html",
        temp = document.createElement("div"),
        fragment = document.createDocumentFragment(),
        xmlHttp = createXMLHttp();
        //AJAX to get html
        xmlHttp.open('get', offSitePopUpURL, true);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    fragment = document.createDocumentFragment();
                    temp.innerHTML = xmlHttp.responseText;
                    while (temp.firstChild) {
                        fragment.appendChild(temp.firstChild);
                    }
                    document.body.insertBefore(fragment, document.body.childNodes[0]);
                    document.getElementById("weblinking-copyright").innerHTML = "&copy; " + (new Date().getFullYear()) + " JPMorgan Chase & Co.";
                } else {
                    throw ('Error: ' + xmlHttp.responseText);
                }
            } else {
                //still loading
            }
        };
        xmlHttp.send(null);
}

function bolOffSiteLink(gotoName, gotoURL) {
    weblinkingUrl = gotoURL;
    webLinkingOverlay = webLinkingOverlay || document.getElementById("weblinking-overlay");
    webLinkingModal = webLinkingModal || document.getElementById("weblinking-modal");
    webLinkingOverlay.style.display = "block";
    webLinkingModal.style.display = "block";
    resizeWeblinkingOverlay();
    positionWebLinkingModal();
    return false;
}

function resizeWeblinkingOverlay() {
    if (webLinkingOverlay && webLinkingOverlay.style.display === "block") {
        webLinkingOverlay.style.width = getDocumentWidth() + "px";
        webLinkingOverlay.style.height = getDocumentHeight() + "px";
    }
}

function positionWebLinkingModal() {
    if (webLinkingModal && webLinkingModal.style.display === "block") {
        webLinkingModal.style.top = getWindowScrollTop() + (getWindowHeight() - webLinkingModal.offsetHeight) / 2 + "px";
        webLinkingModal.style.left = getWindowScrollLeft() + (getWindowWidth() - webLinkingModal.offsetWidth) / 2 + "px";
    }
}

function getDocumentHeight() {
    return Math.max(
        Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
        Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
        Math.max(document.body.clientHeight, document.documentElement.clientHeight)
    );
}

function getDocumentWidth() {
    return Math.max(
        Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
        Math.max(document.body.offsetWidth, document.documentElement.offsetWidth),
        Math.max(document.body.clientWidth, document.documentElement.clientWidth)
    );
}
getWindowWidth = function () {
    return window.innerWidth || document.documentElement.offsetWidth;
}

getWindowHeight = function () {
    return window.innerHeight || document.documentElement.offsetHeight;
}

getWindowScrollLeft = function () {
    return window.scrollX || Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
}

getWindowScrollTop = function () {
    return window.scrollY || Math.max(document.body.scrollTop, document.documentElement.scrollTop);
}

function createXMLHttp() {
    //Initializing our object
    var xmlHttp = null;
    //if XMLHttpRequest is available then creating and returning it
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest;
        return xmlHttp;
        //if window.ActiveXObject is available than the user is using IE...so we have to create the newest version XMLHttp object
    } else if (window.ActiveXObject) {
        var ieXMLHttpVersions = ['MSXML2.XMLHttp.5.0', 'MSXML2.XMLHttp.4.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp', 'Microsoft.XMLHttp'];
        //In this array we are starting from the first element (newest version) and trying to create it. If there is an
        //exception thrown we are handling it (and doing nothing ^^)
        for (var i = 0; i < ieXMLHttpVersions.length; i++) {
            try {
                xmlHttp = new ActiveXObject(ieXMLHttpVersions[i]);
                return xmlHttp;
            } catch (e) {
            }
        }
    }
}

function isGoodDomain(str) {
    var temp = (str.length != undefined) ? str.split("/") : ["", "", ""],
	domain = temp[2] + "/";
    return (domain.indexOf("chase.com/") >= 0) || (domain.indexOf("cardmemberservices.com/") >= 0) || (domain.indexOf("firstusa.com/") >= 0);
}

function cancel() {
    document.getElementById("weblinking-overlay").style.display = "none";
    document.getElementById("weblinking-modal").style.display = "none";
}

function proceed() {
    if (isGoodDomain(window.location.href)) {
        window.open(weblinkingUrl, "weblinkingWin");
        document.getElementById("weblinking-overlay").style.display = "none";
        document.getElementById("weblinking-modal").style.display = "none";
    } else {
        alert("Error.");
    }
}
