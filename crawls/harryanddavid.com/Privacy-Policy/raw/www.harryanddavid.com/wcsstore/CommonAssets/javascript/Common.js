//********************************************************************
//*-------------------------------------------------------------------
//*	Common AJAX functions
//*-------------------------------------------------------------------
//********************************************************************
dojo.config.dojoBlankHtmlUrl="/gifts/blank.html";

dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.Tooltip");
dojo.require("dijit.form.Form");
dojo.require("wc.service.common");
dojo.require("wc.widget.RefreshArea");
dojo.require("bec.util.lang");
dojo.require("bec.util.browser");
dojo.require("bec.util.search");
dojo.require("bec.analytics.Coremetrics");	
dojo.require("bec.widget.Button");
dojo.require("bec.widget.EasyButton");
dojo.require("bec.widget.PopupDialog");
dojo.require("bec.product.AddToCart");
dojo.require("bec.product.AddToCartButton");
dojo.require("bec.product.AddToFavorites");
dojo.require("bec.product.ProductMedia");
dojo.require("bec.product.ProductQuickView");
dojo.require("bec.order.CatalogQuickOrder");
//Logon Panel Support (checkout version is included in checkout pages)
dojo.require("bec.user.Logon");
dojo.require("bec.order.CommonCartServices");
dojo.require("bec.menu.MenuContentPane");
dojo.require("bec.widget.PopupPanelContainer");
dojo.require("bec.widget.PopupPanel");
dojo.require("bec.espot.ClickInfo");
dojo.require("bec.widget.iScroller");
dojo.require("bec.user.EmailSignUp");

dojo.require("bec.widget.form.SelectDropDown"); //for overriding filtering select for tablets

//---------------------------------------------------------------------------------------
// define common 
//---------------------------------------------------------------------------------------
var popup;
var catalogQuickOrder;
var becLogonPage;
var becLogonPanel;
var becLogon;
var resetPassword;
var resetPasswordPopup;
var emailSignUp;

var LOADING_MESSAGE = 
	'<span class="dijitContentPaneLoading"><img class="loadingImage" src="' + eSiteImgDir + '/loading_2.gif"/></span>';

dojo.addOnLoad(function() 
{	
    dojoParseButtons();	
    processTabletOverrides();    
    dojoParseRegisteredWidgets();
	
    try
    {
        popup = new bec.widget.PopupDialog({loadingMessage: LOADING_MESSAGE});        
        emailSignUp = new bec.user.EmailSignUp();
    	
    	//Tealeaf
    	if(typeof tlEnabled !== "undefined" && tlEnabled) {
    		new bec.vendors.Tealeaf();
    	}
    }
    catch(e)
    {
        console.debug('error: ' + e);
    }   
    requestSubmitted = false;
});
/**
 * Find and parse and instantiate all buttons on the page.
 */
function dojoParseButtons()
{
	// Nodelist of parseable buttons within the BODY element.
	var parseableButtons = dojo.query("[dojoType='bec.widget.Button'],[dojoType='bec.product.AddToCartButton'],[dojoType='bec.widget.EasyButton']", dojo.query("body")[0]);
	
	parseableButtons.forEach(function(button,idx,buttons)
	{
		dojo.parser.instantiate([button], {dojoType: dojo.attr(button, "dojoType")});
	});
}

var parseList=new Array();
/**
 * parses those widgets registered to be parsed. 
 * searches for certain widgets and parses.
 * Should be ran on page load. 
 */
function dojoParseRegisteredWidgets()
{
	dojo.forEach(parseList, function(entry)
	{
		if(entry.parseType == "widget")
		{
			dojo.parser.instantiate([dojo.byId(entry.id)], {dojoType: entry.type});
		}
		else if(entry.parseType == "node")
		{
			dojo.parser.parse(dojo.byId(entry.id));
		}
	});	
}
/**
 * register a widget to be instantiated.
 */
function dojoParse(id, type)
{
	parseList.push({parseType: 'widget', id: id, type: type});
}
/**
 * register a node to be parsed for widgets.
 * This is used for sections of a page that rely heavily on widgets.
 * Simplifies the initialization by allowing dojo to manage it.
 */
