 

var flag="default";
var virtual="default";
var menuHgtFlag = "new";

/* New google analytics functions - need to wire in on a per page basis */
$(document).ready(function() {
    loadCookieDialog();
    wireHeaderNav();
    wireFooterNav();
    wireFindAndBookHome();
    wireFeaturedCruises();
    wireRecentlyViewedCruises();
    // wireCruiseSearch();
    wireFindAndBookOffers();
    wireCruiseSearchResultItem();
    wireCruiseDetailsPage();
});




function wireHeaderNav() {
    $("#main-nav").click(function(event) {
        var tmp = $(event.target);
        tmp = tmp.parentsUntil("#main-nav").last().attr("id");
        tmp = tmp.replace("MainMenuUC_", "");
        tmp = tmp.replace("LI", "");
        var href = event.target.attributes[0];
        if (typeof (href) != 'undefined') {
            if (href.value.indexOf("Cruise-Ships/Ship-Webcams") != -1) {
                _gaq.push(['_trackEvent', 'WebCam in MainNav', 'Webcams', href.value]);
            }
            else {
                _gaq.push(['_trackEvent', 'MainNav', tmp, href.value]);
            }
        }
        // event.preventDefault(); // stops the link
    });
}

function wireFooterNav() {
    $("#footer-links").click(function(event) {
        var tmp = $(event.target);
        tmp = tmp.parentsUntil("#footer-links").last().attr("id");
        var action = "unknown";
        switch (tmp) {
            case "footer-links-item-2": action = "Cruises"; break;
            case "footer-links-item-3": action = "Ship"; break;
            case "footer-links-item-4": action = "Destinations"; break;
            case "footer-links-item-5": action = "Experience"; break;
            case "footer-links-item-6": action = "Help"; break;
        }
        var href = event.target.attributes[0];
        if (typeof (href) != 'undefined') {
            _gaq.push(['_trackEvent', 'FooterNav', action, href.value]);
        }
    });

    $("#footer .openfooter").click(function() {
        _gaq.push(['_trackEvent', 'FooterNav', 'Open footer', location.href]);

    });

    $("#footer .closefooter").click(function() {
        _gaq.push(['_trackEvent', 'FooterNav', 'Close footer', location.href]);

    });
    
}

function wireFindAndBookHome() {
    if ($("#quickSrchBox").length > 0) {
        // now find dropdowns within #quickSrchBox, need to use delegate as these are within an ASP.Net update panel
        $("#quickSrchBox").delegate("SELECT","change", function() {
            var val = $(this).val();
            var ddtype = $(this).attr("id");
            ddtype = ddtype.substring(ddtype.indexOf("_") + 1);
            ddtype = ddtype.replace("ddn", "");
            // alert(ddtype + " = " + val);
            _gaq.push(['_trackEvent', 'QuickSearch', ddtype, val]);
        });

        $("#quickSrchBox").delegate(".qckSearchBtn", "click", function() {
            console.log("search button pressed");
            var cruisecount = $("#TotalCruises span").text();
            cruisecount = cruisecount.replace(" cruises found", "");
            var qsearchstring = "";
            $("#quickSrchBox select").each(function() {
                var val = $(this).val();
                var ddtype = $(this).attr("id");
                ddtype = ddtype.substring(ddtype.indexOf("_") + 1);
                ddtype = ddtype.replace("ddn", "");
                qsearchstring += ddtype + "=" + val + "&";
            });
            qsearchstring += "Value=" + cruisecount;
            _gaq.push(['_trackEvent', 'QuickSearch', 'Search', qsearchstring]);
        });
        
    }

}

function wireFindAndBookOffers() {
    if ($(".CruiseTypeInner").length > 0) {
        $(".CruiseTypeInner A").click(function() {
            var offerType = $(this).text();
            if (offerType.length == 0) {
                offerType = $(this).attr("rel");
            }
            _gaq.push(['_trackEvent', 'FindAndBookOffers', 'Cruise Type', offerType]);
        });
    }

    if ($(".latedealdetails").length > 0) {
        $(".latedealdetails a.offermoredetail").click(function() {
            var cruisecode = $(this).attr("data-cruisecode");
            var bodyid = $("body").attr("id");
            if (typeof bodyid != "undefined") {
                if (bodyid == "CruiseOffers" || bodyid == "OffersHub") {
                    _gaq.push(['_trackEvent', 'OffersHub', 'ViewCruiseDetails', cruisecode]);

                }
                else {
                    _gaq.push(['_trackEvent', 'FindAndBookOffers', 'ViewCruiseDetails', cruisecode]);
                }
            }
            else {
                _gaq.push(['_trackEvent', 'FindAndBookOffers', 'ViewCruiseDetails', cruisecode]);
            }
        });
        $(".latedealdetails a.offerbookdeal").click(function() {
            var cruisecode = $(this).attr("data-cruisecode");
            var bodyid = $("body").attr("id");
            if (typeof bodyid != "undefined") {
                if (bodyid == "CruiseOffers" || bodyid== "OffersHub") {
                    _gaq.push(['_trackEvent', 'OffersHub', 'BookNow', cruisecode]);

                }
                else {
                    _gaq.push(['_trackEvent', 'FindAndBookOffers', 'BookNow', cruisecode]);
                }
            }
            else {
                _gaq.push(['_trackEvent', 'FindAndBookOffers', 'BookNow', cruisecode]);
            } 
        });
        // late deals on home page
        $(".latedealdetails .latesbuttonsmall a").click(function() {
            var cruisecode = $(this).attr("rel");
            _gaq.push(['_trackEvent', 'Home', 'ViewCruiseDetails', cruisecode]);
        });        
    }

    // view all offers (home page)
    if ($(".home-page-right-promotions .allOfferLink a").length > 0) {
        $(".home-page-right-promotions .allOfferLink a").click(function() {
          _gaq.push(['_trackEvent', 'Home', 'ViewAllOffers', 'RightHandPromoColumn']);
        });
    }

    // view all offers (offers hub)
    if ($("#OffersHub a.moreCruiseOffersLink").length > 0) {
        $("a.moreCruiseOffersLink").click(function() {
        _gaq.push(['_trackEvent', 'OffersHub', 'ViewAllLateDeals', $(this).attr("href")]);
        });
    }

    if ($("#OffersHub a.moreCruiseOffersLink").length > 0) {
        $("a.moreCruiseOffersLink").click(function() {
            _gaq.push(['_trackEvent', 'OffersHub', 'ViewAllLateDeals', $(this).attr("href")]);
        });
    }

    if ($("#OffersHub .imageoffer a").length > 0) {
        $("#OffersHub .imageoffer a").click(function() {
            _gaq.push(['_trackEvent', 'OffersHub', 'ViewOfferDetailsSide', $(this).attr("href")]);
        });
    }

    if ($("#OffersHub .offersby a").length > 0) {
        $("#OffersHub .offersby a").click(function() {
            _gaq.push(['_trackEvent', 'OffersHub', 'ViewOfferDetailsSide', $(this).attr("href")]);
        });
    }

    if ($("#OffersHub .moreOffer a.moreOffersLinkTrack").length > 0) {
        $("#OffersHub .moreOffer a.moreOffersLinkTrack").click(function() {
            _gaq.push(['_trackEvent', 'OffersHub', 'ViewOfferDetailsMiddle', $(this).attr("href")]);
        });
    }
    if ($("#OffersHub .moreOffersCruise a").length > 0) {
        $("#OffersHub .moreOffersCruise a").click(function() {
            _gaq.push(['_trackEvent', 'OffersHub', 'ViewOfferDetailsMini', $(this).attr("rel")]);
        });
    }       
}

function wireFeaturedCruises() {
    if ($("#featuredCruises").length > 0) {
        $("#featuredCruises").delegate(".rhs-cruise", "click", function() {
            // alert("got featured cruises");
            // now get rel attribute for hyperlink
            var cruisecode = $(this).children("a").attr("rel");
            // alert(cruisecode);
            _gaq.push(['_trackEvent', 'CruisePromo', 'Featured', cruisecode]);
        });
    }

    if ($("#footerfeaturedcruises").length > 0) {
        $("#footerfeaturedcruises").delegate(".footercruises-cruise", "click", function() {
            // alert("got featured cruises");
            // now get rel attribute for hyperlink
            var cruisecode = $(this).children("a").attr("rel");
            // alert(cruisecode);
            _gaq.push(['_trackEvent', 'CruisePromo', 'Footer Featured', cruisecode]);
        });
    }    
}

function wireRecentlyViewedCruises() {
    if ($("#viewedCruises").length > 0) {
        $("#viewedCruises").delegate(".rhs-cruise", "click", function() {
            // alert("got recently viewed cruises");
            var cruisecode = $(this).children("a").attr("rel");    
            _gaq.push(['_trackEvent', 'CruisePromo', 'RecentView', cruisecode]);
        });
    }

    if ($("#savedplaceholder").length > 0) {
        $("#savedplaceholder").delegate(".footercruises-cruise", "click", function() {
            // alert("got recently viewed cruises");
            var cruisecode = $(this).children("a").attr("rel");
            _gaq.push(['_trackEvent', 'CruisePromo', 'Footer RecentView', cruisecode]);
        });

        $("#savedplaceholder").delegate(".removesaved", "click", function() {
            // alert("got recently viewed cruises");
            var pageid = $(this).attr("rel");
            //            var cruisecode = "";
            //            _gaq.push(['_trackEvent', 'Saved Cruises', 'remove', cruisecode]);
            var savedcruises = getCookie("pocruises");
            savedcruises = savedcruises.replace(pageid + ",", "");
            savedcruises = savedcruises.replace(pageid, "");
            setCookie("pocruises", savedcruises, 30);
            if (typeof pageCode != 'undefined') {
                if (pageid == pageCode) {
                    toggleWishListButtons();
                    hideQTip();
                }
            }
            getFooterCruises();
            //window.location.href = window.location.href;
        });        
    }
}

function hideQTip() {
    $('.qtip').hide();
}

function toggleWishListButtons() {
    $('.btnAddWishList').toggle();
    $('span#btnRemoveWishListDiv').toggle();
    $('a.remove-wishlist_cruisepage').toggle();
}

function displaySavedToolTip(toolTipContent) {

    $('SPAN.in-wishlist_cruisepage').unbind().qtip({
        content: toolTipContent,
        show: { ready: true },
        position: {
            corner: {
                target: 'topMiddle',
                tooltip: 'bottomMiddle'
            }
        },
        style: {
            tip: 'bottomMiddle',
            border: {
                width: 3,
                radius: 3,
                color: '#cfcfcf'
            }
        },
        hide: {
            when: 'mouseout',
            fixed: true 
        }
    });
    setTimeout("hideQTip()", 10000);
}

function wireCruiseSearch() {
    if ($("#NewSearchBoxUC_updtePnl").length > 0) {
       
        $("#NewSearchBoxUC_updtePnl").delegate(".clr", "click", function(event) {
            event.preventDefault();
            var clearedItem = $(event.target).attr("id");
            clearedItem = clearedItem.substring(clearedItem.lastIndexOf("_") + 1);
            // alert("clear clicked:" + clearedItem);
        });
        $("#NewSearchBoxUC_updtePnl").delegate(".inLowerSecFltr", "click", function(event) {
            event.preventDefault();
            var clickedItem = $(event.target).attr("id");
            // clickedItem = clickedItem.substring(clickedItem.lastIndexOf("_") + 1);
            // alert("item clicked:" + clickedItem);
        });

        if ($("#NewSearchBoxUC_leftSBContainer").length > 0) {
            // alert("spotted results panel");
            // itinerary
            $("#NewSearchBoxUC_leftSBContainer").delegate(".ports p a", "click", function(event) {
                event.preventDefault();
                var clickedItem = $(event.target).parentsUntil(".item");
                clickedItem = clickedItem.attr("rel");
                // clickedItem = clickedItem.substring(clickedItem.lastIndexOf("_") + 1);
                // alert("item clicked:" + clickedItem);
            });

            // view details / book now
            $("#NewSearchBoxUC_leftSBContainer").delegate(".resultsButton", "click", function(event) {
                event.preventDefault();
                var clickedItem = $(event.target).attr("title");
                // clickedItem = clickedItem.substring(clickedItem.lastIndexOf("_") + 1);
                // alert("item clicked:" + clickedItem);
            });
                    
        }
        
    }
}

function wireCruiseSearchPanelToggle(item,showing) {
    // debugger;
    var topitem = $(item).parentsUntil(".innerCont");
    topitem = topitem.next();
    topitem = topitem.children(".clr");
    topitem = topitem.children("a");
    var clearedItem = topitem.attr("id");
    clearedItem = clearedItem.substring(clearedItem.lastIndexOf("_") + 1);
    // alert("toggled:" + clearedItem + ", showing:"+showing);
}

function wireCruiseSearchResultItem() {
    if ($("#NewSearchBoxUC_updtePnl").length > 0) {
        $("#NewSearchBoxUC_updtePnl").delegate("A.searchresultheading", "click", function() {
            // now get rel attribute for hyperlink
            var cruisecode = $(this).attr("rel");
            _gaq.push(['_trackEvent', 'SearchResults', 'ViewCruiseDetails-Header', cruisecode]);
        });

        $("#NewSearchBoxUC_updtePnl").delegate("A[title*='Book now']", "click", function() {
            // now get rel attribute for hyperlink
            var cruisecode = $(this).attr("rel");
            _gaq.push(['_trackEvent', 'SearchResults', 'BookNow', cruisecode]);
        });

        $("#NewSearchBoxUC_updtePnl").delegate("A[title*='More detail']", "click", function() {
            // now get rel attribute for hyperlink
            var cruisecode = $(this).attr("rel");
            _gaq.push(['_trackEvent', 'SearchResults', 'ViewCruiseDetails', cruisecode]);
        });

        $("#NewSearchBoxUC_updtePnl").delegate("A.searchresultsitinerary", "click", function() {
            // now get rel attribute for hyperlink
            var cruisecode = $(this).attr("rel");
            _gaq.push(['_trackEvent', 'SearchResults', 'ViewCruiseItinerary', cruisecode]);
        });

        $("#NewSearchBoxUC_updtePnl").delegate("#searchCont input", "click", function() {
            if ($(this).is(":checked") == true) {
                var value = $(this).attr("id");
                var name = $("label[for='" + value + "']").html();
                name = name.substring(0, name.indexOf("<span>"));
                var group = $(this).parents(".inLowerSecfFltr").attr("class");
                group = group.replace("inLowerSecfFltr ", "");
                group = group.replace("scndA", "Date");
                group = group.replace("inLowerSecfFltr", "Destination");
                // alert(name + ":" + group);
                _gaq.push(['_trackEvent', 'SearchResults', 'FilterSelect', group + ":" + name]);
            }
        });
    }
}

function wireCruiseDetailsPage() {
    // in page tabs
    if ($(".wrapperCruiseItem #pageTabs a").length > 0) {
        $(".wrapperCruiseItem #pageTabs a").click(function() {
        var label = $(this).attr("title");
        _gaq.push(['_trackEvent', 'CruiseDetails', 'Tab', label]);
        });
    }

    // top right book now button
    if ($(".wrapperCruiseItem .cruiseBookNow a").length > 0) {
        $(".wrapperCruiseItem .cruiseBookNow a").click(function() {
            var link = window.location.href;
            _gaq.push(['_trackEvent', 'CruiseDetails', 'BookNow', link]);
        });
    }

    // choose cabin & book from prices box
    if ($(".wrapperCruiseItem .cruiseOverviewLeft a.chooseCabin").length > 0) {
        $(".wrapperCruiseItem .cruiseOverviewLeft a.chooseCabin").click(function() {
            var link = window.location.href;
            _gaq.push(['_trackEvent', 'CruiseDetails', 'ShowPricing - LeftColumn', link]);
        });
    }

    // choose cabin & book from left hand column
    if ($(".wrapperCruiseItem #cruisePricingContent a.chooseCabin").length > 0) {
        $(".wrapperCruiseItem #cruisePricingContent a.chooseCabin").click(function() {
            var link = window.location.href;
            _gaq.push(['_trackEvent', 'CruiseDetails', 'ShowPricing - PricesBox', link]);
        });
    }

    // print page button
    if ($(".wrapperCruiseItem .printSpan a").length > 0) {
        $(".wrapperCruiseItem .printSpan a").click(function() {
            var link = window.location.href;
            _gaq.push(['_trackEvent', 'CruiseDetails', 'PrintPage', link]);
        });
    }

    // add to wishlist button
    if ($(".wrapperCruiseItem a.btnAddWishList").length > 0) {
        $(".wrapperCruiseItem a.btnAddWishList").click(function() {
            var link = window.location.href;
            _gaq.push(['_trackEvent', 'CruiseDetails', 'Wishlist', link]);
        });
    }

    // offer panel on right hand side
    if ($(".wrapperCruiseItem .cruisePageRight .special-offer").length > 0) {
        $(".wrapperCruiseItem .cruisePageRight .special-offer").click(function() {
            var link = window.location.href;
            _gaq.push(['_trackEvent', 'CruiseDetails', 'OfferTerms', link]);
        });
    }

    // cabins metagrade
    if ($(".wrapperCruiseItem .cabinsSelector").length > 0) {
        $(".wrapperCruiseItem .cabinsSelector").click(function() {
            // var link = window.location.href;
            var meta = $(this).attr("id");
            meta = meta.replace("CabinsSelector", "");
            _gaq.push(['_trackEvent', 'CruiseDetails', 'Metagrade', meta]);
        });
    }
    
    // cabins deckplan
    if ($(".wrapperCruiseItem .CabinTypePricingLink a").length > 0) {
        $(".wrapperCruiseItem .CabinTypePricingLink a").click(function() {
            _gaq.push(['_trackEvent', 'CruiseDetails', 'Deckplan', $(this).attr("rel")]);
        });
    }
     
}

var bkg_pos;

