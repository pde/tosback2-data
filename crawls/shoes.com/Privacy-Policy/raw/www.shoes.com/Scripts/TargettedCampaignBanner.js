var TargettedCampaignBanner = {
    initialize : function() {
        TargettedCampaignBanner.container = $('div.targettedCampaignBanner');
        TargettedCampaignBanner.googleCookieKey = 'shoesGoogle';
        TargettedCampaignBanner.webServiceUrl = (window.location.href.indexOf('https') != 0) ? '/WebServices/RenderControls.aspx?control=TargettedCampaignBanner&configuration=' : '/WebServices/RenderControlsSecure.aspx?control=TargettedCampaignBanner&configuration=';
        TargettedCampaignBanner.cookieManager = new CookieManager();

        // if referrer is google, set google cookie
        if(document.referrer.indexOf('http://www.google.com/') == 0) {
            TargettedCampaignBanner.setGoogleCookie();
            TargettedCampaignBanner.cookieManager = new CookieManager();    // stupid implementation requires re-initializing
        }
        
        // get cookie information
        TargettedCampaignBanner.partnerId = TargettedCampaignBanner.cookieManager.getValueIgnoreCase('s_campaign');
        TargettedCampaignBanner.googleCookie = TargettedCampaignBanner.cookieManager.getValueIgnoreCase(TargettedCampaignBanner.googleCookieKey);

        // decide what to render
        TargettedCampaignBanner.renderRelatedContent();
    },

    renderRelatedContent: function() {
        if(TargettedCampaignBanner.partnerId) {
            TargettedCampaignBanner.webServiceUrl = TargettedCampaignBanner.webServiceUrl + TargettedCampaignBanner.partnerId;
            TargettedCampaignBanner.ajaxUpdate();
        }
        else if (TargettedCampaignBanner.googleCookie) {
            TargettedCampaignBanner.webServiceUrl = TargettedCampaignBanner.webServiceUrl + TargettedCampaignBanner.googleCookieKey;
            TargettedCampaignBanner.ajaxUpdate();
        }
    },

    setGoogleCookie: function() {
        TargettedCampaignBanner.cookieManager.setCookie(TargettedCampaignBanner.googleCookieKey, 'true', null, siteDomain);
    },

    ajaxUpdate : function() {
        jQuery.ajax({
            type: 'GET',
            url: TargettedCampaignBanner.webServiceUrl,
            dataType: 'html',
            success: function(html) {
                html = RemoveScriptFromAjaxResponse(CleanAjaxResponse(html));
                TargettedCampaignBanner.container.html(html);
            }
        });
    }
};

$(document).ready(TargettedCampaignBanner.initialize);

