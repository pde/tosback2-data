
function showPopup(targetObjectId, eventObj) 
{
      CB.EventUtils.addEventListener(document,'click',hideCurrentPopup);
	 if(eventObj) {
	// hide any currently-visible popups
	hideCurrentPopup();
	//hideAd();
	// stop event from bubbling up any farther
	eventObj.cancelBubble = true;
	// and make it visible
	if( changeObjectVisibility(targetObjectId, 'visible') ) {
	    // if we successfully showed the popup
	    // store its Id on a globally-accessible object
	    window.currentlyVisiblePopup = targetObjectId;
	    return true;
	} else {
	    // we couldn't show the popup, boo hoo!
	    return false;
	}
    } else {
	// there was no event object, so we won't be able to position anything, so give up
	return false;
    }
} // showPopup

/*function showPopupCenter(targetObjectId) 
{
	// hide any currently-visible popups
	hideCurrentPopup();
	hideAd();
	
	// and make it visible
	if( changeObjectVisibility(targetObjectId, 'visible') ) {
	    // if we successfully showed the popup
	    // store its Id on a globally-accessible object
	    window.currentlyVisiblePopup = targetObjectId;
	    
	    obj = document.getElementById(targetObjectId);
	    obj.style.left = (screen.width / 2) - 250 + 'px';
	    obj.style.top = (screen.height / 2) - 350 + 'px';
	    
	    hideDropDownBoxes();
	    return true;
	} else {
	    // we couldn't show the popup, boo hoo!
	    return false;
	}
  
} // showPopup */

function showJRPopup(targetObjectId, eventObj, gotohref) 
{
    //document.onclick = '';

	 if(eventObj) {
	// hide any currently-visible popups
	hideCurrentPopup();
	//hideAd();
	// stop event from bubbling up any farther
	eventObj.cancelBubble = true;
	// and make it visible
	if( changeObjectVisibility(targetObjectId, 'visible') ) {
	    // if we successfully showed the popup
	    var divPopupURL = document.getElementById('hdnJobURL');
	    divPopupURL.value = gotohref;

	    // store its Id on a globally-accessible object
	    window.currentlyVisiblePopup = targetObjectId;
	    return true;
	} else {
	    // we couldn't show the popup, boo hoo!
	    return false;
	}
    } else {
	// there was no event object, so we won't be able to position anything, so give up
	return false;
    }
} // showPopup

function showJRPopupCenter(targetObjectId, gotohref, emailObj, popuptype) 
{

     //document.onclick = '';
	// hide any currently-visible popups
	hideCurrentPopup();
	hideAd();
	
	// and make it visible
	if( changeObjectVisibility(targetObjectId, 'visible') ) {
	    // if we successfully showed the popup
	    // store its Id on a globally-accessible object
	    window.currentlyVisiblePopup = targetObjectId;
	    

	    
	    if(emailObj != null)
	    {
	        CB.Tally('JobDetails.aspx','FrontEnd','ExtPopSawEmail');
	    }
		else
		{
		    CB.Tally('JobDetails.aspx','FrontEnd','ExtPopSawGoodLuck');
		}
	    
	    var divPopupURL = document.getElementById('hdnJobURL');
	    divPopupURL.value = gotohref;
	    
	    var divPopupType = document.getElementById('hdnURLType');
	    divPopupType.value = popuptype;
	    
	    //if popup type is APPLNK then we don't want to show the email request
	    if(popuptype == 'APPLNK')
	    {
	        if(document.getElementById('appGetEmail') != null)
	        {
	            var divEmail = document.getElementById('appGetEmail');
	            divEmail.style.visibility = 'hidden';  
	        }
	        
	        var divPopMessage = document.getElementById('popMessage');
	        divPopMessage.innerHTML = 'We are taking you to a partner site with information about this job and company. ';
            divPopMessage.innerHTML += 'We also found other jobs like this one and will open them in a separate browser window under this one. <br /><br />';
            divPopMessage.innerHTML += '<span class=\"jasonsemphasize\">Be sure to check them out after you have viewed the upcoming page at our partner\'s site!</span>';
	    
	        //change button to regular Continue
	        var imgContinue = document.getElementById('imgExtContinue');
	        imgContinue.src = 'http://img.icbdr.com/images/JS/Widgets/extpopcontinuenoapp.gif';
	    }
	
	    var transBack = document.getElementById('semiBackground');
	    transBack.style.height = getDocumentHeight() + 'px';
	    transBack.style.width = getDocumentWidth() + 'px';
	    transBack.style.visibility = 'visible';
	    
	    obj = document.getElementById(targetObjectId);
	    var curpos = getYScrollPos();
	    obj.style.left = (getWindowWidth() / 2) - 190 + 'px';
	    obj.style.top = (getWindowHeight() / 2) + curpos - 160 + 'px';
	    
	    hideAd('_ctl0_pnlAd');
	    hideDropDownBoxes();
	    return true;
	} else {
	    // we couldn't show the popup, boo hoo!
	    return false;
	}
  
} // showPopup

