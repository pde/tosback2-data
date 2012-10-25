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

function debugObjMethods(obj, prefix)
{
  var objDebug = '';

  for(var methodName in obj)
  {
    var isMethodArray = ((methodName * 2).toString() != "NaN");

    if((obj[methodName].toString()).indexOf("object") != -1)
    {
      if(isMethodArray)
            objDebug += (prefix + "[" + methodName + "]<br/>");
      else
        objDebug += (prefix + "." + methodName + "<br/>");
    }
    else
      objDebug += (prefix + '.' + methodName + ' = "' + obj[methodName] + '" <br/>');

    if(isMethodArray)
      objDebug += debugObjMethods(obj[methodName], (prefix + "[" + methodName + "]"));
    else
      objDebug += debugObjMethods(obj[methodName], (prefix + "." + methodName));
  }

    return objDebug;
}

function debugObj(obj, objVarName)
{
  var objDebug = "";

  for(var methodName in obj)
  {
        objDebug += "<br/>" + objVarName + "." + methodName + "<br/>";
    objDebug += debugObjMethods(obj[methodName], (objVarName + "." + methodName))
  }

    alert(objDebug);
}

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

  try
  {
  for(var i = 0 ; i < tag.refinementValues; i++)
  {
    if(tag.refinementValues[i].indexOf("Clearance") != -1)
    {
      tag.appendType(PageType.CLEARANCE);
      break;
    }
  }
  }
  catch(ignore)
  {}
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
OmnitureTag.eventForm = true;
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
  if((OmnitureTag.enabled && !isEmpty(OmnitureTag.eventName)) && document.referrer.indexOf("paypal") == -1)
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
        eval("s." + OmnitureTag.eventName + "='" + OmnitureTag.eventValue +"'");

      if(!isEmpty(OmnitureTag.eventVarName) && !isEmpty(OmnitureTag.eventVarValue))
      {
        s[OmnitureTag.eventVarName] = OmnitureTag.eventVarValue;
        s.tl(OmnitureTag.eventForm,'o',OmnitureTag.eventVarValue);
      }
      else
        s.tl(OmnitureTag.eventForm,'o',OmnitureTag.eventValue);
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

      if(!this.Tag.isAnyTypes([PageTypes.CHECKOUT, PageTypes.ONEPAGECHECKOUT, PageTypes.CART, PageTypes.PRODUCT]))
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
    s.products = "";
        s.eVar12 = this.Tag.order;
        s.eVar6 = PaymentTypes.getPaymentType(this.Tag.payMethods);

        if(!isEmpty(this.Tag.country))
        {
          if(this.Tag.country == "US")
            s.eVar7 = ("US: " + this.Tag.shipType);
          else
            s.eVar7 = ("INTL: " + this.Tag.shipType);
        }
        else
    {
    s.eVar7 = "EMPTY";
    }

    var invalidProductStr = "";

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
      else
      {
    invalidProductStr += (";" + this.Tag.childSKUs[i]);
      }
        }

    if(this.Tag.childSKUs.length == 0 || s.products == "")
    {
    if(invalidProductStr.length > 0)
      s.products = ";EMPTY"+invalidProductStr;
    else
      s.products = ";EMPTY";
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

      if(s.pageName == PageTypes.ADDRESS || s.pageName == PageTypes.SHIP || s.pageName == PageTypes.PAY)
      {
          if(s.pageName == PageTypes.ADDRESS)
              s.events = "event17";

        s.pageName = ("Checkout : " + s.pageName);
        s.prop4 = s.pageName;
        s.prop5 = s.pageName;
        s.prop6 = s.pageName;
        s.prop7 = s.pageName;
      }

      if(s.pageName == PageTypes.ONEPAGECHECKOUT)
      {
        s.pageName = ("Checkout : " + s.pageName);
        s.prop4 = s.pageName;
        s.prop5 = s.pageName;
        s.prop6 = s.pageName;
        s.prop7 = s.pageName;
      s.eVar4 = "";
      s.eVar5 = "";
      }

      checkBillingAddress(this);
    }
    catch(error)
    {
      errorHandler(js_filename, "OmnitureTag.setVariables()", error);
    }
  }
};

function checkBillingAddress(omniTagObj)
{
  try
  {
    if(omniTagObj.Tag.isType(PageTypes.PAY))
    {
      var applyButtons = document.getElementsByTagName('a');

      for(var i = 0; i < applyButtons.length; i++)
      {
        if(applyButtons[i].className == 'apply')
        {
          var xClickEvent = (applyButtons[i].onclick+'');
          var x = (xClickEvent.indexOf('{')+1);

          if(x > 0)
          {
            if(xClickEvent != null && xClickEvent.indexOf('reward') != -1)
            {
              applyButtons[i].onclick = function onclick() { if(document.rewardCheckForm && document.rewardCheckForm.rwdCkLastName && document.rewardCheckForm.rwdCkLastName.value == ""){ alert('Please provide a valid billing address.'); return false }; document.rewardCheckForm.submit(); };
            }
            else if(xClickEvent != null && xClickEvent.indexOf('orderReviewForm') != -1)
            {
                applyButtons[i].onclick = function onclick() { if(document.rewardCheckForm && document.rewardCheckForm.rwdCkLastName && document.rewardCheckForm.rwdCkLastName.value == ""){ alert('Please provide a valid billing address.'); return false }; submitForm(document.orderReviewForm, 'Apply'); return false; };
            }
          }
        }
      }
    }
  }
  catch(error)
  {
    errorHandler(js_filename, "checkBillingAddress()", error);
  }
}

