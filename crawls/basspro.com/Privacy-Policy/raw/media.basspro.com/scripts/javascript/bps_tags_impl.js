/*****************************
   Vendor Implementations:
 *****************************
 *	Omniture
 *	Rich Relevance
 *	Google
 *  Commission Junction
 *  Disable Gun Categories
 *****************************/

var js_filename = "bps_tags_impl.js";

function executeRefinementPages(tag)
{
  try
  {
    if(tag.refinementValues.length > 0)
    {
      for(var i = 0; i < tag.refinementValues.length; i++)
      {
        if(tag.refinementValues[i].indexOf("Clearance") != -1)
        {
          if(isEmpty(tag.dept))
            tag.dept = PageTypes.CLEARANCE;
          else
            tag.insertType(PageTypes.CLEARANCE, 0);

          break;
        }
      }
    }
  }
  catch(error)
  {
    errorHandler(js_filename, "executeRefinementPages()", error);
  }
}

function updatePageVariables(tag)
{
  try
  {
    tag.pageNumber = scPageNumber;
  }
  catch(defs)
  {
    tag.pageNumber = 1;
  }

  try
  {
    tag.results = scResultCount;
  }
  catch(defs)
  {
    tag.results = 0;
  }

  try
  {
    tag.originSearch = document.eti_navigation.srchTerms.value;
  }
  catch(defs)
  {
    tag.originSearch = null;
  }

  try
  {
    if(isEmpty(tag.search) && isEmpty(scSearchValue))
      tag.search = getURLParameter("searchTerm");
    else if(!isEmpty(scSearchValue))
      tag.search = scSearchValue;

    if(!isEmpty(tag.search) && !tag.isType(PageTypes.SEARCH))
      tag.appendType(PageTypes.SEARCH);
  }
  catch(defs)
  {
    tag.search = getURLParameter("searchTerm");
  }

  try
  {
    if(!isEmpty(scDepartment))
      tag.dept = scDepartment;

    if(!isEmpty(scSubDepartment))
      tag.subdept = scSubDepartment;

    if(!isEmpty(scCategoryValue))
      tag.category = scCategoryValue;

    if(!isEmpty(scRefinementType))
      tag.refinementTypes = scRefinementType.split("~");

    if(!isEmpty(scRefinementValue))
      tag.refinementValues = scRefinementValue.split("~");

    if(scCategoryRRId && !isEmpty(tag.category))
      tag.categoryId = scCategoryRRId;

    if(scCategoryRRId && !isEmpty(tag.subdept))
      tag.subdeptId = scCategoryRRId;
  }
  catch(error)
  {
    errorHandler(js_filename, "updatePageVariables(tag)", error);
  }
}

/*
  Bazaarvoice QA Displayed Function
*/
function BVQADisplayed(questionCount, answerCount)
{
  // Any custom items leveraging these values.
}

/*
RR Price Format Function
*/
function formatPrice(origSalesPrice)
{
  try
  {
    var decIndex = (origSalesPrice.indexOf(".") + 1);

    if(decIndex != 0)
    {
      if(decIndex == origSalesPrice.length)
        return (origSalesPrice + "00");
      else if((decIndex + 1) == origSalesPrice.length)
        return (origSalesPrice + "0");
      else if(origSalesPrice.length > (decIndex + 2))
        return origSalesPrice.substring(0, (decIndex + 2));
    }
    else
      return (origSalesPrice + ".00");
  }
  catch(error)
  {
    errorHandler(js_filename, "trimPrice()", error);
  }

  return origSalesPrice;
}

/*
  Bazaarvoice Ratings Displayed Function
*/
function ratingsDisplayed(totalReviewsCount, avgRating, ratingsOnlyReviewCount, buyAgainPercentage, productID)
{
  if(totalReviewsCount > 0)
  {
    omnitureReview=new Object();
    var bvo=omnitureReview;
    bvo.totalReviewCount=totalReviewsCount;
    bvo.avgRating=avgRating;
    bvo.totalReviewCountAndAvgRating=totalReviewsCount+' | '+avgRating;
    bvo.totalRatingOnlyCount=ratingsOnlyReviewCount;
    bvo.buyAgainPercentage=buyAgainPercentage;
    bvo.product=productID;
    bvo.reviewsFound=1;

    if(typeof(s)!='undefined')
    {
      bvo.omtrProducts=s.products;
      var ltv=s.linkTrackVars;
      var lte=s.linkTrackEvents;
      bvo.ajaxCatch=1;
      s.tl(true,'o','BazaarVoice Catch');
      s.linkTrackVars=ltv;
      s.linkTrackEvents=lte;
    }
  }
}

//=============================
//OMNITURE TAG IMPLEMENTATION
//=============================

var OmnitureTag = function(){};
OmnitureTag.prototype = new TagImpl();
OmnitureTag.base = TagImpl.prototype;
OmnitureTag.enabled = TagImpl.enableTagByParameter("omnitag", true);

// Parameters for OmnitureTag.executeEvent() function
OmnitureTag.eventForm = null;
OmnitureTag.eventName = null;
OmnitureTag.eventValue = null;
OmnitureTag.eventProducts = null;
OmnitureTag.eventVarName = null;
OmnitureTag.eventVarValue = null;

OmnitureTag.prototype.test = function()
{
  try
  {
    var j=document.styleSheets,i=document.images,r='';for(var x=0;x<j.length;x++)if(j[x].imports)for(var y=0;y<j[x].imports.length;y++)if(j[x].imports[y].href.toLowerCase().indexOf('http://media.basspro.com/b/ss/')>=0)r+=j[x].imports[y].href+"\n\n";for(var x=0;x<i.length;x++)if(i[x].src.toLowerCase().indexOf('http://media.basspro.com/b/ss/')>=0)r+=i[x].src+"\n\n";for(w_m in window)if(w_m.substring(0,4)=='s_i_'&&window[w_m].src)if(window[w_m].src.indexOf('http://media.basspro.com/b/ss/')>=0)r+=window[w_m].src;void(alert(unescape(r).replace(/&/g,'\n')));
  }
  catch(error)
  {
    errorHandler(js_filename, "OmnitureTag.test()", error);
  }
};

