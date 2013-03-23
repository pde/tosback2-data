var lang = new I18n();
lang.setSrc("/hsbc-com/utilities/i18n-js");
lang.setPage("global");
lang.init();

var deviceRange = [640,768];
var linkbox = null;
var lastClick = null;
var content = "";

$(document).ready(function () {

    var docWidth = $(document).width();

    //accessibility
    var accessibility = new Accessibility();
    accessibility.detectImageEnabled();

    if (accessibility.exception != null)
        alert(accessibility.exception);

    $('.newsroomArticle').each(function () {
		var $introduction = $(this).find('.introduction'),
			$contentNewsroom = $(this).find('.content-newsroom');
		
        $introduction.append($contentNewsroom.children('p:first'));
		
        if (docWidth <= 640 && $introduction[0] && $contentNewsroom.html().trim()) {
			$introduction.append('<p><a href="#" class="mbOnly moreInfoBtn fullStory"><span>Load full story</span></a></p>');
            $contentNewsroom.hide();

            $('.fullStory').click(function (e) {
                e.preventDefault();
                $(this).hide();
                $contentNewsroom.show();
            });
        }
    });

    $('p.profile-info').each(function (index, el) {
        var pInfo = $(el);
        if (pInfo.html().trim() == '')
            pInfo.addClass('display-none');
    });

    $('p.caption').each(function (index, el) {
        var caption = $(el);
        if (caption.html().trim() == '')
            caption.addClass('display-none');
    });

    $("a.page-link,a.link-aside").append("<span class='arrow' ></span>");

    $("a.print").bind('click', function (e) {

        e.preventDefault();
        window.print();

    });

    var inputText = "",
		$inputs = $(".input-default input, input.input-default").not('.searchdup, .searchNewsroom');
		
    $inputs.bind('focus', function() {
        var el = $(this);
        if (inputText == "")
            inputText = (el.val() != "") ? el.val() : "";
        if (inputText == el.val())
            el.val("");
    });

    $inputs.bind('blur', function() {
        if ($(this).val() == "")
            $(this).val(inputText);
    });

    //design buttons
    var btn = new FormDesigner('');
    btn.setNode($(".btn-default"));
    btn.init();

    $(window).resize(function () {
        onDevice();
    });
	$(window).bind('deviceChanged',function () {
        onDeviceChange();
    })

    /*var zIndexNumber = 25000;
    $('div').each(function() {
    $(this).css('zIndex', zIndexNumber);
    zIndexNumber -= 10;
    });*/

    $(".scroller").bind('click', function (e) {

        e.preventDefault();
        var pos = $(this).attr('data-scrollTo');
        pos = (pos !== undefined) ? pos : 0;
        $('html, body').animate({ scrollTop: pos }, 300);
        $('html, body').focus();

    });

    var ie6 = $("html").hasClass("ie6");
    $(".shareIcons").css('display', 'none');

    //browser detect
    if (navigator.userAgent.indexOf("WOW64") != -1 || navigator.userAgent.indexOf("Win64") != -1) {
        $("body").addClass("bit64");
    }
    else {
        $("body").addClass("bit32");
    }

    if (navigator.userAgent.indexOf("Firefox") != -1) {
        $("body").addClass("firefox");
    }

    //position share
    /*var shareBtn = $(".btn-wrapper .share-wrapper");
    var leftMargin = 0;
    if (window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1)
        leftMargin = parseInt(shareBtn.css("margin-left")) - 6;
    else if (window.navigator.userAgent.toLowerCase().indexOf("safari") != -1)
        leftMargin = parseInt(shareBtn.css("margin-left")) - 11;
    else
        leftMargin = parseInt(shareBtn.css("margin-left"));
    shareBtn.css("margin-left", leftMargin + "px");
	*/

    if (ie6 == false) {
        $("a.share").bind('mouseenter', function (e) {

            e.preventDefault();
            var el = $(this);
            var shareDiv = el.next(".shareIcons");
            el.parent().before("<div class='share-overlay'></div>");
            $(".share-overlay").width($(document).width());
            $(".share-overlay").height($(document).height());
            $(".share-overlay").bind('mouseenter', { "obj": el }, function (e) {

                e.preventDefault();
                var el = e.data.obj;
                var shareDiv = el.next(".shareIcons");
                if (shareDiv.css('display') == "block")
                    shareDiv.fadeOut();
                $(this).remove();

            });
            if (shareDiv.css('display') == "none")
                shareDiv.slideDown();

        });
    }

    $("a.share").bind('click', function (e) {

        e.preventDefault();
        var el = $(this);
        var shareDiv = el.next(".shareIcons");
        if (shareDiv.css('display') == "none") {
            shareDiv.slideDown();
            if (ie6 == false) {
                el.parent().before("<div class='share-overlay'></div>");
                $(".share-overlay").width($(document).width());
                $(".share-overlay").height($(document).height());
                $(".share-overlay").bind('click', { "obj": el }, function (e) {

                    e.preventDefault();
                    var el = e.data.obj;
                    var shareDiv = el.next(".shareIcons");
                    if (shareDiv.css('display') == "block")
                        shareDiv.fadeOut();
                    $(this).remove();

                });
            }
        }
        else {
            shareDiv.fadeOut();
            if ($(".share-overlay").length > 0)
                $(".share-overlay").remove();
        }

    });

    $(".title-content .print").bind('focus', function () {

        if ($(".share-overlay").length > 0)
            $(".share-overlay").trigger("click");

    })

    

    /* Search Functionality */
    // Event for clicking search button at header
    $("#SearchButton").click(function (e) {
        e.preventDefault();
        generalSearch($("#Search").val());
    });

    // Event for key up at header
    $("#Search").keyup(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            generalSearch($(this).val());
        }
    });

    // Event for key up at header for mobile
    $('.mobi-search-input').keyup(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            generalSearch($(this).val());
        }
    });

    // Event for clicking search button at footer
    $("#FooterSearchButton").click(function (e) {
        e.preventDefault();
        generalSearch($("#FooterSearch").val());
    });

    // Event for key up at footer
    $("#FooterSearch").keyup(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            generalSearch($(this).val());
        }
    });

    $(".searchdup").keyup(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            generalSearch($(this).val());
        }
    });

    $("#newsroomSearch").click(function (e) {
        e.preventDefault();
        newsroomSearch();
    });

    $('.searchBar input').keyup(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            newsroomSearch();
        }
    });

    function generalSearch(field) {
        field = field.replace("/", " ").replace("\\", " ").replace("<", " ").replace(">", " ").replace("&", " ");
        var location = "/utilities/search?search=" + encodeURIComponent(field) + "&ref=" + encodeURIComponent(window.location.pathname);
        window.location = location;
    }

    function newsroomSearch() {
        var searchText = $('.searchBar input').val();
        searchText = searchText.replace("/", " ").replace("\\", " ").replace("<", " ").replace(">", " ").replace("&", " ");
        var location = "/news-and-insight/search?search=" + encodeURIComponent(searchText);
        window.location = location;
    }
	
	//external link check
	linkbox = new MessageBox();
	var template = "<table cellpadding='0' cellspacing='0' width='100%'>\
	<tr><td class='msgBoxTopLeft'></td><td class='msgBoxTopMiddle' width='100%'></td><td class='msgBoxTopRight'><a href='#' id='closeButton' class='closeButton'>&nbsp;</a></td></tr>\
	<tr><td class='imgWhite'></td><td class='msgBoxMiddleMiddle'><!--content--></td><td class='imgWhite'></td></tr>\
	<tr><td class='msgBoxBottomLeft'></td><td class='msgBoxBottomMiddle'></td><td class='msgBoxBottomRight'></td></tr>\
	</table>";
	
	linkbox.setEnableTemplates(true);
	linkbox.setOverlayClass("linkbox_overlay");
	linkbox.setTemplate(template);
	linkbox.setContentClass("external-link");
	//linkbox.setWidth("910px");
	if(docWidth>640)
	{
		linkbox.setTop("200px");
		linkbox.setLeft("auto");
	}
	else
	{
		linkbox.setTop(0);
		linkbox.setLeft(0);
	}
	linkbox.setOverlayInlineCss("");
	linkbox.setContentInlineCss("");
	var callback = function()
	{
		var linkbtn = new FormDesigner();
		linkbtn.setNode($(".go-to-site"));
		linkbtn.init();
		
		$("a.closeButton, .pageClose").bind('click', function (e) {
			
			e.preventDefault();
			linkbox.hide();
			
		});
	}
	var onLinkboxShow = function()
	{
		linkbox.content.find("a, input").eq(0).focus();
	}
	var onLinkboxHide = function()
	{
		if(lastClick != null)
		lastClick.focus();
	}
	linkbox.setOnShow(onLinkboxShow);
	linkbox.setOnHide(onLinkboxHide);
	linkbox.setCallback(callback);
	linkbox.setContent($(".data-loader-container"));
	linkbox.setAsync(true);
	linkbox.init();
	
	
	if (linkbox.exception == null) {
		
		$("a").bind("click", function(e) {
			
			var el = $(this);
			var url = el.attr('href');
			if (url !== undefined && el.hasClass("no-popup") == false)
			{
				var domain = window.location.host;
				var patt = new RegExp(domain+"(?!\\.)","g");
				var isSameDomain = patt.test(url);
				if(url.indexOf("http")==0 && isSameDomain==false)
				{
					e.preventDefault();
					lastClick = el;
					handleLink(url);
				}
			}
			
		});
	}
	else {
		alert("Exception returned with following error: \n" + linkbox.exception);
	}
	
	onDeviceChange();

    window.prevWidth = docWidth;
	
	
	/*if(window.attachEvent && $("html").hasClass("ie"))
	{
		window.attachEvent("onbeforeprint",function() {
			
			content = $(".content-wrapper").html();
			if($("#printContainer").length<=0)
			$("body").prepend("<div id='printContainer' class='print_container'></div>");
			else
			$("#printContainer").html("");
			
			var newContent = content.replace(/<((abbr)|(article)|(aside)|(bdi)|(data)|(datalist)|(details)|(figcaption)|(figure)|(footer)|(header)|(hgroup)|(mark)|(meter)|(nav)|(output)|(progress)|(section)|(summary)|(time))/g,"<div");
			newContent = newContent.replace(/<\/((abbr)|(article)|(aside)|(bdi)|(data)|(datalist)|(details)|(figcaption)|(figure)|(footer)|(header)|(hgroup)|(mark)|(meter)|(nav)|(output)|(progress)|(section)|(summary)|(time))>/g,"</div>");
			$("#printContainer").html(newContent);
		});
		
		window.attachEvent("onafterprint",function() {
			$("#printContainer").html("");
		});
	}*/

});


