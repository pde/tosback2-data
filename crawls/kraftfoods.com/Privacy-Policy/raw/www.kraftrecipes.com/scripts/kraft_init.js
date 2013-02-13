// from commonwebtracker.js
var wtSearchpName= "";
var wtSearchResults="";
var wtSearchTab = "";
var wtSearchTerm = "";
var wtSearch = "";
var wtRegistrationUserId="";
var wtRegistrationCRMId="";
// from coremetricsproductview.ascx
var wtPname ="";
var wtCname ="";
var CoremetricsPageViewTagOnSearchPage;


function videoPlay(elementID)
{
	cmCreatePageElementTag(elementID, "videos");
}


function cmGetRegistrationUserID()
{
	return RequestQueryString("suie");
}

function cmGetRegistrationCRMID()
{
	return RequestQueryString("crmid");
}

// from event_listeners.js
function addLoadListener(fn)
{
	if (typeof window.addEventListener != 'undefined')
	{
		window.addEventListener('load', fn, false);
	}
	else if (typeof document.addEventListener != 'undefined')
	{
		document.addEventListener('load', fn, false);
	}
	else if (typeof window.attachEvent != 'undefined')
	{
		window.attachEvent('onload', fn);
	}
	else
	{
		return false;
	}
	
	return true;
};




function attachEventListener(target, eventType, functionRef, capture)
{
    if (typeof target.addEventListener != "undefined")
    {
        target.addEventListener(eventType, functionRef, capture);
    }
    else if (typeof target.attachEvent != "undefined")
    {
        target.attachEvent("on" + eventType, functionRef);
    }
    else
    {
        return false;
    }

    return true;
};


// from resoultion.js







function checkBrowserWidth()
{
	var theWidth = getBrowserWidth();
	
	if (theWidth == 0)
	{
		var resolutionCookie = document.cookie.match(/(^|;)tmib_res_layout[^;]*(;|$)/);

		if (resolutionCookie != null)
		{
			setStylesheet(unescape(resolutionCookie[0].split("=")[1]));
		}
		
		addLoadListener(checkBrowserWidth);
		
		return false;
	}

	if (theWidth < 1024)
	{
		setStylesheet("less than 1024");
		document.cookie = "tmib_res_layout=" + escape("less than 1024");
	}
	else
	{
		setStylesheet("");
		document.cookie = "tmib_res_layout=";
	}
	
	return true;
};




function getBrowserWidth()
{
	if (window.innerWidth)
	{
		return window.innerWidth;
	}
	else if (document.documentElement && document.documentElement.clientWidth != 0)
	{
		return document.documentElement.clientWidth;
	}
	else if (document.body)
	{
		return document.body.clientWidth;
	}
	
	return 0;
};




function setStylesheet(styleTitle)
{
	var currTag;

	if (document.getElementsByTagName)
	{
		for (var i = 0; (currTag = document.getElementsByTagName("link")[i]); i++)
		{
			if (currTag.getAttribute("rel").indexOf("style") != -1 && currTag.getAttribute("title"))
			{
				currTag.disabled = true;

				if(currTag.getAttribute("title") == styleTitle)
				{
					currTag.disabled = false;
				}
			}
		}
	}
	
	return true;
};

// from GWSPersonalizedNav.ascx
var hashvalue;
//window.addEvent('domready', loadPersonalNav);
//loadPersonalNav();
if (window.location.hash.length > 1) {
	hashvalue = window.location.hash.substring(1, window.location.hash.length);
}


// from searchtop.ascx
var sitesearchWidth = '460px';
var btnSearchbuttonid = 'ctl00_PlaceHolderMain_g_4d35441a_55d9_4fca_8048_fd65191ba113_ctl09_ctl03_ctl01_ucKraftSearchSiteSearch_btnImageSubmit';
var strCurrentLangCode = 'EN';

//from resolution.js
var decideExec = determineMainMaster(ajaxKraftMaster);
if (decideExec)
{
    //from resolution.js
    checkBrowserWidth();

    attachEventListener(window, "resize", checkBrowserWidth, false);

    // from master page
    //window.addEvent('domready', init);
	jQuery(document).ready(init);
	
    //window.addEvent('domready', loadPersonalNav);
}

function determineMainMaster(decide)
{
    var returnValue = true;
    if (typeof(decide)!="undefined")
    {
        if (decide =="true")
        {
            returnValue= false;
        }
    }
    return returnValue 
}

// coremetrics init routines
function CoremetricsInit(pName, cName, cpvConfigValue, cpvTagOnSearchPage, cmSearch, cmSearchResults, attribute)
{
    var cmSearchTerm = "";
    if (typeof(cpvTagOnSearchPage)=="undefined") {
	    CoremetricsPageViewTagOnSearchPage = cpvConfigValue;
    } else {
	    if (cpvTagOnSearchPage != 'true')
	    {
		    cpvTagOnSearchPage = cpvConfigValue;
	    }
    }
    cmSearchTerm = qParam('searchtext');
    if (cmSearch == "true") 
    {
        if (wtSearchTab != "" )
        {
             wtSearchpName = pName + "-" + wtSearchTab;
        }  
        if  (wtSearchpName =="") 
        {
    	    if  (pName !="") 
    	    {  
        	    wtSearchpName = pName;
    	    } 
        }
        if (CoremetricsPageViewTagOnSearchPage !="false") 
        {
    	    cmCreatePageviewTag(wtSearchpName,cName, cmSearchTerm,cmSearchResults, attribute);
        }
    }
    else
    {
        cmCreatePageviewTag(pName,cName, null, null, attribute);
    }
}


//wtPname = '<%=PageTitle %>';
//wtCname= '<%=CategoryID %>';

//CoremetricsInit('<%=PageTitle %>','<%=CategoryID %>', CoremetricsPageViewTagOnSearchPage, wtSearch, wtSearchResults);