function toggleDisplayFooter() {
    $(".closefooter").fadeToggle(0);

    if ($('DIV#footer H2.footerquicklinks SPAN.sIFR-alternate').length == 0) {
        $("#footer-links").slideToggle(0);
        $(".footerquicklinks").click(function() {
            $("#footer-links").slideToggle("fast");
            $(".closefooter").fadeToggle(0, "swing", function() { $(".openfooter").fadeToggle(0); });

        });
    }      
    

    var ship = Math.floor(Math.random() * 7) + 1;
    var shipconfigid = $("#footershipid").text();
    if (shipconfigid.length > 0) {
        if (shipconfigid == "1") { ship = 2; } // Arcadia
        // if (shipconfigid == "2") { ship = 2; }
        if (shipconfigid == "3") { ship = 3; } // Aurora
        if (shipconfigid == "4") { ship = 5; } // Oceana
        if (shipconfigid == "5") { ship = 6; } // Oriana
        if (shipconfigid == "6") { ship = 7; } // Ventura
        if (shipconfigid == "7") { ship = 4; } // Azura
        if (shipconfigid == "8") { ship = 1; } // Adonia
    }
    var shipImage = "";
    if (ship == 1) { shipImage = "/Images/footer_adonia.jpg"; }
    if (ship == 2) { shipImage = "/Images/footer_arcadia.jpg"; }
    if (ship == 3) { shipImage = "/Images/footer_aurora.jpg"; }
    if (ship == 4) { shipImage = "/Images/footer_azura.jpg"; }
    if (ship == 5) { shipImage = "/Images/footer_oceana.jpg"; }
    if (ship == 6) { shipImage = "/Images/footer_oriana.jpg"; }
    if (ship == 7) { shipImage = "/Images/footer_ventura.jpg"; }


    $("#footer").css("background-image", "url(" + shipImage +")");

    /*
    var now = new Date();
    bkg_pos = Math.floor((now.getHours() * 60) + (now.getMinutes()) * 0.875); // current minute * (1260/1440)
    bkg_pos += 315;
    bkg_pos = bkg_pos % 1260;
    
    $("#footer").css("background-position", bkg_pos + "px bottom");
    setInterval(repositionFooterImage, 1000);   */
}


function repositionFooterImage() {
    bkg_pos++;
    // if (bkg_pos > 1260) { bkg_pos = 0; }
    bkg_pos = bkg_pos % 1260;
    $("#footer").css("background-position", bkg_pos + "px bottom");
}

$(document).ready(function() {
    toggleDisplayFooter();
});


/*function airports()
{
 if ($.browser.msie) {
  alert("1");   //ie6
    $(".chkBoxDepartureAirports").css({     
      "margin" : "0px 0px 0px -6px;"      
    });
    $(".chkBoxDepartureAirportsDisabled").css({     
      "margin" : "0px 0px 0px -6px;"      
    });
    $(".chkBoxDepartureAirportsEnabled").css({      
      "margin" : "0px 0px 0px -6px;"      
    });
    
 }
 else if ($.browser.msie && $.browser.version > 6) {alert("2");   //ie7+
    $(".chkBoxDepartureAirports").css({     
      "margin" : "0px 0px 0px -6px;"      
    });
    $(".chkBoxDepartureAirportsDisabled").css({     
      "margin" : "0px 0px 0px -6px;"      
    });
    $(".chkBoxDepartureAirportsEnabled").css({      
      "margin" : "0px 0px 0px -6px;"      
    });
    
    }
    else {alert("3");
    $(".chkBoxDepartureAirports").css({     
      "margin" : "0px 0px 0px 15px;"      
    });
    $(".chkBoxDepartureAirportsDisabled").css({     
      "margin" : "0px 0px 0px 15px;"      
    });
    $(".chkBoxDepartureAirportsEnabled").css({      
      "margin" : "0px 0px 0px 15px;"      
    });
    
  }
  }*/

function isSearchPanelExpanded()
{

   
   var hidden= $("#hdnIsSearchBoxExpanded").val(); 
   
  
if(hidden=="True")
    {
    
    
        searchPanel("expand");
    }
    else
    {
    
    searchPanel();
}

}
  
//conversion Function
function OnChangeValuesDestination(ddnID)     
      { 
              
        var ConversionUnit = $('#'+ddnID).val();
        var divRainfall;
        var divLow;
        var divHigh;
        var divAvg;              
        
         if($("div[id^='divRainfall']"))
        {
            for(var i=0;i<$("div[id^='divRainfall']").length;i++)
            {
                divRainfall=$("div[id^='divRainfall']")[i].innerHTML;                
                
                if(ConversionUnit=="Metric")
                {
                    var ConvItem = divRainfall;                   
                }
                else if(ConversionUnit=="Imperial") 
                {
                    var ConversionFactor=0.0393700787;
                    var ConvItem = parseFloat(divRainfall*ConversionFactor).toFixed(1);                     
                }                
                if(ConversionUnit=="Metric")
                {             
                    $("td[id^='Rainfall']")[i].innerHTML=ConvItem+" mm";
                }
                else if(ConversionUnit=="Imperial") 
                {
                    $("td[id^='Rainfall']")[i].innerHTML=ConvItem+" inches";
                }
            }      
            
        }
        
        //find out divs with ids starting from low high and avg and convert them into the desired unit of measurement
        if($("div[id^='divlow']"))
        {
            for(var i=0;i<$("div[id^='divlow']").length;i++)
            {
                divLow=$("div[id^='divlow']")[i].innerHTML;                
                
                if(ConversionUnit=="Metric")
                {
                    var ConvItem = divLow; 
                }
                else if(ConversionUnit=="Imperial") 
                {
                    var ConversionFactor=(9/5);
                    var ConvItem = parseInt((divLow*ConversionFactor)+32); 
                }                
                               
                $("td[id^='low']")[i].innerHTML=ConvItem;
            }      
            
        }
        if($("div[id^='divhigh']"))
        {
            for(var i=0;i<$("div[id^='divhigh']").length;i++)
            {
                divHigh = $("div[id^='divhigh']")[i].innerHTML;
                          
                if(ConversionUnit=="Metric")
                {                    
                    var ConvItem = divHigh;                    
                }
                else if(ConversionUnit=="Imperial")
                {
                    var ConversionFactor=(9/5);
                    var ConvItem = parseInt((divHigh*ConversionFactor)+32); 
                }              
                $("td[id^='high']")[i].innerHTML=ConvItem;
            }
        }
        if($("div[id^='divavg']"))
        {
            for(var i=0;i<$("div[id^='divavg']").length;i++)
            {
                divAvg = $("div[id^='divavg']")[i].innerHTML;
                
                 if(ConversionUnit=="Metric")
                {                    
                    var ConvItem = divAvg; 
                }
                else if(ConversionUnit=="Imperial")
                {
                    var ConversionFactor=(9/5);
                    var ConvItem = parseInt((divAvg*ConversionFactor)+32); 
                }                
                $("td[id^='avg']")[i].innerHTML=ConvItem;
            }
        }     
        

      }  
//add class to body tag if js is enabled
function checkForJs() {
  if(jQuery) {
      jQuery("BODY").addClass("jq");
  }
}

function printMe() {
  self.print();
}

//top nav mega dropdown functions & config start
function addMega(){
  $(this).addClass("hovering");
  
  if ($(this)[0].id.match('FindCruiseLI') != null && $(this)[0].id.match('FindCruiseLI').index >=0)
  {
  setSameHeightFandB($(this)[0].id);
  }
}

function removeMega(){
  $(this).removeClass("hovering");
} 

var megaConfig = {
  interval: 0,
  sensitivity: 4,
  over: addMega,
  timeout: 0,
  out: removeMega
};

function megaNav() {
  $("#header-links UL LI:last").css({"border-right" : "none"});
  $("LI.mega").hoverIntent(megaConfig);
  $("DIV.submenu").hover(
    function(){
      $(this).parent("LI").addClass("hover");
    },
    function(){
      $(this).parent("LI").removeClass("hover");
    }
  );
  
}
//top nav mega dropdown functions & config end

//image rollover
//swap img src from "imagename-off.gif" to "imagename-on.gif" - works for any image folder path
//usage: apply class="rollover" to anchor link
function rollover() {
  $(".rollover").hover(
    function() {
      this.src = this.src.replace("-off","-on");
    },
    function() {
      this.src = this.src.replace("-on","-off");
    }
  );    
}

//clearSearch onfocus
//removes default text from header search box
//usage: every page
function clearInput(elemId) {
  $("INPUT#" + elemId).focus(function() {
    $(this).val("");
    if (elemId == "FindBookCruisesUC_strPortName") {
    $(".divBinding span").removeClass("chkBoxDestination"); 
    $(".divBinding span").addClass("chkBoxDestinationDisabled");
    $(".hdnIsDestinationsDisabled").val("true");
    $(".hdnDestIds").val("");
    
      //$("#search-panel-4 LABEL").addClass("disabled");
      $("INPUT#" + elemId).blur(function(){
        $("#search-panel-4 LABEL").removeClass("disabled");
        if ($("INPUT#" + elemId).val() == "") {
          $("INPUT#" + elemId).val("Or enter port name...");
        }
      });
    }
  });

}

//bookmarker
function bookmarker() {
  $("A.bookmark").jFav();
}

//stateroom overlay pager
function stateroomPager() {
  $("#stateroom-image").css({ "height" : "auto" });
  $("#stateroom-image DIV").hide();
  $("#stateroom-image DIV:first").show();
  $("#stateroom-image").cycle({ 
      fx: "fade", 
      speed: "fast", 
      timeout: 0, 
      next: "#next", 
      prev: "#prev" 
  });
}

//hide + position search banner if js enabled
function hideSearch() {
//  alert("browser: " + $.browser.msie);
//  alert("version: " + $.browser.version);

  if ($.browser.msie && $.browser.version <= 6) {   //ie6
//    alert("ie6");
    $("#search-banner").css({
      "display" : "inline",
      "margin" : "180px 0px 12px 0px;",
      "position" : "relative",
      "height" : "0px",
      "width" : "0px"
    });
  } else if ($.browser.msie && $.browser.version > 6 && $.browser.version <= 7) {     //ie7+
//    alert("ie7+");
    $("#search-banner").css({
      "display" : "inline",
      "margin" : "0px 0px 12px -80px;",
      "height" : "0px",
      "width" : "0px"
    });
  } else if ($.browser.msie && $.browser.version > 7) {     //ie8
//    alert("ie8 shrink");
    $("#search-banner").css({
      "display" : "inline",
      "margin" : "0px 0px 12px -80px;",
      "height" : "0px",
      "width" : "0px"
    });
  } else {
    $("#search-banner").css({   //non-ie
      "display" : "none",
      "margin" : "180px 0px 0px 875px",
      "position" : "absolute",
      "height" : "0px",
      "width" : "0px"
    });
    }
}

//expand + re-position search banner if js enabled AND on SEARCH page
function expandSearch() {
//alert(flag);
    
  if ($.browser.msie && $.browser.version <= 6) {
      if(flag=="set")
      {//alert("margin");
      $("#search-banner").css({
          "display" : "block",
          //"margin" : "130px 0px 0px -916px",
          "margin" : "-10px 0px 0px -915px",
          "position" : "relative",
          "height" : "322px",
          "width" : "850px"
        });
        /*$("#content").css({
          //"margin-top" : "354px"
          "margin-top" : "-318px"
        });*/
      }
      if(flag=="default"){
      $("#search-banner").css({
          "display" : "block",
          //"margin" : "130px 0px 0px -916px",
          "margin" : "130px 0px 0px -915px",
          "position" : "relative",
          "height" : "322px",
          "width" : "850px"
        });
        $("#content").css({
          //"margin-top" : "354px"
          "margin-top" : "354px"
        });
      }   //ie6
  } else if ($.browser.msie && $.browser.version > 6 && $.browser.version <= 7) {
//      alert("ie7");
      if(flag=="set")
      { //ie7+
      //alert("margin");
        $("#search-banner").css({
          "display" : "block",
          "clear" : "both",
          "float" : "left",
          //"margin" : "130px 0px 0px -915px",
          "margin" : "-10px 0px 0px -915px",
          "position" : "absolute",
          "height" : "322px",
          "width" : "850px"
        });
        /*$("#content").css({
          //"margin-top" : "346px"
          "margin-top" : "-310px"
        });*/
      }
    if(flag=="default"){
    //ie7+
    $("#search-banner").css({
      "display" : "block",
      "clear" : "both",
      "float" : "left",
      "margin" : "130px 0px 0px -915px",
      //"margin" : "-18px 0px 0px -915px",
      "position" : "absolute",
      "height" : "322px",
      "width" : "850px"
    });
    $("#content").css({
      //"margin-top" : "346px"
      //"margin-top" : "-310px"
    });
    }
  } else if ($.browser.msie && $.browser.version > 7) {
//      alert("ie8 expand\nflag: " + flag);
      
      if(flag=="set")
      { //ie7+
      //alert("margin");
        $("#search-banner").css({
          "display" : "block",
          "clear" : "both",
          "float" : "left",
          //"margin" : "130px 0px 0px -915px",
          "margin" : "-10px 0px 0px -915px",
//          "position" : "absolute",
          "height" : "322px",
          "width" : "850px"
        });
        /*$("#content").css({
          //"margin-top" : "346px"
          "margin-top" : "-310px"
        });*/
    }
    if(flag=="default"){
    //ie7+
    $("#search-banner").css({
      "display" : "block",
      "clear" : "both",
      "float" : "left",
      "margin" : "130px 0px 0px -915px",
      //"margin" : "-18px 0px 0px -915px",
//      "position" : "absolute",
      "height" : "322px",
      "width" : "850px"
    });
    $("#content").css({
      //"margin-top" : "346px"
      //"margin-top" : "-310px"
    });
    }
  } else {
  if(flag=="set")
  {
    $("#search-banner").css({   //non-ie
      "display" : "block",
      "clear" : "both",
      "float" : "left",
      //"margin" : "310px 0px 0px 45px",
      "margin" : "170px 0px 0px 45px",
      "position" : "absolute",
      "height" : "322px",
      "width" : "850px"
    });
    /*$("#content").css({
      //"margin-top" : "346px"
      "margin-top" : "-310px"
    });*/
    }
    if(flag=="default")
  {//alert("margin");
    $("#search-banner").css({   //non-ie
      "display" : "block",
      "clear" : "both",
      "float" : "left",
      "margin" : "310px 0px 0px 45px",
      //"margin" : "170px 0px 0px 45px",
      "position" : "absolute",
      "height" : "322px",
      "width" : "850px"
    });
    $("#content").css({
      "margin-top" : "346px"
      //"margin-top" : "-310px"
    });
    }
  } 
  $(".loadingDiv").hide();
  if(virtual=="true")
  { 
    $("#search-banner").hide();
    $("#search-banner").stop();
    }
}

//search panel
function searchPanel(strExpansion) {
//alert($("DIV#search-box").length);
return false;
//alert("hi2");
  //alter link location from page to layer
  $("A#show-search-banner").removeAttr("href"); //removes href to separate search page (non-js graceful failure)
  $("A#show-amend-search").removeAttr("href");  //removes href to separate search page (non-js graceful failure)
  $("A#showsearchbanner").removeAttr("href");
  $("A#showamendsearch").removeAttr("href");
  if (strExpansion != "expand") {//alert("small");
  flag="set";
    hideSearch();
    $("A#show-search-banner, A#show-amend-search,A#showamendsearch, A#showsearchbanner").click(function() {
        /*if(this.id=="show-amend-search")
        {
        $("#hdnISAmendSearch").val("true");
        alert($("#hdnISAmendSearch").val());
        }*/

        $(".blue-bar SELECT").hide();
        if ($.browser.msie && $.browser.version <= 6) {
            $("#search-banner").animate({ width: "850px", height: "322px", marginLeft: "-915px", marginTop: "-10px" }, { queue: false, duration: 1000 }); //ie6
        } else if ($.browser.msie && $.browser.version > 6 && $.browser.version <= 7) {
            $("#search-banner").animate({ width: "850px", height: "322px", marginLeft: "-915px", marginTop: "-10px" }, { queue: false, duration: 1000 }); //ie7
        } else if ($.browser.msie && $.browser.version > 7) {
            $("#search-banner").animate({ width: "850px", height: "322px", marginLeft: "-915px", marginTop: "-10px" }, { queue: false, duration: 1000 }); //ie8
        } else {
            $("#search-banner").animate({ width: "850px", height: "322px", marginLeft: "45px", marginTop: "170px" }, { queue: false, duration: 1000 });   //non-ie
        }
        setTimeout('$("#search-banner DIV").show();', 1200);
        setTimeout('$("#search-panel-8").hide();', 1201);
        setTimeout('$(".loadingDiv").hide();', 1201);
        $("#search-banner").css("padding","5px 10px 7px 10px");
    });
  } else {//alert("big");
  
  expandSearch();
  
    
    $("#search-banner DIV").show();
    $("#search-panel-8").hide();
    //$("A#hide-search-banner").hide();
  }
  //apply padding to odd date LIs in #search-panel-1
  $("#tbl-search-dates TR TD UL LI:even").addClass("odd");
  //onclick - tick hidden checkbox and add "selected" class
  $("#tbl-search-dates TR TD UL LI LABEL").click(function() {
    $(this).toggleClass("selected");
  });
  //launch calendar
    $("#FindBookCruisesUC_specificdate").datepicker({showOn: 'button', buttonImage: '/Images/btn-calendar.gif', buttonImageOnly: true, altField: '#FindBookCruisesUC_specificdate', altFormat: 'dd/mm/yy', changeMonth: true, changeYear: true, showButtonPanel: true});
  $("#ctl13_specificdate").datepicker({showOn: 'button', buttonImage: '/Images/btn-calendar.gif', buttonImageOnly: true, altField: '#ctl13_specificdate', altFormat: 'dd/mm/yy', changeMonth: true, changeYear: true, showButtonPanel: true});    
    
    //var id= <%=hdnDepartureMonths.ClientID %>;
       //debugger;  
    //alert(id);
    //alert('id');
    if($(".test_xyz").val()== "")
    {    
    //alert($.query.get('departureMonths'));  
  $(".ui-datepicker-trigger").click(function() {
      
    $("#ui-datepicker-div").css({"background-color" : "#a1bfe1","cursor":"pointer","visibility":"visible"});
    //capture week from dropdown, close picker, render new html and ddown value 
    /*$(".ui-datepicker-go-btn A").click(function() {
        alert('hi2');
        dateSelected();
      $("#ui-datepicker-div").hide();     
      //var weekSearch = $("#searchweekseitherside").val();
      //var dateSearch = $("#FindBookCruisesUC_specificdate").val();
      //$("#search-panel-1-calendar-a P SPAN").html("Cruises from: <strong>" + dateSearch + "</strong></span><br />Search <strong>" + weekSearch + "</strong> weeks either side");
      
    });*/
  });
  } 
  else{   
  $("#FindBookCruisesUC_specificdate, #ctl13_specificdate").datepicker('disable');  
  }  
      
      
  
  //clear input field
  clearInput("FindBookCruisesUC_strPortName");
  //remove greyed-out options on form reset
  $("A#search-clear-all").click(function(){
    $("#search-banner LABEL").removeClass("disabled");
    $("#search-banner LABEL").removeClass("selected");
  });
  //disable childrens ship on-check
  toggleCheckbox();
  //open departure airports panel
  $("A#show-search-panel-8").click(function(){
    $("#search-panel-8").toggle();
    $("A#show-search-panel-8").toggleClass("arrow-switch")
    return false;
  });
  //close departure airports panel
  $("A#hide-search-panel-8").click(function(){
    $("#search-panel-8").hide();
    $("A#show-search-panel-8").removeClass("arrow-switch")
    return false;
  });
  //close search banner
  $("A#hide-search-banner").click(function() {
      $("#search-banner DIV").hide();
      if ($.browser.msie && $.browser.version <= 6) {
          setTimeout('$("#search-banner").animate({width: "0px", height: "0px", marginLeft: "-80px", marginTop: "0px" },{ queue: false,  duration:1000 });', 50); //ie6
      } else if ($.browser.msie && $.browser.version > 6 && $.browser.version <= 7) {
      setTimeout('$("#search-banner").animate({width: "0px", height: "0px", marginLeft: "-80px", marginTop: "0px" },{ queue: false,  duration:1000 });', 50); //ie7+
      } else if ($.browser.msie && $.browser.version > 7) {
      setTimeout('$("#search-banner").animate({width: "0px", height: "0px", marginLeft: "-80px", marginTop: "0px" },{ queue: false,  duration:1000 });', 50); //ie8
      } else {
      setTimeout('$("#search-banner").animate({width: "0px", height: "0px", marginLeft: "875px", marginTop: "180px" },{ queue: false,  duration:1000 });', 50); //non-ie
      }
      setTimeout('$(".blue-bar SELECT").show();', 750);
      setTimeout('$("#search-banner").css("padding", "0");', 50);
  });
    $(".loadingDiv").hide();
    //$(".loadingAnimDiv").css("display", "none");


  //new date toggle stuff
  $("#tbl-search-dates TR TD UL LI INPUT:disabled + DIV").addClass("disabledDiv");
  $("#tbl-search-dates TR TD UL LI DIV").addClass("dateSpoof");

  //toggle divs
  $("DIV.dateSpoof").click(
      function () {
    if ($(this).parent("LI").children("INPUT[disabled=false]")) {
      if ($(this).hasClass("activeDiv")) {
        $(this).removeClass("activeDiv");
//        alert("class changed off");
        $(this).parent("LI").children("INPUT").click();     
      } else {
        $(this).addClass("activeDiv");
//        alert("class changed on");
        $(this).parent("LI").children("INPUT").click();
      }
    }
      }
/*    ,
      function () {
    if ($(this).parent("LI").children("INPUT[disabled!=disabled]")) {
      $(this).removeClass("activeDiv");
      alert("class changed off");
      $(this).parent("LI").children("INPUT").click();
    }
      }
      
*/
  );
}

