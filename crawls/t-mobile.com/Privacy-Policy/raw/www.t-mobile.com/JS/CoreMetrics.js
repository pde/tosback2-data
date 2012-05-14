//T-Mobile Wrapper JS to call Coremetrics
var CoreMetrics = new function() {

    this.name = "CoreMetrics";
    this.CustomAttributesColl = null;
    this.IsAvailable = false;

    //START: CR 56677 Spanish Coremetrics    
    this.SpanishCulture = "es.";
    this.SpanishPrefix = "ES:";
    this.spanishLangAttr = "ES";    
    this.LangLoc_ShopActionTag = 6;
    this.LangLoc_ProductView = 4;
    this.LangLoc_PageView = 10;
    this.LangLoc_Conversion = 1;
    this.LangLoc_Element = 2;

    //END: CR 56677 Spanish Coremetrics
    
    var MPTransArray = ['<!-- mp_trans -->', '<!-- mp_trans_disable_start -->', '<!-- mp_trans_disable_end -->'];


    //Coremetrics CONST
    this.Constants =
    {
        Initiation: 1,
        Completion: 2,
        AttributesDelimiter: "-_-",
        Delimiter: "|",
        Currency: "USD",
        PopUp: "POPUP",
        ManualLinkClickTag: "manual_cm_sp",
        WWWHome: "WWW:HOME",
        WWWPhones: "WWW:PHONES",
        WWWPhonesMBB: "WWW:PHONES:MOBILE BROADBAND",
        WWWShopPhones: "WWW:SHOP:PHONES",
        WWWShopPhonesVideoGalleryTab: "WWW:SHOP:PHONES:VIDEOGALLERYTAB",
        WWWShopPhonesVideoMarquee: "WWW:SHOP:PHONES:VIDEOMARQUEE",
        WWWShopPlans: "WWW:SHOP:PLANS",
        WWWShopAddOnsServices: "WWW:SHOP:ADDONS:SERVICES",
        WWWShopAddOnsAccessories: "WWW:SHOP:ADDONS:ACCESSORIES",

        WWWShopAddOns: "WWW:SHOP:ADDONS",
        WWWShopCartVersion: "WWW:SHOP:CART VERSION",
        WWW_: "WWW:",
        _VIDEO: ":VIDEO",
        WWWChooseServices_: "WWW:CHOOSE SERVICES:",
        WWWChooseAccessories_: "WWW:CHOOSE ACCESSORIES:",

	    WWWDataCalculator: "WWW:DATACALCULATOR",

        ProductPhoneTabsFooter_: "PRODUCT:PHONE:TABS:FOOTER:",
        ProductPhoneTabsHeader_: "PRODUCT:PHONE:TABS:HEADER:",
        ProductModalCart: "PRODUCT:MODAL CART"


    }
    //Coremetrics CONST


    this.AddPageViewTag = function(pageID, catagoryID, searchString, searchterm, attributes) {

        if (this.IsAvailable) {

            if (pageID == "")
                pageID = cG7.cM0[cm_ClientID];

            //START: CR 56677 Spanish Coremetrics            
            pageID = this.CheckSpanishCulture(pageID);
            catagoryID = this.CheckSpanishCulture(catagoryID);            
            attributes = this.SetSpanishLangAttr(attributes, this.LangLoc_PageView);
            //END: CR 56677 Spanish Coremetrics
            
            cmCreatePageviewTag(pageID, catagoryID, searchString, searchterm, attributes);
        }

    } // this.AddPageViewTag

    this.AddProductViewTag = function(productID, productName, catagoryID, attributes, virtualCatagoryID) {

        if (this.IsAvailable) {
            productID = this.StripMPTransComments(productID);
            productName = this.StripMPTransComments(productName);

            //START: CR 56677 Spanish Coremetrics            
            catagoryID = this.CheckSpanishCulture(catagoryID);
            attributes = this.SetSpanishLangAttr(attributes, this.LangLoc_ProductView);
            //END: CR 56677 Spanish Coremetrics

            cmCreateProductviewTag(productID, productName, catagoryID, attributes, virtualCatagoryID);
        }

    } // this.AddProductViewTag
    
    this.AddProductViewTag = function(productID, productName, catagoryID, attributes, virtualCatagoryID, pageID, IsPageView) {

        if (this.IsAvailable) {
            productID = this.StripMPTransComments(productID);
            productName = this.StripMPTransComments(productName);

            //START: CR 56677 Spanish Coremetrics            
            catagoryID = this.CheckSpanishCulture(catagoryID);
            attributes = this.SetSpanishLangAttr(attributes, this.LangLoc_ProductView);
            //END: CR 56677 Spanish Coremetrics

            cmCreateProductviewTagForPhoneDetail(productID, productName, catagoryID, attributes, virtualCatagoryID, pageID, IsPageView);
        }

    } // this.AddProductViewTag


    this.AddShopAction5Tag = function(productID, productName, qty, unitPrice, catagoryID, attributes) {

        if (this.IsAvailable) {
            if (unitPrice != null && parseFloat(unitPrice).toFixed) //if browser supports toFixed() method  
                unitPrice = parseFloat(unitPrice).toFixed(2).toString();

            productID = this.StripMPTransComments(productID);
            productName = this.StripMPTransComments(productName);

            //START: CR 56677 Spanish Coremetrics            
	        catagoryID = this.CheckSpanishCulture(catagoryID);
	        attributes = this.SetSpanishLangAttr(attributes, this.LangLoc_ShopActionTag);
	        //END: CR 56677 Spanish Coremetrics

            cmCreateShopAction5Tag(productID, productName, qty, unitPrice, catagoryID, attributes);
        }

    } // this.AddShopAction5Tag

    this.DisplayShopAction5Tag = function() {

        if (this.IsAvailable)
            cmDisplayShop5s();

    } // this.DisplayShopAction5Tag

    this.AddShopAction9Tag = function(productID, productName, qty, unitPrice, customerID, orderID, orderSubTotal, catagoryID, attributes) {

        if (this.IsAvailable) {
            if (unitPrice != null && parseFloat(unitPrice).toFixed) //if browser supports toFixed() method  
                unitPrice = parseFloat(unitPrice).toFixed(2).toString();
            if (orderSubTotal != null && parseFloat(orderSubTotal).toFixed) //if browser supports toFixed() method
                orderSubTotal = parseFloat(orderSubTotal).toFixed(2).toString();

            productID = this.StripMPTransComments(productID);
            productName = this.StripMPTransComments(productName);

            cmCreateShopAction9Tag(productID		// __pr
	                        , productName			// __pm
							, qty				    // __qt Quantity
							, unitPrice			    // __bp Base/Unit Price
							, customerID			// __cd
							, orderID               // __on Order Number
							, orderSubTotal			// __tr Order Subtotal
							, catagoryID			// __ cg
							, ""		            // WSC "Store ID" value
							, this.Constants.Currency	                // ISO4217 currency value
							, ""					// account name
							, ""				    // contract_name
						    , ""                    // no longer used but maintained for param order
							, null				    // allows client to override WSC auto-catID value with extraparm1
							, ""
				 );
        }

    } // this.AddShopAction9Tag

    this.DisplayShopAction9Tag = function() {

        if (this.IsAvailable)
            cmDisplayShop9s();

    } // this.DisplayShopAction5Tag

    this.AddOrderTag = function(orderID, orderSubtotal, shippingCost, custID, custCity, custState, custZip, promotionName, promotionDiscount, promotionCode, attributes) {

        if (this.IsAvailable) {
            if (orderSubtotal != null && parseFloat(orderSubtotal).toFixed) //if browser supports toFixed() method  
                orderSubtotal = parseFloat(orderSubtotal).toFixed(2).toString();

            cmCreateOrderTag(orderID
	                        , orderSubtotal
							, shippingCost
							, custID
							, custCity
							, custState
							, custZip
							, "" //storeID
							, this.Constants.Currency
							, promotionName
							, promotionDiscount
							, promotionCode
							, attributes

				 );
        }

    } // this.AddOrderTag



    this.AddRegistrationTag = function(custID, custEmail, custCity, custState, custZip, custCountry, attributes) {

        if (this.IsAvailable)
            cmCreateRegistrationTag(custID, custEmail, custCity, custState, custZip, custCountry, attributes);

    } // this.AddRegistrationTag


    this.AddConversionEventTag = function(eventID, actionType, eventCatagoryID, points, attributes) {

        if (this.IsAvailable)
            cmCreateConversionEventTag(eventID, actionType, eventCatagoryID, points, attributes);

    } // this.AddConversionEventTag

    this.ElementTagCall = function(innerHTML, attributes) 
    {                
        if (location.href.toLowerCase().indexOf("/services/") > 0){            
            this.AddElementTag(this.Constants.WWWChooseServices_ + innerHTML, this.Constants.WWWShopAddOns, attributes);
            }
        else{            
            this.AddElementTag(this.Constants.WWWChooseAccessories_ + innerHTML, this.Constants.WWWShopAddOns, attributes);
            }
    } // this.ElementTagCall

    this.AddElementTag = function(elementID, elementCategory, attributes) {

        if (this.IsAvailable){        
            //START: CR 56677 Spanish Coremetrics
            elementID = this.CheckSpanishCulture(elementID);
            elementCategory = this.CheckSpanishCulture(elementCategory);
            attributes = this.SetSpanishLangAttr(attributes, this.LangLoc_Element);
            //END: CR 56677 Spanish Coremetrics
            cmCreateElementTag(elementID, elementCategory, attributes);
           }
        }// this.AddElementTag
        
        this.ManualLinkTag = function(attributes) {
        //TODO: any additional check, modifications to data, before calling coremetrics..
        if (this.IsAvailable)
            cmCreateManualLinkClickTag(attributes, cG7.cM0[cm_ClientID]);
            }
            
        this.ManualLinkTag = function(href, linkName) {
        if (this.IsAvailable)
            cmCreateManualLinkClickTag(href, linkName, cG7.cM0[cm_ClientID]);
            } // this.ManualLinkTag


    this.ManualImpressionBannerCall = function(index) {

        if (!this.IsAvailable) return;

        try {

            var pagetype = "";
            var promogroup = "";
            var promoname = "";
            var manual_cm_sp_tag = "";
            var cta = "";
            var div = "";

            if ($("#hdnPageName").val() == "homepage")
                div = $('#main-offers').children('.slide')[index];
            else
                div = $('.cmetrics')[index];

            promoname = CoreMetrics.GetPromoName(div);

            pagetype = ($("#hdnIsCookied").val() == "true") ? "cookied" : "def";

            promogroup = "MQ" + "_" + "A" + (index + 1) + "_" + pagetype;

            promoname = (promoname != "") ? promoname : ("Marquee_A_" + pagetype);

            var manualLinkClickTag = this.Constants.ManualLinkClickTag;

            $(div).find("a").each(function(index) {

                var ctaText = $(this)[0].children[0].innerHTML;

                if (ctaText != null) {
                    ctaText = ctaText.replace(/ /g, "_");
                    if (index > 0)
                        ctaText = CoreMetrics.Constants.Delimiter + ctaText;
                    cta += ctaText;
                }

            });

            manual_cm_sp_tag = promogroup + CoreMetrics.Constants.AttributesDelimiter + promoname + CoreMetrics.Constants.AttributesDelimiter + cta;

            this.ManualImpressionTag(manual_cm_sp_tag);

        }
        catch (ignored) { }

    } // this.ManualImpressionBannerCall


    this.ManualImpressionTag = function(attributes) {

        if (this.IsAvailable)
            cmCreateManualImpressionTag(cG7.cM0[cm_ClientID], attributes);

    } // this.ManualImpressionTag


    this.AttributeDelimiterstring = function(quantity) {
        var str = "";

        for (var i = 0; i < quantity; ++i) {
            str += this.Constants.AttributesDelimiter;
        }

        return str;

    } // this.Delimiterstring

    this.AddCustomAttributes = function() {

        if (!this.IsAvailable || this.CustomAttributesColl == null)
            return;

        try {
            $('a').each(function() {//get all anchors on this page

                var id = $(this)[0].id; //get the id

                $(CoreMetrics.CustomAttributesColl).each(function() {
                    var ancID = $(this)[0].Key; //check against the config entry, if present add the core metrics custom attribute..
                    if (id == ancID) {
                        $("#" + id).attr($(this)[0].AttributeName, $(this)[0].AttributeValue);
                    }
                });

            });
        }
        catch (ignored) { }

    } // this.AddCustomAttributes

    this.LinkImpressionTag = function(index){
   
    try{
           var li = $('#contentlist').children('li')[index];
           index = parseInt(index);
           var promogroup = "";
           var promoname = "";
           var manual_cm_sp_tag = "";
           var pagetype = "";
            
            pagetype = ($("#hdnIsCookied").val() == "true") ? "cookied" : "def";
            
            promoname = CoreMetrics.GetPromoName(li);
            promogroup = "MQ" + "_" + "A" + (index + 1) + "_" + pagetype;
            promoname = (promoname != "") ? promoname : ("Marquee_A_" + pagetype);

            $(li).find("a").each(function() {  
                
                var cta = $(this)[0].innerText; 
                if(cta == undefined)
                    cta = $(this)[0].text;       

                if (cta) {
                    cta = cta.replace(/ /g, "_");
                }
                manual_cm_sp_tag = promogroup + CoreMetrics.Constants.AttributesDelimiter + promoname + CoreMetrics.Constants.AttributesDelimiter + cta;
                CoreMetrics.ManualImpressionTag(manual_cm_sp_tag);
            }); 
        }
        catch (e) { }
        
    }  //LinkImpressionTag
    
    this.AddPromotions = function(page, pagetype) {

        if (!this.IsAvailable) return;

        if (page == "homepage") {
            this.HomePagePromoTracking(pagetype);
        }
        else if (page == "shoppage") {
            this.ShopPagePromoTracking(pagetype);
        }
        else if (page == "deals") {
            this.DealsPagePromoTracking(pagetype);
        }

    } //Add Promotions

    this.HomePagePromoTracking = function(pagetype) {

        try {
            var promogroup = "";
            var promoname = "";
            var manual_cm_sp_tag = "";

            $('#contentlist').children('li').each(function(index) {
                promoname = CoreMetrics.GetPromoName(this);
                promogroup = "MQ" + "_" + "A" + (index + 1) + "_" + pagetype;
                promoname = (promoname != "") ? promoname : ("Marquee_A_" + pagetype);
                var manualLinkClickTag = CoreMetrics.Constants.ManualLinkClickTag;                
                 if(index == 0){
                 CoreMetrics.AddImpression(this, promogroup, promoname);
                 }
            }); //contentlist

            $('#side-offers').children('div').each(function(index) {
                promoname = CoreMetrics.GetPromoName(this);
                promogroup = "MQ" + "_" + "C" + "_" + pagetype;
                promoname = (promoname != "") ? promoname : ("Marquee_C_" + pagetype);
                var manualLinkClickTag = CoreMetrics.Constants.ManualLinkClickTag;
                CoreMetrics.AddImpression(this, promogroup, promoname);
            }); //side offers

            $(".btmTiles").each(function(index) {
                promoname = CoreMetrics.GetPromoName(this);
                switch (index) {
                    case 0:
                        promogroup = "TileA" + "_" + pagetype;
                        break;
                    case 1:
                        promogroup = "TileB" + "_" + pagetype;
                        break;
                    case 2:
                        promogroup = "TileC" + "_" + pagetype;
                        break;
                    case 3:
                        promogroup = "TileD" + "_" + pagetype;
                        break;
                    case 4:
                        promogroup = "TileE" + "_" + pagetype;
                        break;
                    default:
                        promogroup = "Tile" + "_" + pagetype;
                }
                promoname = (promoname != "") ? promoname : ("Tile_" + pagetype);
                 CoreMetrics.AddImpression(this, promogroup, promoname);

            }); //bottom offer tiles
            
                $(".btmFTiles").each(function(index) {
                promoname = CoreMetrics.GetPromoName(this);
                switch (index) {
                    case 0:
                        promogroup = "TileF1" + "_" + pagetype;
                        break;
                    case 1:
                        promogroup = "TileF2" + "_" + pagetype;
                        break;
                    default:
                        promogroup = "Tile" + "_" + pagetype;
                }
                 promoname = (promoname != "") ? promoname : ("Tile_" + pagetype);
                 CoreMetrics.AddImpression(this, promogroup, promoname);
                }); //bottom F tiles
                   
                $(".btmNaviTiles").each(function(index) {
                promoname = CoreMetrics.GetPromoName(this);
                switch (index) {
                    case 0:
                        promogroup = "NavA" + "_" + pagetype;
                        break;
                    case 1:
                        promogroup = "NavB" + "_" + pagetype;
                        break;
                   case 2:
                        promogroup = "NavC" + "_" + pagetype;
                        break;
                        } 
                 promoname = (promoname != "") ? promoname : ("Nav_" + pagetype);
                 CoreMetrics.AddImpression(this, promogroup, promoname);
                }); //bottom Nav tiles   
        }
        catch (e) { }

    } //this.HomePagePromoTracking
    
    this.AddImpression = function(div, promogroup, promoname) {

        var manual_cm_sp_tag = "";
        var manualLinkClickTag = CoreMetrics.Constants.ManualLinkClickTag;

        $(div).find("a").each(function() {
            var cta = $(this)[0].innerText; 
                if(cta == undefined)
                    cta = $(this)[0].text;
            if (cta) {
                cta = cta.replace(/ /g, "_");
            }
            manual_cm_sp_tag = promogroup + CoreMetrics.Constants.AttributesDelimiter + promoname + CoreMetrics.Constants.AttributesDelimiter + cta;

            CoreMetrics.ManualImpressionTag(manual_cm_sp_tag);

        });
    } //AddImpression

    this.ShopPagePromoTracking = function(pagetype) {
        
        try{
            var promogroup = "";
            var promoname = "";
            var manual_cm_sp_tag = "";

            $('#contentlist').children('li').each(function(index) {

                promoname = CoreMetrics.GetPromoName(this);
                promogroup = "MQ" + "_" + "A" + (index + 1) + "_" + pagetype;
                promoname = (promoname != "") ? promoname : ("Marquee_A_" + pagetype);
                var manualLinkClickTag = CoreMetrics.Constants.ManualLinkClickTag;
                CoreMetrics.AddAttributes(this, promogroup, promoname);
                
               if(index == 0){
                    $(this).find("a").each(function() {
                        var cta = $(this)[0].innerText; 
                            if(cta == undefined)
                                cta = $(this)[0].text;    
                        if (cta){
                            cta = cta.replace(/ /g, "_");
                        }
                        manual_cm_sp_tag = promogroup + CoreMetrics.Constants.AttributesDelimiter + promoname + CoreMetrics.Constants.AttributesDelimiter + cta;
                        CoreMetrics.ManualImpressionTag(manual_cm_sp_tag);
                    }); 
                }

            }); //contentlist  
            
            if(pagetype=="cookied"){
                var manual_cm_sp = $("#btnMyTMOLogin")[0].attributes["manual_cm_sp"].value;
                if(manual_cm_sp!=null){
                    CoreMetrics.ManualImpressionTag(manual_cm_sp);
                }
            } //MyT-mobile Login
            
            if(pagetype=="cookied"){
                var manual_cm_sp = $("#lnkSeeWhatNew")[0].attributes["manual_cm_sp"].value;
                if(manual_cm_sp!=null){
                    CoreMetrics.ManualImpressionTag(manual_cm_sp);
                }
            } //Cookied Marquee B
            
            $('.DealsPhonesProduct').children('ul').each(function(index) {  
                var ulCount = $('.DealsPhonesProduct').children('ul').length;                
                promoname = CoreMetrics.GetPromoName(this);
                    if(promoname != "")
                        promoname = promoname.replace(/\s/g, "");
                if(ulCount > 2){        
                    switch (index) {
                        case 0:
                            promogroup = "PROD1" + "_" + pagetype;
                            break;
                        case 1:
                            promogroup = "PROD2" + "_" + pagetype;
                            break;
                        case 2:
                            promogroup = "PROD3" + "_" + pagetype;
                            break;    
                        case 3:
                            promogroup = "PROD4" + "_" + pagetype;
                            break; 
                        default:
                            promogroup = "PROD" + "_" + pagetype;
                    }
                }
                else{                
                    switch (index) {
                        case 0:
                            promogroup = "PROD3" + "_" + pagetype;
                            break;
                        case 1:
                            promogroup = "PROD4" + "_" + pagetype;
                            break;
                        default:
                            promogroup = "PROD" + "_" + pagetype;
                    }
                } 
                
                promoname = (promoname != "") ? promoname : ("PROD_" + pagetype);
                var manualLinkClickTag = CoreMetrics.Constants.ManualLinkClickTag;
                CoreMetrics.AddAttributes(this, promogroup, promoname);

                if (index == 0)
                    CoreMetrics.AddAttributesToButton(this, promogroup, promoname);  
                    
                $(this).find("a").each(function() {  
                    
                    var cta = $(this)[0].innerText; 
                    if(cta == undefined)
                        cta = $(this)[0].text;       

                    if (cta) {
                        cta = cta.replace(/ /g, "_");
                    }
                    manual_cm_sp_tag = promogroup + CoreMetrics.Constants.AttributesDelimiter + promoname + CoreMetrics.Constants.AttributesDelimiter + cta;
                    CoreMetrics.ManualImpressionTag(manual_cm_sp_tag);
                }); 
            
            });//Deals/Phones  
                    
            $('#trPlanAdTile').children('td').each(function(index) {
                promoname = CoreMetrics.GetPromoName(this);

                switch (index) {
                    case 0:
                        promogroup = "TILEA" + "_" + pagetype;
                        break;
                    case 1:
                        promogroup = "TILEB" + "_" + pagetype;
                        break;
                    default:
                        promogroup = "TILE" + "_" + pagetype;
                } 
                
                promoname = (promoname != "") ? promoname : ("TILE_" + pagetype);
                var manualLinkClickTag = CoreMetrics.Constants.ManualLinkClickTag;
                CoreMetrics.AddAttributes(this, promogroup, promoname);

                if (index == 0)
                    CoreMetrics.AddAttributesToButton(this, promogroup, promoname);  
                
                $(this).find("a").each(function() {  
                    
                    var cta = $(this)[0].innerText; 
                    if(cta == undefined)
                        cta = $(this)[0].text;       

                    if (cta) {
                        cta = cta.replace(/ /g, "_");
                    }
                    manual_cm_sp_tag = promogroup + CoreMetrics.Constants.AttributesDelimiter + promoname + CoreMetrics.Constants.AttributesDelimiter + cta;
                    CoreMetrics.ManualImpressionTag(manual_cm_sp_tag);
                });
                
            });//Plan AdTile
            /*
            $('#trGeneralAddTileNavigation').children('td').each(function(index) {
                promoname = CoreMetrics.GetPromoName(this);

                switch (index) {
                    case 0:
                        promogroup = "NAV_TILEA" + "_" + pagetype;
                        break;
                    case 1:
                        promogroup = "NAV_TILEB" + "_" + pagetype;
                        break;
                    case 2:
                        promogroup = "NAV_TILEC" + "_" + pagetype;
                        break;
                    default:
                        promogroup = "NAV_TILE" + "_" + pagetype;
                } 
                
                promoname = (promoname != "") ? promoname : ("NAV_TILE_" + pagetype);
                var manualLinkClickTag = CoreMetrics.Constants.ManualLinkClickTag;
                CoreMetrics.AddAttributes(this, promogroup, promoname);

                if (index == 0)
                    CoreMetrics.AddAttributesToButton(this, promogroup, promoname);  
                
//                $(this).find("a").each(function() {  
//                    
//                    var cta = $(this)[0].innerText; 
//                    if(cta == undefined)
//                        cta = $(this)[0].text;       

//                    if (cta) {
//                        cta = cta.replace(/ /g, "_");
//                    }
//                    manual_cm_sp_tag = promogroup + CoreMetrics.Constants.AttributesDelimiter + promoname + CoreMetrics.Constants.AttributesDelimiter + cta;
//                    CoreMetrics.ManualImpressionTag(manual_cm_sp_tag);
//                });
                          
            });//General AddTile Navigation */
        }
        catch (e) { }
    } //this.ShopPagePromoTracking

    this.DealsPagePromoTracking = function(pagetype) {

        var promogroup = "";
        var promoname = "";
        var manual_cm_sp_tag = "";

        $('.cmetrics').each(function(index) {

            promoname = CoreMetrics.GetPromoName(this);
            promogroup = "MQ" + "_" + "A" + (index + 1) + "_" + pagetype;
            promoname = (promoname != "") ? promoname : ("Marquee_A_" + pagetype);
            var manualLinkClickTag = CoreMetrics.Constants.ManualLinkClickTag;
            CoreMetrics.AddAttributes(this, promogroup, promoname);

        }); //contentlist


        $('.cppo-boxes ul').children('li').each(function(index) {

            promoname = CoreMetrics.GetPromoName(this);

            switch (index) {
                case 0:
                    promogroup = "TileA" + "_" + pagetype;
                    break;
                case 1:
                    promogroup = "TileB" + "_" + pagetype;
                    break;
                case 2:
                    promogroup = "TileC" + "_" + pagetype;
                    break;
                default:
                    promogroup = "Tile" + "_" + pagetype;

            }

            promoname = (promoname != "") ? promoname : ("Tile_" + pagetype);
            var manualLinkClickTag = CoreMetrics.Constants.ManualLinkClickTag;
            CoreMetrics.AddAttributes(this, promogroup, promoname);

        }); //bottom offer tiles

    } //this.DealsPagePromoTracking

    this.AddAttributes = function(div, promogroup, promoname) {

        var manual_cm_sp_tag = "";
        var manualLinkClickTag = CoreMetrics.Constants.ManualLinkClickTag;

        $(div).find("a").each(function() {
            var cta = $(this)[0].innerText; 
                if(cta == undefined)
                    cta = $(this)[0].text;
            if (cta) {
                cta = cta.replace(/ /g, "_");
            }
            manual_cm_sp_tag = promogroup + CoreMetrics.Constants.AttributesDelimiter + promoname + CoreMetrics.Constants.AttributesDelimiter + cta;

            /*Adding attribute "manual_cm_sp" to all the anchor tags */
            if ($(this).attr(manualLinkClickTag) == null && cta != "")
                $(this).attr(manualLinkClickTag, manual_cm_sp_tag);

        });
    } //AddAttribute

    this.AddAttributesToButton = function(div, promogroup, promoname) {

        var manual_cm_sp_tag = "";
        var manualLinkClickTag = CoreMetrics.Constants.ManualLinkClickTag;

        $(div).find("button").each(function() {

            var cta = $(this)[0].innerText; 
                if(cta == undefined)
                    cta = $(this)[0].text;
            if (cta) {
                cta = cta.replace(/ /g, "_");
            }
            manual_cm_sp_tag = promogroup + CoreMetrics.Constants.AttributesDelimiter + promoname + CoreMetrics.Constants.AttributesDelimiter + cta;
            /*Adding attribute "manual_cm_sp" to all the anchor tags */
            if ($(this).attr(manualLinkClickTag) == null)
                $(this).attr(manualLinkClickTag, manual_cm_sp_tag);

        });
    } //AddAttribute

    this.GetPromoName = function(div) {

        //Promo Name, try to get it from promoname attribute in asset div
        var promoname = "";
        if (div.attributes != null && div.attributes["promoname"] != null) {
            promoname = div.attributes["promoname"].value;
        }
        else {
            $(div).find('div').each(function() {
                var thisdiv = this;
                if (thisdiv.attributes != null && thisdiv.attributes["promoname"] != null) {
                    promoname = thisdiv.attributes["promoname"].value;
                    return false;
                }
            });
        }

        //Promo Name not found in asset, try to get it from div title
        if (promoname == "") {

            if (div.title != null && div.title != "") {
                promoname = div.title;
                promoname = promoname.replace(/ /g, "_");
            }
            else {
                $(div).find('div').each(function() {

                    var thisdiv = this;
                    if (thisdiv.title != null && thisdiv.title != "") {
                        promoname = thisdiv.title;
                        promoname = promoname.replace(/ /g, "_");
                        return false;
                    }
                });
            }
        } //if (promoname == "") 

        return promoname;
    }

    this.StripMPTransComments = function(name) {

        for (var m in MPTransArray) {
            var mptrans = MPTransArray[m];
            if (name.indexOf(mptrans) > -1)
                name = name.replace(new RegExp(mptrans, "g"), "");
        }

        return name;

    } //this.StripMPTransComments


   //START: CR 56677 Spanish Coremetrics

    this.CheckSpanishCulture = function(id) {
    
        var hostName = document.location.hostname;
        if (hostName.toLowerCase().indexOf(CoreMetrics.SpanishCulture) != -1) {
            id = CoreMetrics.SpanishPrefix + id;
        }
        
        return id;
    }

    this.SetSpanishLangAttr = function(attribute, location) {      
       
         var strattribute = attribute;
        
         location = (location > 0) ? location - 1 : location;
         var hostName = document.location.hostname;
         
         if (hostName.toLowerCase().indexOf(CoreMetrics.SpanishCulture) != -1) {
            if (attribute != null && attribute != "") {    
                    var splitAttribute = attribute.split(CoreMetrics.Constants.AttributesDelimiter);
                                                    
                    if(location > splitAttribute.length){
                        for(i = splitAttribute.length; i< location; i++)
                        {
                            splitAttribute[i] = '';
                        }
                    }
                    
                    splitAttribute[location]= CoreMetrics.spanishLangAttr;
                    for (var i = 0; i < splitAttribute.length; i++)  { 
                        if(i==0)
                            strattribute = splitAttribute[i];
                        else
                            strattribute = strattribute + CoreMetrics.Constants.AttributesDelimiter + splitAttribute[i];            
                    }              
            }            
            else {            
                for (var i = 0; i < location; i++)  { 
                    if(i == 0)
                        strattribute = '';                
                    else
                        strattribute = strattribute + CoreMetrics.Constants.AttributesDelimiter + '';            
                }
                strattribute = strattribute + CoreMetrics.Constants.AttributesDelimiter + CoreMetrics.spanishLangAttr;
            }   
        }     
        return strattribute;
    }
    //END: CR 56677 Spanish Coremetrics


}//CoreMetrics