function startListMenu() {

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
                //Lines added on 26.04.2011 for clearing menu issue -- Begin
                var navItems = new Array();
                var navItemsTemp = menu.getElementsByTagName("li");
                var count = 0;
                for (var i = 0; i < navItemsTemp.length; i++) {
                    if (navItemsTemp[i].parentNode.id == "topMenu") {

                        navItems[count] = navItemsTemp[i];
                        count++;
                    }
                }
                //Lines added on 26.04.2011 for clearing menu issue -- End

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

                        //navItems[0].getElementsByTagName("img")[0].setAttribute("alt", "Learn");
                        //navItems[0].getElementsByTagName("img")[0].setAttribute("title", "Learn");
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
		HideSignOutLinks();
    }

    function navigationHoverMenu() {
        var menu = document.getElementById("topMenu");

        //navItems = menu.getElementsByTagName("li");
        var navItems = new Array();
        var navItemsTemp = menu.getElementsByTagName("li");
        var count = 0;
        for (var i = 0; i < navItemsTemp.length; i++) {
            if (navItemsTemp[i].parentNode.id == "topMenu") {

                navItems[count] = navItemsTemp[i];
                count++;
            }
        }

        for (var i = 0; i < navItems.length; i++) {
            node = navItems[i];

            for (var n = 0; n < document.styleSheets.length; n++) {

                if (document.styleSheets[n].href != null) {
                    menuCss = document.styleSheets[n].href.match(/(comcast_)(\w+)(\.css$)/);
                    if (menuCss) {
                        selectedMenu = menuCss[2].toLowerCase();  
			var mediaUrl = getMediaUrl(selectedMenu.toLowerCase());
                        var menuName = node.className.toLowerCase();
                        if (menuName.indexOf(selectedMenu) > -1) {
                            node.getElementsByTagName("img")[0].src = mediaUrl;
                            break;
                        }   // end if (menuName)			            
                    }    // end if (menuCss)
                }

            }   // end for( n )	

        }
    }

	function getMediaUrl(selectedMenu) {
        var menuMediaUrl;
        switch (selectedMenu) {
            case "explore":
                menuMediaUrl = mediaurllist[0];
                break;
            case "shop":
                menuMediaUrl = mediaurllist[1];
                break;
            case "programming":
                menuMediaUrl = mediaurllist[2];
                break;
            case "customers":
                menuMediaUrl = mediaurllist[3];
                break;
            case "About":
                menuMediaUrl = mediaurllist[4];
                break;
            default:
                menuMediaUrl = "";
        }
        return menuMediaUrl;
    }