//search-banner checkbox toggle for child-free ships
function toggleCheckbox() {
  $("#search-panel-6 INPUT#child-free").click(function() {
    if ($("#search-panel-6 INPUT#child-free").prop("checked") == true) {
      $("INPUT#arcadia").prop("checked", true);
      $("INPUT#artemis").prop("checked", true);
      $("#search-panel-6 UL:first LI LABEL").addClass("disabled");
    } else {
      $("INPUT#arcadia").prop("checked", false);
      $("INPUT#artemis").prop("checked", false);
      $("#search-panel-6 UL:first LI LABEL").removeClass("disabled");
    }
  });
}

//expandAll
function expandAll() {
  $("A#expand-all").click(function() {
    $(".faq .details").css({ "display" : "block" })
    $(".faq .details + .details").css({ "display" : "none" })
    $(".faq .odd").css({ "background" : "url(/Images/bg-faq-odd-on.gif) 21px 0px no-repeat"});
    $(".faq .even").css({ "background" : "url(/Images/bg-faq-even-on.gif) 21px 0px no-repeat"});
  });
}

function collapseAll() {
  $("A#collapse-all").click(function() {
    $(".faq .details").css({ "display" : "none" })
    $(".faq .details + .details").css({ "display" : "block" })
    $(".faq .odd").css({ "background" : "url(/Images/bg-faq-odd-off.gif) 21px 0px no-repeat"});
    $(".faq .even").css({ "background" : "url(/Images/bg-faq-even-off.gif) 21px 0px no-repeat"});
  });
}

//window opener
//param usage: 
//url - url of page to load
//scrl - show scrollbars? yes/no?
//resz - resizable? yes/no?
//wdth - width of window
//hgt - height of window
function openWindow(url, scrl, resz, wdth, hgt) {
var top = (window.screen.height/2)-250;
          var left = (window.screen.width/2)-360; 
  window.open(url,'popup','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=' + scrl + ',resizable=' + resz + ',width=' + wdth + ',height=' + hgt + ',framemargin=0,leftmargin=0,topmargin=0,marginwidth=0,marginheight=0,top='+top+',left='+left);
}

//truncate show/hide layers
function truncateLayers(elem) {
  $("." + elem).truncate({max_length: 210}, elem);
  $("." + elem + " .desc P.heading A.toggle-truncate").click(function() {
    $(this).parent("div").truncate({max_length: 210}, elem);
  });
}

//Promo Fix
//remove background image from first promo in #promo-bar div
function fixPromos() {
  $(".promo:first").css({"background" : "none"});

  $("DIV.promo").hover(
    function() {
      $(this).children("DIV.promo-arrow").children("A").children("IMG").attr({"src" : "images/arrow-promo-on.gif"});
    },
    function() {
      $(this).children("DIV.promo-arrow").children("A").children("IMG").attr({"src" : "images/arrow-promo-off.gif"});
    });
}

//fix video list paddings
function fixVideos() {
  $("UL#videos > LI:odd").css({"margin-right" : "0px"});
}

//Travel Agents Fix
//remove background image from last row travel agents list
function fixAgents() {
  var countLIs = $("UL#travel-agents > LI").size();
  var oddLIs = countLIs / 3;
  oddLIs = oddLIs.toString();
  oddLIs = oddLIs.substr(0,3);
  if (oddLIs.indexOf(".") == -1) {
    oddLIs = parseInt((oddLIs * 3) - 3);
  } else {
    oddLIs = parseInt(oddLIs * 3);
  }
  $("UL#travel-agents > LI:gt(" + (oddLIs - 1)+ ")").css({"background" : "none"});
}

//Banner Fix
//remove background image from last row travel agents list
function fixBanner(byHowMuch) {
  var offset = $("#banner-five .banner-image IMG").attr("height");
  if ((offset == "undefined") && (byHowMuch == "undefined")) {
      offset = 310;
  } else {
      offset = byHowMuch;
  }
  $("#content").css({"position" : "relative" , "margin-top" : "-" + offset + "px"});
  $("#content #left").css({"padding-top" : offset + "px"});
}
/*
function fixBanner(byHowMuch) {

  var offset = $("#banner-five .banner-image IMG").attr("height");
  if ($.browser.msie || $.browser.version > 6)
  {
  }
  else{
    offset=310;
  }
  //if ((offset.valueOf() == "undefined") && (byHowMuch.valueOf() == "undefined")) {
  if ((offset == null) && (byHowMuch == null)) {    
      offset = 310;
  } 
  if ((offset == null) && (byHowMuch != null)) {    
      offset = byHowMuch;
  }
  if ((offset != null) && (byHowMuch == null)) {    
      offset = offset;
  }
*/
  /*else {
      offset = byHowMuch;
  }*/
/*
  $("#content").css({"position" : "relative" , "margin-top" : "-" + offset + "px"});
  $("#content #left").css({"padding-top" : offset + "px"});
}
*/

//Star Fix
//add padding to top (Overall) star-rating
function fixStars() {
  $(".star-scores P:first").css({"padding-bottom" : "0.7em"});
}

//add a bottom border and padding to a final call-to-action LI
function fixCta() {
  $("UL.cta").find("LI:last").addClass("last");
  $("UL.cta LI:last").css({ "padding-bottom" : "8px" });
}

//to colour-code alternate table rows
//parse function the row to color - "odd" or "even"
function fixTables(colorType, tblID) {
  if (colorType != "even") {
    colorType = "odd";
  }
//  $("TABLE" + tblID + " TR[class!='tour'][class!='ignore']:" + colorType).css({"background-color" : "#F2F1F0"});
  $("UL#cruise-prices LI DIV").find("TABLE" + tblID + "").find("TR[class!='tour'][class!='ignore']:" + colorType).css({"background-color" : "#F2F1F0"});  
}

//to be used on inline-bullet lists
function fixBullets(elem) {
  var newHTML = "&nbsp;&bull;";
  $(elem + "> UL").find("LI").not(":last-child").append(newHTML);
}

//HR bars on RHS column
function fixRhsHR() {
  var hrWidth = $("#right div.hr").css("width");
  if (hrWidth == "224px") { //ie6 sizing hack
    hrWidth = 210;
  }
  hrWidth = parseInt(hrWidth) - parseInt(15);
  $("#right div.hr").css({"width" : hrWidth});
}

//fix sitemap - remove bottom border off each last nested LI
function fixSitemap() {
  $("UL#sitemap LI UL").find("LI:last").css({ "border-bottom" : "none" });
}

//add width to cornered buttons
function updateWidth(elem) {
  var widthToUpdate = $(elem).outerWidth();
  widthToUpdate = parseInt(widthToUpdate) - parseInt(20);
  $(elem).css({
    "width" : widthToUpdate
  });
}

//overseas optins
function overseasBookings() {
  $(".rhs-contact").hide();
  $("#overseas-bookings").change(function(){
    var showCountry = $(this).val();
    $(".rhs-contact").hide();
    $(".rhs-ad P").hide();
    if (showCountry == "") {
      $(".rhs-ad P").show();
    } else {
      $("#" + showCountry).fadeIn();
    }
  });
}

//opt-in & opt-out of registration fields
function optIns() {
  $("DIV.opt-out DIV").hide();
  $(".form-check LABEL INPUT.checkbox").click(function() {
    if ($("INPUT#" + this.id).prop("checked")) { // If checked
      $("#opt-out-" + this.id).toggle();    //show the hidden div
    }
  });
}

function myAccountOptIns() {
  $("DIV.opt-out DIV").hide();
  $(".form-check LABEL SPAN.checkbox INPUT").click(function() {
    if ($("INPUT#" + this.id).prop("checked")) { // If checked
      $("#opt-out-" + this.id).toggle();    //show the hidden div
    }
  });
}

//expanded opt-in & opt-out for manage-details page
function expandOptIns() {
  var chkPost = $("INPUT#postcomms").prop("checked");
  var chkPhone = $("INPUT#phonecomms").prop("checked");
  var chkEmail = $("INPUT#emailcomms").prop("checked");
  if (chkPost == true) {
    $("#opt-out-postcomms").fadeIn("slow");
  }
  if (chkPhone == true) {
    $("#opt-out-phonecomms").fadeIn("slow");
  }
  if (chkEmail == true) {
    $("#opt-out-emailcomms").fadeIn("slow");
  }
}

function expandmyAccountOptIns() {
    
    var chkPost = $("INPUT#livLogin_postcomms").prop("checked");
    var chkPhone = $("INPUT#livLogin_phonecomms").prop("checked");
    var chkEmail = $("INPUT#livLogin_emailcomms").prop("checked");
   
    if (chkPost == true) {
        $("#opt-out-livLogin_postcomms").fadeIn("slow");
    }
    if (chkPhone == true) {
        $("#opt-out-livLogin_phonecomms").fadeIn("slow");
    }
    if (chkEmail == true) {
        $("#opt-out-livLogin_emailcomms").fadeIn("slow");
    }
}





//to be used when an overlay is required to scroll vertically
function fixOverlayScroll() {
  $("HTML").css({"overflow-y" : "scroll"});
}

//expanding menu
//used in blue boxes
function accordionList() {
  $("UL.expanding LI").hover(
    function(){
      $("LI P.desc").hide();
      $("LI#" + this.id + " P.desc").show();
    },
    function(){
    }
  );
}

//using a jquery slider as a horizontal scrollbar
function handleSliderChange(e, ui) {
  var maxScroll = $("#deckplan").prop("scrollWidth") - $("#deckplan").width();
  $("#deckplan").animate({ scrollLeft: ui.value * (maxScroll / 100) }, 1000);
}

function handleSliderSlide(e, ui) {
  var maxScroll = $("#deckplan").prop("scrollWidth") - $("#deckplan").width();
  $("#deckplan").attr({scrollLeft: ui.value * (maxScroll / 100) });
}

//deckplan init
function deckplans() {
  //adjust viewing pane
  $("#deckplan").css({ 
    "height" : "295px",
    "overflow" : "hidden"
  });
  //hide + adjust notes position
  $("#notes-to-show").hide();
  $("#notes-to-show").css({ 
    "display" : "none",
    "position" : "absolute"
  });
  //hide deck images + show first
  $("#deckplan-image DIV").hide();
  $("#deckplan-image DIV:first").show();
  //init slider
  $("#deckplan-slider").show();
  $("#deckplan-slider").slider({
    animate: true,
    change: handleSliderChange,
    slide: handleSliderSlide
  });
  //show hide hidden text layer
  deckplanNotes();
  //form submission
  $("SELECT").change(function() {
      this.form.submit();
  });   
}

//deckplan init
function slideshow() {
  //adjust viewing pane
  $("#image").css({ 
    "height" : "310px",
    //"height" : "270px",
    "overflow" : "hidden"
  });
  //hide images + show first
  $("#image DIV").hide();
  $("#image DIV:first").show();
  //init slides
  slides();
}

function slides() {
  $("#image").cycle({ 
      fx: "fade", 
      speed: "fast", 
      timeout: 0, 
      next: "#next",
      prev: "#prev",
      before: onBefore 
  });
}

function onBefore() {
    $('#imageTitle').html($(this).children(":first").attr('alt'));
}; 


//deckplan overlay- show/hide notes
function deckplanNotes() {
  $("A#show-notes").click(function(){
    
    $("#notes-to-show").fadeIn("slow");
    $("#CabinNotesTitle").fadeIn("slow");
    
  })
  $("A#hide-notes").click(function(){

    $("#notes-to-show").fadeOut("slow");
    $("#CabinNotesTitle").fadeOut("slow");
  })
}

jQuery.fn.fadeIn = function(speed, callback) { 
    return this.animate({opacity: 'show'}, speed, function() { 
        if (jQuery.browser.msie)  
            this.style.removeAttribute('filter');  
        if (jQuery.isFunction(callback)) 
            callback();  
    }); 
}; 
 
jQuery.fn.fadeOut = function(speed, callback) { 
    return this.animate({opacity: 'hide'}, speed, function() { 
        if (jQuery.browser.msie)  
            this.style.removeAttribute('filter');  
        if (jQuery.isFunction(callback)) 
            callback();  
    }); 
}; 
 
jQuery.fn.fadeTo = function(speed,to,callback) { 
    return this.animate({opacity: to}, speed, function() { 
        if (to == 1 && jQuery.browser.msie)  
            this.style.removeAttribute('filter');  
        if (jQuery.isFunction(callback)) 
            callback();  
    }); 
}; 

//expand/contract [show more/show less] text panels
function showMore(strPhrase, strPhraseOppo) {


  $("DIV.show-more-text").hide();
  var len=$("A.show-more-new").length;
  if(len>0)
  {
  $("A.show-more-new").toggle(   
  function() {
  
        var animElem = this.id;
        
        $("DIV#text-" + animElem).slideUp();
    $("A#" + animElem).html(strPhrase);
    $("A#" + animElem).attr({"title" : strPhrase});
  },
  function() {
        var animElem = this.id;
        
        $("DIV#text-" + animElem).slideDown();
        $("A#" + animElem).html(strPhraseOppo);
        $("A#" + animElem).attr({"title" : strPhraseOppo});
  });
  }
  $("A.show-more").toggle(
  function() {
        var animElem = this.id;
        //alert("id1 : "+animElem);
        $("#text-" + animElem).slideDown();        
        $("A#" + animElem).html(strPhraseOppo);
        $("A#" + animElem).attr({"title" : strPhraseOppo});
  }, 
  function() {
        var animElem = this.id;
       // alert("id2 : "+animElem);
        $("#text-" + animElem).slideUp();
    $("A#" + animElem).html(strPhrase);
    $("A#" + animElem).attr({"title" : strPhrase});
  }); 
  //$("DIV.show-more-text-new").addClass("show-more-text"); 
    
}



//expand/contract [show more/show less] text panels
function showRhs(strPhrase, strPhraseOppo) {
  $("DIV.show-more-rhs-text").hide();
  $("A.show-more-rhs").toggle(
  function() {
      $("DIV#text-" + this.id).slideDown();
      $("A#" + this.id).html(strPhraseOppo);
      $("A#" + this.id).attr({ "title": strPhraseOppo });
      setToolTip();
  },
  function() {
      $("DIV#text-" + this.id).slideUp();
      $("A#" + this.id).html(strPhrase);
      $("A#" + this.id).attr({ "title": strPhrase });
  }); 
}

//expand/contract [show more/show less] table rows
function showRow(strPhrase, strPhraseOppo) {
  $("TR.tour").hide();
  $("A.show-row").toggle(
  function() {
      $("TR#text-" + this.id).show();
    $("A#" + this.id).html(strPhraseOppo);
    $("A#" + this.id).attr({"title" : strPhraseOppo});
  }, 
  function() {
      $("TR#text-" + this.id).hide();
    $("A#" + this.id).html(strPhrase);
    $("A#" + this.id).attr({"title" : strPhrase});
  });
}

