if (CRUserInfo == null) var CRUserInfo = {};

CRUserInfo.itsJson = null;

/**
 * This function will return "null" if no alerts exist (or the user is
 * not logged in), or will return an array of String objects if there
 * are alerts to display.  Each String object will contain HTML text
 * and should be output exactly as-is.
 */
CRUserInfo.getAlerts = function()
{
    return CRUserInfo.getData("alerts");
};

/**
 * This function will return "null" if we cannot obtain the user's
 * display name from the userInfo cookie (e.g. if they are not logged
 * in, or in some other problem).  Otherwise, this will return the
 * user's display name (assuming the JSON call has returned already).
 */
CRUserInfo.getName = function()
{
    return CRUserInfo.getData("name");
};

/**
 * This function will return "null" if we cannot obtain the user's
 * username from the userInfo cookie (e.g. if they are not logged
 * in, or in some other problem).  Otherwise, this will return the
 * user's username (assuming the JSON call has returned already)
 * which is going to be all uppercase.
 */
CRUserInfo.getUser = function()
{
    return CRUserInfo.getData("user");
};

/**
 * This function will return true or false, depending on whether or not
 * the user has any active subscriptions at all.  Non-logged in users
 * will get "false".  If there is a problem retrieving the data from
 * the server, "false" will be returned.
 */
CRUserInfo.hasSubscriptions = function()
{
    return (CRUserInfo.hasAPSNew() ||
            CRUserInfo.hasAPSUsed() ||
            CRUserInfo.hasCBDP() ||
            CRUserInfo.hasCRMag() ||
            CRUserInfo.hasCRO() ||
            CRUserInfo.hasHealth() ||
            CRUserInfo.hasMoneyAdviser() ||
            CRUserInfo.hasOnHealth() ||
            CRUserInfo.hasShopSmart());
};

/**
 * This function will return true or false, depending on whether or not
 * the user has access to this particular product.  Non-logged in users
 * will get "false".  If there is a problem retrieving the data from
 * the server, "false" will be returned.
 */
CRUserInfo.hasAPSNew = function()
{
    return CRUserInfo.getData("products", "apsNew");
};

/**
 * This function will return true or false, depending on whether or not
 * the user has access to this particular product.  Non-logged in users
 * will get "false".  If there is a problem retrieving the data from
 * the server, "false" will be returned.
 */
CRUserInfo.hasAPSUsed = function()
{
    return CRUserInfo.getData("products", "apsUsed");
};

/**
 * This function will return true or false, depending on whether or not
 * the user has access to this particular product.  Non-logged in users
 * will get "false".  If there is a problem retrieving the data from
 * the server, "false" will be returned.
 */
CRUserInfo.hasAPS = function()
{
    return CRUserInfo.hasAPSUsed() || CRUserInfo.hasAPSNew();
};

/**
 * This function will return true or false, depending on whether or not
 * the user has access to this particular product.  Non-logged in users
 * will get "false".  If there is a problem retrieving the data from
 * the server, "false" will be returned.
 */
CRUserInfo.hasCBDP = function()
{
    return CRUserInfo.getData("products", "cbdp");
};

/**
 * This function will return true or false, depending on whether or not
 * the user has access to this particular product.  Non-logged in users
 * will get "false".  If there is a problem retrieving the data from
 * the server, "false" will be returned.
 */
CRUserInfo.hasCRMag = function()
{
    return CRUserInfo.getData("products", "crMag");
};

/**
 * This function will return true or false, depending on whether or not
 * the user has access to this particular product.  Non-logged in users
 * will get "false".  If there is a problem retrieving the data from
 * the server, "false" will be returned.
 */
CRUserInfo.hasCRO = function()
{
    return CRUserInfo.getData("products", "cro");
};

/**
 * This function will return true or false, depending on whether or not
 * the user has access to this particular product.  Non-logged in users
 * will get "false".  If there is a problem retrieving the data from
 * the server, "false" will be returned.
 */
CRUserInfo.hasCROAnnual = function()
{
    return CRUserInfo.getData("products", "croAnnual");
};

/**
 * This function will return true or false, depending on whether or not
 * the user has access to this particular product.  Non-logged in users
 * will get "false".  If there is a problem retrieving the data from
 * the server, "false" will be returned.
 */
CRUserInfo.hasCROMonthly = function()
{
    return CRUserInfo.getData("products", "croMonthly");
};

