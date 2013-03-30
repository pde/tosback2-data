/*
This script file is created for capturing dynamic UDO variables on overlay pages. eg. login, registration, forgot password etc..
This script file also captures manual linking for external websites. e.g Mattel top navigations Toy factory, shop, videos, Games
*/
var pageId = '';
var szProductId = '';
var szEventId = '';
var szEventCategoryId = '';
var szEventAction = '';
var szEventDetail = '';
var szEventSubDetail = '';
var szEventActionType = '';
var szEventType ='';
var szEventPoint='';
var szEVentConvId ='';
var brand = '';
var country = '';
var categoryId = '';
var division = '';
var ipAddress = '';
var language = '';

var pageName = document.title;
var pageSubType = '';
var pageType = '';
var pageUrl = '';
var platform = '';
var refferrerUrl = document.referrer != null ? document.referrer : '';
var requestedUrl = window.location.href;
var siteSection = '';
var siteType = '';

var CustomerId = '';
var ReviewDate = '';
var ReviewId = '';

// Added for Core Metrics - Starts
var szManualLink = '';
var szManualLinkName = '';
var gameName = '';
var searchTerm = '';
var searchText = '';
var refinementId = '';
var region='';
var currency='';

$(document).ready(function () {

    if (document.getElementById('hdnpageId') != null) {
        pageId = document.getElementById('hdnpageId').value;
    }

    if (document.getElementById('thdnBrandName') != null) {
        brand = document.getElementById('thdnBrandName').value;
    }

    if (document.getElementById('thdnManualLinkHref') != null) {
        szManualLink = document.getElementById('thdnManualLinkHref').value;
    }

    if (document.getElementById('thdnManualLinkName') != null) {
        szManualLinkName = document.getElementById('thdnManualLinkName').value;
        UTagExternalLink(szManualLink, szManualLinkName, pageId);
    }

    if (document.getElementById('thdnProductId') != null) {
        szProductId = document.getElementById('thdnProductId').value;
    }

    if (document.getElementById('gameName') != null) {
        gameName = document.getElementById('gameName').value;
    }
    // Added for Core Metrics - Ends

    if (document.getElementById('hdnpageId') != null) {
        pageUrl = document.getElementById('hdnpageId').value;
    }

    if (document.getElementById('hdnplatform') != null) {
        platform = document.getElementById('hdnplatform').value;
    }

    if (document.getElementById('hdncountry') != null) {
        country = document.getElementById('hdncountry').value;
    }
    if (document.getElementById('hdnlanguage') != null) {
        language = document.getElementById('hdnlanguage').value;
    }
    if (document.getElementById('hdnsiteSection') != null) {
        siteSection = document.getElementById('hdnsiteSection').value;
    }
    if (document.getElementById('hdnsubType') != null) {
        siteType = document.getElementById('hdnsubType').value;
    }
    if (document.getElementById('hdnuserIPAddres') != null) {
        ipAddress = document.getElementById('hdnuserIPAddres').value;
    }

    if (document.getElementById('thdnCustomerId') != null) {
        CustomerId = document.getElementById('thdnCustomerId').value;
    }

    if (document.getElementById('thdnSearchTermValue') != null) {
        searchTerm = document.getElementById('thdnSearchTermValue').value;
    }

    if (document.getElementById('thdnSearchText') != null) {
        searchText = document.getElementById('thdnSearchText').value;
    }

    if (document.getElementById('thdnSearchRefinementId') != null) {
        refinementId = document.getElementById('thdnSearchRefinementId').value;
    }

    var szProductId, szProductName, szProductReviews, szProductRating, szProductSellingPrice, szProductBasePrice, szProductInventoryStatus, szBrandName, szProductBackOrderDate;
    if (document.getElementById('thdnProductId') != null) {
        szProductId = document.getElementById('thdnProductId').value;
    }

    if (document.getElementById('thdnProductName') != null) {
        szProductName = document.getElementById('thdnProductName').value;
    }

    if (document.getElementById('thdnProductReviews') != null) {
        szProductReviews = document.getElementById('thdnProductReviews').value;
    }

    if (document.getElementById('thdnProductRating') != null) {
        szProductRating = document.getElementById('thdnProductRating').value;
    }

    if (document.getElementById('thdnProductSellingPrice') != null) {
        szProductSellingPrice = document.getElementById('thdnProductSellingPrice').value;
    }

    if (document.getElementById('thdnProductBasePrice') != null) {
        szProductBasePrice = document.getElementById('thdnProductBasePrice').value;
    }

    if (document.getElementById('thdnProductInventoryStatus') != null) {
        szProductInventoryStatus = document.getElementById('thdnProductInventoryStatus').value;
    }

    if (document.getElementById('thdnProductBackOrderDate') != null) {
        szProductBackOrderDate = document.getElementById('thdnProductBackOrderDate').value;
    }

    if (document.getElementById('thdnBrandName') != null) {
        szBrandName = document.getElementById('thdnBrandName').value;
    }

    $('.capture_text_link').click(function () {
        var currentAnchor = $(this);
        var dynamicPageId = currentAnchor.attr('data-capturescreen');
        setUTagView(dynamicPageId);

    });
    $('.capture_goButton').click(function () {
        var currentAnchor = $(this);
        var dynamicPageId = currentAnchor.attr('data-capturescreen');
        setUTagView(dynamicPageId);

    });
    $('.capture_btn').click(function () {
        var currentAnchor = $(this);
        var dynamicPageId = currentAnchor.attr('data-capturescreen');
        setUTagView(dynamicPageId);

    });


    $('#newSignIn').click(function () {
        var currentAnchor = $(this);
        var pageid = currentAnchor.attr('id');
        setUTagView(pageid);

    });


    //Manual link clicking
    $('#nav-games a').click(function () {
        var currentAnchor = $(this);
        var linkurl = currentAnchor.attr('href');
        var linktext = currentAnchor.text();
        UTagExternalLink(linkurl, linktext, pageId);
    });

    $('.nav-items > a').click(function () {
        var currentAnchor = $(this);
        var linkurl = currentAnchor.attr('href');
        var linktext = currentAnchor.text();
        UTagExternalLink(linkurl, linktext, pageId);

    });

    $('.ft-list-container p > a').click(function () {
        var currentAnchor = $(this);
        var linkurl = currentAnchor.attr('href');
        var linktext = currentAnchor.text();
        UTagExternalLink(linkurl, linktext, pageId);
    });

    $('.ft-list-container ul li > a').click(function () {
        var currentAnchor = $(this);
        var linkurl = currentAnchor.attr('href');
        var linktext = currentAnchor.text();
        UTagExternalLink(linkurl, linktext, pageId);
    });

    $('ft-inline-wrap li > a').click(function () {
        var currentAnchor = $(this);
        var linkurl = currentAnchor.attr('href');
        var linktext = currentAnchor.text();
        UTagExternalLink(linkurl, linktext, pageId);
    });

    /* Below codes are added for CoreMetrics - Starts */

    /* For BuyNow Link */
    $('.buy-now a').click(function () {
        var currentAnchor = $(this);
        var linkClass = currentAnchor.attr('class');
        var linkurl = currentAnchor.attr('href');
        if (linkurl.indexOf("m.fisher-pricestore.com") < 0) {
            szEventId = szProductName;
            pageType = 'Product Detail';
            szEventSubDetail = '';
            szEventAction = 'Click';
            szEventType = 'element';
            szEventPoint = '';
            szEventActionType = "";
            if (linkClass == "button-component") {
                szEventCategoryId = 'Buy Now';
                szEventDetail = 'BuyNow';
            }
            else if (linkClass == "find-a-retailer") {
                szEventCategoryId = 'Find a Retailer';
                szEventDetail = 'Find a Retailer';
            }
            setUTagView(pageId);
        }
        //setUTagViewForEvents(szEventId,szEventCategoryId,'',pageType,szEventAction,szEventDetail,szEventSubDetail);
    });

    /* For Find a Retailer Link */
    /* $('.find-a-retailer-block').click(function () {
    szEventId = szProductName;
    szEventCategoryId = 'Find a Retailer';
    pageType = 'Product Detail';
    szEventDetail = 'Find a Retailer';
    szEventSubDetail = '';
    szEventAction = 'Click';
    szEventType = 'element';
    szEventPoint = '';
    szEventActionType = "";
    setUTagView(pageId);
    //setUTagViewForEvents(szEventId,szEventCategoryId,'',pageType,szEventAction,szEventDetail,szEventSubDetail);
    });*/

    /*For Social Media links */
    /*$('.addthis_toolbox').click(function () {
    var currentAnchor = $(this);
    var linkurl = currentAnchor.attr('href');
    var linktext = currentAnchor.text();      
    });*/

    /* For the "Need help with this product?" Links */
    $('.product-detail-links').click(function () {
        var currentAnchor = $(this);
        var linkurl = currentAnchor.attr('href');
        var linktext = currentAnchor.text();
        setUTagView(pageid);
    });

    /* For Join the Conversation FaceBook link */
    $('.fb').click(function () {
        szEventId = szProductName;
        szEventCategoryId = 'FaceBook';
        pageType = 'Product Detail';
        szEventDetail = 'Facebook';
        szEventSubDetail = '';
        szEventAction = 'Click';
        szEventType = 'element';
        szEventPoint = '';
        szEventActionType = "";
        setUTagView(pageId);
        //setUTagViewForEvents(szEventId,szEventCategoryId,'',pageType,szEventAction,szEventDetail,szEventSubDetail);
    });

    /* For Share your Photo Link */
    $('.clear-both a').click(function () {
        var currentAnchor = $(this);
        var linkId = currentAnchor.attr('id');
        if (linkId == "PhotoUpload") {
            szEventId = szProductName;
            szEventCategoryId = 'Share your Photo';
            pageType = 'Product Detail';
            szEventDetail = 'Share Your Photo';
            szEventSubDetail = '';
            szEventAction = 'Click';
            szEventType = 'element';
            szEventPoint = '';
            szEventActionType = "";
            setUTagView(pageId);
        }
        //setUTagViewForEvents(szEventId,szEventCategoryId,'',pageType,szEventAction,szEventDetail,szEventSubDetail);
    });

    /* For the Home Page RMA tagging*/
    $('.landing-scrollable .items a').click(function () {
        var currentAnchor = $(this);
        var ImageName = currentAnchor.children('img').attr('src');
        if (ImageName != undefined) {
            if (ImageName.indexOf("RMA") != -1) {
                var rmaLinkName = '';
                var getTrackValue = $(this).attr('track');
                if (getTrackValue != undefined) {
                    getTrackValue = getTrackValue.split('|');
                    if (getTrackValue[0] != undefined) {
                        szEventId = getTrackValue[0].substring(getTrackValue[0].indexOf("-") + 1, getTrackValue[0].length);
                    }
                }
                else {
                    var startIndex = ImageName.lastIndexOf("/");
                    var endIndex = ImageName.lastIndexOf(".");
                    szEventId = ImageName.substring(startIndex + 1, endIndex);
                }
                szEventCategoryId = "Home";
                szEventAction = "Click";
                pageType = "Marketing and Merchandising";
                szEventDetail = "Home";
                szEventSubDetail = szEventId;
                szEventType = 'element';
                szEventPoint = '';
                szEventActionType = "";
                setUTagView(pageId);
                //setUTagViewForEvents(szEventId,szEventCategoryId,'',pageType,szEventAction,szEventDetail,szEventSubDetail);
            }
        }
    });

    /* For the Left side Age Category section - Event Tag Category */
    $('.ages .left-scroll-pane  .jspContainer .jspPane ul li').click(function () {
        var currentAnchor = $(this);
        var linkurl = currentAnchor.attr('data-age-name');
        var linktext = currentAnchor.text();
        szEventId = linktext;
        szEventCategoryId = "Category";
        szEventAction = "Click";
        pageType = "Category";
        szEventDetail = "Category";
        szEventSubDetail = '';
        szEventType = 'element';
        szEventPoint = '';
        szEventActionType = "";
        setUTagView(pageId);
        //setUTagViewForEvents(szEventId,szEventCategoryId,'',pageType,szEventAction,szEventDetail,szEventSubDetail);
    });

    /* For the Left side Age Category section - Event Tag Sub Category */
    $('.category .left-scroll-pane  .jspContainer .jspPane ul li').click(function () {
        var currentAnchor = $(this);
        var details = currentAnchor.attr('data-cat-code');
        var linktext = currentAnchor.text();
        szEventId = linktext;
        szEventCategoryId = "Sub Category";
        szEventAction = "Click";
        pageType = "Sub Category";
        szEventDetail = "Category";
        szEventSubDetail = '';
        szEventType = 'element';
        szEventPoint = '';
        szEventActionType = "";
        setUTagView(pageId);
        //setUTagViewForEvents(szEventId,szEventCategoryId,'',pageType,szEventAction,szEventDetail,szEventSubDetail);
    });

    // Read a reviww link click
    $('.BVRRRatingSummaryLinkReadID a').click(function () {
        szEventId = szProductName;
        szEventCategoryId = 'Read All Reviews';
        pageType = 'Product Detail';
        szEventDetail = 'Read All Reviews';
        szEventSubDetail = '';
        szEventAction = 'Click';
        szEventType = 'element';
        szEventPoint = '';
        szEventActionType = "";
        setUTagView(pageId);
    });

    // Write a reviww link click
    $('.BVRRRatingSummaryLinkReadID a').click(function () {
        szEventId = szProductName;
        szEventCategoryId = 'Write a Review';
        pageType = 'Product Detail';
        szEventDetail = 'Write a Review';
        szEventSubDetail = '';
        szEventAction = 'Click';
        szEventType = 'element';
        szEventPoint = '';
        szEventActionType = "";
        setUTagView(pageId);
    });

    /* For the product thumbnail section - Event tag -Thumbnail */
    $('.search-results .product').on('click', function () {
        var productObj = $(this);
        var productDetailsObj = productObj.find('.product-info .product-name a');
        var productURL = productDetailsObj.attr('href');
        var productName = productDetailsObj.text();
        var startIndex = productURL.lastIndexOf("/");
        var endIndex = productURL.length;
        //szEventId = productURL.substring(startIndex + 1, endIndex);
        szEventId = productName;
        szEventCategoryId = "Thumbnail";
        szEventAction = "Click";
        pageType = "Thumbnail";
        szEventDetail = '';
        szEventSubDetail = '';
        szEventType = 'element';
        szEventPoint = '';
        szEventActionType = "";
        setUTagView(pageId);
        //setUTagViewForEvents(szEventId,szEventCategoryId,'',pageType,szEventAction,szEventDetail,szEventSubDetail);
    });


    /* For the Games section - Evevnt tag - Games  */
    /*$('.online-vediogame a').click(function () {
    var gameObj = $(this);
    var gameAction = gameObj.attr('href');
    var ImageName = $('.online-vediogame').children('img').attr('src');
    if (ImageName != undefined) {
    var startIndex = ImageName.lastIndexOf("/");
    var endIndex = ImageName.lastIndexOf(".");
    szEventId = ImageName.substring(startIndex + 1, endIndex);
    szEventCategoryId = pageName;
    szEventAction = "Play";
    pageType = "Games";
    szEventDetail = gameName;
    szEventSubDetail = '';
    szEventType = 'element';
    szEventPoint = '';
    szEventActionType = "";
    setUTagView(pageId);
    //setUTagViewForEvents(szEventId,szEventCategoryId,'',pageType,szEventAction,szEventDetail,szEventSubDetail);
    }
    });*/

    /* For the Articles section -  Article sharing on social site  */
    $('.accordians ul li a').click(function () {
        var currentAnchor = $(this);
        var articleUrl = currentAnchor.attr('href');
        var articleName = currentAnchor.text();
        szEventId = '';
        szEventCategoryId = "Articles and Topics";
        szEventAction = "Social share click ";
        pageType = "Articles and Topics";
        szEventDetail = articleName;
        szEventSubDetail = '';
        szEventType = 'element';
        szEventPoint = '';
        szEventActionType = "";
        setUTagView(pageId);
        //setUTagViewForEvents(szEventId,szEventCategoryId,'',pageType,szEventAction,szEventDetail,szEventSubDetail);
    });

    /*For Search */
    $('.sort-deselected').on("click", function (e) {
        szEventId = refinementId
        szEventCategoryId = "Search";
        szEventAction = "Refine";
        pageType = "Search Results";
        szEventDetail = searchText;
        szEventSubDetail = searchTerm;
        szEventType = 'element';
        szEventPoint = '';
        szEventActionType = "";
        setUTagView(pageid);
        //setUTagViewForEvents(szEventId,szEventCategoryId,'','',szEventAction,szEventDetail,szEventSubDetail):
    });

    /* For Manual Links in the Home Page */
    $('.sub-footer ul li a').on("click", function (e) {
        var currentAnchorObj = $(this);
        var manualLink = currentAnchorObj.attr('href');
        var manualLinkName = currentAnchorObj.children('img').attr('alt');
        UTagExternalLink(manualLink, manualLinkName, pageId);

        //if ((manualLinkName == "Mattel, Our Parent Co.") || (manualLinkName == "Customer Service") || (manualLinkName == "Product Registration") || (manualLinkName == "Recall Information") || (manualLinkName == "Online Games")) {
        //{            
        //}
    });

    /* External Links - Home Page*/
    $('.footer_column ul li a').on("click", function (e) {
        var currentAnchorObj = $(this);
        var manualLink = currentAnchorObj.attr('href');
        var manualLinkName = currentAnchorObj.text();
        var linkTarget = currentAnchorObj.attr('target');

        //if ((manualLinkName == "Mattel, Our Parent Co.") || (manualLinkName == "Customer Service") || (manualLinkName == "Product Registration") || (manualLinkName == "Recall Information") || (manualLinkName == "Online Games")) {
        if (linkTarget == "_blank") {
            UTagExternalLink(manualLink, manualLinkName, pageId);
        }
    });

    /* For Need help with this product in Product Page*/
    $('.product-detail-links a').on("click", function (e) {
        var currentAnchorObj = $(this);
        var manualLink = currentAnchorObj.attr('href');
        var manualLinkName = currentAnchorObj.text();
        //if (manualLinkName == "Visit Customer Service") {
        //UTagExternalLink(manualLink, manualLinkName, pageId);
        //}
        szEventId = szProductName;
        szEventCategoryId = manualLinkName;
        pageType = 'Product Detail';
        szEventDetail = manualLinkName;
        szEventSubDetail = '';
        szEventAction = 'Click';
        szEventType = 'element';
        szEventPoint = '';
        szEventActionType = "";
        setUTagView(pageId);
    });

    /* External Links - Games & Videos sections*/
    $('.social-links-embed ul li a').on("click", function (e) {
        var currentAnchorObj = $(this);
        var ImageName = currentAnchorObj.children('img').attr('title');
        if ((ImageName == "Facebook Icon") || (ImageName == "Twitter Icon")) {
            var manualLink = currentAnchorObj.attr('href');
            UTagExternalLink(manualLink, ImageName, pageId);
        }
    });

    /* External Links - Family Playtime section*/
    $('.grayBanner ul li a').on("click", function (e) {
        var currentAnchorObj = $(this);
        var manualLink = currentAnchorObj.attr('href');
        var manualLinkName = currentAnchorObj.text();
        UTagExternalLink(manualLink, manualLinkName, pageId);
    });


    /* For My Account in the Email Sign Up Page 1*/
    $('#e-sign-up .OrangeOkBtn').on("click", function (e) {
        szEVentConvId = "Age Screening";
        szEventCategoryId = "Family Club";
        szEventAction = "";
        pageType = "";
        szEventDetail = "";
        szEventSubDetail = "";
        szEventType = "conversion";
        szEventPoint = "10";
        szEventActionType = "1";
        setUTagView(pageId);
        //setUTagViewForMyAccount("Age Screening","Family Club","1","10","conversion");        
    });


    /* For My Account in the Email Sign Up Page 2*/
    $('.clearfix .right .left').on("click", function (e) {
        szEVentConvId = "Age Screening";
        szEventCategoryId = "Family Club";
        szEventAction = "";
        pageType = "";
        szEventDetail = "";
        szEventSubDetail = "";
        szEventType = "conversion";
        szEventPoint = "20";
        szEventActionType = "2";
        setUTagView(pageId);
        //setUTagViewForMyAccount("Age Screening", "Family Club", "2", "20", "conversion");
    });

    // The blow sections are for the Interstetial links - Starts
    /*$('.retailer-content ul li a').on("click", function (e) {
    var currentAnchorObj = $(this);
    var manualLink = currentAnchorObj.attr('href');
    var manualLinkName = currentAnchorObj.children('img').attr('alt');
    UTagExternalLink(manualLink, manualLinkName, pageId);
    });*/

    $('.brand-scrollable .items .cloned a').on("click", function (e) {
        var currentAnchorObj = $(this);
        var manualLink = currentAnchorObj.attr('href');
        var manualLinkName = currentAnchorObj.text();
        UTagExternalLink(manualLink, manualLinkName, pageId);
    });

    $('.brand-tiles .tile a').on("click", function (e) {
        var currentAnchorObj = $(this);
        var manualLink = currentAnchorObj.attr('href');
        var manualLinkName = '';
        var getTrackValue = $(this).attr('track');
        if (getTrackValue != undefined) {
            getTrackValue = getTrackValue.split('|');
            manualLinkName = getTrackValue[0];
        }
        UTagExternalLink(manualLink, manualLinkName, pageId);
    });

    $('.sub-footer ul li a').on("click", function (e) {
        var currentAnchorObj = $(this);
        var manualLink = currentAnchorObj.attr('href');
        var manualLinkName = currentAnchorObj.children('img').attr('alt');

        UTagExternalLink(manualLink, manualLinkName, pageId);
    });

    /* The below code is for Fisher-Price Apps inthe babytoys section */
    $('#app-products a').on("click", function (e) {
        var currentAnchorObj = $(this);
        var manualLink = currentAnchorObj.attr('href');
        var manualLinkName = '';
        var getTrackValue = $(this).attr('track');
        if (getTrackValue != undefined) {
            getTrackValue = getTrackValue.split('|');
            manualLinkName = getTrackValue[0];
        }
        UTagExternalLink(manualLink, manualLinkName, pageId);
    });

    /* The below code is for Fisher-Price Apps inthe Games & Activities section */
    $('#app-baby-products a').on("click", function (e) {
        var currentAnchorObj = $(this);
        var manualLink = currentAnchorObj.attr('href');
        var manualLinkName = '';
        var getTrackValue = $(this).attr('track');
        if (getTrackValue != undefined) {
            getTrackValue = getTrackValue.split('|');
            manualLinkName = getTrackValue[0];
        }
        UTagExternalLink(manualLink, manualLinkName, pageId);
    });


    /*$('.searchNavigation .brand-search ul li a').on("click", function (e) {        
    var currentAnchorObj = $(this);
    var currentLink = currentAnchorObj.attr('href');        
    setUTagOnSearchRefinement();
    });*/

    /* For Demo Video */
    $('.product-detail-carousel-scroll a').on("click", function (e) {
        var currentAnchorObj = $(this);
        var iConText = $(this).attr('rel');

        if (iConText == "demo") {
            szEventId = pageId + ": Demo Video";
            szEventType = "element";
            szEventCategoryId = "Demo Video";
            setUTagForDemoVideo(szEventId, szEventType, szEventCategoryId, szBrandName);
        }
    });


    /*Manulink click code added for find a retailer page on March 15 by on-site*/

    $('.findretailer-buyonline li > a').click(function () {
    var currentAnchor = $(this);
    var currentImg = currentAnchor.children('img');
    var linkurl = currentAnchor.attr('href');
    var linktext = currentImg.attr('alt');
    UTagExternalLink(linkurl, linktext, pageId);

    }); 

    $('#ContinueButton').click(function () {
        var currentAnchor = $(this);
        var linkurl = currentAnchor.attr('href');
        var linktext = currentAnchor.text();
        UTagExternalLink(linkurl, linktext, pageId);

    });


    /*Applink track*/
    $('.app_thumbnail a').click(function () {
        var currentAnchor = $(this);
        var linkurl = currentAnchor.attr('href');
        var linktext = TrimTrackingText(currentAnchor.attr('wt8track'));
        UTagExternalLink(linkurl, linktext, pageId);
    });

    $('.app_link a').click(function () {
        var currentAnchor = $(this);
        var linkurl = currentAnchor.attr('href');
        var linktext = TrimTrackingText(currentAnchor.attr('wt8track'));
        UTagExternalLink(linkurl, linktext, pageId);

    });

    /*Footer Links*/
    $('#footer_fullsite a').click(function () {
        var currentAnchor = $(this);
        var linkurl = currentAnchor.attr('href');
        var linktext = currentAnchor.text();
        UTagExternalLink(linkurl, linktext, pageId);

    });
    $('#customer_service a').click(function () {
        var currentAnchor = $(this);
        var linkurl = currentAnchor.attr('href');
        var linktext = currentAnchor.text();
        UTagExternalLink(linkurl, linktext, pageId);

    });
    $('#recall a').click(function () {
        var currentAnchor = $(this);
        var linkurl = currentAnchor.attr('href');
        var linktext = currentAnchor.text();
        UTagExternalLink(linkurl, linktext, pageId);

    });

    /*Element tag Tracking for Home Page Banners*/
    $('.rma-tile a').click(function () {
        var currentAnchor = $(this);
        var linktext = TrimTrackingText(currentAnchor.attr('track'));
        setElementTags(linktext, 'Home - Mobile', 'Home Banner', '');

    });
     /* $('.landing-tiles a').click(function () {
        var currentAnchor = $(this);
        var linktext = TrimTrackingText(currentAnchor.attr('track'));
        setElementTags(linktext, 'Home - Mobile', 'Home Banner', '');
    }); */
    $('.landingTilesContainer .tile a').click(function () {
        var currentAnchor = $(this);
        var linktext = TrimTrackingText(currentAnchor.attr('track'));
        setElementTags(linktext, 'Home - Mobile', 'Home Banner', '');
    });

    /*Buy now button*/

    $('.buy-now a').click(function () {
        var currentAnchor = $(this);
        var linktext = currentAnchor.attr('wt8track');
        var linkurl = currentAnchor.attr('href');
        if (linkurl.indexOf("m.fisher-pricestore.com") > 0) {
            var productname = linktext.substring(linktext.indexOf('-') + 1, linktext.indexOf('|'));
            setElementTags(productname, 'Buy Now - Mobile', 'Buy Now', '');
        }

    });

    /*Share links*/

    $('.addthis_toolbox a').click(function () {
        var currentAnchor = $(this);
        //var product = $('.buy-now a').attr('wt8track');
        //var productname = product.substring(product.indexOf('-') + 1, product.indexOf('|'));
        var eventdetail = currentAnchor.attr('title');
        setElementTags(szProductName, 'Social Share - Mobile', eventdetail, '');

    });

    $('#product_sort input[type="image"]').click(function () {
        var szSortName = '';
        $("select option:selected").each(function () {
            var currentoption = $(this);
            var sortedby = currentoption.val();
            //var sortedby = currentoption.text();
            if (sortedby == "pPrice|0") 
            {
                szSortName = "Price: Low->High";
            }
            else if (sortedby == "pPrice|1") 
            {
                szSortName = "Price: High->low";
            }
            else if (sortedby == "pProduct+Name|0") 
            {
                szSortName = "Product Name";
            }
            else if (sortedby == "pBVRating|1") 
            {
                szSortName = "Product Rating";
            }
            else if (sortedby == "pCreateDate|1") 
            {
                szSortName = "What's New";
            }
            //setElementTags(sortedby, 'Search - Mobile', 'Sorted By', '');
            setElementTags(szSortName, 'Search - Mobile', 'Sorted By', '');
        });
    });

});


    /* Below codes are added for CoreMetrics - Ends */
