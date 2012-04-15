function proddetailimg(asource, alink, obj)
{
	Form1.mainimage.src = asource; 
	
	var changelink = 'javascript: var enlargeimage=window.open(\''+alink+'\', \'EnlargeImage\', \'height=550, width=700, top=50, screenY=50, left=100, screenX=100, scrollbars=yes\')';
	
	aimagelink.href = changelink;
	var ID = 
	document.getElementById(obj).href = changelink;
//	_ctl3__ctl2_aEnlarge.href = changelink;
}



function ShowFloat(obj)
{
	document.getElementById(obj).className= "show";
}

function HideFloat(obj)
{
	document.getElementById(obj).className= "hide";
}

if (document.layers) { // Netscape
	document.captureEvents(Event.MOUSEMOVE);
	document.onmousemove = captureMousePosition;
} else if (document.all) { // Internet Explorer
	document.onmousemove = captureMousePosition;
} else if (document.getElementById) { // Netcsape 6
	document.onmousemove = captureMousePosition;
}
// Global variables
xMousePos = 0; // Horizontal position of the mouse on the screen
yMousePos = 0; // Vertical position of the mouse on the screen
xMousePosMax = 0; // Width of the page
yMousePosMax = 0; // Height of the page
function captureMousePosition(e) {

//    try
//    {
	    if (document.layers) {
		    xMousePos = e.pageX;
		    yMousePos = e.pageY;
		    xMousePosMax = window.innerWidth+window.pageXOffset;
		    yMousePosMax = window.innerHeight+window.pageYOffset;
	    } else if (document.all) {
	        if(document.body)
	        {
		        xMousePos = window.event.x+document.body.scrollLeft;
		        yMousePos = window.event.y+document.body.scrollTop;
		        xMousePosMax = document.body.clientWidth+document.body.scrollLeft;
		        yMousePosMax = document.body.clientHeight+document.body.scrollTop;
		    }
	    } else if (document.getElementById) {
		    xMousePos = e.pageX;
		    yMousePos = e.pageY;
		    xMousePosMax = window.innerWidth+window.pageXOffset;
		    yMousePosMax = window.innerHeight+window.pageYOffset;
	    }
//	}
//	catch(e)
//	{}
}
function setMouseOverPosition(obj, whdt, hdtd)
{   
	obj.style.position = 'absolute';
	//alert(hdtd.height);
	//alert(whdt.width);
	//obj.style.top = (yMousePos - (hdtd.height - 0))+'px'; 
	//obj.style.left = (xMousePos - (whdt.width - 0))+'px';
	obj.style.top = ((yMousePos - hdtd.height) - 20)+'px'; 
	obj.style.left = ((xMousePos - whdt.width) - 90)+'px';
	//obj.style.top = (yMousePos )+'px'; 
	//obj.style.left = (xMousePos )+'px';
	obj.style.zindex = 99;
}


function setCalMouseOver(popobj, obj, whdt, hdtd)
{
	popobj.className = 'show';
	setMouseOverPosition(obj, whdt, hdtd);
}
function setCalMouseOut(obj)
{
	obj.className = 'hide';
}


function setMouseOverPosition_Family(obj2, obj, obj3)
{ 

  getElementByIdCompatible(obj2).className = 'show';

	getElementByIdCompatible(obj).style.position = 'absolute';
	getElementByIdCompatible(obj).style.top = (getElementByIdCompatible(obj3).offsetTop + 330) +'px'; 
	if (typeof document.getElementById == 'object') 
  {
    getElementByIdCompatible(obj).style.left = (getElementByIdCompatible(obj3).offsetLeft + 435) +'px';
  }
    else if (typeof document.getElementById == 'function') 
  {
	  getElementByIdCompatible(obj).style.left = (getElementByIdCompatible(obj3).offsetLeft + 605) +'px';
	}
	getElementByIdCompatible(obj).style.zindex = 99;
}



function getElementByIdCompatible (the_id) 
{
  if (typeof the_id != 'string') {
  return the_id;
  }

  if (typeof document.getElementById != 'undefined') 
  {
    return document.getElementById(the_id);
  } 
  else if (typeof document.all != 'undefined') 
  {
    return document.all[the_id];
  } 
  else if (typeof document.layers != 'undefined') 
  {
    return document.layers[the_id];
  } 
  else 
  {
    return null;
  }
}