OmnitureTag.prototype.filter = function()
{
  try
  {
    this.Tag.dept = trim(this.Tag.dept);
    this.Tag.deptId = trim(this.Tag.deptId);
    this.Tag.subdept = trim(this.Tag.subdept);
    this.Tag.subdeptId = trim(this.Tag.subdeptId);
    this.Tag.category = trim(this.Tag.category);
    this.Tag.categoryId = trim(this.Tag.categoryId);
    this.Tag.category = trim(this.Tag.category);
    this.Tag.subcategory = trim(this.Tag.subcategory);
    this.Tag.includePageName = trim(this.Tag.includePageName);
    this.Tag.replaceDisplayType = trim(this.Tag.replaceDisplayType);
    this.Tag.guid = trim(this.Tag.guid);
    this.Tag.user = trim(this.Tag.user);
    this.Tag.session = trim(this.Tag.session);
    this.Tag.search = trim(this.Tag.search);
    this.Tag.originSearch = trim(this.Tag.originSearch);
    this.Tag.pageNumber = trim(this.Tag.pageNumber);
    this.Tag.article = trim(this.Tag.article);
    this.Tag.store = trim(this.Tag.store);
    this.Tag.application = trim(this.Tag.application);
    this.Tag.order = trim(this.Tag.order);
    this.Tag.promotion = trim(this.Tag.promotion);
    this.Tag.finder = trim(this.Tag.finder);
    this.Tag.shipType = trim(this.Tag.shipType);
    this.Tag.shipAmount = trim(this.Tag.shipAmount);
    this.Tag.tax = trim(this.Tag.tax);
    this.Tag.rating = trim(this.Tag.rating);
    this.Tag.catalog = trim(this.Tag.catalog);
    this.Tag.state = trim(this.Tag.state);
    this.Tag.zipcode = trim(this.Tag.zipcode);
    this.Tag.country = trim(this.Tag.country);
  }
  catch(error)
  {
    errorHandler(js_filename, "OmnitureTag.filter()", error);
  }
};

OmnitureTag.prototype.executeEvent = function()
{
  if(OmnitureTag.enabled && !isEmpty(OmnitureTag.eventName))
  {
    try
    {
      var s = s_gi(s_account);

      if(isEmpty(OmnitureTag.eventVarName))
        s.linkTrackVars = "events";
      else
        s.linkTrackVars = (OmnitureTag.eventVarName + ",events");

      s.linkTrackEvents = OmnitureTag.eventName;
      s.events = OmnitureTag.eventName;

      if(!isEmpty(OmnitureTag.eventProducts))
      {
        s.linkTrackVars += ",products";
        s.products = OmnitureTag.eventProducts;
      }

      if(!isEmpty(OmnitureTag.eventValue))
        eval("s." + OmnitureTag.eventName + "=" + OmnitureTag.eventValue);

      if(!isEmpty(OmnitureTag.eventVarName) && !isEmpty(OmnitureTag.eventVarValue))
      {
        s[OmnitureTag.eventVarName] = OmnitureTag.eventVarValue;
        s.tl(OmnitureTag.eventForm,'o',OmnitureTag.eventVarValue);
      }
      else
        s.tl(OmnitureTag.eventForm,'o',OmnitureTag.eventName);
    }
    catch(error)
    {
      errorHandler(js_filename, "OmnitureTag.filter()", error);
    }
  }
};

