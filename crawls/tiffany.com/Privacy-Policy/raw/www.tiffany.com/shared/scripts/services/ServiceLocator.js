// ----------------------------------------------
// File:		ServiceLocator.js
// Author:		Nathan Derksen
// Description:	Singleton class used to keep track of web services.
//				Implemented to provide a layer of abstraction between JS and services implementation,
//				and so that all services can be accessed from one place. Also provides a regulated
//				callback interface for each service
// Example:
// ServiceLocator.getInstance().registerService("getProductsService", new GetProductsService());
// ServiceLocator.getInstance().getService("getProductsService").getProducts("bracelets", 0, 12);
// ----------------------------------------------


// ----------------------------------------------
// Function:	ServiceLocator
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<none>
// Returns:		<nothing>
// ----------------------------------------------
function ServiceLocator()
{
	this.pInstance = null;
	
	this.pServices = new Array();
}

// ----------------------------------------------
// Function:	ServiceLocator.getInstance()
// Author:		Nathan Derksen
// Description:	Singleton access method
// Inputs:		<none>
// Returns:		<ServiceLocator> Handle to a single ServiceLocator instance
// ----------------------------------------------
ServiceLocator.getInstance = function()
{
	if (!this.pInstance)
	{
		this.pInstance = new ServiceLocator();
	}
	return this.pInstance;
};

// ----------------------------------------------
// Function:	ViewLocator.registerService()
// Author:		Nathan Derksen
// Description:	Method to register a service
// Inputs:		<String> serviceName: A name to refer to this service. Can be any string, and is used
//					for later access to the service
//				<Object> serviceHandler: A handle to a service class instance. The service class
//					instance will register one method for each service call made available from
//					the service, as well as onResult and onError handlers.
// Returns:		<Nothing>
// ----------------------------------------------
ServiceLocator.prototype.registerService = function(serviceName, serviceHandler)
{
	if (serviceName)
	{
		if (serviceHandler)
		{
			this.pServices[serviceName] = serviceHandler;
		}
	}
};

// ----------------------------------------------
// Function:	ServiceLocator.getView()
// Author:		Nathan Derksen
// Description:	Method to access a previously registered service
// Inputs:		<None>
// Returns:		<Object>: The handle to the service handler instance
// ----------------------------------------------
ServiceLocator.prototype.getService = function(serviceName)
{
	if (serviceName)
	{
		if (this.pServices[serviceName])
		{
			return this.pServices[serviceName];
		}
	}
	return null;
};