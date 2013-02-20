//********************************************************************
//*-------------------------------------------------------------------
//*	Common AJAX functions
//*-------------------------------------------------------------------
//********************************************************************
dojo.config.dojoBlankHtmlUrl="/gifts/blank.html";

dojo.require("dojo.io.script");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.Tooltip");
dojo.require("dijit.form.Form");
dojo.require("wc.service.common");
dojo.require("wc.widget.RefreshArea");
dojo.require("bec.util.lang");
dojo.require("bec.util.browser");
dojo.require("bec.util.search");

// Vendors
dojo.require("bec.analytics.Coremetrics");
dojo.require("bec.vendors.chat.LivePerson");
dojo.require("bec.vendors.TagMan");

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
                //Coremetrics
    	if(typeof cmPassCoremetrics !== 'undefined' && cmPassCoremetrics != 'OFF')
    	{
    		becCoremetrics = new bec.analytics.Coremetrics();
    		
    		//LivePerson (Dependencies: Coremetrics)
    		if(typeof lpEnabled !== "undefined" && lpEnabled)			
    			new bec.vendors.chat.LivePerson(cmPageName);
    	}		
    	
    	//TagMan
    	if(typeof tmEnabled !== "undefined" && tmEnabled)
    		new bec.vendors.TagMan();
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

/**************************************
 * Vendors: COREMETRICS
 **************************************/
dojo.declare("bec.analytics.Coremetrics.Common", null, 
{
	/** 
	 * Generate CM Category Name
	**/
	generateCategoryName: function(category)
	{
		try
		{	
			var scope = this;
			var categoryName = category;
			var type = "standard";
			
			/**
			 * Did we find a virtual_cat JS var on the page with a valid value?
			 */
			if(typeof virtual_cat !== "undefined" && virtual_cat !== null) 
			{
				if(virtual_cat != '')
					scope.updateCookie('virtCatCM', virtual_cat);
			}
			
			/**
			 * Determine if virtual category passed on URL string.
			 * Override virtual_cat JS var is URL param is found.
			 */ 
			var urlParamsArr = location.search.substring(1).split('&');	
			for(var i = 0; i < urlParamsArr.length; i++)
			{ 	
				// Check for presence of "baseProductId" to handle Product Page Up-Sell navigation.
				// Clear virtual cat if baseProductId URL param is found.
				var baseProductIdpos = urlParamsArr[i].indexOf('baseProductId');
				if (baseProductIdpos != -1) {
					scope.expireCookie("virtCatCM");
					continue;
				}
				
				// Check for virtual category value on URL
				var pos = urlParamsArr[i].indexOf('urlVirtualCat');
				if (pos == -1) // Not Found, move on.
				{
					continue;
				}
				else // Virtual Cat found
				{
					var vcValue = urlParamsArr[i].substr(urlParamsArr[i].indexOf('=')+1);
					if(vcValue != "")
					{ 
						scope.updateCookie('virtCatCM', vcValue);
					}
				}
			}
			
			/**
			 * Determine if sliSearch value passed on URL string
			 */
			for(var i = 0; i < urlParamsArr.length; i++)
			{ 	var pos = urlParamsArr[i].indexOf('sliSearch');
				if (pos != -1)
					cmSearch = urlParamsArr[i].substr(urlParamsArr[i].indexOf('=')+1);	
			}
			
			/**
			 * Should we clear the Virtual Category?
			 */
			if(clear_virtual_cat)
			{
				scope.expireCookie("virtCatCM");
				console.debug("Coremetrics: Generate Category - virtual category cleared");
			}
			
			/**
			 * Does a Virtual Category cookie exist?
			 * 	If so, set categoryName to cookie value.
			 */
			else if(scope.readCookie('virtCatCM'))
			{
				categoryName = scope.readCookie('virtCatCM');
				type = "virtual";
			}
			
			/**
			 * No Category name set, do we have a cm_merch_cat var (Category page)?
			 */
			if((categoryName == "") || (categoryName == null))
			{
				if(typeof cm_merch_cat != "undefined") {
					categoryName = cm_merch_cat;
					type = "merchant";
				}
			}
			
			/**
			 * Did we ever find a category name?
			 */
			if(categoryName != "")
			{
				cmCategory = scope.appendESiteID(categoryName);
				console.debug("Coremetrics: Generate Category - COMPLETE (type = " + type + " / name = " + categoryName + ")");
			}
			else
				console.error("Coremetrics: Generate Category name - FAILED");
				
		}
		catch(e)
		{
			console.error("Coremetrics: generateCategoryName() Exception: " + e);
		}
	},

	//Update CM pageName to handle eSites
	appendESiteID: function(idVal)
	{		
		var scope = this;
		
		if(idVal != "" && !scope.isStorefront())
		{
			idVal = jsStoreIdent + ": " + idVal;
		}
		
		return idVal;
	},

	isStorefront: function() {
		var results = false;
		var storefrontArr = ["Hand","Wolf","Cush","Hand2"];
		
		dojo.forEach(storefrontArr, function(storeIdent, idx) {
			if(jsStoreIdent == storeIdent)
				results = true;
		});
		
		return results;
	},

	//This function creates or modifies a cookie.
	updateCookie: function(name, value) {
		var exdays = 1*24*60*60*1000;
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		
		var c_value = escape(value) + ((exdays==null) ? "" : ";path=/; expires="+exdate.toUTCString());
		document.cookie = name + "=" + c_value;
	},

	//This function reads a cookie.
	readCookie: function(name) {
		var i,x,y,ARRcookies=document.cookie.split(";");
		
		for (i=0;i<ARRcookies.length;i++)
		{
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			
			if (x == name)
		    {
				return unescape(y);
		    }
		}
	},

	//Sets the expiration date of a cookie (set to zero to delete cookie).
	expireCookie: function(name) {
		var scope = this;
		document.cookie = name + "=" + scope.readCookie(name) + ";path=/;expires=" + new Date(0).toUTCString();
	},

	//Right trims spaces from a string
	RTrim: function(VALUE) {
		var w_space = String.fromCharCode(32);
		var v_length = VALUE.length;
		var strTemp = "";
		
		if(v_length >= 0)
		{
		  	var iTemp = v_length -1;    	
		  	while(iTemp > -1)
		  	{
		  		if(VALUE.charAt(iTemp) == w_space)
		  		{
		  		}
		  		else
		  		{
		  			strTemp = VALUE.substring(0,iTemp +1);
		  			break;
		  		}
		  		iTemp = iTemp-1;
		  	}
		}
		
		return strTemp;
	},
	
	//////////////////////////////////////////////////////////
	//This function is meant to remove html tags from a string
	//There is a possibility that the HTML tags are in Mark Up 
	//form, so change string from markup before replacing
	//
	//Returns input string with no html.
	//////////////////////////////////////////////////////////
	clearHTMLTags: function(strHTML)
	{
		var strMarkedUp = strHTML.replace(/&lt;([^&]*)&gt;/g,"<$1>");
		
		return strMarkedUp.replace(/<[^>]*>/g, "");   
	}
});

