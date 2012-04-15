var startListCalled = false;
var setHeaderCalled = false;
var cartCleared = false;
//Added constants for the menu Iframes, needs to match the style sheet
var MENU_HEIGHT = 24;
var MENU_PADDING = 1;
var MENU_HEIGHT_IE5 = 19;
var MENU_PADDING_IE5 = 10;
var MENU_TOP_MARGIN = 0;

var menuIsIE = (navigator.userAgent.toLowerCase().indexOf("msie") != -1);
var menuIsV3 = (menuIsIE && parseInt(navigator.appVersion) < 4);
var menuIsV5 = (menuIsIE && navigator.userAgent.toLowerCase().indexOf("msie 5.") != -1);
var menuIsV4 = (menuIsIE && navigator.userAgent.toLowerCase().indexOf("msie 4.") != -1);
var isIE6Up = (menuIsIE && !menuIsV4 && !menuIsV5 && !menuIsV3);

if (!isIE6Up && menuIsIE) {
    MENU_HEIGHT = MENU_HEIGHT_IE5;
    MENU_PADDING = MENU_PADDING_IE5;
}

var LOC_NAME_LENGTH = 42;

function startList() {
    if (!startListCalled) {
        startListCalled = true;
        // Remove menu when language set to Spanish
        var language = getCookieVal("Language")
        if (window.location.pathname.indexOf("/es/") > 0) {

            var footerEn = document.getElementById("footer");
            if (footerEn != null)
                footerEn.style.display = "none";
            var footerEs = document.getElementById("footerEs");
            if (footerEs != null)
                footerEs.style.display = "block";
        }

        // Add PageName field to the search form
        var pageNameField = document.createElement("input");
        pageNameField.setAttribute("type", "hidden");
        pageNameField.setAttribute("name", "PageName");
        pageNameField.setAttribute("value", document.title.replace(" ", "+"));
        var searchForm = document.getElementById("menuSearch");
        if (searchForm != null) {
            searchForm.appendChild(pageNameField);
        }
        var menu = document.getElementById("topMenu");
        if (menu != null) {
            if (document.getElementById && menu.style.display != "none" && menu.childNodes.length > 0) {
                var menuCss;
                var selectedMenu;
                var menuBackground;

                // add programming item if missing
                navItems = menu.getElementsByTagName("li");
                if (navItems.length > 0) {
                    if (window.location.pathname.indexOf("/es/") != 0) {
                        // the check is only for the english version
                        if (navItems.length < 7) {
                            var programmingLi = document.createElement("li");
                            programmingLi.innerHTML = '<a index="1" hbxrootmenuid="//Programming" hbxrootmenuorientation="down"><img src="' + window.location.protocol + '//www.comcast.com/images/topMenu/Programming.gif" width="108" height="27" alt="Programming" /></a>'
                            programmingLi.className = 'ProgrammingItem';
                            menu.insertBefore(programmingLi, navItems[2]);
                            navItems[0].getElementsByTagName("img")[0].width = 108;
                            navItems[1].getElementsByTagName("img")[0].width = 108;
                            navItems[2].getElementsByTagName("img")[0].width = 108;
                            navItems[3].getElementsByTagName("img")[0].width = 108;
                            navItems[4].getElementsByTagName("img")[0].width = 108;
                            navItems = menu.getElementsByTagName("li");

                        }   // end if (navItems.length < 9)

                        navItems[0].getElementsByTagName("img")[0].setAttribute("alt", "Products");
                        navItems[0].getElementsByTagName("img")[0].setAttribute("title", "Products");
                        navItems[4].getElementsByTagName("img")[0].setAttribute("alt", "Help");
                        navItems[4].getElementsByTagName("img")[0].setAttribute("title", "Help");
                    }

                    for (var i = 0; i < navItems.length; i++) {
                        node = navItems[i];
                        var link = node.getElementsByTagName("a")[0];
                        if (link != null)
                            link.setAttribute("index", i);
                        if (menuIsIE && !isIE6Up) {
                            for (var n = 0; n < document.styleSheets.length; n++) {
                                menuCss = document.styleSheets[n].href.match(/(comcast_)(\w+)(\.css$)/);
                                if (menuCss) {
                                    selectedMenu = menuCss[2].toLowerCase();
                                    var menuName = node.className.toLowerCase();
                                    if (menuName.indexOf(selectedMenu) > -1) {
                                        menuBackground = document.styleSheets[n].cssText.match(/(BACKGROUND-COLOR: )(#[\w\d]+)/);
                                        if (menuBackground)
                                            node.style.backgroundColor = menuBackground[2];
                                        //node.style.marginBottom = "1px";
                                        MENU_TOP_MARGIN = 42;
                                        node.getElementsByTagName("img")[0].style.marginBottom = "1px";
                                        break;
                                    }   // end if (menuName)
                                }   // end if (menuCss)

                            }   // end for( n )
                        }   // end if( menuIsIE && !isIE6Up )
                        //			if (node.id == "primarySearch")
                        //			{
                        //				var subNode = document.getElementById("menuSearchGo");
                        //				subNode.onmouseover = overItem;
                        //				subNode.onmouseout = outItem;		
                        //			}
                        //			else
                        //			{
                        node.onmouseover = overItem;
                        node.onmouseout = outItem;
                        //			}
                    }   // end for ( i )
                }   // end if (navItems.length > 0)
            }
        }
    }
    HideSignOutLinks();
}

function setHeaders() {
    if (!setHeaderCalled) {
        setHeaderCalled = true;
        if (document.getElementById) {
            var locHeader = document.getElementById("locationInfo");
            var locHeaderEs = document.getElementById("locationInfoEs");
            var locCookie = getCookieVal("Serviceability");
            if (locCookie.length > 0) {
                if (GetCookie("Serviceability", "Zip") != false) {
                    if (window.location.pathname.indexOf("/es/") > 0) {
                        //This should only be valid for CM
                        //the locationInfoEs div does not exist in non-CM pages.
                        if (locHeaderEs != null) {
                            locHeaderEs.style.display = "block";
                            var zipHeader = document.getElementById("zipInfoEs");
                            zipHeader.innerHTML = get5DigitZip();
                        }
                    }
                    else {
                        if (locHeader != null) {
                            locHeader.style.display = "block";
                            var zipHeader = document.getElementById("zipInfo");
                            zipHeader.innerHTML = get5DigitZip();
                        }
                    }
                }
            }

            var accountHeader = document.getElementById("myAccountInfo");
            var accountCookie = getCookieVal("Session");
            if (accountCookie.length > 0) {
                if (GetCookie("Session", "Hash") != false)
                    accountHeader.style.display = "block";
                if (GetCookie("Serviceability", "Zip") != false)
                    accountHeader.innerHTML += "|&#160;";
            }
        }
    }
}

function get5DigitZip() {
    //Substring is done to remove the +4 digit zip code returned from CSG
    var zip = GetCookie("Serviceability", "Zip");
    if (zip != null && zip != "")
        return zip.substring(0, 5);
    return "";
}


overItem = function(evt) {
    evt = (evt) ? evt : ((window.event) ? window.event : null);

    var targetElt = this;
    //	if (this.id == "menuSearchGo")
    //	{
    //		targetElt = this.parentElement.parentElement;
    //		alert("targetElt="+targetElt.id);
    //	}
    //var log = document.getElementById("logarea");
    //if (log.innerHTML.length > 400) log.innerHTML="";
    //log.innerHTML=log.innerHTML+"<br/>&lt;" + targetElt.tagName + targetElt.className;

    var oLink = targetElt.getElementsByTagName("a")[0];
    if (oLink && oLink.getAttribute("index") != null) {
        var index = oLink.getAttribute("index")

        // Create child lists if needed
        if (index < aMenu.length && targetElt.getElementsByTagName("ul").length == 0) {
            InsertChildren(targetElt, index);
        }
    }

    if (targetElt.parentNode.id == "topMenu") {
        var iframe = this.getElementsByTagName("iframe")[0];
        if (iframe) {
            iframe.style.visibility = "visible";
        }
        else {
            iframe = document.createElement("iframe");
            iframe.setAttribute("src", window.location.protocol + "//www.comcast.com/images/dot.gif");
            iframe.setAttribute("scrolling", "no");
            iframe.setAttribute("frameborder", "0");
            iframe.style.zIndex = "0";
            iframe.style.borderWidth = "0";

            var firstC = this.firstChild;
            while (firstC.nodeName == "#text" && firstC.nextSibling != null)
                firstC = firstC.nextSibling;
            if (firstC.nodeName == "#text")
                firstC = null;

            if (firstC != null && firstC.nodeName.toUpperCase() == "A") {
                var ul = this.getElementsByTagName("ul")[0].childNodes.length;
                iframe.width = this.offsetWidth * 2 - 13;
                iframe.height = MENU_HEIGHT * ul + MENU_PADDING;
            }
            else {
                iframe.width = 0;
                iframe.height = 0;
            }
            if (MENU_TOP_MARGIN > 0)
                iframe.style.top = MENU_TOP_MARGIN + "px";
            iframe.style.position = "absolute";
            this.appendChild(iframe);
        }
    }

    // IE hack for rollover state
    if (document.all && document.getElementById) {
        targetElt.className += " sfhover";
    }
    setSelectedTabCookie("&lid=//Shop//Digital Cable with On Demand");
    setSelectedTabCookie("&lid=//Shop//Comcast Bundles");
    setSelectedTabCookie("&lid=//Shop//High-Speed Internet ");
    if (menuIsIE)
        setSelectedTabCookie("&lid=//Shop//Comcast Digital Voice%C2%AE");
    else
        setSelectedTabCookie(unescape("&lid=//Shop//Comcast Digital Voice%AE"));

}
function setSelectedTabCookie(name) {
    var x = document.getElementsByName(name);
    if (x.length > 0) {
        if (menuIsIE)
            x[0].onclick = new function() { SetCookie("BuyFlow", "SelectedTab", "", false, true); };
        else
            x[0].setAttribute("onclick", "SetCookie(\"BuyFlow\", \"SelectedTab\", \"\", false, true);");
    }
}


function getLeftRelBody(item) {
    if (item.parentNode.tagName == "body")
        return document.body.offsetLeft;
    return item.offsetLeft + getLeftRelbody(item.parentNode);
}

function getTopRelBody(item) {
    if (item.parentNode.tagName == "body")
        return document.body.offsetTop;
    return item.offsetTop + getTopRelBody(item.parentNode);
}

outItem = function() {

    var targetElt = this;
    //	if (this.id == "menuSearchGo")
    //	{
    //		targetElt = this.parentElement.parentElement;
    //		alert("targetElt="+targetElt.id);
    //	}
    //var log = document.getElementById("logarea");
    //if (log.innerHTML.length > 400) log.innerHTML="";
    //log.innerHTML=log.innerHTML+"<br/>&gt;" + targetElt.tagName + targetElt.className;

    // IE hack for rollover state
    if (document.all && document.getElementById) {
        targetElt.className = targetElt.className.replace(new RegExp(" sfhover\\b"), "");
    }
    var iframe = this.getElementsByTagName("iframe")[0];
    if (iframe) {
        //iframe.style.display = "none";
        iframe.style.visibility = "hidden";
    }
}


// Add list children to uls
function InsertChildren(ListItem, Index) {
    var ul = document.createElement("ul");
    ul.innerHTML = aMenu[Index];
    ul.style.zIndex = "99";
    ListItem.appendChild(ul);
}

var addButtonRollover = function() {
    var aImg = document.getElementsByTagName("img");
    for (var i = 0; i < aImg.length; i++) {
        if (aImg[i].className == "button") {
            aImg[i].onmouseover = buttonRollOn;
            aImg[i].onmouseout = buttonRollOff;
        }
    }
}


var buttonRollOn = function() {
    var sOrgSrc = this.getAttribute("src");
    var sImage = sOrgSrc.substring(sOrgSrc.lastIndexOf("/"), sOrgSrc.length);
    var sExtension = sImage.substring(sImage.indexOf("."), sOrgSrc.length);
    var sNewSrc = sOrgSrc.substring(0, sOrgSrc.lastIndexOf("_")) + "_over" + sExtension;
    this.setAttribute("orgSrc", sOrgSrc);
    this.setAttribute("src", sNewSrc);
}

var buttonRollOff = function() {
    var sOrgSrc = this.getAttribute("orgSrc");
    this.setAttribute("src", sOrgSrc);
}

var buttonRollOnEvent = function(Button) {
    var sOrgSrc = Button.getAttribute("src");
    var sImage = sOrgSrc.substring(sOrgSrc.lastIndexOf("/"), sOrgSrc.length);
    var sExtension = sImage.substring(sImage.indexOf("."), sOrgSrc.length);
    var sNewSrc = sOrgSrc.substring(0, sOrgSrc.lastIndexOf("_")) + "_over" + sExtension;
    Button.setAttribute("orgSrc", sOrgSrc);
    Button.setAttribute("src", sNewSrc);
}

var buttonRollOffEvent = function(Button) {
    var sOrgSrc = Button.getAttribute("orgSrc");
    Button.setAttribute("src", sOrgSrc);
}

/*  Explicit handlers for use with the onmouseover and onmouseout events.  Don't use unless you have to.  */
function buttonRollOnEx(obj) {
    var sOrgSrc = obj.getAttribute("src");
    var sImage = sOrgSrc.substring(sOrgSrc.lastIndexOf("/"), sOrgSrc.length);
    var sExtension = sImage.substring(sImage.indexOf("."), sOrgSrc.length);
    var sNewSrc = sOrgSrc.substring(0, sOrgSrc.lastIndexOf("_")) + "_over" + sExtension;
    obj.setAttribute("orgSrc", sOrgSrc);
    obj.setAttribute("src", sNewSrc);
}

function buttonRollOffEx(obj) {
    var sOrgSrc = obj.getAttribute("orgSrc");
    obj.setAttribute("src", sOrgSrc);
}

/*  Tabs rollover functions */
function initTabs(ulTabs) {
    if (document.getElementById) {
        tabItems = ulTabs.getElementsByTagName("li"); ;
        for (var i = 0; i < tabItems.length; i++) {
            node = tabItems[i];
            node.onmouseover = overTab;
            node.onmouseout = outTab;
            node.onclick = selectTab;
        }
    }
}

function initTabsTable(table) {
    if (document.getElementById) {
        var rows = table.getElementsByTagName("tr")
        tabItems = rows[1].getElementsByTagName("td");
        for (var i = 0; i < tabItems.length; i++) {
            node = tabItems[i];
            if (document.all) {
                node.onmouseover = overTab;
                node.onmouseout = outTab;
            }
            DF.evt.Event.addListener(node, "click", selectTabTable.createDelegate(node));
        }

    }
}

overTab = function(evt) {
    evt = (evt) ? evt : ((window.event) ? window.event : null);

    // IE hack for rollover state
    if (document.all && document.getElementById) {
        addClassToNode(this, "sfhover");
    }
}

outTab = function() {
    // IE hack for rollover state
    if (document.all && document.getElementById) {
        removeClassFromNode(this, "sfhover");
    }
}

selectTab = function() {

    var ulTabs, liTab;
    if (arguments.length > 0 && arguments[0] != null && "tagName" in arguments[0]) {
        ulTabs = arguments[0].parentNode;
        liTab = arguments[0];
    }
    else {
        ulTabs = this.parentNode;
        liTab = this;

    }
    var tabItems = ulTabs.getElementsByTagName("li");
    var nCurrentIndex = 0;
    for (var i = 0; i < tabItems.length; i++) {
        node = tabItems[i];
        removeClassFromNode(node, "selected");
        if (node == liTab)
            nCurrentIndex = i;
    }
    addClassToNode(liTab, "selected");

    var aTabViews = new Array();
    var aAnchorViews = new Array();

    // Load an array of the tab view divs
    var leftSection = document.getElementById("leftSection");
    var leftDivs = leftSection.getElementsByTagName("div");

    var y = 0;
    var z = 0;
    for (var i = 0; i < leftDivs.length; i++) {
        var div = leftDivs[i];
        if (div.className.indexOf("tabView") > -1) {
            // hide all tab views
            removeClassFromNode(div, "selected");
            aTabViews[y] = div;
            y++;
        }
        // hide all anchor tag rows
        if (div.className.indexOf("lobAnchorHeader") > -1) {
            div.style.display = "none";
        }
    }
    if (aTabViews[nCurrentIndex])
        addClassToNode(aTabViews[nCurrentIndex], "selected");

    // display the anchor tag row for the current tab.
    var anchorDiv = document.getElementById("lobAnchorHeader" + liTab.id);
    if (anchorDiv != null)
        anchorDiv.style.display = "block";
}
var selectedTab;
selectTabTable = function() {
    var tableTabs, tdTab;
    if (arguments.length > 0 && arguments[0] != null && "tagName" in arguments[0]) {
        tableTabs = arguments[0].parentNode.parentNode;
        tdTab = arguments[0];
    }
    else {
        tableTabs = this.parentNode.parentNode;
        tdTab = this;
    }
    var tabRows = tableTabs.getElementsByTagName("tr");

    var tabItems = tableTabs.getElementsByTagName("td");
    if (selectedTab != null) {
        node = selectedTab;
        removeClassFromNode(node, "selected");
        node.rowSpan = 1;
        if (node.cellIndex < tabRows[1].cells.length) {
            tabRows[1].insertBefore(node, tabRows[1].cells[node.cellIndex]);
        }
        else {
            tabRows[1].appendChild(node);
        }
    }
    selectedTab = tdTab;
    addClassToNode(tdTab, "selected");

    tdTab.rowSpan = 2;
    var index = tdTab.cellIndex;
    tabRows[0].insertBefore(tdTab, tabRows[0].cells[index]);

    var aTabViews = new Array();
    var aAnchorViews = new Array();

    // Load an array of the tab view divs
    var leftSection = document.getElementById("leftSection");
    var leftDivs = leftSection.getElementsByTagName("div");
    var y = 0;
    var z = 0;
    for (var i = 0; i < leftDivs.length; i++) {
        var div = leftDivs[i];
        if (div.className.indexOf("tabView") > -1) {
            // hide all tab views
            removeClassFromNode(div, "selected");
            aTabViews[y] = div;
            y++;
        }
        // hide all anchor tag rows
        if (div.className.indexOf("lobAnchorHeader") > -1) {
            div.style.display = "none";
        }
    }

    var lobCatSection = document.getElementById("lobCatSection" + tdTab.id);
    if (lobCatSection) {
        addClassToNode(lobCatSection, "selected");
    }
    // display the anchor tag row for the current tab.
    var anchorDiv = document.getElementById("lobAnchorHeader" + tdTab.id);
    if (anchorDiv != null)
        anchorDiv.style.display = "block";
}

/* End tab functions */




/* Search functions */

function LocalizeSearch(searchForm) {
    var id = getCookieVal('CorpID');
    if (id > 1) {
        searchForm.corp.value = id;
        searchForm.LevelNum.value = 4;
        searchForm.LevelId.value = id;
    }
}

function SearchSite() {
    var form = document.getElementById("menuSearch");
    form.submit();
}

function SearchTV(initialView) {
    // Currently called from:
    // 1. Menu Search dropdown (both templates and dynamic pages, and auto generated site map)
    // 2. Explore Flash movie callback
    // 3. Channel Lineup page
    // 4. Secondary Menu Nav "Whats On" (both templates and dynamic pages, and auto generated site map)
    // initialView can be schedule-grid, browse, or search
    var formSearch = document.getElementById("menuSearch");
    var form = document.getElementById("tvSearch");
    var zip = get5DigitZip();
    if (zip != false)
        form.zipcode.value = zip;
    //form.action = "http://tvplanner.comcast.net";
    if (initialView)	// form value defaults to "search"
        form.initView.value = initialView;
    else
        form.initView.value = "search";
    form.method = "GET";
    if (formSearch.q.value != "Search")	// "Search" is in the text box by default
        form.searchTerm.value = formSearch.q.value;
    form.target = "_blank";
    form.submit();
}

/* End Search funcitons */


function setLanguage(LanguageCode) {
    // Check to see if language changing, if so clear buyflow guid
    var currentLang = getCookieVal("Language");
    if (currentLang != LanguageCode) {
        SetCookie("BuyFlowGuid", false, "", false, true);
    }
    SetCookie("Language", false, LanguageCode, false, true);
    //window.location.reload();
}

function displayMenuForLanguage() {
    var menu = document.getElementById("topMenu");
    // Remove menu when language set to Spanish
    //	var language =  getCookieVal("Language")
    //	if(window.location.pathname.indexOf("/" + language + "/") > 0)
    if (window.location.pathname.indexOf("/es/") > 0) {
        menu.style.display = 'none';
    }
    else {
        menu.style.display = 'block';
    }
}

function navigateToLocalization() {
    var action = new RemoteMethod('CartController', 'CheckForBuyflowSession', '');
    action.LocalAction = function(args) {
        CheckForBuyflowSessionComplete(args);
    }
    action.Invoke();
}
function navigationHover() {
    var menu = document.getElementById("topMenu");

    navItems = menu.getElementsByTagName("li");

    for (var i = 0; i < navItems.length; i++) {
        node = navItems[i];

        for (var n = 0; n < document.styleSheets.length; n++) {

            if (document.styleSheets[n].href != null) {
                menuCss = document.styleSheets[n].href.match(/(comcast_)(\w+)(\.css$)/);
                if (menuCss) {
                    selectedMenu = menuCss[2].toLowerCase();
                    var menuName = node.className.toLowerCase();
                    if (menuName.indexOf(selectedMenu) > -1) {
                        node.getElementsByTagName("img")[0].src = ('/images/topMenu/' + selectedMenu + '_Hover.gif');
                        break;
                    }   // end if (menuName)			            
                }    // end if (menuCss)
            }

        }   // end for( n )	

    }
}
function CheckForBuyflowSessionComplete(args) {
    if (args != null && (args == "true" || args == true)) {
        var MaskReset = new Mask();
        MaskReset.Id = "localizeResetMask";
        MaskReset.Show();
        cartCleared = false;
        RenderOverlay('Change Your Location', 'Changing your address at this step may require that you return to beginning of the shopping process.<br /><br /><br />Are you sure you want to change your address?');
    }
    else {
        RedirectToLocalization();
    }
}
function RedirectToLocalization() {
    var currentPath = window.location.pathname;
    if (currentPath.indexOf("?") > 0)
        currentPath += "&Reset=1";
    else
        currentPath += "?Reset=1";

    if (cartCleared == false)
        ClearCart();

    if (window.location.pathname.indexOf("error") < 0) {
        //window.location.assign("https://" + window.location.hostname + "/localization/Localize.cspx?Referer=" + currentPath);
        window.location = "https://" + window.location.hostname + "/localization/Localize.cspx?Referer=" + currentPath;
    }
    else {
        //window.location.assign("https://" + window.location.hostname + "/localization/Localize.cspx");
        window.location = "https://" + window.location.hostname + "/localization/Localize.cspx";
    }
}
function ClearCart() {
    var action = new RemoteMethod('CartController', 'ClearCart', '');
    action.LocalAction = function(args) {
        cartCleared = true;
    }
    action.Invoke();
}
function HideSignOutLinks() {
    
    //Check cookies
    var CustomerId = '';
    CustomerId = getCookieVal('RC.CID');
    var multipleAccountFlag = '';
    multipleAccountFlag = getCookieVal("MultipleAccountFlag");
    if (CustomerId != '') {
        if (document.getElementById('SignOut'))
            document.getElementById('SignOut').className = 'ShowSignOutLinks';
        if (document.getElementById('Static2'))
            document.getElementById('Static2').className = 'ShowSignOutLinks';
        if (document.getElementById('Reset'))
            document.getElementById('Reset').className = 'HideHeaderLinks';
        if (document.getElementById('Staticloc2'))
            document.getElementById('Staticloc2').className = 'HideHeaderLinks';
    }
    if (multipleAccountFlag != '') {
        if (document.getElementById('SwitchAccount')) {
            document.getElementById('SwitchAccount').className = 'ShowSignOutLinks';
            if (document.getElementById('Static1'))
                document.getElementById('Static1').className = 'ShowSignOutLinks';
        }
    }
    if (location.href.toLowerCase().indexOf('movers') != -1) {
        if (document.getElementById('topInfoNav'))
            document.getElementById('topInfoNav').className = 'HideHeaderLinks';
    }
}
function ShowSignOutOverLay() {
    var MaskReset = new Mask();
    MaskReset.Id = "localizeResetMask";
    MaskReset.Show();
    var LeftFunctionName = "RedirectToSignOut();";
    var RightFunctionName = "HideOverlay();";
    RenderGenericOverlay('Sign out', 'Are you sure you want to sign out?', LeftFunctionName, RightFunctionName);
}
function ShowSwitchAddressOverLay() {
    var action = new RemoteMethod('CartController', 'CheckForBuyflowSession', '');
    action.LocalAction = function(args) {
        CheckForBuyflowSessionSwitchAddressComplete(args);
    }
    action.Invoke();
}
function CheckForBuyflowSessionSwitchAddressComplete(args) {
    if (args != null && (args == "true" || args == true)) {
        var MaskReset = new Mask();
        MaskReset.Id = "localizeResetMask";
        MaskReset.Show();
        var LeftFunctionName = "RedirectToAuthenticatedUserOptionsPage();";
        var RightFunctionName = "HideOverlay();";
        RenderGenericOverlay('Change Your Location', 'Changing your address at this step may require that you return to the beginning of the shopping process.<br /><br /><br />Are you sure you want to change your address?', LeftFunctionName, RightFunctionName);
    }
    else {
        RedirectToAuthenticatedUserOptionsPage();
    }
}
function RedirectToAuthenticatedUserOptionsPage() {
    location.href = '/localization/authenticate.cspx';
}
function RedirectToSignOut() {
    location.href = '/localization/logout.aspx';
}