try { 
    if (document.domain.indexOf("dell.com.") == -1 && document.domain.indexOf("dell.com") != -1) { document.domain = "dell.com"; } else { try { window.location.href; } catch (e) { document.domain = document.domain; } }
} catch (e) {
}
var m_processingcaption = 'Processing';
var m_pbarCart = null;
var m_pbarMA = null;
var m_pnlinks;
var m_crumbs;
var m_mhFixed = false;
var m_isHome = false;
var m_isSegHome = false;
var m_skipMenuDef = false;
var m_mda = null;
var m_printLink = null;
var m_emailLink = false;
var m_helpLink = null;
var m_production = true;
var m_menudef = "/content/public/menu.aspx";
var m_avgChW = 6;
var m_crumbRegEx1 = /<.*>/g;
var m_crumbRegEx2 = /&nbsp;/g;
var m_crumbRegEx3 = /&~ck=bt/g;
var m_subNavLinksDisplay = false;
var m_subNavIconsDisplay = false;
var m_largeFont = false;
var m_supressSubNav = false;
var m_stdEmpty = "";
var m_stdOffImg;
var m_activeTab = null;
var m_pbarStripAjax = null;
var m_pbarNavAjax = null;
var m_pbarContentAjax = null;
var m_defaultTabs = false;
var m_pbarPfx = "";
var m_phoneTitle = null;
var m_phoneMsg = null;
var m_phoneTariff = null;
var m_pbarContentDiv = null;
var m_pageTab = null;
var m_mastheadWidth = 928;
var m_mastheadWidthNextGen = 965;
var m_pbarTabEnabled = false;
var m_pbarTabTitle = "My Account";
var m_tabNav = false;
var m_pbarCartEnabled = false;
var m_pbarMAEnabled = false;
var m_toolBoxLinks = null;
var m_pbarLinks = null;
var m_pbarStripContent = null;
var m_buyonlineMessage = null;
var m_subNavLinkWidth = null;
var m_searchTypes = null;
var m_searchTemp = null;
var m_searchOverflowMsg = "...";
var m_myAccountLink = null;
var m_timeoutOpenDelay = null;
var m_timeoutCloseDelay = null;
var m_timeoutTerOpenDelay = null;
var m_timeoutTerCloseDelay = null;
var m_tabContentDiv = null;
var m_tabTerContentDiv = null;
var m_maIframe = false;
var Screen = new GetScreen();
var m_cartPages = new Array();
var loaded = new Array();
var onloadFired = false;
var m_isRtl = false;
var m_clientVars = null;
var m_isCenter = true;
var m_isPopupIntention = false;
var m_runSafeLoad = false;
var segmentTitle = null;

var shrink = 0;
var isbloated = false;
var isbloating = false;
var m_fromAddToCart = false;
var ContainerHeight = 0;
var increment = 0;
var intShow;
var m_id;
var blockcollapse = false;
var m_menuload = new Array();
var m_menuloaded = false;
var m_popClose = "Close";
var m_isAlienwareLayout = false;
var m_isAlienwareTheme = false;
var m_stormCookie = null;
var m_navPage = null;
var m_isRcomm = false;
var m_isSearchApp = false;
var m_curUrl = "";

var offers = new Array();
function AddToOffers(name, html) {
    offers[name] = html;
}

function betaShow(variantOfferId, mboxId) {
    var divCnt = document.getElementById(mboxId + "_ph");
    if (divCnt == null) {
        try {
            mboxFactoryDefault.get(mboxId, 0).setOffer(new mboxOfferDefault()).activate();
        }
        catch (e) {
        }
    }
    else {
        var content = offers[variantOfferId];
        if (content == null || content == undefined) {
            return;
        }
        content = content.replace('</"+"script>', '</script>');
        divCnt.innerHTML = content;

        try {
            var startVar = "JavaScript>";
            var start = content.indexOf("JavaScript\">");
            start = start + startVar.length + 1;
            var endVar = "</script>";
            var end = content.indexOf(endVar);
            var obj = content.substring(start, end);
            eval(obj);
        }
        catch (e) {
        }
    }
}

function writeMHSimple(hasClose, printCaption, printLink) {
    document.write("<div class=\"simplemastheadcontainer\"><table id=\"nextgen\" class=\"centertable\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" height=\"35\" width=\"100%\"><tr>");
	var IEver = readIEVer();
	var isIE6orless = (IEver >= 1.0) && (IEver < 7.0);
    document.write("<td><div class=\"footerlogo"+(isIE6orless?"IE6":"")+"\"></div></td>");
    if (m_mda) {
        document.write("<td align=\"right\"><div class=\"mdabarcontainer\" id=\"mdabar\">");
        document.write(m_mda);
        document.write("</div></td>");
    }
    document.write("</tr></table></div>");
    if (m_pnlinks && m_subNavLinksDisplay && (!m_supressSubNav) && !m_isRcomm) {
        document.write("<div class=\"tertiarynavcontainer\"><table class=\"centertable\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr><td valign=\"bottom\">");
        renderSubNavLinks();
        document.write("</td></tr></table></div>");
    }
    var m_nextGenBGColor = (m_isAlienwareTheme?"#0A0A0A":"#FFFFFF");
    $j(document).ready(function() { setNextGenBGColor(m_nextGenBGColor); });
}

function writeMiniMH(phoneTitle, phoneMsg, phoneTariff, segmentTitle, hasLocale, logoLink, pnmsg) {
    writeMH(phoneTitle, phoneMsg, phoneTariff, segmentTitle, hasLocale, logoLink, pnmsg, true);
}

function writeMH(phoneTitle, phoneMsg, phoneTariff, segmentTitle, hasLocale, logoLink, pnmsg, isMini) {
    document.write("<div id=\"trailimageid\" style=\"z-index:20;position:absolute;visibility:hidden;left:0px;top:0px;width:1px;height:1px;font-family:arial,helvetica;font-size:8.5pt\"><span id=\"processingCaptionID\">Processing....</span><img src=\"" + m_imgPfx + "/images/global/brand/icons/ajax-loader[1].gif\" border=\"0\"></div>");
    document.write("<div id=\"iframeContainer\" style=\"position:absolute;\"></div>");
    m_phoneTitle = phoneTitle;
    m_phoneMsg = phoneMsg;
    m_phoneTariff = phoneTariff;
    m_curUrl = (m_curUrl != null && m_curUrl.length > 0) ? m_curUrl : window.location.href;
    document.writeln("<!-- begin masthead -->");
    m_stdOffImg = "<img src=\"" + m_imgPfx + "/images/global/brand/icons/smextlink.gif\", width=\"16\" height=\"9\" border=\"0\"/>";
    autoconfig();
    if (typeof (m_suppressPrintLink) != "undefined") {
        m_printLink = null;
    }
    if (typeof (m_menuBar) == "undefined") {
        if (!m_production) {
            document.write("<div class=\"para\" style=\"color:red; font-weight:bold\">There is a problem with the menu definition. ");
            document.write("<a href=\"" + m_menudef + "\">Click here to view</a></div>");
            return;
        }
        return;
    }
    if (m_largeFont) {
        m_avgChW = m_avgChW + 2;
    }
    m_mhFixed = true;
    if (typeof (m_printableText) == "undefined") {
        m_printableText = m_printText;
    }
    if (typeof (m_helpText) == "undefined") {
        m_helpText = "help";
    }
    document.writeln("<a name=\"mastheadtop\"></a>");
    document.write("<div class=\"mastheadcontainer\"><table id=\"nextgen\" class=\"centertable\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"" + m_mastheadWidthNextGen + "\"><tr>");
    document.write("<td class=\"mhpersonalizationcell\" valign=\"middle\" " + ((typeof (m_menuBar) != "undefined" && m_menuBar && m_menuBar.length > 0 && !m_skipMenuDef) ? "colspan=\"3\"" : "colspan=\"2\"") + "><table id=\"pbarstriptable\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td nowrap=\"nowrap\">");
    renderCountrySelector();
    document.write("</td>");
    var ticks = new Date();
    document.write("<td><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"\" border=\"0\" width=\"15\" height=\"1\" /></td><td width=\"100%\">");
    renderBuyOnline();
    document.write("</td>");
    document.write("<td valign=\"middle\" nowrap=\"nowrap\">");
    if (segmentTitle) {
        document.write("<div class=\"segmenttitle\">");
        document.write(segmentTitle);
        document.write("</div>");
    }
    document.write("</td><td valign=\"middle\" nowrap=\"nowrap\">");
    if (m_pbarLinks != null && m_pbarLinks.length > 0) {
        renderPbarLinks();
    }
    document.write("</td><td valign=\"top\">");
    document.write("<div class=\"pbarcontainer\" id=\"pbarcontainer\"><div id=\"pbarcontent\" name=\"pbar\" class=\"pbarcontent\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr>");
    renderToolBox();
    document.write("<td><div id=\"pbarstripcontainer\"></div></td>");
    renderPbarStrip();
    document.write("</tr></table></div></div></td></tr></table></td></tr>");

    if (isMini) {
        document.write("</table></div>");
        document.write("<a name=\"skipMH\"></a>");
        document.writeln("<!-- end masthead -->");
        var m_nextGenBGColor = (m_isAlienwareTheme?"#0A0A0A":"#FFFFFF");
        $j(document).ready(function() { setNextGenBGColor(m_nextGenBGColor); });
        return;
    }

    document.write("<tr><td class=\"mhlogocell\" valign=\"" + ((typeof (m_menuBar) != "undefined" && m_menuBar && m_menuBar.length > 0 && !m_skipMenuDef) ? "bottom" : "top") + "\" rowspan=\"2\">");
    document.write("<div id=\"logocontainer\">");
    document.write("<a href=\"#skipMH\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"Skip to main content\" border=\"0\" width=\"1\" height=\"1\" /></a>");
    if (typeof (m_nothomelogo) != "undefined") {
		var IEver = readIEVer();
		var isIE6orless = (IEver >= 1.0) && (IEver < 7.0);
        m_nothomelogo = m_nothomelogo.replace("/images/global/brand/ui/logo.gif", (m_isAlienwareTheme ? "/images/global/brand/ui/nxgen/logo73.png" : "/images/global/brand/ui/storm80/logo80." + (isIE6orless?"gif":"png")));
        if (logoLink) {
            document.write("<a class=\"logolink\" href=\"" + m_homelink + "\">");
        }
        document.write("<img class=\"logo\" src=\"" + m_nothomelogo + "\" border=\"0\" width=\"61\" height=\"61\" alt=\"Dell\" />");
        if (logoLink) {
            document.write("</a>");
        }
    }
    document.write("</div></td>");
    if (typeof (m_menuBar) != "undefined" && m_menuBar && m_menuBar.length > 0 && !m_skipMenuDef) {
        document.write("<td class=\"mhprimarynavcell\" valign=\"middle\">");
        var pageTab = null;
        var maxTab = (m_pbarTabEnabled && !m_tabNav) ? m_menuBar.length : (m_menuBar.length - 1);
        var curUrl = hashTabUrl(window.location.href);
        var urlOverRide = false;
        var cookieTab = m_stormCookie.session.getCookie("~tid" + pageCnty + pageLang + pageSeg + pageCS);
        if (cookieTab == "myaccountMenu") {
            pageTab = m_menuBar.length;
        }
        if (pageTab == null) {
            // Current Url matches Tab Url
            for (n = 0; n < m_menuBar.length; n++) {
                if (curUrl == hashTabUrl(m_menuBar[n].Href)) {
                    pageTab = n;
                    if (cookieTab != m_menuBar[n].Id) {
                        m_stormCookie.session.setCookie("~tid" + pageCnty + pageLang + pageSeg + pageCS, m_menuBar[n].Id);
                    }
                    break;
                }
            }
        }
        if (pageTab == null) {
            // Cookie ID matches Menu ID        
            if (cookieTab != null && cookieTab.length > 0) {
                for (n = 0; n < m_menuBar.length; n++) {
                    if ((cookieTab == m_menuBar[n].Id) || (cookieTab == n))// string or int
                    {
                        pageTab = n;
                        break;
                    }
                }
            }
            else {
                // Menu attribute IsSelectedTab is true
                for (n = 0; n < m_menuBar.length; n++) {
                    if (m_menuBar[n].IsSelectedTab) {
                        m_pageTab = n;
                        m_stormCookie.session.setCookie("~tid" + pageCnty + pageLang + pageSeg + pageCS, m_menuBar[n].Id);
                        break;
                    }
                }
            }
        }
        // Tab set in Querystring
        var qTab = getQueryVariable("~tid");
        if (qTab) {
            if (typeof (qTab) != "undefined" && !isNaN(parseInt(qTab)) && qTab <= maxTab) {
                pageTab = qTab;
                m_stormCookie.session.setCookie("~tid" + pageCnty + pageLang + pageSeg + pageCS, qTab); // querystring int
            }
            for (n = 0; n < m_menuBar.length; n++) {
                if (m_menuBar[n].Id.indexOf(qTab) != -1) {
                    pageTab = n;
                    m_stormCookie.session.setCookie("~tid" + pageCnty + pageLang + pageSeg + pageCS, m_menuBar[n].Id); // querystring string
                }
            }
        }
        else {
            // Tab set by Index in Code
            if (!isNaN(parseInt(m_pageTab))) {
                if (m_pageTab <= maxTab) {
                    pageTab = parseInt(m_pageTab);
                }
            }
            // Tab set by String in Code
            for (n = 0; n < m_menuBar.length; n++) {
                if (m_pageTab == m_menuBar[n].Text || ((m_pageTab + "Menu") == m_menuBar[n].Id)) {
                    pageTab = n;
                }
            }
        }
        if (pageTab == null) {
            m_pageTab = 0;
        }
        else {
            m_pageTab = pageTab;
        }
        document.write("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\"><tr>");
        renderPrimaryTabStrip();
        document.write("<td width=\"100%\" valign=\"bottom\"><div class=\"tabspacer\" /></td>");
        document.write("</tr></table></td>");
    }
    
	
		document.write("<td class=\"mhsearchcell\" valign=\"middle\">");
		if (typeof (m_supressSearch) == "undefined" || m_supressSearch == false) {
			document.write("<div class=\"searchcontainer\" id=\"searchcontainer\">");
			if (m_search) {
				if (window.location.protocol == "https:") {
					m_search = m_search.replace(/http:\/\/i.dell.com/g, m_imgPfx);
				}
				document.write("<div class=\"searchbox_topright\"><div class=\"searchbox_topleft\"><div class=\"searchbox_bottomright\"><div class=\"searchbox_bottomleft\">");				
				document.write(m_search);				
				document.write("</div></div></div></div>");
				var cat = getQueryVariable("cat");
				var kword = getQueryVariable("k");
				if (cat != null) {
					var input = getRawObject("cat");
					if (input) {
						input.value = cat;
					}
				}
				if (kword != null) {
					var kinput = getRawObject("searchinput");
					if (kinput) {
						var kw = DecodeSearch(kword);
						if (kw != undefined && kw.length > 0) {
							kinput.value = kw;
						}
					}
				}
			}
			else {
				renderSearchLinks();
			}
			var searchCombo = document.getElementById("cat");
			SetSeachComboTitle(searchCombo);
			document.write("</div>");
		}
		document.write("</td></tr>");
    
    if (typeof (m_menuBar) != "undefined" && m_menuBar && m_menuBar.length > 0 && !m_skipMenuDef && typeof (m_menuBar[m_pageTab]) != "undefined" && m_menuBar[m_pageTab].MenuItems.length > 0) {
        document.write("<tr><td class=\"mhsecondarynavcell\" align=\"left\" valign=\"middle\" colspan=\"2\">");
        document.write("<div class=\"subnavcontainer\" id=\"subnav\">");
        index = m_pageTab;
        document.write(renderSecondaryTabStrip(m_menuBar[index]));
        document.write("</div></td></tr>");
    }
    else {
        if (typeof (m_menuBar) == "undefined" || !m_menuBar || m_menuBar.length > 0 && !m_skipMenuDef) {
            document.write("<tr><td colspan=\"3\"></td></tr>");
        }
    }

    if (m_crumbs != null || m_mda != null || m_menuBar != null) {
        document.write("<tr><td class=\"mhcrumbcell\" valign=\"middle\" ");
        if (typeof (m_menuBar) != "undefined" && m_menuBar && m_menuBar.length > 0 && !m_skipMenuDef) {
            document.write(" colspan=\"3\"");
        }
        else {
            document.write(" colspan=\"1\" width=\"" + (m_mastheadWidthNextGen - 61) + "\"");
        }
        document.write("><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr><td>");
        if (m_crumbs) {
            if (m_isRtl) {
                renderMastheadCrumbsRtl();
            }
            else {
                renderMastheadCrumbs();
            }
        }
        document.write("</td><td><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"\" border=\"0\" width=\"5\" height=\"1\" /></td><td align=\"right\">");
        if (m_mda && !(m_isRtl)) {
            document.write("<div class=\"mdabarcontainer\" id=\"mdabar\">");
            document.write(m_mda);
            document.write("</div>");
        }
        if (m_mda && m_isRtl) {
            document.write("<div class=\"mdabarcontainer\" id=\"mdabar\">");
            document.write(m_mda);
            document.write("</div>");
        }
        document.write("</td></tr>");
    }
    else {
        document.write("<tr><td><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"\" border=\"0\" width=\"1\" height=\"10\" /></td></tr>");
    }
    document.write("</table></td></tr></table></div>");
    if (m_pnlinks && m_subNavLinksDisplay && (!m_supressSubNav)) {
        document.write("<div class=\"tertiarynavcontainer\"><table class=\"centertable\" cellpadding=\"0\" cellspacing=\"0\" width=\"" + m_mastheadWidthNextGen + "\"><tr><td valign=\"middle\">");
        document.write("<span id=\"psinfo\" class=\"psinfo\"></span>");
        document.write("</td><td valign=\"bottom\">");
        renderSubNavLinks();
        document.write("</td></tr></table></div>");
    }
    document.write("<a name=\"skipMH\"></a>");
    document.writeln("<!-- end masthead -->");
    var m_nextGenBGColor = (m_isAlienwareTheme?"#0A0A0A":"#FFFFFF");
    $j(document).ready(function() { setNextGenBGColor(m_nextGenBGColor); });
    bindMastHeadFlyouts();
    $j(document).ready(alignMasthead);
}

function setNextGenBGColor(color) {
    $j("body.bodyNextGen").css("background-color", color);
}

function alignMasthead() {
    if ($j("#maincontentcnt").width() > Screen.Width) {
        if (Screen.Width > m_mastheadWidthNextGen) {
            var mgn = (Screen.Width - m_mastheadWidthNextGen) / 2;
            $j(".centertable").css("margin-left", mgn);
            $j(".centertable").css("margin-right", mgn);
        }
        else {
            $j(".centertable").css("margin-left", "10px");
            $j(".centertable").css("margin-right", "10px");
        }
    }
}

function writeAlienwareMH(phoneTitle, phoneMsg, phoneTariff, segmentTitle, hasLocale, logoLink, pnmsg) {
    writeMH(phoneTitle, phoneMsg, phoneTariff, segmentTitle, hasLocale, logoLink, pnmsg, false);
}

// set the title of the search combo
function SetSeachComboTitle(SelectObj) {
    if (SelectObj) {
        if (SelectObj.selectedIndex > -1) {
            if (SelectObj.options[SelectObj.selectedIndex].value != "") {
                var searchCombo = document.getElementById("cat");
                if (searchCombo) {
                    searchCombo.title = SelectObj.options[SelectObj.selectedIndex].text;
                }
            }
        }
    }
}
function renderBuyOnline() {
    if (m_phoneTitle || m_phoneMsg) {
        if (m_isRtl) {
            buyOnlineAlign = "left";
        }
        else {
            buyOnlineAlign = "right";
        }
        document.write("<span class=\"message_buyonline\">");
        if (m_phoneTitle) {
            document.write("<span style=\"padding-" + buyOnlineAlign + ":3px\">");
            document.write(m_phoneTitle);
            document.write("</span>");
        }
        if (m_phoneMsg) {
            document.write("<span style=\"padding-" + buyOnlineAlign + ":3px\">");
            document.write(m_phoneMsg);
            document.write("</span>");
        }
        if (m_phoneTariff) {
            document.write("<span>");
            document.write("<span class=\"mhTextNewTrf\">" + m_phoneTariff + "</span>");
            document.write("</span>");
        }
        document.write("</span>");
    }
}
var isCSS = false;
var isW3C = false;
var isIE4 = false;
var isNN4 = false;
var isIE6 = false;
var isGecko = false;
var isOpera = false;
var isDHTML = false;
var isSafari = false;
var suppressMenus = false;
var m_anchorClicked = false;
var pageSeg = getCookieKeyValue(" lwp", "s");
var pageLang = getCookieKeyValue(" lwp", "l");
var pageCnty = getCookieKeyValue(" lwp", "c");
var pageCS = getCookieKeyValue(" lwp", "cs");
if (pageCS != null && pageCS.length > 0) {
    pageCS = pageCS.toLowerCase();
}
function hashTabUrl(url) {
    if (url == null) {
        return "";
    }
    url = url.toLowerCase();
    var urlParts = url.split("?");
    if (urlParts.length == 0) {
        return "";
    }
    var hash = urlParts[0];
    if (urlParts.length == 1) {
        return hash;
    }
    var qParts = urlParts[1].split("&");
    var ignore = new Array("c", "l", "s", "cs");
    for (i = 0; i < qParts.length; i++) {
        var qPair = qParts[i].split("=");
        if (qPair.length > 1) {
            var skip = false;
            if (qPair[0].length > 1 && qPair[0].substring(0, 1) == "~") {
                skip = true;
            }
            else {
                for (j = 0; j < ignore.length; j++) {
                    if (qPair[0] == ignore[j]) {
                        skip = true;
                        break;
                    }
                }
            }
            if (!skip) {
                hash += qParts[i];
            }
        }
    }
    return hash;
}

function autoconfig() {
    if (document && document.images) {
        isCSS = (document.body && document.body.style) ? true : false;
        isW3C = (isCSS && document.getElementById) ? true : false;
        isIE4 = (isCSS && document.all && readIEVer() >= 4.0) ? true : false;
        isNN4 = (document.layers) ? true : false;
        isGecko = (isCSS && navigator && navigator.product && navigator.product == "Gecko");
        isOpera = (isCSS && navigator.userAgent.indexOf("Opera") != -1);
        isSafari = (isCSS && navigator.userAgent.indexOf("Safari") != -1);
        isIE6CSS = (document.compatMode && document.compatMode.indexOf("CSS1") >= 0) ? true : false;
        isIE6 = (isIE6CSS && readIEVer() >= 6.0);
        isDHTML = isCSS && (isIE4 || isGecko || isOpera);
        if (suppressMenus) {
            isDHTML = false;
        }
        else if (isOpera && readOperaVer() < 7) {
            isDHTML = false;
        }
        else if (isGecko && navigator.productSub <= 20011022) {
            isDHTML = false;
        }
        else if (isGecko && navigator.productSub == 20030107) {
            var x = navigator.userAgent.indexOf("AppleWebKit");
            if (x > -1) {
                isDHTML = (navigator.userAgent.substring(x + 12, x + 15)) > 300;
            }
            else {
                isDHTML = false;
            }

        }
        m_stormCookie = new StormCookie();
        m_clientVars = new ClientVars();
    }
}