//expand/contract rhs shore-excursions in Experience section
function showExcursions() {
  if ($("A#show-shore-excursions").parent("LI.active").children("UL#shore-excursions").css({"display" : "block"}));   //if shore excursions sub-nav is active, show sub-sub-nav
  if ($("A#show-shore-excursions").parent("LI.active").css({"background" : "url(/Images/bg-rhs-nav.jpg) top left repeat-x"}));    //if shore excursions sub-sub-nav is active, add gradient bg
  if ($("A#show-shore-excursions").parent("LI.active").children("A").css({"background" : "url(/Images/bg-rhs-nav-shore-on.gif) left no-repeat"}));    //if shore excursions sub-sub-nav is active, add minus sign
  $("UL#shore-excursions").hide();
  $("A#show-shore-excursions").css({"background" : "url(/Images/bg-rhs-nav-shore-off.gif) left no-repeat"});
  $("A#show-shore-excursions").toggle(function() {
    $("UL#shore-excursions").slideDown("slow");
    $("A#" + this.id).css({ "background" : "url(/Images/bg-rhs-nav-shore-on.gif) left no-repeat"});
  }, function() {
    $("A#" + this.id).css({ "background" : "url(/Images/bg-rhs-nav-shore-off.gif) left no-repeat"});
    $("UL#shore-excursions").slideUp("slow");
});

    if ($("A#show-shore-excursion-pages").parent("LI.active").children("UL#shore-excursion-pages").css({ "display": "block" }));  //if shore excursions sub-nav is active, show sub-sub-nav
    if ($("A#show-shore-excursion-pages").parent("LI.active").css({ "background": "url(/Images/bg-rhs-nav.jpg) top left repeat-x" }));  //if shore excursions sub-sub-nav is active, add gradient bg
    if ($("A#show-shore-excursion-pages").parent("LI.active").children("A").css({ "background": "url(/Images/bg-rhs-nav-shore-on.gif) left no-repeat" }));  //if shore excursions sub-sub-nav is active, add minus sign
    $("UL#shore-excursion-pages").hide();
    $("A#show-shore-excursion-pages").css({ "background": "url(/Images/bg-rhs-nav-shore-off.gif) left no-repeat" });
    $("A#show-shore-excursion-pages").toggle(function() {
        $("UL#shore-excursion-pages").slideDown("slow");
        $("A#" + this.id).css({ "background": "url(/Images/bg-rhs-nav-shore-on.gif) left no-repeat" });
    }, function() {
        $("A#" + this.id).css({ "background": "url(/Images/bg-rhs-nav-shore-off.gif) left no-repeat" });
        $("UL#shore-excursion-pages").slideUp("slow");
    });


}


function showExcursionPages() {

    $('#slideshow').cycle({
        fx: 'fade',
        speed: 3000,
        timeout: 6000,
        pager: '.slidenavbottomImages',
        pagerAnchorBuilder: function(idx, slide) {
            //if (idx == 6) {
            //    return '<a href="#" class="last">' + slide.title + '</a>';
            //}
            //return '<a href="#">' + slide.title + '</a>';
            return '<a href="#"><img class="rollover" src="' + pics[idx] + '" /></a>';
        },
        slideExpr: '.slide'
    });

    $('.statsContainer').jTruncate({
        moreText: "open",
        lessText: "close x",
        moreAni: "fast",
        lessAni: "fast"
    });
    $('div.notes').css("display", "block");
    $('DIV.experience-pics').css("display", "block");
}




//eg: elemWidth("#banner-title H1");
function elemWidth(elem) {
  // alert($(elem).outerWidth());
}

//banner anim function
function getQuerystringParams() {
  //get querystring values
  var ShipName, DeckName, ConfigName
  ShipName = $.query.get("ShipName");
  DeckName = $.query.get("DeckName");
  ConfigName = $.query.get("ConfigName");
  $("INPUT#ShipName").val(ShipName);  //populate hidden input with ShipName
  if ($("SELECT#DeckName OPTION").val() == DeckName) {
    $("SELECT#DeckName OPTION").attr({"selected":"selected"})
  } 
}

//banner anim function
function getVideoTitle() {
  var strTitle
  strTitle = $.query.get("heading");
  $("H1").html(strTitle);
}

//video player
//usage: any banner section containing video
//function params:
//        layerID = id of element to use as video player (usually an anchor tag <a>)
//        progressColor = progress bar (of 'played' video) color 
//        bufferColor = progress bar background/buffer color
//        buttonColor = player button color
//        buttonOverColor = player button hover color
//examples:
//        flowPlayer("video", "02A9BE", "81D4DF", "0059A2", "81D4DF");
function flowPlayer(layerID, progressColor, bufferColor, buttonColor, buttonOverColor) {
  flowplayer(layerID, "/flowplayer/flowplayer-3.2.7.swf", { 
      key: getFlowplayerKey(),
      plugins: { 
       controls: { 
            // location of the plugin 
            url: "flowplayer.controls-air-3.2.5.swf", 
            // display properties such as size, location and opacity 
        width: 512,   
        //width: 640,       
        height: 32,
            left: 0, 
            top: 256,  
            opacity: 0.7,  
            // controlbar colors
            backgroundGradient: 'none', 
        autoHide: "always",
            timeColor: "#FFFFFF", 
//        durationColor: "#ffffff",
//        bufferGradient: "none",
//        sliderColor: "#000000",
//        sliderGradient: "none",
//        volumeSliderColor: "#000000",
//        volumeSliderGradient: "none",
//        progressGradient: "none",
//        timeBgColor: "#555555",
//        //branded content
        //    background: "url(/Images/flowplayer-gradient.gif) top left repeat-x",
//        progressColor: "#" + progressColor +"",
//        bufferColor: "#" + bufferColor +"",
//        buttonColor: "#" + buttonColor +"",
//        buttonOverColor: "#" + buttonOverColor +"",
        //buttons
            all: false, 
            play: true, 
        stop: false,
        time: true,
            scrubber: true, 
            // tooltips
            tooltips: { 
                buttons: true
            } 
        } 
      }
  }).ipad();
  setTimeout('$("#banner-video-loading").hide();', 1600);
  setTimeout('$("#load-video").show();', 1600);
}



//video player
//usage: any banner section containing video
//function params:
//        layerID = id of element to use as video player (usually an anchor tag <a>)
//        progressColor = progress bar (of 'played' video) color 
//        bufferColor = progress bar background/buffer color
//        buttonColor = player button color
//        buttonOverColor = player button hover color
//examples:
//        flowPlayer("video", "02A9BE", "81D4DF", "0059A2", "81D4DF");
function flowPlayerStandardDef(layerID, progressColor, bufferColor, buttonColor, buttonOverColor) {
    flowplayer(layerID, "/flowplayer/flowplayer-3.2.7.swf", {
      key: getFlowplayerKey(),
        plugins: {
            controls: {
                // location of the plugin 
                url: "flowplayer.controls-air-3.2.5.swf",
                // display properties such as size, location and opacity 
                width: 400,
                //width: 360,
                height: 32,
                left: 0,
                top: 268,
                opacity: 0.7,
                // controlbar colors
                backgroundGradient: 'none',
                autoHide: "always",
                timeColor: "#FFFFFF",
//                durationColor: "#ffffff",
//                bufferGradient: "none",
//                sliderColor: "#000000",
//                sliderGradient: "none",
//                volumeSliderColor: "#000000",
//                volumeSliderGradient: "none",
//                progressGradient: "none",
//                timeBgColor: "#555555",
//                //branded content
                // background: "url(/Images/flowplayer-gradient.gif) top left repeat-x",
//                progressColor: "#" + progressColor + "",
//                bufferColor: "#" + bufferColor + "",
//                buttonColor: "#" + buttonColor + "",
//                buttonOverColor: "#" + buttonOverColor + "",
//                //buttons
                all: false,
                play: true,
                stop: false,
                time: true,
                scrubber: true,
                // tooltips
                tooltips: {
                    buttons: true
                }
            }
        }
    }).ipad();
    setTimeout('$("#banner-video-loading").hide();', 1600);
    setTimeout('$("#load-video-standardDef").show();', 1600);
}

var videoplayer;
function flowPlayerCruiseLanding(layerID, progressColor, bufferColor, buttonColor, buttonOverColor) {
    videoplayer = flowplayer(layerID, {src: "/flowplayer/flowplayer-3.2.7.swf", wmode: 'transparent'},{
      key: getFlowplayerKey(),
        plugins: {
            controls: {
                // location of the plugin
                url: "flowplayer.controls-air-3.2.5.swf",
                // display properties such as size, location and opacity 
                width: 660,
                opacity: 0.7,
                // controlbar colors
                backgroundGradient: 'none',
                autoHide: "always",
                timeColor: "#FFFFFF",
                /*
                durationColor: "#ffffff",
                bufferGradient: "none",
                sliderColor: "#000000",
                sliderGradient: "none",
                volumeSliderColor: "#000000",
                volumeSliderGradient: "none",
                progressGradient: "none",
                timeBgColor: "#555555", */
                
                //branded content
                // background: "url(/Images/flowplayer-gradient.gif) top left repeat-x",
                /*
                progressColor: "#" + progressColor + "",
                bufferColor: "#" + bufferColor + "",
                buttonColor: "#" + buttonColor + "",
                buttonOverColor: "#" + buttonOverColor + "",
                */
                //buttons
                all: true,
                play: true,
                stop: false,
                time: true,
                scrubber: true,
                // tooltips
                tooltips: {
                    buttons: true
                }
            }
        }
    }).ipad();
    
    setTimeout('$("#banner-load-video").show();', 1600);
}


function flowPlayerVideoImageControl(layerID, progressColor, bufferColor, buttonColor, buttonOverColor, Videoheight, VideoWidth) {
    videoplayer = flowplayer(layerID, { src: "/flowplayer/flowplayer-3.2.7.swf", wmode: 'transparent', height:Videoheight, width:VideoWidth }, {
        key: getFlowplayerKey(),
        plugins: {
            controls: {
                // location of the plugin
                url: "flowplayer.controls-air-3.2.5.swf",
                // display properties such as size, location and opacity
                width: VideoWidth,
                opacity: 0.7,
                // controlbar colors
                backgroundGradient: 'none',
                autoHide: "always",
                timeColor: "#FFFFFF",
                /*
                durationColor: "#ffffff",
                bufferGradient: "none",
                sliderColor: "#000000",
                sliderGradient: "none",
                volumeSliderColor: "#000000",
                volumeSliderGradient: "none",
                progressGradient: "none",
                timeBgColor: "#555555", */

                //branded content
                // background: "url(/Images/flowplayer-gradient.gif) top left repeat-x",
                /*
                progressColor: "#" + progressColor + "",
                bufferColor: "#" + bufferColor + "",
                buttonColor: "#" + buttonColor + "",
                buttonOverColor: "#" + buttonOverColor + "",
                */
                //buttons
                all: true,
                play: true,
                stop: false,
                time: true,
                scrubber: true,
                // tooltips
                tooltips: {
                    buttons: true
                }
            }
        }
    }).ipad();

    setTimeout('$("#banner-load-video").show();', 1600);
}


//init of default functions to be run on EVERY page:
$(document).ready(function() {

    //var str = "hello world";
    //document.write(str.substr(1,5));

});
//added after merging js files
function myAccountOptIns() {
  $("DIV.opt-out DIV").hide();
  $(".form-check LABEL SPAN.checkbox INPUT").click(function() {
      if ($("INPUT#" + this.id).prop("checked")) { // If checked
          $("#opt-out-" + this.id).toggle();  //show the hidden div
      }
  });
}

function unGreyInputs() {
    $(".greyOut").focus(function() {
        $(this).css('background-color', '#fff');
    });
}

function brochureSetCruise() {
    $(".cruiseBefore").change(function() {
        if ($(".cruiseBefore").val() == "No") {
            $(".cruiseWithUs").val("No");
        }
    });
}

function IsAmendSearch(val) 
{
    /*if(val=="1")
    {
        alert("1");
       
        
        $.ajax({
        url:'/UserControl/FindBookCruisesSearchBox.ascx',
        dataType:'aspx',
        success:function(data)
        {
             $('#search-banner').html(data);
        }
        });
        $("#search-banner").load("/UserControl/Breadcrumb.ascx");
    }
    else
    {
        alert("0");
        $.ajax({
        url:'/ajax.svc/renderuc?path=/UserControl/FindBookCruisesSearchBox.ascx',
        dataType:'html',
        success:function(data)
        {
            $('#search-banner').append(data);
        }
        });
    }*/

    if(val=="1")
    {    
    $('div#search-banner #divBegin').css("position","relative");
    $('div#search-banner #divBegin').css("left","500px");
    $('div#search-banner #divBegin').css("top","-330px");
    $('div#search-banner #divBegin').css("visibility","hidden");    
    $('div#search-banner #divAmend').css("visibility","visible");    
    
  }
  else{ 
  $('div#search-banner #divBegin').css("position","relative");
    $('div#search-banner #divBegin').css("top","-330px"); 
  $('div#search-banner #divAmend').css("visibility","hidden");
  $('div#search-banner #divBegin').css("left","0px");
  $('div#search-banner #divBegin').css("visibility","visible");   
  $('.loadingDiv').css("margin-top","275px");   
  }
}

function nextCSS() {  

  var imgWidth = $(".imgClass img").width();
  imgWidth=imgWidth+"px";
  $("#image").css({"width" : imgWidth});  
  var temp1=imgWidth.replace("px","");
  var temp2=parseInt(temp1)+45;
  var temp3=parseInt(temp1);
  temp1=temp2+"px"; 
   if ($.browser.msie && $.browser.version > 6)
   {
   temp1=temp3+"px";  
  $("#next-link").css({"margin-left" : temp1});

   }
   else{
  $("#next-link").css({"margin-left" : temp1});
  }
      
    }
        
   
     function setOffset()
     {     
     /*var hgt=$('.item').height();
     var screenHgt=$('#left').height();
     var total=screenHgt-hgt;*/
     var len=$('.show-more-text-new').length;     
     if(len > 0)
     {
     var total=$('.show-more-text-new').position().top;
     //var total = $('.show-more-text-new').offsetTop;
     total=total+105;     
     //var offset = $('.show-more-text-new').offset(); 
     //alert(offset);
     window.scroll(0,(total));
     }
     }
     
     
function webcamInfo() {
  $("UL.cta").find("LI:first").css({"height" : "30px"});
}

function getFeaturedCruises(pageQuery) {
    $('#featuredCruises').load('/ajaxFeaturedCruises.aspx?' + pageQuery + ' #target', function() {
        $(document).click(function(e) {
            e = e || window.event;
            var el = e.target || e.scrElement || null;
            if (el && el.parentNode && !el.className || !/thickbox/.test(el.className))
                el = el.parentNode;
            if (!el || !el.className || !/thickbox/.test(el.className))
                return;
            var t = el.title || el.name || null;
            var a = el.href || el.alt;
            var g = el.rel || false;
            tb_show(t, a, g);
            el.blur();
            return false;
        });
    });
}

function getWishList() {
    if (CookieController.CK1IsOptIn()) {
        $('#wishList').load('/ajaxWishList.aspx #target');
    }
}

function getViewedCruises() {
    if (CookieController.CK1IsOptIn()) {    
        $('#viewedCruises').load('/ajaxViewedCruises.aspx #target');
    }
}

$(document).ready(function() {
    getFooterCruises();
});

function getFooterCruises() {
    if (CookieController.CK1IsOptIn()) {
        var cookie;
        cookie = getCookie("pocruises");
        if ((typeof(cookie) != typeof(null)) && (cookie.length > 0)){
            $('#savedplaceholder').load('/ajaxWishList.aspx?footer=yes #target-footer', function(response, status, xhr) {
                if (status != "error") {

                    // remove the last border from the list of cruises by adding .last
                    // $('#savedplaceholder .footercruises-cruise:last').addClass('last');

                    var keepbutton = $('#savedplaceholder #target-footer a.keepsaved').detach();
                    keepbutton.prependTo('#savedplaceholder #target-footer');
                    // move the h2 header out of the .footercruises-ad container so that we only have cruises there
                    var h2 = $('#savedplaceholder #target-footer .footercruises-ad h2').detach();
                    h2.prependTo('#savedplaceholder #target-footer');

                    // wrap the cruises into groups of 4
                    var items = $(".footercruises-ad div.footercruises-cruise");
                    var numperslide = 4;

                    if (items.length > 0) {
                        $("#savedcruises").css("display", "block");
                        if (items.length > numperslide) {
                            for (var ti = 0; ti < items.length; ti += numperslide) {
                                items.slice(ti, ti + numperslide).wrapAll("<div class='slide'></div>");
                                $('#savedplaceholder .slide .footercruises-cruise:last').addClass('last');
                            }


                            // fire up the cycle pluging
                            $(".footercruises-ad").cycle({
                                next: '#savednext',
                                prev: '#savedprev',
                                timeout: 0,
                                fx: 'scrollHorz'
                            });
                            $("#savednext, #savedprev").show(0);
                            $("#savedplaceholder").css("margin-left", "0px");
                        }
                        else {
                            $("#savednext, #savedprev").hide(0);
                            $("#savedplaceholder").css("margin-left", "10px");
                            //$("#target-footer h2").css("margin-left", "-23px");
                            $(".footercruises-ad").css("width", "847px");
                        }
                    }
                    else {
                        $('#savedcruises').css("display", "none");
                    }


                }
                else {
                    $('#savedcruises').css("display", "none");
                }

            });
        }
        else {
            $('#savedplaceholder').load('/ajaxViewedCruises.aspx?footer=yes #target-footer', function(response, status, xhr) {
                if (status != "error") {

                    // remove the last border from the list of cruises by adding .last
                    // $('#savedplaceholder .footercruises-cruise:last').addClass('last');

                    // move the h2 header out of the .footercruises-ad container so that we only have cruises there
                    var h2 = $('#savedplaceholder #target-footer .footercruises-ad h2').detach();
                    h2.prependTo('#savedplaceholder #target-footer');


                    // wrap the cruises into groups of 4
                    var items = $(".footercruises-ad div");
                    var numperslide = 4;

                    if (items.length > 0) {
                        $("#savedcruises").css("display", "block");
                        if (items.length > numperslide) {
                            for (var ti = 0; ti < items.length; ti += numperslide) {
                                items.slice(ti, ti + numperslide).wrapAll("<div class='slide'></div>");
                                $('#savedplaceholder .slide .footercruises-cruise:last').addClass('last');
                            }


                            // fire up the cycle pluging
                            $(".footercruises-ad").cycle({
                                next: '#savednext',
                                prev: '#savedprev',
                                timeout: 0,
                                fx: 'scrollHorz'
                            });
                        }
                        else {
                            $("#savednext, #savedprev").hide(0);
                            $("#savedplaceholder").css("margin-left", "10px");
                            //$("#target-footer h2").css("margin-left", "-23px");
                        }
                    }
                    else {
                        $('#savedcruises').css("display", "none");
                    }


                }
                else {
                    $('#savedcruises').css("display", "none");
                }
            });
        }
    }
}

