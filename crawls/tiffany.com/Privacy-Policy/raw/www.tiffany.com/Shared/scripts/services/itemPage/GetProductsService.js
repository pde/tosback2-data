﻿// ----------------------------------------------
// File:		GetProductsService.js
// Author:		Nathan Derksen
// Description:	A class that holds the available service methods, along with response handlers.
// Example:
// GetProductsService.getInstance().getProducts(searchCriteria, 0, 12);
// ----------------------------------------------

// ----------------------------------------------
// Function:	GetProductsService
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<none>
// Returns:		<nothing>
// ----------------------------------------------
function GetProductsService()
{
}

// ----------------------------------------------
// Function:	GetProductsService.getProducts
// Author:		Nathan Derksen
// Description:	Calls the service to retrieve a set of products
// Inputs:		<Object> searchCriteria - An object of properties to search on
//				<Number> startIndex - The zero-based index of which row to start at in the total results
//				<Number> maxResults - The maximum number of results to return
// Returns:		<nothing>
// ----------------------------------------------
GetProductsService.prototype.getData = function(queryString)
{
	try
	{
		var gridName = URLFactory.extractValue(queryString, "currentProductGrid");
		var currentPage = Number(URLFactory.extractValue(queryString, "currentPage"));
		var sku = ProductModel.getInstance().getSKU();
		var pageQueryString = window.location.search.split("?").join("");
		var sortCriteria = URLFactory.extractValue(queryString, "sortCriteria");
		var relatedItemType = 1;
		var search = false;
		var searchQSVal = URLFactory.extractQueryStringValue(pageQueryString, "search");
		var queryStringSearchParams = URLFactory.extractQueryStringValue(pageQueryString, "search_params");
		var selectedFilters;
		var serviceHash;
		var parent = this;

		var productsGrid = ViewLocator.getInstance().getView("productsGrid");

		if (productsGrid.isPageCached(currentPage - 1) == false)
		{
			if (document.forms[0].relatedItemType)
			{
				relatedItemType = Number(document.forms[0].relatedItemType.value);
			}

			if (searchQSVal == "1")
			{
				search = true;
			}

			if (isAjaxEnabled() == true)
			{
				if (gridName.toLowerCase() == "viewrelated" && sku != "")
				{
					PageMethods.GetRelatedItemsXml(sku, String(currentPage), relatedItemType, function(result)
					{
						parent.onResult(result, queryString);
					}, this.onError);
				}
				else if (locale.toLowerCase().indexOf("watch"))
				{
					// Changes specific to watches, isolated to remove effect on normal e-comm
					// item page. Ideally, this and next condition merged together to use queryString
					// as the data source, and handle queryStringSearchParams only in itemPage.js
					selectedFilters = URLFactory.extractValue(queryString, "selectedFilters");
					serviceHash = URLFactory.convertHashToServiceHash(queryString);
					if (selectedFilters != "") { serviceHash += "-k+" + selectedFilters; }
					serviceHash = URLFactory.updateHash(serviceHash, "onlyItems", "1");
					// Use a proxy function handler so that we can pass in the original query string for the
					// function call. Otherwise, if multiple calls are made quickly from swiping, the data
					// returned may no longer be for the current page and so model.getPageNum() may not be correct.
					PageMethods.GetItemsXmlBySearchQS(serviceHash, search, function(result)
					{
						parent.onResult(result, queryString); 
					}, this.onError);
				}
				else if (queryStringSearchParams != "")
				{
					selectedFilters = URLFactory.extractValue(queryStringSearchParams, "selectedFilters");
					serviceHash = URLFactory.convertHashToServiceHash(queryString);
					if (selectedFilters != "") { serviceHash += "-k+" + selectedFilters; }
					PageMethods.GetItemsXmlBySearchQS(serviceHash, search, function(result)
					{
						parent.onResult(result, queryString);
					}, this.onError);
				}
				else if (URLFactory.extractQueryStringValue(pageQueryString, "cid") != "")
				{
					PageMethods.GetItemsXmlByCategoryID(URLFactory.extractQueryStringValue(pageQueryString, "cid"), sku, currentPage, function(result)
					{
						parent.onResult(result, queryString);
					}, this.onError);
				}
				else
				{
					PageMethods.GetItemsXmlBySku(sku, String(currentPage), function(result)
					{
						parent.onResult(result, queryString);
					}, this.onError);
				}
			}
		}
	}
	catch (err)
	{
		Debug.error(err);
	}
};

