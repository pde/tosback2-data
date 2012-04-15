//These are the handlers for the search nav box on the left of the product pages and the home page.

// It is expected that pages will set these vars as appropriate, if current values are known.
var currGender = "";
var currProdType = "";
var currCatID = "";
var currBrandID = "";
var currSize = "";
var currColorCode = "";
var currTag = "";

//Defaults for required vars (where applicable).
var defaultProdType = "shoes";

function resetCommonVariablesToLowerCase() {
    if (currGender != null) { currGender = currGender.toLowerCase(); }
    if (currProdType != null) { currProdType = currProdType.toLowerCase(); }
    if (currCatID != null) { currCatID = currCatID.toLowerCase(); }
    if (currBrandID != null) { currBrandID = currBrandID.toLowerCase(); }
    if (currSize != null) { currSize = currSize.toLowerCase(); }
    if (currColorCode != null) { currColorCode = currColorCode.toLowerCase(); }
    if (currTag != null) { currTag = currTag.toLowerCase(); }
}

function toggleShop(){
    var dvshopNav = document.getElementById("shopNav");
    if (dvshopNav) {
	    if(dvshopNav.style.visibility == "visible"){
	        //NOOP, per genesco
    	}else{
            dvshopNav.style.visibility = "visible";	
	    }
	}
}

//Convenience function: simply calls openSearch for the specified prodType, and the current gender.
// Unless the passed prodType is the same as the current ProdType: in that case, it's a no-op.
function openSubSearch(prodType) {
    //Normalize to lowercase for string compares.
    resetCommonVariablesToLowerCase();
    if (prodType != null) { prodType = prodType.toLowerCase(); }

    if (prodType.toLowerCase() != currProdType) {
        //We're switching productTypes: forget the current criteria.
        clearCurrentCriteria();
        //Rebuild the search panel.
        openSearch(currGender, prodType, false);
    }
}

//For the "sale" tab, we show the user the product listings immed.  If we're switching product types, forget the
// existing criteria - otherwise, just re-load the page.
function onSaleTabClick() {
    if(currProdType != null) {
        if (currProdType.toLowerCase() != "sale") {
            //We're switching productTypes: forget the current criteria.
            clearCurrentCriteria();
        }
        //Redirect to the sale page.
        var listingUrl = buildListingUrl("/product_listing.aspx", currGender, "sale", currCatID, currBrandID, currSize, currColorCode);
        if (listingUrl != "") {
            window.location = listingUrl;
        }
    }
}

//Opens (makes visible) the search panel and makes active the tab for the specified productType.
// If the overall panel is already open, and the user clicks the currently-active gender link, 
// this function hides the search panel.  Params:
//   - gender: the gender to be shown.
//   - prodType: the productType to be shown.
//   - showHide: boolean flag/indicator; iif TRUE, this function will make the search/nav panel visible
//     (unless the passed gender is the current gender - in that case we hide the panel); if FALSE, this
//     function will leave the panel in its current shown/hidden state.  It is expected that the gender
//     links themselves will pass TRUE; other sub-nav links will pass FALSE.
function openSearch(gender, prodType, showHide) {
    var dvSearchDiv = document.getElementById("dvShopNav");
    var dvSrchStyles = document.getElementById("dvSrchStyles");
    var dvSrchBrands = document.getElementById("dvSrchBrands");
    var dvSrchSizes = document.getElementById("dvSrchSizes");
    var dvSrchColors = document.getElementById("dvSrchColors");
    
    //Normalize to lowercase for string compares.
    resetCommonVariablesToLowerCase();
    if (gender != null) { gender = gender.toLowerCase(); }
    if (prodType != null) { prodType = prodType.toLowerCase(); }
    
    if((dvSearchDiv.style.visibility=="visible")&&(currGender == gender)&&(true == showHide)){
        //The panel is open & the user clicked the currently-active gender.  Close the panel.
        dvSearchDiv.style.visibility = "hidden";
        //set sub-elements to be empty.
        if (dvSrchStyles) dvSrchStyles.innerHTML = "";
        if (dvSrchBrands) dvSrchBrands.innerHTML = "";
        if (dvSrchSizes) dvSrchSizes.innerHTML = "";
        if (dvSrchColors) dvSrchColors.innerHTML = "";
        //set gender search icons to be "unlocked"
        setGenderSearchIcons(gender);
        //we've closed the search panel: forget the current criteria.  COMMENTED OUT - I don't think we want to do that.
        //clearCurrentCriteria();
    }else{
        if (gender != currGender) {
            //We're changing gender: forget the current search criteria. Also forget the currentProdType, so we revert
            // back to the default prodType ("shoes")
            clearCurrentCriteria();
            currProdType = "";
            prodType = "";
        } else {
            //OK, gender is the same, but are we changing prodType?  If so, forget the current criteria.
            if (currProdType != prodType) {
                clearCurrentCriteria();
            }
        }
    
        //We need to re-draw the panel.  If no prodType was specified, use the current one.  if no current one, use the default.
        if (prodType==null || prodType=="") {
            if (currProdType == null || currProdType == "") {
                prodType = defaultProdType;
            } else {
                prodType = currProdType;
            }
        }
        
    	//build the url
        var url = "/ajx/getsearchcats.aspx?s=JNY&g="+gender+"&p="+prodType;
        xmlGetData(url,fcnDrawSearchBox);
        
        //set gender search icons to be "locked"
        setGenderSearchIcons(gender, true);
        
        //set the subSearch tab images.
        setProdTypeSubSearchIcons(prodType);
    }
    
    //Finally, remember the current settings.  If no prodType was passed, use the default.
    // Gender should never be null, but just in case, make it empty string.
    if (gender == null) {
        currGender = "";
    }else{
        currGender = gender;
    }
    if (prodType == null) {
        currProdType = defaultProdType;
    }else{
        currProdType = prodType;
    }
}