function readIEVer() {
    var agent = navigator.userAgent;
    var offset = agent.indexOf("MSIE");
    if (offset < 0) {
        return 0;
    }
    return parseFloat(agent.substring(offset + 5, agent.indexOf(";", offset)));
}
function BandWidthRedir(url) {
    var bWidth = Bandwidth();
    if (bWidth == "Modem") {
        document.location.href = url;
    }
}
function readOperaVer() {
    var agent = navigator.userAgent;
    var offset = agent.indexOf("Opera");
    if (offset < 0) {
        return 0;
    }
    return parseFloat(agent.substring(offset + 6));
}
function renderPrimaryTabStrip() {
    var menuHeaderID;
    if (isIE6) {
        bodyTag.style.behavior = "url(#default#clientCaps)";
        m_colorDepth = bodyTag.colorDepth;
    }
    var cssPrefix = "inactivetab";
    for (n = 0; n < m_menuBar.length; n++) {
        if (n == m_pageTab) {
            cssPrefix = "activetab";
        }
        var index = n;
        if ((m_menuBar[n].Href != null && m_menuBar[n].Href.length > 0)) {
            var item = m_menuBar[n];
            document.write("<td><div id=\"" + m_menuBar[n].Id + "\" class=\"" + cssPrefix + "\" id=\"" + m_menuBar[n].Id + "\" name=\"mh_tabselector\">");
            document.write("<div onclick=\"SwapTab( '" + m_menuBar[index].Id + "', '" + createNavLink(m_menuBar[index].Href, n) + "', " + index + " )\" class=\"" + cssPrefix + "content\" id=\"" + m_menuBar[n].Id + "content\" align=\"center\" nowrap=\"1\">");
            document.write(m_menuBar[n].Text);
            document.write("</div></div></td>");
        }
        else {
            document.write("<td><div onclick=\"swapSecondaryTabStrip('" + m_menuBar[n].Id + "','" + index + "')\" class=\"" + cssPrefix + "\" id=\"" + m_menuBar[n].Id + "\" name=\"mh_tabselector2\">");
            document.write("<div class=\"" + cssPrefix + "content\" id=\"" + m_menuBar[n].Id + "content\" align=\"center\" style=\"cursor:pointer\" nowrap=\"1\">");
            document.write(m_menuBar[n].Text);
            document.write("</div></div></td>");
        }
        if (n == m_pageTab) {
            m_activeTab = getRawObject(m_menuBar[m_pageTab].Id);
        }
        cssPrefix = "inactivetab";
    }
    if (m_pbarTabEnabled && !m_tabNav) {
        if (isSafari && m_myAccountLink) {
            document.write("<td width=\"4px\" vAlign=\"top\" >");
            document.write("<div id=\"pbarTableft\" class=\"" + cssPrefix + "left\"></div>");
            document.write("</td>");
            document.write("<td><div onclick=\"window.location='" + m_myAccountLink + "';\" class=\"" + cssPrefix + "\" id=\"pbarTab\" name=\"mh_tabselector2\">");
            document.write("<div class=\"" + cssPrefix + "content\" id=\"pbarTabcontent\" align=\"center\" style=\"cursor:pointer\" nowrap=\"1\">");
            document.write(m_pbarTabTitle);
            document.write("</div></div></td>");
        }
        if (!isSafari) {
            var link = (window.location.href.indexOf("~tid") == -1) ? (window.location.href + "&~tid=" + m_menuBar.length) : window.location.href.replace("~tid=" + getQueryVariable("~tid"), "~tid=" + (m_menuBar.length));
            document.write("<td width=\"4px\" vAlign=\"top\" >");
            document.write("<div id=\"pbarTableft\" class=\"" + cssPrefix + "left\"></div>");
            document.write("</td>");
            document.write("<td><div onclick=\"renderPbarTabNav('pbarTab')\" class=\"" + cssPrefix + "\" id=\"pbarTab\" name=\"mh_tabselector2\">");
            document.write("<div class=\"" + cssPrefix + "content\" id=\"pbarTabcontent\" align=\"center\" style=\"cursor:pointer\" nowrap=\"1\">");
            document.write(m_pbarTabTitle);
            document.write("</div></div></td>");
        }
    }
}

function createNavLink(url, tab) {
    var link = null;
    if (url != null) {
        link = url;
    }
    return link;
}
function renderSearchLinks() {
    if (m_searchLinks) {
        for (var n = 0; n < m_searchLinks.length; n++) {
            if (n > 0) {
                document.write("<span class=\"mhSpace\">|</span>");
            }
            var href = m_searchLinks[n].Href;
            var text = m_searchLinks[n].Text;
            document.write("<span class=\"mh_search_sep_SE\" style=\"white-space:nowrap\"><a href=\"" + href + "\" class=\"para_small\">" + text + "</a></span>");
        }
    }
}

function renderPbarLinks() {
    if (m_pbarLinks) {
        document.write("<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr>");
        for (var n = 0; n < m_pbarLinks.length; n++) {
            var href = m_pbarLinks[n].Href;
            var text = m_pbarLinks[n].Text;
            var icon = m_pbarLinks[n].IconUrl;
            if (icon != undefined && icon != null && icon.length > 0 && icon.indexOf(".com/") != -1) {
                icon = m_imgPfx + icon.substring(icon.indexOf(".com/") + 4);
                document.write("<td valign=\"middle\"><img src=\"" + icon + "\" height=\"17px\" border=\"0\" alt=\"" + text + "\" /></td>");
            }
            document.write("<td valign=\"middle\" nowrap=\"true\"><span class=\"pbarlink\" nowrap=\"1\"><a href=\"" + href + "\">" + text + "</a></span></td>");
            document.write("<td valign=\"middle\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" border=\"0\" height=\"1\" width=\"10\" alt=\"\" /></td>");
        }
        document.write("</tr></table>");
    }
}

function swapSecondaryTabStrip(src, id) {

    subNavContent = getRawObject("subnav");
    menu = m_menuBar[id];
    SwapTab(getRawObject(src), null, id);
    subNavContent.innerHTML = renderSecondaryTabStrip(menu);
    bindMastHeadFlyouts();
}

function renderPbarTabNav(src) {
    m_pageTab = m_menuBar.length;
    SwapTab(getRawObject(src), null, m_pageTab);
    try {
        nav = getRawObject("subnav");
        if (nav.innerHTML.indexOf("name=\"tabnav\"") == -1) {
            AsyncXDomainIframeCall(m_pbarPfx + "/pbar/ajax.aspx?~psc=tabnav&menus=cart", pbarnavajax);
        }
    }
    catch (e)
{ }
}

function setMastheadClickTrackingCookie(mctFeature, mctTitle, mctSubtitle, mctOrdinal, mctAction, mctLaunch) {
    try {
        if(typeof(isPremier) == "undefined" || !isPremier){
            var strCookie = "";
            if (mctFeature == null)
                mctFeature = "masthead";
            if (mctSubtitle == null)
                mctSubtitle = "";
            if (mctAction == null)
                mctAction = "Click";
            if (mctLaunch == null)
                mctLaunch = ((typeof (s_dell) == "undefined" || typeof (s_dell.pageName) == "undefined") ? "" : s_dell.pageName);

            strCookie = "Feature=" + encodeURIComponent(mctFeature);
            strCookie += "|Title=" + encodeURIComponent(unescape(mctTitle));
            strCookie += "|Subtitle=" + encodeURIComponent(unescape(mctSubtitle));
            strCookie += "|Ordinal=" + encodeURIComponent(mctOrdinal);
            strCookie += "|Action=" + encodeURIComponent(mctAction);
            strCookie += "|Launch=" + encodeURIComponent(mctLaunch);

            SetCookieValue("mhclicktrack", strCookie, false, false);
        }
    }
    catch(exp){}
}

function renderSecondaryTabStrip(menu) {
    var mOrdinalParent = 0;
    var mOrdinalSub = 0;
    var ordinalOffset = 0;
    var mTitle = "";
    var mSubtitle = "";
    var mhClickParams = "";
    
    var sep = "sub";
    var isTitle = false;
    var m_nextGenBGColor = (m_isAlienwareTheme?"#0A0A0A":"#FFFFFF");
    var subNavHTML = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\"><tr><td style=\"background-color:"+m_nextGenBGColor+";\" width=\"10\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" border=\"0\" height=\"1\" width=\"10\" alt=\"\" /></td>";
    var columnClass = "";
    var columnView = false;
    for (var n = 0; n < menu.MenuItems.length; n++) {
        var item = menu.MenuItems[n];
        if (item.Text != null) {
            mOrdinalParent = n + 1;
            mOrdinalSub = 0;
            mTitle = item.Text.replace("\n", "<br/>");
            mSubtitle = "";
            mhClickParams = "null, '" + escape(mTitle) + "', '" + escape(mSubtitle) + "', '" + mOrdinalParent.toString() + "." + mOrdinalSub.toString() + "', null, null";
            if (n == 0) {
                if (m_isRtl) { containerClass = "subnavlinkcontainerlast"; }
                else { containerClass = "subnavlinkcontainerfirst"; }
            }
            else if ((n + 1) == menu.MenuItems.length) {
                if (m_isRtl) { containerClass = "subnavlinkcontainerfirst"; }
                else { containerClass = "subnavlinkcontainerlast"; }
            }
            else {
                containerClass = "subnavlinkcontainer";
            }
            if (item.MenuItems == null) { containerClass += "nomenu"; }
            if (isDHTML) {
                if (n > 0) {
                    subNavHTML += "<td width=\"2\"><div class=\"subnavlinkdivide\"></div></td>";
                }
                if (item.MenuItems) {
                    if ((n + 1) == menu.MenuItems.length) {
                        columnClass = "columnlist";
                        columnView = true;
                    }
                    else {
                        columnClass = "linklist";
                        columnView = false;
                    }
                    subNavHTML += "<td class=\"subnavlinkcell\" id=\"mh_" + n + "cell\" valign=\"middle\" align=\"center\"><div id=\"mh_" + n + "\" name=\"mh_subnavlink\" class=\"" + containerClass + "\">";
                    subNavHTML += "<table cellpadding=\"0\" cellspacing=\"0\" height=\"30\"><tr><td>";
                    if (item.Href != null && item.Href.length > 0) {
                        subNavHTML += "<a href=\"" + createNavLink(item.Href, n) + "\" " + item.TargetHTML + " id=\"mh_" + n + "link\" onmouseup=\"setMastheadClickTrackingCookie(" + mhClickParams + ")\" class=\"subnavlink\">" + item.Text.replace("\n", "<br/>") + "</a>";
                    }
                    else {
                        subNavHTML += "<a href=\"#\" " + item.TargetHTML + " id=\"mh_" + n + "link\" onclick=\"return false\" class=\"subnavlink\">" + item.Text.replace("\n", "<br/>") + "</a>";
                    }
                    subNavHTML += "</td><td><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" border=\"0\" height=\"1\" width=\"4\" alt=\"\" /></td><td valign=\"middle\" style=\"padding-top:2px;\"><img id=\"mh_" + n + "carrot\" src=\"" + m_imgPfx + "/images/global/brand/ui/" + (m_isAlienwareTheme ? "nxgen" : "storm80") + "/nav_down.gif\" border=\"0\" height=\"4\" width=\"7\" alt=\"\" /></td></tr></table></div>";
                    subNavHTML += "<div id=\"mh_" + n + "content\" class=\"floatingmenu\" onmouseout=\"SubNavEventInActive()\" onmouseover=\"ClearSubNavTimeOut(false);\">" +
					"<table id=\"uniqueplaceholderIDsec\" class=\"mh_" + (columnView ? "columnlist" : "linklist") + "\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr><td width=\"1\" class=\"subnavmenuborder\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"1\" height=\"1\" alt=\"\"></td><td valign=\"top\" class=\"subnavcolumn\">";
                    var column = 1;
                    var columns = new Array();
                    ordinalOffset = 0;
                    for (var nn = 0; nn < item.MenuItems.length; nn++) {
                        var drop = item.MenuItems[nn];
                        if (columnView) {
                            column = drop.Column ? drop.Column : 1;
                        }
                        if (columns[column] == undefined) {
                            columns[column] = "";
                        }
                        if (drop.Text != null) {
                            mOrdinalSub = nn + 1 - ordinalOffset;
                            mSubtitle = drop.Text;
                            mhClickParams = "null, '" + escape(mTitle) + "', '" + escape(mSubtitle) + "', '" + mOrdinalParent.toString() + "." + mOrdinalSub.toString() + "', null, null";
                            if (drop.Href != null && drop.Href.length == 0) {
                                columns[column] += "<tr><td class=\"menutitle\">" + drop.Text + "</td></tr>";
                            }
                            else {
                                columns[column] += "<tr><td class=\"" + sep + "\" onMouseOver=\"this.className='" + sep + "hover';\" onMouseOut=\"this.className='" + sep + "';\"><div class=\"" + sep + "\">";
                                if (!columnView) {
                                    columns[column] += "<table cellpadding=\"0\" cellspacing=\"0\"><tr><td valign=\"top\" style=\"padding-top:3px;\"><img src=\"" + m_imgPfx + "/images/global/brand/ui/" + (m_isAlienwareTheme ? "nxgen/" : "storm80/") + (m_isRtl ? "nav_left_blue" : "nav_right_blue") + ".gif\" alt=\"\" /></td><td><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"4\" height=\"1\" alt=\"\"></td><td><a class=\"menulink\" href=\"" + createNavLink(drop.Href, n) + "\" " + drop.TargetHtml + " onmouseup=\"setMastheadClickTrackingCookie(" + mhClickParams + ")\"> " + drop.Text + (drop.OffDell ? m_stdOffImg : "") + "</a></td></tr></table>";
                                }
                                else {
                                    columns[column] += "<table cellpadding=\"0\" cellspacing=\"0\"><tr><td><a class=\"menulink\" href=\"" + createNavLink(drop.Href, n) + "\" " + drop.TargetHtml + " onmouseup=\"setMastheadClickTrackingCookie(" + mhClickParams + ")\">" + drop.Text + (drop.OffDell ? m_stdOffImg : "") + "</a></td></tr></table>";
                                }
                                columns[column] += "</div>";
                                if (drop.MenuItems != null) {
                                    columns[column] += "<div class=\"mhproductlinks\">";
                                    for (var nnn = 0; nnn < drop.MenuItems.length; nnn++) {
                                        var prod = drop.MenuItems[nnn];
                                        if (prod.Text != null && prod.Text.length > 0) {
                                            if (nnn != 0 && !columnView) {
                                                columns[column] += ",&nbsp; ";
                                            }
                                            if (columnView) {
                                                columns[column] += "<div class=\"mhproductdiv\"><table cellpadding=\"0\" cellspacing=\"0\"><tr><td valign=\"top\" style=\"padding-top:3px;width:7px;\"><img src=\"" + m_imgPfx + "/images/global/brand/ui/nxgen/" + (m_isRtl ? "nav_left_grey" : "nav_right_grey") + ".gif\" alt=\"\" /></td><td><a class=\"mhproductlink\" href=\"" + createNavLink(prod.Href, n) + "\" " + prod.TargetHtml + " onmouseup=\"setMastheadClickTrackingCookie(" + mhClickParams + ")\"> " + prod.Text + "</a></td></tr></table></div>";
                                            }
                                            else {
                                                columns[column] += "<a class=\"mhproductlink\" href=\"" + createNavLink(prod.Href, n) + "\" " + prod.TargetHtml + " onmouseup=\"setMastheadClickTrackingCookie(" + mhClickParams + ")\">" + prod.Text + "</a>";
                                            }
                                        }
                                    }
                                    columns[column] += "</div>";
                                }
                                columns[column] += "</td></tr>";
                            }
                        }
                        sep = drop.IsSeparator ? "sep" : "sub";
                        if (drop.IsSeparator)
                            ordinalOffset++;
                    }
                    var columnClass = "mh_linkcolumn";
                    if (columns.length > 2) {
                        columnClass = "mh_viewallcolumn";
                    }
                    subNavHTML += "<table class=\"" + columnClass + "\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">";
                    var col = 0;
                    for (var cc = 1; cc < 6; cc++) {
                        if (columns[cc] != null) {
                            if (col > 0) {
                                subNavHTML += "</table></td><td valign=\"top\" class=\"subnavcolumn\"><table class=\"" + columnClass + "\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">";
                            }
                            subNavHTML += columns[cc];
                            col++;
                        }
                    }

                    subNavHTML += "</table></td><td width=\"1\" class=\"subnavmenuborder\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"1\" height=\"1\" alt=\"\"></td></tr><tr><td colspan=\"" + (col + 2) + "\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr><td width=\"2\"><img src=\"" + m_imgPfx + "/images/global/brand/ui/nxgen/menucorner"+(m_isRtl?"br":"bl")+"_2x2.gif\" alt=\"\" /></td><td class=\"subnavmenuborderbottom\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"1\" height=\"1\" alt=\"\"></td><td width=\"2\"><img src=\"" + m_imgPfx + "/images/global/brand/ui/nxgen/menucorner"+(m_isRtl?"bl":"br")+"_2x2.gif\" alt=\"\" /></td></tr></table></div></td></tr></table></td>";
                }
                else {
                    subNavHTML += "<td class=\"subnavlinkcell\" id=\"mh_" + n + "cell\" valign=\"middle\" align=\"center\"><div id=\"mh_" + n + "\" name=\"mh_subnavlink\" class=\"" + containerClass + "\">" +
					"<table cellpadding=\"0\" cellspacing=\"0\" height=\"30\"><tr><td><a href=\"" + createNavLink(item.Href, n) + "\" " + item.TargetHTML + " id=\"mh_" + n + "link\" class=\"subnavlinknomenu\">" + item.Text.replace("\n", "<br/>") + "</a></td></tr></table>" +
					"</div></td>";
                }
            }
            else {
                subNavHTML += "<td class=\"subnavlinkcell\" id=\"mh_" + n + "cell\" valign=\"middle\" align=\"center\"><div class=\"" + containerClass + "\">" +
				"<table cellpadding=\"0\" cellspacing=\"0\" height=\"30\"><tr><td><a href=\"" + createNavLink(item.Href, n) + "\" " + item.TargetHTML + " class=\"subnavlinknomenu\">" + item.Text.replace("\n", "<br/>") + "</a></td></tr></table>" +
				"</div></td>";
            }
        }
    }
    subNavHTML += "</tr></table>";
    return subNavHTML;
}

function bindMastHeadFlyouts() {
    if (!m_tabNav) {
        $j("div[@name='mh_subnavlink']").hover(
          function() {
              SubNavEventActive($j(this));
          },
          function() {
              SubNavEventInActive($j(this));
          }
        );
        $j("td[@name='mh_subnavlink']").hover(
          function() {
              TerNavEventActive($j(this));
          },
          function() {
              TerNavEventInActive($j(this));
          }
        );
    }
}
function ParseDivObjects(targetName) {

    var objs = document.getElementsByName(targetName);
    if (objs.length == 0) {
        var targets = document.getElementsByTagName("DIV");
        var tmpObj;
        objs = new Array();
        for (var targetidx = 0; targetidx < targets.length; targetidx++) {
            tmpObj = targets[targetidx];
            if (tmpObj.className  == targetName) {
                objs.push(tmpObj);
            }
        }
    }
    return objs;
}
function ParseIFrameObjects(targetName) {
    var objs = document.getElementsByName(targetName);
    if (objs.length == 0) {
        var targets = document.getElementsByTagName("IFRAME");
        var tmpObj;
        objs = new Array();
        for (var targetidx = 0; targetidx < targets.length; targetidx++) {
            tmpObj = targets[targetidx];
            if (tmpObj.name == targetName) {
                objs.push(tmpObj);
            }
        }
    }
    return objs;
}
function SwapTab(src, url, tab) {
    var tablink = getRawObject(src);
    if (m_activeTab != null) {
        m_activeTab.className = "inactivetab";
        getRawObject(m_activeTab.id + "content").className = "inactivetabcontent";
    }
    tablink.className = "activetab";
    getRawObject(tablink.id + "content").className = "activetabcontent";
    if (m_menuBar.length == tab) {
        m_stormCookie.session.setCookie("~tid" + pageCnty + pageLang + pageSeg + pageCS, "myaccountMenu");
    }
    else {
        m_stormCookie.session.setCookie("~tid" + pageCnty + pageLang + pageSeg + pageCS, m_menuBar[tab].Id);
    }
    m_activeTab = tablink;
    if (url != null) {
        document.location = url;
    }
}
function TabNavActiveEvent(src) {
    if (m_timeoutCloseDelay) {
        ClearSubNavTimeOut(false);
    }
    if (m_tabContentDiv != src.id) {
        var content = getRawObject(src.id + "TabNav");
        if (content != null) {
            if (m_tabContentDiv != null) {
                TabNavInActiveClose();
            }
            m_tabContentDiv = src.id;
            if (m_activeTab.id != src.id) {
                src.className = "activetabhover";
                getRawObject(src.id + "content").className = "activetabhovercontent";
                if (m_activeTab != null) {
                    m_activeTab.style.zIndex = 1;
                }
            }
            content.style.display = "block";
        }
    }
}
function TabNavInActiveEvent(src) {
    if (!m_timeoutCloseDelay) {
        m_timeoutCloseDelay = setTimeout("TabNavInActiveClose()", 500);
    }
}
function TabNavInActiveClose() {
    var src = getRawObject(m_tabContentDiv);
    var content = getRawObject(m_tabContentDiv + "TabNav");
    if (content != null && m_tabContentDiv) {
        if (m_activeTab.id != m_tabContentDiv) {
            src.className = "inactivetab";
            getRawObject(src.id + "content").className = "inactivetabcontent";
            if (m_activeTab != null) {
                m_activeTab.style.zIndex = 2;
            }
        }
        content.style.display = "none";
        m_tabContentDiv = null;
    }
}
function SubNavEventActiveString(str) {
    SubNavEventActiveOpen(getRawObject(str));
}