/**
 * This function will return true or false, depending on whether or not
 * the user has access to this particular product.  Non-logged in users
 * will get "false".  If there is a problem retrieving the data from
 * the server, "false" will be returned.
 */
CRUserInfo.hasHealth = function()
{
    //CRHTTWO-127
    //return CRUserInfo.getData("products", "health");
    return false;
};

/**
 * This function will return true or false, depending on whether or not
 * the user has access to this particular product.  Non-logged in users
 * will get "false".  If there is a problem retrieving the data from
 * the server, "false" will be returned.
 */
CRUserInfo.hasMoneyAdviser = function()
{
    return CRUserInfo.getData("products", "moneyAdviser");
};

/**
 * This function will return true or false, depending on whether or not
 * the user has access to this particular product.  Non-logged in users
 * will get "false".  If there is a problem retrieving the data from
 * the server, "false" will be returned.
 */
CRUserInfo.hasOnHealth = function()
{
    return CRUserInfo.getData("products", "onHealth");
};

/**
 * This function will return true or false, depending on whether or not
 * the user has access to this particular product.  Non-logged in users
 * will get "false".  If there is a problem retrieving the data from
 * the server, "false" will be returned.
 */
CRUserInfo.hasShopSmart = function()
{
    return CRUserInfo.getData("products", "shopSmart");
};

/**
 * This function will return true or false, depending on whether or
 * not the user has "auto login" enabled (stored via a separate cookie
 * from user license info, so it is detectable even for logged-out
 * users).  If there is a problem retrieving the data from the server
 * (or if it hasn't gotten the data yet), "false" will be returned.
 */
CRUserInfo.isAutoLogin = function()
{
    var result = CRUserInfo.getData("autoLogin");
    if (result == null)
    {
        return false;
    }
    else
    {
        return result;
    }
};

/**
 * This function should not be called directly by scripts on the page
 * but should only be called by the "getAlerts" and "has*" functions
 * in this JavaScript file.
 *
 * @param inCheck
 * @param inKey
 */
CRUserInfo.getData = function(inCheck, inKey)
{
    if (CRUserInfo.itsJson != null)
    {
        if (CRUserInfo.itsJson[inCheck])
        {
            if (inKey)
            {
                return CRUserInfo.itsJson[inCheck][inKey];
            }
            else
            {
                return CRUserInfo.itsJson[inCheck];
            }
        }
    }
    if (inKey)
    {
        return false;
    }
    else
    {
        return null;
    }
};

/**
 * This function should not be called directly by scripts on the page
 * but should only be called by the JSON callback triggered on document
 * ready in this JavaScript file.
 *
 * @param inName
 * @param inFunction
 */
CRUserInfo.hideAndShowClasses = function(inName, inFunction)
{
    if (inFunction())
    {
        $(".no" + inName).hide();
        $(".if" + inName).show();
    }
    else
    {
        $(".if" + inName).hide();
        $(".no" + inName).show();
    }
};

/**
 * This function should not be called directly by scripts on the page.
 */
CRUserInfo.isEBSCO = function()
{
    var theName = CRUserInfo.getUser();
    if (theName != null)
    {
        if (theName.indexOf("EBSCO") == 0)
        {
            return true;
        }
    }
    return false;
};

/**
 * This function retrieves the user alerts and product info for this
 * user via JSON and then caches the data for all subsequent calls on
 * the page to the "getAlerts" or "has*" functions.
 */