//This function sets the search sub-tab images.  The passed prodType image becomes "on",
// the others are set to "off".  The "on" type's mouseout image is also set to "ON", effectively
// locking it to the "on" position.
function setProdTypeSubSearchIcons(prodType) {
    var shoesImg = MM_findObj("imgSubSrchShoes");
    var appImg = MM_findObj("imgSubSrchApp");
    var saleImg = MM_findObj("imgSubSrchSale");
    var newImg = MM_findObj("imgSubSrchNew");
    var shoesImgSrc_off = "/images/jy_snav_cat_shoes.gif";
    var shoesImgSrc_on  = "/images/jy_snav_cat_shoes_on.gif";
    var appImgSrc_off   = "/images/jy_snav_cat_apparel.gif";
    var appImgSrc_on    = "/images/jy_snav_cat_apparel_on.gif";
    var saleImgSrc_off  = "/images/jy_snav_cat_sale.gif";
    var saleImgSrc_on   = "/images/jy_snav_cat_sale_on.gif";
    var newImgSrc_off   = "/images/jy_snav_cat_new.gif";
    var newImgSrc_on    = "/images/jy_snav_cat_new_on.gif";
    
    //Normalize to lowercase for string compares.
    resetCommonVariablesToLowerCase();
    if (prodType != null) { prodType = prodType.toLowerCase(); }

    //We must have all 4 images to proceed
    if (shoesImg && appImg && saleImg && newImg) {
        shoesImg.src = (prodType=="shoes") ? shoesImgSrc_on : shoesImgSrc_off;
        shoesImg.oSrc = (prodType=="shoes") ? shoesImgSrc_on : shoesImgSrc_off;
        appImg.src   = (prodType=="app")   ? appImgSrc_on   : appImgSrc_off;
        appImg.oSrc   = (prodType=="app")   ? appImgSrc_on   : appImgSrc_off;
        saleImg.src  = (prodType=="sale")  ? saleImgSrc_on  : saleImgSrc_off;
        saleImg.oSrc  = (prodType=="sale")  ? saleImgSrc_on  : saleImgSrc_off;
        newImg.src   = (prodType=="new")   ? newImgSrc_on   : newImgSrc_off;
        newImg.oSrc   = (prodType=="new")   ? newImgSrc_on   : newImgSrc_off;
    }
}