function SubNavEventActive(src) {
    var id = src.attr("id");
    m_timeoutOpenDelay = setTimeout("SubNavEventActiveOpen('" + id + "')", 150);
}
function SubNavEventActiveOpen(src) {
    var obj = getRawObject(src);
    src = $j('#' + src);
    if (src == undefined) {
        return;
    }
    var id = src.attr("id");
    var link = $j('#' + id + 'link');
    var content = $j('#' + id + 'content');
    var carrot = $j('#' + id + 'carrot');
    var cell = $j('#' + id + 'cell');
    var isFirst = false;
    var isLast = false;
    var noMenu = false;
    if (m_timeoutCloseDelay) {
        ClearSubNavTimeOut(false);
    }
    if (m_tabContentDiv != id) {
        if (m_tabContentDiv != null) {
            SubNavEventInActiveClose();
        }
        m_tabContentDiv = id;
        if (src != null) {
            if (src.attr("class") == "subnavlinkcontainerfirst") {
                isFirst = true;
                src.attr("class", "subnavlinkcontainerfirstselected");
            }
            if (src.attr("class") == "subnavlinkcontainerlast") {
                isLast = true;
                src.attr("class", "subnavlinkcontainerlastselected");
            }
            if (src.attr("class") == "subnavlinkcontainerfirstnomenu") {
                isFirst = true;
				noMenu = true;
                src.attr("class", "subnavlinkcontainerfirstnomenuselected");
            }
            if (src.attr("class") == "subnavlinkcontainerlastnomenu") {
                isLast = true;
				noMenu = true;
                src.attr("class", "subnavlinkcontainerlastnomenuselected");
            }
            if (src.attr("class") == "subnavlinkcontainer") {
                src.attr("class", "subnavlinkcontainerselected");
            }
            if (src.attr("class") == "subnavlinkcontainernomenu") {
				noMenu = true;
                src.attr("class", "subnavlinkcontainernomenuselected");
            }
        }
        if (cell != null) {
            if (cell.attr("class") == "subnavlinkcell") {
				if (noMenu) {
	                cell.attr("class", "subnavlinkcellnomenuselected");
				}
				else {
	                cell.attr("class", "subnavlinkcellselected");
	            }
			}
        }
        if (link != null) {
            if (id.indexOf("undefined") > -1) {
                link.attr("class", "subnavlinknomenuselected");
            }
            else {
                link.attr("class", "subnavlinkselected");
            }
            if (carrot != null) {
                carrot.attr("src", m_imgPfx + "/images/global/brand/ui/" + (m_isAlienwareTheme ? "nxgen" : "storm80") + "/nav_up.gif");
            }
        }
        if (content != null) {
            try {
                if (Screen.AvailableWidth < (obj.offsetLeft + $j("#logocontainer").width() + (content.width() - 1) + 1) || m_mastheadWidthNextGen < (obj.offsetLeft + $j("#logocontainer").width() + (content.width() - 1) + 1) || isLast) {
                    content.css('left', obj.offsetLeft - content.width() + obj.offsetWidth + (isLast?0:1));
                }
                else {
                    if (m_isRtl && !isFirst) {
                        content.css('left', obj.offsetLeft - content.width() + obj.offsetWidth + (isLast?0:2));
                    }
                    else {
                        content.css('left', (obj.offsetLeft - (isFirst?0:1)) + "px");
                    }
                }
                if (cell != null && cell.height() != null) {
                    content.css("top", cell.height() - 3 + "px");
                }
                else {
                    content.css("top", obj.offsetTop + obj.offsetHeight - 3 + "px");
                }
                content.css("display", "block");
                content.bgiframe();
                var flyoutdata = content.html();
                if (flyoutdata != null || flyoutdata != undefined) {
                    if (flyoutdata.indexOf("uniqueplaceholderID") == -1) {
                        try {
                            var contentid = content.attr("id");
                            var contentDiv = $j('#' + contentid);
                            if (contentDiv.html().indexOf("name=\"" + id.substring(3, id.length) + "\"") == -1) {
                                if (contentid == "mh_myaccountcontent") {
                                    contentDiv.html("<div id=\"pbarcontent\" name=\"" + id.substring(3, id.length) + "\" class=\"pbarcontent\"><iframe onmouseover=\"ClearSubNavTimeOut(true);\" onmouseout=\"ClearIsIframe()\" width=\"228\" id=\"myframe\" scrolling=\"auto\" frameborder=\"0\" name=\"myframe\" src=\"" + m_pbarPfx + "/pbar/ajax.aspx?~psc=myaccount\"></iframe></div>");
                                }
                                else {
                                    AsyncXDomainIframeCall(m_pbarPfx + "/pbar/ajax.aspx?~psc=" + id.substring(3, id.length), tabcontentajax);
                                }
                            }
                        }
                        catch (e)
			            { }
                    }
                }
            }
            catch (e)
			            { }
        }
    }
}

function TerNavEventActive(src) {
    var id = src.attr("id");
    m_timeoutTerOpenDelay = setTimeout("TerNavEventActiveOpen('" + id + "')", 150);
}
function TerNavEventActiveOpen(src) {
    var obj = getRawObject(src);
    src = $j('#' + src);
    if (src == undefined) {
        return;
    }
    var id = src.attr("id");
    var content = $j('#' + id + 'subcontent');
    if (m_timeoutTerCloseDelay) {
        ClearTerNavTimeOut(false);
    }
    if (m_tabTerContentDiv != id) {
        if (m_tabTerContentDiv != null) {
            TerNavEventInActiveClose();
        }
        m_tabTerContentDiv = id;
        if (content != null) {
            try {
                content.css('left', obj.offsetWidth + "px");
                content.css("top", obj.offsetTop - 3 + "px");
                content.css("display", "block");
            }
            catch (e)
			{ }
        }
    }
}

function ClearIsIframe() {
    m_maIframe = false;
}
function ClearSubNavTimeOut(isIframe) {
    clearTimeout(m_timeoutCloseDelay);
    m_timeoutCloseDelay = null;
    m_maIframe = isIframe;
}
function ClearSubNavOpenTimeOut() {
    clearTimeout(m_timeoutOpenDelay);
    m_timeoutOpenDelay = null;
}
function ClearTerNavTimeOut(isIframe) {
    clearTimeout(m_timeoutTerCloseDelay);
    m_timeoutTerCloseDelay = null;
}
function ClearTerNavOpenTimeOut() {
    clearTimeout(m_timeoutTerOpenDelay);
    m_timeoutTerOpenDelay = null;
}
function SubNavEventInActive(src) {
    ClearSubNavOpenTimeOut();
    if (!m_timeoutCloseDelay) {
        m_timeoutCloseDelay = setTimeout("SubNavEventInActiveClose()", 500);
    }
}
function SubNavEventInActiveClose() {
    if (m_tabContentDiv && !m_maIframe) {
        var src = getRawObject(m_tabContentDiv);
        if (src) {
            var link = getRawObject(m_tabContentDiv + "link");
            var content = getRawObject(m_tabContentDiv + "content");
            var carrot = getRawObject(m_tabContentDiv + "carrot");
            var cell = getRawObject(m_tabContentDiv + "cell");
            if (src != null) {
                if (src.className == "subnavlinkcontainerfirstselected") {
                    src.className = "subnavlinkcontainerfirst";
                }
                if (src.className == "subnavlinkcontainerlastselected") {
                    src.className = "subnavlinkcontainerlast";
                }
                if (src.className == "subnavlinkcontainerfirstnomenuselected") {
                    src.className = "subnavlinkcontainerfirstnomenu";
                }
                if (src.className == "subnavlinkcontainerlastnomenuselected") {
                    src.className = "subnavlinkcontainerlastnomenu";
                }
                if (src.className == "subnavlinkcontainerselected") {
                    src.className = "subnavlinkcontainer";
                }
                if (src.className == "subnavlinkcontainernomenuselected") {
                    src.className = "subnavlinkcontainernomenu";
                }
            }
            if (cell != null) {

                if ((cell.className == "subnavlinkcellselected") || (cell.className == "subnavlinkcellnomenuselected")) {
                    cell.className = "subnavlinkcell";
                }
            }
            if (link != null) {
                if (link.className == "subnavlinkselected") {
                    link.className = "subnavlink";
                }
                else {
                    link.className = "subnavlinknomenu";
                }
                if (carrot != null) {
                    carrot.src = m_imgPfx + "/images/global/brand/ui/" + (m_isAlienwareTheme ? "nxgen" : "storm80") + "/nav_down.gif";
                }
            }
            if (content != null) {
                content.style.display = "none";
            }
            m_tabContentDiv = null;
        }
    }
}

function TerNavEventInActive(src) {
    ClearTerNavOpenTimeOut();
    if (!m_timeoutTerCloseDelay) {
        m_timeoutTerCloseDelay = setTimeout("TerNavEventInActiveClose()", 500);
    }
}

function TerNavEventInActiveClose() {
    if (m_tabTerContentDiv && !m_maIframe) {
        var src = getRawObject(m_tabTerContentDiv);
        if (src) {
            var content = getRawObject(m_tabTerContentDiv + "subcontent");
            if (content != null) {
                content.style.display = "none";
            }
            m_tabTerContentDiv = null;
        }
    }
}

function renderSubNavLinks() {
    if (m_isRtl) {
        subNavLinksAlign = "left";
    }
    else {
        subNavLinksAlign = "right";
    }
    document.write("<div style=\"width:100%\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" height=\"22\" align=\"" + subNavLinksAlign + "\"><tr>");
    for (var n = 0; n < m_pnlinks.length; n++) {
        if (n > 0) {
            document.write("<td ><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"20\" height=\"1\" alt=\"\"></td>");
        }
        var href = m_pnlinks[n].Href;
        var icon = m_pnlinks[n].Icon;
        var target = m_pnlinks[n].Target;
        if (icon && m_subNavIconsDisplay) {
            if (href != null && href.length > 0) {
                if (target != null && target.length > 0 && m_pnlinks[n].OffDell) {
                    document.write("<td valign=\"middle\"><a target =\"" + target + "\"href=\"" + href + "\"><img src=\"" + m_imgPfx + "/images/global/brand/icons/" + icon + ".gif\" border=\"0\" alt=\"\"></a></td>");
                }
                else {
                    document.write("<td valign=\"middle\"><a href=\"" + href + "\"><img src=\"" + m_imgPfx + "/images/global/brand/icons/" + icon + ".gif\" border=\"0\" alt=\"\"></a></td>");
                }
            }
            else {
                document.write("<td valign=\"middle\"><img src=\"" + m_imgPfx + "/images/global/brand/icons/" + icon + ".gif\" border=\"0\" alt=\"\"></td>");
            }
        }
        if (href != null && href.length > 0) {
            if (target != null && target.length > 0 && m_pnlinks[n].OffDell) {
                document.write("<td align=\"" + subNavLinksAlign + "\" valign=\"middle\" nowrap=\"true\"><a target =\"" + target + "\"class=\"lnk_crumb\" href=\"" + href + "\">" + m_pnlinks[n].Text + "</a></td>");
            }
            else {
                document.write("<td align=\"" + subNavLinksAlign + "\" valign=\"middle\" nowrap=\"true\"><a class=\"lnk_crumb\" href=\"" + href + "\">" + m_pnlinks[n].Text + "</a></td>");
            }
        }
        else {
            document.write("<td align=\"" + subNavLinksAlign + "\" valign=\"middle\" nowrap=\"true\" class=\"lnk_crumb\">" + m_pnlinks[n].Text + "</td>");
        }
    }
    document.write("</tr></table></div>");
}
function renderLanguageToggle() {
    document.write("<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" height=\"10\" align=\"right\"><tr>");
    document.write("<td align=\"left\" valign=\"middle\"><a href=\"" + m_langSelectorUrl + "\"><img src=\"" + m_imgPfx + "/images/global/brand/icons/" + m_langSelectorIcon + ".gif\" border=\"0\" alt=\"\"></a></td>");
    document.write("<td align=\"left\" valign=\"middle\" nowrap=\"true\"><a class=\"lnk_crumb\" href=\"" + m_langSelectorUrl + "\">" + m_langSelectorCaption + "</a></td>");
    document.write("</tr></table>");
}


function isGlobalPortal()
{
	try
	{
	var globalPortalCookie = getCookie("prt:Prof");

		if (globalPortalCookie != "undefined")
		{
			var globalPortalCookieElements = globalPortalCookie.split("&");

			if (globalPortalCookieElements != "undefined")
			{

				for (i=0; i<globalPortalCookieElements.length; i++)
				{
					var cookieElements = globalPortalCookieElements[i].split("=");
					if (cookieElements != "undefined" && cookieElements[0] == "sname" && cookieElements[1] == "Global Portal")
					{
						return true;
					}
				}
			}
		}
	}
	catch(e){}
	
	return false;

}

function renderCountrySelector() {
    document.write("<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr>");

var pgtype = isGlobalPortal();
 
	if (pgtype)
	{
		flag = "globe";
	}

    if (typeof (flag) != "undefined" && flag != null && flag.length > 0) {
        document.write("<td><img src=\"" + m_imgPfx + "/images/global/masthead/smlflags/" + flag + ".gif\" alt=\"\" border=\"0\" /><td><td><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" height=\"1\" width=\"3\" alt=\"\" /></td>");
    }
    document.write("<td nowrap=\"true\"><div id=\"localeselectorlinkdiv\" class=\"localeselectorlinkdiv\"");
    if (!m_isRcomm) {
        document.write("onclick=\"javascript:localeMenuToggle();\"  onmouseout=\"javascript:delayLocaleMenuToggle();\" onmouseover=\"javascript:localeMenuToggleDelayClear();\"");
    }
    document.write("><table cellpadding=\"0\" cellspacing=\"0\"><tr><td><div id=\"localeselectorlink\"  class=\"");
    if (!m_isRcomm) {
        document.write("localeselectorlink");
    }
    else {
        document.write("localeselectortext");
    }
    document.write("\" ></div></td></tr></table></div>");
    if (m_localeSelector != "undefined") {
        document.write("<div id=\"localeselectordivhidden\">");
        document.write(m_localeSelector);
        document.write("</div><div id=\"localeselectordiv\" class=\"localeselectorhidden\" onmouseout=\"javascript:delayLocaleMenuToggle();\" onmouseover=\"javascript:localeMenuToggleDelayClear();\"></div>");
        var sellocale = $j("#localeselectordivhidden select option[@selected]").text();
        var loctext = $j("#localeselectorlink");
        if (sellocale != null && sellocale.length > 0 && m_localeSelector.indexOf("selected=\"selected\"") != -1) {
            loctext.html(sellocale);
        }
        else {
            if (m_crumbs && m_crumbs[0]) {
                if (m_crumbs[0].Text != null && m_crumbs[0].Text.length > 0) {
                    loctext.html(m_crumbs[0].Text);
                }
            }
        }

	if (pgtype)
	{
		loctext.html("Global Portal");
	}

        $j(document).ready(function() {
            var locdiv = $j("#localeselectordiv");
            var locops = $j("#localeselectordivhidden select option");
            var locsel = $j("<select size=\"5\" onkeypress=\"if(event && event.which == 13 || event.keyCode == 13){document.location = this.options[this.selectedIndex].value; localeMenuToggle( true );}\" onClick=\"if( this.options[this.selectedIndex].value != '' ) document.location = this.options[this.selectedIndex].value;localeMenuToggle( true )\"></select>");
            locdiv.append(locsel);
            locops.each(function() {
                var op = "<option value=\"" + $j(this).attr("value") + "\"";
                if ($j(this).attr("selected") != undefined) {
                    op += " selected=\"selected\" ";
                }
                op += ">" + $j(this).text() + "</option>";
                locsel.append(op);
            });
        });
    }
    document.write("</tr></table>");
}

var _localeMenuToggleDelay = null;
function delayLocaleMenuToggle() {
    localeMenuToggleDelayClear();
    _localeMenuToggleDelay = setTimeout("localeMenuToggle(true)", 500);
}

function localeMenuToggleDelayClear() {
    if (_localeMenuToggleDelay) {
        clearTimeout(_localeMenuToggleDelay);
        _localeMenuToggleDelay = null;
    }
}

function localeMenuToggle(forceClose) {
    var locsel = $j("#localeselectordiv");
    var loclink = $j("#localeselectorlink");
    var locdiv = $j("#localeselectorlinkdiv");
    if (locsel.attr("class") == "localeselector" || forceClose) {
        locsel.attr("class", "localeselectorhidden");
        locdiv.attr("class", "localeselectorlinkdiv");
        loclink.attr("class", "localeselectorlink");
    }
    else {
        locsel.attr("class", "localeselector");
        locdiv.attr("class", "localeselectorlinkdivselected");
        loclink.attr("class", "localeselectorlinkselected");

        var obj = getRawObject("localeselectorlinkdiv");
        locsel.css("top", obj.offsetTop + obj.offsetHeight + "px");

        $j("#localeselectordiv select").focus();
    }
}

function renderMastheadCrumbs() {   
    document.write("<div class=\"para_crumb_43\">");
    for (var n = 1; n < m_crumbs.length; n++) {
        if (n > 1) {
            document.write("&nbsp;&#8250;&nbsp;");
        }
        href = m_crumbs[n].Href;
        var closeGif = "";
        if (m_crumbs[n].IsFilter) {
            closeGif = "<img style=\"padding-left:3px\" src=\"" + m_imgPfx + "/images/global/brand/icons/close.png\" alt=\"removefilter\" border=\"0\"/>&nbsp;";
        }
        if (href) {
            document.write("<a class=\"" + (((n + 1) == m_crumbs.length) ? "lnk_crumb43selected" : "lnk_crumb43") + "\" href=\"" + href + "\">" + m_crumbs[n].Text + closeGif + "</a>");
        }
        else {
            document.write("<span class=\"" + (((n + 1) == m_crumbs.length) ? "crumbsel43selected" : "crumbsel43") + "\">" + m_crumbs[n].Text + "</span>");
        }
    }
    document.write("</div>");
}

function renderMastheadCrumbsRtl() {
    document.write("<div class=\"para_crumb_43\"");
    for (var n = 1; n < m_crumbs.length; n++) {
        if (n > 1) {
            document.write("&nbsp;&#8250;&nbsp;");
        }
        href = m_crumbs[n].Href;
        var closeGif = "";
        if (m_crumbs[n].IsFilter) {
            closeGif = "<img style=\"padding-left:3px\" src=\"" + m_imgPfx + "/images/global/brand/icons/close.png\" alt=\"removefilter\" border=\"0\"/>&nbsp;";
        }
        if (href) {
            document.write("<a class=\"" + (((n + 1) == m_crumbs.length) ? "lnk_crumb43selected" : "lnk_crumb43") + "\" href=\"" + href + "\">" + closeGif + m_crumbs[n].Text + "</a>");
        }
        else {
            document.write("<span class=\"" + (((n + 1) == m_crumbs.length) ? "crumbsel43selected" : "crumbsel43") + "\">" + m_crumbs[n].Text + "</span>");
        }
    }
    document.write("</div>");
}
function renderFooterCrumbs() {
    document.write("<table width=\"100%\" cellspacing=\"0\" style=\"vertical-align: middle;border-bottom: 1px solid #EEE;\" cellpading=\"0\" height=\"25\" border=\"0\"><tr><td class=\"footercrumbcell\">");
    if (m_isRtl)
        renderMastheadCrumbsRtl();
    else
        renderMastheadCrumbs();
    document.write("</td><td align=\"right\" nowrap=\"1\">");
    if (m_isRtl)
        renderPrintEmailLinksRtl();
    else
        renderPrintEmailLinks();
    document.write("</td></tr></table>");
}
function crumbWidth(crumb) {
    var text = crumb.replace(m_crumbRegEx1, "");
    text = text.replace(m_crumbRegEx2, " ");
    var hasUnicode = false;
    for (n = 0; n < text.length; n++) {
        if (text.charCodeAt(n) > 0x1000) {
            hasUnicode = true;
            break;
        }
    }
    if (hasUnicode) {
        return text.length * m_avgChW;
    }
    else {
        if (m_largeFont) {
            return text.length * 8;
        }
        else {
            return text.length * 6;
        }
    }
}
function renderPrintEmailLinks() {
    if (m_printLink || m_emailLink || m_helpLink) {
        document.write("<span style=\"padding-right:10px;\">");
        if (m_emailLink) {
            var m_emailsubject = document.title;
            if (typeof (m_emailSubject) != "undefined" && m_emailSubject != null && m_emailSubject.length > 0) {
                m_emailsubject = m_emailSubject;
            }
            var emailUrl = "javascript:void(document.location.href=" + "'mailto:?subject=" + m_emailsubject + "&body=" + document.location.href.replace(/%26/g, '%2526').replace(/&/g, '%2526') + "')";
            document.write("<span style=\"vertical-align:middle;\"><a href=\"" + emailUrl + "\"><img src=\"" + m_imgPfx + "/images/global/brand/icons/email.gif\" border=\"0\" alt=\"" + m_emailText + "\" /></a></span>");
            document.write("<span class=\"para_small\" style=\"text-align:right;vertical-align:middle;white-space:nowrap;\"><a class=\"lnk_small\" href=\"" + emailUrl + "\">" + m_emailText + "</a></span>");
        }
        if (m_printLink) {
            if (m_emailLink) {
                document.write("<span class=\"mhSpace\">|</span>");
            }
            document.write("<span style=\"vertical-align:middle;\"><a href=\"" + m_printLink + "\"><img src=\"" + m_imgPfx + "/images/global/brand/icons/print.gif\" border=\"0\" alt=\"" + getPrintableText() + "\" /></a></span>");
            document.write("<span class=\"para_small\" style=\"text-align:right;vertical-align:middle;white-space:nowrap;\"><a class=\"lnk_small\" href=\"" + m_printLink + "\">" + getPrintableText() + "</a></span>");
        }
        if (m_helpLink) {
            if (m_printLink || m_emailLink) {
                document.write("<span class=\"mhSpace\">|</span>");
            }
            document.write("<span><a href=\"" + m_helpLink + "\"><img src=\"" + m_imgPfx + "/images/global/brand/icons/help2.gif\" border=\"0\" alt=\"" + m_helpText + "\" /></a></span>");
            document.write("<span class=\"para_small\" style=\"text-align:right;vertical-align:middle;white-space:nowrap;\"><a class=\"lnk_small\" href=\"" + m_helpLink + "\">" + m_helpText + "</a></span>");
        }
        document.write("</span>");
    }
}
function renderPrintEmailLinksRtl() {
    if (m_printLink || m_emailLink || m_helpLink) {
        document.write("<div style=\"padding-right:10px;clear:both\">");
        if (m_emailLink) {
            var m_emailsubject = document.title;
            if (typeof (m_emailSubject) != "undefined" && m_emailSubject != null && m_emailSubject.length > 0) {
                m_emailsubject = m_emailSubject;
            }
            var emailUrl = "javascript:void(document.location.href=" + "'mailto:?subject=" + m_emailsubject + "&body=" + document.location.href.replace(/%26/g, '%2526').replace(/&/g, '%2526') + "')";
            document.write("<div class=\"para_small\" style=\"text-align:right;vertical-align:middle;white-space:nowrap;float:left;padding-top:5px\"><a class=\"lnk_small\" href=\"" + emailUrl + "\">" + m_emailText + "</a></div>");
            document.write("<div style=\"vertical-align:middle;float:left\"><a href=\"" + emailUrl + "\"><img src=\"" + m_imgPfx + "/images/global/brand/icons/email.gif\" border=\"0\" alt=\"" + m_emailText + "\" /></a></div>");
        }
        if (m_printLink) {
            if (m_emailLink) {
                document.write("<div class=\"mhSpace\" style=\"float:left\" >|</div>");
            }
            document.write("<div class=\"para_small\" style=\"text-align:right;vertical-align:middle;white-space:nowrap;float:left;padding-top:5px\"><a style=\"valign:center\" class=\"lnk_small\" href=\"" + m_printLink + "\">" + getPrintableText() + "</a></div>");
            document.write("<div style=\"vertical-align:middle;float:left\"><a href=\"" + m_printLink + "\"><img src=\"" + m_imgPfx + "/images/global/brand/icons/print.gif\" border=\"0\" alt=\"" + getPrintableText() + "\" /></a></div>");
        }
        if (m_helpLink) {
            if (m_emailLink) {
                document.write("<div class=\"mhSpace\">|</div>");
            }
            document.write("<div class=\"para_small\" style=\"text-align:right;vertical-align:middle;white-space:nowrap;float:left;padding-top:5px\"><a class=\"lnk_small\" href=\"" + m_helpLink + "\">" + m_helpText + "</a></div>");
            document.write("<div style=\"float:left\" ><a href=\"" + m_helpLink + "\"><img src=\"" + m_imgPfx + "/images/global/brand/icons/help.gif\" border=\"0\" alt=\"" + m_helpText + "\" /></a></div>");
        }
        document.write("</div>");
    }
}
function writeFooterStart() {
    var width = (m_mhFixed ? (m_mastheadWidth + "px") : "100%");
    //document.write( "<div style=\"width:" + width + ";padding-top:10px;\">");
    document.write("<div style=\"width:100%;\">");
    if (typeof (m_pageTheme) != "undefined") {
        if (m_pageTheme != null && m_pageTheme.length > 0) {
            document.write("<div style=\"clear:left;\"><img src=\"");
            document.write(m_pageTheme);
            document.write("\" border=\"0\" alt=\"\" /></div>");
        }
    }
    if (m_crumbs) {
        renderFooterCrumbs();
    }
    document.write("</div>");
}
function writeFooterBegin() {
    writeFooterStart();
}
function writeFooterClose() {
}
function menuRef(id, text, href, items, target) {
    menuRef(id, text, href, items, target, false);
}
function menuRef(id, text, href, items, target, selected, column) {
    this.Id = id;
    this.Text = text;
    this.Href = mhFixupLink(href, "&~ck=mn");
    this.IsSeparator = false;
    this.IsCaption = false;
    this.MenuItems = items;
    this.IsSelectedTab = false;
    this.Column = column;
    if (selected == true) {
        this.IsSelectedTab = true;
    }
    this.OffDell = false;
    this.TargetHtml = m_stdEmpty;
    if ((typeof (target) != "undefined") && target) {
        this.OffDell = (target == "offdell");
        this.TargetHtml = " target=\"" + target + "\"";
    }
}
function menuItem(text, href, target, icon, column) {
    this.Text = text;
    this.Href = mhFixupLink(href, "&~ck=mn");
    this.IsSeparator = false;
    this.IsCaption = false;
    this.IconUrl = icon;
    this.MenuItems = null;
    this.Column = column;
    this.OffDell = false;
    this.TargetHtml = m_stdEmpty;
    if ((typeof (target) != "undefined") && target) {
        this.OffDell = (target == "offdell");
        this.TargetHtml = " target=\"" + target + "\"";
    }
}
function menuCaption(text) {
    this.Text = text;
    this.Href = null;
    this.IsSeparator = false;
    this.IsCaption = true;
    this.MenuItems = null;
}
function menuSep() {
    this.IsSeparator = true;
    this.IsCaption = false;
}
function searchType(caption, value, selected) {
    this.Caption = caption;
    this.Value = value;
    this.Selected = selected;
}
function addSearchType(caption, value, selected) {
    if (!m_searchTypes) {
        m_searchTypes = new Array();
    }
    m_searchTypes[m_searchTypes.length] = new searchType(caption, value, selected);
}
function mhLink(text, href, icon, extra, isFilter) {
    href = mhFixupLink(href, extra);
    this.Text = text;
    this.Href = href;
    this.Icon = icon;
    this.IsFilter = isFilter;
}
function mhLink(text, href, icon, extra, isFilter, target) {
    href = mhFixupLink(href, extra);
    this.Text = text;
    this.Href = href;
    this.Icon = icon;
    this.IsFilter = isFilter;
    this.Target = target;
    if (target == 'offdell') {
        this.OffDell = true;
    }
    else {
        this.OffDell = false;
    }
}
function addPnLink(text, href, icon) {
    if (!m_pnlinks) {
        m_pnlinks = new Array();
    }
    m_pnlinks[m_pnlinks.length] = new mhLink(text, href, icon, "&~ck=pn");
}
function addPnLink(text, href, icon, target) {
    if (!m_pnlinks) {
        m_pnlinks = new Array();
    }

    m_pnlinks[m_pnlinks.length] = new mhLink(text, href, icon, "&~ck=pn", '', target);
}
function addCrumb(text, href, isFilter) {
    if (!m_crumbs) {
        m_crumbs = new Array();
    }
    m_crumbs[m_crumbs.length] = new mhLink(text, href, null, "&~ck=bt", isFilter);
}
var delayMin = null;
var delayMax = null;
var currentID = null;
function flyoutopen(id, width) {
    try {

        if (currentID != id) {
            isbloating = true;
            var isfromaddtocart = false;
            m_id = id;
            if (id == "carttemp") {
                isfromaddtocart = true;
                id = "cart";

                if (totalcartquantity > 0) {
                    var link = document.getElementById("totalcartitems");
                    if (link != null) {
                        link.innerHTML = totalcartquantity;
                    }
                }
            }
            var link = document.getElementById("flyout" + id + "link");
            var body = document.getElementById("flyout" + id + "body");
            var offset = document.getElementById("flyout" + id + "offset");
            width = offset.offsetWidth > width ? offset.offsetWidth : width;
            body.style.top = offset.offsetTop + offset.offsetHeight - 1;
            linky = getRawObject("pbarcontainer");
            var flyoutwidth;
            if (id == "cart") {
                flyoutwidth = linky.offsetLeft + width + 21;
            }
            else {
                flyoutwidth = linky.offsetLeft + linky.offsetWidth - offset.offsetWidth + width + 21;
            }
            if (Screen.AvailableWidth < flyoutwidth) {
                body.style.width = width - 2;
                body.style.left = offset.offsetLeft - width + offset.offsetWidth;
            }
            else {
                body.style.width = width - 2;
                body.style.left = offset.offsetLeft;
            }
            link.className = "fo" + id + "linkmax";
            body.className = "fo" + id + "bodymax";
            body.style.overflow = "visible";
            offset.className = "fo" + id + "offsetmax";
            currentID = id;
            var ticks = new Date();
            if (m_pbarContentDiv != ("flyout" + id + "body")) {
                try {
                    m_pbarContentDiv = "flyout" + id + "body";

                    var flyoutDiv = getRawObject(m_pbarContentDiv);
                    if (isfromaddtocart) {

                        flyoutDiv.innerHTML = cartcontent;
                        m_fromAddToCart = true;
                    }

                    else {
                        if (flyoutDiv.innerHTML.indexOf("name=\"" + id + "\"") == -1) {
                            if (m_pbarContentDiv == "flyoutmyaccountbody") {
                                flyoutDiv.innerHTML = "<div id=\"pbarcontent\" name=\"" + id + "\" class=\"pbarcontent\"><iframe onmouseout=\"javascript:flyoutmin('myaccount')\" onmouseover=\"javascript:flyoutminclear()\" width=\"228\" id=\"myframe\" scrolling=\"auto\" frameborder=\"0\" name=\"myframe\" src=\"" + m_pbarPfx + "/pbar/ajax.aspx?~psc=myaccount\"></iframe></div>";
                            }
                            else if (m_pbarContentDiv == "flyouttoolboxbody") {
                                // No ajax needed toolbox loaded from menudef
                            }
                            else {
                                ispaging = false;
                                AsyncXDomainIframeCall(m_pbarPfx + "/pbar/ajax.aspx?~psc=" + id, pbarcontentajax);


                            }
                        }
                        m_fromAddToCart = false;
                    }
                }
                catch (e) {
                    //alert(e);

                }
            }

            growIt(id);
        }

    }
    catch (e)
{ }
}

