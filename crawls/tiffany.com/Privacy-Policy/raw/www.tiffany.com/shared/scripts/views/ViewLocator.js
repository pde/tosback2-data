// ----------------------------------------------
// File:		ViewLocator.js
// Author:		Nathan Derksen
// Description:	Singleton class used to keep track of page elements and components.
//				Implemented to provide a layer of abstraction so that knowledge of how a
//				component or element is actually placed on the page is kept to a minimum,
//				and so that all view elements can be accessed from one place.
// Example:
// ViewLocator.getInstance().registerView("productGrid", document.getElementById("productsHolder"));
// ViewLocator.getInstance().getView("productGrid").innerHTML = "foo";
// ----------------------------------------------

// ----------------------------------------------
// Function:	ViewLocator
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<none>
// Returns:		<nothing>
// ----------------------------------------------
function ViewLocator()
{
	this.pInstance = null;
	
	this.pViews = new Array();
}

// ----------------------------------------------
// Function:	ViewLocator.getInstance()
// Author:		Nathan Derksen
// Description:	Singleton access method
// Inputs:		<none>
// Returns:		<ViewLocator> Handle to a single ViewLocator instance
// ----------------------------------------------
ViewLocator.getInstance = function()
{
	if (!this.pInstance)
	{
		this.pInstance = new ViewLocator();
	}
	return this.pInstance;
};

// ----------------------------------------------
// Function:	ViewLocator.registerView()
// Author:		Nathan Derksen
// Description:	Method to register a view
// Inputs:		<String> viewName: A name to refer to this view. Can be any string, and is used
//					for later access to the view
//				<Object> viewHandle: A handle to a view element to register. Typically this will
//					be a DOM element handle, but can also be a component class instance.
// Returns:		<Nothing>
// ----------------------------------------------
ViewLocator.prototype.registerView = function(viewName, viewHandle)
{
	this.pViews[viewName] = viewHandle;
};

// ----------------------------------------------
// Function:	ViewLocator.getView()
// Author:		Nathan Derksen
// Description:	Method to access a previously registered view
// Inputs:		<None>
// Returns:		<Object>: The handle to the view, typically a DOM element, but can also be a 
//					component class Instance
// ----------------------------------------------
ViewLocator.prototype.getView = function(viewName)
{
	if (this.pViews[viewName])
	{
		return this.pViews[viewName];
	}
	return null;
};