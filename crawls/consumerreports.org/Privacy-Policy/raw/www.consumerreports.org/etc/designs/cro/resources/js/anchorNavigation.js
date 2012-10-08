/*
Author: XumaK-CRO, PAlecio
Title: Anchor Navigation
Description: Contains the javascript functions used in the anchorNavigation.vtl
Created Date: 2011.11.23
Changes History:
======================================================================================================================================== */

//changes the content in the 'buying-guide-breadcrumb-text' with the parameter received
function changeBreadcrumbText(text){
    $('#buying-guide-breadcrumb-text').text(text);
}

// hides an shows certain divs when a page is changed
function  buyingGuideChangePage (num, paginationType) {
    if (paginationType == "twocolumnsections") {
        anchorNavigation_setPageContent(num);
    } else {
        initPagination(num);
    }
    $(".anchor_nav_link").show();
    $(".anchor_nav_text").hide();
    $("#text"+num).show();
    $("#link"+num).hide();
    if (num==0){
        $("#justPageOne").show();
        $("#justPageOneImage").show();
    } else {
        $("#justPageOne").hide();
        $("#justPageOneImage").hide();
    }
    return false;
}

// hides the link and shows the text when the link is clicked
function disableLink(){
    $("#text0").show();
    $("#link0").hide();
}

function changePage(num, paginationType) {
    if(anchors!=null && (typeof anchors[num] != "undefined")){
        anchorNavigation_setBreadcrumbText(num);
        var anchor = anchors[num].title;
        if (typeof updateBuyingGuideEventsToSC != 'undefined') {
            updateBuyingGuideEventsToSC(anchor);
        }
    }
    buyingGuideChangePage(num, paginationType);
}

// generates the links
function setAnchors(paginationType) {
    if (paginationType == "twocolumnsections") {
        anchorNavigation_setAnchorsForBySectionWithSectionTitlesPagination();
    } else if (paginationType == "By Words") {
        anchorNavigation_setAnchorsForByWords();
    } else {
        anchorNavigation_setAnchorsForDefault(paginationType);
    }
}

function anchorNavigation_setPageContent(pageIndex) {
    var new_content = jQuery('#hiddenresult h2.section-title:eq(' + pageIndex + ')').parent().clone();
    var first_section_title = $(new_content).find("h2.section-title").first();
    if ($(first_section_title).text() != ""){
        $(first_section_title).css("margin-top","10px");
        $(first_section_title).css("margin-bottom","10px");
    } else {
        $(first_section_title).css("margin","0");
    }
    $('#Searchresult').empty().append(new_content);
    return false;
}

function anchorNavigation_setBreadcrumbText(pageIndex) {
    if (anchors != null && (typeof anchors[pageIndex] != "undefined")) {

        var anchor = anchors[pageIndex].title;

        if (anchor == "Getting started") {
            changeBreadcrumbText(supercategory + " buying guide");
        } else if (anchor == "Types") {
            changeBreadcrumbText('Types of ' + supercategory);
        } else {
            changeBreadcrumbText(supercategory + " " + anchor.toLowerCase());
        }

    }
}

function anchorNavigation_setAnchorsForBySectionWithSectionTitlesPagination() {

    var anchor_nav = document.getElementById("anchor-nav");
    var length = anchors.length;

    $("#anchor-nav").empty();
    var firstColumn = $("<div class='anchor-nav-first-column'></div>");
    var secondColumn = $("<div class='anchor-nav-second-column'></div>");
    $("#anchor-nav").append(firstColumn);
    $("#anchor-nav").append(secondColumn);


    for (i = 0; i < length; i++) {
        var column;
        if (i % 2 == 0) {
            column = firstColumn;
        } else {
            column = secondColumn;
        }

        var click = new Function("return changePage(" + i + ", 'twocolumnsections')");
        column.append(
                $("<div></div>").append($("<a id='link" + i + "' class='anchor_nav_link' >" + anchors[i].title + "</a>").attr('href', "javascript:void(0);").click(click))
                       .append($("<span id='text" + i + "' class='anchor_nav_text' style='display:none;'>" + anchors[i].title + "</span>"))
        );
                
        isAnchorNavigationIncluded = true;
    }

    disableLink();

    var props = new Properties();
    props.parseQueryString(window.location.search.substring(1));
    var pn = props.getProperty("pn")

    if (pn !== undefined) {
        changePage(pn, 'twocolumnsections');
    } else if (length > 0) {
        changePage(0, 'twocolumnsections');
    }
}

function anchorNavigation_setAnchorsForDefault(paginationType) {
    var anchor_nav = document.getElementById("anchor-nav");
    var length = anchors.length;
    var anchor = "";
    var hasAnchors = false;
    var href = "";
    var onclick = "";

    var isBySectionWithSectionTitlesPagination = paginationType == "By section with section titles";

    if (isBySectionWithSectionTitlesPagination) {
        anchor_nav.innerHTML = "";
    }

    for (i = 0; i < length; i++) {
        href = (isBySectionWithSectionTitlesPagination) ? "javascript:void(0);" :  "#" + anchors[i].name.replace(/ /g, '&#32');
        onclick = (isBySectionWithSectionTitlesPagination)? "onclick = 'return changePage(" + i + ")'" : "";
        anchor = anchors[i].title;
        hasAnchors = true;
        anchor_nav.innerHTML += "<a id='link" + i + "' class='anchor_nav_link' href='"+ href + "'" + onclick + ">" + anchor + "</a>";
        anchor_nav.innerHTML += "<span id='text" + i + "' class='anchor_nav_text' style='display:none;'>" + anchor + "</span>";
        if (i < length - 1) {
            anchor_nav.innerHTML += "&nbsp; | &nbsp;";
        }
    }

    if (isBySectionWithSectionTitlesPagination) {
        disableLink();
    }
}

function anchorNavigation_setAnchorsForByWords() {
    if ($('.result').length > 0) {
        $('div#anchor-nav').empty().append(
            $('.result').map(function(pn, page) {
                return [
                    $('<a>').text(pn).attr({"id": "link" + pn, "class": "anchor_nav_link", "href": "javascript:void(0);"}).get(0),
                    $('<span>').text(pn).attr({"id": "text" + pn, "class": "anchor_nav_text", "style": "display:none;"}).get(0)
                ]
            })
        );
     } else if ($("#Searchresult").is(':empty')) {
        $("#hiddenresult").show();       
     }
}

//'hides' the anchor navigation
function hide(){
    $("#anchor-wrap").hide();
}

//decides if the anchor navigation should be hidden
function hideAnchorNavigation(){
    if(isArticle){
        if(!isAnchorNavigationIncluded){
            hide();
        }
        if(anchors.length <= 0){
            if(!isVisible){
                hide();
            }
        }
    }
    if(isBuyingGuidePage && anchors.length <= 1){
        if(!(isVisible)){
            hide();
            var first_section_title = $('#articles-wrap').find("h2.section-title").first();
            $(first_section_title).hide();
        }
    }
}

function setNoAnchorsText(){
    if((!isProductPage) && (anchors.length <= 0)){
        $("#anchor-wrap").html("<div align='center' style='color:gray; background:#d2e0f1;'> -No anchors- </div>");
    }
}