function dojoParseNode(nodeId)
{
	parseList.push({parseType: 'node', id: nodeId});
}
//---------------------------------------------------------------------------------------
//cursor functions
//---------------------------------------------------------------------------------------
var busyCount = 0;
function cursor_wait() 
{
    busyCount++;
    //console.log("busyCount=" + busyCount);
    document.body.style.cursor = 'wait';
}
function cursor_clear() 
{
    busyCount = busyCount - 1;
    //console.log("busyCount=" + busyCount);
    if(busyCount < 1)
    {
        document.body.style.cursor = 'default';		 
		requestSubmitted = false;	//Reset the flag
		busyCount = 0;
    }
}
/** 
 * This variable indicates whether a request has been submitted or not.
 * The value is initialized to true and resets to false on full page load.
 */
var requestSubmitted = true;
/**
 * Checks whether a request can be submitted or not.
 * A new request may only be submitted when no request is currently running.
 * If a request is already running, then the new request will be rejected.
 *
 * @return {boolean} Indicates whether the new request can be submitted (true) or rejected (false).
 */
function submitRequest() 
{	
	console.log("requestSubmitted=" + requestSubmitted);
	var result = false;
	if(!requestSubmitted) 
	{
		requestSubmitted  = true;
		result = true;
	}
	return result;
}
function isRequestSubmitted()
{
	return requestSubmitted;
}
//---------------------------------------------------------------------------------------
//Sign In Service - most of this moved to Logon.js and ResetPassword.js
//---------------------------------------------------------------------------------------
function showEmailSignUpDialog(type)
{	
	if(type == "FirstTime")  //Must wait for page load as additional JS objects are required.
	{
		dojo.addOnLoad(function() 
		{	
			if(typeof emailSignUp !== 'undefined')
			{
				emailSignUp.show("FirstTime");
			}
		});	
	}		
	else //No addOnLoad required as page loading has already completed.
	{
		emailSignUp.show(type);
	} 	
}

function openLogonPanel()
{
	becLogon = null;
	if (!becLogonPanel)
	{
		becLogonPanel = new bec.user.LogonPanel();
	}
	becLogonPanel.open();	
}
function openCreateAccountPanel()
{
	becLogon = null;
	if (!becLogonPanel)
	{
		becLogonPanel = new bec.user.LogonPanel();
	}
	becLogonPanel.loadCreateAccount();	
}
function openLogonPopup(url)
{
	becLogonPanel = null;
	if (!becLogon)
	{
		becLogon = new bec.user.Logon();
	}	
	becLogon.open(url);
}
function getResetPasswordInstance()
{
	if (resetPasswordPopup)
	{
		return resetPasswordPopup;
	}
	else if(resetPassword)
	{
		return resetPassword;
	}
}

function processTabletOverrides()
{
    if(bec.util.browser.isTouchDevice())
    {   //we are a touch device like tablet so do various overrides.
        if(dijit.form.FilteringSelect && bec.widget.form.SelectDropDown)
        {
            dijit.form.FilteringSelect.prototype = bec.widget.form.SelectDropDown.prototype;    
        }
    }
}

//FIXME: change where this is used to call the new util function
function scrollIntoView(id, smooth)
{
	return bec.util.browser.scrollIntoView(id, smooth);
}

//////////////////////////////////////////////////////////////////////////////////////////////
//	From old Utils.js
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

/**
 * Currency formatting pattern
 */
var PATTERN_DOLLAR = {pattern: "$#,##0.00"};
/**
 * This function parses price to remove '$', ',' and Awards Points
 * @param strPrice
 * @return Number
 */
function parsePrice(strPrice)
{		
	var rtnNumber = 0;
	if (strPrice)
	{
		try
		{
			var priceOnly;
			priceOnly = strPrice.replace(/[\$,\s]/g, "");
			
			if (priceOnly)
			{
				// remove Awards points if exist
				priceOnly = priceOnly.toLowerCase();
				
				if(priceOnly && priceOnly.indexOf('<br') != -1)
				{
					priceOnly = priceOnly.substring(0, priceOnly.indexOf('<br'));
				}
			}
			
			rtnNumber = Number(priceOnly);
		}
		catch(e)
		{
			console.debug("error parsing price " + e);
			rtnNumber = 0;
		}
	}	
	return rtnNumber;
}

//This function creates or modifies a cookie.
function updateCookie(name, value)
{
  dojo.cookie(name, escape(value), {path: '/'});
}

//This function reads a cookie.
function readCookie(name) 
{
  return dojo.cookie(name);
}	

//Sets the expiration date of a cookie (set to zero to delete cookie).
function expireCookie(name, minutes)
{
	var dateObj=new Date();
	dateObj.setMinutes(dateObj.getMinutes()+minutes);
	document.cookie = name + "=" + readCookie(name) + ";path=/;expires=" + dateObj;
}

