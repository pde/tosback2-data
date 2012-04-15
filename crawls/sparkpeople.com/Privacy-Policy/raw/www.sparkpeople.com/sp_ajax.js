function SPAJAX_createRequestObject() 
{
    var tmpHTTPObj;

	if (window.XMLHttpRequest) { 
        // Mozilla, Safari use this 
        tmpHTTPObj = new XMLHttpRequest();
	
    } else if (window.ActiveXObject) { 
        // IE use this
        tmpHTTPObj = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    return tmpHTTPObj;
}

function SPAJAX_makeRequest(objSPAJAX, strRequestType, strURL, callFunction)
{
    //make a connection to the server
    objSPAJAX.open(strRequestType, strURL);
	
    //assign a handler for the response
    objSPAJAX.onreadystatechange = callFunction;
	
    //send the request
    objSPAJAX.send('');
}