var handleLink = function(url) {
	
	var domain = window.location.host;
	var patt = new RegExp(domain+"(?!\\.)","g");
	var isSameDomain = patt.test(url);
	
	if(url.indexOf("http")==0 && isSameDomain==false)
	{
		linkbox.show();
		
		linkbox.setPostData({"url":url});
		linkbox.load("/hsbc-com/utilities/external-link");
		linkbox.show();
		
		var tooltip = $("#accessibilityToolTip");
		if(tooltip.length>0)
		tooltip.remove();
	}
	else
	{
		window.location = url;
	}
}

//device specific custom event
var onDevice = function () {
    /*var docWidth = $(window).width();*/
    var docWidth = $(document).width();
    var prevDeviceRange = 0;
    var currDeviceRange = 0;

    for (var i = 0; i < deviceRange.length; i++) {
        if (i == 0) {
            if (window.prevWidth <= deviceRange[i] && prevDeviceRange == 0)
                prevDeviceRange = deviceRange[i];

            if (docWidth <= deviceRange[i] && currDeviceRange == 0)
                currDeviceRange = deviceRange[i];
        }
        else {
            if (window.prevWidth > deviceRange[i - 1] && window.prevWidth <= deviceRange[i] && prevDeviceRange == 0)
                prevDeviceRange = deviceRange[i];
            else if (window.prevWidth > deviceRange[i] && prevDeviceRange == 0)
                prevDeviceRange = deviceRange[i] + 1;

            if (docWidth > deviceRange[i - 1] && docWidth <= deviceRange[i] && currDeviceRange == 0)
                currDeviceRange = deviceRange[i];
            else if (docWidth > deviceRange[i] && currDeviceRange == 0)
                currDeviceRange = deviceRange[i] + 1;
        }
    }

    //detect device range change
    if (prevDeviceRange != currDeviceRange) {
        $(window).trigger("deviceChanged");
    }
	
	pageWidth = ($("html").hasClass("ie")) ? 1070 : 1060;
	if (docWidth < pageWidth) {

        if ($("body").hasClass("act-scroll") == false) {
            $("body").addClass("act-scroll");
        }
    }
    else {
        if ($("body").hasClass("act-scroll"));
        $("body").removeClass("act-scroll");
    }

    window.prevWidth = docWidth;

}

