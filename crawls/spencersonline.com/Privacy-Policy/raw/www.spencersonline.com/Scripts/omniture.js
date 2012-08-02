function OmnitureStore(storeId) {
    var s = s_gi(String(window.omniServer)); //Your organization's report suite ID
    s.prop17 = storeId;
    s.visitorNamespace = window.omniNamespace;
    s.tl(this, 'o', 'storeId');
    return true;
}

// TODO: get value of server from BaseController.SiteParam.OmniServerJavaScriptString in function
//product click (category, family, department page)
function ProductClick(server, productId, evar4) {
    //////alert(server);
    ////var s = s_gi(String(server)); //Your organization's report suite ID
    ////s.linkTrackVars = 'events,products';
    ////s.linkTrackEvents = 'event15';
    ////s.events = 'event15';
    ////s.products = ';' + productId + ';;;;evar4=' + evar4;
    ////s.tl(this, 'o', evar4);
    setCookie('omniEvar4', evar4, 10);
    return true;
}

function SaveLastSiteSection(section) {
    setCookie('omniSiteSection', section, 10);
    return true;
}

function getLastSiteSection() {
    var v = getCookie('omniSiteSection');
    setCookie('omniSiteSection', '', -10);
    return v == null || v.length == 0 ? '' : v;
}

function ProductPageClicks(server, productId, evar25, isSend) {
    var s = s_gi(String(server)); //Your organization's report suite ID
    s.linkTrackVars = 'events,products';
    s.linkTrackEvents = 'event2';
    s.events = 'event2';
    s.products = ';' + productId + ';;;;evar25=' + evar25;
    //if (isSend) 
    {
        s.visitorNamespace = omniNamespace;
        s.tl(this, 'o', evar25);
    }
    return true;
}

function SendOmnitureClicks(server, events, products, linkName) {
    var s = s_gi(String(server)); //Your organization's report suite ID
    s.linkTrackVars = 'events,products';
    s.linkTrackEvents = events;
    s.events = events;
    s.products = products;
    s.visitorNamespace = omniNamespace;
    s.tl(this, 'o', linkName);
    return true;
}

function SendOmnitureWishlistClicks(server, productId, eVar26) {
    var s = s_gi(String(server)); //Your organization's report suite ID
    s.linkTrackVars = 'events,products';
    s.linkTrackEvents = 'event16';
    s.events = 'event16';
    s.products = ';' + productId + ';;;;evar15=' + productId + '|eVar26=' + eVar26;
    s.visitorNamespace = omniNamespace;
    s.tl(this, 'o', eVar26);
    return true;
}

function getEvar4() {
    var v = getCookie('omniEvar4');
    setCookie('omniEvar4', '', -10);
    return v == null || v.length == 0 ? 'Other Sources' : v;
}

function getAndResetCookie(name) {
    var v = getCookie(name);
    setCookie(name, '', -10);
    return v == null || v.length == 0 ? '' : v;
}

function UpdateOmniValues(s) {
    var icid = getAndResetCookie('omniGetParamIcid');
    if (icid != null && icid.length != 0) {
        s.prop4 = s.pageName + '|' + icid;
    }

    var camp = getAndResetCookie('omniGetParamCamp');
    if (camp != null && camp.length != 0) {
        s.prop3 = s.eVar2 = s.pageName + '|' + camp;
    }

    var utmCampaign = getAndResetCookie('omniGetParamUtmCampaign');
    if (utmCampaign != null && utmCampaign.length != 0) {
        s.campaign = utmCampaign;
    }
}