var doneGrowing = false;
var toolboxHeight = 0;
// called to initiate growing an element
function growIt(id) {

    var offset = document.getElementById("flyout" + id + "offset");
    offset.className = "fo" + id + "offsetmax";

    isbloating = true;
    m_id = id;

    var body = getRawObject("flyout" + id + "body");
    if (body == null) {
        isbloated = false;
        isbloating = false;
        return;
    }
    body.style.height = "1px";
    body.style.overflow = "hidden";
    increment = 0;
    ContainerHeight = body.scrollHeight;
    toolboxHeight = body.scrollHeight;
    doneGrowing = false;
    doGrow(body);
    $j("#flyout" + id + "body").bgiframe();
}

// inner loop for growing an object
function doGrow(body) {
    if (body.id == "flyouttoolboxbody" && $j.browser.msie && parseInt($j.browser.version) == 7) {
        ContainerHeight = toolboxHeight; // In IE7 not sure why but ContainerHeight is not retaining the scrollHeight set in growIt for toolbox flyout so added this hack for now
    }
    try {
        if (ContainerHeight - increment >= 15) {
            if (increment < ContainerHeight) {
                increment = increment + 15;
                body.style.height = increment + "px";
                intShow = setTimeout(function() { doGrow(body) }, 0);
            }
            else {
                doneGrowing = true;
            }
        }
        else if (ContainerHeight - increment > 0) {
            var diff = ContainerHeight - increment;
            increment = increment + diff;
            body.style.height = increment + "px";
            intShow = setTimeout(function() { doGrow(body) }, 0);
        }
        else {
            doneGrowing = true;
        }

        if (doneGrowing == true) {
            if (m_fromAddToCart != true) {
                body.style.overflow = "visible";
            }
            isbloated = true;
            isbloating = false;

            window.clearTimeout(intShow);
            doneGrowing == false;
        }


    }
    catch (e) {

    }

}

var doneShrinking = false;

// called to initiate shrinking an element
function shrinkIt(id, clear) {


    if (isbloated) {

        if (!isclosing) {

            ContainerHeight = increment;
            if (ispaging == true) {
                var body = getRawObject("flyout" + m_id + "body");
                ContainerHeight = body.scrollHeight;
            }
            if (ContainerHeight > 1) {
                isclosing = true;
                currentID = null;
                shrink = ContainerHeight;
                window.clearTimeout(intShow);

                doneShrinking = false;
                intHide = setTimeout(function() { doShrink(id, clear) }, 0);

            }
            else {
                isbloated = false;
                isbloating = false;
                isclosing = false;
                window.clearTimeout(intHide);
                flyoutclose(id, true);

                if (clear) {
                    body.innerHTML = "<div id=\"loading\" style=\"font-family:arial;font-size:9pt;padding:10px;\">" + m_LoadingCaption + "</div>";
                }
            }
        }
    }
    else {
        isbloated = false;
        isbloating = false;
    }
}

var isclosing = false;

// inner loop for shrinking an object
function doShrink(id, clear) {
    var body = getRawObject("flyout" + m_id + "body");
    body.style.overflow = "hidden";
    if (shrink > 10) {

        shrink = shrink - 15;

        if (shrink > 0) {
            body.style.height = shrink + "px";
            intHide = setTimeout(function() { doShrink(id, clear) }, 0);
        }
        else {
            doneShrinking = true;
        }


    }
    else {
        doneShrinking = true;
    }

    if (doneShrinking == true) {

        isbloated = false;
        isbloating = false;
        isclosing = false;
        window.clearTimeout(intHide);
        flyoutclose(m_id, true);

        if (clear) {
            body.innerHTML = "<div id=\"loading\" style=\"font-family:arial;font-size:9pt;padding:10px;\">" + m_LoadingCaption + "</div>";
        }

    }

}

function flyoutclear() {
    flyoutminclear();
}
function flyoutminclear() {
    if (delayMin) {
        clearTimeout(delayMin);
        delayMin = null;
    }
}
function flyoutmaxclear() {
    if (delayMax) {
        clearTimeout(delayMax);
        delayMax = null;
    }
}

var focusFound = false;
function FireOnFocus(e) {

    focusFound = true;
}

function FireOnBlur(e) {
    focusFound = false;
}


function flyoutmin(id) {
    if (blockcollapse == true) {
        return;
    }
    if (m_fromAddToCart == false) {
        flyoutmaxclear();
        //delayMin = setTimeout( "flyoutclose('" + id + "',true)", 500 );
        if (isbloated == true) {

            if (id == "myaccount") {


                try {

                    var myFrame = window.frames["myframe"];

                    if (myFrame != null) {

                        var frameDoc = myFrame.document;

                        if (frameDoc != null) {
                            var emailControl = frameDoc.forms[0].email;
                            if (emailControl != null) {
                                if (window.addEventListener) {
                                    emailControl.addEventListener("focus", FireOnFocus, false);
                                    emailControl.addEventListener("blur", FireOnBlur, false);
                                }
                                else {
                                    emailControl.attachEvent("onfocus", FireOnFocus);
                                    emailControl.attachEvent("onblur", FireOnBlur);
                                }
                            }
                            var passwordControl = frameDoc.forms[0].password;
                            if (passwordControl != null) {
                                if (window.addEventListener) {

                                    passwordControl.addEventListener("focus", FireOnFocus, false);
                                    passwordControl.addEventListener("blur", FireOnBlur, false);
                                }
                                else {
                                    passwordControl.attachEvent("onfocus", FireOnFocus, false);
                                    passwordControl.attachEvent("onblur", FireOnBlur, false);
                                }
                            }
                        }
                    }
                }
                catch (e)
                    { }

                if (focusFound) {
                    return;
                }


            }
            delayMin = setTimeout("shrinkIt('" + id + "',false)", 500);
        }
    }


}



var inflyoutmax = false;

function flyoutmax(id, width) {

    inflyoutmax = true;
    isaddingtocart = false;
    flyoutminclear();
    if ((isbloated == false) && (isbloating == false)) {


        if (currentID != id && currentID != null) {


            flyoutclose(currentID, false);
        }
        currentID = null;

        delayMax = setTimeout("flyoutopen('" + id + "','" + width + "')", 0);
    }
    else {
        if (m_fromAddToCart) {
            return;
        }
        if (id != m_id) {


            shrinkIt(id, false);
            setTimeout("flyoutmax('" + id + "','" + width + "')", 250);

        }
        //	        else
        //	        {
        //	            isbloating = false;
        //	        }
    }


}
function flyoutclose(id, clear) {
    try {

        var link = document.getElementById("flyout" + id + "link");
        var body = document.getElementById("flyout" + id + "body");
        var offset = document.getElementById("flyout" + id + "offset");
        link.className = "fo" + id + "linkmin";
        body.className = "fo" + id + "bodymin";
        offset.className = "fo" + id + "offsetmin";
        m_pbarContentDiv = null;
        if (clear) {
            currentID = null;
        }
    }
    catch (e)
{ }
}
function pbarstripajax(event) {
    if (event.Status == "OK" && event.Response != "false" && event.Response.length > 0) { // OK we have the cookie set so lets get the new values for the first render
        m_pbarMA.IsAuthenticated = getCookie("GAAuth") ? true : false;
        m_pbarMA.IsCookied = getCookie("chm:TP") ? true : false;
        m_pbarMA.FirstName = m_pbarMA.IsCookied ? getCookieKeyValue("chm:TP", "fn", true) : m_pbarMA.FirstName;
        renderPbarStrip();
    }
}
function pbarnavajax(event) {

    if (event.Status = "OK" && event.Response != "false" && event.Response.length > 0) {
        link = getRawObject("subnav");
        link.innerHTML = event.Response;
        bindMastHeadFlyouts();
    }
}
function pbarcontentajax(event) {
    if (event.Status = "OK" && m_pbarContentDiv && event.Response != "false" && event.Response.length > 0) {
        if (m_id == "cart") {
            link = getRawObject(m_pbarContentDiv);
            link.innerHTML = event.Response;


            try {
                var divs = link.getElementsByTagName("div");
                for (var i = 0; i < divs.length; i++) {
                    if (divs[i].className == "productImage") {
                        var imgUrl = divs[i].getElementsByTagName("img")[0].src;
                        var pos = imgUrl.indexOf("op=");
                        if (pos > -1) {
                            var imageID = imgUrl.substring(pos + 3, imgUrl.length);
                            divs[i].getElementsByTagName("img")[0].src = "http://accessories.us.dell.com/sna/images/products/thumbnail/" + imageID + ".jpg";
                            "http://accessories.us.dell.com/sna/images2/resize.aspx/" + imageID;
                        }
                    }

                    if (divs[i].className == "productDesc") {

                        var proddiv = divs[i];

                        var dspan = proddiv.getElementsByTagName("span")[1];

                        if (dspan.innerHTML == "0.00") {

                            dspan.style.display = "none";
                            var zeroDisc = new String(proddiv.innerHTML.replace(/<BR>/i, ""));
                            proddiv.innerHTML = zeroDisc;

                        }
                    }
                }
            }
            catch (ex)
	    { }
            m_cartPages[m_cartPages.length] = link.innerHTML;
            var cartBody = getRawObject(m_pbarContentDiv);
            cartBody.style.height = "1px";
            cartBody.style.overflow = "hidden";

            cartBody.style.height = cartBody.scrollHeight;
            ContainerHeight = cartBody.scrollHeight;

            if (ispaging == false) {
                growIt("cart");
            }
        }

    }

}



function tabcontentajax(event) {
    if (event.Status = "OK" && m_tabContentDiv && event.Response != "false" && event.Response.length > 0) {
        link = getRawObject(m_tabContentDiv + "content");
        link.innerHTML = event.Response;
    }
}
var ispaging = false;

function cartPaging(idx) {
    try {
        ispaging = true;
        if (typeof (m_cartPages[idx]) != "undefined") {
            link = getRawObject(m_pbarContentDiv);
            link.innerHTML = m_cartPages[idx];
            var cartBody = getRawObject(m_pbarContentDiv);
            cartBody.style.height = "1px";
            cartBody.style.overflow = "hidden";
            cartBody.style.height = cartBody.scrollHeight;
            ContainerHeight = cartBody.scrollHeight;

        }
        else {
            var content = "cart";
            if (m_pbarContentDiv.indexOf("flyout") >= 0) {
                content = m_pbarContentDiv.substring(6, m_pbarContentDiv.indexOf("body"));
            }
            if (m_pbarContentDiv.indexOf("mh_") >= 0) {
                content = m_pbarContentDiv.substring(3, m_pbarContentDiv.indexOf("content"));
            }

            AsyncXDomainIframeCall(m_pbarPfx + "/pbar/ajax.aspx?~psc=" + content + "&~cix=" + idx, pbarcontentajax);
        }

        //		        var cartBody = getRawObject( m_pbarContentDiv );
        //		        alert(cartBody.scrollHeight);

    }
    catch (e)
    { }
}
function maLogout() {
    for (formIdx = 0; formIdx < document.forms.length; formIdx++) {
        if ("myaccountlogout" == document.forms[formIdx].name) {
            var curUrl = document.location.href;
            var logOutIdx = curUrl.indexOf("&~myaccountlogin=true");
            if (logOutIdx > -1) {
                document.forms[formIdx].action = curUrl.substring(0, logOutIdx);
            }
            document.forms[formIdx].submit();
        }
    }
}

function maLinkLogout() {
    try {
        document.cookie = "chm:TP=" + escape("null") + ";path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;domain=.dell.com";
        document.cookie = "Profile=" + escape("null") + ";path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;domain=.dell.com";
        document.cookie = "GAHot=" + escape("null") + ";path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;domain=.dell.com";
        var url = m_pbarPfx + "/pbar/login.aspx?~logout=true";
        $j.getScript(url, logoutajax);
    }
    catch (e)
{ }
}

function logoutajax(event) {
    window.location.reload();
}

function maLink(href) {
    window.parent.location = href;
}
function maEnterSubmit(event) {
    if (event && event.which == 13 || event.keyCode == 13)
        maLoginValidation();
    else
        return true;
}
function maLoginValidation() {
    var myAccntLogin = "myaccountlogin";
    for (formIdx = 0; formIdx < document.forms.length; formIdx++) {
        if (myAccntLogin == document.forms[formIdx].name) {
            myAccntLogin = document.forms[formIdx];
            break;
        }
    }
    var email = myAccntLogin.email;
    var emailDiv = document.getElementById("emailDiv");
    var password = myAccntLogin.password;
    var passwordDiv = document.getElementById("passwordDiv");
    if (email.value.length != 0 && password.value.length != 0) {
        var actionUrl = document.location.href;
        try {
            myAccntLogin.submit();
        }
        catch (e) {
            alert(e);
        }
    }
    else {
        emailDiv.style.display = "none";
        passwordDiv.style.display = "none";
    }
    if (email.value.length == 0) {
        emailDiv.style.display = "block";
    }
    if (password.value.length == 0) {
        passwordDiv.style.display = "block";
    }
    if (email.value.length == 0 || password.value.length == 0) {
        try {

            window.parent.setMAIframeHeight(document.getElementById("myaccountpage").offsetHeight);
        }
        catch (e)
	{ }
    }
}
function ToolBox(caption, menuItems, width, iconUrl) {
    this.Caption = caption;
    this.MenuItems = menuItems;
    this.IconUrl = iconUrl;
    this.Width = width;
    this.Render = ToolBoxRender;
}

function renderToolBox() {
    if (m_toolBoxLinks != undefined) {
        try { document.write(m_toolBoxLinks.Render()); }
        catch (ex) { alert(ex); }
    }
}
function renderPbarStrip() {
    var strip = getRawObject("pbarstripcontainer");
    var content;
    if (m_pbarStripContent) {
        strip.innerHTML = m_pbarStripContent;
    }
    else {
        if (m_pbarCart != undefined || m_pbarMA != undefined || m_toolBoxLinks != undefined) {
            content = "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr>";

            if (m_pbarMA != undefined) {
                try { content += m_pbarMA.Render(); }
                catch (ex) { alert(ex); }
            }
            if (m_pbarCart != undefined) {
                try { content += m_pbarCart.Render(); }
                catch (ex) { alert(ex); }
            }
            content += "</tr></table>";
            strip.innerHTML = content;
        }
    }
}
function ToolBox(caption, menuItems, width, iconUrl) {
    this.Caption = caption;
    this.MenuItems = menuItems;
    this.IconUrl = iconUrl;
    this.Width = width;
    this.Render = ToolBoxRender;
}
function ToolBoxRender() {
    var nav;
    m_LoadingCaption = this.LoadingCaption;
    nav = "<td valign=\"top\"><div id=\"flyouttoolboxlink\" class=\"fotoolboxlinkmin\" onmouseout=\"javascript:flyoutmin('toolbox')\" onmouseover=\"javascript:flyoutmax('toolbox', " + this.Width + ")\" >"
	    + "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr>"
        + "<td nowrap=\"true\"><span class=\"toolboxcaption\">" + this.Caption + "</span></td>"
        + "</tr></table></div><div id=\"flyouttoolboxoffset\" class=\"fotoolboxoffsetmin\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" height=\"1\" /></div>"
	    + "<div style=\"width:" + this.Width + "px;\" id=\"flyouttoolboxbody\" name=\"flyouttoolboxbody\" class=\"fotoolboxbodymin\" onmouseout=\"javascript:flyoutmin('toolbox')\" onmouseover=\"javascript:flyoutclear()\"><div style=\"padding:10px;\">";
    if (this.MenuItems != null && this.MenuItems.length > 0) {
        for (var i = 0; i < this.MenuItems.length; i++) {
            if (this.MenuItems[i].IsSeparator) {
                nav += "<div class=\"toolbox_divide\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" height=\"5\" /></div>";
            }
            else if (this.MenuItems[i].IsCaption) {
                nav += "<div class=\"toolbox_caption\">" + this.MenuItems[i].Text + "</div>";
            }
            else {
                if (this.MenuItems[i].MenuItems != null && this.MenuItems[i].MenuItems.length > 0) {
                    // Expand +/- Link
                    nav += "<a href=\"#\" onclick=\"toolBoxToggle('" + i + "', event||window.event);\"><div id=\"tnav_" + i + "\" class=\"toolbox_link_expand\">" + this.MenuItems[i].Text + "</div></a><div id=\"tnav_" + i + "_sub\" style=\"display:none;\">";
                    for (var s = 0; s < this.MenuItems[i].MenuItems.length; s++) {
                        // No icon sub links
                        nav += "<a  href=\"" + this.MenuItems[i].MenuItems[s].Href + "\"" + this.MenuItems[i].MenuItems[s].TargetHtml + "\"><div class=\"toolbox_link_sub\">" + this.MenuItems[i].MenuItems[s].Text;
                        if (this.MenuItems[i].MenuItems[s].OffDell) {
                            nav += m_stdOffImg;
                        }
                        nav += "</div></a>";
                    }
                    nav += "</div>";
                }
                else {
                    // Normal Arrow Link
                    nav += "<a  href=\"" + this.MenuItems[i].Href + "\"" + this.MenuItems[i].TargetHtml + "\"><div class=\"toolbox_link\">" + this.MenuItems[i].Text;
                    if (this.MenuItems[i].OffDell) {
                        nav += m_stdOffImg;
                    }
                    nav += "</div></a>";
                }
            }
        }
    }
    nav += "</div></div></td>";

    return nav;
}