var onDeviceChange = function () {

    var docWidth = $(document).width();

    //design input fields and select fields
    var searchInput = new FormDesigner();
    searchInput.setNode($(".input-default"));
    searchInput.init();

    var ddSelect = new FormDesigner();
    ddSelect.setNode($(".select-default"));
    if (docWidth > 768) {
        ddSelect.setCustomDropDown(true);
        ddSelect.setCustomScroll(true);
        ddSelect.setJSPositioning(false); //if true position of node should be static(default)
    }
    ddSelect.init();

    if (docWidth > 640) {
        linkbox.setTop("200px");
        linkbox.setLeft("auto");
    }
    else {
        linkbox.setTop(0);
        linkbox.setLeft(0);
    }

    function generalSearch(field) {
        field = field.replace("/", " ").replace("\\", " ").replace("<", " ").replace(">", " ").replace("&", " ");
        var location = "/utilities/search?search=" + encodeURIComponent(field) + "&ref=" + encodeURIComponent(window.location.pathname);
        window.location = location;
    }

    //main menu
    if (docWidth <= 640) {
        var inputArea = $(".mobi-search .mobi-search-input");
        var titleText = $(".mobi-search .title");
        var nav = $(".navigation");
        var inputDefaultVal = inputArea.val();
        var inputWidth = inputArea.width();

        nav.css("display", "none");
        inputArea.css("display", "none");
        titleText.css("display", "block");
        $(".menu-overlay").css('display', 'none');

        $(".menu-btn").unbind().bind('click', function (e) {

            e.preventDefault();
            $(".dd-navi", nav).css("display", "none");
            if (inputArea.css("display") == "block") {
                inputArea.css("display", "none");
                titleText.css("display", "block");
            }
            nav.slideToggle();

        });

        $(".mobi-search .search-btn").unbind().bind('click', function (e) {
            e.preventDefault();
            if (inputArea.css("display") == "none") {

                if (nav.css("display") == "block") {
                    $(".dd-navi", nav).css("display", "none");
                    nav.css("display", "none");
                }

                titleText.css("display", "none");
                inputArea.css("display", "block");
            }
            else {
                var val = inputArea.val();
                if (val == inputDefaultVal) {
                    inputArea.css("display", "none");
                    titleText.css("display", "block");
                } else {
                    generalSearch(val);
                }
            }

        });

        inputArea.bind('focus', function () {

            var val = $(this).val();
            if (val == inputDefaultVal) {
                $(this).val("");
            }

        });

        inputArea.bind('blur', function () {

            var val = $(this).val();
            if (val == "") {
                $(this).val(inputDefaultVal);
            }

        });

        $(".navigation > li").unbind().bind('click', function (e) {

            var el = $(this);
            var content = $(".dd-navi", el);
            var siblings = $(".dd-navi", el.siblings("li"));
            var submenu = $(".col-two", nav);
            var target = e.target;

            siblings.stop(true, true, true).slideUp(500);
            el.siblings().removeClass("menu-act");
            if (content.css('display') == "none") {
                e.preventDefault();
                el.addClass("menu-act");
                submenu.css("display", "none");
                content.stop(true, true, true).slideDown(500);
            }
            else {
                if ($(target).hasClass("arrow"))
                    e.preventDefault();
                if ($(target).hasClass("dd-navi") == false && $(target).parents().hasClass("dd-navi") == false) {
                    content.stop(true, true, true).slideUp(500);
                    el.removeClass("menu-act");
                }
            }

        });

        $(".col-one > li").unbind().bind('click', function (e) {

            var el = $(this);
            var content = $("ul", el);
            var siblings = $("ul", el.siblings("li"));
            var target = e.target;

            $(".col-one > li").removeClass("sub-menu-act");
            siblings.stop(true, true, true).slideUp(500);

            if (content.css('display') == "none") {
                if (content.children().length > 0)
                    e.preventDefault();
                content.stop(true, true, true).slideDown(500);
                el.addClass("sub-menu-act");
            }
            else {
                if ($(target).hasClass("arrow") && content.children().length > 0)
                    e.preventDefault();

                if ($(target).hasClass("col-two") == false && $(target).parents().hasClass("col-two") == false) {
                    content.stop(true, true, true).slideUp(500);
                    el.removeClass("sub-menu-act");
                }
            }

        });
    }
    else {
        window.insideMenu = false;
        var prevNode = null;
        $(".navigation").css("display", "block");

        var bindOverlay = function (parentEl, eventType) {

            var ie6 = $("html").hasClass("ie6");
            if ($(".menu-overlay").length <= 0 && ie6 == false) {
                parentEl.before("<div class='menu-overlay'></div>");
                $(".menu-overlay").width($(document).width());
                $(".menu-overlay").height($(document).height());

                $(".menu-overlay").unbind().bind(eventType, function (e) {

                    if (window.insideMenu)
                        $(".dd-navi").stop(true, true, true).css("display", "none");
                    else
                        $(".dd-navi").stop(true, true, true).slideUp(500);
                    $(".navigation > li").removeClass("menu-act menu-act-next");
                    window.insideMenu = false;
                    $(this).css("display", "none");

                });
            }

        }

        var showMenu = function (e) {

            var eventType = e.type;
            var el = $(this);
            var nextEl = el.next("li")
            var content = $(".dd-navi", el);
            var siblings = $(".dd-navi", el.siblings("li"));
            var submenu = $(".navigation .col-two");
            var parentEl = el.parent();
            var overlay = $(".menu-overlay");

            if (eventType == "click" && content.css("display") == "none") {
                e.preventDefault();
                siblings.stop(true, true, true).css("display", "none");

                if (prevNode != null)
                    prevNode.removeClass("menu-act");
                submenu.css("display", "none");
            }

            $(".navigation > li").removeClass("menu-act-next");

            if (nextEl.length > 0)
                nextEl.addClass("menu-act-next");

            overlay.css('display', 'block');
            el.addClass("menu-act");

            if (window.insideMenu) {
                content.stop(true, true, true).css("display", "block");
                bindOverlay(parentEl, eventType);
            }
            else {
                window.insideMenu = true;
                content.stop(true, true, true).slideDown(500, function () { bindOverlay(parentEl, eventType); });
            }

            prevNode = el;

        }

        var hideMenu = function (e) {

            var el = $(this);
            var nextEl = el.next("li");
            var content = $(".dd-navi", el);
            var submenu = $(".navigation .col-two");
            var target = $(e.target);

            setTimeout(function () {

                if (nextEl.length > 0)
                    nextEl.removeClass("menu-act-next");
                el.removeClass("menu-act");
                submenu.css("display", "none");

                if (window.insideMenu)
                    content.stop(true, true, true).css("display", "none");
                else
                    content.stop(true, true, true).slideUp(500);
            }, 50);


        }

        var showSubMenu = function (e) {

            var eventType = e.type;
            var el = $(this);
            var content = $("ul", el);
            var siblings = $("ul", el.siblings("li"));
            var target = e.target;

            if (eventType == "click" && content.css("display") == "none" && content.children().length > 0)
                e.preventDefault();

            siblings.css('display', 'none');
            $(".col-one > li").removeClass("sub-menu-act");

            if (content.css('display') == "none") {
                content.css('display', 'block');
                el.addClass("sub-menu-act");
            }

        }


        if (docWidth <= 768) {

            $(".navigation > li").unbind('mouseenter');
            $(".navigation > li").unbind('mouseleave');
            $(".col-one > li").unbind('mouseenter');

            $(".navigation > li").unbind('click', showMenu).bind('click', showMenu);

            $(".col-one > li").unbind('click', showSubMenu).bind('click', showSubMenu);

            $('.videoPlayer').each(function () {
                $(this).find('embed').attr('width', '470').attr('height', '264');
            });
        }
        else {
            $(".navigation > li").unbind('mouseenter', showMenu).bind('mouseenter', showMenu);

            $(".navigation > li").unbind('mouseleave', hideMenu).bind('mouseleave', hideMenu);

            $(".col-one > li").unbind('mouseenter', showSubMenu).bind('mouseenter', showSubMenu);
        }


    }

}