// Global variables
var g_registeredListenersArray = new Array();

// ----------------------------------------------
// Function:	generateEvent
// Author:		Nathan Derksen
// Description:	Broadcast an event to registered listeners
// Inputs:		(String) eventName - The name of the event to broadcast.
//					arguments[1] .. arguments[n] (Variant) - Any number of optional arguments
//					to pass as part of the broadcast.
// Returns:		<nothing>
// ----------------------------------------------
function generateEvent(eventName)
{
	var eventHandle;
	var argumentsString = "";

	// Create a way of accessing the passed-in optional arguments through an argument 
	// passed to an eval() statement.
	for (var i=1; i < arguments.length; i++)
	{
		if (i == 1)
		{
			argumentsString = "arguments[1]";
		}
		else
		{
			argumentsString += ", arguments[" + i + "]";
		}
	}

	// Go through the array of registered listeners, check to see if there is
	// an event handler for the given event. If there is, call it through eval(),
	// and pass in the list of arguments to give to the event handlers.
	for (i=0; i < g_registeredListenersArray.length; i++)
	{
		eventHandle = eval("g_registeredListenersArray[i]." + eventName);
		if (eventHandle)
		{
					
			eval("eventHandle(" + argumentsString + ")");
		}
	}
}

// ----------------------------------------------
// Function:	subscribe
// Author:		Nathan Derksen
// Description:	Subscribe an event handler object as an interested listener
// Inputs:		(Object) callbackObject - An object that contains a method for each
//						event that it is interested in.
// Returns:		<nothing>
// Example:     var g_productGridEventHandler = new ProductGridEventHandler();
// 				subscribe(g_productGridEventHandler);
// ----------------------------------------------
function subscribe(callbackObject)
{
	g_registeredListenersArray.push(callbackObject);
}

// ----------------------------------------------
// Function:	subscribe
// Author:		Nathan Derksen
// Description:	Unsubscribe an event handler object from being an interested listener
// Inputs:		(Object) callbackObject - The same object passed for the subscribe event.
// Returns:		<nothing>
// ----------------------------------------------
function unsubscribe(callbackObject)
{
	for (var i=0; i < g_registeredListenersArray.length; i++)
	{
		if (g_registeredListenersArray[i] == callbackObject)
		{
			g_registeredListenersArray = g_registeredListenersArray.slice(i, 1);
			return true;
		}
	}
	return false;
}