function toolBoxToggle(id, e) {
    if (e.preventDefault)
        e.preventDefault();
    else
        e.returnValue = false;

    var nav = document.getElementById("tnav_" + id);
    var subnav = document.getElementById("tnav_" + id + "_sub");
    if (subnav.style.display == "none") {
        nav.className = "toolbox_link_collapse";
        subnav.style.display = "inline";
    }
    else {
        nav.className = "toolbox_link_expand";
        subnav.style.display = "none";
    }
    var body = getRawObject("flyouttoolboxbody");
    body.style.height = "1px";
    if (!$j.browser.msie) { body.style.overflow = "hidden" };
    body.style.height = body.scrollHeight;
    ContainerHeight = body.scrollHeight;
}
function PbarCartStrip(caption, link, items, load, count, flyout) {
    this.Caption = caption;
    this.Link = link;
    this.ItemsCaption = items;
    this.LoadingCaption = load;
    this.Count = count;
    this.IsFlyout = flyout;
    this.Render = PbarCartStripRender;
}

function PbarCartStripRender() {
    var ie = "height:16px;width:20px;top:0px; _top:0; *top:0;-vertical-align:bottom;";

    var style = "";
    var ieCount = "position:relative;font-weight:normal;text-align:left;top:1px;";
    var isMSIE = navigator.userAgent.toLowerCase().indexOf("msie") > 0;
    var aStyle = "style=\"color:#0085C3;\"";

    if (!isMSIE) {
        ie = "height:16px;width:20px;top:-2px; _top:0; *top:0;-vertical-align:bottom;";
    }

    style = "style=\"position:relative;cursor:pointer;" + ie + "\"";

    var shoppingCartPosition = "style=\"position:relative;top:-3px;\"";

    var cartImage = "<img src=\"" + m_imgPfx + "/images/global/icons/img_cart_blue.jpg\" style=\"margin-right:3px;Border:0;\" />";
    var cartBubble = ((this.Count > 0) && (this.IsFlyout || (this.Link != null)) ? ("<span id=\"totalcartitems\" " + style + (this.Count > 9 ? "class=\"largecount\"" : "class=\"smallcount\"") + ">" + "<span style=" + ieCount + ">" + this.Count + "</span></span>") : "");
    var captionWithImage = cartImage + this.Caption + cartBubble;
    var content;
    m_LoadingCaption = this.LoadingCaption;
    content = "<td id=\"stormPbar\"><div id=\"flyoutcartlink\" class=\"focartlinkmin\" " + shoppingCartPosition + (this.IsFlyout ? "onmouseout=\"javascript:flyoutmin('cart')\" onmouseover=\"javascript:flyoutmax('cart', 250)\"" : "") + ">"
	    + "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr>";
    content += "<td nowrap=\"true\"><span style=\"vertical-align:middle;\">" + (((this.Link == null) || this.IsFlyout) ? "" : "<a href=\"" + this.Link + "\" " + aStyle + ">") + captionWithImage + (((this.Link == null) || this.IsFlyout) ? "" : "</a>") + "</span></td></tr></table></div><div id=\"flyoutcartoffset\" class=\"focartoffsetmin\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" height=\"1\" /></div>"
	    + "<div style=\"width:250px;\" id=\"flyoutcartbody\" name=\"flyoutcartbody\" class=\"focartbodymin\" onmouseout=\"javascript:flyoutmin('cart')\" onmouseover=\"javascript:flyoutclear()\"><div id=\"loading\" style=\"font-family:arial;font-size:9pt;padding:10px;\">" + this.LoadingCaption + "</div></div></td>";
    return content;
}

var m_LoadingCaption = "Loading";
function PbarMAStrip(captionCookied, captionAuth, captionUnauth, clearUser, auth, cookied, fname, lname, load, flyout, modaltitle) {
    this.IsAuthenticated = auth;
    this.IsCookied = cookied;
    this.FirstName = fname;
    this.LastName = lname;
    this.CaptionClearUser = "<a href=\"javascript:maLinkLogout();\" class=\"para_small\" style=\"font-weight:normal;\" target=\"_self\">" + clearUser + "</a>";
    this.CaptionCookied = captionCookied;
    this.CaptionAuth = captionAuth;
    this.CaptionUnauth = captionUnauth;
    this.LoadingCaption = load;
    this.IsFlyout = flyout;
    this.ModalTitle = modaltitle;
    this.Render = PbarMAStripRender;
}
function PbarMAStripRender() {
    var content;
    content = "<td id=\"stormPbar\">";
    if (this.IsAuthenticated && this.FirstName != null && this.FirstName.length > 0) {
        this.CaptionAuth = "<span class=\"hellouser\">" + this.CaptionAuth.replace(/{clearuser}/g, ("<span class=\"clearuser\">" + this.CaptionClearUser + "</span>")).replace(/{fname}/g, this.FirstName).replace(/{lname}/g, this.LastName) + "</span>";
        var myacctcaption = (!this.IsFlyout && m_myAccountLink != null) ? ("<a href=\"" + m_myAccountLink + "\">" + this.CaptionAuth + "</a>") : this.CaptionAuth;
        content += "<div id=\"flyoutmyaccountlink\" class=\"fomyaccountlinkmin\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td nowrap=\"true\" class=\"para_small\">" + myacctcaption + "</td></tr></table></div><div id=\"flyoutmyaccountoffset\" class=\"fomyaccountoffsetmin\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" height=\"1\" /></div>";
    }
    else if (this.IsCookied && this.FirstName != null && this.FirstName.length > 0) {
        this.CaptionCookied = "<span class=\"hellouser\">" + this.CaptionCookied.replace(/{clearuser}/g, ("<span class=\"clearuser\">" + this.CaptionClearUser + "</span>")).replace(/{fname}/g, this.FirstName).replace(/{lname}/g, this.LastName) + "</span>";
        var myacctcaption = (!this.IsFlyout && m_myAccountLink != null) ? ("<a href=\"" + m_myAccountLink + "\">" + this.CaptionCookied + "</a>") : this.CaptionCookied;
        content += "<div id=\"flyoutmyaccountlink\" class=\"fomyaccountlinkmin\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td nowrap=\"true\" class=\"para_small\">" + myacctcaption + "</td></tr></table></div><div id=\"flyoutmyaccountoffset\" class=\"fomyaccountoffsetmin\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" height=\"1\" /></div>";
    }
    else {
        content += "<div id=\"flyoutmyaccountlink\" class=\"fomyaccountlinkmin\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td nowrap=\"true\" class=\"para_small\"><span class=\"pbarlink\" onclick=\"stormModal.showLogin({title:'" + this.ModalTitle + "',authLevel:3});\">" + this.CaptionUnauth + "</span></td></tr></table></div><div id=\"flyoutmyaccountoffset\" class=\"fomyaccountoffsetmin\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" height=\"1\" /></div>";
    }
    content += "<div style=\"width:250px;\" id=\"flyoutmyaccountbody\" class=\"fomyaccountbodymin\"><div id=\"loading\" style=\"font-family:arial;font-size:9pt;padding:10px;\">" + this.LoadingCaption + "</div></div></td>";
    return content;
}

function ClientVars() {
    this.Bandwidth = Bandwidth();
    this.FlashVersion = SetFlashVersion();
    m_stormCookie.session.setCookie("bandwidth", this.Bandwidth);
    m_stormCookie.session.setCookie("flashversion", this.FlashVersion);
}

function SetFlashVersion() {
    var flashversion = 0;
    var MSDetect = false;
    if (navigator.plugins && navigator.plugins.length) {
        x = navigator.plugins["Shockwave Flash"];
        if (x) {
            if (x.description) {
                y = x.description;
                //var digit1 = y.charAt(y.indexOf('.')- 1);
                //var digit2 = y.charAt(y.indexOf('.') - 2);
                //return digit2 + digit1;
                //var reg = "/^-?\d+(\.\d+)?$/";
                var reg = ("\\d+"); //match the first set of integers w/o the decimal for version
                var matches = new RegExp(reg).exec(y);
                if (matches[0]) {
                    return matches[0];
                }
                else {
                    return y.charAt(y.indexOf('.') - 1);
                }
            }
        }
        if (navigator.plugins["Shockwave Flash 2.0"]) {
            return 2;
        }
    }
    else {
        MSDetect = true;
    }
    if (MSDetect) {
        var vs = 0;
        for (v = 2; v < 15; v++) {
            ieFlashObj = null;
            window.execScript('on error resume next: ieFlashObj = IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.' + v + '"))', 'VBScript');
            if (ieFlashObj) {
                vs = v;
            }
        }
        return vs;
    }
    return 0;
}
var isReady = false;
function sReady() {
    $j(document).ready(
        function() { isReady = true; $j(document).triggerHandler('sReady'); }
    );
    arpanisthedevil();
}
function addsReady(fn) {
    jQuery(document).bind('sReady', fn);
}