OmnitureTag.prototype.setVariables = function()
{
  if(OmnitureTag.enabled)
  {
    try
    {
      updatePageVariables(this.Tag);
      this.filter();
      executeRefinementPages(this.Tag);

      if(!(isEmpty(this.Tag.dept)) && this.Tag.types.length > 0 && (this.Tag.types.length > 1 || !this.Tag.isAnyTypes([PageTypes.DEPT, PageTypes.SUBDEPT, PageTypes.CATEGORY, PageTypes.SEARCH, PageTypes.PRODUCT])))
      {
        if(this.Tag.dept != this.Tag.types[0])
        {
          this.Tag.subcategory = this.Tag.category;
          this.Tag.category = this.Tag.subdept;
          this.Tag.subdept = this.Tag.dept;
          this.Tag.dept = this.Tag.types[0];
        }
      }

      if(s.pageName)
      {
        // Do not override current tagging
      }
      else if(!isEmpty(this.Tag.category))
      {
        if(!isEmpty(this.Tag.subcategory))
          s.pageName = (this.Tag.dept + DIV + this.Tag.subdept + DIV + this.Tag.category + DIV + this.Tag.subcategory);
        else
          s.pageName = (this.Tag.dept + DIV + this.Tag.subdept + DIV + this.Tag.category);

        s.prop4 = this.Tag.dept;
        s.prop5 = (this.Tag.dept + DIV + this.Tag.subdept);
        s.prop6 = PageTypes.CATEGORY;
        s.prop7 = (this.Tag.dept + DIV + this.Tag.subdept + DIV + this.Tag.category);
      }
      else if(!isEmpty(this.Tag.subdept))
      {
        s.pageName = (this.Tag.dept + DIV + this.Tag.subdept);
        s.prop4 = this.Tag.dept;
        s.prop5 = s.pageName;
        s.prop6 = PageTypes.SUBDEPT;
        s.prop7 = s.pageName;
      }
      else if(!isEmpty(this.Tag.dept))
      {
        s.pageName = this.Tag.dept;
        s.prop4 = s.pageName;
        s.prop5 = s.pageName;
        s.prop6 = PageTypes.DEPT;
        s.prop7 = s.pageName;
      }
      else if(!isEmpty(this.Tag.page))
      {
        s.pageName = this.Tag.page;
        s.prop4 = this.Tag.page;
        s.prop5 = this.Tag.page;
        s.prop6 = this.Tag.getTypesAsString(DIV);
        s.prop7 = this.Tag.page;
      }
      else
      {
        s.pageName = this.Tag.getTypesAsString(DIV);
        s.prop4 = this.Tag.getTypesAsString(DIV);
        s.prop5 = this.Tag.getTypesAsString(DIV);
        s.prop6 = this.Tag.getTypesAsString(DIV);
        s.prop7 = this.Tag.getTypesAsString(DIV);
      }

      if(!isEmpty(this.Tag.includePageName))
        s.pageName += (DIV + this.Tag.includePageName);

      if(!isEmpty(this.Tag.replaceDisplayType))
        s.prop6 = this.Tag.replaceDisplayType;

      if(this.Tag.isType(PageTypes.SEARCH))
      {
        if(this.Tag.results > 0)
          s.prop3 = this.Tag.results;
        else
          s.prop3 = "zero";
      }

      if(this.Tag.isType(PageTypes.SEARCH) && this.Tag.search != null)
      {
        var searchFirstPage = isSearchFirstPage(tag);
        var productResults = 0;

        if(searchFirstPage)
        {
          s.events = "event1";
          s.prop1 = this.Tag.search;
          s.products = "";

          for(var i = 0; i < this.Tag.parentTextIds.length; i++)
          {
            if(!isEmpty(this.Tag.parentTextIds[i]))
            {
              s.products += (";" + this.Tag.parentTextIds[i]);
              productResults++;
            }
          }
        }

        if(!isEmpty(this.Tag.search) || productResults == 0)
        {
          if(this.Tag.results > 0)
          {
            s.prop3 = this.Tag.results;
            s.prop5 += (" - " + this.Tag.pageNumber);
            s.prop7 += (" - " + this.Tag.pageNumber);
          }
          else
          {
            s.events = "event1,event2";
            s.prop3 = "zero";
            s.pageName += (DIV + "No Results");
            s.prop4 += (DIV + "No Results");
            s.prop5 += (DIV + "No Results");
            s.prop6 += (DIV + "No Results");
            s.prop7 += (DIV + "No Results");
          }

          s.eVar1 = s.prop1;

          if(!isEmpty(this.Tag.search) && !isEmpty(this.Tag.originSearch) && this.Tag.hasAutoCorrectedSearch())
            s.prop15 = (this.Tag.originSearch + " > " + this.Tag.search);
        }
      }

      if(!this.Tag.isAnyTypes([PageTypes.CHECKOUT, PageTypes.CART, PageTypes.PRODUCT]))
      {
        s.eVar4 = s.prop4;
        s.eVar5 = s.prop5;
      }

      if(this.Tag.refinementTypes.length > 0 && this.Tag.refinementValues.length > 0)
      {
        s.pageName += (DIV + "Ref");
        s.prop6 += (DIV + "Ref");
        s.prop7 += (DIV + "Ref");

        try
        {
          for(var i = 0; i < this.Tag.refinementTypes.length && i < this.Tag.refinementValues.length; i++)
          {
            if(i == 0)
            {
              s.prop8 = this.Tag.refinementTypes[i];
              s.prop9 = this.Tag.refinementValues[i];
            }
            else
            {
              s.prop8 += ("~" + this.Tag.refinementTypes[i]);
              s.prop9 += ("~" + this.Tag.refinementValues[i]);
            }
          }

          s.prop9 = (s.prop8 + ":" + s.prop9);
        }
        catch(ignore)
        {}
      }

      if(this.Tag.isType(PageTypes.PRODUCT))
      {
        s.pageName = ("PDP" + DIV + document.title);
        s.events = ";prodView;event3";

        for(var i = 0; i < this.Tag.parentTextIds.length; i++)
        {
          s.products = (";" + this.Tag.parentTextIds[i]);
        }

        this.Tag.dept = this.Tag.subdept;
        this.Tag.subdept = this.Tag.category;
        this.Tag.category = null;
        s.prop6 = PageTypes.PRODUCT;

        if(!isEmpty(this.Tag.subdept))
        {
          s.prop4 = this.Tag.dept;
          s.prop5 = (this.Tag.dept + DIV + this.Tag.subdept);
          s.prop7 = (this.Tag.dept + DIV + this.Tag.subdept);
        }
        else
        {
          s.prop4 = this.Tag.dept;
          s.prop5 = this.Tag.dept;
          s.prop7 = this.Tag.dept;
        }
      }
      else if(this.Tag.isType(PageTypes.COMPLETE))
      {
        s.events = "purchase";
        s.purchaseID = this.Tag.order;
        s.eVar12 = this.Tag.order;
        s.eVar6 = PaymentTypes.getPaymentType(this.Tag.payMethods);

        if(!isEmpty(this.Tag.country))
        {
          if(this.Tag.country == "US")
            s.eVar7 = ("US: " + this.Tag.shipType);
          else
            s.eVar7 = ("INTL: " + this.Tag.shipType);
        }

        for(var i = 0; i < this.Tag.childSKUs.length; i++)
        {
          var productArr = this.Tag.childSKUs[i].split(",");

          if(productArr.length == 3)
          {
            if(i == 0)
              s.products = (";" + this.Tag.parentTextIds[i] + ";" + productArr[1] + ";" + productArr[2] + ";;eVar48=" + productArr[0]);
            else
              s.products += (",;" + this.Tag.parentTextIds[i] + ";" + productArr[1] + ";" + productArr[2] + ";;eVar48=" + productArr[0]);
          }
        }

        s.state = this.Tag.state;
        s.zip = this.Tag.zipcode;
      }

      s.prop16 = this.Tag.guid;
      s.prop17 = this.Tag.session;
      s.eVar15 = this.Tag.user;

      if(s.pageName == PageTypes.SHIP)
        s.events = "event15";
      else if(s.pageName == PageTypes.PAY)
        s.events = "event16";
      else if(s.pageName && s.pageName.indexOf('Sign In') != -1)
        s.events = "event14";

      if(s.pageName == PageTypes.ADDRESS || s.pageName == PageTypes.SHIP || s.pageName == PageTypes.PAY)
      {
          if(s.pageName == PageTypes.ADDRESS)
              s.events = "event17";

        s.pageName = ("Checkout : " + s.pageName);
        s.prop4 = s.pageName;
        s.prop5 = s.pageName;
        s.prop6 = s.pageName;
        s.prop7 = s.pageName;
        s.eVar4 = s.prop4;
        s.eVar5 = s.prop5;
      }
    }
    catch(error)
    {
      errorHandler(js_filename, "OmnitureTag.setVariables()", error);
    }
  }
};