jQuery(document).ready(function() {
    var theWCM = {};
    if ("CQ" in window)
    {
        theWCM = CQ.WCM;
    }
    this.isEditMode = function() {
        return ((theWCM && theWCM.getMode) && theWCM.getMode() != 'preview');
    };

    if(!this.isEditMode()){
        jQuery.ajax({url: '/bin/userinfo', dataType: 'json', cache: false, success: function(inJson) {
            CRUserInfo.itsJson = inJson;
            var theDisplayName = CRUserInfo.getName();
            if (theDisplayName != null)
            {
                var theTruncatedDisplayName = theDisplayName;
                if (theDisplayName.length > 14)
                {
                    theTruncatedDisplayName = theDisplayName.substring(0, 14);
                }
                $(".truncDisplayName").empty();
                $(".truncDisplayName").append(theTruncatedDisplayName);
                $(".truncDisplayName").show();
                $(".displayName").empty();
                $(".displayName").append(theDisplayName);
                $(".displayName").show();
                if (CRUserInfo.isEBSCO())
                {
                    $(".noEBSCO").hide();
                    $(".ifEBSCO").show();
                }
                else
                {
                    $(".ifEBSCO").hide();
                    $(".noEBSCO").show();
                }
            }
            if (CRUserInfo.isAutoLogin())
            {
                $(".ifAutoLogin").attr("checked","checked");
            }
            else
            {
                $(".ifAutoLogin").removeAttr("checked");
            }
            var theAlertsArray = CRUserInfo.getAlerts();
            if (theAlertsArray != null)
            {
                if (theAlertsArray.length > 0)
                {
                    $("ol.alert").empty();
                    for (var i = 0; (i < theAlertsArray.length); i++)
                    {
                        $("ol.alert").append("<li>" + theAlertsArray[i] + "</li>");
                    }
                    $(".noAlert").hide();
                    $(".ifAlert").show();
                }
                else
                {
                    $(".ifAlert").hide();
                    $(".noAlert").show();
                }
            }
            else
            {
                $(".ifAlert").hide();
                $(".noAlert").show();
            }
            CRUserInfo.hideAndShowClasses("Subscriptions", CRUserInfo.hasSubscriptions);
            CRUserInfo.hideAndShowClasses("APS", CRUserInfo.hasAPS);
            CRUserInfo.hideAndShowClasses("APSNew", CRUserInfo.hasAPSNew);
            CRUserInfo.hideAndShowClasses("APSUsed", CRUserInfo.hasAPSUsed);
            CRUserInfo.hideAndShowClasses("CBDP", CRUserInfo.hasCBDP);
            CRUserInfo.hideAndShowClasses("CRMag", CRUserInfo.hasCRMag);
            CRUserInfo.hideAndShowClasses("CRO", CRUserInfo.hasCRO);
            CRUserInfo.hideAndShowClasses("CROAnnual", CRUserInfo.hasCROAnnual);
            CRUserInfo.hideAndShowClasses("CROMonthly", CRUserInfo.hasCROMonthly);
            CRUserInfo.hideAndShowClasses("Health", CRUserInfo.hasHealth);
            CRUserInfo.hideAndShowClasses("MoneyAdviser", CRUserInfo.hasMoneyAdviser);
            CRUserInfo.hideAndShowClasses("OnHealth", CRUserInfo.hasOnHealth);
            CRUserInfo.hideAndShowClasses("ShopSmart", CRUserInfo.hasShopSmart);

            validateSubscriptions(CRUserInfo);

            if ($("#billshrinkAnchor").length) {
                var theSubscriberType = "03";
                if (CRUserInfo.hasCROAnnual() || CRUserInfo.hasCBDP()) {
                    theSubscriberType = "02";
                }
                else if (CRUserInfo.hasCROMonthly()) {
                    theSubscriberType = "01";
                }
                var theOriginalHref = $("#billshrinkAnchor").attr("href");
                $("#billshrinkAnchor").attr("href", theOriginalHref + "&utm_source=" + theSubscriberType);
            }
    }});
    }
});

function validateSubscriptions(CRUserInfo){

    CRUserInfo.hideAndShowClasses("CarsPricingSubscriber", function() {
        return CRUserInfo.hasCBDP() || CRUserInfo.hasCROAnnual() || CRUserInfo.hasAPS();
    });

    CRUserInfo.hideAndShowClasses("APS-noCBDP-noCRO", function() {
        return CRUserInfo.hasAPS() && !CRUserInfo.hasCBDP() && !CRUserInfo.hasCRO();
    });

    CRUserInfo.hideAndShowClasses("CROAnnual-noCBDP-noAPS", function () {
        return CRUserInfo.hasCROAnnual() && !CRUserInfo.hasCBDP() && !CRUserInfo.hasAPS();
    });

    CRUserInfo.hideAndShowClasses("CRO-APS-noCBDP", function () {
        return CRUserInfo.hasCRO() && CRUserInfo.hasAPS() && !CRUserInfo.hasCBDP();
    });

    CRUserInfo.hideAndShowClasses("CBDP-noAPS", function () {
        return CRUserInfo.hasCBDP() && !CRUserInfo.hasAPS();
    });

    CRUserInfo.hideAndShowClasses("CBDP-APS", function () {
        return CRUserInfo.hasCBDP() && CRUserInfo.hasAPS();
    });
}
