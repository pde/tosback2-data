function CLog(message) {
    var panel = $('#globalLogPanel');
    if (panel.length == 0) {
        panel = $('<div id="globalLogPanel" style="overflow:scroll;background:#ffffff;z-index:9999;position:absolute;width:185px;height:200px;border:1px solid red;top:0;left:0px;"></div>');

        $('body').append(panel);
        panel.bind('dblclick', function () {
            panel.empty();
        });

    } 

    panel.append('<p>' + message + '</p>');

}


var navMenu = {
    animateDuration: { over: 500, out: 200 }, //duration of slide in/ out animation, in milliseconds
    prevent: function (e) {
        e.cancelable && e.preventDefault()
        return false;
    },
    stopPropagation: function (e) {
        e.stopPropagation();
        return false;
    },
    hasSubVehicleMenu: function ($mainMenu) {
        var $subVehicleIDIn = $("#subVehicleIDIn", $mainMenu);
        if ($subVehicleIDIn.length > 0 && $subVehicleIDIn.val != '') {
            return true;
        } else {
            return false;

        }
    },

    highlightMenuItem: function ($li, arrow) {
        if (arrow == undefined)
            arrow = false;

        $parent = $li.parent();
        if ($parent.attr("id") == "leftNav") {
            $a = $(".top-nav-text", $li);
            if (arrow) {

            } else {
                if (!$a.hasClass("selected")) {
                    $a.addClass("selected")

                }
            }

        } else {

        }

        if (arrow) {
            var $a = $li.find('> a');
            if ($a.length > 0) {
                if (!$a.hasClass("second-nav-down-arrow")) {
                    $a.addClass("second-nav-down-arrow")
                }
            }

        } else {
            if (!$li.hasClass("selected")) {
                $li.addClass("selected")
            }
        }


    },
    unhighlightMenuItem: function ($li, arrow) {
        if (arrow == undefined)
            arrow = false;
        $parent = $li.parent();
        if ($parent.hasClass("ipad-sub-menu") || $parent.hasClass("car-types")) {

        } else if ($parent.attr("id") == "leftNav") {
            $a = $(".top-nav-text", $li);
            if ($a.hasClass("selected")) {
                $a.removeClass("selected")
            }
        }
        if (arrow) {
            var $a = $li.find('> a');
            if ($a.length > 0) {
                if ($a.hasClass("second-nav-down-arrow")) {
                    $a.removeClass("second-nav-down-arrow")
                }
            }
        } else {
            if ($li.hasClass("selected")) {
                $li.removeClass("selected")
            }
        }

    },
    getPath: function () {
        var url = window.location.href;
        return $('<a/>').attr('href', url)[0].pathname.replace(/^[^\/]/, '/');
    },
    hideDockedSection: function ($mainMenu, $secondNavMenu) {
        var $subVehicleIDIn = $("#subVehicleIDIn", $mainMenu);
        var $currentPageIn = $("#currentPageIn", $mainMenu);
        var $dockedSectionIn = $("#dockedSectionIn", $mainMenu);


        var vehicleSuvMenu = false;

        if ($dockedSectionIn.val() == 'vehicles') {
            vehicleSuvMenu = true;
        }

        var $targetUl = $("#" + $subVehicleIDIn.val());

        if ($targetUl.length == 0) {
            $targetUl = $("#" + $dockedSectionIn.val() + 'TopSecondNav', $mainMenu);
        }

        if ($targetUl.length > 0) {


            var index = $currentPageIn.val();

            if ($currentPageIn.val() == '')
                $currentPageIn.val('-1');
            if (index > 0 && vehicleSuvMenu)
                index++;

            $targetUl.hide();
            var $topLi = $("#" + $dockedSectionIn.val() + 'Top', $mainMenu);
            if ($topLi.length > 0)
                navMenu.unhighlightMenuItem($topLi, true);


            var $defaultSubMenuItem = $targetUl.children("li:eq(" + index + ")");

            if ($defaultSubMenuItem.length > 0)
                navMenu.unhighlightMenuItem($defaultSubMenuItem, true);


        }

    },
    showDockedSection: function ($mainMenu, $secondNavMenu) {


        var $dockedSectionIn = $("#dockedSectionIn", $mainMenu);
        var $currentPageIn = $("#currentPageIn", $mainMenu);
        var $subVehicleIDIn = $("#subVehicleIDIn", $mainMenu);


        var $targetUl = $("#" + $subVehicleIDIn.val());


        var vehicleSuvMenu = false;

        if ($dockedSectionIn.val() == 'vehicles') {
            vehicleSuvMenu = true;
            if ($targetUl.length > 0) {
                if ($targetUl.css('display') != 'none') {
                    return;
                }

            }
        }

        var align = false;
        if ($targetUl.length == 0) {
            $targetUl = $("#" + $dockedSectionIn.val() + 'TopSecondNav', $mainMenu);


            if ($targetUl.length > 0) {
                var $topLi = $("#" + $dockedSectionIn.val() + 'Top', $mainMenu);
                navMenu.highlightMenuItem($topLi, true);
                navMenu.justifyVehiclePanel($topLi);
                if ($dockedSectionIn.val() == 'vehicles') {
                    align = true;
                }
            }

        }

        if ($targetUl.length > 0) {

            var $parentItem = $targetUl.parent();

            $secondNavMenu.show();
            $secondNavMenu.css({ 'top': '74px', 'height': '41px' });

            $targetUl.show();
            $targetUl.css({ 'marginTop': '-41px' });
            $targetUl.css({ 'height': '0px' });


            var index = $currentPageIn.val();
            if (index == '') {
                index = -1;
                $currentPageIn.val('-1');
            }
            else {
                if (index > 0 && vehicleSuvMenu)
                    index++;
            }

            if (!$targetUl.hasClass('docked')) {
                $targetUl.addClass('docked');
            }
            $targetUl.animate({ height: '41px', 'marginTop': '0px' }, navMenu.animateDuration.out, 'swing', function () {

                //navMenu.alignVehiclePanel($targetUl, 2);
                if (index >= 0) {
                    var $defaultSubMenuItem = $targetUl.children("li:eq(" + index + ")");
                    navMenu.highlightMenuItem($defaultSubMenuItem, true);
                }
                //if(!vehicleSuvMenu)
                navMenu.highlightMenuItem($parentItem);
            });



        }




    },
    justifyVehiclePanel: function ($targetLi) {

        var offset = 0;

        var ul = $targetLi.find('ul:eq(0)');
        offset = $targetLi.position().left;

        if (ul.length > 0) {
            var ulOffset = offset + 132;
            ul.css({ 'left': '-' + (ulOffset) + 'px' });
        }

        var div = $targetLi.find('div:eq(0)');
        if (div.length > 0) {
            div.css({ 'left': '-' + (offset) + 'px' });
        }


    },
    alignVehiclePanel: function ($targetUl, idx) {

        /*
        if ($targetUl.hasClass('nav-aligned')) {
        return;
        } else {
        $targetUl.addClass('nav-aligned');
        }
        */
        var offset = 0;
        var ul = null;
        var previous_offset = 0;

        var log = '';
        var itemIdx = 0;
        $targetUl.find('> li:not(.top-right-nav)').each(function (i) {

            ul = $(this).find('ul:eq(0)');
            offset = $(this).position().left;
            var recursive = false;

            if (ul.length > 0) {
                var ulOffset = offset + 132;
                ul.css({ 'left': '-' + (ulOffset) + 'px' });
            }

            var div = $(this).find('div:eq(0)');
            if (div.length > 0) {
                if ((offset == 0 && itemIdx == 0) || offset != 0) {
                    div.css({ 'left': '-' + (offset) + 'px' });
                }
            }

            if (idx == 3) {
                offset += $(this).outerWidth();
            }

            itemIdx++;
            navMenu.alignVehiclePanel(ul, idx + 1);

        });

    },
    addItemInArray: function (addItem, arr) {
        if (arr == null)
            arr = new Array();

        if ($.inArray(addItem, arr) == -1) {
            arr.push(addItem);
        }
        return arr;
    },
    removeItemFromArray: function (removeItem, arr) {
        arr = jQuery.grep(arr, function (value) {
            return value != removeItem;
        });
        return arr;
    },
    menuHoverOut: function ($mainMenu, $secondNavMenu, $thirdNavMenu) {
        var $topNavItems = $mainMenu.find("> li:not(.top-right-nav)");
        var $dockedSectionIn = $("#dockedSectionIn", $mainMenu);

        var menuHoverOutInterval = $mainMenu.data('menuHoverOutInterval');
        if (menuHoverOutInterval != null)
            return;


        menuHoverOutInterval = window.setInterval(function () {

            var onShow = false;
            var subNavIsEmpty = false;

            for (var i = 0; i < $topNavItems.length; i++) {
                var $topNavItem = $($topNavItems[i]);
                var $subULOfTopNavItem = $topNavItem.find('ul:eq(0)');
                if ($subULOfTopNavItem.length == 0) {
                    if ($topNavItem.hasClass('selected')) {
                        subNavIsEmpty = true;
                        break;
                    }
                } else {

                    if ($subULOfTopNavItem.css('display') != 'none' || $subULOfTopNavItem.data('onShow')) {
                        onShow = true;
                        break;
                    }

                }


            }

            if (subNavIsEmpty) {
                //if ($secondNavMenu.position().top == 74) {
                if ($secondNavMenu.position().top >= 73 && $secondNavMenu.position().top <= 74) {
                    $secondNavMenu.animate({ height: '41px', 'top': '33px' }, navMenu.animateDuration.out, 'swing', function () {
                        //window.clearInterval(menuHoverOutInterval);
                        //$mainMenu.data('menuHoverOutInterval', null);
                    });
                    $thirdNavMenu.hide();
                }
                return;
            }

            if (onShow) {

                if ($secondNavMenu.position().top == 33) {

                    $secondNavMenu.show();
                    $secondNavMenu.animate({ height: '41px', 'top': '74px' }, navMenu.animateDuration.out, 'swing', function () {

                    });
                }


            } else {
                window.clearInterval(menuHoverOutInterval);
                $mainMenu.data('menuHoverOutInterval', null);



                if ($dockedSectionIn.val() != '') {
                    navMenu.showDockedSection($mainMenu, $secondNavMenu);
                } else {
                    // $secondNavMenu.position().top >= 73 ==> fix chrome when we zoom in/out view of browser
                    if ($secondNavMenu.position().top >= 73 && $secondNavMenu.position().top <= 74) {

                        if (HN.Home != undefined) {
                            window.setTimeout(function () {
                                if (typeof HN.Home.startAutoSlide == 'function')
                                    HN.Home.startAutoSlide();
                            }, 0);
                        }
                        $secondNavMenu.animate({ height: '41px', 'top': '33px' }, navMenu.animateDuration.out, 'swing', function () { });

                        $thirdNavMenu.hide();
                    }

                }


            }
        }, 500);


        $mainMenu.data('menuHoverOutInterval', menuHoverOutInterval);


    },

    buildNavMenu: function (menuID) {
        jQuery(document).ready(function ($) {

            var caches = {};
            caches['TOP_MENU_ITEM'] = [];
            caches['THIRD_MENU_ITEM'] = [];


            var isRedirecting = false;
            var path = navMenu.getPath();
            if (path == '/index.aspx' || path == '/' || path == '/korean/' || path == '/korean/index.aspx') {
                var $hyundaiLogo = $('#hyundaiLogo').find('a');
                $hyundaiLogo.addClass('hover');
            }

            var $mainMenu = $("#" + menuID);
            var $secondNavMenu = $("#secondNavContainer");
            var $thirdNavMenu = $("#thirdNavWrapper");
            var $dockedSectionIn = $("#dockedSectionIn", $mainMenu);
            var $subVehicleIDIn = $("#subVehicleIDIn", $mainMenu);


            $mainMenu.data('menuHoverOutInterval', null);

            var $topNavItems = $mainMenu.find("> li:not(.top-right-nav)");

            var liSample = $mainMenu.find('li:eq(0)').find('ul:eq(0)').find('li:eq(0)');

            $links = $mainMenu.find(".hyperlink");


            navMenu.showDockedSection($mainMenu, $secondNavMenu);

            $links.click(function (e) {

                isRedirecting = true;

                var $a = $(this);
                var href = $a.attr('href');


                if (href == null || href == '') {
                    $a = $('a', $(this));
                    href = $a.attr('href');
                }

                var target = $a.attr('target');
                if (target == undefined)
                    target = '_self';

                var currentHref = navMenu.getPath();
                if (currentHref == href) {
                    isRedirecting = false;
                    return navMenu.prevent(e);
                }


                if (href != '' && href != 'javascript:void(0);') {


                    if (href.search(/javascript/i) != -1) {
                        eval(href);
                    } else {
                        var $cookieIn = $('.cookie', $a);
                        if ($cookieIn.length > 0) {
                            var parts = $cookieIn.val().split('|');
                            var name = $.trim(parts[0].replace('\'', ''));
                            var value = $.trim(parts[1].replace('\'', ''));
                            IC.CookieJar.setCookie(name, value);
                        }

                        if (target == '_blank') {
                            window.open(href);
                        } else {
                            window.location.href = href;
                        }

                        isRedirecting = true;


                    }

                    return navMenu.prevent(e);
                }
            });





            $topNavItems.each(function (i) {

                var $topNavItem = $(this);
                var $subULOfTopNavItem = $topNavItem.find('> ul:eq(0)');

                $subULOfTopNavItem.data('onShow', false);


                $topNavItem.hover(function (event) {

                    var $topNavItemIn = $(this);
                    var $subULOfTopNavItemIn = $topNavItemIn.find('ul:eq(0)');
                    //console.log($topNavItemIn.attr('id'));
                    navMenu.hideDockedSection($mainMenu, $secondNavMenu);
                    navMenu.highlightMenuItem($topNavItemIn);
                    navMenu.justifyVehiclePanel($topNavItemIn);

                    if ($subULOfTopNavItemIn.length > 0) {
                        $subULOfTopNavItemIn.removeClass('docked');
                        if ($secondNavMenu.css('top') == '33px') {

                            $secondNavMenu.css({ 'height': '41px' });

                            $subULOfTopNavItemIn.data('onShow', true);
                            $subULOfTopNavItemIn.hide();
                            $subULOfTopNavItemIn.css({ 'marginTop': '0px', 'height': '41px', 'overflow': 'visible' });

                            $subULOfTopNavItemIn.show();
                            $secondNavMenu.stop().animate({ "top": "74px" }, navMenu.animateDuration.out, 'swing', function () {
                                //navMenu.alignVehiclePanel($subULOfTopNavItemIn, 3);
                                //$topNavItemIn.addClass("selected");
                                //navMenu.highlightMenuItem($topNavItemIn);
                                $thirdNavMenu.hide();
                            });

                        } else {

                            $subULOfTopNavItemIn.css({ 'marginTop': '-41px', 'height': '0px', 'overflow': 'visible' });
                            $subULOfTopNavItemIn.show();
                            $subULOfTopNavItemIn.data('onShow', true);
                            $subULOfTopNavItemIn.stop().animate({ height: '41px', 'marginTop': '0px' }, navMenu.animateDuration.out, 'swing', function () {
                                $thirdNavMenu.hide();

                                if ($(this).data('onShow')) {
                                    //navMenu.alignVehiclePanel($subULOfTopNavItemIn, 3);
                                    //$topNavItemIn.addClass("selected");
                                    //navMenu.highlightMenuItem($topNavItemIn);
                                } else {
                                    $(this).hide();
                                }
                            });

                        }

                    } else {
                        //navMenu.highlightMenuItem($topNavItemIn);
                    }


                    if (HN.Home != undefined) {
                        window.setTimeout(function () {
                            if (typeof HN.Home.stopAutoSlide == 'function')
                            //console.log('stop auto slide');
                                HN.Home.stopAutoSlide();
                        }, 0);
                    }
                    navMenu.menuHoverOut($mainMenu, $secondNavMenu, $thirdNavMenu);


                    return navMenu.prevent(event);

                }, function (event) {



                    var $topNavItemOut = $(this);

                    /*
                    var itemID = $topNavItemOut.attr('id');
                    if (itemID == ($dockedSectionIn.val() + 'Top')) {
                    navMenu.menuHoverOut($mainMenu, $secondNavMenu, $thirdNavMenu);
                    return navMenu.prevent(event);
                    }
                    */


                    var $subULOfTopNavItemOut = $topNavItemOut.find('ul:eq(0)');

                    $topNavItemOut.removeClass("selected");
                    if ($subULOfTopNavItemOut.length > 0) {
                        $subULOfTopNavItemOut.css({ "display": "none" });
                        $subULOfTopNavItemOut.data('onShow', false);
                    }
                    $thirdNavMenu.hide();
                    navMenu.unhighlightMenuItem($topNavItemOut);


                    //navMenu.showDockedSection($mainMenu, $secondNavMenu);
                    return navMenu.prevent(event);

                });


                var $secondNavItems = $subULOfTopNavItem.find('> li');
                $secondNavItems.hover(function (event) {

                    var $secondNavItem = $(this);
                    navMenu.justifyVehiclePanel($secondNavItem);
                    var $parent = $secondNavItem.parent();
                    if ($parent.css('display') == 'none' || $parent.css('marginTop') != '0px')
                        return;

                    var $secondNavUL = $secondNavItem.find('ul:eq(0)');

                    $secondNavItem.addClass("selected");
                    navMenu.highlightMenuItem($secondNavItem);
                    if ($secondNavUL.length == 0) {
                        $thirdNavMenu.hide();
                    }

                    $secondNavUL.fadeIn({ duration: 200, easing: 'swing', complete: function () {
                        //navMenu.alignVehiclePanel($secondNavUL, 4);

                        if ($secondNavUL.hasClass("car-types")) {

                            if (caches['THIRD_MENU_ITEM'].length > 0) {
                                for (var i = 0; i < caches['THIRD_MENU_ITEM'].length; i++) {
                                    var $vehicleNavItemOut = $('#' + caches['THIRD_MENU_ITEM'][i]);
                                    var vehicleNavItemOutId = $vehicleNavItemOut.attr("id");

                                    var $vehicleInfoOut = $vehicleNavItemOut.children("#" + vehicleNavItemOutId + "Info");

                                    if ($vehicleInfoOut == undefined || $vehicleInfoOut.css('display') == undefined)
                                        continue;

                                    $vehicleNavItemOut.removeClass("selected");
                                    navMenu.unhighlightMenuItem($vehicleNavItemOut);

                                    $vehicleInfoOut.css('display', 'none');
                                }
                            }

                            var i = 0;
                            var $defaultVehicleItem = null;
                            $defaultVehicleItem = $secondNavUL.find("li:eq(" + i + ")");
                            if ($defaultVehicleItem.length > 0) {
                                navMenu.justifyVehiclePanel($defaultVehicleItem);
                                var defaultVehicleItemId = $defaultVehicleItem.attr("id");

                                var $vehicleInfo = $defaultVehicleItem.children("#" + defaultVehicleItemId + "Info");



                                if ($vehicleInfo.length > 0) {

                                    if ($secondNavUL.css('display') != 'none')
                                        $thirdNavMenu.show();

                                    $vehicleInfo.fadeIn('fast');
                                    if ($secondNavItem.attr('id') != 'hybrid') {
                                        $defaultVehicleItem.addClass("selected");
                                        navMenu.highlightMenuItem($defaultVehicleItem);
                                    }

                                    caches['THIRD_MENU_ITEM'] = navMenu.addItemInArray(defaultVehicleItemId, caches['THIRD_MENU_ITEM']);

                                }

                            }



                        }

                    }
                    });

                    return navMenu.prevent(event);

                }, function (event) {
                    //return;
                    var $secondNavItem = $(this);
                    var $parent = $secondNavItem.parent();
                    var $secondNavUL = $secondNavItem.find('ul:eq(0)');

                    $secondNavItem.removeClass("selected");
                    $secondNavUL.hide();
                    navMenu.unhighlightMenuItem($secondNavItem);

                    $thirdNavMenu.hide();
                    if ($parent.hasClass('docked')) {
                        return navMenu.prevent(event);
                    }

                    //return navMenu.prevent(event);

                });


                var $subVehicleULOfTopNavItem = $("#" + $subVehicleIDIn.val());

                if ($subVehicleULOfTopNavItem.length > 0) {

                    var $vehicleNavItems = $subVehicleULOfTopNavItem.find('> li');

                    $vehicleNavItems.hover(function (e) {
                        navMenu.stopPropagation(e);
                        var $vehicleNavItem = $(this);
                        $vehicleNavItem.addClass("selected");
                        navMenu.highlightMenuItem($vehicleNavItem);


                    }, function (e) {

                        navMenu.stopPropagation(e);
                        var $vehicleNavItem = $(this);
                        $vehicleNavItem.removeClass("selected");
                        navMenu.unhighlightMenuItem($vehicleNavItem);


                    });

                }


                $secondNavItems.each(function () {


                    var $secondNavItem = $(this);
                    var $secondNavUL = $secondNavItem.find('ul:eq(0)');

                    var $vehicleNavItems = $secondNavUL.find('> li');
                    $vehicleNavItems.hover(function () {



                        var $vehicleNavItem = $(this);
                        navMenu.justifyVehiclePanel($vehicleNavItem);
                        var vehicleItemId = $vehicleNavItem.attr("id");

                        if (caches['THIRD_MENU_ITEM'].length > 0) {

                            for (var i = 0; i < caches['THIRD_MENU_ITEM'].length; i++) {
                                var $vehicleNavItemOut = $('#' + caches['THIRD_MENU_ITEM'][i]);
                                var vehicleNavItemOutId = $vehicleNavItemOut.attr("id");

                                var $vehicleInfoOut = $vehicleNavItemOut.children("#" + vehicleNavItemOutId + "Info");

                                if ($vehicleInfoOut == undefined || $vehicleInfoOut.css('display') == undefined)
                                    continue;

                                $vehicleNavItemOut.removeClass("selected");
                                navMenu.unhighlightMenuItem($vehicleNavItemOut);

                                $vehicleInfoOut.css('display', 'none');
                            }
                        }

                        if ($vehicleNavItem.hasClass('nohighlight')) {
                            return;
                        }

                        //CLog($vehicleNavItem.attr('id') + ' selected');

                        if ($secondNavItem.attr('id') != 'hybrid') {
                            //$vehicleNavItem.addClass("selected");
                            navMenu.highlightMenuItem($vehicleNavItem);
                        }

                        var $vehicleInfo = $vehicleNavItem.children("#" + vehicleItemId + "Info");

                        if ($vehicleInfo.length != 0) {
                            if ($thirdNavMenu.css('display') == 'none')
                                $thirdNavMenu.show();
                            $vehicleInfo.show();

                            caches['THIRD_MENU_ITEM'] = navMenu.addItemInArray(vehicleItemId, caches['THIRD_MENU_ITEM']);
                        }




                    }, function () {

                        var $vehicleNavItem = $(this);
                        var vehicleItemId = $vehicleNavItem.attr("id");
                        var $vehicleInfo = $vehicleNavItem.children("#" + vehicleItemId + "Info");

                        //CLog($vehicleNavItem.attr('id') + ' UNselected');
                        $thirdNavMenu.hide();
                        if ($vehicleInfo.length == 0) {
                            $vehicleNavItem.removeClass("selected");
                            navMenu.unhighlightMenuItem($vehicleNavItem);
                            //$vehicleInfo.hide();
                            //caches['THIRD_MENU_ITEM'] = navMenu.removeItemFromArray(vehicleItemId, caches['THIRD_MENU_ITEM']);
                        }




                    });

                });


            })

        }) //end document.ready
    }
}