function getFooterFeaturedCruises(query) {
    if (CookieController.CK1IsOptIn()) {
        $('#footerplaceholder').load('/ajaxFeaturedCruises.aspx?' + query + '&footer=yes #lateoffersMinifooter', function(response, status, xhr) {
        if (status != "error") {

                // remove the last border from the list of cruises by adding .last
                // $('#footerplaceholder .footercruises-cruise:last').addClass('last');
                // $('#lateoffersMinifooter .lateitemmini:last').addClass('last');

                // move the h2 header out of the .footercruises-ad container so that we only have cruises there
                //                var h2 = $('#savedplaceholder #target-footer .footercruises-ad h2').detach();
                //                h2.prependTo('#savedplaceholder #target-footer');

                // wrap the cruises into groups of 4
                var items = $("#lateoffersMinifooter .lateitemmini");
                var numperslide = 4;

                if (items.length > 0) {
                    $("#footerfeaturedcruises").css("display", "block");
                    if (items.length > numperslide) {
                        for (var ti = 0; ti < items.length; ti += numperslide) {
                            items.slice(ti, ti + numperslide).wrapAll("<div class='slide'></div>");
                            $('#lateoffersMinifooter .slide .lateitemmini:last').addClass('last');

                        }

                        // $('#lateoffersMinifooter .slide .lateitemmini:last').addClass('last');
                        // fire up the cycle pluging
                        $("#lateoffersMinifooter").cycle({
                            next: '#footernext',
                            prev: '#footerprev',
                            timeout: 0,
                            fx: 'scrollHorz'
                        });
                    }
                    else {
                        $("#footerprev, #footernext").hide(0);
                    }
                }
                else {
                    $("#footerfeaturedcruises").css("display", "none");
                }
            }
            else {
                $("#footerfeaturedcruises").css("display", "none");
            }
        });
        
    }
}

function chkUnchkAllParks(allAirportID)
{
        var strAllAirportID=allAirportID;
       
//     var status=$("ul.ulDepartureAirports span input[name='All_airports']").attr('checked');
        var status=$("ul.ulDepartureAirports span input#"+strAllAirportID).prop('checked');
       
        if(status==true)
        {        
            $("ul.ulDepartureAirports span.chkBoxDepartureAirportsCruise input").prop('checked',true);
             
        }
        if(status==false)
        {
            $("ul.ulDepartureAirports span.chkBoxDepartureAirportsCruise input").prop('checked',false);
            $(".hdnCaribbeanFlyCruises").val("");   
            $(".hdnAirport").val(""); 
            $(".hdnAllAirports").val("");           
        }
}

function unchkAllAirports(airportID)
{
        var strAirportID=airportID;
       
//     var status=$("ul.ulDepartureAirports span input[name='All_airports']").attr('checked');
        var status=$("ul.ulDepartureAirports span input#"+strAirportID).prop('checked');
        
        var allAirportStatus= $("ul.ulDepartureAirports span.chkBoxDepartureAirportsCruise input#FindBookCruisesUC_All_airports").prop('checked');
       
        if(status==false && allAirportStatus==true)
        {     
        
            $("ul.ulDepartureAirports span.chkBoxDepartureAirportsCruise input#FindBookCruisesUC_All_airports").prop('checked',false);
             
        }        
}

/*function chkUnchkAllChildFreeShips(childFreeShipsID)
{
        var strchildFreeShipsID=childFreeShipsID;
       
//     var status=$("ul.ulDepartureAirports span input[name='All_airports']").attr('checked');
        var status=$(".divShipChildFree .chkBoxShipChildFree input").attr('checked');
       
        if(status==true)
        {        
            $(".divShipChildFree span.chkBoxShipChildFreePad input").attr('checked',true);                          
        }
        if(status==false)
        {
            $(".divShipChildFree span.chkBoxShipChildFreePad input").attr('checked',false);           
            $(".hdnIsChildFree").val("");           
        }
}*/

  function AlignReplace()
  {
  //alert('hi');  

  /*alert("new");
  //debugger;
    var td=$("#cse-search-results iframe").contents();*/

  //alert(td);


  
  // table tbody tr td
  }
  
  
  function CloseSearchBox()
  { 
  //alert("virtual");
      //virtual="true";
      //$("#search-banner DIV").hide();
  } 
  /*function showFlash()
    {
    var temp= $(".hdnPhotoReference").val();
    temp="shipxml=/OverlayHandlers/pano.ashx?qs="+temp;
    var len=$("#panoviewer").length;
    //alert(len);
    alert(temp);
    var flashvars = {
      shipxml: temp,
      autostart: 'true'
    };
    var params = {
      allowfullscreen:    'true',
      allowscriptaccess:  'always',
      quality : 'high',
      bgcolor:  '#ffffff',
      wmode:'transparent'
 
    };
    var attributes = {
      id: 'pano',
      name: 'pano'
    };

   swfobject.embedSWF('flash/pano.swf', 'panoviewer', '660', '300', '9', 'false', flashvars, params, attributes);
}*/

/*$(document).ready(function(){
fancyBoxInit();
});
function fancyBoxInit() {

  $('A.thickbox').each(function(){ 

         if($(this).attr('href').match(/width=[0-9]+/i) != null)
            var dWidth  = parseInt($(this).attr('href').match(/width=[0-9]+/i)[0].replace('width=','')); 
          if($(this).attr('href').match(/height=[0-9]+/i) != null)
            var dHeight     =  parseInt($(this).attr('href').match(/height=[0-9]+/i)[0].replace('height=',''));   
  $(this).fancybox({   
      'width':dWidth,   
      'height':dHeight,   
      'autoScale'         : false,   
      'transitionIn'      : 'elastic',   
      'transitionOut'     : 'elastic',   
      'type'          : 'iframe'  
  });  
   });
   } */
  $(document).ready(function() {
    //  MenuHgt();
      AdjustHeightYSResults();
      setToolTip();
  });



/*$(window).load(function() {
  MenuHgt();
});*/

  function checkAirport(dropDownId) {
      var control = $get(dropDownId);
      var selectedvalue = control.options[control.selectedIndex].value;
      if (selectedvalue == "default") {
          alert("Please select the airport");
          return false;
      }
      else {
          //$(".testID").click(tb_remove);          
          //self.parent.tb_remove();
          return true;
      }

  }

  function checkWSCruiseType(radioId) {
      var selectedvalue = $('#' + radioId + ' input:radio:checked').val();
      if(typeof selectedvalue == "undefined")
      {
          alert("Please select the cruise type.");
          return false;
      }
      else 
      {
          //$(".testID").click(tb_remove);          
          //self.parent.tb_remove();
          return true;
      }

  } 
  
 function openNewWin(url) {            
            /*var top = (window.screen.height/2)-250;
          var left = (window.screen.width/2)-360;         
          var sFeatures = "location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no,titlebar=no,height=500,width=660,top="+top+",left="+left;        */
           
            //self.parent.tb_remove();
            parent.location=url;
            //var x = window.open(url, 'mynewwin',sFeatures);            
            //x.focus();
               
        } 
           
function ValidateChecked(oSrc, args){
    if(document.forms[0].CheckBox1.checked == false)
    {
        alert("Has to be checked.");
        args.IsValid = false;
    }
} 

  function validateTelephone(sender, args)
    {
       var match = /^[0-9]+$/.test(args.Value);
       if (match)
       {
            args.IsValid=true;
       }
       else
       {
            args.IsValid=false;
       }
       return;
    }

    function validateEmail(sender, args)
    {
       var match = /[@]{1}/.test(args.Value);
       if (match)
       {
            args.IsValid=true;
       }
       else
       {
            args.IsValid=false;
       }
       return;
   }

   function compareEmails(sender, args) {
       //ok if both values match including blanks
       if (document.forms['frmPage'].livLogin_confirmemailaddress.value == document.forms['frmPage'].livLogin_newemailaddress.value) {
           if (document.forms['frmPage'].livLogin_confirmemailaddress.value != "") {
               //ok if email
               var match = /[@]{1}/.test(document.forms['frmPage'].livLogin_confirmemailaddress.value);
               if (match) {
                   args.IsValid = true;
               }
               else {
                   args.IsValid = false;
               }
           }
           else {
               args.IsValid = true;
           }
       }
       else {
           args.IsValid = false;
       }
       return;
   }

  function validatePortunusNumber(sender, args)
    {

       args.IsValid=false;
       
       return;
    }
      
  function validateDOB(sender, args)
    {

       args.IsValid=false;
       
       return;
    }      
    

  function poptastic(url){
  var options = 'scrollbars=yes,resizable=yes,status=yes,toolbar=yes,menubar=yes,location=yes'; 
   if ($.browser.msie) {   
  options += ',width=' + (screen.availWidth-10).toString() + ',height=' + (screen.availHeight-110).toString();
  }
  else{
  options += ',width=' + (screen.availWidth-5).toString() + ',height=' + (screen.availHeight).toString();
  }    
  options += ',screenX=0,screenY=0,top=0,left=0';    
  var win = window.open(url, 'name', options);    
  if (window.focus) {win.focus();
  //win.moveTo(0, 0);
  }}
  //var strwidth=(screen.availWidth).toString();
  //var strheight=  (screen.availHeight).toString();
  //newwindow=window.open(url,'name','location=no,menubar=yes,resizable=yes,scrollbars=yes,status=no,width='+strwidth+',height='+strheight+'top=0,left=0,toolbar=yes,titlebar=yes');  
  //if (window.focus) {newwindow.focus()}}
  
    function loadRegionImage(ddnID)
     {              
        var RegionImage=$('div#Image'+ddnID)[0].innerHTML;
        var RegionName=$('div#Name'+ddnID)[0].innerHTML;
        $('#DefaultImage')[0].innerHTML=RegionImage; 
     }
  
  function MenuHgt()
  {
  //alert(menuHgtFlag);
  if(menuHgtFlag == "new")
  {
  //alert("hi");
  var len=$("#sub-nav-item-2").length;
  if(len>0)
  {
        $("#sub-nav-item-2").addClass("hoverBlock");
        var hrWidth = $("#navitem2Bin").css("width");
            //alert("alert width "+hrWidth);
        //added by PhilW - fix for overlays loading this js file (they have no mainmenu to determine width)
        if (hrWidth == undefined) 
        {
            hrWidth = "1px";
        }
        if ($.browser.msie) 
        {
            var mul=0;
            var len=$("UL#divFindBook1").length;
            if(len>0)
            {
                mul=mul+1;
            }
            len=$("UL#divFindBook2").length;
            if(len>0)
            {
                mul=mul+1;
            }
            len=$("UL#divFindBook3").length;
            if(len>0)
            {
                mul=mul+1;
            }
            len=$("UL#divFindBook4").length;
            if(len>0)
            {
                mul=mul+1;
            }
            //alert("alert mul "+mul);
            var temp=hrWidth.replace("px","");
            hrWidth=parseInt(temp)*mul;
            hrWidth=hrWidth+"px";
        }
        //alert("alert width aftr mul " + hrWidth);
        $("#sub-nav-item-2").removeClass("hoverBlock");
        $("#sub-nav-item-2").addClass("hoverNone");
   
   
        $("#navitem2Bin").css({ "width" : hrWidth });
        $("#sub-nav-item-2").css({ "width" : hrWidth });
        $(".borderFindBook").css({ "width" : hrWidth });
    }
    menuHgtFlag="old";
   }
  } 
  
  /*function Done() {
var ParmA = document.getElementById('<%=txtDestinationId.ClientID%>').value;
var ParmB = document.getElementById('<%=txtShoreExcursions.ClientID%>').value;
var MyArgs = new Array(ParmA, ParmB);
window.returnValue = MyArgs;
window.close();
}
function doInit() {
var ParmA = "Aparm";
var ParmB = "Bparm";

var MyArgs = new Array(ParmA, ParmB);
MyArgs = window.dialogArguments;
document.getElementById('<%=txtDestinationId.ClientID%>').value = MyArgs[0].toString();
document.getElementById('<%=txtShoreExcursions.ClientID%>').value = MyArgs[1].toString();
}*/

 function loadPortExcursions(ddnID)
 { 
   //debugger;
   var selPortID = $('#'+ddnID).val();
   var divSelPortId = "div"+selPortID;
   var childPortDivs = $("#divPortContainer").children();
   for(var i =0;i<childPortDivs.length;i++)
   {
      var childPortDiv = childPortDivs[i];
      //alert(childPortDiv.id);
      if(childPortDiv.id == divSelPortId)
        {
//            $('#'+childPortDiv.id).css("display","block");
//            $('#'+childPortDiv.id).css("visibility","visible");
              document.getElementById(childPortDiv.id).style.visibility = "visible";
              document.getElementById(childPortDiv.id).style.display = "block";
        }
        else
        {
//            $('#'+childPortDiv.id).css("visibility","hidden");
//            $('#'+childPortDiv.id).css("display","none");
              document.getElementById(childPortDiv.id).style.visibility = "hidden";
              document.getElementById(childPortDiv.id).style.display = "none";
        }  
   }
   if(document.getElementById('hdn'+selPortID+'ExcursionPresent').value == "true")
   {
   
        document.getElementById('divExcurNote').style.visibility = "visible";
        document.getElementById('divExcurNote').style.display = "block";
        document.getElementById('divExcurNoteBottom').style.visibility = "visible";
        document.getElementById('divExcurNoteBottom').style.display = "block";
        document.getElementById('divNoExcursions').style.visibility = "hidden";
        document.getElementById('divNoExcursions').style.display = "none";
        document.getElementById('divExcurNote').innerHTML = document.getElementById('hdn'+selPortID+'ExNote').innerHTML;
        //alert(document.getElementById('hdn'+selPortID+'ExNote').innerHTML);
        document.getElementById('divExcurNoteBottom').innerHTML = document.getElementById('hdn'+selPortID+'ExNote').innerHTML;
   }
   else
   {
        document.getElementById('divNoExcursions').style.visibility = "visible";
        document.getElementById('divNoExcursions').style.display = "block";
        document.getElementById('divExcurNote').style.visibility = "hidden";
        document.getElementById('divExcurNote').style.display = "none";
        document.getElementById('divExcurNoteBottom').style.visibility = "hidden";
        document.getElementById('divExcurNoteBottom').style.display = "none";
        document.getElementById('divNoExcursions').innerHTML = document.getElementById('hdn'+selPortID+'NoExTxt').innerHTML;
   }
   
 }
 
 /*function removeFromWL(cruisePageID)
{
alert("Remove");
$("#hdnRemCruisePageIDFromWS").val() = cruisePageID;    
}
function addtoWL(cruisePageID)
{

//document.getElementById('hdnAddCruisePageIDToWS').value = cruisePageID;
//debugger;
document.getElementById('<%= hdnAddCruisePageIDToWS.ClientID %>').value = cruisePageID; 

//$("#hdnAddCruisePageIDToWS").val() = cruisePageID;    
}

function openNewWin_BookingURL() {
  $("A.test").click(function(event)
  {
  event.preventDefault();
  var top = (window.screen.height/2)-250;
          var left = (window.screen.width/2)-360;     
  var url=$("A.test").attr("href");
  //$("A.NEW_WIN").attr("href","#");  
    var sFeatures = "location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no,titlebar=no,height=500,width=660,top="+top+",left="+left;        
    var x = window.open(url, 'mynewwin',sFeatures); 
  });
                    
        }*/
       /*function closeAirportsID()
{
 
//document.getElementById('<%=divDepartureAirports.ClientID %>').css("display","none");
//document.getElementById('<%=divDepartureAirports.ClientID %>').css("visibility","hidden");
$('#FindBookCruisesUC_divDepartureAirports').css("display","none");
$('#FindBookCruisesUC_divDepartureAirports').css("visibility","hidden");
//$('#FindBookCruises_divDepartureAirports').css("display","none");
$('#FindBookCruisesUC_ShowAirportsNew').removeClass("chkBoxDepartureAirportsClicked");
$('#FindBookCruisesUC_ShowAirportsNew').addClass("chkBoxDepartureAirports");
//$('#FindBookCruisesUC_divDepartureAirports').css("visibility","hidden");
}*/
/*function dateSelected()
{
    
    document.getElementById('<%=hdnDateChange.ClientID %>').value = "true";   
    document.getElementById('<%=hdnWeekVariance.ClientID %>').value = document.getElementById('searchweekseitherside').value;     
    __doPostBack('<%=hdnDateChange.ClientID%>','');
    //__doPostBack('updtePnl','');
}*/
/*function UpdPanelUpdate()
    {    
        document.getElementById('<%=hdnHasPortName.ClientID %>').value = "true";
        
        __doPostBack('<%=hdnHasPortName.ClientID%>','');
    }*/
    
    
/*JS function to clear all form enteries*/
/*function clearall(oForm)
{
        
        
         var frm_elements = oForm.elements;
            
        for(i=0; i<frm_elements.length; i++) {

        field_type = frm_elements[i].type.toLowerCase();

        switch(field_type) {

        case "text":
        case "password":
        case "textarea":
        case "hidden":

        frm_elements[i].value = "";
        break;

        case "radio":
        case "checkbox":

        if (frm_elements[i].checked) {

        frm_elements[i].checked = false;

        }
        break;

        case "select-one":
        case "select-multi":

        frm_elements[i].selectedIndex = -1;
        break;

        default:
        break;

}

} 

}*/

function LaunchFileManagerBrowser(imagetextBoxClientId) {
        var returnVal = new Object();
        var dialogArguments = returnVal;
        var callbackArguments = new Object();
        callbackArguments.myControlId = imagetextBoxClientId;

        var dialogUrl = '<%= EPiServer.UriSupport.ResolveUrlFromUIBySettings("edit/FileManagerBrowser.aspx")%>';
        EPi.CreateDialog(dialogUrl, OnFileDialogClosed, callbackArguments, returnVal, { width: 600 });
    }