OmnitureTag.prototype.execute = function()
{
  if(OmnitureTag.enabled)
  {
    try
    {
      var s_code = s.t();

      if(s_code)
        document.write(s_code);
    }
    catch(error)
    {
      errorHandler(js_filename, "OmnitureTag.execute()", error);
    }
  }
};

//====================================
// RICH REVELVANCE TAG IMPLEMENTATION
//====================================

var RichRelevanceTag = function(){};
RichRelevanceTag.prototype = new TagImpl();
RichRelevanceTag.base = TagImpl.prototype;
RichRelevanceTag.miniCartItems = new Array();
RichRelevanceTag.miniCartParentItems = new Array();
RichRelevanceTag.miniCartSKUs = new Array();
RichRelevanceTag.miniCartAdd = "add_to_cart_page.minicart";
RichRelevanceTag.miniCartView = "cart_page.minicart";
RichRelevanceTag.miniCartAddDisplayed = 0;
RichRelevanceTag.miniCartViewDisplayed = 0;
RichRelevanceTag.addToMiniCart = false;
RichRelevanceTag.production = true; // Tag.production;
RichRelevanceTag.enabled = TagImpl.enableTagByParameter("rrtag", true);
RichRelevanceTag.fixProductRecs = true;

var R3_COMMON;
var R3_HOME;
var R3_CATEGORY;
var R3_SEARCH;
var R3_ITEM;
var R3_CART;
var R3_ADDTOCART;
var R3_PURCHASED;
var scFilterBrand;

RichRelevanceTag.prototype.getServerURL = function()
{
  if(RichRelevanceTag.production)
    return (getHttpProtocol() + "://recs.richrelevance.com/rrserver/");
  else
    return (getHttpProtocol() + "://integration.richrelevance.com/rrserver/");
};

RichRelevanceTag.prototype.base = function()
{
  if(RichRelevanceTag.enabled)
  {
    try
    {
      R3_COMMON = new r3_common();
      R3_COMMON.setApiKey('3681fd26e8c48c2a');
      R3_COMMON.setBaseUrl(this.getServerURL());

      if(this.Tag.guid != null)
        R3_COMMON.setSessionId(this.Tag.guid);

      if(this.Tag.user != null)
        R3_COMMON.setUserId(this.Tag.user);

      executeRefinementPages(this.Tag);
    }
    catch(error)
    {
      errorHandler(js_filename, "RichRelevanceTag.base()", error);
    }
  }
};

RichRelevanceTag.prototype.initialize = function()
{
  if(!getCookie('CALL_CENTER_USER') && RichRelevanceTag.enabled)
  {
    try
    {
      R3_COMMON.placementTypes = "";
      updatePageVariables(this.Tag);

      if(this.Tag.isType(PageTypes.PRODUCT))
      {
        R3_COMMON.addPlacementType('item_page.left');
        R3_COMMON.addPlacementType('item_page.left2');

        R3_COMMON.addClickthruParams(0, 'CROSSSELL_PRODUCT');

        R3_ITEM = new r3_item();

        for(var i = 0; i < this.Tag.parentTextIds.length; i++)
        {
          R3_ITEM.setId(this.Tag.parentTextIds[i]);
        }

        R3_ITEM.setRecommendable(true);
      }
      else if(this.Tag.isType(PageTypes.HOME))
      {
        R3_COMMON.addPlacementType("home_page.content");
        R3_COMMON.addClickthruParams(0, "CROSSSELL_HOMEPAGE");

        R3_HOME = new r3_home();
      }
      else if(this.Tag.isAnyTypes([PageTypes.SUBDEPT, PageTypes.CATEGORY]))
      {
        R3_COMMON.addPlacementType("category_page.sub_content");
        R3_COMMON.addClickthruParams(0, "CROSSSELL_THUMBNAIL");

        var rrCatId = this.Tag.subdeptId;
        var rrCatName = this.Tag.subdept;

        if(this.Tag.category != null && this.Tag.category.length > 0)
        {
          rrCatId = this.Tag.categoryId;
          rrCatName = this.Tag.category;
        }

        R3_CATEGORY = new r3_category();

        if(rrCatId != null)
          R3_CATEGORY.setId(rrCatId);

        if(rrCatName != null)
          R3_CATEGORY.setName(rrCatName);

        try
        {
          for(var i = 0; i < scRefinementRRName.length && i < scRefinementRRValue.length; i++)
          {
            R3_COMMON.addRefinement(scRefinementRRName[i], scRefinementRRValue[i]);
          }

          if(!isEmpty(scFilterBrand))
          {
            R3_COMMON.addFilterBrand(scFilterBrand);
            R3_COMMON.setFilterBrandsIncludeMatchingElements(true);
          }
        }
        catch(ignore)
        {}
      }
      else if(this.Tag.isAnyTypes([PageTypes.DEPT, PageTypes.CLEARANCE]))
      {
        R3_COMMON.addPlacementType("category_page.content");
        R3_COMMON.addClickthruParams(0, "CROSSSELL_DEPT");

        R3_CATEGORY = new r3_category();
        R3_CATEGORY.setId(this.Tag.deptId);
        R3_CATEGORY.setName(this.Tag.dept);
      }
      else if(this.Tag.isType(PageTypes.SEARCH))
      {
        R3_COMMON.addPlacementType("search_page.content");
        R3_COMMON.addClickthruParams(0, "CROSSSELL_THUMBNAIL");

        R3_SEARCH = new r3_search();
        R3_SEARCH.setTerms(this.Tag.search);

        for(var i = 0; i < this.Tag.parentTextIds.length; i++)
        {
          if(!isEmpty(this.Tag.parentTextIds[i]))
            R3_SEARCH.addItemId(this.Tag.parentTextIds[i]);
        }

        try
        {
          for(var i = 0; i < scRefinementRRName.length && i < scRefinementRRValue.length; i++)
          {
            R3_COMMON.addRefinement(scRefinementRRName[i], scRefinementRRValue[i]);
          }

          if(!isEmpty(scFilterBrand))
          {
            R3_COMMON.addFilterBrand(scFilterBrand);
            R3_COMMON.setFilterBrandsIncludeMatchingElements(true);
          }
        }
        catch(ignore)
        {}
      }
      else if(this.Tag.isType(PageTypes.CART))
      {
          R3_COMMON.addPlacementType('cart_page.right');
          R3_COMMON.addPlacementType('cart_page.content');
          R3_COMMON.addClickthruParams(0, 'CROSSSELL_CART');

          R3_CART = new r3_cart();

        for(var i = 0; i < this.Tag.parentTextIds.length; i++)
        {
          R3_CART.addItemId(this.Tag.parentTextIds[i]);
        }
      }
      else if(this.Tag.isType(PageTypes.COMPLETE))
      {
          R3_PURCHASED = new r3_purchased();
          R3_PURCHASED.setOrderNumber(this.Tag.order);

        for(var i = 0; i < this.Tag.childSKUs.length && i < this.Tag.parentTextIds.length; i++)
        {
          try
          {
            var product = this.Tag.childSKUs[i].split(',');
            R3_PURCHASED.addItemIdPriceQuantity(this.Tag.parentTextIds[i], formatPrice(product[2]/product[1]), product[1]);
          }
          catch(ignore)
          {}
        }
      }

      r3();
    }
    catch(error)
    {
      errorHandler(js_filename, "RichRelevanceTag.initialize()", error);
    }
  }
};