function hideCurrentPopup() {
    // note: we've stored the currently-visible popup on the global object window.currentlyVisiblePopup
    if(window.currentlyVisiblePopup) {
	changeObjectVisibility(window.currentlyVisiblePopup, 'hidden');
	window.currentlyVisiblePopup = false;
	showDropDownBoxes();
	showAd();
    }
} // hideCurrentPopup

function hideCurrentJRPopup()
{
    if(window.currentlyVisiblePopup) 
    {
	changeObjectVisibility(window.currentlyVisiblePopup, 'hidden');
	window.currentlyVisiblePopup = false;
	
	var transBack = document.getElementById('semiBackground');
	transBack.style.visibility = 'hidden';
	
	showDropDownBoxes();
	showAd();
    }
}

function extPopupGoToURL(jrurl, linkObj, appurl)
{
    //regular app button
    
    //we need to change this link and make it open in a new window
    linkObj.target = '_blank';
	            
	jrurl += '&ipath=JEJT';
	            
	   //slight different behavior if we have firefox:
	    if(navigator.userAgent.indexOf("Firefox")!=-1)
	     {
	                //user is using firefox - we open the app in the new window but load the recommendations in current window
	                //this is because of default functionality with firefox browsers and their tabbing system
	                linkObj.href = appurl;
	                location.href = jrurl;
	      }
	      else
	      {
	                //all other browsers
	                linkObj.href = jrurl;
	                location.href = appurl;
	                
	      }
	      
	  return true;    
}

function closeJRPopupAndGoToURL(myPage, tallyMessage, appurl, jrurl, emailObj, linkObj, popuptype)
{
    // note: we've stored the currently-visible popup on the global object 
    window.currentlyVisiblePopup
    if(window.currentlyVisiblePopup) {
	    
	    //lets go to url
	    if(appurl != null)
	    {
	        	if(emailObj != null)
	            {
	                 //we need to send the email with query string
	                 if(appurl.indexOf('?') >= 0)
	                    appurl += '&email=' + escape(emailObj.value);
	                 else
	                    appurl += '?email=' + escape(emailObj.value);
	 
	 
	                if(!CB.IsValidEmail(emailObj.value))
	                {
	                    emailObj.focus();
	                    return false;
	                }
	                
	                if(emailObj.value == '')
	                {
	                    CB.Tally(myPage,'FrontEnd','ExtPopGaveNoEmail');
	                }
	                else
	                {
	                    CB.Tally(myPage,'FrontEnd','ExtPopGaveEmail');
	                }    
	                
	         
	            }
	            else
	            {
	                CB.Tally(myPage,'FrontEnd','ExtPopGoodLuck');  
	            }
	      
	        

	        
	        //lets first see what kind of link was being clicked... there are 2 types:
	        //1. Regular App Button link, 2. External Link
	        
	        if(popuptype == 'APPBTN')
	        {
	            //regular app button
	            
	            jrurl += '&ipath=JEJT';
	            
	            //slight different behavior if we have firefox:
	            if(navigator.userAgent.indexOf("Firefox")!=-1)
	            {
	                //user is using firefox - we open the app in the new window but load the recommendations in current window
	                //this is because of default functionality with firefox browsers and their tabbing system
	                linkObj.href = appurl;
	                location.href = jrurl;
	            }
	            else
	            {
	                //all other browsers
	                linkObj.href = jrurl;
	                location.href = appurl;
	                
	            }
	        }
	        else
	        {
	            //external link clicked
	            
	            jrurl += '&ipath=JEJTL';
	            
	            linkObj.href = appurl;
	                
	            //also lets send them to the link they asked for via window.open
	            window.open (jrurl, 'appwindow', config='height=600, width=800, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, directories=yes, status=yes');

                //reload the main window - some issues if we dont do that... ext links wont work again
                window.location.reload( true );
                
	        }
	        
	    }
	    
	    //changeObjectVisibility(window.currentlyVisiblePopup, 'hidden');
	    //window.currentlyVisiblePopup = false;
    }
    
    return true;
} // hideCurrentPopup

function getYScrollPos()
{
    if (document.all)
    {
      if (!document.documentElement.scrollTop)
        return document.body.scrollTop;
      else
        return document.documentElement.scrollTop;
    }
    else
    {
      return window.pageYOffset;
    }

}

function getWindowWidth()
{
if(document.layers||(document.getElementById&&!document.all))
{ 
   return window.outerWidth;
}
else if(document.all)
{
   return document.body.clientWidth;
}

}

function getWindowHeight()
{
  return f_filterResults (
		window.innerHeight ? window.innerHeight : 0,
		document.documentElement ? document.documentElement.clientHeight : 0,
		document.body ? document.body.clientHeight : 0
	);

}

function f_filterResults(n_win, n_docel, n_body) {
	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}


function getDocumentHeight()
{

    if( window.innerHeight && window.scrollMaxY ) // Firefox
    {
        return window.innerHeight + window.scrollMaxY;
    }
    else if( document.body.scrollHeight > document.body.offsetHeight ) // all but Explorer Mac
    {
        return document.body.scrollHeight;
    }
    else // works in Explorer 6 Strict, Mozilla (not FF) and Safari
    { 
        return document.body.offsetHeight + document.body.offsetTop; 
    }

}