/* function called after file browser dialog has returned and closed*/
    function OnFileDialogClosed(returnValue, callbackArguments) {
        if (returnValue != undefined && returnValue != 0) {
            var myCtrl = document.getElementById(callbackArguments.myControlId);
            myCtrl.value = returnValue;
        }
    }
    
    function SetUniqueRadioButton(nameregex, current)
    {
       re = new RegExp(nameregex);
       for(i = 0; i < document.forms[0].elements.length; i++)
       {
          elm = document.forms[0].elements[i]
          if (elm.type == 'radio')
          {
             if (re.test(elm.name))
             {
                elm.checked = false;
             }
          }
       }
       current.checked = true;
    }
    
    
    function OpenChildEditor(shipId, xmlType, currentXML) {
        //var srtXML = document.getElementById('<%=txtXML.ClientID%>').value;
        //alert(currentXML);
        var MyInPutArgs = new Array(shipId, xmlType, currentXML);
        var WinSettings = "center:yes;resizable:no;dialogHeight:600px;dialogWidth:700px;"
        // ALTER BELOW LINE - supply correct URL for Child Form
        var returnArgs = window.showModalDialog("/XMLpreEditDialog.aspx?ShipId=" + shipId + "&XMLType=" + xmlType, MyInPutArgs, WinSettings);
        if (returnArgs == null) {
            //window.alert("Nothing returned from child. No changes made to input boxes");
        }
        else 
        {
          //  retvalA.value = MyArgs[0].toString();
            document.getElementById(fieldClientId).value = returnArgs[0].toString();
        }
    }  
  
  
   function CruisePageTagging(cruiseID)
   {
        //alert("hi");
        //alert(cruiseID);
        var len=$("DIV#divCruisePageTagging").length;
      if(len>0)
      {
          //alert("inside");
          
            $("DIV#divCruisePageTagging").html("<iframe src=\"http://fls.doubleclick.net/activityi;src=2056259;type=pocru750;cat=searc815;qty=1;cost=;u2="+cruiseID+";ord=\" HEIGHT=\"1\" WIDTH=\"1\" FRAMEBORDER=\"0\"></iframe>");
        }
        
   }
   
    
 
    
   function changeFormBckgrnd()
   {
   var len1=$("DIV#divHomeImgLink").length;
   
   var len3=$("DIV#divHomeImgLink2").length;
   
    if (len1>0)
    {
        //alert("hi");
        //$('#home').css("background","#dde6ef url(/images/bg-body2.gif) top center no-repeat"); 
        //$('#nav').css("background","");
        //$("#divHomeImgLink").css("background-color","Transparent");
        $("DIV#divHomeImgLink").bind("click", function() {
             //alert("User clicked on");
             
          var strTitle=$("#divHomeImgLink").attr("href");            
            
            window.location.href=strTitle;
            
            });
            
    }
    if(len1>0)
    {
     if ($.browser.msie) {
     //alert("hi");
     $("#news_alert_bar_holder").css({ "margin-top" : "10px" });
        
    }
    else{
    $("#news_alert_bar_holder").css({ "margin-top" : "0px" });
    }
    }
    
     if (len3>0)
    {        
        $("DIV#divHomeImgLink2").bind("click", function() {
        var strTitle=$("#divHomeImgLink2").attr("href");
        var strClass=$("#divHomeImgLink2").attr("class"); 
        if(strClass=="homeImgLink2NewWin")
        {         
                var top = (window.screen.height/2)-250;
              var left = (window.screen.width/2)-360; 
                var sFeatures = "location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,titlebar=no,height=500,width=660,top="+top+",left="+left;        
                window.open(strTitle, 'mynewwin',sFeatures);
        }
        else
        {
            window.location.href=strTitle;
        }
            
        });
            
    }
   }
   function testFormBckgrnd(mtchimg)
   {
   // alert(mtchimg);
   }
   /*function imgURL()
   {
   var strImgUrl= $(".hdnImgLink").val(); 
   alert(strImgUrl);
   if(strImgUrl != "true")
   {
        $('.homeImgLink').bind('click', function() {
            alert('User clicked on "foo."');
            });
    }
    }*/
   function showCruiseSector(cruiseItem)
   {
   
   //alert(cruiseItem);
        //var len=$("A#divViewAllCruiseSector").length;
        //alert("hi");
        //if(len>0)
        //{
                //alert("len");
                    /*if($("div[id^='divCruiseSectorHide']"))
                    {
                        for(var i=0;i<$("div[id^='divCruiseSectorHide']").length;i++)
                        {*/
                           var divID="divCruiseSectorItem"+cruiseItem;                           
                           var aID="divViewMoreCruiseSector" + cruiseItem; 
                           if($("#"+aID).html()=="Show more")
                           {
                            //alert("show");
                            $("DIV#"+divID).removeClass("divCruiseSectorItem");
                            $("DIV#"+divID).addClass("divCruiseSectorItemHide");
                            $("#"+aID).html("Hide");
                           }
                           else
                           {
                            //alert("hide");
                            $("DIV#"+divID).removeClass("divCruiseSectorItemHide");
                            $("DIV#"+divID).addClass("divCruiseSectorItem");
                            $("#"+aID).html("Show more");
                           }
                           //$("div[id^='divCruiseSectorHide']")[i].css("display","block");              
                        /*}
                    }  */                  
                    //$("A#divViewAllCruiseSector").remove();
                                         
        //}
   }
   function showAllCruiseSector()
   {
        //alert("hi");
        var div=$("#divWorldCruiseShow").html();
        if($("div[id^='divCruiseSector']"))
        {
            for(var i=0;i<$("div[id^='divCruiseSector']").length;i++)
            {
                  var divID="divCruiseSectorItem"+i;             
                  var aID="divViewMoreCruiseSector" + i; 
                  if(div=="Expand all")
                  {
                            if($("#"+aID).html()=="Show more")
                           {                           
                            $("DIV#"+divID).removeClass("divCruiseSectorItem");
                            $("DIV#"+divID).addClass("divCruiseSectorItemHide");
                            $("#"+aID).html("Hide");
                           }
                  }
                  else
                  {
                            if($("#"+aID).html()=="Hide")
                            {
                            $("DIV#"+divID).removeClass("divCruiseSectorItemHide");
                            $("DIV#"+divID).addClass("divCruiseSectorItem");
                            $("#"+aID).html("Show more");
                            }
                  }
                          /* if($("#"+aID).html()=="Show more")
                           {                           
                            $("DIV#"+divID).removeClass("divCruiseSectorItem");
                            $("DIV#"+divID).addClass("divCruiseSectorItemHide");
                            $("#"+aID).html("Hide");
                           }
                           else
                           {                            
                            $("DIV#"+divID).removeClass("divCruiseSectorItemHide");
                            $("DIV#"+divID).addClass("divCruiseSectorItem");
                            $("#"+aID).html("Show more");
                           }*/
                
            }      
            
        }
        if($("#divWorldCruiseShow").html()=="Expand all")
        {
        //alert("hi1");
         $("#divWorldCruiseShow").html("Close all");
         }
         else{
         //alert("hi2");
         $("#divWorldCruiseShow").html("Expand all")
         }
           
        
   }
   function showPrePackages()
   { 
        var len=$("A#divViewAllPreCruise").length;
        //alert("hi");
        if(len>0)
        {
                //alert("len");
                    /*if($("div[id^='divCruiseSectorHide']"))
                    {
                        for(var i=0;i<$("div[id^='divCruiseSectorHide']").length;i++)
                        {*/
                           $("DIV.divPrePackageHide").css("display","block"); 
                           //$("div[id^='divCruiseSectorHide']")[i].css("display","block");              
                        /*}
                    }  */  
                    //$("DIV#divPostPackageHeading").css("border-top","none !important");                
                    $("A#divViewAllPreCruise").remove();
                                         
        }       
   }
   function showPostPackages()
   {
        var len=$("A#divViewAllPostCruise").length;
        //alert("hi");
        if(len>0)
        {
                //alert("len");
                    /*if($("div[id^='divCruiseSectorHide']"))
                    {
                        for(var i=0;i<$("div[id^='divCruiseSectorHide']").length;i++)
                        {*/
                           $("DIV.divPostPackageHide").css("display","block"); 
                           //$("div[id^='divCruiseSectorHide']")[i].css("display","block");              
                        /*}
                    }  */                  
                    $("A#divViewAllPostCruise").remove();
                                         
        }
   }
   
   function positionBookNow()
   {
        //var leftHTML=$(".left").innerHTML;
        //alert("hi");         
        var bookNow=$("#divOvrvwBookNow").html();
        //alert(bookNow);
        $("DIV#template-one DIV.left").append(bookNow);
        //alert($(".left").html());
        $("#divOvrvwBookNow").remove();
        //tb_init('A#bookingLink');
        
   }
   
   $(document).ready(function() {
    var divID="divCruiseSectorItem0";
    var len=$("#"+divID).length; 
    var len1=$("#divPostPackageHeading").length; 
    var len2=$("#divPrePackageHeading").length;  
//    alert(len);
//    alert(len1);
//    alert(len2);
    if((len>0) ||(len1>0) || (len2>0))
    {
        positionBookNow();
    }

  });
  
  function yearChanged()
      {    
      // alert("hi");
      var year=$('select#year option:selected').val();
      // alert(year);
      var currYear=$('#hdnYear').val(); 
      // alert(currYear);
      //debugger;
      if(year==currYear)
      {
      var month=parseInt($('#hdnMonth').val()); 
      for(var i=1;i<=12;i++)
        {
        if(i<10)
        {
        var id="0"+i;
        }
        else{
        id=i;
        }
        // alert(id);
        if(i<month)
        {
            $("option[value='"+i+"']").remove();

            //$("id").css({ "display" : "none" });
            //$(id).removeClass("swDisplay");
            //$(id).addClass("swHide");
        }
        //else
        //{
            //$("id").css({ "display" : "block" })
            //$(id).removeClass("swHide");
            //$(id).addClass("swDisplay");
        //}
        }
        }
        else
        {
        for(var i=1;i<=12;i++)
        {
        if(i<10)
        {
        var id="0"+i;
        }
        else{
        id=i;
        }
            $("id").css({ "display" : "block" })
            //$(id).removeClass("swHide");
            //$(id).addClass("swDisplay");
       
        }
            
        }
        }
        
        function fnGoogleAnalytics()
        {
         var divGAJSCode=$("#divGAJavaScriptCode").html(); 
         //alert(divGAJSCode);        
        $("#divGAJavaScriptCode").remove();
        $("HEAD").append(divGAJSCode);
        }

        function AdjustHeightYSResults() 
        {

            $(".YSROuterContainer").each(function(index) {
                var maxHeight = 0;
                $(".YSRdescription", this).each(function(index) {
                    if ($(this).height() > maxHeight) {
                        maxHeight = $(this).height();
                    }
                });
                $(".YSRdescription", this).css("height", maxHeight + "px");
            });

        }


        function setToolTip() {
//            $("TH.fullPrice a, a.fullPrice").bind(
//                'mousemove', changeTooltipPosition
//             );
//            $("TH.fullPrice a, a.fullPrice").bind(
//                'mouseenter', showTooltip
//             );
//            $("TH.fullPrice a, a.fullPrice").bind(
//                'mouseleave', hideTooltip
//             );
//             $("TH.fullPrice a, a.fullPrice").bind(
//                'click', function(e) { e.preventDefault(); }
//             );
            $("a.fullPrice").bind(
                'mousemove', changeTooltipPosition
             );
            $("a.fullPrice").bind(
                'mouseenter', showTooltip
             );
            $("a.fullPrice").bind(
                'mouseleave', hideTooltip
             );
            $("a.fullPrice").bind(
                'click', function(e) { e.preventDefault(); }
             );                                   
        }

        var showTooltip = function(event) {
        $('div.tooltip').remove();
        var tmpval = $(this).attr('title');
        if (tmpval.length > 0) {
            $(this).attr('title', '');
            $(this).attr('tooltip', tmpval);
        }
        else {
            tmpval = $(this).attr('tooltip');
        }
        tmpval = tmpval.replace("&lt;", "<");
        tmpval = tmpval.replace("&gt;", ">");
        // console.log(tmpval);
        $('<div class="tooltip"></div>').html(tmpval)
     .appendTo(document.body);
        changeTooltipPosition(event);
        };


        var changeTooltipPosition = function(event) {
            var windwoWidth = $(window).width();
            var divWidth = $('div.tooltip').width();
            var tooltipX = event.pageX - 40;
            if(tooltipX + divWidth > windwoWidth)
            {
              tooltipX = windwoWidth - divWidth;
            }
            var tooltipY = event.pageY + 8;
            $('div.tooltip').css({ top: tooltipY, left: tooltipX });
        };


        var hideTooltip = function() {
            $('div.tooltip').remove();
        };       

        /*** Goolge Event Tracking functions start ******/
        function EventTrackHolidaySearch(strControlId) {
            var holidayNumberEle = document.getElementById(strControlId);
            if (holidayNumberEle != null) {
                var holidayNumber = holidayNumberEle.value;
                if ((holidayNumber != "") && (holidayNumber != "Holiday number") && (holidayNumber != "Invalid Holiday Number")) {
                    _gaq.push(['_trackEvent', 'CruiseSearch', 'HolidayNumber', holidayNumber, 1]);
                   // alert("_gaq.push(['_trackEvent', 'CruiseSearch', 'HolidayNumber', " + holidayNumber + ", 1])");
                }
            }
            
            return true;
        }

        /*** Goolge Event Tracking functions end ******/

        function loadCommunityStats() {
            $('SPAN#MembersCount').load('/ajaxMembers.aspx DIV#target', function() {
                $('P#pMembersCount').css('display', 'block');
            });
            $('SPAN#OnlineNowCount').load('/ajaxOnlineNow.aspx DIV#target', function() {
                $('P#pOnlineNowCount').css('display', 'block');
            });
        }

        function loadCommunityStatsCombined() {
            var membersAndOnline = $('P#pMembersOnlineCount').html();

            $('DIV#totalMemberCount').load('/ajaxMembers.aspx DIV#target', function() {
                var memberCount = $('DIV#totalMemberCount').html();
                membersAndOnline = membersAndOnline.replace("[MEMBERS]", memberCount);
                if ($('DIV#onlineMemberCount').html() != '') {
                    $('P#pMembersOnlineCount').css('display', 'block');
                    $('P#pMembersOnlineCount').html(membersAndOnline);
                }

            });
            $('DIV#onlineMemberCount').load('/ajaxOnlineNow.aspx DIV#target', function() {
            var onlineount = $('DIV#onlineMemberCount').html();
            membersAndOnline = membersAndOnline.replace("[ONLINE]", onlineount);
                if ($('DIV#totalMemberCount').html() != '') 
                {
                    $('P#pMembersOnlineCount').css('display', 'block');
                    $('P#pMembersOnlineCount').html(membersAndOnline);
                }
            });
           
        }
        
        function clearEmail() {
            $('.email-input').focus(function() {
                $('.email-input').val("");
            });            
              

        }

        function searchCatTogggle() {
            $(".innerCont A.catHead").click(function(ev) {
                ev.preventDefault();
                var $baseDiv = $(this).parents(".innerCont");
                var $chkContainer = $($baseDiv).find(".inLowerSecfFltr");
                if ($baseDiv.hasClass("fClose")) {
                    //currently close to open
                    $($chkContainer).slideDown(function() {
                        $baseDiv.removeClass("fClose").addClass("fOpen");
                        $chkContainer.css("display", "");
                    });
                }
                else {
                    // currently open -  to close
                    $($chkContainer).slideUp(function() {
                        $baseDiv.removeClass("fOpen").addClass("fClose");
                        $chkContainer.css("display", "");
                    });
                }
            }
            );
            
            /*
            $(".innerCont A.catHead").toggle(
            function() {
                 $(this).css({ "background": "url(/Images/arrow_FindAndBook_open.gif) left no-repeat" });
                  var item = $(this).parents(".innerCont").find(".inLowerSecfFltr");
                  $(item).slideDown();
                    //wireCruiseSearchPanelToggle("A." + item,true);
             },
            function() {
                $(this).css({ "background": "url(/Images/arrow_FindAndBook_closed.gif) left no-repeat" });
                var item = $(this).parents(".innerCont").find(".inLowerSecfFltr");
                $(item).slideUp();
               //wireCruiseSearchPanelToggle("A." + item,false);
            }
            );
            //default opening
            $(".innerCountgroup .innerCont").each(function() {
                var $filterSec = $(this).find(".inLowerSecfFltr");
                var n = $($filterSec).find("input:checked").length
                if (n > 0) {
                    //alert(n);
                    //$($filterSec).slideDown();

                    var $anchor = $($filterSec).parents(".innerCont").find("A.catHead");
                    //$($anchor).css({ "background": "url(/Images/arrow_FindAndBook_open.gif) left no-repeat" });
                    $($anchor).trigger('click');
                }
            });
            */     
            
        }    
       
       

   function srchCat() {
       $("A.frstA, A.scndA, A.thrdA, A.frthA, A.fthA, A.sixA").toggle(
       function() {
           $(this).css({ "background": "url(/Images/arrow_FindAndBook_open.gif) left no-repeat" });
           var item = $(this).attr("class");
           $("DIV." + item).slideDown();
           wireCruiseSearchPanelToggle("A." + item,true);
       },
       function() {
           $(this).css({ "background": "url(/Images/arrow_FindAndBook_closed.gif) left no-repeat" });
           var item = $(this).attr("class");
           $("DIV." + item).slideUp();
           wireCruiseSearchPanelToggle("A." + item,false);
       }
       );
       
    /*
    $("A.frstA").toggle(
    function() {

    $("DIV.frstA").slideDown();
    $("A.frstA").css({ "background": "url(/Images/arrow_FindAndBook_open.gif) left no-repeat" });
    },
    function() {

    $("DIV.frstA").slideUp();
    $("A.frstA").css({ "background": "url(/Images/arrow_FindAndBook_closed.gif) left no-repeat" });
    }
    );

    $("A.scndA").toggle(

    function() {

    $("DIV.scndA").slideDown();
    $("A.scndA").css({ "background": "url(/Images/arrow_FindAndBook_open.gif) left no-repeat" });
    },
    function() {

    $("DIV.scndA").slideUp();
    $("A.scndA").css({ "background": "url(/Images/arrow_FindAndBook_closed.gif) left no-repeat" });
    });


    $("A.sixA").toggle(

    function() {

    $("DIV.sixA").slideDown();
    $("A.sixA").css({ "background": "url(/Images/arrow_FindAndBook_open.gif) left no-repeat" });
    },
    function() {

    $("DIV.sixA").slideUp();
    $("A.sixA").css({ "background": "url(/Images/arrow_FindAndBook_closed.gif) left no-repeat" });
    });

    $("A.thrdA").toggle(

    function() {

    $("DIV.thrdA").slideDown();
    $("A.thrdA").css({ "background": "url(/Images/arrow_FindAndBook_open.gif) left no-repeat" });
    },
    function() {

    $("DIV.thrdA").slideUp();
    $("A.thrdA").css({ "background": "url(/Images/arrow_FindAndBook_closed.gif) left no-repeat" });
    });

    $("A.frthA").toggle(

    function() {

    $("DIV.frthA").slideDown();
    $("A.frthA").css({ "background": "url(/Images/arrow_FindAndBook_open.gif) left no-repeat" });
    },
    function() {

    $("DIV.frthA").slideUp();
    $("A.frthA").css({ "background": "url(/Images/arrow_FindAndBook_closed.gif) left no-repeat" });
    });
    $("A.fthA").toggle(

    function() {

    $("DIV.fthA").slideDown();
    $("A.fthA").css({ "background": "url(/Images/arrow_FindAndBook_open.gif) left no-repeat" });
    },
    function() {

    $("DIV.fthA").slideUp();
    $("A.fthA").css({ "background": "url(/Images/arrow_FindAndBook_closed.gif) left no-repeat" });
    });
    
    */
    
    if ($(".hdnCatState").val() != "") {
        var hdnCatStateVal = $(".hdnCatState").val();
        if (hdnCatStateVal.indexOf(",") > -1) {
            var catArray = hdnCatStateVal.split(",");
            for (var i = 0; i < catArray.length; i++) {
                var className = catArray[i];
                $("DIV." + className).show();
                $("A." + className).css({ "background": "url(/Images/arrow_FindAndBook_open.gif) left no-repeat" });
            }
        }
        else {
            $("DIV." + hdnCatStateVal).show();
            $("A." + hdnCatStateVal).css({ "background": "url(/Images/arrow_FindAndBook_open.gif) left no-repeat" });
        }

    }

}
  
  function maintainCatState()
  {  
  var catList="";
  $(".inLowerSecFltr").each(function(index) {               
                var cssBlock=$(this).css("display");
                if(cssBlock=="block")
                {
                
                var className= $(this).attr('class').split(' ').slice(-1);
                //alert(className);
                if(catList=="")
                {
                catList= className;
                }
                else{
                catList= catList+","+className;
                }
                //alert(catList);
                }
            });
            //alert(catList);
        $(".hdnCatState").val(catList);
            
  /**/
  }
  /*function nextYear(curryear)
  {
  
  if(curryear=="2")
  { 
    $("DIV.calCol1").hide();
    $("DIV.calCol3").show();
    $("A.next").hide();
    $("A.prev").show();
  }
  if(curryear=="1")
  { 
    $("DIV.calCol1").show();
    $("DIV.calCol3").hide();
    $("A.next").show();
    $("A.prev").hide();
  }
  
  }*/
  function unCheck(catID)
  {
  //alert("hi");
  if(catID=="10")
  {
  //alert("0");
  $(".hdnOfferCode").val("");
  $(".hdnClrClick_id").val(catID);
  
  }
  if(catID=="0")
  {
  //alert("0");
  $(".hdnPortIds").val("");
  $(".hdnClrClick_id").val(catID);
  
  }
  if(catID=="1")
  {
  //alert("1");
  $('DIV.frstA').find('input[type=checkbox]:checked').removeAttr('checked');
  
  $(".hdnDepIds").val("");
  $(".hdnClrClick_id").val(catID);
  
  }
  if(catID=="2")
  { 
  //alert("2");
  $('DIV.scndA').find('input[type=checkbox]:checked').removeAttr('checked');
   
  $(".hdnDepartureMonths").val("");
  $(".hdnCalChk").val("");
  $(".hdnClrClick_id").val(catID);
  }
  if(catID=="3")
  {
  //alert("3");
  $('DIV.thrdA').find('input[type=checkbox]:checked').removeAttr('checked');
  $(".hdnDuration").val("");
  }
  if(catID=="4")
  {
  //alert("4");
  $('DIV.frthA').find('input[type=checkbox]:checked').removeAttr('checked');
  $(".hdnOffer").val("");
  $(".hdnClrClick_id").val(catID);
  }
  if(catID=="5")
  { 
  
  $('DIV.fthA').find('input[type=checkbox]:checked').removeAttr('checked');
  $(".hdnDestIds").val("");
  $(".hdnClrClick_id").val(catID);
  
  }
  if(catID=="6")
  { 
  //alert("6");
  $('DIV.sixA').find('input[type=checkbox]:checked').removeAttr('checked');
  $(".hdnShipIds").val("");
  $(".hdnClrClick_id").val(catID);
  }
  if(catID=="7")
  {
  //alert("7");
  $('DIV.frstA').find('input[type=checkbox]:checked').removeAttr('checked');
  
  $('DIV.scndA').find('input[type=checkbox]:checked').removeAttr('checked');
  $('DIV.thrdA').find('input[type=checkbox]:checked').removeAttr('checked');
  $('DIV.frthA').find('input[type=checkbox]:checked').removeAttr('checked');
  $('DIV.fthA').find('input[type=checkbox]:checked').removeAttr('checked');
  $('DIV.sixA').find('input[type=checkbox]:checked').removeAttr('checked');
  $(".hdnDepIds").val("");
  $(".hdnDepartureMonths").val("");
  $(".hdnCalChk").val("");
  $(".hdnDuration").val("");
  $(".hdnOffer").val("");
  $(".hdnDestIds").val("");
  $(".hdnShipIds").val("");
  //__doPostBack('<%= hdnClrClick_id.ClientID %>','');
  $(".hdnClrClick_id").val(catID); 
   /*var pathname = window.location.pathname
   alert("pathname "+pathname);
   window.location.href=pathname;*/
   //return true;
  //window.location.href=strTitle;
  }
  
  var query_string_unchk="";
  if($(".hdnDepIds").val()!="")
  {
    query_string_unchk="&cruiseType="+$(".hdnDepIds").val();
  }
  if($(".hdnShipIds").val()!="")
  {
    query_string_unchk=query_string_unchk+"&shipIds="+$(".hdnShipIds").val();
  }
   if($(".hdnDestIds").val()!="")
  {
    query_string_unchk=query_string_unchk+"&regionIds="+$(".hdnDestIds").val();
  }
  if($(".hdnOffer").val()!="")
  {
    query_string_unchk=query_string_unchk+"&showOnlyOffers="+$(".hdnOffer").val();
  }
   if($(".hdnDuration").val()!="")
  {
    query_string_unchk=query_string_unchk+"&durationList="+$(".hdnDuration").val();
  }
  if($(".hdnDepartureMonths").val()!="")
  {
    query_string_unchk=query_string_unchk+"&departureMonths="+$(".hdnDepartureMonths").val();
  }
  
  var pathname = window.location.pathname;
  pathname=$(".hdnSearchPageUrl").val();
  //alert("pathname"+pathname);
  //alert(query_string_unchk);
  window.location.href=pathname+"?catID="+catID+query_string_unchk;
  //alert($(".hdnClrClick_id").val());
  }
        
        