RichRelevanceTag.prototype.placement = function(position)
{
  if(!getCookie('CALL_CENTER_USER') && RichRelevanceTag.enabled)
  {
    try
    {
      if(this.Tag.isType(PageTypes.PRODUCT))
      {
        if(position == 0)
          r3_placement("item_page.left");
        else if(position == 1){
          r3_placement("item_page.left2");
        }
      }
      else if(this.Tag.isType(PageTypes.HOME)){
        r3_placement("home_page.content");
      }
      else if(this.Tag.isType(PageTypes.DEPT)){
        r3_placement("category_page.content");
      }
      else if(this.Tag.isAnyTypes([PageTypes.SUBDEPT, PageTypes.CATEGORY, PageTypes.SEARCH])){
        r3_placement("category_page.sub_content");
      }
      else if(this.Tag.isType(PageTypes.CART) && position == 0)
        r3_placement("cart_page.right");
      else if(this.Tag.isType(PageTypes.CART) && position == 1){
        r3_placement("cart_page.content");
      }
    }
    catch(error)
    {
      errorHandler(js_filename, "RichRelevanceTag.placement()", error);
    }
  }
};

RichRelevanceTag.prototype.execute = function()
{
  if(RichRelevanceTag.enabled)
  {
    try
    {
        rr_flush_onload();
    }
    catch(error)
    {
      errorHandler(js_filename, "RichRelevanceTag.execute()", error);
    }
  }
};

RichRelevanceTag.prototype.showMiniCartAdd = function()
{
  if(RichRelevanceTag.enabled)
  {
    try
    {
      document.getElementById('miniCartView').style.display = "none";
      document.getElementById('miniCartAdd').style.display = "block";
    }
    catch(error)
    {
      errorHandler(js_filename, "RichRelevanceTag.setMiniCartAdd()", error);
    }
  }
};

RichRelevanceTag.prototype.showMiniCartView = function()
{
  if(RichRelevanceTag.enabled)
  {
    try
    {
      document.getElementById('miniCartAdd').style.display = "none";
      document.getElementById('miniCartView').style.display = "block";
    }
    catch(error)
    {
      errorHandler(js_filename, "RichRelevanceTag.setMiniCartAdd()", error);
    }
  }
};

RichRelevanceTag.prototype.setMiniCartAdd = function()
{
  if(RichRelevanceTag.enabled)
  {
    try
    {
      r3_placement(RichRelevanceTag.miniCartAdd);
    }
    catch(error)
    {
      errorHandler(js_filename, "RichRelevanceTag.setMiniCartAdd()", error);
    }
  }
};

RichRelevanceTag.prototype.setMiniCartView = function()
{
  if(RichRelevanceTag.enabled)
  {
    try
    {
      r3_placement(RichRelevanceTag.miniCartView);
    }
    catch(error)
    {
      errorHandler(js_filename, "RichRelevanceTag.setMiniCartView()", error);
    }
  }
};

RichRelevanceTag.prototype.getMiniCartAdd = function()
{
  if(RichRelevanceTag.enabled)
  {
    try
    {
      if(RichRelevanceTag.miniCartAddDisplayed != RichRelevanceTag.miniCartParentItems.length)
      {
        R3_COMMON.placementTypes = "";
          R3_ADDTOCART = new r3_addtocart();

          if(isArray(RichRelevanceTag.miniCartParentItems) && RichRelevanceTag.miniCartParentItems.length > 0)
          {
            R3_ADDTOCART.addItemIdToCart(RichRelevanceTag.miniCartParentItems[(RichRelevanceTag.miniCartParentItems.length - 1)]);
          }

          R3_COMMON.addPlacementType(RichRelevanceTag.miniCartAdd);
          r3();

          RichRelevanceTag.miniCartAddDisplayed = RichRelevanceTag.miniCartParentItems.length;
      }

        RichRelevanceTag.prototype.showMiniCartAdd();
    }
    catch(error)
    {
      errorHandler(js_filename, "RichRelevanceTag.getMiniCartAdd()", error);
    }
  }
};

RichRelevanceTag.prototype.getMiniCartRecs = function()
{
  if(RichRelevanceTag.enabled)
  {
    try
    {
      if(this.addToMiniCart)
        this.getMiniCartAdd();
      else
      {
        if(RichRelevanceTag.miniCartViewDisplayed != RichRelevanceTag.miniCartParentItems.length)
        {
          R3_COMMON.placementTypes = "";
            R3_CART = new r3_cart();

            if(isArray(RichRelevanceTag.miniCartParentItems) && RichRelevanceTag.miniCartParentItems.length > 0)
            {
              for(var i = 0; i < RichRelevanceTag.miniCartParentItems.length; i++)
              {
                R3_CART.addItemId(RichRelevanceTag.miniCartParentItems[i]);
              }
            }

            R3_COMMON.addPlacementType(RichRelevanceTag.miniCartView);
            r3();

            RichRelevanceTag.miniCartViewDisplayed = RichRelevanceTag.miniCartParentItems.length;
        }

          RichRelevanceTag.prototype.showMiniCartView();
      }
    }
    catch(error)
    {
      errorHandler(js_filename, "RichRelevanceTag.getMiniCartView()", error);
    }
  }
};