//This function set the specified gender to "on" and the other one to "off".  If lockGender==true,
// it will also set the specified gender's mouseout image to "on", effectively locking it on.
function setGenderSearchIcons(gender, lockGender) {
    //Normalize to lowercase for string compares.
    resetCommonVariablesToLowerCase();
    if (gender != null) { gender = gender.toLowerCase(); }

    //If gender is null or empty, short-circuit out.
    if (gender == null || gender == "") return;

    var guysImg = MM_findObj("imgsrchMen");
    var girlsImg = MM_findObj("imgsrchWomen");
    var guysImgSrc_on   = "/images/jy_snav_men_on.gif";
    var guysImgSrc_off  = "/images/jy_snav_men.gif";
    var girlsImgSrc_on  = "/images/jy_snav_women_on.gif";
    var girlsImgSrc_off = "/images/jy_snav_women.gif";
    
    //We must have both images to proceed.
    if (guysImg && girlsImg){
        if (gender == "guys") {
            //Set guys to on and girls to off.  Set girls mouseout to off.
            guysImg.src = guysImgSrc_on;
            girlsImg.src = girlsImgSrc_off;
            girlsImg.oSrc = girlsImgSrc_off;
            //set guys mouseout to on or off, depending on whether we're locking it.
            if (lockGender) {
                guysImg.oSrc = guysImgSrc_on;
            } else {
                guysImg.oSrc = guysImgSrc_off;
            }
        } else if (gender == "girls") {
            //Set girls to on and guys to off.  Set guys mouseout to off.
            girlsImg.src = girlsImgSrc_on;
            guysImg.src = guysImgSrc_off;
            guysImg.oSrc = guysImgSrc_off;
            //set girls mouseout to on or off, depending on whether we're locking it.
            if (lockGender) {
                girlsImg.oSrc = girlsImgSrc_on;
            } else {
                girlsImg.oSrc = girlsImgSrc_off;
            }
        }
    }
}

// Convenience function to clear current search criteria.  Does NOT clear current gender or productType.
function clearCurrentCriteria() {
    currCatID = "";
    currBrandID = "";
    currSize = "";
    currColorCode = "";
}

//This function is called any time the user clicks a criteria element.  It toggles the specified
// criterion on or off, builds the product listing URL, and redirects to it.  Exception: if it
// toggles the specified criterion off, and that results in there being NO remaining criteria,
// the redirect is suppressed: we don't want to request a product listing with no criteria.
// This function also updates the "current" variables, as appropriate.  Params:
//   anchor: the DOM element itself - essential, so this functon can modify it accordingly.
//   critType: "style", "brand", "size", or "color".
//   critIdentifier: the identifying element of the criterion: CatID, BrandID, Size, or ColorCode (name).
function toggleCriterionSelection(anchor, critType, critIdentifier) {
    switch (critType) {

        case "style":
            if (anchor.className == "shopNavSelectedCrit") {
                //We're deselecting the specified item
                currCatID = "";
                anchor.className = "shopNavCrit"; 
            } else {
                //We're selecting the specified item
                currCatID = critIdentifier;
                anchor.className = "shopNavSelectedCrit"; 
            }
            break;
            
        case "brand":
            if (anchor.className == "shopNavSelectedCrit") {
                //We're deselecting the specified item
                currBrandID = "";
                anchor.className = "shopNavCrit"; 
            } else {
                //We're selecting the specified item
                currBrandID = critIdentifier;
                anchor.className = "shopNavSelectedCrit"; 
            }
            break;
         
        case "size":
            if (anchor.className == "shopNavSelectedCrit") {
                //We're deselecting the specified item
                currSize = "";
                anchor.className = "shopNavCrit"; 
            } else {
                //We're selecting the specified item
                currSize = critIdentifier;
                anchor.className = "shopNavSelectedCrit"; 
            }
            break;
            
        case "color":
            if (anchor.className == "shopNavSelectedColorLink") {
                //We're deselecting the specified item
                currColorCode = "";
                anchor.className = "shopNavColorLink"; 
            } else {
                //We're selecting the specified item
                currColorCode = critIdentifier;
                anchor.className = "shopNavSelectedColorLink"; 
            }
            break;
    } //switch
    
    //Normalize to lowercase before constructing URL.
    resetCommonVariablesToLowerCase();
    
    //If we have a valid URL, redirect to it.
    var listingUrl = buildListingUrl("/product_listing.aspx", currGender, currProdType, currCatID, currBrandID, currSize, currColorCode);
    if (listingUrl != "") {
        window.location = listingUrl;
    }
    
    //In any case, return false to suppress the HREF.
    return false;
}