/*
 * cmcustom.js 
 * $Id: cmcustom-MASTER.txt 133931 2009-09-08 11:11:57Z wbird $
 * $Revision: 133931 $
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *
 * 09/08/10	WBIRD	- initial cmcustom created
 */
  
var virtual_cat;

/*Creates a custom tag for Forsee integration*/
function cmCreateForseeTag(respondentID, surveyName) {
	cmMakeTag(["tid","7","li","100003","ps1",respondentID,"ps2",surveyName]);
}

function cmCreateProductviewTag(productID, productName, categoryID, attributes, cm_vc) {
	if (virtual_cat){
		cm_vc=virtual_cat;
	}
	cmMakeTag(["tid","5","pi",c1(cm_ClientID) ? c1(cm_ClientID) : "Product: " + productName + " (" + productID + ")","pr",productID,"pm",productName,"cg",categoryID,"pc","Y","cm_vc",cm_vc?cm_vc:cmExtractParameter("cm_vc",document.location.href),"cmAttributes",attributes]);
}

function cmCreateRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, attributes, customerCountry) {
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cy",customerCountry,"cmAttributes",attributes]);
}

function myNormalizeURL(url, isHref) {

    var newURL = url;
// begin optimost URL normalization
    if (cmIndexOfParameter("oplink=", url) != -1) {
        var newURL = cmExtractParameter("oplink=",url);
    }
// end optimost URL normalization
// begin decoding of over-encoded qsp & and = in cm_re/sp params
   if (cmIndexOfParameter("cm_re", url) != -1) {
	newURL = newURL.replace("%3f","?");
	newURL = newURL.replace("%3d","=");
	newURL = newURL.replace("%26","&");
   }
   if (cmIndexOfParameter("cm_sp", url) != -1) {
	newURL = newURL.replace("%3f","?");
	newURL = newURL.replace("%3d","=");
	newURL = newURL.replace("%26","&");
   }
// end decoding of over-encoded qsp & and = in cm_re/sp params
    if (isHref) {
	    var blackList = [ "krypto=" 
                        , "wstypcd=" 
                        , "virtual_cat=" 
                        , "originalItemNumber=" 
                        , "strfnbr=" 
                        , "Now=" 
                        , "Status=" 
                        , "giftaddr=" 
                        , "sarfnbr=" 
                        , "url=" 
                        , "keyword=" 
                        , "cmReg="
		                ];
	    var paramString;
	    var paramIndex = newURL.indexOf("?");
	    var params;
	    var keepParams = new Array();
	    var goodParam;
	
	    if (paramIndex > 0) {
		paramString = newURL.substring(paramIndex+1);
		newURL = newURL.substring(0, paramIndex);
		params = paramString.split("&");
	
		for(var i=0; i<params.length; i++) {
			goodParam = true;
			for(var j=0; j<blackList.length; j++) {
				if (params[i].indexOf(blackList[j]) == 0) {
					goodParam = false;
				}
			}
			if(goodParam == true) {
				keepParams[keepParams.length] = params[i];
			}
		}
		
		newURL += "?" + keepParams.join("&");
	
	    }
	 
	    if (defaultNormalize != null) {
	        newURL = defaultNormalize(newURL, isHref);
	    }
	}	
    return newURL;
}