/*************************************************************************************

                            SSL LOGIN SCRIPTS

**************************************************************************************/

            var SignInModalPopup;
            var RegModalPopup;
            var HdnClientID;
             
            function InitSSLScripts(clientID)
		    { 
                initializePopupObjects();
                CallPopup(clientID);
                // DISABLE AUTOCOMPLETE
                disableAutoComplete();
            }
                               
		    function initializePopupObjects()
		    {
		        SignInModalPopup = $find('bhvrSignIn');
                RegModalPopup = $find('bhvrRegstnID');
		    }
		
		    function CallPopup(clientID)
		    {
		        HdnClientID = clientID;
		        var strReqURL = document.location.href;
                var indxReqURL = strReqURL.toLowerCase().indexOf("https");
                
                if (indxReqURL != -1)
                {
                    var PopUpType = document.getElementById(clientID).value; 
                    if (typeof PopUpType !== 'undefined' && PopUpType != null)
                            ShowPopupOnSelection(PopUpType);
                    
                    // CLEAR THE VALUE      
                   document.getElementById(clientID).value = "";    
                   
                   // SWITCH BACK TO HTTP
                  // fnSwitchToHTTP();  
                }
		    }
		
            function ShowPopupOnSelection(PopUpType)
            {
                // CLEAR INPUT FIELDS
                fnClearInputFields();
             
                if(PopUpType.indexOf("LOGIN_POPUP") != -1)
                {                    
                    if(SignInModalPopup != null)
                    {
                        SignInModalPopup.show(); 
                    }
                    if(RegModalPopup != null)
                    {
                        RegModalPopup.hide(); 
                    }
                }
                else if(PopUpType.indexOf("REG_POPUP") != -1)
                {                    
                    if(RegModalPopup != null)
                    {
                        RegModalPopup.show(); 
                    }
                    if(SignInModalPopup != null)
                    {
                        SignInModalPopup.hide(); 
                    }
                }
                
                return false;         
            }
            
		    function fnClickedBtn(btnClickedId)
		    {
		       if(btnClickedId.indexOf("NON_POPUP") != -1)
		       {
		          if (typeof HdnClientID !== 'undefined' && HdnClientID != null)
                            document.getElementById(HdnClientID).value = "NON_POPUP";    
		       }
               
               fnSwitchToSSL();
		    }
		    
		    function fnSwitchToSSL() 
            {
          
                var strFormAction = document.forms[0].action.toString();

                if (strFormAction.toLowerCase().indexOf("http:") == 0) 
                {
                     strFormAction = "https" + strFormAction.substring(4);
                  // strFormAction = "http" + strFormAction.substring(4);

                    document.forms[0].action = strFormAction;
                }
                else if (strFormAction.toLowerCase().indexOf("http") == -1) 
                {
                    var strReqURL = document.location.href;
                    var indxReqURL = strReqURL.toLowerCase().indexOf("default");
                    
                    if (indxReqURL != -1)
                    {
                        strReqURL = strReqURL.substring(0,indxReqURL);
                       
                        if (strReqURL.toLowerCase().indexOf("http:") == 0) 
                        {
                           strReqURL = "https" + strReqURL.substring(4);
                         //strReqURL = "http" + strReqURL.substring(4);
                        }
                        
                        strFormAction = strReqURL + strFormAction;
                    } 
                    else
                    {
                        if (strReqURL.toLowerCase().indexOf("http:") == 0) 
                        {
                         strReqURL = "https" + strReqURL.substring(4);
                          //  strReqURL = "http" + strReqURL.substring(4);
                        }
                        
                         strFormAction = strReqURL;
                    }
                    
                    document.forms[0].action = strFormAction;
                }
            }
		    
		    function fnFinalizeCalls() 
            {
                fnClearInputFields();
                
               // fnSwitchToHTTP();
		    }
		    
		    function fnSwitchToHTTP() 
            {
                var strReqURL = document.location.href;
                
                if (strReqURL.toLowerCase().indexOf("https:") == 0) 
                {
                  strReqURL = "http" + strReqURL.substring(5); 
                }
              
                // RESET
                parent.window.location.href = strReqURL;
            }
            
            function fnClearInputFields()
            { 
                var loginElements = document.getElementById('tblLogin').getElementsByTagName('input'); 
                var regElements = document.getElementById('tblRegistration').getElementsByTagName('input'); 
                var inputElements = fnConcatElements(loginElements, regElements);  
                for (var i=0; i < inputElements.length; i++) 
                {
                    if (inputElements[i].type == 'text') 
                    {
                        inputElements[i].value = '';
                    }
                }
            }
            
            function fnConcatElements(Arr1, Arr2) 
            {
                var indx;
                var arrT = new Array();
                var lenArr1 = Arr1.length;
                var lenArr2 = Arr2.length;
                
                for (indx = 0; indx < lenArr1; indx++) 
                {
                    arrT.push(Arr1[indx]);
                }
                
                for (indx = 0; indx < lenArr2; indx++) 
                {
                    arrT.push(Arr2[indx]);
                }
                
                return arrT;
           }
            
           function disableAutoComplete() 
           { 
              var formObj = document.getElementsByTagName('form')[0]; 
              formObj.setAttribute("autocomplete", "off"); 
           } 
    
/*************************************************************************************

                            SSL LOGIN SCRIPTS END

**************************************************************************************/