RichRelevanceTag.prototype.fixProductRecs = function(position)
{
  if(RichRelevanceTag.enabled)
  {
    try
    {
      if(this.Tag.isType(PageTypes.PRODUCT))
      {
        if(position == 0)
          r3_placement("item_page.left");
        else if(position == 1){
          r3_placement("item_page.left2");
        }
      }
      else if(this.Tag.isType(PageTypes.HOME)){
        r3_placement("home_page.content");
      }
      else if(this.Tag.isType(PageTypes.DEPT)){
        r3_placement("category_page.content");
      }
      else if(this.Tag.isAnyTypes([PageTypes.SUBDEPT, PageTypes.CATEGORY, PageTypes.SEARCH])){
        r3_placement("category_page.sub_content");
      }
      else if(this.Tag.isType(PageTypes.CART) && position == 0)
        r3_placement("cart_page.right");
      else if(this.Tag.isType(PageTypes.CART) && position == 1){
        r3_placement("cart_page.content");
      }
    }
    catch(error)
    {
      errorHandler(js_filename, "RichRelevanceTag.placement()", error);
    }
  }
};

/*
  Omniture Endeca Search Check Function
*/
function isSearchFirstPage(tag)
{
  try
  {
    if(document.location.href.indexOf("Navigation?") != -1 && tag.pageNumber && tag.pageNumber == 1)
      return true;
    else
      return false;
  }
  catch(error)
  {
    errorHandler(js_filename, "isSearchFirstPage()", error);
  }

  return false;
}

/*
Omniture Add To Cart Function
*/
function omniAddToCart(tag)
{
  try
  {
    s.linkTrackVars='events,products';

    if(RichRelevanceTag.miniCartParentItems.length == 0)
      s.linkTrackEvents='scAdd,scOpen';
    else
      s.linkTrackEvents='scAdd';

    if(tag.parentTextIds && tag.parentTextIds.length > 0)
    {
      s.products=';'+tag.parentTextIds[0]+';;;;eVar48='

      var addedCatEntId = document.getElementById("catEntryId").value;

      if(skuList && skuList.length > 0 && skuList[0].partNumber)
      {
        for(var i = 0; i < skuList.length; i++)
        {
          if(skuList[i].pkey == addedCatEntId)
          {
            s.products+=skuList[i].partNumber;
            break;
          }
        }
      }
      else
        s.products+=addedCatEntId;
    }
    else
    {
      s.products=';null';
    }

    if(RichRelevanceTag.miniCartParentItems.length == 0)
      s.events='scAdd,scOpen';
    else
      s.events='scAdd';

    s.tl(true,'o','Cart Add');
  }
  catch(error)
  {
    errorHandler(js_filename, "omniAddToCart()", error);
  }
}

/*
Omniture Quick Add To Cart Function
*/
function omniQuickAddToCart(tag)
{
  try
  {
    s.linkTrackVars='events,products';

    if(RichRelevanceTag.miniCartParentItems.length == 0)
      s.linkTrackEvents='scAdd,scOpen';
    else
      s.linkTrackEvents='scAdd';

    s.products='';

    for(var i = 0; i < 9; i++)
    {
      var nextPartNumber = document.getElementById("partNumber_"+i).value;

      if(nextPartNumber && nextPartNumber.length > 0)
        s.products+=';;;;;eVar48='+nextPartNumber;
    }

    if(RichRelevanceTag.miniCartParentItems.length == 0)
      s.events='scAdd,scOpen';
    else
      s.events='scAdd';

    s.tl(true,'o','Cart Add');
  }
  catch(error)
  {
    errorHandler(js_filename, "omniQuickAddToCart()", error);
  }
}

//====================================
//TRACKING PIXEL TAG IMPLEMENTATION
//====================================

var TrackingPixelTag = function(){};
TrackingPixelTag.prototype = new TagImpl();
TrackingPixelTag.base = TagImpl.prototype;
TrackingPixelTag.production = Tag.production;
TrackingPixelTag.enabled = TagImpl.enableTagByParameter("tptag", true);

TrackingPixelTag.prototype.setConfirmPagePixels = function()
{
  try
  {
    if(TrackingPixelTag.enabled)
    {
    }
  }
  catch(error)
  {
    errorHandler(js_filename, "TrackingPixelTag.setConfirmPagePixels()", error);
  }
};

TrackingPixelTag.prototype.execute = function()
{
  if(TrackingPixelTag.enabled)
  {
    try
    {
  initUpdateSelect("");
    }
    catch(error)
    {
      errorHandler(js_filename, "TrackingPixelTag.execute()", error);
    }
  }
};

// Google Firearms Affiliation Code
function updateFirearms(tag)
{
  // Removes Firearms, Shooting Accessories, Fine Gun Room, Ammunition, Reloading, Black Powder, and Air Gun/Paint-ball categories.
  if(hasURLParameter("affcode_c="))
    clearTextElementsByName("faLink");
}

//====================================
//Product Page Drop-down Compactor
//====================================

var ppddEnabled = TagImpl.enableTagByParameter("ppdd", true);
var tempSelections = new Array();
var ppddInit = 0;
var ppException = false;
var previousSelectionValue = "";