function getDocumentWidth()
{

    if( window.innerWidth && window.scrollMaxX ) // Firefox
    {
        return window.innerWidth + window.scrollMaxX;
    }
    else if( document.body.scrollWidth > document.body.offsetWidth ) // all but Explorer Mac
    {
        return document.body.scrollWidth;
    }
    else // works in Explorer 6 Strict, Mozilla (not FF) and Safari
    { 
        return document.body.offsetWidth + document.body.offsetLeft; 
    }

}

// ***********************
// hacks and workarounds *
// ***********************

// initialize hacks whenever the page loads
window.onload = initializeHacks;

// setup an event handler to hide popups for generic clicks on the document
//document.onclick = hideCurrentPopup;

function initializeHacks() {
    // this ugly little hack resizes a blank div to make sure you can click
    // anywhere in the window for Mac MSIE 5
    if ((navigator.appVersion.indexOf('MSIE 5') != -1) 
	&& (navigator.platform.indexOf('Mac') != -1)
	&& getStyleObject('blankDiv')) {
	window.onresize = explorerMacResizeFix;
    }
    resizeBlankDiv();
    // this next function creates a placeholder object for older browsers
    createFakeEventObj();
}

function createFakeEventObj() {
    // create a fake event object for older browsers to avoid errors in function call
    // when we need to pass the event object to functions
    if (!window.event) {
	window.event = false;
    }
} // createFakeEventObj

function resizeBlankDiv() {
    // resize blank placeholder div so IE 5 on mac will get all clicks in window
    if ((navigator.appVersion.indexOf('MSIE 5') != -1) 
	&& (navigator.platform.indexOf('Mac') != -1)
	&& getStyleObject('blankDiv')) {
	getStyleObject('blankDiv').width = document.body.clientWidth - 20;
	getStyleObject('blankDiv').height = document.body.clientHeight - 20;
    }
}

function explorerMacResizeFix () {
    location.reload(false);
}


// ************************
// layer utility routines *
// ************************

function getStyleObject(objectId) {
    // cross-browser function to get an object's style object given its id
    if(document.getElementById && document.getElementById(objectId)) {
	// W3C DOM
	return document.getElementById(objectId).style;
    } else if (document.all && document.all(objectId)) {
	// MSIE 4 DOM
	return document.all(objectId).style;
    } else if (document.layers && document.layers[objectId]) {
	// NN 4 DOM.. note: this won't find nested layers
	return document.layers[objectId];
    } else {
	return false;
    }
} // getStyleObject

function changeObjectVisibility(objectId, newVisibility) {
    // get a reference to the cross-browser style object and make sure the object exists
    var styleObject = getStyleObject(objectId);
    if(styleObject) {
	styleObject.visibility = newVisibility;
	return true;
    } else {
	// we couldn't find the object, so we can't change its visibility
	return false;
    }
} // changeObjectVisibility

function moveObject(objectId, newXCoordinate, newYCoordinate) {
    // get a reference to the cross-browser style object and make sure the object exists
    var styleObject = getStyleObject(objectId);
    if(styleObject) {
	 styleObject.left = newXCoordinate;
	styleObject.top = newYCoordinate;
	return true;
    } else {
	// we couldn't find the object, so we can't very well move it
	return false;
    }
} // moveObject

function showDropDownBoxes()
{ 
	if (navigator.appVersion.indexOf("MSIE")) 
	{
		for (var S = 0; S < document.forms.length; S++)
		{
			for (var R = 0; R < document.forms[S].length; R++) 
			{
				if (document.forms[S].elements[R].options) 
				{
					document.forms[S].elements[R].style.visibility = 'visible';
				}
			}
		}
	}
}

function hideDropDownBoxes()
{
	if (navigator.appVersion.indexOf("MSIE")) 
	{ 
		for (var S = 0; S < document.forms.length; S++)
		{ 
			for (var R = 0; R < document.forms[S].length; R++) 
			{
				if (document.forms[S].elements[R].options) 
				{
					
					document.forms[S].elements[R].style.visibility = 'hidden';
				}
			}
		}
	}
}



function hideAd()
{
	if(document.getElementById('skyAd') != null)
	{
		var skyAd = document.getElementById('skyAd');
		skyAd.style.visibility = 'hidden';
	}
}

function showAd()
{
	if(document.getElementById('skyAd') != null)
	{
		var skyAd = document.getElementById('skyAd');
		skyAd.style.visibility = 'visible';
	}
}

function hideAd(name)
{
	if(document.getElementById(name) != null)
	{
		var skyAd = document.getElementById(name);
		skyAd.style.visibility = 'hidden';
	}
}

function showAd(name)
{
	if(document.getElementById(name) != null)
	{
		var skyAd = document.getElementById(name);
		skyAd.style.visibility = 'visible';
	}
}