var submitGoogleSearch = false;
$(document).ready(function() {
    // wire in click on search button

    $("#strSearchStringSubmit").click(handleGoogleSearchBox);
    $("#strSearchStringSubmit").submit(handleGoogleSearchBox);
    $("INPUT#cq").focus(function() {
        $(this).val("");
    });

    $("INPUT#cq").keydown(function(e) {
        if (e.which == 13) {
            // e.preventDefault(); 
            handleGoogleSearchBox(e);
        }
    });

    //    $("#cse-search-box").submit(function(e) {
    //        var searchval;
    //        searchval = $("input#cq").val();
    //        if (searchval != "enter holiday number") {
    //            e.preventDefault();
    //            getCruisePageFromSearchBox(searchval);
    //            return false; 
    //        }
    //    });
    $("#strAskSearchStringSubmit").click(handleAskSearchBox);
    $("#strAskSearchStringSubmit").submit(handleAskSearchBox);
    $("input#ask").click(function() {
        var searchval;
        searchval = $("input#ask").val();
        if (searchval == "Ask a question...") {
            $("input#ask").val("");
        }
    });


});

function handleAskSearchBox(event) {
    var searchval;
    searchval = $("input#ask").val();
    if (searchval != "Ask a question...") {
        _gaq.push(['_trackEvent', 'AskAQuestion', window.location.href, searchval]);
        _gaq.push(['_trackPageview', '/virtual/FAQResults/?FAQ_query=' + searchval]);
        _gaq.push(function() {
        window.location.href = "https://ask.pocruises.com/help/PO/search?nlpq=" + escape(searchval);
        });

    }
    return false;
}

function handleGoogleSearchBox(event) {
    if (!submitGoogleSearch)
    {
        event.preventDefault(); 
        var searchval; 
        searchval = $("input#cq").val();
        getCruisePageFromSearchBox(searchval);
        // return false;
    }
}

function getCruisePageFromSearchBox(cruiseCode) {
    $.ajax({
        url: "/ajaxCruiseCodeSearch.ashx",
        dataType: 'json',
        data: { cruiseNumber: cruiseCode },
        cache: false,
        success:
       function(data) {
           if (data.url != "") {
               // make sure we track the virtual search result which directs to a Cruise page rather than any other page on the site
               _gaq.push(['_trackPageview', '/virtual/sitesearchResults/?sitesearch_query=' + cruiseCode + '&sitesearch_category=site_search_bypass']);
               _gaq.push(function() { window.location = data.url; });
               submitGoogleSearch = false;
               // setTimeout("window.location.href = '" + data.url + "';alert('about to redirect');", 150);
           }
           else {
               // submitGoogleSearch = true;
               // document.forms['cse-search-box'].submit();
               alert("Sorry, that is not a valid cruise number");
           }
       },
        error:
       function(data) {
           // submitGoogleSearch = true;
           //document.forms['cse-search-box'].submit();
           alert("Sorry, that is not a valid cruise number");
       }
    });  
}

function gridViewOfRHS(w,f,r)
{
if (w == 'wishlist')
{
$("#wishList").addClass("wishListGrid");
}
if (f == 'featured')
{
$("#featuredCruises").addClass("featuredCruisesGrid");
}
if (r == 'recentlyviewed')
{
$("#viewedCruises").addClass("viewedCruisesGrid");
}
}

function gridViewOfRHSRec()
{
$("#featuredCruises").addClass("recfeaturedCruisesGrid");

}
function getPortsHgt()
{
$(".item").each(function(){

$(this).find("DIV.ports").each(function(){

var hgt = ($(this).height()/3);
//alert(hgt);
$(this).find(".resultsButton").css("margin-top", hgt+"px");

});
});
}
function getDescHgt()
{
/*alert("hi");
$(".itemGrid .offer .details .divRight").each(function(){
var len = $(".holPckText").length();
alert("len");
if(len>0)
{
$(this).css("height", "78px");
}
else{
$(this).css("height", "60px");
}
});*/

}
function CruiseSearchResultsGridListLayout()
{
var maxHeight = 0;
//var hgtPorts=$(".ports").height()/2;
//$(".resultsButton").css("margin-top", hgtPorts+"px");
getPortsHgt();


$("DIV.divListView").bind("click", function(ev)
{

$("DIV.description").show();
$("DIV.descriptionGrid").hide();
$("DIV.divLeft").show();
$("DIV.divLeftGrid").hide();
$(".highlightedElemGrid").hide();

$("DIV.ports p").css("height", "auto");
$("DIV.description").css("height", "auto");
$("DIV.boat").css("height", "auto");
$("DIV.divGridView").removeClass("divGridViewOn");
$("DIV.divListView").removeClass("divListViewOff");
$("DIV#ResultDisplayType").html("List");
$("DIV.itemGridWrapper").removeClass("itemGridWrapperWithBckGrd");

$("DIV.item").each(function(i)
{

$(this).removeClass("itemGrid");

});
$("DIV.item").css("height", "auto");
getPortsHgt();
});
$("DIV.divGridView").bind("click", function(ev)
{
$(".resultsButton").css("margin-top", "0px");

getDescHgt();

    $("DIV.description").hide();
$("DIV.descriptionGrid").show();
$("DIV.divLeft").hide();
$("DIV.divLeftGrid").show();
$(".highlightedElemGrid").show();
$("DIV#ResultDisplayType").html("Grid");
$("DIV.divGridView").addClass("divGridViewOn");
$("DIV.divListView").addClass("divListViewOff");


var wrap = 0;
$(".ItemContainerCls DIV.item, .itemGridWrapper DIV.item").each(function(j)
{

/*var ItemId = $(this).attr("id");
if (ItemId.match("topOffer") == null || ItemId.match("topOffer")[0] == null)
{*/
$(this).find("DIV.offer").addClass("wrap"+(wrap+1));

if ((j+1)%3 ==0 || j ==($("DIV.item").length -1))
{


wrap = wrap+1;
if ($(".wrap"+wrap).parent("DIV.item").parent("DIV.itemGridWrapper").hasClass("itemGridWrapper") == false)
{
$(".wrap"+wrap).parent("DIV.item").wrapAll('<div class="itemGridWrapper" />');
}

}
$(this).addClass("itemGrid");
$("DIV.itemGridWrapper").addClass("itemGridWrapperWithBckGrd");
//}
});

$("DIV.itemGridWrapperWithBckGrd").each(function(){
var maxHeight1 = 0;
var maxHeight2 = 0;
var maxHeight3 = 0;
$(this).find("DIV.ports p").each(function(){


if ($(this).height() > maxHeight1)
{
maxHeight1 = $(this).height();
}
});

$(this).find("DIV.description").each(function(){


if ($(this).height() > maxHeight2)
{
maxHeight2 = $(this).height();
}
});

$(this).find("DIV.boat").each(function(){


if ($(this).height() > maxHeight3)
{
maxHeight3 = $(this).height();
}
});
//alert("final : "+maxHeight1);
//alert("final : "+maxHeight2);
//alert("final : "+maxHeight3);
$(this).find("DIV.ports p").css("height", maxHeight1);
//alert("final : "+maxHeight2);
$(this).find("DIV.description").css("height", maxHeight2);
$(this).find("DIV.description").css("height", 90);
$(this).find("DIV.boat").css("height", maxHeight3);
$(this).find("DIV.in-wishlist P").css("height", "auto");
});




});
if ($("DIV#ResultDisplayType").html() == "Grid")
{
$("DIV.divGridView").click();
}
if ($("DIV#ResultDisplayType").html() == "List")
{
$("DIV.divListView").click();
}
}


function getCategory()
{
$(".chkBoxDestination INPUT").bind("click", function(ev){
$(".hdnCategory").val("Region");
});
$(".chkBoxDate INPUT").bind("click", function(ev){
$(".hdnCategory").val("DepMonth");
});
$(".chkBoxOffer INPUT").bind("click", function(ev){
$(".hdnCategory").val("Offers");
});
$(".chkBoxCruiseType INPUT").bind("click", function(ev){
//alert("cruisetype");
$(".hdnCategory").val("CruiseType");
});
$(".chkBoxDuration INPUT").bind("click", function(ev){
$(".hdnCategory").val("Duration");
});
$(".chkBoxDuration INPUT").bind("click", function(ev){
$(".hdnCategory").val("Duration");
});
$(".chkBoxShipChildFriendly INPUT").bind("click", function(ev){
$(".hdnCategory").val("Ships");
});
$(".chkBoxShipChildFree INPUT").bind("click", function(ev){
$(".hdnCategory").val("Ships");
});
$(".chkBoxShipChildFreePad INPUT").bind("click", function(ev){
$(".hdnCategory").val("Ships");

});

//alert("hdnCategory "+$(".hdnCategory").val());
$(".hdnPrevNext").val("no");
//alert("hdnPrevNext "+$(".hdnPrevNext").val());


}

function setSameHeightCuises()
{

var wrap = 0;

$(".CruiseType .CruiseTypeInner").each(function(j) {
//debugger;
$(this).find(".CTHeading").addClass("wrap"+(wrap+1));

if ((j+1)%3 ==0 || j ==($("DIV.CTdetails").length -1))
{


wrap = wrap+1;

$(".wrap"+wrap).parent("DIV.CruiseTypeInner").wrapAll('<div class="CTDetailsWrapper" />');

}


});

$(".CTDetailsWrapper").each(function(){
var Maxheight=0;

$(this).find("DIV.CTdetails").each(function() {
//debugger; 
if ($(this).height() > Maxheight)
{
Maxheight = $(this).height();
}
//alert(Maxheight);
//$(this).css("height", Maxheight);
});
$(this).find("DIV.CTdetails").css("height", Maxheight+10);
});


}

function sameHeightLatestOffers()
{
var MaxheightScroll1=0;
var MaxheightScroll2=0;

$("#ourLatestOffersScroll LI .CruiseTypeInner").each(function(){
//alert($(this).find("DIV.CTHeading").height());
//alert($(this).find("DIV.CTdetails").height());
if ($(this).find("DIV.CTHeading").height() > MaxheightScroll1)
{
MaxheightScroll1 = $(this).find("DIV.CTHeading").height();
}
if ($(this).find("DIV.CTdetails").height() > MaxheightScroll2)
{
MaxheightScroll2 = $(this).find("DIV.CTdetails").height();
}

});
$("#ourLatestOffersScroll LI .CruiseTypeInner .CTHeading").css("height", MaxheightScroll1);
$("#ourLatestOffersScroll LI .CruiseTypeInner .CTimgtext .CTdetails").css("height", MaxheightScroll2);
}

function WorldCruisesNextPrevious()
{
var len = $("#secondary-nav UL LI").length;
var activeIndex = 0;
var previousLink = "#";
var nextLink = "#";
if (len >0)
{
$("#secondary-nav UL LI").each(function(i){
var chkActive = $(this).attr("class");
if (chkActive == "active")
{
activeIndex = i;
if(i==0)
{
//debugger;


$("A#previousTopic").hide();
$("A#nextTopic").show();
nextLink = $("#secondary-nav UL LI")[activeIndex+1].firstChild.href;

}
else if (i >0 && i<(len-1))
{
//debugger;

$("A#previousTopic").show();
$("A#nextTopic").show();
previousLink = $("#secondary-nav UL LI")[activeIndex-1].firstChild.href;
nextLink = $("#secondary-nav UL LI")[activeIndex+1].firstChild.href;


}
else if (i>0 && i == (len-1))
{
//debugger;

$("A#previousTopic").show();
$("A#nextTopic").hide();
previousLink = $("#secondary-nav UL LI")[activeIndex-1].firstChild.href;

}
}

});

}
//alert(previousLink);
//alert(nextLink);
$("A#previousTopic").attr("href",previousLink);
$("A#nextTopic").attr("href",nextLink);

}