// ----------------------------------------------
// Function:	GetProductsAndCategoriesService.getProducts
// Author:		Nathan Derksen
// Description:	Calls the service to retrieve a set of products
// Inputs:		<Object> searchCriteria - An object of properties to search on
//				<Number> startIndex - The zero-based index of which row to start at in the total results
//				<Number> maxResults - The maximum number of results to return
// Returns:		<nothing>
// ----------------------------------------------
GetProductsService.prototype.getJSONData = function()
{
	try
	{
		var resultProductArray = [];
		if (typeof(tblData) != "undefined")
		{
			resultProductArray = ProductFactory.convertJSONToArray(tblData);
		}
		
		var numHits = 0;
		if (typeof(gridData) != "undefined")
		{
			numHits = gridData.numHits;
		}

		var productsGrid = ViewLocator.getInstance().getView("productsGrid");
		productsGrid.setProducts(resultProductArray, model.getPageNum());
		
		var model = ProductModel.getInstance();
		model.setNumProducts(numHits);
		model.setProducts(resultProductArray);	
	}
	catch (err)
	{
		Debug.error(err);
	}
};

// ----------------------------------------------
// Function:	GetProductsService.onResult
// Author:		Nathan Derksen
// Description:	Callback from the successful completion of the service call
// Inputs:		<XMLElement> result - Handle to the results xml object
// Returns:		<nothing>
// ----------------------------------------------
GetProductsService.prototype.onResult = function(result, queryString)
{
	try
	{
		if (result)
		{
			var resultElements = result.documentElement;
			var resultProductArray = ProductFactory.convertXMLToArray(resultElements);
			var resultCategoryArray = CategoriesFactory.convertXMLToObjects(resultElements);
			var numHits = ProductFactory.getTotalNumProducts(resultElements);
			var model = ProductModel.getInstance();
			var currentPage = model.getPageNum();

			if (typeof (queryString) != "undefined" && queryString != null && URLFactory.extractValue(queryString, "currentPage") != null)
			{
				currentPage = Number(URLFactory.extractValue(queryString, "currentPage")) - 1;
			}

			model.setNumProducts(numHits);
			model.setProducts(resultProductArray);

			var productsGrid = ViewLocator.getInstance().getView("productsGrid");
			productsGrid.setProducts(resultProductArray, currentPage);

			if (locale.toLowerCase().indexOf("watch") > -1)
			{
				if (resultCategoryArray.length == 0)
				{
					disableFilterMenu();
				}
				else
				{
					var currentSKU = model.getSKU();
					var browseStates = model.getBrowseStates();

					CategoriesModel.getInstance().addMenus(resultCategoryArray);
				}
			}
			$("#staticBorderLeft").show();
			$("#staticBorderRight").show();
		}
		else
		{
			var tempArray = new Array();
			var productsGrid = ViewLocator.getInstance().getView("productsGrid");
			productsGrid.setProducts(tempArray);

			var error = new Object();
			error.name = "Service 'GetProductsService' returned with no results";
			error.message = error.name;
			error.fileName = "itemPage/GetProductsService.js";
			error.lineNumber = "";
			Debug.error(error);
		}
	}
	catch (err)
	{
		Debug.error(err);
	}
};

// ----------------------------------------------
// Function:	GetProductsService.onError
// Author:		Nathan Derksen
// Description:	Callback from the unsuccessful completion of the service call
// Inputs:		<XMLElement> result - Handle to the results xml object
// Returns:		<nothing>
// ----------------------------------------------
GetProductsService.prototype.onError = function(result)
{
	var tempArray = new Array();
	var productsGrid = ViewLocator.getInstance().getView("productsGrid");
	productsGrid.setProducts(tempArray);
	
	var error = new Object();
	error.name = "Service 'GetProductsService' returned with an error";
	error.message = result.get_message();
	error.fileName = "itemPage/GetProductsService.js";
	error.lineNumber = "";
	Debug.error(error);
	if (error.message.indexOf("Authentication") >= 0)
	    window.location = "../Default.aspx";
};