function hideSelect()
{
try
{
  if(ppddEnabled && ppdType != "C")
  {
  try
  {
    var attrDropDowns = document.getElementById('OrderItemAddForm').getElementsByTagName('select');
    var selectedAttrNVPairs = new Array();

    for(var i = 0; i < attrDropDowns.length; i++)
    {
      var attrNVPairs = new Array();
      var attrDropDown = attrDropDowns[i];
      attrNVPairs[0] = attrDropDown.id;

      if(attrDropDown.length == 2)
      {
        attrNVPairs[1] = attrDropDown[1].value;

        if(((i + 1) == attrDropDowns.length))
        {
          previousSelectionValue = attrDropDown[y].value;
        }
      }
      else if(attrDropDown.length > 2)
      {
        for(var y = 0; y < attrDropDown.length; y++)
        {
          if(attrDropDown[y].selected)
          {
            if(attrDropDowns.length > 2 && ((i + 1) == attrDropDowns.length) && previousSelectionValue == attrDropDown[y].value)
            {
              attrNVPairs[1] = "";
              previousSelectionValue = "";
              break;
            }
            else
            {
              if(((i + 1) == attrDropDowns.length))
              {
                previousSelectionValue = attrDropDown[y].value;
              }

              attrNVPairs[1] = attrDropDown[y].value;
              break;
            }
          }
        }
      }
      else
        attrNVPairs[1] = "";

      selectedAttrNVPairs[i] = attrNVPairs;
    }

    var activeAttrs = new Array()

    for(var i = 0; i < skuList.length; i++)
    {
      var nextSKU = skuList[i];
      var isStillPossible = true;

      for(var y = 0; y < selectedAttrNVPairs.length; y++)
      {
        if(selectedAttrNVPairs[y][1] != "" && nextSKU[selectedAttrNVPairs[y][0]] != selectedAttrNVPairs[y][1])
          isStillPossible = false;
      }

      for(var y = 0; y < attrDropDowns.length; y++)
      {
        if(selectedAttrNVPairs[y][1] != "")
        {
          var newAttr = ("~@" + nextSKU[attrDropDowns[y].id] + "@~");

          if(activeAttrs[y] == undefined)
            activeAttrs[y] = newAttr;
          else if(activeAttrs[y].indexOf(newAttr) == -1)
            activeAttrs[y] += newAttr;
        }
        else if(isStillPossible)
        {
          var newAttr = ("~@" + nextSKU[attrDropDowns[y].id] + "@~");

          if(activeAttrs[y] == undefined)
            activeAttrs[y] = newAttr;
          else if(activeAttrs[y].indexOf(newAttr) == -1)
            activeAttrs[y] += newAttr;
        }
      }
    }

    for(var i = 0; i < skuList.length; i++)
    {
      var nextSKU = skuList[i];

      if(nextSKU.isPossible)
      {
        var isStillPossible = true;

        for(var y = 0; y < selectedAttrNVPairs.length; y++)
        {
          if(selectedAttrNVPairs[y][1] != "" && nextSKU[selectedAttrNVPairs[y][0]] != selectedAttrNVPairs[y][1])
            isStillPossible = false;
        }

        nextSKU.isPossible = isStillPossible;
      }
    }

    for(var i = 0; i < attrDropDowns.length; i++)
    {
      var attrDropDown = attrDropDowns[i];
      var attrValue = activeAttrs[i];

      if(attrValue != undefined)
      {
        for(var y = 1; y < attrDropDown.length; y++)
        {
          var thisAttr = ("~@" + attrDropDown[y].value + "@~");

          if(attrValue.indexOf(thisAttr) == -1)
          {
            attrDropDown.remove(y);
            y--;
          }

          if(attrDropDown[y].innerHTML == "")
            attrDropDown[y].innerHTML = attrDropDown[y].value;
        }
      }
      else
      {
        for(var y = 1; y < attrDropDown.length; y++)
        {
          attrDropDown.remove(y);
          y--;
        }
      }

      if(attrDropDown.length == 2)
      {
        if(((i + 1) == attrDropDowns.length))
          previousSelectionValue = attrDropDown[1].value;

        attrDropDown[1].selected = true;
      }
      else
      {
        for(var y = 1; y < attrDropDown.length; y++)
        {
          if(selectedAttrNVPairs[i][1] == "")
          {
            attrDropDown[0].selected = true;
            break;
          }
          else if(selectedAttrNVPairs[i][1] == attrDropDown[y].value)
          {
            attrDropDown[y].selected = true;
            break;
          }

          if(((i + 1) == attrDropDowns.length) && attrDropDown[y].selected)
          {
            previousSelectionValue = attrDropDown[y].value;
          }
        }
      }
    }
  }
  catch(ignore)
  {}

    var minPrice=0.0;
    var maxPrice=0.0;
    var regMinPrice=0.0;
    var regMaxPrice=0.0;
    var isClearance = false;
    var isRebate = false;
    var isDropShip = false;
    var hasAtLeastOneInStock = false;
    var hasAtLeastOneOutOfStock = false;
    var itemNum = "";
    var numChildren = 0 ;
    var quantityLimit="";
    var hasOnlyOneFullImage = true;
    var fullImage = "" ;
    var disclaimerText = '';
    var resolvedCatentryId = "";
    var showDisclaimer = false;
    var first=true;

    $.each( skuList, function(index, aSku)
    {
      if ( aSku.isPossible )
      {
        numChildren++ ;
        var thisPrice = parseFloat(aSku.price);
        var thisRegPrice = parseFloat(aSku.regPrice);
        if ( first )
        {
          first=false;
          minPrice=parseFloat(thisPrice);
          maxPrice=parseFloat(thisPrice);
          regMinPrice=parseFloat(thisRegPrice);
          regMaxPrice=parseFloat(thisRegPrice);
          fullImage = aSku.fullImage ;
        }
        else
        {
          if ( thisPrice < minPrice ) { minPrice=thisPrice;}
          if ( thisPrice > maxPrice ) { maxPrice=thisPrice;}
          if ( thisRegPrice < regMinPrice ) { regMinPrice=thisRegPrice;}
          if ( thisRegPrice > regMaxPrice ) { regMaxPrice=thisRegPrice;}
          if ( fullImage != aSku.fullImage )
          {
            hasOnlyOnFullImage=false;
            fullImage="";
          }
        }

        resolvedCatentryId = aSku.pkey;

        if ( aSku.isClearance )
        {
          isClearance = true;
        }

        if ( aSku.isDropShip )
        {
          isDropShip = true;
        }

        if ( aSku.isRebate )
        {
          isRebate = true;
        }

        if ( aSku.inventory <= 0 )
        {
          hasAtLeastOneOutOfStock = true;
        }

        if ( aSku.inventory > 0 )
        {
          hasAtLeastOneInStock = true;
        }

        itemNum=aSku.itemNumber;

        if(aSku.quantityLimit!="" && aSku.quantityLimit>0)
        {
          quantityLimit=aSku.quantityLimit;
        }

        if(aSku.disclaimerBoxInnerHtml != null && aSku.disclaimerBoxInnerHtml != "" && numChildren == 1)
        {
          showDisclaimer = true;
          disclaimerText = aSku.disclaimerBoxInnerHtml;
        }
        else
        {
          showDisclaimer = false;
          disclaimerText = "";
        }

        $("#sku_"+aSku.pkey).show();
      }
      else
      {
        $("#sku_"+aSku.pkey).hide();
      }
    });

    var priceText="";
    if ( minPrice==maxPrice )
    {
      $("#your-price-sale").text("");
      $("#offer-price-sale").text("");
      $("#regularpricetext").text("");
      $("#regularprice").text("");

      if(minPrice.toFixed(2) > 0.00)
      {
        $("#your-price").text("Your Price:");
        $("#offer-price").text("$"+minPrice.toFixed(2));
      }

      if ( isClearance )
      {
        $("#your-price").text("");
        $("#offer-price").text("");
        $("#offer-price-clearance").text("$"+minPrice.toFixed(2));
        $("#your-price-clearance").text("Clearance Price");
      }
    }
    else
    {
      $("#your-price-sale").text("");
      $("#offer-price-sale").text("");
      $("#regularpricetext").text("");
      $("#regularprice").text("");

      if(minPrice.toFixed(2) > 0.00)
      {
        $("#your-price").text("Your Price:");
        $("#offer-price").text("$"+minPrice.toFixed(2)+" - $"+ maxPrice.toFixed(2));
      }

      if ( isClearance )
      {
        $("#your-price").text("");
        $("#offer-price").text("");
        $("#offer-price-clearance").text("$"+minPrice.toFixed(2)+" - $"+ maxPrice.toFixed(2));
        $("#your-price-clearance").text("Clearance Price");
      }
    }

    if ( minPrice!=regMinPrice )
    {
      $("#your-price").text("");
      $("#offer-price").text("");
      $("#regularpricetext").text("");
      $("#regularprice").text("");
      $("#offer-price-clearance").text("");
      $("#your-price-clearance").text("");

      if ( minPrice==maxPrice )
      {
        $("#your-price-sale").text("SALE Price");
        $("#offer-price-sale").text("$"+minPrice.toFixed(2));

        if ( isClearance )
        {
          $("#your-price-sale").text("Clearance Price");
        }

      }
      else
      {
        $("#your-price-sale").text("SALE Price");
        $("#offer-price-sale").text("$"+minPrice.toFixed(2)+" - $"+ maxPrice.toFixed(2));

        if ( isClearance )
        {
          $("#your-price-sale").text("Clearance Price");
        }
      }
      if ( regMinPrice==regMaxPrice )
      {
        $("#regularpricetext").text("Regular Price:");
        $("#regularprice").text("$"+regMinPrice.toFixed(2) );
      }
      else
      {
        $("#regularpricetext").text("Regular Price:");
        $("#regularprice").text("$"+regMinPrice.toFixed(2)+" - $"+ regMaxPrice.toFixed(2));
      }
    }

    initUpdateSelect(itemNum);

    if ( isDropShip )
    {
      $("#dropship").text("Ships from Manufacturer");
    }
    else
    {
      $("#dropship").text("");
    }

    if ( isRebate )
    {
      $("#rebate").text("Rebate");
    }
    else
    {
      $("#rebate").text("");
    }

    if ( showDisclaimer )
    {
      $("#shippingDisclaimerInner").html(disclaimerText);
      $("#shipL").css('visibility', 'visible');
    }
    else
    {
      $("#shippingDisclaimerInner").html("");
      $("#shipL").css('visibility', 'hidden');
    }

    if(true)
    {
      if ( hasAtLeastOneInStock &&  !hasAtLeastOneOutOfStock ){
        $("#prod_outof_stock").text("");
        $("#prod_level_stock").text("In stock");
      }else if ( !hasAtLeastOneInStock &&  hasAtLeastOneOutOfStock ){
        $("#prod_level_stock").text("");
        $("#prod_outof_stock").text("Out of stock");
      } else {
        $("#prod_level_stock").text("");
        $("#prod_outof_stock").text("");
      }
    }
    else
    {
      $("#prod_level_stock").text("");
    }

    if ( isDropShip )
    {
      $("#prod_level_stock").text("");
    }

    if ( numChildren==1)
    {
      $("#item_num_prod_level").text(itemNum);
      skuResolved=true;
      $('#resolvedItemNum').val(itemNum);
      $('#quantityLimit').val(quantityLimit);
      $('#catEntryId').val(resolvedCatentryId);
    }
    else
    {
      $("#item_num_prod_level").text("");
      skuResolved=false;
    }
  }
}
catch(error)
{
  alert(error);
  ppException = true;
  errorHandler(js_filename, "hideSelect()", error);
}
}

