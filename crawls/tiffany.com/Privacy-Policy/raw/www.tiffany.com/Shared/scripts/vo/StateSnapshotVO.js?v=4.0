// ----------------------------------------------
// File:		StateSnapshot.js
// Author:		Nathan Derksen
// Description:	Value Object - stores model information about one particular set of product data
// ----------------------------------------------

function StateSnapshotVO()
{
	this.currentPage = 0;
	this.numResults = 0;
	this.numPages = 0;
	this.gridName = "";
	this.gridOuterContainer = null;
	this.gridHolder = null;
	this.products = new Array();
	this.pageSize = 6;
	this.currentProductGrid = "viewPaged";
	
	this.category = "";
	this.sortCriteria = 9999;
	this.refinement = "";
	this.searchTerms = "";
	this.relatedItemSku = "";
	this.onlyItems = "1";
	this.isNormalized = "";
	this.popup = "";
	this.flash = "";
}


StateSnapshotVO.prototype.toString = function()
{
	var str = "";
	str += "currentPage:             " + this.currentPage + "\n";
	str += "numResults:              " + this.numResults + "\n";
	str += "numPages:                " + this.numPages + "\n";
	str += "gridName:                " + this.gridName + "\n";
	str += "products:                " + this.products + "\n";
	str += "pageSize:                " + this.pageSize + "\n";
	str += "currentProductGrid:      " + this.currentProductGrid + "\n";
	str += "\n";
	str += "category:                " + this.category + "\n";
	str += "sortCriteria:            " + this.sortCriteria + "\n";
	str += "refinement:              " + this.refinement + "\n";
	str += "searchTerms:             " + this.searchTerms + "\n";
	str += "relatedItemSku:          " + this.relatedItemSku + "\n";
	str += "onlyItems:               " + this.onlyItems + "\n";
	str += "isNormalized:            " + this.isNormalized + "\n";
	str += "popup:                   " + this.popup + "\n";
	str += "flash:                   " + this.flash + "\n";
	
	return str;
};