function setSameHeightFandB(id)
{

var Maxheight=0;

$("LI#"+id+" DIV#sub-nav-item-2 DIV#navitem2Bin DIV.mainCol").each(function(){

//alert($(this).find("DIV.CTdetails").height());
if ($(this).height() > Maxheight)
{
Maxheight = $(this).height();
}
});
$("LI#"+id+" DIV#sub-nav-item-2 DIV#navitem2Bin DIV.mainCol").css("height", Maxheight);
}


/*
 flowplayer key selection based on domain
 speak to Richard to get more keys if required
 
*/
function getFlowplayerKey()
{
  var host = window.location.hostname;
  var key = "";
  if (host.indexOf("pocruises.com")>0)  { key = "#@743e122a54e5b7e79ca"; }
  if (host.indexOf("nucleus.co.uk")>0)  { key = "#@691d196bc71fa5a9f85"; }

  return key;
}
function hideVideoThumbnail()
{
var hidden= $(".hdnVideoThumbnail").val(); 
//alert("hidden "+ hidden);
if(hidden=="set")
{
//alert("set");
$(".VideoLinkThumbnail").css({"background-color" : "transparent"});
}
}
function setSameHeightTopOffers()
{

var Maxheight=0;
$("DIV.itemGridTopOffer DIV.offer DIV.details").each(function(){

if ($(this).height() > Maxheight)
{
Maxheight = $(this).height();
}
});
$("DIV.itemGridTopOffer DIV.offer DIV.details").css("height", Maxheight);
}

function startCountDown() {

    var timerHtml = "<div>DD</div><div>HH</div><div>MM</div><div>SS</div>";
    var $timerPlace = $("#divRemTime");
    var timerId =
	        countdown(
	        ctDown.TargetDate,
	        function(ts) {
	            var replaceHtml = timerHtml.replace(/DD/, ts.days).replace(/HH/, ts.hours).replace(/MM/, ts.minutes).replace(/SS/, ts.seconds);
	            $timerPlace.html(replaceHtml);
	        },
	        countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);

    // later on this timer may be stopped
    //window.clearInterval(timerId);

}


//function setYearOnLoad()
//{
// var querystring = location.search.replace( '?', '' ).split( '&' );
// // declare object
// //var lenTemp=querystring.indexOf("departureMonths");
// //alert("lenTemp "+lenTemp);
// 
// var queryObj = {};
// // loop through each name-value pair and populate object
// for ( var i=0; i<querystring.length; i++ ) {
//       // get name and value
//       var name = querystring[i].split('=')[0];
//       var value = querystring[i].split('=')[1];
//       // populate object
//       if(name=="departureMonths")
//       {
//        queryObj[name] = value;
//       // alert("queryObj "+queryObj[name]);
//       }
//       }
//       var currentYear = (new Date).getFullYear();
//       
//       //alert("currentYear "+currentYear);
//       /*var prevYear=currentYear-1;
//       alert("prevYear "+prevYear);*/
//       var nextYear=currentYear+2; 
//       //alert("nextYear "+nextYear);
//       
// if(queryObj[name]==currentYear)
// {
// 
//    $("DIV.calCol1").show();
//    $("DIV.calCol3").hide();
//    $("A.next").show();
//    $("A.prev").hide();
//  
// }
// if(queryObj[name]==nextYear)
// {
//  
//    $("DIV.calCol1").hide();
//    $("DIV.calCol3").show();
//    $("A.next").hide();
//    $("A.prev").show();  
// }
// 
// 
//
//}

/* code to add snow to page template and automatically revert on boxing day */
var todayDate = new Date();
var boxingDay = new Date(2011, 11, 26);
if (todayDate < boxingDay) {
    var loc = window.location.href;
    if (loc.indexOf("keepThis") < 1) {
        $(document).ready(function() {
            setTimeout(
            function() {
                $('DIV#header').css({ background: '#005ba1 url(/Images/homepage_christmas_static.png) top center no-repeat' });
                $('BODY').css({ background: '#005ba1 url(/Images/homepage_christmas_static.png) top center no-repeat' });
            }, 100);
        });
    }
}
function SearchSelectBoxes(i,dnId)
{
//alert("hi 1");
if (!$.browser.opera) {
// select element styling
$('select.selectSrchParam').each(function(){



var title = $(this).attr('title');

if($('option:selected', this).val() != '')
{
 title = $('option:selected',this).text(); 
 var sel_val = $('option:selected',this).text();  
 title = checkForDontMindText(title, this);
 //alert (i);
 if (i != null && i != 'undefined' && i == "rebindDDL" && this.id == dnId)
 {
 
 title = $("#"+dnId+" option:selected").text();
 if (title == "Don't mind")
 {
 title = "Don't mind";
 }
 
 }
 if (i != null && i != 'undefined' && i == "rebindDDL" && this.id != dnId)
 {
 var spanTxtAfterLoad = "Don't mind";
if ($(this).hasClass("selectSrchParamDate"))
{
spanTxtAfterLoad = $(".hdnDateLastValue").val();
}
else if ($(this).hasClass("selectSrchParamNight"))
{
spanTxtAfterLoad = $(".hdnNightLastValue").val();
}
else if ($(this).hasClass("selectSrchParamCruise"))
{
spanTxtAfterLoad = $(".hdnCruiseTypeLastValue").val();
}
else if ($(this).hasClass("selectSrchParamRegion"))
{
spanTxtAfterLoad = $(".hdnRegionLastValue").val();
}
else if ($(this).hasClass("selectSrchParamShip"))
{
spanTxtAfterLoad = $(".hdnShipLastValue").val();
}
 
 title = spanTxtAfterLoad; 

 }
 
 }
 
$(this).css({'z-index':10,'opacity':0,'-khtml-appearance':'none'}).after('<span class="select">' + title + '</span>').change(function(){
val = $('option:selected',this).text();
if (val != "Don't mind")
 {
var val_new = checkForDontMindText(val, this);
$(this).next().text(val_new);
}
else
{
$(this).next().text("Don't mind");
}



});
var spanTxt = $(this).next().text();
settingLastValueSearchValue($(this), spanTxt)
});
}

$('select.selectSrchParam').bind('mousedown',function(event){
   $(this.options[this.selectedIndex]).click(clickedOptionSearch(this.value, $(this)));
});
 
}
function clickedOptionSearch(i, obj)
{
//debugger;
if (i == "0")
{
$(obj).next().text("Don't mind");
var selectObj = $(obj);
var spanText = "Don't mind";
settingLastValueSearchValue(selectObj, spanText);
}

}
function settingLastValueSearchValue(sltOj, txt)
{
if (sltOj != null && sltOj != 'undefined')
{
if ($(sltOj).hasClass("selectSrchParamDate"))
{
$(".hdnDateLastValue").val(txt);
}
else if ($(sltOj).hasClass("selectSrchParamNight"))
{
$(".hdnNightLastValue").val(txt);
}
else if ($(sltOj).hasClass("selectSrchParamCruise"))
{
$(".hdnCruiseTypeLastValue").val(txt);
}
else if ($(sltOj).hasClass("selectSrchParamRegion"))
{
$(".hdnRegionLastValue").val(txt);
}
else if ($(sltOj).hasClass("selectSrchParamShip"))
{
$(".hdnShipLastValue").val(txt);
}
}
}

function checkForDontMindText(v, obj)
{

if (v == "Don't mind")
{
//alert("hi");
if ($(obj).hasClass("selectSrchParamDate"))
{
v = $(".hdnDateDefaultValue").val();
}
if ($(obj).hasClass("selectSrchParamNight"))
{
v = $(".hdnNightDefaultValue").val();
}
if ($(obj).hasClass("selectSrchParamCruise"))
{
v = $(".hdnCruiseTypeDefaultValue").val();
}
if ($(obj).hasClass("selectSrchParamRegion"))
{
v = $(".hdnRegionDefaultValue").val();
}
if ($(obj).hasClass("selectSrchParamShip"))
{
v = $(".hdnShipDefaultValue").val();
}
}
return v;
}

function checkUncheckYearOnFilter()
{
$(".FilterMonthCls").each(function(){
//alert($(this).find("input:checked").length);
if ($(this).find("input:checked").length > 0)
{
//alert($(this).find("input:checked").attr("id"));
var filterMonthId = $(this).attr("id");
filterMonthId = filterMonthId.replace("_div", "_chkBox");
//$('#'+filterMonthId).attr('checked', false);
}
});

}
function toolTip()
{
$("div.helpBox").bind("touchend", function(ev) { $(this).toggleClass("activeBaloon"); });
$("div.helpBox").bind("click", function(ev){
$(this).find(".shiptooltipoverlay").click();
});
}
function chkFamilyFriendlyShips()
{
//alert("hi");
$(".chkBoxShipChildFriendlyOuter input").prop('checked');

if($(".chkBoxShipChildFriendlyOuter input").prop('checked'))
{
//alert("inside")
$('.chkBoxShipChildFriendly input').prop('checked', true);
}
else{           
               $('.chkBoxShipChildFriendly input').prop('checked', false);
               }
               $('.hdnCategory').val("Ships");
  //          });

}

function chkOnlyAdultsShips()
{
//alert("hi");
$(".chkBoxShipChildFree input").prop('checked');

if($(".chkBoxShipChildFree input").prop('checked'))
{
//alert("inside")
$('.chkBoxShipChildFreePad input').prop('checked', true);
}
else{           
               $('.chkBoxShipChildFreePad input').prop('checked', false);
               }
               $('.hdnCategory').val("Ships");
  //          });

}

function unchkFamilyFriendlyShips(id)
{
//alert(id);
//alert("unchkFamilyFriendlyShips");
if($("#"+id+" input").prop('checked'))
{

}
else{      // alert("hi");    
               $('.chkBoxShipChildFriendlyOuter input').prop('checked', false);
               }
               $('.hdnCategory').val("Ships");
}
function unchkOnlyAdultsShips(id) {
    if ($("#" + id + " input").prop('checked')) {

    }
    else {
        $('.chkBoxShipChildFree input').prop('checked', false);
    }
    $('.hdnCategory').val("Ships");
}

function OptClicks() {
    if (CookieController.CK1IsOptIn()) {
        $('.OptClick').html('<img src="/images/btn_DisallowCookies.png" />');
        $('.OptClick').unbind().click(function() {
            CookieController.optOutCK1Cookie();
            scrollToClass('OptClick');
            OptClicks();
        });
    }
    else {
        $('.OptClick').html('<img src="/images/btn_AllowCookies.png" />');
        $('.OptClick').unbind().click(function() {
            CookieController.optInCK1Cookie();
            scrollToClass('OptClick');
            OptClicks();
        });
    }
}

function scrollToClass(ClassName) {
    $('html,body').animate({ scrollTop: '+=' + $('.' + ClassName).offset().top + 'px' }, 'fast');
}

function loadCookieDialog() {
    if (!CookieController.userHasCK1Cookie()) {
        var djs = document.createElement('script');
        djs.type = 'text/javascript';
        djs.src = '/js/jquery-ui-1.8.20.custom.min.js';
        djs.onreadystatechange = function() {
            if (this.readyState == 'loaded' || this.readyState == 'complete') openDialog();
        }
        djs.onload = openDialog;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(djs, s);
    }
    else if((CookieController.CK1IsOptOut()) && (!CookieController.userHasSessionCookie()))
    {
        var djs = document.createElement('script');
        djs.type = 'text/javascript';
        djs.src = '/js/jquery-ui-1.8.20.custom.min.js';
        djs.onreadystatechange = function() {
            if (this.readyState == 'loaded' || this.readyState == 'complete') openSessionDialog();
        }
        djs.onload = openSessionDialog;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(djs, s);                
    }
}

function openSessionDialog() {
    $("#dialogsess").dialog({
        position: ['right', 'bottom'],
        minHeight: 10
    });
    setTimeout('closeDialog("dialogsess")', 10000);
    CookieController.createSessionCookie();
}

function openDialog() {
    $("#dialog").dialog({
        position: ['right', 'bottom'],
        minHeight: 10
    });
    setTimeout('closeDialog("dialog")', 10000);
    CookieController.createCK1();
}

function closeDialog(dialogName) {
    $("#" + dialogName).dialog('close');
}

function setCruiseTabs() {
    $('.cruiseTabContent DIV').hide();
    $('#pageTabs UL LI').unbind().click(function() {
        var clicked = $(this).attr('class');
        clicked = clicked.replace('Title', 'Content');
        //ie fix for pie class additions
        var classEnd = clicked.indexOf(" ");
        if (classEnd != -1) {
            clicked = clicked.substring(0, classEnd);
        }
        //ie fix for pie class additions
        $('.cruiseTabContent DIV').hide();
        $("." + clicked).show();
        $("." + clicked + " DIV").show();
        $("#pageTabs UL LI").removeClass("Active");
        $(this).addClass("Active");

        var Maxheight = 0;
        $("." + clicked).find("DIV.CTdetails").each(function() {
            if ($(this).height() > Maxheight) {
                Maxheight = $(this).height();
            }
        });
        $("." + clicked).find("DIV.CTdetails").css("height", Maxheight);
//        var MaxHeadingheight = 0;
//        $("." + clicked).find("DIV.CTHeadingInner").each(function() {
//            if ($(this).height() > MaxHeadingheight) {
//                MaxHeadingheight = $(this).height();
//            }
//        });
//        $("." + clicked).find("DIV.CTHeadingInner").css("height", MaxHeadingheight);
    });

 
   
    if (getParameterByName("PageTabMiddle") == "2")
        $('DIV#pageTabs LI.TabTitle2').click();
    else if(getParameterByName("PageTabMiddle") == "3")
        $('DIV#pageTabs LI.TabTitle3').click();
    else if(getParameterByName("PageTabMiddle") == "4")
        $('DIV#pageTabs LI.TabTitle4').click();        
    else
        $('DIV#pageTabs LI.TabTitle1').click();

}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function setSessionCookie(name) {
    document.cookie = name + "=0;expires=0;path=/";
}

function deleteCookie(name) {
    setCookie(name, "", -1);
}


/* cookie controller class */
(function(CookieController, $, undefined) {
    "use strict";

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function addToCookie(name, newVal) {
        var cookieVal;
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) cookieVal = c.substring(nameEQ.length, c.length);
        }
        if (cookieVal == null) {
            setCookie(name, newVal, 30);
        }
        else if (cookieVal.indexOf(newVal) == -1) {//if newVal is not in cookie
            if (cookieVal) {//if the cookie already contains data
                setCookie(name, cookieVal + "," + newVal, 30)
            }
            else {
                setCookie(name, newVal, 30)
            }
        }
    }


    function removeFromCookie(name, deleteVal) {
        var cookieVal;
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) cookieVal = c.substring(nameEQ.length, c.length);
        }
        var re1 = new RegExp(deleteVal + ",", "g");
        var re2 = new RegExp(deleteVal, "g");
        cookieVal = cookieVal.replace(re1, "");
        cookieVal = cookieVal.replace(re2, "");
        setCookie(name, cookieVal, 30)
    }

    function pageInCookie(name, pageVal) {
        var cookieVal;
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) cookieVal = c.substring(nameEQ.length, c.length);
        }
        if (cookieVal.indexOf(pageVal) == -1)//if pageVal is not in cookie
            return false;
        return true;
    }

    function countPagesInCookie(name) {
        var cookieVal;
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) cookieVal = c.substring(nameEQ.length, c.length);
        }
        var n = cookieVal.split(",");
        return n.length;
    }

    function setCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function setSessionCookie(name) {
        document.cookie = name + "=0;expires=0;path=/";
    }

    function deleteCookie(name) {
        setCookie(name, "", -1);
    }

    //stage 2 functions
    CookieController.createCK1 = function() {
        setCookie("CK1", 1, 365);  //default behaviour to create a cookie that is opted in (1)
    }

    CookieController.createSessionCookie = function() {
        setCookie("Sess");  //default behaviour to create a cookie that is opted in (1)
    }

    CookieController.userHasCK1Cookie = function() {
        if (getCookie("CK1") == null)
            return false;
        return true;
    }

    CookieController.userHasSessionCookie = function() {
        if (getCookie("Sess") == null)
            return false;
        return true;
    }

    CookieController.optInCK1Cookie = function() {
        setCookie("CK1", 1, 365);
    }

    CookieController.optOutCK1Cookie = function() {
        setCookie("CK1", 0, 365);
    }

    CookieController.CK1IsOptOut = function() {
        if (getCookie("CK1") == null) {
            return false; //if no cookie default is OptIn
        }
        else {
            if (getCookie("CK1") == "1") {
                return false;
            }
            else {
                return true;
            }
        }
    }

    CookieController.CK1IsOptIn = function() {
        return !CookieController.CK1IsOptOut()
    }

    //stage 3 functions

    CookieController.addtoRecentlyViewed = function(newVal) {
        if (!CookieController.pageInSavedCruises()) {
            addToCookie("pocruisesRecentlyViewed", newVal);
        }
    }

    CookieController.removefromRecentlyViewed = function(delVal) {
        removeFromCookie("pocruisesRecentlyViewed", delVal);
    }

    CookieController.pageInRecentlyViewed = function(pageVal) {
        if (getCookie("pocruisesRecentlyViewed"))
            return pageInCookie("pocruisesRecentlyViewed", pageVal);
        else
            return false;
    }

    CookieController.addtoSavedCruises = function(newVal) {
        addToCookie("pocruises", newVal);
        CookieController.removefromRecentlyViewed(newVal);
    }

    CookieController.removefromSavedCruises = function(delVal) {
        removeFromCookie("pocruises", delVal);
    }

    CookieController.pageInSavedCruises = function(pageVal) {
        if (getCookie("pocruises"))
            return pageInCookie("pocruises", pageVal);
        else
            return false;
    }

    CookieController.countSavedCruises = function() {
        return countPagesInCookie("pocruises");
    }

})(window.CookieController = window.CookieController || {}, jQuery);
/* cookie controller class */