function arpanisthedevil() {
    if (m_isPopupIntention) {
        try {
            jQuery.each(document.body.childNodes, function(i, val) {
                if ($j(val).is('table')) $j(val).css('width', '100%');
            });
        }
        catch (e) { }
    }
}
function getObjectHeight(obj) {
    return $j(obj).height();
}
function getObjectsByTag(tag) {
    if (document.getElementsByTagName) {
        return document.getElementsByTagName(tag);
    }
    else if (document.all) {
        return document.all.tags(tag);
    }
    return null;
}
function setMAIframeHeight(height) {
    try {
        var myframes = ParseIFrameObjects("myframe");
        for (var frameidx = 0; frameidx < myframes.length; frameidx++) {
            if (height) {
                myframes[frameidx].style.height = height;
                ContainerHeight = height + 20;
            }
            else {
                myframes[frameidx].style.height = 300;
                ContainerHeight = 300;
            }
        }

        var body = getRawObject("flyout" + m_id + "body");
        body.style.height = ContainerHeight;

    }
    catch (e)
{ }
}
var m_moreLessUlr = "";
function moreLessToggle(evt) {
    var myTarget = evt.target || evt.srcElement;
    var parent = myTarget.parentNode.parentNode;
    if (parent.gotdata) {
        moreLessToggleLocal(evt);
        return;
    }
    parent.gotdata = true;
    var dataDiv = null;
    var dataInput = null;
    for (i = 0; i < parent.childNodes.length; i++) {
        if (parent.childNodes[i].tagName == "DIV") {
            var dataInputs = parent.childNodes[i].getElementsByTagName("input");
            if (dataInputs != null && dataInputs.length == 1) {
                dataInput = dataInputs[0];
                dataDiv = parent.childNodes[i];
                break;
            }
        }
    }
    if (dataDiv == null) {
        moreLessToggleLocal(evt);
        return;
    }
    if (m_moreLessUlr == null || m_moreLessUlr.length == 0) {
        return;
    }
    var syncObj = getXMLHTTPObj();
    if (syncObj == null) {
        moreLessToggleLocal(evt);
        return;
    }
    m_moreLessUlr = m_moreLessUlr.replace(/\/\//, "/");
    syncObj.open("POST", m_moreLessUlr, true);
    var params = "data=" + dataInput.value;
    syncObj.setRequestHeader("Content-length", params.length);
    syncObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    syncObj.setRequestHeader("Content-length", params.length);
    syncObj.setRequestHeader("Connection", "close");
    moreLessToggleLocal(evt);
    syncObj.onreadystatechange = function(e) {
        if (syncObj != undefined && syncObj.readyState == 4) {
            if (syncObj.status == 200) {
                dataDiv.innerHTML = syncObj.responseText;
            }
            else {
                moreLessToggleLocal(evt);
            }
        }
    };
    syncObj.send(params);
}
function moreLessToggleLocal(evt) {
    var myTarget = evt.target || evt.srcElement;
    var DIV = "DIV";
    for (var i = 0; i < myTarget.parentNode.parentNode.childNodes.length; i++) {
        if (myTarget.parentNode.parentNode.childNodes[i].tagName == DIV) {
            if (myTarget.parentNode.parentNode.childNodes[i].className == "toggleLinks") {
                if (myTarget.parentNode.parentNode.childNodes[i].style.display == "none") {
                    myTarget.parentNode.parentNode.childNodes[i].style.display = "inline";
                }
                else {
                    myTarget.parentNode.parentNode.childNodes[i].style.display = "none";
                }
            }
        }
    }
}
function mhFixupLink(href, extra) {
    if (typeof (extra) == "undefined") {
        extra = "&~ck=mn";
    }
    if (href) {
        var anchor = null;
        var anchorix = href.indexOf("#");
        if (anchorix != -1) {
            anchor = href.substr(anchorix);
            href = href.substr(0, anchorix);
        }
        if (href.indexOf("?") == -1) {
            extra = "?" + extra.substr(1);
        }
        else {
            //TD#61936: StormR32010: Premier requested not to add ~ck=mn if a querystring nock=1 is passed on the url
            var linkDontLikeCK = ((href.toLowerCase().indexOf("?nock=1") != -1) || (href.toLowerCase().indexOf("&nock=1") != -1));
            if (linkDontLikeCK && (extra == "?~ck=mn" || extra == "&~ck=mn")) {
                var nockix = href.toLowerCase().indexOf("?nock=1") != -1 ? href.toLowerCase().indexOf("?nock=1") : href.toLowerCase().indexOf("&nock=1");
                var nockixend = nockix + "?~ck=mn".length;
                if (href.length == nockixend) {
                    extra = "";
                    href = href.substr(0, nockix);
                }
                else if (href.substr(nockixend, 1) == "?" || href.substr(nockixend, 1) == "&")
                {
                    extra = "";
                    href = href.substr(0, nockix + 1) + href.substr(nockixend + 1);
                }
            }
        }
        if (href.toLowerCase().indexOf("javascript:") == -1) {
            href += extra;
        }
        else {
            start = href.indexOf("?");
            if (start != -1) {
                ix = href.indexOf("\'", start);
                if (ix == -1) {
                    ix = href.indexOf("\\", start);
                    if (ix == -1) {
                        ix = href.indexOf("\"", start);
                    }
                }
                if (ix != -1) {
                    href = href.substr(0, ix) + extra + href.substr(ix);
                }
            }
        }
        if (anchor) {
            href += anchor;
        }
    }
    return href;
}
function getRawObject(obj) {
    var theObj;
    if (typeof obj == "string") {
        if (isW3C) {
            theObj = document.getElementById(obj);
        }
        else if (isIE4) {
            theObj = document.all(obj);
        }
        else if (isNN4) {
            theObj = seekLayer(document, obj);
        }
        else {
            theObj = document.getElementById(obj);
        }
    }
    else {
        theObj = obj;
    }
    return theObj;
}
function getBackto() {
    if (typeof (m_backto) != "undefined") {
        return m_backto;
    }
    return "";
}
function getYouAreHere() {
    if (typeof (m_youAreHere) != "undefined") {
        return m_youAreHere;
    }
    return "";
}
function getGotoTop() {
    if (typeof (m_gototop) != "undefined") {
        return m_gototop;
    }
    return "";
}
function getPrintableText() {
    if (typeof (m_printableText) != "undefined") {
        return m_printableText;
    }
    return "";
}
function addBookMark() {
    if (window.external) {
        window.external.AddFavorite(document.location.href, document.title);
    }
    else {
        alert("Sorry, your browser doesn't support bookmarking this page...\n\nPlease try pressing Control + D instead");
    }
}
function menuGoto(url) {
    if (m_anchorClicked) {
        return;
    }
    m_anchorClicked = true;
    if (url != null && url.indexOf("javascript") > -1) {
        eval(url);
    }
    else {
        document.location = url;
    }
    if (document.event != null) {
        document.event.cancelBubble = true;
    }
    return false;
}
function menuWinOpen(url) {
    window.open(url);
    return false;
}
$j(document).ready(function() { m_printviewHref = m_curUrl; });
function printview() {
    winopen(m_printviewHref + "&~lt=print", 'print', 'WIDTH=648,HEIGHT=510,RESIZABLE=YES,SCROLLBARS=YES,TOOLBAR=YES,LEFT=0,TOP=20');
}
function winopen(url, stuff, morestuff) {
    var popwin = window.open(url, stuff, morestuff);
    if (typeof (popwin) != "undefined" && popwin) {
        popwin.focus();
    }
    lastPopup = popwin;
}
function Bandwidth() {
    if (readIEVer() < 5.0 || isOpera || navigator.appVersion.toLowerCase().indexOf("win") == -1) {
        return "NA";
    }
    try {
        document.body.addBehavior("#default#clientCaps");
        if (typeof (document.body.connectionType) != "undefined") {
            if (document.body.connectionType == "modem") {
                return "Modem";
            }
            return "Lan";
        }
    }
    catch (e) {
        return "NA";
    }
}
function RemoveName() {
    var cookie = getCookie("StormPCookie");
    if (cookie && cookie.length > 0) {
        cookie = StripCookieValue(cookie, "fstn");
        cookie = StripCookieValue(cookie, "lstn");
        document.cookie = "StormPCookie=" + cookie + ";domain=.dell.com";
    }
    cookie = getCookie("lwp");
    if (cookie && cookie.length > 0) {
        cookie = StripCookieValue(cookie, "fstn");
        cookie = StripCookieValue(cookie, "lstn");
        cookie = StripCookieValue(cookie, "fn");
        document.cookie = "lwp=" + cookie + ";domain=.dell.com";
    }
}

function AutoSubmit(frm) {
    var cookieVal = m_stormCookie.session.getCookie("autosubmit");
    if (cookieVal == document.location) {
        var submitForm = window.confirm("Resubmit form?");
        if (submitForm) {
            frm.submit();
            return;
        }
        else {
            return;
        }
    }
    m_stormCookie.session.setCookie("autosubmit", document.location);
    frm.submit();
}
function AutoSubmit2(frm, url, freq) {
    var oldAction = frm.action;
    frm.action = url;
    var cookieVal = getCookie("autosubmit");
    if (cookieVal == document.location) {
        var submitForm = window.confirm("Resubmit form?");
        if (submitForm) {
            if (freq == "true") {
                frm.target = "FreqFormPopup";
                var x = window.open(url, "FreqFormPopup", "width=600, height=400, location=yes, menubar=yes, status=yes, toolbar=yes, scrollbars=yes, resizable=yes");
            }
            frm.submit();
            frm.target = "_self";
            frm.action = oldAction;
            return;
        }
        else {
            return;
        }
    }
    m_stormCookie.session.setCookie("autosubmit", document.location);
    if (freq == "true") {
        frm.target = "FreqFormPopup";
        var x = window.open(url, "FreqFormPopup", "width=600, height=400, location=yes, menubar=yes, status=yes, toolbar=yes, scrollbars=yes, resizable=yes");
    }
    frm.submit();
    frm.target = "_self";
    frm.action = oldAction;
}
function singlechoiceskiplevel(formInput) {
    if (typeof (formInput) != "undefined") {
        var i = 0;
        var displayDiv = null;
        while (i < formInput.length) {
            if (formInput[i].value != null && formInput[i].value != "") {
                if (document.getElementById(formInput[i].value) != null) {
                    if (formInput[i].selected || formInput[i].checked) {
                        document.getElementById(formInput[i].value).style.display = "inline";
                        displayDiv = formInput[i].value;
                    }
                    else {
                        if (displayDiv != formInput[i].value) {
                            document.getElementById(formInput[i].value).style.display = "none";
                        }
                    }
                }
            }
            i++;
        }
    }
}
/*
attr		name				type		desc
----		----				----		----
@param	swfFile			String	(expecting somefilename.swf)
@param	width				String 	(needs to accept %)
@param	height			String 	(needs to accept %)
@param	bgcolor			String 	(expecting #nnnnnn)
@param	ver					String 	(expecting n[,n[,n[,n]]] - ex. 9 or 9,0 or 9,0,1 or 9,0,1,115)
@param	altFormat		String 	(expecting an image tag - ex. '<img src="http://i.dell.com/resize.aspx/xpsnb_m1330/200" width="200" alt="" border="0" />')
@param	params			String 	(does not appear to be used)
@param	movieName		String 	(Storm generated GUID)
@param	quality			String	(default 'high')
@param	scaleMode		String 	(default 'noscale')		
@param	align				String	(default 'left')
@param	wMode				String	(default 'opaque')
@param	allowFS			String 	(default 'true')
@param	sAlign			String	(default 'tl')
SiaB 3 only
@param	contentFile	String 	(expecting an XHTML file - *.html, *.htm, *.xhtml)
*/
function FlashLibraryActivate(swfFile, width, height, bgcolor, ver, altFormat, params, movieName, quality, scaleMode, allowFS, wMode, menu, contentFile) {
    var t = this;
    var activeX = false;
    t.ieAutoInstall = false;

    // set up the defaults
    if (quality == undefined || quality == "") {
        quality = "high";
    }
    if (scaleMode == undefined || scaleMode == "") {
        scaleMode = "noscale";
    }
    if (wMode == undefined || wMode == "") {
        wMode = "opaque";
    }
    if (allowFS == undefined || allowFS == "") {
        allowFS = "true";
    }
    if (menu == undefined || menu == "") {
        menu = "true";
    }
    if (ver == undefined || ver == "") {
        ver = "7";
    }

    t.hasVersion = function(ver) {
        t.swf = false;
        if (!ver) ver = 0;
        var n = navigator;
        if (n.plugins && n.plugins.length > 0) {
            var m, tp, d, v;
            m = n.mimeTypes;
            tp = 'application/x-shockwave-flash';
            if (m && m[tp] && m[tp].enabledPlugin && m[tp].enabledPlugin.description) {
                d = m[tp].enabledPlugin.description;
                //v = d.charAt(d.indexOf('.')-1);
                v = SetFlashVersion();
                t.swf = (v >= ver) ? true : false;
            }
        }
        else if (n.appVersion.indexOf("Mac") == -1 && window.execScript) {
            ieFlashObj = null;
            activeX = true;
            for (var i = ver; i <= 10 && i != 1 && ieFlashObj != true; i++) {
                execScript('on error resume next: ieFlashObj=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash' + ((i == 0) ? '' : '.' + i) + '"))', 'VBScript');
                if (ieFlashObj == true) {
                    t.swf = true;
                    break;
                }
            }
        }
        else {
            t.swf = false;
        }
        return t.swf;
    };

    t.getPluginTag = function() {
        var fixedVer = ver;
        var cmHack = swfFile.indexOf("cmhack") > -1;
        if (cmHack) {
            if (document.location.href.indexOf("~bandwidth=Modem") == -1 && !t.hasVersion(parseInt(ver))) {
                document.location.href = document.location.href + "&~bandwidth=Modem";
            }
        }

        if (swfFile.indexOf("autoinstall") > -1) {
            t.ieAutoInstall = true;
        }

        params = " " + params + " ";
        var s = "";
        var win = (navigator.appVersion.toLowerCase().indexOf("win") != -1);
        var ie = (navigator.appName == "Microsoft Internet Explorer");

        if ((t.hasVersion(parseInt(ver)) && swfFile) || (win && ie && swfFile && t.ieAutoInstall)) {

            var additionalParams = '';
            var qPos = swfFile.indexOf("?");
            var fVars = swfFile.substr(qPos + 1, swfFile.length);

            if ((qPos > -1) && (qPos + 1 < swfFile.length) && (parseInt(fixedVer) > 5)) {
                var ta = 'FlashVars';
                var v = swfFile.substring(qPos + 1);
                v += "&containerURL=" + encodeURIComponent(location.href);
                v += "&id=" + movieName;
                additionalParams += (activeX) ? '\t<param name="' + ta + '" value="' + v + '" />\n' : ' ' + ta + '="' + v + '"';
            }
            else {
                var ta = 'FlashVars';
                var v = "";
                v += "containerURL=" + encodeURIComponent(location.href);
                v += "&id=" + movieName;
                additionalParams += (activeX) ? '\t<param name="' + ta + '" value="' + v + '" />\n' : ' ' + ta + '="' + v + '"';
            }
            if (qPos > -1) {
                swfFile = swfFile.substr(0, qPos);
            }

            if (activeX) {
                var pcol = (window.location.protocol == 'https:') ? "https:" : "http:";
                s = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + pcol + '//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + fixedVer + '" id="' + movieName + '" width="' + width + '" height="' + height + '" >\n';
                s += '\t<param name="movie" value="' + swfFile + '" />\n';
                s += '\t<param name="allowFullScreen" value="' + allowFS + '" />\n';
                s += '\t<param name="quality" value="' + quality + '" />\n';
                s += '\t<param name="menu" value="' + menu + '" />\n';
                s += '\t<param name="wmode" value="' + wMode + '" />\n';
                s += '\t<param name="allowScriptAccess" value="always">\n';
                s += '\t<param name="bgcolor" value="' + bgcolor + '" />\n';
                s += '\t<param name="scale" value="' + scaleMode + '" />\n';
                s += additionalParams;
                s += params;
                s += altFormat;
                s += '</object>\n\n';

                // create the <iframe> IF the contentfile attribute is present
                try {
                    if (contentFile != undefined && contentFile != "") {
                        s += '<iframe id="" name="" src="' + contentFile + '" style="display:none" title="" align="left" frameborder="0" height="1" weight="1" longdesc="" marginheight="0" marginwidth="0" scrolling="no" ></iframe>';
                    }
                    else {
                        //alert( "bs" );
                    }
                }
                catch (e) {
                    //alert( e );
                }
                return s;
            }
            else {
                // EMBED
                s = '<embed src="' + swfFile + '" quality="' + quality + '" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" allowScriptAccess="always" wmode="' + wMode + '" allowFullScreen="' + allowFS + '" type="application/x-shockwave-flash" name="' + movieName + '" id="' + movieName + '" width="' + width + '" height="' + height + '" bgcolor="' + bgcolor + '"' + additionalParams + params + '" menu="' + menu + '" scale="' + scaleMode + '" ></embed>\n';

                /// create the <iframe> IF the contentfile attribute is present
                try {
                    if (contentFile != undefined && contentFile != "") {
                        s += '<iframe id="" name="" src="' + contentFile + '" style="display:none" title="" align="left" frameborder="0" height="1" weight="1" longdesc="" marginheight="0" marginwidth="0" scrolling="no"></iframe>';
                    }
                }
                catch (e) {
                    //alert( e );
                }
                return s;
            }
        }
        else {
            return altFormat;
        }
    };
}

function resizeFlash(w, h, id) {
    var flash = document.getElementById(id);
    if (flash == null) {
        var flash = document.getElementByName(id);
    }
    if (!isNaN(w)) flash.width = w;
    if (!isNaN(h)) flash.height = h;
    return id;
}

function RenderFlash() {
    var flashObjects = ParseDivObjects("flashContentDiv");
    var flashObject;
    for (var flashIdx = 0; flashIdx < flashObjects.length; flashIdx++) {
        var jscriptTxt = unescape(flashObjects[flashIdx].innerHTML).replace(/&amp;/gi, "&");
        if (jscriptTxt.indexOf("new FlashLibraryActivate") > -1) {
            try {
                var flashObj = eval(jscriptTxt);
                var fullscreen = getQueryVariable("~lt");
                if (fullscreen == "flash_fullscreen") {
                    document.body.style.margin = 0;
                    document.body.style.padding = 0;
                    document.body.innerHTML = flashObj.getPluginTag();
                }
                else {
                    flashObjects[flashIdx].innerHTML = flashObj.getPluginTag();
                    flashObjects[flashIdx].style.display = "block";
                }
            }
            catch (e) { }
        }
    }
}
function rgcInit() {
    return;
}


function stormModalObj() {
    this.Inited = false;
}

stormModalObj.prototype.init = function() {
    if (this.Inited) {
        return;
    }

    var standardModel = '<div class="jqmWindow" id="standardModel"><div class="jqmWinHeader jqDrag" ><div class="jqmClose" onclick="stormModal.close()"><image src="' + m_imgPfx + '/images/global/brand/icons/modal_close_btn.gif" border="0" /></div><div class="jqmWinTitle"></div></div><div class="jqmContent"></div><div class="jqmFooter"><div class="jqmFooterButtons"></div><div class="jqmFooterStatus"></div></div></div>';
    $j(standardModel).appendTo('body');

    $j('#standardModel').jqm();
    this.InternalModal = $j('#standardModel');
    this.DefaultProps = { defaultTitle: "&nbsp;", width: this.InternalModal.width() };
    this.AbsoluteHeight = 0;
    this.Title = this.InternalModal.find('.jqmWinTitle');
    this.Footer = this.InternalModal.find('.jqmFooter');
    this.FooterStatus = this.Footer.find('.jqmFooterStatus');
    this.FooterButtons = this.Footer.find('.jqmFooterButtons');

    this.Content = this.InternalModal.find('.jqmContent');
    this.DummbyAnchor = $j('<div href=foo  ><div>');
    this.Inited = true;
};
stormModalObj.prototype.addclick = function(t) {
    t.each(function() {

        $j(this).click(function() {
            var map = {};
            map.href = $j(this).attr('href');
            stormModal.show(map);
            $j(this).blur();
            return false;
        }
        )
    }
        );
};
stormModalObj.prototype.loginRequired = function(map) {

    if (map.authLevel && map.authLevel > _curAuthLevel) {
        return true;
    }
    return false;

};

stormModalObj.prototype.ResetHref = function(map) {
    if (map.elm) {
        $j(map.elm).attr('href', 'javascript:void(0)');
    }
};



stormModalObj.prototype.show = function(map, forlogin) {

    this.init();

    if (!forlogin) {
        this.continueMap = null;
    }

    if (this.loginRequired(map) || map.swaplogin) {

        this.ResetHref(map);
        this.continueMap = map;
        //this.showLogin ( map.authLevel, map.title );
        this.showLogin(map);
        this.continueMap.swaplogin = false;
        return;
    }
    if (map.top) {
        window.location.href = map.href;
        return false;
    }


    var etrig = this.DummbyAnchor;
    etrig.attr('href', map.href);
    this.close();

    var mm = jQuery.extend({}, this.DefaultProps, (map ? map : {}));

    this.setprops(mm);

    this.InternalModal.jqmShow();

    this.loadContent(mm);
    this.positionModal();
    this.lockModal(mm);
    $j(this).blur();
    this.ResetHref(map);


    return false;

};


stormModalObj.prototype.lockModal = function(map) {
    var ol = $j(document).find('.jqmOverlay');

    if (map.lock) {
        ol.css('cursor', 'wait');
        ol.unbind();

    }
    else {
        ol.css('cursor', '');

    }
};

stormModalObj.prototype.positionModal = function() {

    var scrollTop = (document.all) ? (truebody().scrollTop) : window.pageYOffset;
    var scrollLeft = (document.all) ? (truebody().scrollLeft) : window.pageXOffset;
    var clientHeight = (document.all) ? (truebody().clientHeight) : document.body.clientHeight;
    var clientWidth = (document.all) ? (truebody().clientWidth) : document.body.clientWidth;

    var elm = this.InternalModal;
    var left = 0, top = 0;
    top = scrollTop + clientHeight / 2 - elm.height() / 2;
    left = scrollLeft + clientWidth / 2;

    var cssObj = {
        left: left + "px",
        top: top + "px"
    };
    elm.css(cssObj);

};

stormModalObj.prototype.loadContent = function(map) {

    var r = this.Content;
    if (map.contentid) {
        var elmObj = $j('#' + map.contentid);
        if (elmObj) {
            var elmContent = elmObj.html();
            r.html(elmContent);
        }
        return;
    }
    var processing = "<div class=\"waitcls\">" + m_processingcaption + "<img src=\"" + m_imgPfx + "/images/global/brand/icons/ajax-loader[1].gif\" border=\"0\"/></div>";

    if (map.href.substr(0, 4) == 'http' || map.iframe || map.isRelative) {
        r.height(this.AbsoluteHeight - 85);

        r.html(processing + '<iframe style="display:block" width="100%" height="100%" onload="$j(this).css ( \'display\',\'block\');$j(\'.waitcls\').css(\'display\', \'none\'); " style="height:100%" frameborder="0" hspace="0" src="' + map.href + '" />');
    }
    else {
        r.html(processing);
        $j(".waitcls").css({ position: "relative" });
        r.height('72%');
        r.load(map.href);
    }


};

stormModalObj.prototype.showLogin = function(map) {
    var lvl = 3;
    if (map.authLevel) {
        lvl = map.authLevel;
    }

    if (lvl > _curAuthLevel || map.swaplogin) {
        var pbarurl = m_pbarPfx;
        if (pbarurl == undefined || pbarurl.length == 0) {
            pbarurl = "http://pbar.us.dell.com";
        }
        var url = pbarurl + m_login_url + "?level=" + lvl + getLwp();
        if (map.swaplogin) {
            url = url + "&swapLogin=" + map.swaplogin;
        }
        var lwidth = 320;
        var lheight = 350;
        if (map.height) {
            lheight = map.height;
        }

        if (map.width) {
            lwidth = map.width;
        }

        var caption = "Login";
        if (map.title) {
            caption = map.title;
        }
        var map = { href: url, height: lheight, width: lwidth, title: caption, elm: this };
        this.show(map, true);

    }
};

stormModalObj.prototype.continueAuth = function() {

    if (this.continueMap) {
        var newMap = $j.extend({}, this.continueMap);

        setTimeout(function() { stormModal.show(newMap); }, 0);

    }
    else {
        // This is to update the pbar strip after logging in
        window.location.reload();
    }
};
stormModalObj.prototype.setprops = function(map) {
    this.Title.html(map.title ? map.title : map.defaultTitle);

    if (map.content) {
        this.Content.append($j(map.content));
    }
    else {
        this.Content.empty();
    }

    if (map.height) {
        if (!((map.buttons) || (map.footerStatus))) {
            this.InternalModal.height(map.height);
        }

        this.AbsoluteHeight = map.height;
    }
    else {
        this.InternalModal.css("height", "");
    }

    if (map.width) {
        this.InternalModal.width(map.width);
        this.InternalModal.css('margin-left', map.width / -2);
    }

    this.setfooterButtons(map.buttons);
    this.setfooterStatus(map.footerStatus);

};

stormModalObj.prototype.close = function() {
    this.init();
    this.InternalModal.jqmHide();

};

//stormModalObj.prototype.footer = this.Footer.html;
stormModalObj.prototype.setheader = function(e) {
    this.init();
    return this.Title.html(e);
};

stormModalObj.prototype.setfooterButtons = function(e) {
    this.init();
    e = e ? e : "";
    return this.FooterButtons.html(e);
};
stormModalObj.prototype.setfooterStatus = function(e) {
    this.init();
    e = e ? e : "";
    return this.FooterStatus.html(e);
};



var _curAuthLevel = 0;

var m_login_url = "/pbar/login.aspx";

var _mwidth = 200;
var _mheight = 200;

function proccessAuthChange(level) {

    _curAuthLevel = level;
    stormModal.close();
    stormModal.continueAuth();

}


var stormModal = new stormModalObj();


function clientPageInit() {
    stormModal.addclick($j('a[@n_modal]'));


}
$j(document).ready(clientPageInit);

addsReady(InitDocumentLoad);
function InitDocumentLoad() {
    InitClueTip();
    //CreateTrailObj();
    InitTechNotes();
    InitToolTips();
    InitPriceForPremierOffers();
    RenderFlash();
	try {
	    m_isSearchApp = m_curUrl.indexOf("search.dell.com") != -1 || m_curUrl.indexOf("search.euro.dell.com") != -1 || m_curUrl.indexOf("searchapj.dell.com") != -1 || m_curUrl.indexOf("search.ap.dell.com") != -1 || m_curUrl.indexOf("search.la.dell.com") != -1 || m_curUrl.indexOf("/search/") != -1;
	    if (m_isSearchApp) {
			addScript2("/images/global/js/search/jquery-1.4.1.min.js");
			addScript2("/images/global/js/search/jquery.autocomplete.js");
		}
	} catch (e) {
	}
}
//function CreateTrailObj()
//{
//var trailimageid = "<div id=\"trailimageid\" style=\"position:absolute;visibility:hidden;left:0px;top:0px;width:1px;height:1px;font-family:arial,helvetica;font-size:8.5pt\"><span id=\"processingCaptionID\">Processing....</span><img src=\""+ m_imgPfx +"/images/global/brand/icons/ajax-loader[1].gif\" border=\"0\"></div>";
//$j(trailimageid).appendTo('body');
//}
function getQueryVariable(variable, url) {
    var useUrl = document.location.href;
    if (m_curUrl != null && m_curUrl.length > 0 && m_curUrl.indexOf("?") != -1) {
        useUrl = m_curUrl;
    }
    if (url != null && url.length > 0 && url.indexOf("?") != -1) {
        useUrl = url;
    }
    var query = useUrl.substring(useUrl.indexOf("?") + 1, useUrl.length);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
}

function GetScreen() {
    try {
        this.Width = screen.width;
        this.Height = screen.height;
        this.AvailableWidth = screen.availWidth;
        this.AvailableHeight = screen.availHeight;
        this.ColorDepth = screen.colorDepth;
    } catch (err) {

        this.Width = 1024;
        this.Height = 768;
        this.AvailableWidth = 1024;
        this.AvailableHeight = 768;
        this.ColorDepth = 0;
    }
}

function parentNode(elem) {
    if (typeof (elem) != "undefined" && elem != null) {
        if (elem.parentElement) {
            return elem.parentElement;
        }
        if (elem.parentNode) {
            return elem.parentNode;
        }
    }
    return null;
}
function DecodeSearch(str) {
    try {
        return unescape(decodeURI(str).replace(/\+/g, " "));
    }
    catch (e)
	{ }
}
var m_framesAdded = false;
function AddHiddenFrames() {
    if (m_framesAdded) {
        return;
    }
    var df1 = document.getElementById("dataiframe_0");
    if (df1 != null) {
        m_framesAdded = true;
    }
    m_framesAdded = true;
    for (var i = 0; i < 10; i++) {
        var iframeObj = document.createElement("iframe");
        iframeObj.id = "dataiframe_" + i;
        iframeObj.style.border = '0px';
        iframeObj.style.width = '0px';
        iframeObj.style.height = '0px';
        iframeObj.src = "javascript:false;";
        var container = getRawObject("iframeContainer");
        if (container == null) {

            var container = document.createElement("div");
            container.id = "iframeContainer";
            container.style.position = "absolute";
            document.body.appendChild(container);

        }

        container.appendChild(iframeObj);
    }
}
var m_dataIframes = new Array();
var m_frameIdxs = new Array();
var m_frameIdx = 0;
function AsyncXDomainIframeCall(url, callback) {
    if (!isReady) {
        addsReady(function() { AsyncXDomainIframeCall(url, callback) });
        return;
    }
    AddHiddenFrames();
    var iframeObj;
    for (n = 0; n < m_frameIdxs.length; n++) {
        if (m_frameIdxs[n] == url) {
            iframeObj = m_dataIframes[n];

        }
    }
    if (iframeObj == null) {
        if (m_frameIdx >= 10) {
            m_frameIdx = 0;
        }
        iframeObj = document.getElementById("dataiframe_" + m_frameIdx);
        m_dataIframes[m_frameIdx] = iframeObj;
        m_frameIdxs[m_frameIdx] = url;
        m_frameIdx++;
    }
    iframeObj.onload = function() { jasonCallback(iframeObj.id, callback); };
    iframeObj.onreadystatechange = function() { jasonCallback(iframeObj.id, callback); };

    var ticks = new Date();
    var urlTime = "ts=" + ticks.getSeconds() + ticks.getMilliseconds();
    if (url.indexOf("?") == -1) {
        url += "?";
    }
    else {
        url += "&";
    }
    setTimeout("NavigateFrame( '" + iframeObj.id + "','" + (url + urlTime) + "' )", 10);
}
function NavigateFrame(IFrameObj, URL) {
    IFrameObj = document.getElementById(IFrameObj);
    try {
        if (IFrameObj.contentDocument) {
            IFrameDoc = IFrameObj.contentDocument;
        } else if (IFrameObj.contentWindow) {
            IFrameDoc = IFrameObj.contentWindow.document;
        } else if (IFrameObj.document) {
            IFrameDoc = IFrameObj.document;
        } else {
            return true;
        }
        IFrameDoc.location.replace(URL);
    }
    catch (e) {
        IFrameObj.src = URL;
    }
    return false;
}
function jasonCallback(id, callback) {
    var iframeObj = document.getElementById(id);
    if (iframeObj.readyState == "complete" || typeof (iframeObj.readyState) == "undefined") {
        try {
            var thingie = new Object();
            var retval = null;
            var txt = null;
            try {
                if (iframeObj.contentDocument) {
                    thingie.Node = iframeObj.contentDocument.body;
                    txt = iframeObj.contentDocument.body.innerHTML;
                    if (txt == "false") {
                        return;
                    }
                }
                else if (iframeObj.contentWindow) {
                    var frmDoc = null;
                    try {
                        frmDoc = iframeObj.contentWindow.document;
                    }
                    catch (e) {
                        return;
                    }
                    thingie.Node = frmDoc.body;
                    txt = thingie.Node.innerHTML;
                }
                else if (iframeObj.document) {
                    thingie.Node = iframeObj.document.body;
                    txt = iframeObj.document.body.innerHTML;
                }
            }
            catch (e) {
                callback(thingie);

            }
            if (thingie.Node != null && thingie.Node.getElementsByTagName("pre").length > 0) {
                var jasonElm = thingie.Node.getElementsByTagName("pre")[0];
                eval(jasonElm.innerHTML);
                thingie.Status = "OK";
                thingie.Response = txt;
                thingie.JasonObj = retval;
                callback(thingie);
            }
            else if (txt.indexOf("var") == 0) {
                eval(txt);

                thingie.Status = "OK";
                thingie.Response = txt;
                thingie.JasonObj = retval;
                callback(thingie);
            }
            else {
                thingie.Status = "OK";
                thingie.Response = txt;
                callback(thingie);
            }
        }
        catch (e) {
            thingie.Status = "NOTOK";
            thingie.Response = "";
            thingie.Error = e;
            callback(thingie);
        }
    }
}
var trailimage = ["", 100, 99];  //image path, plus width and heigh
var offsetfrommouse = [10, -20];  //image x,y offsets from cursor position in pixels. Enter 0,0 for no offset
var displayduration = 1;  //duration in seconds image should remain visible. 0 for always.




function gettrailobj() {
    return $j('#trailimageid');
}

function followmouse(e) {
    var xcoord = offsetfrommouse[0];
    var ycoord = offsetfrommouse[1];
    if (typeof e != "undefined") {
        xcoord += e.pageX;
        ycoord += e.pageY;
    }
    else if (typeof window.event != "undefined") {
        xcoord += truebody().scrollLeft + event.clientX;
        ycoord += truebody().scrollTop + event.clientY;
    }
    var docwidth = document.all ? truebody().scrollLeft + truebody().clientWidth : pageXOffset + window.innerWidth - 15;
    var docheight = document.all ? Math.max(truebody().scrollHeight, truebody().clientHeight) : Math.max(document.body.offsetHeight, window.innerHeight);
    if (xcoord + trailimage[1] + 3 > docwidth || ycoord + trailimage[2] > docheight)
        gettrailobj().css({ display: "none" });
    else
        gettrailobj().css({ display: "" });

    var cssObj = {
        left: xcoord + "px",
        top: ycoord + "px",
        visibility: "visible"
    };
    gettrailobj().css(cssObj);

}

function truebody() {
    return (!window.opera && document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
}

function hidetrail() {
    gettrailobj().css({ visibility: "hidden" });
    $j(document).unbind('mousemove', followmouse);

}

function AsyncAddToCart(url, processingCaption) {

    var otrail = document.getElementById('processingCaptionID');
    otrail.innerHTML = processingCaption;

    $j(document).bind('mousemove', followmouse);
    //set up div ... for waiting...
    AsyncXDomainIframeCall(url, AsyncAddToCartCallback);
}


var cartcontent = null;
var totalcartquantity = 0;
var asyncCartObj = null;
var isaddingtocart = false;
function AsyncAddToCartCallback(rsp) {

    inflyoutmax = false;
    isaddingtocart = true;
    if (rsp.Status != "OK") {
        hidetrail();
        return;
    }
    else {
        hidetrail();
        var jasonCart = rsp.JasonObj;

        var relatedproductscontent = "";

        cartcontent = "<div id=\"pbarcontent\" name=\"carttemp\" class=\"pbarcontentcart\" style=\"width:350px;float:left;\">";

        if (jasonCart.Error) {
            cartcontent = cartcontent + " <div class=\"cartItems_error\">" + jasonCart.Error + "</div>";

        }
        else {
            var showRelatedProd = true;
            var caption = jasonCart.RelatedProductsCaption;

            if ((caption == null) || (jasonCart.RelatedProductsUrl == null)) {
                showRelatedProd = false;
            }
            else if (caption != null && (caption.length > 0)) {
                if (caption.substring(caption.length - 1) == " ") {
                    showRelatedProd = false;
                }
            }
            else {
                showRelatedProd = false;
            }

            if (showRelatedProd == true) {
                relatedproductscontent = "<div class=\"simpleButtonMODIFIED\" style=\"float:left;\"><a href=\"" + jasonCart.RelatedProductsUrl + "\" style=\"text-decoration:none\"><span name=\"silver_Btn\" class=\"silverBtn\"><div class=\"silverBtnLeft\">" +
                        "</div><div class=\"silverBtnMid\">" + jasonCart.RelatedProductsCaption + "</div><div class=\"silverBtnRight\"></div></span></a></div><div class=\"cartspacer\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"248\" height=\"5\" border=\"0\" alt=\"\" /></div>";
            }


            cartcontent = cartcontent + " <div class=\"cartTopInfo\"><div class=\"cartItems_bold\">" + jasonCart.CartTopInfo + "</div></div>" +

                        "<div class=\"cartItem\">" +
                        "<div class=\"pbarspacer\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" /></div>" +
                        "<div class=\"productImage\"><img src=\"" + jasonCart.Image + "\" width=\"40\" border=\"0\" alt=\"\" /></div>" +
                        "<div class=\"productDesc\"><span class=\"productTitle\" title=\"" + jasonCart.ShortDescription + "\">" + jasonCart.ShortDescription + "</span><br />" +
                       "</div>" +
                       "<div class=\"productPrice\" style=\"width:150px;\">" + jasonCart.Price + "</div>";


        }


        cartcontent = cartcontent + "<div style=\"clear:both;\"></div>" +
                       "<div class=\"productDivide\"></div>" +
                      "<div class=\"cartspacer\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"320\" height=\"10\" border=\"0\" alt=\"\" /></div>" + relatedproductscontent +
                        "<div class=\"simpleButtonMODIFIED\" style=\"float:right;\"><a href=\"" + jasonCart.CartLinkUrl + "\"><span name=\"green_Btn\" class=\"greenBtn\"><div class=\"greenBtnLeft\">" +
                       "</div><div class=\"greenBtnMid\">" + jasonCart.CartLinkCaption + "</div><div class=\"greenBtnRight\"></div></span></a></div>" +
                        "<div class=\"simpleButtonMODIFIED\" style=\"float:left;\"><a href=\"javascript:CollapseOnContinueShopping('cart')\" style=\"text-decoration:none\"><span name=\"silver_Btn\" class=\"silverBtn\" style=\"\"><div class=\"silverBtnLeft\">" +
                        "</div><div class=\"silverBtnMid\" style=\"\">" + jasonCart.ContinueShoppingCaptoin + "</div><div class=\"silverBtnRight\"></div></span></a></div><div class=\"pbarspacer\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" /></div>" +
                           "<div class=\"cartspacer\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"300\" height=\"5\" border=\"0\" alt=\"\" /></div>" +
                       "</div>" +
                       "</div>";
        totalcartquantity = jasonCart.CartQuantity;

        InitOpenCartItem();


    }

}

function InitOpenCartItem() {

    m_cartPages = new Array();

    if (inflyoutmax) {

        return;
    }

    if (isbloated == false) {
        if (isaddingtocart) {
            var cartDiv = getRawObject("flyoutcartbody");

            cartDiv.innerHTML = "";

            m_pbarContentDiv = null;
            currentID = null;
            m_cartPages = new Array();
            scroll(0, 0);
            flyoutmax('carttemp', '350');
            isaddingtocart = false;
        }

    }
    else {
        if (isaddingtocart) {
            CollapseOnContinueShopping("cart");
            isbloated = true;
            setTimeout("InitOpenCartItem()", 250);
        }

    }


}

function CollapseOnContinueShopping(id) {

    flyoutmaxclear();
    delayMin = setTimeout("shrinkIt('" + id + "',true)", 0);

}

function addOnLoad(fn) {
    if (onloadFired) {
        fn();
        return;
    }
    if (window.onload != safeLoad) {
        var oldOnload = window.onload;
        var found = false;
        for (cnt = 0; cnt < loaded.length; cnt++) {
            if (loaded[cnt] == oldOnload) {
                found = true;
                break;
            }
        }
        if (!found) {
            loaded[loaded.length] = oldOnload;
        }
        m_runSafeLoad = true;
        window.onload = safeLoad;
    }
    loaded[loaded.length] = fn;
}

setTimeout("ensureLoadPage()", 10000);
function ensureLoadPage() {
    if (onloadFired) {
        return;
    }
    addsReady(safeLoad);

    return;

}

function safeLoad() {

    onloadFired = true;
    if (m_runSafeLoad) {
        m_runSafeLoad = false;
        for (var i = 0; i < loaded.length; i++) {
            if (loaded[i] != undefined) {
                loaded[i]();
            }
        }
    }
}
function getXMLHTTPObj() {
    var obj = false;
    /*@cc_on@*/
    /*@if (@_jscript_version >= 5)
    try { obj = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) { try { obj = new ActiveXObject("Microsoft.XMLHTTP"); } catch (oc) { obj = false; } }
    @end@*/
    if (!obj && typeof XMLHttpRequest != "undefined") {
        try {
            obj = new XMLHttpRequest();
        }
        catch (e) {
            obj = false;
        }
    }
    if (!obj) {
        return undefined;
    }
    return obj;
}
function generateUrl(arr) {
    var url = "";
    if (typeof (m_requestURLBase) != 'undefined') {
        url = m_requestURLBase + "&i=" + arr.join("/+");
    }
    return url;
}
function tnLink(anchor) {
    var tnRef = null;
    var tnNum = null;
    if (anchor == null) {
        return;
    }
    var childNodes = anchor.getElementsByTagName("SUP");
    for (i = 0; i < childNodes.length; i++) {
        tnRef = childNodes[i].getAttribute("tn");
        if (tnRef != null) {
            tnNum = childNodes[i].innerHTML;
        }
    }
    if (tnNum != null && tnNum.length > 0 && !(/\D/.test(tnNum))) {
        document.location.href = "#tn" + tnNum;
        return;
    }
    if (tnRef != null) {
        window.open(m_glossaryURLBase + "?f=" + tnRef, 'tnwin', 'WIDTH=400,HEIGHT=300,RESIZABLE=YES,SCROLLBARS=YES,STATUS=NO,TOOLBAR=NO,LEFT=0,TOP=0');
    }
    return;
}
function ctabInit() {
    var tds = document.getElementsByTagName("TD");
    for (var i = 0; i < tds.length; i++) {
        if (tds[i].className == "unselected" || tds[i].className == "current") {

            var font = getchildbyTagName(tds[i], "FONT");
            if (font != null && font.offsetHeight > 20) {

                font.style.fontWeight = "normal";
                if (font.offsetHeight > 20) {
                    font.style.display = "block";
                    font.style.width = font.offsetWidth + "px";
                }

            }

        }

    }

    var tabDiv = document.getElementById("cntTabsCnt");
    if (tabDiv != null) {
        container = parentNode(tabDiv);
        if (container != null) {
            $j("#cntTabsCnt").css("width", container.scrollWidth);
        }
    }
}

function getchildbyTagName(node, tag) {

    if (node.childNodes == null) {
        return null;
    }
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].tagName == tag) {
            return node.childNodes[i];
        }
        var match = getchildbyTagName(node.childNodes[i], tag);
        if (match != null) {
            return match;
        }
    }

}
function intiAjShCnt() {
    ctabInit();
    if (typeof (TTHide) != "undefined") {
        TTHide();
    }
    //    if ( typeof(InitLexicon) != "undefined" )
    //    {
    //        InitLexicon();
    //    }
    findForm();
    Resize();
    RenderFlash();
    alignMasthead();
}