function initUpdateSelect(itemNumVal)
{
  try
  {
    if(ppddEnabled)
    {
        if(itemNumVal != "")
        {
          for(var i = 0; i < skuList.length; i++)
          {
            if(skuList[i].itemNumber == itemNumVal && skuList[i].buyable == 'false')
            {
              document.getElementById('addToCartBtn').style.display = 'none';
              document.getElementById('prod_outof_stock').style.fontSize = '20px';
              break;
            }
            else
            {
              document.getElementById('addToCartBtn').style.display = 'block';
              document.getElementById('prod_outof_stock').style.fontSize = '12px';
            }
          }
        }
        else
        {
    if(skuList.length == 1 && skuList[0].buyable == 'false')
            {
              document.getElementById('addToCartBtn').style.display = 'none';
              document.getElementById('prod_outof_stock').style.fontSize = '20px';
            }
    else
              document.getElementById('addToCartBtn').style.display = 'block';
        }
    }
  }
  catch(error)
  {
    ppException = true;
    errorHandler(js_filename, "initUpdateSelect()", error);
  }
}

function updateSelect()
{
  try
  {
    if(ppddEnabled)
    {}
  }
  catch(error)
  {
    ppException = true;
    errorHandler(js_filename, "updateSelect()", error);
  }
}