//This is a callback from the AJAX request /ajx/getsearchcats.aspx.  It assumes the objJSONresult
// variable has been set.
function fcnDrawSearchBox(objJSONresult) {
    var strHTML;
    
    //Normalize to lowercase for string comparisons.
    resetCommonVariablesToLowerCase();
    
    //start the cart
    var i;
    if (objJSONresult) {
        //we have data, load the arrays
        var objStyles = objJSONresult.styles;
        var objBrands = objJSONresult.brands;
        var objSizes = objJSONresult.sizes;
        var objColors = objJSONresult.colors;
            
        //alert(objJSONresult.sizes);
        
        //if we have styles, draw them
        if (objStyles) {
            if (objStyles.length == 0) {
               strHTML = "";
            } else {
                strHTML = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr align=\"center\"><td><img alt=\"Styles\" height=\"12\" src=\"/images/jy_snav_hd_styles.gif\" vspace=\"3\" width=\"280\"></td></tr>" +
                    "<tr><td><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr>"
                for (i=0;i<objStyles.length;i++) {
                    //determine whether this item should be selected.
                    var anchorClass = "shopNavCrit";
                    if (objStyles[i].CAT_ID == currCatID) { anchorClass = "shopNavSelectedCrit"; }
                    //Create the anchor, including the onClick
                    strHTML += "<td class=\"shopNavColumn\" valign=\"top\"><a href=\"#\"class=\"" + anchorClass + "\" onclick=\"toggleCriterionSelection(this, 'style', '" + objStyles[i].CAT_ID + "')\">" + objStyles[i].NAME + "</a></td>"
                    //new row every 3rd one.
                    if ((i+1)%3==0) strHTML += "</tr><tr>";
                }
                strHTML += "</tr></table></td></tr></table>";
            }
            var dvBlock = document.getElementById("dvSrchStyles");
            if (dvBlock) {
                dvBlock.innerHTML = strHTML;
                dvBlock.style.visibility = objStyles.length==0?"hidden":"visible";
                dvBlock.style.display =  objStyles.length==0?"none":"block";
            } 
        }
        
        //if we have brands, draw them
        if (objBrands) {
            if (objBrands.length == 0) {
               strHTML = "test";
            } else {
                strHTML = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr align=\"center\"><td><img alt=\"Brands\" height=\"12\" src=\"/images/jy_snav_hd_brands.gif\" vspace=\"3\" width=\"280\"></td></tr>" +
                    "<tr><td><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr>"
                for (i=0;i<objBrands.length;i++) {
                    //determine whether this item should be selected.
                    var anchorClass = "shopNavCrit";
                    if (objBrands[i].CAT_ID == currBrandID) { anchorClass = "shopNavSelectedCrit"; }
                    //Create the anchor, including the onClick
                    strHTML += "<td class=\"shopNavColumn\" valign=\"top\"><a href=\"#\"class=\"" + anchorClass + "\" onclick=\"toggleCriterionSelection(this, 'brand', '" + objBrands[i].CAT_ID + "')\">" + objBrands[i].NAME + "</a></td>"
                    //new row every 3rd one.
                    if ((i+1)%3==0) strHTML += "</tr><tr>";
                }
                strHTML += "</tr></table></td></tr></table>";
            }
            var dvBlock = document.getElementById("dvSrchBrands");
            if (dvBlock) {
                dvBlock.innerHTML = strHTML;
                dvBlock.style.visibility = objBrands.length==0?"hidden":"visible";
                dvBlock.style.display =  objBrands.length==0?"none":"block";
            } 
        }
        
        //if we have sizes, draw them
        if (objSizes) { 
            if (objSizes.length == 0) {
               strHTML = "";
            } else {
                strHTML = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr align=\"center\"><td><img alt=\"Sizes\" height=\"12\" src=\"/images/jy_snav_hd_sizes.gif\" vspace=\"3\" width=\"280\"></td></tr>" +
                    "<tr><td><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr>"
                for (i=0;i<objSizes.length;i++) {
                    //determine whether this item should be selected.
                    var anchorClass = "shopNavCrit";
                    if (objSizes[i].TEXT.toLowerCase() == currSize) { anchorClass = "shopNavSelectedCrit"; }
                    //Create the anchor, including the onClick
                    strHTML += "<td class=\"shopNavColumn\" valign=\"top\"><a href=\"#\"class=\"" + anchorClass + "\" onclick=\"toggleCriterionSelection(this, 'size', '" + objSizes[i].TEXT.toLowerCase() + "')\">" + objSizes[i].TEXT + "</a></td>"
                    //new row every 6th one.
                    if ((i+1)%6==0) strHTML += "</tr><tr>";
                }
                strHTML += "</tr></table></td></tr></table>";
            }
            var dvBlock = document.getElementById("dvSrchSizes");
            if (dvBlock) {
                dvBlock.innerHTML = strHTML;
                dvBlock.style.visibility =  objSizes.length==0?"hidden":"visible";
                dvBlock.style.display =  objSizes.length==0?"none":"block";
            }
        } 
        
        //if we have colors, draw them
        if (objColors) {
            if (objColors.length == 0) {
               strHTML = "";
            } else {
                strHTML = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr align=\"center\"><td><img alt=\"Colors\" height=\"12\" src=\"/images/jy_snav_hd_colors.gif\" vspace=\"3\" width=\"280\"></td></tr>" +
                    "<tr><td><table border=\"0\" cellpadding=\"0\" cellspacing=\"1\" width=\"100%\"><tr>"
                for (i=0;i<objColors.length;i++) {
                  //determine whether this item should be selected.
                    var anchorClass = "shopNavColorLink";
                    if (objColors[i].NAME.toLowerCase() == currColorCode) { anchorClass = "shopNavSelectedColorLink"; }
                    //Create the anchor, including the onClick
                    strHTML += "<td" + (objColors[i].RGB=="#"?"":" bgcolor=\"" + objColors[i].RGB + "\"")+"><a href=\"#\"class=\"" + anchorClass + "\" onclick=\"toggleCriterionSelection(this, 'color', '" + objColors[i].NAME.toLowerCase() + "')\"><img alt=\"" + objColors[i].NAME + "\" border=\"0\" height=\"15\" hspace=\"0\" src=\"/images/" + (objColors[i].NAME.toLowerCase()=="multi"?"icn_multi.gif":"pix.gif") + "\" vspace=\"0\" width=\"15\"></a></td>"
                    //new row every 14th one.
                    if ((i+1)%14==0) strHTML += "</tr><tr>";
                }
                strHTML += "</tr></table></td></tr></table>";
            }
            var dvBlock = document.getElementById("dvSrchColors");
            if (dvBlock) {
                dvBlock.innerHTML = strHTML;
                dvBlock.style.visibility =  objColors.length==0?"hidden":"visible";
                dvBlock.style.display =  objColors.length==0?"none":"block";
            } 
        }

    }
    var dvSearchDiv = document.getElementById("dvShopNav");
    if (dvSearchDiv) dvSearchDiv.style.visibility = "visible";
 }
 