OmnitureTag.prototype.execute = function()
{
  if(OmnitureTag.enabled && document.referrer.indexOf("paypal") == -1)
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
RichRelevanceTag.noResultsSearch = false;
RichRelevanceTag.rrErrorPage = false;

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

function setMonetateTag()
{
  try
  {
    var monetateT = new Date().getTime();

    (function() {
        var p = document.location.protocol;
        if (p == "http:" || p == "https:") {
            var m = document.createElement('script'); m.type = 'text/javascript'; m.async = true; m.src = (p == "https:" ? "https://s" : "http://") + "b.monetate.net/js/1/a-806733e3/p/basspro.com/" + Math.floor((monetateT + 1447139) / 3600000) + "/g";
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(m, s);
        }
    })();
  }
  catch(error)
  {
    errorHandler(js_filename, "setMonetateTag()", error);
  }
}

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
        R3_COMMON.addPlacementType('item_page.rvi');
        //Sprint3 - Cognizant new RR catridges -- start
        R3_COMMON.addPlacementType("item_page.content");
        R3_COMMON.addPlacementType("item_page.content2");
        R3_COMMON.addPlacementType("item_page.content3");
        R3_COMMON.addPlacementType("item_page.content4");
        R3_COMMON.addPlacementType("item_page.content5");
        R3_COMMON.addPlacementType("item_page.content6");
        R3_COMMON.addPlacementType("item_page.content7");
        R3_COMMON.addPlacementType("item_page.content8");
        //Sprint3 - Cognizant new RR catridges -- end

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
        R3_COMMON.addPlacementType("home_page.rvi");
        R3_COMMON.addPlacementType("home_page.content");
        //Sprint2 - Cognizant new RR catridges -- start
        R3_COMMON.addPlacementType("home_page.content2");
        R3_COMMON.addPlacementType("home_page.content3");
        R3_COMMON.addPlacementType("home_page.content4");
        R3_COMMON.addPlacementType("home_page.content5");
        R3_COMMON.addPlacementType("home_page.content6");
        R3_COMMON.addPlacementType("home_page.content7");
        //Sprint2 - Cognizant new RR catridges -- end
        R3_COMMON.addClickthruParams(0, "CROSSSELL_HOMEPAGE");

        R3_HOME = new r3_home();
      }
      else if(this.Tag.isAnyTypes([PageTypes.SUBDEPT, PageTypes.CATEGORY]))
      {
        R3_COMMON.addPlacementType("category_page.rvi");

        R3_COMMON.addPlacementType("category_page.sub_content");
        R3_COMMON.addPlacementType("category_page.sub_content2");
        R3_COMMON.addPlacementType("category_page.sub_content3");
        R3_COMMON.addPlacementType("category_page.sub_content4");
        R3_COMMON.addPlacementType("category_page.sub_content5");
        R3_COMMON.addPlacementType("category_page.sub_content6");
        R3_COMMON.addPlacementType("category_page.sub_content7");

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
    R3_COMMON.addPlacementType("category_page.rvi");
        R3_COMMON.addPlacementType("category_page.content");
        R3_COMMON.addPlacementType("category_page.content2");
        R3_COMMON.addPlacementType("category_page.content3");
        //Sprint2 - Cognizant new RR catridges -- start
        R3_COMMON.addPlacementType("category_page.content4");
        R3_COMMON.addPlacementType("category_page.content5");
        R3_COMMON.addPlacementType("category_page.content6");
        R3_COMMON.addPlacementType("category_page.content7");
        R3_COMMON.addPlacementType("category_page.content8");
        //Sprint2 - Cognizant new RR catridges -- end
        R3_COMMON.addClickthruParams(0, "CROSSSELL_DEPT");

        R3_CATEGORY = new r3_category();
        R3_CATEGORY.setId(this.Tag.deptId);
        R3_CATEGORY.setName(this.Tag.dept);
      }
      else if(this.Tag.isType(PageTypes.SEARCH))
      {
        R3_COMMON.addPlacementType("search_page.rvi");

        R3_COMMON.addPlacementType("search_page.content");
        R3_COMMON.addPlacementType("search_page.content2");
        R3_COMMON.addPlacementType("search_page.content3");
  R3_COMMON.addPlacementType("search_page.content4");
        R3_COMMON.addPlacementType("search_page.content5");
        R3_COMMON.addPlacementType("search_page.content6");
        R3_COMMON.addPlacementType("search_page.content7");

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
    else if(this.noResultsSearch)
    {
      R3_COMMON.addPlacementType("search_page.no_results");
      R3_SEARCH = new r3_search();
      R3_SEARCH.setTerms(getURLParameter("searchTerm"));
    }
    else if(this.rrErrorPage)
    {
      R3_COMMON.addPlacementType('error_page.content');
      var R3_ERROR = new r3_error();
    }
      else if(this.Tag.isType(PageTypes.CART))
      {
          R3_COMMON.addPlacementType('cart_page.rvi');
          R3_COMMON.addPlacementType('cart_page.content');
          R3_COMMON.addPlacementType('cart_page.content2');
          R3_COMMON.addPlacementType('cart_page.content3');
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
  updatePageVariables(this.Tag);

    try
    {
    if(this.noResultsSearch)
    {
      r3_placement("search_page.no_results");
      rr_flush_onload();
    }
    else if(this.rrErrorPage)
    {
      r3_placement("error_page.content");
      rr_flush_onload();
    }
      else if(this.Tag.isType(PageTypes.PRODUCT))
      {
        if(position == 0){
          r3_placement("item_page.content");
        }else if(position == 1){
          r3_placement("item_page.content2");
        }else if(position == 2){
          r3_placement("item_page.content3");
        }else if(position == 3){
          r3_placement("item_page.content4");
        }else if(position == 4){
          r3_placement("item_page.content5");
        }else if(position == 5){
          r3_placement("item_page.content6");
        }else if(position == 6){
          r3_placement("item_page.content7");
        }else if(position == 7){
          r3_placement("item_page.content8");
        }
      }
      else if(this.Tag.isType(PageTypes.HOME) && position == 0){
        r3_placement("home_page.content");
      }
      else if(this.Tag.isType(PageTypes.HOME) && position == 1){
          r3_placement("home_page.content2");
      }
      else if(this.Tag.isType(PageTypes.HOME) && position == 2){
          r3_placement("home_page.content5");
      }
      else if(this.Tag.isType(PageTypes.HOME) && position == 3){
          r3_placement("home_page.content6");
      }
      else if(this.Tag.isType(PageTypes.HOME) && position == 4){
          r3_placement("home_page.content3");
      }
      else if(this.Tag.isType(PageTypes.HOME) && position == 5){
          r3_placement("home_page.content4");
      }
      else if(this.Tag.isType(PageTypes.HOME) && position == 6){
          r3_placement("home_page.content7");
      }
      else if(this.Tag.isAnyTypes([PageTypes.SUBDEPT, PageTypes.CATEGORY, PageTypes.CLEARANCE]) && position == 0){
          r3_placement("category_page.sub_content");
      }
      else if(this.Tag.isAnyTypes([PageTypes.SUBDEPT, PageTypes.CATEGORY, PageTypes.CLEARANCE]) && position == 1){
          r3_placement("category_page.sub_content2");
      }
      else if(this.Tag.isAnyTypes([PageTypes.SUBDEPT, PageTypes.CATEGORY, PageTypes.CLEARANCE]) && position == 2){
          r3_placement("category_page.sub_content3");
      }
      else if(this.Tag.isAnyTypes([PageTypes.SUBDEPT, PageTypes.CATEGORY]) && position == 3){
          r3_placement("category_page.sub_content4");
  }
      else if(this.Tag.isAnyTypes([PageTypes.SUBDEPT, PageTypes.CATEGORY]) && position == 4){
          r3_placement("category_page.sub_content5");
  }
      else if(this.Tag.isAnyTypes([PageTypes.SUBDEPT, PageTypes.CATEGORY]) && position == 5){
          r3_placement("category_page.sub_content6");
  }
      else if(this.Tag.isAnyTypes([PageTypes.SUBDEPT, PageTypes.CATEGORY]) && position == 6){
          r3_placement("category_page.sub_content7");
  }
      else if(this.Tag.isAnyTypes([PageTypes.SEARCH]) && position == 0){
          r3_placement("search_page.content");
      }
      else if(this.Tag.isAnyTypes([PageTypes.SEARCH]) && position == 1){
          r3_placement("search_page.content2");
      }
      else if(this.Tag.isAnyTypes([PageTypes.SEARCH]) && position == 2){
          r3_placement("search_page.content3");
      }
        else if(this.Tag.isAnyTypes([PageTypes.SEARCH]) && position == 3){
            r3_placement("search_page.content4");
  }
        else if(this.Tag.isAnyTypes([PageTypes.SEARCH]) && position == 4){
            r3_placement("search_page.content5");
  }
        else if(this.Tag.isAnyTypes([PageTypes.SEARCH]) && position == 5){
            r3_placement("search_page.content6");
  }
        else if(this.Tag.isAnyTypes([PageTypes.SEARCH]) && position == 6){
            r3_placement("search_page.content7");
  }
      else if(this.Tag.isType(PageTypes.DEPT) && position == 0){
          r3_placement("category_page.content3");
      }
      else if(this.Tag.isType(PageTypes.DEPT) && position == 1){
          r3_placement("category_page.content4");
      }
      else if(this.Tag.isType(PageTypes.DEPT) && position == 2){
          r3_placement("category_page.content");
        }
      else if(this.Tag.isType(PageTypes.DEPT) && position == 3){
        r3_placement("category_page.content2");
      }
      else if(this.Tag.isType(PageTypes.DEPT) && position == 4){
        r3_placement("category_page.content7");
      }
      else if(this.Tag.isType(PageTypes.DEPT) && position == 5){
        r3_placement("category_page.content8");
      }
      else if(this.Tag.isType(PageTypes.DEPT) && position == 6){
        r3_placement("category_page.content5");
      }
      else if(this.Tag.isType(PageTypes.DEPT) && position == 7){
        r3_placement("category_page.content6");
      }
      else if(this.Tag.isType(PageTypes.CART) && position == 0){
        r3_placement("cart_page.content3");
      }
      else if(this.Tag.isType(PageTypes.CART) && position == 1){
        r3_placement("cart_page.content");
      }
      else if(this.Tag.isType(PageTypes.CART) && position == 2){
          r3_placement("cart_page.content2");
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
      errorHandler(js_filename, "RichRelevanceTag.showMiniCartAdd()", error);
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
      errorHandler(js_filename, "RichRelevanceTag.showMiniCartView()", error);
    }
  }
};

RichRelevanceTag.prototype.setMiniCartAdd = function()
{
  if(RichRelevanceTag.enabled)
  {
    try
    {
  if(!RichRelevanceTag.setMiniCartView)
    RichRelevanceTag.setMiniCartView = this;

  if(!RichRelevanceTag.setMiniCartAdd)
    RichRelevanceTag.setMiniCartAdd = this;

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
  if(!RichRelevanceTag.setMiniCartView)
    RichRelevanceTag.setMiniCartView = this;

  if(!RichRelevanceTag.setMiniCartAdd)
    RichRelevanceTag.setMiniCartAdd = this;

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

        this.showMiniCartAdd();
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
          this.showMiniCartView();
      }
    }
    catch(error)
    {
      errorHandler(js_filename, "RichRelevanceTag.getMiniCartRecs()", error);
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
          if(position == 0){
              r3_placement("item_page.content");
            }else if(position == 1){
              r3_placement("item_page.content2");
            }else if(position == 2){
              r3_placement("item_page.content3");
            }else if(position == 3){
              r3_placement("item_page.content4");
            }else if(position == 4){
              r3_placement("item_page.content5");
            }else if(position == 5){
              r3_placement("item_page.content6");
            }else if(position == 6){
              r3_placement("item_page.content7");
            }else if(position == 7){
              r3_placement("item_page.content8");
        }
      }
      else if(this.Tag.isType(PageTypes.HOME)){
        r3_placement("home_page.content");
      }
      else if(this.Tag.isType(PageTypes.DEPT)){
        //r3_placement("category_page.content");
      }
      else if(this.Tag.isAnyTypes([PageTypes.SUBDEPT, PageTypes.CATEGORY, PageTypes.SEARCH])){
        //r3_placement("category_page.sub_content");
      }
      else if(this.Tag.isType(PageTypes.CART) && position == 0){
        r3_placement("cart_page.content3");
      }
      else if(this.Tag.isType(PageTypes.CART) && position == 1){
          r3_placement("cart_page.content1");
        }
      else if(this.Tag.isType(PageTypes.CART) && position == 2){
          r3_placement("cart_page.content2");
      }
    }
    catch(error)
    {
      errorHandler(js_filename, "RichRelevanceTag.fixProductRecs()", error);
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
//CRITEO TAG IMPLEMENTATION
//====================================

var CRITEO_CONF = [[{}],[5733, 'pac', 'us.', '011', [[7719993, 7719994]],{}]];
var CriteoPixelTag = function(){};
CriteoPixelTag.prototype = new TagImpl();
CriteoPixelTag.base = TagImpl.prototype;
CriteoPixelTag.production = Tag.production;
CriteoPixelTag.enabled = TagImpl.enableTagByParameter("crtag", true);
CriteoPixelTag.debug = TagImpl.enableTagByParameter("crdebug", false);

CriteoPixelTag.prototype.execute = function()
{
  try
  {
    if(CriteoPixelTag.enabled)
    {
  var criteoConfSet = false;

  if(this.Tag.isType(PageTypes.PRODUCT))
      {
    CRITEO_CONF =
    [
      [{pageType: 'product', 'Product ID': this.Tag.parentTextIds[0]}],
      [5733, 'pac', 'us.', '011', [[7719993, 7719994]], {'Product ID':['i', 0]}]
    ];

    criteoConfSet = true;
      }
  else if(this.Tag.isType(PageTypes.COMPLETE))
      {
    CRITEO_CONF =
    [
      [{pageType: 'confirmation',
      'Transaction ID': tag.order,
      'Product IDs': tag.parentTextIds,
      'Price': tag.orderSubtotal.substring(0, tag.orderSubtotal.indexOf('.') + 3),
      'Quantity': '1'}],
      [5733, 'pac', 'us.', '011', [[7719993, 7719994]],
      {'Transaction ID':['t',0], 'Product IDs':['i',1], 'Price':['p',1], 'Quantity':['q',1]}]
    ];

    criteoConfSet = true;
      }
      else if(this.Tag.isType(PageTypes.HOME))
  {
    CRITEO_CONF =
    [
      [{pageType: 'home'}],
      [5733, 'pac', 'us.', '011', [[7719993, 7719994]]]
    ];

    criteoConfSet = true;
      }
      else if(this.Tag.isAnyTypes([PageTypes.SUBDEPT, PageTypes.CATEGORY, PageTypes.SEARCH]))
  {
    var cto_productids = (typeof this.Tag == "undefined") ? [] : this.Tag.parentTextIds;
    cto_productids = cto_productids.splice(3, cto_productids.length);

    CRITEO_CONF =
    [
      [{pageType: 'list', 'Product IDs': cto_productids}],
      [5733, 'pac', 'us.', '011', [[7719993, 7719994]], {'Product IDs':['i', 1, 3]}]
    ];

    criteoConfSet = true;
      }
      else if(this.Tag.isType(PageTypes.CART))
      {
    CRITEO_CONF =
    [
      [{pageType: 'basket', 'Product IDs': (typeof this.Tag == "undefined") ? null : this.Tag.parentTextIds}],
      [5733, 'pac', 'us.', '011', [[7719993, 7719994]], {'Product IDs':['i', 1]}]
    ];

    criteoConfSet = true;
      }

  if(criteoConfSet && typeof(CRITEO) != "undefined")
  {
    if(CriteoPixelTag.debug)
    {
      if(CRITEO_CONF != null)
      {
        alert(CRITEO_CONF);

        if(CRITEO_CONF.length > 0 && CRITEO_CONF[0].length > 0)
          debugObj(CRITEO_CONF[0][0]);

        if(CRITEO_CONF.length > 1 && CRITEO_CONF[1].length > 5)
          debugObj(CRITEO_CONF[1][5]);
      }
      else
        alert("CRITEO_CONF is NULL.");
    }

    CRITEO.Load(false);
  }
    }
  }
  catch(error)
  {
    errorHandler(js_filename, "CriteoPixelTag.execute()", error);

  if(CriteoPixelTag.debug)
    alert(("Criteo Error: [" + error + "]"));
  }
};

//====================================
//TRACKING PIXEL TAG IMPLEMENTATION
//====================================

var TrackingPixelTag = function(){};
TrackingPixelTag.prototype = new TagImpl();
TrackingPixelTag.base = TagImpl.prototype;
TrackingPixelTag.production = Tag.production;
TrackingPixelTag.enabled = TagImpl.enableTagByParameter("tptag", true);
TrackingPixelTag.liveChatEnabled = TagImpl.enableTagByParameter("livechat", false);

TrackingPixelTag.prototype.setConfirmPagePixels = function()
{
  try
  {
    if(TrackingPixelTag.enabled)
    {}
  }
  catch(error)
  {
    errorHandler(js_filename, "TrackingPixelTag.setConfirmPagePixels()", error);
  }
};

TrackingPixelTag.prototype.execute = function()
{
try
{
   checkFirearms();

  if(!TrackingPixelTag.liveChatEnabled && (s.pageName.toLowerCase() == "no results search" || s.pageName.toLowerCase() == "404 error"))
  {
    RightNow.Client.Controller = null;
    RightNow.Client = null;
    RightNow = null;

    var pageElements = document.getElementById("w580").childNodes;

    if(pageElements && pageElements.length > 0)
    {
      for(var i = 0; i < pageElements.length; i++)
      {
        if(pageElements[i].id == "live-chat" || pageElements[i].className == "triangle")
          pageElements[i].style.display = "none";
      }
    }
  }

  var removeHCStyleElements = document.getElementsByTagName('span');

  for(var i = 0; i < removeHCStyleElements.length; i++)
  {
    if(removeHCStyleElements[i].id == 'attribute-outStock')
    {
      removeHCStyleElements[i].style.fontSize = '';
      removeHCStyleElements[i].style.color = '';
      removeHCStyleElements[i].className = 'attribute-out-of-stock';
    }
  }
}
catch(ignoreErr)
{}

    try
    {
      initUpdateSelect("");

  var hasSwatchCode = "";

  try
  {
    hasSwatchCode = $('[id^="swatch_color_"]');
  }
  catch(noswatches)
  {
    hasSwatchCode = "";
  }

      if(ppdType != "C" && hasSwatchCode.length == 0)
      {
        document.write("<script language='JavaScript'>function updateDynamicElementsFromDefiningAttributes(cameFromS7){}</script>");
      }
    }
    catch(error)
    {
      errorHandler(js_filename, "TrackingPixelTag.execute()", error);
    }
};

try
{
    document.getElementsByClass = function(classname)
    {
        var myArray = [];
        var tags = document.getElementsByTagName("*");
        var regex = new RegExp("(^|\\s)" + classname + "(\\s|$)");

    for(var i = 0; i < tags.length; i++)
    {
            if(regex.test(tags[i].className))
    {
                myArray.push(tags[i]);
            }
        }

        return myArray;
    };
}
catch(ignore)
{}

function switchTextElementsByClass(targetClass, replacedClass)
{
  try
  {
    var hideElements = document.getElementsByClass(targetClass);

    if(isArray(hideElements))
    {
      for(var i = 0; i < hideElements.length; i++)
      {
        hideElements[i].className = replacedClass;
      }
    }
  }
  catch(ignore)
  {}
}

// Google Firearms Affiliation Code
function updateFirearms(tag)
{
  // Removes Firearms, Shooting Accessories, Fine Gun Room, Ammunition, Reloading, Black Powder, and Air Gun/Paint-ball categories.
  if(hasURLParameter("affcode_c="))
    clearTextElementsByName("faLink");
}

function checkFirearms()
{
  // Removes Firearms, Shooting Accessories, Fine Gun Room, Ammunition, Reloading, Black Powder, and Air Gun/Paint-ball categories.
  if(hasURLParameter("affcode_c="))
    switchTextElementsByClass("paidSearch", "paidSearchHidden");
}

//====================================
//Product Page Drop-down Compactor
//====================================

var ppddEnabled = TagImpl.enableTagByParameter("ppdd", true);
var aux1Enabled = TagImpl.enableTagByParameter("aux1", true);
var swatchEnabled = TagImpl.enableTagByParameter("swdd", true);
var swatchUpdRm = TagImpl.enableTagByParameter("swupdrm", false);
var tempSelections = new Array();
var ppddInit = 0;
var ppException = false;
var previousSelectionValue = "";

function getDropDownSelectedValues(cDropDowns)
{
  var dropDownValues = new Array();

  for(var i = 0; i < cDropDowns.length; i++)
  {
    var cDropDown = cDropDowns[i];
    dropDownValues[i] = "";

    for(var y = 0; y < cDropDown.length; y++)
    {
      if(cDropDown[y].selected)
      {
        if(cDropDown[y].value && cDropDown[y].value.length > 0)
        {
          dropDownValues[i] = cDropDown[y].value;
          break;
        }
      }
    }
  }

  return dropDownValues;
}

function getDropDownIDs(cDropDowns)
{
  var dropDownIDs = new Array();

  for(var i = 0; i < cDropDowns.length; i++)
  {
    var cDropDown = cDropDowns[i];
    dropDownIDs[i] = cDropDown.id;
  }

  return dropDownIDs;
}

function chartSelect()
{
  if(ppddEnabled)
  {
    try
    {
      var attrDropDowns = document.getElementById('OrderItemAddForm').getElementsByTagName('select');
      var currentSelectionValues = getDropDownSelectedValues(attrDropDowns);
      var currentIDs = getDropDownIDs(attrDropDowns);
      var selectedOptionOutput = "";

      $.each(skuList, function(index, aSku)
      {
        aSku.isPossible = true;
      });

      $.each(skuList, function(index, aSku)
      {
        for(var i = 0; i < currentIDs.length; i++)
        {
          if(currentSelectionValues[i] != "" && currentSelectionValues[i] != aSku[currentIDs[i]])
            aSku.isPossible = false;
        }
      });

      var itemNum = "";
      var numChildren = 0 ;
      var resolvedCatentryId = "";
  var minPrice=0.0;
  var maxPrice=0.0;
  var regMinPrice=0.0;
  var regMaxPrice=0.0;
  var isClearance = false;
  var isRebate = false;
  var isDropShip = false;
  var isBuyable = true;
  var quantityLimit="";
  var firstSKU=true;

      $.each(skuList, function(index, aSku)
      {
        if(aSku.isPossible)
        {
          numChildren++;
          resolvedCatentryId = aSku.pkey;
          itemNum = aSku.itemNumber;
          $("#sku_"+aSku.pkey).show();

   var thisPrice = parseFloat(aSku.price);
        var thisRegPrice = parseFloat(aSku.regPrice);

        if(firstSKU)
        {
          firstSKU=false;
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
        }

        if(aSku.isClearance)
        {
          isClearance = true;
        }

        if(aSku.buyable != "true")
        {
          isBuyable = false;
        }

        if(aSku.isDropShip)
        {
          isDropShip = true;
        }

        if(aSku.isRebate)
        {
          isRebate = true;
        }

        if(aSku.inventory <= 0)
        {
          hasAtLeastOneOutOfStock = true;
        }

        if(aSku.inventory > 0)
        {
          hasAtLeastOneInStock = true;
        }

        if(aSku.quantityLimit!="" && aSku.quantityLimit>0)
        {
          quantityLimit=aSku.quantityLimit;
        }

        }
        else
        {
          $("#sku_"+aSku.pkey).hide();
        }
      });

    var priceText="";

  try
  {
    $("#your-price-value").text("");
    $("#reg-price-value").text("");

    document.getElementById("your-reg-label").style.display = "none";
    document.getElementById("your-clearance-label").style.display = "none";
    document.getElementById("your-sale-label").style.display = "none";
    document.getElementById("your-clearance-starting-label").style.display = "none";
    document.getElementById("your-sale-starting-label").style.display = "none";
  }
  catch(ignore)
  {}

    if(minPrice==maxPrice)
    {
  try
  {
          $("#your-price-sale").text("");
          $("#offer-price-sale").text("");
          $("#regularpricetext").text("");
          $("#regularprice").text("");
  }
  catch(ignore)
  {}

      if(minPrice.toFixed(2) > 0.00)
      {
    try
    {
             $("#your-price").text("Your Price:");
            $("#offer-price").text("$"+minPrice.toFixed(2));
    }
    catch(ignore)
    {}

    try
    {
        $("#your-price-value").text("$"+minPrice.toFixed(2));
    }
    catch(ignore)
    {}
      }

      if(isClearance)
      {
    try
    {
            $("#your-price").text("");
            $("#offer-price").text("");
            $("#offer-price-clearance").text("$"+minPrice.toFixed(2));
            $("#your-price-clearance").text("Clearance Price");
    }
    catch(ignore)
    {}

    try
    {
      $("#your-price-value").text("$"+minPrice.toFixed(2));
      document.getElementById("your-clearance-label").style.display = "block";
    }
    catch(ignore)
    {}
      }
    }
    else
    {
  try
  {
          $("#your-price-sale").text("");
          $("#offer-price-sale").text("");
          $("#regularpricetext").text("");
          $("#regularprice").text("");
  }
  catch(ignore)
  {}

      if(minPrice.toFixed(2) > 0.00)
      {
    try
    {
             $("#your-price").text("Your Price:");
              $("#offer-price").text("$"+minPrice.toFixed(2)+" - $"+ maxPrice.toFixed(2));
    }
    catch(ignore)
    {}

    try
    {
        $("#your-price-value").text("$"+minPrice.toFixed(2));

  if(!isClearance)
  {
          document.getElementById("your-starting-label").style.display = "block";
  }
  else
  {
    document.getElementById("your-starting-label").style.display = "none";
  }
    }
    catch(ignore)
    {}
  }

      if(isClearance)
      {
    try
    {
           $("#your-price").text("");
           $("#offer-price").text("");
          $("#offer-price-clearance").text("$"+minPrice.toFixed(2)+" - $"+ maxPrice.toFixed(2));
           $("#your-price-clearance").text("Clearance Price");
    }
    catch(ignore)
    {}

    try
    {
      $("#your-price-value").text("$"+minPrice.toFixed(2)+" - $"+ maxPrice.toFixed(2));
      document.getElementById("your-clearance-label").style.display = "block";
      document.getElementById("your-clearance-starting-label").style.display = "block";
      document.getElementById("your-starting-label").style.display = "none";
    }
    catch(ignore)
    {}
      }
    }

    if(minPrice!=regMinPrice || maxPrice!=regMaxPrice)
    {
  try
  {
          $("#your-price").text("");
          $("#offer-price").text("");
          $("#regularpricetext").text("");
          $("#regularprice").text("");
          $("#offer-price-clearance").text("");
          $("#your-price-clearance").text("");
  }
  catch(ignore)
  {}

      if(minPrice==maxPrice)
      {
    try
    {
      $("#your-price-sale").text("SALE Price");
      $("#offer-price-sale").text("$"+minPrice.toFixed(2));

            if(isClearance)
            {
                $("#your-price-sale").text("Clearance Price");
            }
    }
    catch(ignore)
    {}

    try
    {
      $("#your-price-value").text("$"+minPrice.toFixed(2));

            if(isClearance)
      {
        document.getElementById("your-clearance-label").style.display = "block";
      }
      else
      {
        document.getElementById("your-sale-label").style.display = "block";
      }
    }
    catch(ignore)
    {}
      }
      else
      {
    try
    {
            $("#your-price-sale").text("SALE Price");
            $("#offer-price-sale").text("$"+minPrice.toFixed(2)+" - $"+ maxPrice.toFixed(2));

            if(isClearance)
            {
         $("#your-price-sale").text("Clearance Price");
      }
    }
    catch(ignore)
    {}

    try
    {
      $("#your-price-value").text("$"+minPrice.toFixed(2));

            if(isClearance)
      {
        document.getElementById("your-clearance-starting-label").style.display = "block";
        document.getElementById("your-clearance-label").style.display = "none";
        document.getElementById("your-starting-label").style.display = "none";
      }
      else
      {
        document.getElementById("your-sale-starting-label").style.display = "block";
        document.getElementById("your-starting-label").style.display = "none";
      }
    }
    catch(ignore)
    {}
      }

      if(regMinPrice==regMaxPrice)
      {
    try
    {
            $("#regularpricetext").text("Regular Price:");
            $("#regularprice").text("$"+regMinPrice.toFixed(2));
    }
    catch(ignore)
    {}

    try
    {
            $("#reg-price-value").text("$"+regMinPrice.toFixed(2));
      document.getElementById("your-reg-label").style.display = "block";
    }
    catch(ignore)
    {}
      }
      else
      {
    try
    {
            $("#regularpricetext").text("Regular Price:");
            $("#regularprice").text("$"+regMinPrice.toFixed(2)+" - $"+ regMaxPrice.toFixed(2));
    }
    catch(ignore)
    {}

    try
    {
            $("#reg-price-value").text("$"+regMinPrice.toFixed(2));
      document.getElementById("your-reg-label").style.display = "block";
    }
    catch(ignore)
    {}
      }
  }
    }
    catch(ignore)
    {}
  }
}

var multiItemDisplay = true;

function hideSelect()
{
  try
  {
  if(ppdType == "C")
  chartSelect();
  else if(ppddEnabled && ppdType != "C")
  {
  if(multiItemDisplay)
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

    var activeAttrs = new Array();

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
  }

    var minPrice=0.0;
    var maxPrice=0.0;
    var regMinPrice=0.0;
    var regMaxPrice=0.0;
    var isClearance = false;
    var isRebate = false;
    var isDropShip = false;
    var isBuyable = true;
    var auxDesc1 = "";
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
    var hasDisclaimer = false;
    var firstSKU=true;

    $.each(skuList, function(index, aSku)
    {
      if(aSku.isPossible)
      {
        numChildren++;
        var thisPrice = parseFloat(aSku.price);
        var thisRegPrice = parseFloat(aSku.regPrice);

        if(firstSKU)
        {
          firstSKU=false;
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

    if(!isEmpty(aSku.auxDesc1))
    {
    auxDesc1 = aSku.auxDesc1;
    }

        if ( aSku.isClearance )
        {
          isClearance = true;
        }

        if (aSku.buyable != "true")
        {
          isBuyable = false;
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
	   hasDisclaimer = true;
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

    if(minPrice==maxPrice)
    {
  try
  {
          $("#your-price-sale").text("");
          $("#offer-price-sale").text("");
          $("#regularpricetext").text("");
          $("#regularprice").text("");
  }
  catch(ignore)
  {}

      if(minPrice.toFixed(2) > 0.00)
      {
    try
    {
             $("#your-price").text("Your Price:");
            $("#offer-price").text("$"+minPrice.toFixed(2));
    }
    catch(ignore)
    {}

    try
    {
        $("#your-price-value").text("$"+minPrice.toFixed(2));
    }
    catch(ignore)
    {}
      }

      if(isClearance)
      {
    try
    {
            $("#your-price").text("");
            $("#offer-price").text("");
            $("#offer-price-clearance").text("$"+minPrice.toFixed(2));
            $("#your-price-clearance").text("Clearance Price");
    }
    catch(ignore)
    {}

    try
    {
      $("#your-price-value").text("$"+minPrice.toFixed(2));
      document.getElementById("your-clearance-label").style.display = "block";
    }
    catch(ignore)
    {}
      }
    }
    else
    {
  try
  {
          $("#your-price-sale").text("");
          $("#offer-price-sale").text("");
          $("#regularpricetext").text("");
          $("#regularprice").text("");
  }
  catch(ignore)
  {}

      if(minPrice.toFixed(2) > 0.00)
      {
    try
    {
             $("#your-price").text("Your Price:");
              $("#offer-price").text("$"+minPrice.toFixed(2)+" - $"+ maxPrice.toFixed(2));
    }
    catch(ignore)
    {}

    try
    {
        $("#your-price-value").text("$"+minPrice.toFixed(2));

  if(!isClearance)
  {
          document.getElementById("your-starting-label").style.display = "block";
  }
  else
  {
    document.getElementById("your-starting-label").style.display = "none";
  }
    }
    catch(ignore)
    {}
  }

      if(isClearance)
      {
    try
    {
           $("#your-price").text("");
           $("#offer-price").text("");
            $("#offer-price-clearance").text("$"+minPrice.toFixed(2)+" - $"+ maxPrice.toFixed(2));
           $("#your-price-clearance").text("Clearance Price");
    }
    catch(ignore)
    {}

    try
    {
      $("#your-price-value").text("$"+minPrice.toFixed(2)+" - $"+ maxPrice.toFixed(2));
      document.getElementById("your-clearance-label").style.display = "block";
      document.getElementById("your-clearance-starting-label").style.display = "block";
      document.getElementById("your-starting-label").style.display = "none";
    }
    catch(ignore)
    {}
      }
    }

    if(minPrice!=regMinPrice)
    {
  try
  {
          $("#your-price").text("");
          $("#offer-price").text("");
          $("#regularpricetext").text("");
          $("#regularprice").text("");
          $("#offer-price-clearance").text("");
          $("#your-price-clearance").text("");
  }
  catch(ignore)
  {}

  try
  {
    $("#your-price-value").text("");
    $("#reg-price-value").text("");

    document.getElementById("your-reg-label").style.display = "none";
    document.getElementById("your-clearance-label").style.display = "none";
    document.getElementById("your-sale-label").style.display = "none";
    document.getElementById("your-clearance-starting-label").style.display = "none";
    document.getElementById("your-sale-starting-label").style.display = "none";
  }
  catch(ignore)
  {}

      if(minPrice==maxPrice)
      {
    try
    {
      $("#your-price-sale").text("SALE Price");
      $("#offer-price-sale").text("$"+minPrice.toFixed(2));

            if(isClearance)
            {
                $("#your-price-sale").text("Clearance Price");
            }
    }
    catch(ignore)
    {}

    try
    {
      $("#your-price-value").text("$"+minPrice.toFixed(2));

      if(isClearance)
      {
        document.getElementById("your-clearance-label").style.display = "block";
      }
      else
      {
        document.getElementById("your-sale-label").style.display = "block";
      }
    }
    catch(ignore)
    {}
      }
      else
      {
    try
    {
            $("#your-price-sale").text("SALE Price");
            $("#offer-price-sale").text("$"+minPrice.toFixed(2)+" - $"+ maxPrice.toFixed(2));

            if(isClearance)
            {
         $("#your-price-sale").text("Clearance Price");
      }
    }
    catch(ignore)
    {}

    try
    {
      $("#your-price-value").text("$"+minPrice.toFixed(2));

      if(isClearance)
      {
        document.getElementById("your-clearance-starting-label").style.display = "block";
        document.getElementById("your-starting-label").style.display = "none";
      }
      else
      {
        document.getElementById("your-sale-starting-label").style.display = "block";
        document.getElementById("your-starting-label").style.display = "none";
      }
    }
    catch(ignore)
    {}
      }

      if(regMinPrice==regMaxPrice)
      {
    try
    {
            $("#regularpricetext").text("Regular Price:");
            $("#regularprice").text("$"+regMinPrice.toFixed(2));
    }
    catch(ignore)
    {}

    try
    {
            $("#reg-price-value").text("$"+regMinPrice.toFixed(2));
      document.getElementById("your-reg-label").style.display = "block";
    }
    catch(ignore)
    {}
      }
      else
      {
    try
    {
            $("#regularpricetext").text("Regular Price:");
            $("#regularprice").text("$"+regMinPrice.toFixed(2)+" - $"+ regMaxPrice.toFixed(2));
    }
    catch(ignore)
    {}

    try
    {
            $("#reg-price-value").text("$"+regMinPrice.toFixed(2));
      document.getElementById("your-reg-label").style.display = "block";
    }
    catch(ignore)
    {}
        }
    }

    try
    {
    if(isClearance)
    {
        document.getElementById("your-starting-label").style.display = "none";
    }
    else
    {
        document.getElementById("your-clearance-label").style.display = "none";
        document.getElementById("your-clearance-starting-label").style.display = "none";
    }
    }
    catch(ignore)
    {}

      initUpdateSelect(itemNum);

  try
  {
        if(isRebate)
            $("#rebate").text("Rebate");
        else
            $("#rebate").text("");
  }
  catch(ignore)
  {}

  try
  {
        if(hasDisclaimer)
        {
            $("#shippingDisclaimerInner").html(disclaimerText);
            $("#shipL").css('visibility', 'visible');
	     document.getElementById('shipL').style.visibility = 'visible';
	     document.getElementById('shipL').style.display = 'block';
	     document.getElementById('important-notice').style.display = 'block';
        }
        else
        {
            $("#shippingDisclaimerInner").html("");
            $("#shipL").css('visibility', 'hidden');
        }
  }
  catch(ignore)
  {}

      if(aux1Enabled && numChildren == 1 && !isEmpty(auxDesc1))
      {
    try
    {
        document.getElementById("prod_level_stock").innerHTML = auxDesc1;
            $("#prod_outof_stock").text("");
        $("#dropship").text("");
    }
    catch(ignore)
    {}

    try
    {
        document.getElementById("stock-message").innerHTML = auxDesc1;
      document.getElementById("stock-message-class").className = "stock message out";
    }
    catch(ignore)
    {}
  }
      else if(numChildren == 1)
      {
    try
    {
            if(hasAtLeastOneInStock && !hasAtLeastOneOutOfStock)
      {
              $("#prod_outof_stock").text("");
              $("#prod_level_stock").text("In stock");
            }
      else if(!hasAtLeastOneInStock && hasAtLeastOneOutOfStock)
      {
              $("#prod_level_stock").text("");
              $("#prod_outof_stock").text("Out of stock");
            }
      else
      {
              $("#prod_outof_stock").text("");
              $("#prod_level_stock").text("");
            }

            if(isDropShip)
            {
              $("#dropship").text("Ships from Manufacturer");
            $("#prod_level_stock").text("");
            }
            else
            {
              $("#dropship").text("");
            }
    }
    catch(ignore)
    {}
      }
  else
  {
    try
    {
      $("#prod_outof_stock").text("");
      $("#prod_level_stock").text("");
      $("#dropship").text("");
    }
    catch(ignore)
    {}
  }

      if(numChildren==1)
      {
    try
    {
            $("#item_num_prod_level").text(itemNum);
            skuResolved=true;
            $('#resolvedItemNum').val(itemNum);
            $('#quantityLimit').val(quantityLimit);
            $('#catEntryId').val(resolvedCatentryId);
    }
    catch(ignore)
    {}

    try
    {
      $("#catalog-number").text(itemNum);
            skuResolved=true;
      document.getElementById("catalog-number-class").className = "catalog item number";
    }
    catch(ignore)
    {}

    if(!isBuyable)
    {
      try
      {
        document.getElementById("add-to-cart").className = "cart button container dynamic";
        document.getElementById('add-to-cart').style.display = 'none';
        document.getElementById('add-to-wish-list').style.display = 'none';
      }
      catch(ignore)
      {}
    }
    else
    {
      try
      {
        document.getElementById("add-to-cart").className = "cart button container";
        document.getElementById('add-to-cart').style.display = 'block';
        document.getElementById('add-to-wish-list').style.display = 'block';
      }
      catch(ignore)
      {}
    }

    try
    {
      document.getElementById("your-starting-label").style.display = "none";
      document.getElementById("your-clearance-starting-label").style.display = "none";
      document.getElementById("your-sale-starting-label").style.display = "none";
    }
    catch(ignore)
    {}
      }
      else
      {
    try
    {
            $("#item_num_prod_level").text("");
            skuResolved=false;
    }
    catch(ignore)
    {}

    try
    {
            $("#catalog-number").text("");
            skuResolved=false;
      document.getElementById("catalog-number-class").className = "catalog item number dynamic";
        document.getElementById("stock-message").innerHTML = "";
      document.getElementById("stock-message-class").className = "stock message dynamic out";
    }
    catch(ignore)
    {}
      }
   }
}
catch(error)
{
  ppException = true;
  errorHandler(js_filename, "hideSelect()", error);
}
}

function hideSelect2()
{
try
{
  if(ppddEnabled)
  {
    multiItemDisplay = false;
    hideSelect();
  }
}
catch(error)
{
  ppException = true;
  errorHandler(js_filename, "hideSelect2()", error);
}
}

var defaultSelectFirst = true;
var defaultFixOnce = true;

function initUpdateSelect(itemNumVal)
{
  try
  {
    if(ppddEnabled)
    {
      if(itemNumVal.toString().indexOf("object") != -1)
      {
            if(!swatchEnabled)
                return true;

            var swatchCount = 0;

            if(defaultFixOnce == true)
            {
              try
              {
                $('[id^="swatch_color_"]').each(function()
                {
                        var swatchColorEvent = $(this)[0].getAttribute('onclick').toString();
                    var swatchColor = null;
                    var swStart = swatchColorEvent.indexOf("'");
                    swStart = swatchColorEvent.indexOf("'", ++swStart);
                    swStart = swatchColorEvent.indexOf("'", ++swStart);
                    var swEnd = swatchColorEvent.indexOf("'", ++swStart);

                    if(swStart > -1 && swEnd > swStart)
                      swatchColor = swatchColorEvent.substring(swStart, swEnd);

                    var attrDropDowns = document.getElementById('OrderItemAddForm').getElementsByTagName('select');
                    var attrDDId = null;

                    for(var p = 0; p < attrDropDowns.length; p++)
                    {
                      if(attrDDId ==  null)
                      {
                          for(var r = 0; r < attrDropDowns[p].length; r++)
                          {
                              if(swatchColor == attrDropDowns[p][r].value)
                              {
                                var tempSWId = attrDropDowns[p][r].id;

                                if(tempSWId.length > 13)
                                    attrDDId = tempSWId.substring(13, tempSWId.length);
                                else
                                    attrDDId = tempSWId;

                                break;
                              }
                          }
                      }
                      else
                          break;
                    }

                    var newSWColorId = ("swatch_color_" + attrDDId);
                    var newSWImgId = ("swatch_img_" + attrDDId);

                    if(attrDDId != null && newSWColorId != $(this)[0].id.toString())
                    {
                      $(this)[0].id = newSWColorId;
                      $(this)[0].firstChild.id = newSWImgId;
                    }
                });

                // first make all the swatches disabled.
                $("#swatch_text_name").text('');
                $('[id^="swatch_color_"]').each(function()
                {
                        $(this).removeClass();
                    $(this).parent().css('display', 'none');
                });

                defaultFixOnce = false;
              }
              catch(ignore)
              {}
            }

            // going by the swatch options
            var swatchAttrId = itemNumVal.pkey;
            var defaultFirstSwatch = null;

            $("#"+swatchAttrId+" option:not(option:first)").each(function()
            {
                //get the key
                var thisAttrValueKey = this.id.substring(13);

                  // opt_attr_val_
                  var swatchLink = document.getElementById("swatch_color_" + thisAttrValueKey);
                  var swatchImg = document.getElementById("swatch_img_" + thisAttrValueKey);

                var newImageSetString = null;

                try
                {
                    var clickString = swatchLink.getAttribute('onclick');
                         var tempStr1Start = clickString.indexOf("'");
                  var tempStr1 = clickString.substring(tempStr1Start + 1);
                         var endPlace = tempStr1.indexOf("'");
                         newImageSetString = tempStr1.substring(0, endPlace);
                }
                catch(ignore2)
                {}

                  if(this.selected == true && newImageSetString != null)
                 {
                      // remove any previous class
                        $("#swatch_color_" + thisAttrValueKey).removeClass();

                        // make this swtach active
                       $("#swatch_color_" + thisAttrValueKey).addClass('swatch-select');

                       // set the text
                         $("#swatch_text_name").text(this.text);

                         setImageSet("BassPro/" + newImageSetString);
                  $("#swatch_color_" + thisAttrValueKey).parent().css('display', 'block');

                  swatchCount++;
                  defaultFirstSwatch = null;
                   }
          else
          {
                       // remove any previous class
                         $("#swatch_color_" + thisAttrValueKey).removeClass();

                  if(newImageSetString != null)
                  {
                      // make this swatch active
                      $("#swatch_color_" + thisAttrValueKey).addClass('swatch-available');
                      $("#swatch_color_" + thisAttrValueKey).parent().css('display', 'block');

                      if(swatchCount == 0)
                          defaultFirstSwatch = swatchLink;

                      swatchCount++;
                  }
                  }
            });

            if(defaultFirstSwatch != null && defaultSelectFirst)
            {
                defaultFirstSwatch.click();
                defaultSelectFirst = false;
            }

            return false;
          }
          else if(itemNumVal != "")
          {
        for(var i = 0; i < skuList.length; i++)
        {
          if(skuList[i].itemNumber == itemNumVal && skuList[i].buyable == 'false')
          {
            document.getElementById('addToCartBtn').style.display = 'none';
            document.getElementById('prod_outof_stock').className = 'attribute-out-of-stock';
            break;
          }
          else
          {
            document.getElementById('addToCartBtn').style.display = 'block';
            document.getElementById('prod_outof_stock').className = 'attribute-out-of-stock';
          }
        }
          }
      else
      {
        if(ppdType != "C" && skuList.length == 1 && skuList[0].buyable == 'false')
        {
          hideSelect2();
        }

        if(skuList.length == 1 && skuList[0].buyable == 'false')
        {
          try
          {
            document.getElementById('addToCartBtn').style.display = 'none';
            document.getElementById('prod_outof_stock').className = 'attribute-out-of-stock';
          }
          catch(ignore)
          {}

          try
          {
            document.getElementById('add-to-cart').className = 'cart button container dynamic';
            document.getElementById('add-to-cart').style.display = 'none';
            document.getElementById('add-to-wish-list').style.display = 'none';
          }
          catch(ignore)
          {}
        }
        else
        {
          try
          {
            document.getElementById('addToCartBtn').style.display = 'block';
          }
          catch(ignore)
          {}

          try
          {
            document.getElementById('add-to-cart').className = 'cart button container';
            document.getElementById('add-to-cart').style.display = 'block';
            document.getElementById('add-to-wish-list').style.display = 'block';
          }
          catch(ignore)
          {}
        }

        hideSelect();
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
    if(swatchUpdRm)
    {
        try
        {
        $('[id^="swatch_color_"]').each(function()
        {
                  var swatchColorEvent = $(this)[0].getAttribute('onclick').toString();
          var swatchColor = null;
          var swStart = swatchColorEvent.indexOf("'");
          swStart = swatchColorEvent.indexOf("'", ++swStart);
          swStart = swatchColorEvent.indexOf("'", ++swStart);
          var swEnd = swatchColorEvent.indexOf("'", ++swStart);

          if(swStart > -1 && swEnd > swStart)
            swatchColor = swatchColorEvent.substring(swStart, swEnd);

          var attrDropDowns = document.getElementById('OrderItemAddForm').getElementsByTagName('select');
          var attrDDId = null;

          for(var p = 0; p < attrDropDowns.length; p++)
          {
            if(attrDDId ==  null)
            {
              for(var r = 0; r < attrDropDowns[p].length; r++)
              {
                if(swatchColor == attrDropDowns[p][r].value)
                {
                  var tempSWId = attrDropDowns[p][r].id;

                  if(tempSWId.length > 13)
                    attrDDId = tempSWId.substring(13, tempSWId.length);
                  else
                    attrDDId = tempSWId;

                  break;
                }
              }
            }
            else
              break;
          }

          var newSWColorId = ("swatch_color_" + attrDDId);
          var newSWImgId = ("swatch_img_" + attrDDId);

          if(attrDDId != null && newSWColorId != $(this)[0].id.toString())
          {
            $(this)[0].id = newSWColorId;
            $(this)[0].firstChild.id = newSWImgId;
          }
        });

        // first make all the swatches disabled.
        $("#swatch_text_name").text('');
        $('[id^="swatch_color_"]').each(function()
        {
                  $(this).removeClass();
          $(this).parent().css('display', 'none');
        });
        }
        catch(ignore)
        {}
    }
  }
  catch(error)
  {
    ppException = true;
    errorHandler(js_filename, "updateSelect()", error);
  }
}
