var is_ie = (navigator.userAgent.indexOf('MSIE') >= 0) ? 1 : 0; 
var is_ie5 = (navigator.appVersion.indexOf("MSIE 5.5")!=-1) ? 1 : 0; 
var is_opera = ((navigator.userAgent.indexOf("Opera6")!=-1)||(navigator.userAgent.indexOf("Opera/6")!=-1)) ? 1 : 0; 
//netscape, safari, mozilla behave the same??? 
var is_netscape = (navigator.userAgent.indexOf('Netscape') >= 0) ? 1 : 0; 

function xmlGetData(url,clientProcessor){ 
    //alert("GetData: "+ url);
    if (url.length > 0){ 
        var objJSONresult;
        //create the state handler
        this.stateChanged = function() {
		    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 'complete') { 
                //Gather the results from the callback 
                objJSONresult = eval('(' + xmlHttp.responseText + ')');
                //Populate the innerHTML of the div with the results 
                clientProcessor(objJSONresult);
		    }
	    }
        var xmlHttp = GetXmlHttpObject(this.stateChanged); 
        xmlHttp.open('GET', url, true); 
	    xmlHttp.send(null); 
    } 
} 

function GetXmlHttpObject(handler) { 
    var objXmlHttp = null;    //Holds the local xmlHTTP object instance 

    //Depending on the browser, try to create the xmlHttp object 
    if (is_ie){ 
        //The object to create depends on version of IE 
        //If it isn't ie5, then default to the Msxml2.XMLHTTP object 
        var strObjName = (is_ie5) ? 'Microsoft.XMLHTTP' : 'Msxml2.XMLHTTP'; 
         
        //Attempt to create the object 
        try{ 
            objXmlHttp = new ActiveXObject(strObjName); 
            objXmlHttp.onreadystatechange = handler; 
        } 
        catch(e){ 
        //Object creation errored 
            alert('IE detected, but object could not be created. Verify that active scripting and activeX controls are enabled'); 
            return; 
        } 
    } 
    else if (is_opera){ 
        //Opera has some issues with xmlHttp object functionality 
        alert('Opera detected. The page may not behave as expected.'); 
        return; 
    } 
    else{ 
        // Mozilla | Netscape | Safari 
        objXmlHttp = new XMLHttpRequest(); 
        objXmlHttp.onload = handler; 
        objXmlHttp.onerror = handler; 
    } 
     
    //Return the instantiated object 
    return objXmlHttp; 
} 


//function xmlGetPage(url,clientProcessor){ 
//    alert("xmlGetPage: "+ url);
//    if (url.length > 0){ 
//        //Create the xmlHttp object to use in the request 
//        //stateChangeHandler will fire when the state has changed, i.e. data is received back 
//        // This is non-blocking (asynchronous) 
//        var handler =  function() { stateChangeHTMLHandler(clientProcessor); };
//        xmlHttp = GetXmlHttpObject(handler); 
//         
//        //Send the xmlHttp get to the specified url 
//        objHTMLresult = null;
//        xmlHttp_Get(xmlHttp, url); 
//    } 
//    else { 
//        //Textbox blanked out, clear the results 
//        //document.getElementById('nameList').innerHTML = ''; 
//    } 
//} 

////stateChangeHandler will fire when the state has changed, i.e. data is received back 
//// This is non-blocking (asynchronous) 
//function stateChangeHTMLHandler(clientProcessor) 
//{ 
//    //alert("stateChangeHTMLHandler: "+ xmlHttp.readyState);

//    //readyState of 4 or 'complete' represents that data has been returned 
//    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 'complete'){ 
//        //alert("complete: " + xmlHttp.responseText);
//   		//Get the response from the server and extract the section that comes in the body section of the second html page avoid inserting the header part of the second page in your first page's element
//		var respText = xmlHttp.responseText.split('<body>');
//        objHTMLresult =  respText[1].split('</body>')[0];
//        
//        //alert("got data");

//        //Populate the innerHTML of the div with the results 
//       clientProcessor();
//       //alert("processor called");
//    } 
//} 

////stateChangeHandler will fire when the state has changed, i.e. data is received back 
//// This is non-blocking (asynchronous) 
//function stateChangeHandler(clientProcessor) 
//{ 
//    //alert("stateChangeHandler: "+ xmlHttp.readyState);

//    //readyState of 4 or 'complete' represents that data has been returned 
//    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 'complete'){ 
//        //alert("complete: " + xmlHttp.responseText);
//        //Gather the results from the callback 
//        objJSONresult = eval('(' + xmlHttp.responseText + ')');
//        //alert("got data");

//        //Populate the innerHTML of the div with the results 
//       clientProcessor();
//       //alert("processor called");
//    } 
//} 

//// XMLHttp send GET request 
//function xmlHttp_Get(xmlhttp, url) { 
//    xmlhttp.open('GET', url, true); 
//    xmlhttp.send(null); 
//} 