//Convenience function to construct the URL from the passed elements.  Null or empty-string elements 
// will be omitted.  Caller must specify a non-null, non-empty catId, brandId, size, or colorCode.
// If all of those elements are null or empty, this function will return an empty string.
function buildListingUrl(urlRoot, gender, prodType, catId, brandId, size, colorCode) {
    var strUrl = urlRoot;
    //If not criteria are specified, skip out.  Unless this is a "sale" request, in which case it's ok.
    if (prodType != "sale"
        && (catId==null || catId=="")
        && (brandId==null || brandId=="")
        && (size==null || size=="")
        && (colorCode==null || colorCode=="")
        && (gender==null || gender=="")) 
    {
        return "";
    }
    
    //We have some params - start adding them to the URL: ?g=guys&p=shoes&c=123&b=456&s8.5&l=Burgundy
    strUrl += "?";
    if (gender!=null && gender!="") {
        strUrl += "g=" + gender + "&";
    }
    if (prodType!=null && prodType!="") {
        strUrl += "p=" + prodType + "&";
    }
    if (catId!=null && catId!="") {
        strUrl += "c=" + catId + "&";
    }
    if (brandId!=null && brandId!="") {
        strUrl += "b=" + brandId + "&";
    }
    if (size!=null && size!="") {
        strUrl += "s=" + size + "&";
    }
    if (colorCode!=null && colorCode!="") {
        strUrl += "l=" + colorCode + "&";
    }
    
    return strUrl;
}
 
 //** Slider Functions for the Page Nav **.
    var Timer;
    var Base = 666;
    var SliderInc;
    var blnSliding = false;
    var inc;
    
    //document.getElementById("listingHolder").scrollLeft = 0
    function MoveLeft() {
        SliderInc = Base;
        inc=-18;
        if (!blnSliding) Timer = setInterval("MoveSlider()", 5);
    }
    function MoveRight() {
        SliderInc = Base;
        inc=18;
        if (!blnSliding) Timer = setInterval("MoveSlider()", 5);
    }
    function MoveSlider() {
        blnSliding = true;
        if (SliderInc>0) {
            document.getElementById("listingHolder").scrollLeft += inc;
            SliderInc -= Math.abs(inc);
            if (SliderInc == 200) inc=inc/2;
            if (SliderInc == 100) inc=inc/2;
        } else {
            clearInterval(Timer);
            blnSliding = false;
        }
    }