function addBackButtonHistory(fid, cid, url) {
    if (document && document.body) {
        if (typeof(fid) != "undefined" || typeof(cid) != "undefined" || typeof(url) != "undefined") {
            var bckfrm = document.getElementById("BackButtonHistoryFrame");
            var ts = new Date();
            if (!bckfrm) {
                bckfrm = document.createElement("iframe");
                bckfrm.id = "BackButtonHistoryFrame";
                bckfrm.name = "BackButtonHistoryFrame";
                bckfrm.style.border = "0px";
                bckfrm.style.width = "0px";
                bckfrm.style.height = "0px";
                bckfrm.src = m_imgPfx + "/images/global/ajax/backbuttonhistory.htm?fid&cid=&url=&ts=" + ts.getDate();
                document.body.appendChild(bckfrm);
                setTimeout("addBackButtonHistory('" + fid + "', '" + cid + "', '" + url + "')", 1000);
            }
            else {
                bckfrm.src = m_imgPfx + "/images/global/ajax/backbuttonhistory.htm?fid=" + fid + "&cid=" + cid + "&url=" + encodeURIComponent(url) + "&ts=" + ts.getDate();
            }
        }
    }
    else {
        try {
            addsReady(addBackButtonHistory(fid, cid, url));
        }
        catch (e)
        { }
    }
}
var mTable = new Object();
function ajShow(fid, cid, url, isHistory, isInIt) {

    //For rating tabby stuff
    var regexString = "/?~tab=[\\w]*&~wsf=[\\w]*&";
    url = url.replace(new RegExp(regexString), "");

    m_printviewHref = url.substring(0, url.indexOf("&~wsf"));
    var tabDiv = null;
    var tabMode = false;
    container = document.getElementById(fid + "_frm");
    if (container == null) {
        tabDiv = document.getElementById("cntTabsCnt");
        if (tabDiv == null) {
            return;
        }
        container = parentNode(tabDiv);
    }
    else {
        continer = document.getElementById(cid);
    }

    if (container == null) {
        return;
    }

    if (isInIt) {
        if (container["initHistory"]) {
            container.innerHTML = container["initHistory"]; // Load Initial State
            intiAjShCnt();
        }
        return;
    }

    if (container[cid] == "...") {
        return;
    }

    if (isHistory) {
        url = decodeURIComponent(url);
    }

    if (container[cid] != null) {

        $j(container).html(container[cid]);
        $j("#cntTabsCnt").css("width", container.scrollWidth);
        if (!isHistory) {
            addBackButtonHistory(fid, cid, url);
        }
        intiAjShCnt();
        var path = mTable[cid];
        setIEWatchMetricsPath(path);
        trackTabMetrics();
        return;
    }

    if (tabDiv != null) {
        tabDiv.style.backgroundColor = "#fbfbfb";
    }

    var syncObj = getXMLHTTPObj();
    if (syncObj == null || syncObj == undefined) {
        var pos = url.indexOf("~wsf");
        if (pos > 0) {
            url = url.substring(0, pos);
        }
        document.location.href = url;
        return;
    }

    $j.ajax({
        type: "GET",
        url: url,
        success: function(data) {

            addBackButtonHistory(fid, cid, url);
            if (container["initHistory"] == null) {
                container["initHistory"] = container.innerHTML; // Store Initial State for History
            }
            container[cid] = data;
            $j(container).html(data);

            intiAjShCnt();
        },
        complete: function(xml, textStatus) {
            if (xml != undefined) {
                var path = xml.getResponseHeader("METRICSPATH");
                if (path != undefined) {
                    mTable[cid] = path;
                    setIEWatchMetricsPath(path);
                    trackTabMetrics();
                }
                $j("#cntTabsCnt").css("width", container.scrollWidth);
            }
        }
    });
}

function setIEWatchMetricsPath(path) {
    var mObj = $j("head META[@name='METRICSPATH']");
    if (mObj != undefined) {
        try {
            mObj.attr("content", "&eiwatch=" + path);
        }
        catch (e) { }
    }
}


function findForm() {
    var formIdx = 0;
    for (formIdx = 0; formIdx < document.forms.length; formIdx++) {
        var urlTabs = document.forms[formIdx].action.toLowerCase();
        if (urlTabs.indexOf('~wsf=tabs') != -1) {
            document.forms[formIdx].action = urlTabs.replace("&~wsf=tabs", "");
        }
    }
}
var ajaxavailable = (getXMLHTTPObj() != undefined);
var xmlreqs = undefined;
/* oo_engine.js OnlineOpinion (S3tS v3.1) */
/* This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. */
function TLGetCookie(c_name)
 {
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return ""
};
var custom_var,_sp='%3A\\/\\/',_rp='%3A//',_poE=0.0,_poX=0.0,_sH=screen.height,_d=document,_w=window,_ht=escape(_w.location.href),_hr=_d.referrer,_tm=(new Date()).getTime(),_kp=0,_sW=screen.width;function _fC(_u){_aT=_sp+',\\/,\\.,-,_,'+_rp+',%2F,%2E,%2D,%5F';_aA=_aT.split(',');for(i=0;i<5;i++){eval('_u=_u.replace(/'+_aA[i]+'/g,_aA[i+5])')}return _u};function O_LC(){tleaf_cv=escape(escape(TLGetCookie('s_vi')))+'|';_w.open('https://secure.opinionlab.com/ccc01/comment_card.asp?time1='+_tm+'&time2='+(new Date()).getTime()+'&prev='+_fC(escape(_hr))+'&referer='+_fC(_ht)+'&height='+_sH+'&width='+_sW+'&custom_var='+tleaf_cv+custom_var,'comments','width=535,height=192,screenX='+((_sW-535)/2)+',screenY='+((_sH-192)/2)+',top='+((_sH-192)/2)+',left='+((_sW-535)/2)+',resizable=yes,copyhistory=yes,scrollbars=no')};function _fPe(){if(Math.random()>=1.0-_poE){O_LC();_poX=0.0}};function _fPx(){if(Math.random()>=1.0-_poX)O_LC()};window.onunload=_fPx;function O_GoT(_p){_d.write('<a href=\'javascript:O_LC()\'>'+_p+'</a>');_fPe()}
function doOpionlabs(_p) {
    var metricPath = null;
    var metas = document.getElementsByTagName("META");
    var _lG = pageLang + "-" + pageCnty + ".";
    if (pageLang == "jp") {
        _lG = "ja-JP.";
    }
    else if (pageLang == "en") {
        _lG = "";
    }
    if (metas != null) {
        for (i = 0; i < metas.length; i++) {
            if (metas[i].name == "METRICSPATH") {
                metricPath = metas[i].getAttribute("CONTENT");
                if (metricPath != null && metricPath.length > 9) {
                    metricPath = metricPath.substring(9);
                }
                break;
            }
        }
    }
    var ssid = getCookie("SITESERVER");
    if (ssid != null && ssid.length > 3) {
        ssid = ssid.substring(3);
    }
    custom_var = ssid + "|" + metricPath + "|" + pageSeg;
    _rp = '%3A//' + _lG;
    if (_p != null) {
        O_GoT(_p);
    }
}

function doIPerceptions(ratio, jsFile) {
    var randomNumber = Math.floor((Math.random() * 100));
    if (randomNumber < ratio) {
        loadIPScript(jsFile);
    }
}

function loadIPScript(path) {
    var head = document.getElementsByTagName("head")[0];
    script = document.createElement('script');
    script.type = "text/javascript";
    script.defer = "defer";
    script.src = path;
    head.appendChild(script);
}

//start of promo compare reinvention

function SetProductStyle(products, style) {
    for (var i = 0; i < products.length; i++) {
        document.getElementById(products[i]).className = style;
    }
}
function ProductsOnMouseOver(products) {
    var style = ' para_small product_highlight_background_image product_border_gray product_div ';
    SetProductStyle(products, style);
}

function ProductsOnMouseOut(products) {
    var style = ' para_small product_border_white product_div ';
    SetProductStyle(products, style);
}

function SetPromoStyle(promos, positions, promoStyle, titleStyle, promoPerRow) {
    var temp = '';

    for (var i = 0; i < promos.length; i++) {
        temp += promoStyle;

        if ((positions[i] % promoPerRow) == 1) {
            temp += " promo_border_left ";
        }
        if (positions[i] <= promoPerRow) {
            temp += " promo_border_top ";
        }

        document.getElementById(promos[i]).className = temp;
        document.getElementById(promos[i].replace('_promo', '_promo_title')).className = titleStyle;
        temp = '';
    }
}
function PromosOnMouseOver(promos, positions, promoPerRow) {
    var promoStyle = ' para_small promo promo_border promo_highlight_background_color ';
    var titleStyle = 'lnk_promo_white';
    SetPromoStyle(promos, positions, promoStyle, titleStyle, promoPerRow);
}

function PromosOnMouseOut(promos, positions, promoPerRow) {
    var promoStyle = ' para_small promo promo_border promo_background_color ';
    var titleStyle = 'promo_compare_promo_title';
    SetPromoStyle(promos, positions, promoStyle, titleStyle, promoPerRow);
}

function Resize() {
    var obj = document.getElementById('scriptparams');
    var pro = document.getElementById('promocompare_promos');
    var proWidth = 0;
    if (pro != null) {
        proWidth = pro.offsetWidth;
    }

    if (obj != null) {
        var productString = obj.value;
        var products = productString.split(",");

        var i;
        var maxDescHeight = 0;
        var maxNameHeight = 0;
        var maxPriceHeight = 0;
        var totalWidth = 0;

        for (i = 0; i < products.length; i++) {
            if (document.getElementById(products[i].replace('div', 'desc')).offsetHeight > maxDescHeight) {
                maxDescHeight = document.getElementById(products[i].replace('div', 'desc')).offsetHeight;
            }

            if (document.getElementById(products[i].replace('div', 'price')).offsetHeight > maxPriceHeight) {
                maxPriceHeight = document.getElementById(products[i].replace('div', 'price')).offsetHeight;
            }
            if (document.getElementById(products[i].replace('div', 'name')).offsetHeight > maxNameHeight) {
                maxNameHeight = document.getElementById(products[i].replace('div', 'name')).offsetHeight;
            }
            totalWidth += document.getElementById(products[i].replace('_div', '')).offsetWidth;
        }

        for (i = 0; i < products.length; i++) {
            document.getElementById(products[i].replace('div', 'desc')).style.height = maxDescHeight;
            document.getElementById(products[i].replace('div', 'price')).style.height = maxPriceHeight;
            document.getElementById(products[i].replace('div', 'name')).style.height = maxNameHeight;
        }
        totalWidth = totalWidth > proWidth ? totalWidth : proWidth;
        if (totalWidth > 696) {
            if (document.getElementById('cntTabsCnt') != null) {
                document.getElementById('cntTabsCnt').style.width = totalWidth + 40; //40 is the spaces between the product and tab content border on both sides
            }
        }
    }
}

addsReady(psInit);

function psInit() {

    if (pageSeg == "dhs" && pageCnty == "us") {
        var path = m_imgPfx + "/images/global/js/ps2b.js";
        //pants
        var head = document.getElementsByTagName("head")[0];
        if (head != null) {
            try {
                var script = document.createElement('script');
                script.type = "text/javascript";
                script.src = path;
                head.appendChild(script);
            }
            catch (e)
		        { }
        }
    }

}

//end of promo compare reinvention
function divFade(id, startOpac, endOpac, incOpac, fadeSpeed, validate, callback) // div name/id, start opacity %, end opacity %, opacity increment %, timeout speed, valid div totally faded in or out, callback function
{
    var div = document.getElementById(id);
    if (validate) {
        if (startOpac == 0 && endOpac != 0 && div.style.display == "block") {
            return;
        }
        if (startOpac == 100 && endOpac != 100 && div.style.display == "none") {
            return;
        }
    }
    div.style.filter = "alpha(opacity=" + startOpac + ")";
    var timeoutFade = null;
    if (div) {
        div.style.filter = "alpha(opacity=" + startOpac + ")";
        div.style.opacity = (startOpac / 100);
        div.style.display = "block";
        if (startOpac == endOpac) {
            div.style.filter = "alpha(opacity=" + endOpac + ")";
            div.style.opacity = (endOpac / 100);
            if (endOpac == 0) {
                div.style.display = "none";
            }
            if (callback) {
                callback();
            }
        }
        else if (startOpac < endOpac && startOpac + incOpac < endOpac) {
            timeoutFade = setTimeout("divFade('" + id + "', " + (startOpac + incOpac) + ", " + endOpac + ", " + incOpac + ", " + fadeSpeed + ", " + validate + ", " + callback + ")", fadeSpeed);
        }
        else if (startOpac > endOpac && startOpac - incOpac > endOpac) {
            timeoutFade = setTimeout("divFade('" + id + "', " + (startOpac - incOpac) + ", " + endOpac + ", " + incOpac + ", " + fadeSpeed + ", " + validate + ", " + callback + ")", fadeSpeed);
        }
        else {
            timeoutFade = setTimeout("divFade('" + id + "', " + endOpac + ", " + endOpac + ", " + incOpac + ", " + fadeSpeed + ", " + validate + ", " + callback + ")", fadeSpeed);
        }
    }
}

function HideRow(id) {

    if (document.getElementsByName) {

        var rows = document.getElementsByName(id);
        if (rows && rows.length > 0) {

            for (i = 0; i < rows.length; i++) {

                if (rows[i].style.display == "none") {
                    rows[i].style.display = "";
                }
                else {

                    rows[i].style.display = "none";
                }
            }
        }
    }

}
addsReady(compareClick);
//Checkbox click 
function compareClick() {


    //enable or disable the compare button based on number of selected prods
    var enabled = $j(".compareprodcb[@checked]").length > 0;
    $j("span[@name=compare_btn]").attr("disabled", !enabled);

    if (enabled)
        $j("span[@name=compare_btn]").attr("class", "btn_compare_new");
    else
        $j("span[@name=compare_btn]").attr("class", "btn_compare_newDisabled");

    //assign the product value if the checkbox is checked
    var chk = document.getElementsByName("compareprods");
    var urlPageChange = document.location;

    //assign the variable on page index change
    if ((urlPageChange.toString().indexOf('&selectedProds=') != -1) && (m_navPage == null || m_navPage.length == 0)) {
        var index = urlPageChange.toString().indexOf('&selectedProds=');
        if (index + 15 != urlPageChange.toString().length) {
            m_navPage = urlPageChange.toString().substring(index + 15);
        }
    }
    
        
    //loop thru products and add or remove the product value based on the product selection
    for (var i = 0; i < chk.length; i++) {
        if ((m_navPage == null || m_navPage.length == 0) && (chk[i].checked)) {
            m_navPage = chk[i].value;
        }
        else if ((m_navPage != null) && (m_navPage.length > 0)) {

            if ((chk[i].checked) && (CheckForDuplicateProduct(m_navPage, chk[i].value) == false)) {
                m_navPage = m_navPage + ',' + chk[i].value;
            }
            else if ((!(chk[i].checked)) && (CheckForDuplicateProduct(m_navPage, chk[i].value) == true)) {
                if (m_navPage.indexOf(chk[i].value) == 0) {
                    m_navPage = m_navPage.replace(chk[i].value, '');
                }
                else {
                    m_navPage = m_navPage.replace(',' + chk[i].value, '');
                }
            }
        }
    }
    //append the js variable value to the pagenumber hrefs
    var links = $j(".PaginationCtrlpageNumber");
    if (links.length != 0) {
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.indexOf('javascript:navPage') == -1 && m_navPage != null && m_navPage.length > 0) {
                if (links[i].href.indexOf('&selectedProds=') == -1) {
                    links[i].href = links[i].href + "&selectedProds=" + m_navPage;
                }
                else {
                    var index = links[i].href.indexOf('&selectedProds=');
                    var replace = links[i].href.substring(index);
                    links[i].href = links[i].href.replace(replace, '');
                    links[i].href = links[i].href + "&selectedProds=" + m_navPage;
                }
            }
        }
    }


    if (m_navPage != null) {
        if (m_navPage.length > 0) {
            appendUrl(".FirstPageImg");
            appendUrl(".LastPageImg");
            appendUrl(".PrevImg");
            appendUrl(".NextImg");
        }
    }


}