function setElementTags(eventid, categoryid, detailattr, detailsubattr) {
    utag.view({
        event_id: eventid,
        event_category_id: categoryid,
        event_action_attr46: "Click",
        event_detail_attr47: detailattr,
        event_detail_sub_attr48: detailsubattr,
        event_type: "element"
    });
}

function TrimTrackingText(trackingText) 
{
    return trackingText.substring(0, trackingText.indexOf('|'));
}


function UTagExternalLink(linkUrl, linkName, pageId) 
{   
    utag.link({ link_url: linkUrl, link_name: linkName, page_id: pageId });    	
}

function setUTagView(pageid)
{
utag.view(
{
      page_id: pageid,     
      category_id:categoryId,                                  
      division_attr1: division,             
      site_Type_attr2:siteType,
      site_Country_attr3:country,
      site_Region_attr4:region,
      platform_attr5:platform,
      currency_attr6:currency,  
      language_attr7:language,
      site_section_attr8:siteSection,
      page_name_attr9:pageName,
      page_type_attr10:pageType,
      page_subtype_attr11:pageSubType,
      referring_url_attr12:refferrerUrl,
      requested_url_attr13 :requestedUrl, 
      ip_address_attr14:ipAddress,
      brand_attr20: szBrandName,      
      registration_id2_attr15:CustomerId,
      review_date_latest_attr41: ReviewDate,
      review_id_attr42: ReviewId,
      event_id: szEventId,
      event_category_id: szEventCategoryId,
      event_action_attr46: szEventAction,
      event_detail_attr47: szEventDetail,
      event_detail_sub_attr48: szEventSubDetail,
      event_action_type: szEventActionType,
      event_type:szEventType,
      event_points:szEventPoint,
      conv_event_id: szEVentConvId
  });

      }


      function setUTagOnRegistrationSuccess(registrationId) 
      {
         var rdate=new Date();
         var registrationDate = rdate.toString();
         utag.view({ registration_id: registrationId, page_id: "Registration Submit", category_id: "", registration_date_attr37: registrationDate });
      }

      function setUTagOnLoginSuccess(registrationId) 
      {
          var rdate = new Date();
          var resentDate = rdate.toString();
          utag.view({ registration_id: registrationId, page_id: "Login  Submit", category_id: "", login_most_recent_date_attr38: resentDate, login_site_section_attr40: pageId });
      }

      function setUTagOnSearch(searchText, refinementId, totalMatches) 
      {          
          szEventId = refinementId
          szEventCategoryId = "Search";
          szEventAction = "Refine";
          pageType = "Search Results";
          szEventDetail = searchText;
          szEventSubDetail = "";          
          utag.view({ search_term: searchText, search_results: totalMatches, search_type_attr29: "keyword", search_refinement_attr30: refinementId,event_type:'search' });
          
     }

     function setUTagOnSearchRefinement(searchText, refinementId) 
     {
         szEventId = refinementId
         szEventCategoryId = "Search";
         szEventAction = "Refine";
         pageType = "Search Results";
         szEventDetail = searchText;
         szEventSubDetail = "";
         var thdnpageTitle = "";
         if (document.getElementById('thdnpageTitle') != null) 
         {
             thdnpageTitle = document.getElementById('thdnpageTitle').value;
         }
         utag.view({ event_id: "Search", event_category_id: szEventCategoryId, page_name_attr9: thdnpageTitle, page_type_attr10: szEventAction, brand_attr20: " ", event_trigger_action: szEventAction, specific_area_of_page: szEventId, sub_specific_area_on_page: "Search Term", event_type: 'search' });         
        
     }

     function setUTagForDemoVideo(eventId,eventType,eventCategoryId,brandName) 
     {
         utag.view({ event_id: eventId, event_type: eventType, event_category_id: eventCategoryId, brand_attr20: brandName });
         
     }