function CheckForDuplicateProduct(prods, prodid) {

    var prodarr = prods.split(',');
    if (prodarr.length == 1) {
        if (prodarr[0] == prodid) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (prodarr.length > 1) {
        for (var i = 0; i < prodarr.length; i++) {
            if (prodarr[i] == prodid) {
                return true;
            }
        }
        
        return false;
    }

}


//to append m_navPage to pagination arrow images
function appendUrl(cssClassName) {

    var link = $j(cssClassName);
    if (link[0] != undefined) {
        if (link[0].href.indexOf('javascript:navPage') == -1) {
            if (link[0].href.indexOf('&selectedProds=') == -1) {
                link[0].href = link[0].href + "&selectedProds=" + m_navPage;
            }
            else {
                var index = link[0].href.indexOf('&selectedProds=');
                var replace = link[0].href.substring(index);
                link[0].href = link[0].href.replace(replace, '');
                link[0].href = link[0].href + "&selectedProds=" + m_navPage;
            }
        }

    }
}


//compare button click
function compareItems() {

    //used the js variable to append the selected prods to url
    if (!(m_navPage == null)) {
        if (m_navPage.length > 0) {
            document.location = m_compareUrl + "&prods=" + m_navPage;
        }
    }
}

function ToggleExpandCollapse(id) {

    HideRow(id);

    var divs = document.getElementsByName("dynamic_compare_toggle");

    if (divs && divs.length > 0) {
        for (i = 0; i < divs.length; i++) {

            if (divs[i].style.display == "none") {
                divs[i].style.display = "";
            }
            else {

                divs[i].style.display = "none";
            }
        }
    }
}
//moved var initialization to top as a workaround for escaping
// wierd netscape exception on accessing screen.size
//which causes this var not to be initialized

function addOnMenuLoad(fn) {
    if (m_menuloaded) {
        fn();
    }
    else {
        m_menuload[m_menuload.length] = fn;
    }
}
function onMenuLoad() {
    m_menuloaded = true;
    for (var i = 0; i < m_menuload.length; i++) {
        m_menuload[i]();
    }

}

function addScript(jsfile, callback) {
    var path = m_imgPfx + jsfile;
    var head = document.getElementsByTagName("head")[0];
    if (head != null) {
        try {
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.src = path;
            if (callback) {
                script.onreadystatechange = function() {
                    if (callback && ("complete" == script.readyState || "loaded" == script.readyState))
                    { callback(); callback = null; }
                };
                script.onload = function() {
                    if (callback) {
                        callback(); callback = null;
                    }
                };
            }
            head.appendChild(script);
        }
        catch (e) {
            alert(e.description);
        }
    }
}

function showDialog(dialog) {
    if (typeof (LoadDialog) == "undefined") {
        addScript("/images/global/js/dialog.js", function() { showDialog(dialog); });
        return;
    }
    LoadDialog(dialog);
}

function showYPanel(id, header, body, footer, config) {
    if (typeof (YAHOO) == "undefined" || typeof (YAHOO.widget) == "undefined") {
        addScript("/images/global/js/yui/yui.js", function() { showYPanel(id, header, body, footer, config); });
        return;
    }
    if (typeof (YAHOO.storm) == "undefined") {
        YAHOO.namespace("storm.container");
    }
    var panel = YAHOO.storm.container[id];
    var needsRender = panel == null;

    if (config == null) {
        config = { width: "300px", fixedcenter: true, visible: false, constraintoviewport: true, effect: { effect: YAHOO.widget.ContainerEffect.FADE, duration: 0.25} };
    }
    if (config.makeFade) {
        if (config.fadeSpeed != null) {
            config.effect = { effect: YAHOO.widget.ContainerEffect.FADE, duration: config.fadeSpeed };
        }
        else {
            config.effect = { effect: YAHOO.widget.ContainerEffect.FADE, duration: 0.25 };
        }
    }
    if (needsRender) {
        panel = new YAHOO.widget.Panel(id, config);
        YAHOO.storm.container[id] = panel;
    }
    else {
        for (i in config) {
            if (config[i] != panel.cfg.getProperty(i)) {
                panel.cfg.setProperty(i, config[i]);
            }
        }
    }
    panel.setHeader(header);
    panel.setBody(body);
    panel.setFooter(footer);
    if (needsRender) {
        panel.render(document.body);
    }
    if (config.visible != false) {
        panel.show();
    }
}

function hideYPannel(id) {
    if (typeof (YAHOO) == "undefined" || typeof (YAHOO.widget) == "undefined") {
        return;
    }
    var panel = YAHOO.storm.container[id];
    if (panel != null) {
        panel.hide();
    }
}
//For appending the site server id for ipercerptions - can be used with any url
function AppendSiteServerId(url) {
    var guidQs = (url.indexOf("?") != -1) ? "&guid=" : "?guid=";
    url = url + guidQs + getSiteServerId();
    return url;
}
function getSiteServerId() {
    var cookie = getCookie("SITESERVER");
    var cookieValue = getCookieKeyValue("SITESERVER", "ID");
    return cookieValue;
}


function RenderBorder() {

    document.writeln("<table id=\"borderTable\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" bgcolor=\"#ededed\">");
    document.writeln("<tr><td bgcolor=\"#999999\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" border=\"0\" height=\"1\" width=\"1\" alt=\"\" /></td></tr>");
    document.writeln("</table>");
}

function RenderViewLargeTextURL(cls, lnk, txt) {
    var viewUrl = "<div class=\"" + cls + "\"><a href=\"" + lnk + "\" style=\"padding-left:20px\">" + txt + "</a></div>";

    document.writeln(viewUrl);

}
function RenderStartLegalLinks() {
    document.writeln("<table width=\"100%\" cellpadding=\"0\" style=\"padding-left:10px;\" cellspacing=\"0\" border=\"0\" bgcolor=\"#ededed\">");
    document.writeln("<tr><td colspan=\"2\" ><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" border=\"0\" height=\"5\" width=\"1\" alt=\"\" /></td></tr><tr><td width=\"100%\" align=\"center\" valign=\"top\">");
}

function RenderEndLegalLinks(gototop) {
    document.writeln("</td><td><table><tr><td valign=\"middle\"><img src=\"" + m_imgPfx + "/images/global/brand/ui/arrow_top.gif\" width=\"7\" height=\"4\" alt=\"\" border=\"0\"></td><td style=\"padding-right:6px;\" valign=\"middle\"><a href=\"#mastheadtop\"><span class=\"para\">" + gototop + "</span></a></td></tr></table></td></tr><TR><td colspan=\"2\" ><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"\" border=\"0\" height=\"5\" width=\"1\" /></td></tr><TR><td colspan=\"2\" bgcolor=\"#cdcdcd\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" alt=\"\" border=\"0\" height=\"1\" width=\"1\" /></td></tr></table>");
}

//for resizing result grid control
function rgResizeContainerDiv() {

    var rows = $j('.rgRow');

    if (rows.length > 0) {
        var diff = 0;
        for (var i = 0; i < rows.length; i++) {

            var divs = $j(rows[i]).find('div.rgOuterBodyContainer div.rgBodyContainer div.rgBody');
            var footer = $j(rows[i]).find('div.rgOuterBodyContainer div.rgFooterContainer');

            if (divs.length > 0) {
                var h1 = $j(divs[0]).height();
                var h2 = $j(rows[i]).height();
                diff = (h2 - h1 - 15 - 40);
            }

            if (footer.length > 0) {
                $j(footer[0]).height(40);
                if (diff > 4) {
                    $j(footer[0]).css('margin-top', diff);
                }

            }

        }

    }
}

function ajInit() {

}

var m_tnNeed = new Array();
var m_tnData = new Array();
var m_tnCount = 1;
function InitTechNotes() {
    if (typeof (m_tnPopupEnabled) != 'undefined' && m_tnPopupEnabled == true) {
        var otrail = document.getElementById('processingCaptionID');
        if (otrail)
            otrail.innerHTML = "";

        $j("sup[@tn]").livequery(function() {
            var tn;
            if (this.parentNode.nodeName == "A") {
                tn = $j(this.parentNode);
            }
            else {
                tn = $j(this);
            }
            tn.addClass('technote_link');
            tn.bind('click', followmouse);
            var tnid = $j(this).attr("tn");
            if (m_tnData[tnid] == undefined) {
                m_tnData[tnid] = m_tnCount;
                m_tnCount++;
            }
            $j(this).html(m_tnData[tnid]);
            var requestUrl = m_requestURLBase + "&~tnmode=html&i=" + tnid;
            tn.attr('rel', requestUrl);
            tn.cluetip({ activation: "click", arrowHPosition: 'offset', positionBy: 'topBottom', width: '400px', cluetipClass: 'jtip', arrows: true, arrowSize: 'lg', hoverIntent: false, showTitle: false, dropShadow: true, waitImage: false, mouseOutClose: true, sticky: true, closeText: '',
                onActivate: function(e) { $j("#cluetip-inner").show(); return true; },
                onShow: function(e) {
                    $j(".itemInnerInnerContainer").css({ width: "356px" });
                    $j(".itemCloseContainer").click(function() {
                        $j("#cluetip").hide();
                        return false;
                    });
                    gettrailobj().css({ visibility: "hidden" });
                    $j(document).unbind('click', followmouse);
                    return true;
                }
            });
        });
    }
    else {
        $j("sup[@tn]").livequery(function() { inittechnotes(this); });
    }
}

function inittechnotes(elem) {
    var tnid = $j(elem).attr("tn");
    if (tnid && tnid.length > 0 && m_tnData[tnid] == undefined && m_tnNeed[tnid] == undefined) {
        m_tnNeed[tnid] = tnid;
        if (typeof (m_requestURLBase) != 'undefined') {
            $j.get(m_requestURLBase + "&i=" + tnid, function(data) {
                eval(data.replace(/\r\n/g, ''));
                var note = { "k": tnArray[0].k, "v": tnArray[0].v, "i": m_tnCount };
                m_tnData[tnArray[0].k] = note;
                var tns = $j("sup[@tn=" + tnid + "]");
                if (tns.length > 0) {
                    tns.each(function() {
                        if (m_tnData[tnid] != null) {
                            $j(this).html(m_tnData[tnid].i);
                            $j(this).click(function() { technoteclick(this); });
                        }
                    });
                }
                m_tnCount++;
                var technotehtml = "<div " + (m_isRtl ? "style=\"text-align:right\"" : "") + "><a style='color:black;' name='tn" + note.i + "'><sup>" + note.i + "</sup></a>&nbsp;" + note.v + "</div><br />";
                $j("#footer").append(technotehtml);
                $j("#endnotes").append(technotehtml);
            });
        }
    }
    if (m_tnData[tnid] != undefined) {
        $j(elem).html(m_tnData[tnid].i);
        $j(elem).click(function() { technoteclick(this) });
    }
}
function technoteclick(sender) {
    var tn = $j(sender).attr("tn");
    if (tn != undefined && m_tnData[tn] != undefined && m_tnData[tn].i != undefined && !(/\D/.test($j(sender).html()))) {
        document.location.href = "#tn" + m_tnData[tn].i;
        return;
    }
    if (tn != undefined && m_glossaryURLBase != undefined && m_glossaryURLBase.length > 0) {
        window.open(m_glossaryURLBase + "?f=" + tn, 'tnwin', 'WIDTH=400,HEIGHT=300,RESIZABLE=YES,SCROLLBARS=YES,STATUS=NO,TOOLBAR=NO,LEFT=0,TOP=0');
    }
}



function InitToolTips() {
    $j("span[@glid]").livequery(function() {
        var gdeco = $j(this).attr("glnodeco");
        var gtitle = $j(this).attr("gltitle");
        if (typeof (gdeco) == "undefined") {
            $j(this).addClass('glossaryitem');
        }
        else {
            $j(this).addClass('glossaryitem_nodecoration');
        }
        var requestUrl = m_requestURLBase + "&~ttmode=html&~ttid=" + escape(this.attributes.glid.value);
        if (this.attributes.glmoredetails) {
            var ref = src.attributes.glmoredetails.value;
            ref = ref.replace(/:/g, "~");
            requestUrl += "&~ttref=" + ref;
        }
        $j(this).attr('rel', requestUrl);
        $j(this).cluetip({ arrowHPosition: 'offset', delayedClose: typeof (m_containerTimeout) != 'undefined' ? m_containerTimeout : 500, delayedOpen: typeof (hoverovertime) != 'undefined' ? hoverovertime : 500, positionBy: 'topBottom', width: '400px', cluetipClass: 'jtip', arrows: true, arrowSize: 'lg', hoverIntent: false, showTitle: false, dropShadow: true, waitImage: false, mouseOutClose: true, sticky: true, closeText: '', onActivate: function(e) { $j("#cluetip-inner").show(); return true; },
            onShow: function(e) {
                $j(".itemCloseContainer").click(function() {
                    $j("#cluetip").hide();
                    return false;
                });
                var title = $j(".itemContainerTitle").html();
                if (title == null || title.length == 0 || title == "&nbsp;") {
                    $j(".itemContainerTitle").html(gtitle);
                }
                return true;
            }
        });
    });
}

function InitClueTip() {


    $j(".hv_cluetip")
    .livequery(function() {
        $j(this).cluetip({ positionBy: 'auto', width: '251px', cluetipClass: 'jtip', arrows: true, hoverIntent: false, showTitle: false, waitImage: false, onActivate: function(e) { $j("#cluetip-inner").show(); return true; } });

    });



    $j(".ic_cluetip")
    .livequery(function() {
        $j(this).cluetip({ width: '160px', topOffset: '10', splitTitle: '|', dropShadow: false, arrowSize: 'sm', arrows: true, cluetipClass: 'jtip', showTitle: false, positionBy: 'bottomTop', hoverIntent: false, cursor: 'default', onActivate: function(e) { $j(this).attr('title', ''); return true; } });


    });


}

function PricingAlignment() {
    $j("div[@name=pricing_descriptions]")
        .livequery(function() {
            var divs = $j("div[@name=pricing_descriptions]"); var divHeight = 0;
            for (var i = 0; i < divs.length; i++) {
                var offsetHeight = divs[i].offsetHeight;
                divHeight = offsetHeight > divHeight ? offsetHeight : divHeight;
            }
            if (divHeight > 0 && this.offsetHeight < divHeight)
                this.style.height = divHeight;
        });
}


function StringBuffer() {
    this.buffer = [];
}

StringBuffer.prototype.append = function append(string) {
    this.buffer.push(string);
    return this;
};

StringBuffer.prototype.toString = function toString() {
    return this.buffer.join("");
};



function getLwp() {
    var cntr = "";
    var segm = "";
    var lang = "";
    var cs = "";

    var gotq = m_curUrl.split('?').length > 1;

	try {
		if (gotq) {
			cntr = $j.jqURL.get("c");
			segm = $j.jqURL.get("s");
			lang = $j.jqURL.get("l");
			cs = $j.jqURL.get("cs");
		}
	}
	catch(err) { }
    var lwp = new StringBuffer();
    if (cntr == null || cntr.length == 0) {
        cntr = getCookieKeyValue("lwp", "c");
    }
    if (segm == null || segm.length == 0) {
        segm = getCookieKeyValue("lwp", "s");
    }
    if (lang == null || lang.length == 0) {
        lang = getCookieKeyValue("lwp", "l");
    }
    if (cs == null || cs.length == 0) {
        cs = getCookieKeyValue("lwp", "cs");
    }
    if (cntr != null && cntr.length != 0) {
        lwp.append("&c=");
        lwp.append(cntr);
    }
    if (segm != null && segm.length != 0) {
        lwp.append("&s=");
        lwp.append(segm);
    }
    if (lang != null && lang.length != 0) {
        lwp.append("&l=");
        lwp.append(lang);
    }
    if (cs != null && cs.length != 0) {
        lwp.append("&cs=");
        lwp.append(cs);
    }
    return lwp.toString().split('#')[0];
}

function NewShowHide(id) {

    if (document.getElementsByName) {

        var temp;
        var newarray = id.split(' ');

        for (var j = 0; j < newarray.length; j++) {
            temp = newarray[j];

            var divs = document.getElementsByName(temp);

            if (divs && divs.length > 0) {
                for (i = 0; i < divs.length; i++) {
                    if (divs[i].style.display == "none") {
                        divs[i].style.display = "block";
                    }
                    else {
                        divs[i].style.display = "none";
                    }
                }
            }
        }
    }
}

function StripCookieValue(inVal, removeVal) {
    if (!inVal || inVal.length == 0 || !removeVal || removeVal.length == 0) {
        return inVal;
    }
    var idx = 0;
    var ampIdx = 0;
    var semiIdx = 0;
    var len = 0;
    var repString = "";
    idx = inVal.indexOf(removeVal);
    if (idx > -1) {
        ampIdx = inVal.indexOf("&", idx);
        semiIdx = inVal.indexOf(";", idx);
        len = ampIdx;
        if (len == -1) {
            len = semiIdx;
        }
        else if (semiIdx != -1 && semiIdx < len) {
            len = semiIdx;
        }
        if (len > -1) {
            repString = inVal.substring(idx, len);
        }
        else {
            repString = inVal.substr(idx);
        }
        return inVal.replace(repString, "").replace("&&", "&");
    }
    return inVal;
}

function getCookieKeyValue(cname, id, caseSensitive) {
    try {
        var offset = 1;
        var sid = id + "=";
        var sid1 = "?" + id + "=";
        var sid2 = "&" + id + "=";
        var lwp = getCookie(cname);
        var startIdx = 0;
        var endIdx = 0;
        var kvalue = null;
        if (lwp.indexOf(sid1) != -1) {
            sid = sid1;
            offset = 2;
        }
        if (lwp.indexOf(sid2) != -1) {
            sid = sid2;
            offset = 2;
        }
        if (lwp.indexOf(sid) == -1) {
            return null;
        }
        else {
            startIdx = lwp.indexOf(sid) + id.length + offset;
            if (lwp.substring(startIdx).indexOf("&") == -1) {
                return lwp.substring(startIdx);
            }
            else {
                endIdx = lwp.substring(startIdx).indexOf("&") + startIdx;
            }
        }
        kvalue = lwp.substring(startIdx, endIdx);
    }
    catch (e)
{ }
    if (caseSensitive == true) {
        return kvalue;
    }
    else {
        return kvalue.toLowerCase();
    }
}

function getCookie(NameOfCookie) {
    if (document.cookie.length > 0) {
        begin = document.cookie.indexOf(NameOfCookie + "=");
        if (begin != -1) {
            begin += NameOfCookie.length + 1;
            end = document.cookie.indexOf(";", begin);
            if (end == -1) {
                end = document.cookie.length;
            }
            return unescape(document.cookie.substring(begin, end));
        }
    }
    return "";
}

function SetCookie(NameOfCookie, value) {
    SetCookieValue(NameOfCookie, value, false, true);
}
function SetCookieValue(NameOfCookie, value, persist, escaped) {
    var expires = "";
    if (persist == true) {
        expires = new Date();
        expires.setYear(expires.getYear() + 2);
        expires = expires.toGMTString();
    }
    document.cookie = NameOfCookie + "=" + (escaped == false ? value : escape(value)) + ";path=/;domain=dell.com;" + (persist == true ? ("expires=" + expires + ";") : "");
}

function StormCookie() {
    var STORMSCOOKIE = "StormSCookie";
    this.session = {
        cookieName: STORMSCOOKIE,
        cookieValue: getCookie(STORMSCOOKIE),
        setCookie: function(key, value) {
            var vals = getCookie(STORMSCOOKIE);
            var val = getCookieKeyValue(STORMSCOOKIE, key, true);
            if (val != value) {
                var idx = this.cookieValue.indexOf(key + "=" + val, 0);
                var amp = (idx == 0 || this.cookieValue.length == 0) ? "" : "&";
                if (idx == -1) {
                    SetCookieValue(STORMSCOOKIE, this.cookieValue + amp + key + "=" + value, false, false);
                }
                else {
                    SetCookieValue(STORMSCOOKIE, this.cookieValue.replace(amp + key + "=" + val, amp + key + "=" + value), false, false);
                }
                this.cookieValue = getCookie(STORMSCOOKIE);
            }
        },
        getCookie: function(key) {
            return getCookieKeyValue(STORMSCOOKIE, key, true);
        }
    };
    var STORMPCOOKIE = "StormPCookie";
    this.persistant = {
        cookieName: STORMPCOOKIE,
        cookieValue: getCookie(STORMPCOOKIE),
        setCookie: function(key, value) {
            var val = getCookieKeyValue(STORMPCOOKIE, key, true);
            if (val != value) {
                var idx = this.cookieValue.indexOf(key + "=" + val, 0);
                var amp = (idx == 0 || this.cookieValue.length == 0) ? "" : "&";
                if (idx == -1) {
                    SetCookieValue(STORMPCOOKIE, this.cookieValue + amp + key + "=" + value, true, false);
                }
                else {
                    SetCookieValue(STORMPCOOKIE, this.cookieValue.replace(amp + key + "=" + val, amp + key + "=" + value), true, false);
                }
                this.cookieValue = getCookie(STORMPCOOKIE);
            }
        },
        getCookie: function(key) {
            return getCookieKeyValue(STORMPCOOKIE, key, true);
        }
    };
}



function InitPriceForPremierOffers() {
    var pTimer = setInterval(IntervalPricingUpdateForPremier, 1000);
}

function IntervalPricingUpdateForPremier() {
    var rand = Math.floor(Math.random() * 100);
    $j("div[@name=rgOfferPrice]").each(function() {
        var url = $j(this).attr("rel");
        url += "&rdm=" + rand;
        var div = $j(this.parentNode);
        $j.get(url, function(data) {

            if (data != undefined && data != null && data.length > 0) {
                div.html(data);
            }
        });
    });
}

function addScript2(jsfile) {
    var path = m_imgPfx + jsfile;
    var head = document.getElementsByTagName("head").item(0);
    if (head != null) {
        try { var script = document.createElement('script'); script.src = path; script.type = "text/javascript"; script.async = true; script.defer = true; head.appendChild(script); }
        catch (e) { } 
    }
}
function fnautocomplete(m_asconfig, m_autocomplete, m_max, m_contains, action) {
    maxCaptionLength = 50;
    try {
        if (typeof jQuery != 'undefined')
            jQuery(document).ready(
        function () {
            $(m_asconfig).autocomplete(m_autocomplete,
                {
                    matchContains: m_contains,
                    highlightItem: true,
                    scroll: false,
                    extraParams: { contains: m_contains ? "1" : "0" },
                    max: m_max,
                    cacheLength: 1,
                    highlight: function (val, term) {
                        if ((val.length > 4) && (val.substr(0, 4) == "<div")) { return val; }
                        else {
                            if (this.matchContains) { return "<div class=\"ac_term_contains\">" + val.replace(term, "<strong>" + term + "</strong>") + "</div>"; }
                            else { return "<div class=\"ac_term\">" + term + "<strong>" + val.slice(term.length) + "</strong>" + "</div>"; }
                        }
                    },
                    formatItem: function (row, i, max, value) {
                        if (i == 1 && row.length > 3) {
                            var suggestion = row[0];
                            var rank = row[1];
                            var answer = row[2];
                            var image = row[4];
                            var imageWidth = row[5];
                            var imageHeight = row[6];
                            var caption = row[7];
                            var title = row[8];

                            if (caption) caption = (caption.length > maxCaptionLength) ? (caption.substr(0, maxCaptionLength) + " ...") : caption;
                            var c = '<div class="sa_sg sa_sgTR"><table><tr><td><img height="' + imageHeight + '" width="' + imageWidth + '" src="' + image + '"></td><td><div class="sa_tm">' + title + '</div><div class="sa_ds">' + caption + '</div></td></tr><table></div>';
                            return c;
                        }
                        else { return value; }
                    }
                });
             // Enter key handling for the query box
            $("input." + m_asconfig).keydown(
            function (event) {
                var keyCode = ('which' in event) ? event.which : event.keyCode;
                if (action) { $(this).result(action); }
            });
        });
    }
    catch (e) { }
}




//autocomplete
addsReady(function () {
    if (typeof (m_autocomplete) != "undefined" && m_autocomplete != ""){
            AddAutoComplete("#searchinput", m_autocomplete, null, function (event, item) { $j("form[@name='search']").append("<input type='hidden' name='ref' value='ac' >"); $j("form[@name='search']")[0].submit(); });
    } 
});

function AddAutoComplete(elem, url, options, action) {
    if (m_isSearchApp) {
	    fnautocomplete(elem, m_autocomplete, null, 'true', action);
    }
    else {
        if (options == null) options = { matchSubset: false, selectFirst: false, scrollHeight: 200 };

        if (action) { $j(elem).autocomplete(url, options).result(action); }
        else { $j(elem).autocomplete(url, options); }
	}
}
