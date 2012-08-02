// File Name: iv_nv_header
// Purpose: Contains functions/variables for omniture tracking on New vertical
// Version: October 1, 2010

//This is required for all ivillage channel.
var iv_header_isLoaded = false;
var isAstrologyPage = true;
// load the new_s_code_iv.js file 
if (window.location.href.toLowerCase().indexOf("astrology.com") == -1) {
    document.write('<scr'+'ipt  language="javascript" type="text/javascript" src="http://a820.g.akamai.net/f/820/822/1d/i.ivillage.com/ivillage/newdesign/js/iv_nv_s_code.js?070212"></scr'+'ipt>');
    isAstrologyPage = false;
}
//Omniture only stuff
iv_searchType = '';
iv_searchword = '';
iv_site = '';
iv_section = '';
iv_subsection1 ='';
iv_subsection2 = '';
iv_titletag = '';
iv_contenttype = '';
iv_urlstring = '';
iv_packageid = '';
iv_pubDate = '';
iv_dartZone = '';
iv_pageType = '';
// New vertical variables
iv_hline = '';
iv_stitle = '';
iv_envelope = '';
iv_pageid = '';
iv_subcontenttype = '';
// New ecommerce variables for Astrology
iv_event = '';
iv_events = '';
iv_product = '';
//New slideshow variable added to stop initial page load.
iv_slideshow_omni = false;
// New messageboard tracking variables for community
iv_mbdiscustitle = '';
iv_mbauthor = '';
iv_mbauthorpost = '';
iv_mbtitle = '';

// This is to capture partner name in sprop29
iv_partner = '';

function iv_setBusinessProps () {
    if (iv_pageType != "undefined" && iv_pageType == "errorPage" ) {
        s_iv.pageType="errorPage"; 
    }
    if (s_iv.pageType != "undefined" && s_iv.pageType == "errorPage" ) {
        s_iv.pageName="";        
    } else {
        //Hardcoded - never changes
        s_iv.prop8 = "iVillage Sites";
        s_iv.prop7 = '';
        fullurl=String(window.location);
        var paths=fullurl.split("/");
        var domn=(paths[2]);
        if (domn.indexOf("ivillage.com") != -1) {s_iv.prop9 = "iVillage"; s_iv.prop10 = "iVillage";}
        else if (domn.indexOf("astrology") != -1) {s_iv.prop9 = "iVillage"; s_iv.prop10 = "Astrology";}
        else { s_iv.prop9  = "iVillage_Default"; s_iv.prop10 = domn;}        
        if (iv_contenttype == null || iv_contenttype == '') {iv_contenttype = "NotDeclared:"+s_iv.prop10;}
        //builds out the s_iv.pageName value.
        s_iv.pageName = s_iv.prop10 + ":" + iv_section;
        s_iv.prop3 = iv_contenttype;
        s_iv.prop4 = s_iv.prop10 + ":" + iv_section;
        if (iv_subsection1 != '') {s_iv.pageName = s_iv.pageName + ":" + iv_subsection1; s_iv.prop4 = s_iv.prop4 + ":" + iv_subsection1;}
        s_iv.prop5 = s_iv.prop4;
        if (iv_subsection2 != '') {s_iv.pageName = s_iv.pageName + ":" + iv_subsection2; s_iv.prop5 = s_iv.prop5 + ":" + iv_subsection2;}
        if (typeof(iv_pageid) != 'undefined' && iv_pageid != '') {s_iv.pageName = s_iv.pageName + ":" + iv_pageid;} else {s_iv.pageName = s_iv.pageName + ":" + iv_titletag;};
        if (typeof(iv_stitle) != 'undefined' && iv_stitle != '') {s_iv.pageName = s_iv.pageName + ":" + iv_stitle;}
        if (typeof(iv_mbdiscustitle) != '') {s_iv.pageName = s_iv.pageName + ":" + iv_mbdiscustitle;}
        if (iv_searchType != '') {s_iv.prop7 = iv_searchType};        
        if (typeof(packageid) != 'undefined' && packageid.length >1) {iv_packageid = packageid;}
        if (iv_packageid != '') {s_iv.prop19 = iv_packageid};
        // Variables defined for new verticals
        if (typeof(iv_dartZone) != 'undefined' && iv_dartZone != '') {s_iv.eVar7 = iv_dartZone;}
        if (typeof(iv_pubDate) != 'undefined' && iv_pubDate != '') {s_iv.eVar8 = iv_pubDate;}
        if (typeof(iv_hline) != 'undefined' && iv_hline != '') {s_iv.prop30 = iv_hline;}
        if (typeof(iv_envelope) != 'undefined' && iv_envelope != '') {s_iv.prop20 = iv_envelope;} 
        if (typeof(iv_subcontenttype) != 'undefined' && iv_subcontenttype != '') {s_iv.prop15 = iv_subcontenttype;} 
        if (typeof(iv_byline) != 'undefined' && iv_byline != '') {s_iv.prop40 = iv_byline;} 
        s_iv.prop11 = "D=pageName";
        s_iv.prop12 = 'D=c8+":"+c9';
        s_iv.prop14 = iv_contenttype + ":" + iv_section;    
        s_iv.channel = s_iv.prop10 + ":" + iv_section;    
        //messageboards specific variables
        if(iv_mbdiscustitle != '') s_iv.prop36 = iv_mbdiscustitle;
        if(iv_mbauthor != '') s_iv.prop37 = iv_mbauthor;
        if(iv_mbauthorpost != '') s_iv.prop38 = iv_mbauthorpost;
        if(iv_mbtitle != '') s_iv.prop39 = s_iv.prop10 + ":" + iv_mbtitle;
        
        //Adding ecommerce variables
        if(iv_event   != '') s_iv.events=s_iv.apl(s_iv.events,iv_event,",",2);
        if(iv_events  != '') s_iv.events=s_iv.apl(s_iv.events,iv_events,",",2);
        if(iv_product != '') s_iv.products = ";" + iv_product;  

        // This is to capture partner name in sprop29
        if(iv_partner != '') s_iv.prop29 = iv_partner; 
    }        
    var s_code=s_iv.t();if(s_code)document.write(s_code);
}

// trackStr - the unique tracking string for the link.
// url - redirects to the url after calling tracking functions.
// prop - which ominiture property to modify.
// linkType - usually defaulted, but can be overridden.
// gs - same as linkType
function iv_doTracking (trackStr, url, prop, linkType, linkName, gs, el ) {
    if (linkType == null || linkType == "") { linkType = "o"; }
    if (linkName == null || linkName == "") { linkName = "Downloaded File"; }
    
    if (prop != null && prop != ""){
        prop=prop.replace(/s_prop/, "s_iv.prop");     
    }

    if (prop == null || prop == "") { prop = "s_iv.eVar13"; } else if (prop == "s.prop30" || prop == "s_prop30") { prop = "s_iv.eVar13"; }  

    if (s_account == "nbcuglobal") { s_account = "nbcuivsites";}
    var s_iv=s_gi(s_account);

    // Lets check if this is exit link or not
    var is_exit_link = true;
    if(typeof s_iv.linkInternalFilters != "undefined" && typeof el != "undefined"){
        target_anchor = null;
        if(el.tagName == "A"){
            target_anchor = el;
        }else{
            tmp_parent_element = (window.event) ? el.parentElement : el.parentNode;
            target_anchor = (tmp_parent_element.tagName == "A") ? tmp_parent_element : null;
        }

        if(target_anchor != null && typeof target_anchor.href != "undefined"){
            var iv_internal_links = s_iv.linkInternalFilters.split(",");
            for(int_link_count=0; int_link_count < iv_internal_links.length; int_link_count++){
                if(target_anchor.href.indexOf(iv_internal_links[int_link_count]) >= 0){
                    is_exit_link = false;
                    break;
                }
            }
        }
    }else{
      is_exit_link = false;
    }

    s_iv.eVar13 = trackStr;
    if(!is_exit_link){
        s_iv.tl(this,linkType,linkName);
    }

    redirectUrl = url;
    if (url != null && url != "") {     
        setTimeout("document.location.replace(redirectUrl)", 1000 );
    }
    return true;
}

/* END OF OMNITURE CODE */

//start of old functions from iv_header
function iv_getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1) { endstr = document.cookie.length; }
  return unescape(document.cookie.substring(offset, endstr)); }

function iv_DeleteCookie (name,path,domain) {
  if (iv_GetCookie(name)) {
    document.cookie = name + "=" +
      "; path=" + ((path) ? path : "/") +
      ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-1970 00:00:01 GMT";
  }
}

function iv_SetCookie (name,value,expires,path,domain) {
  // expires represents a value in days
  var ckToday = new Date();
  if (expires != null) { var exp = new Date(ckToday.getTime() + expires * 24 * 60 * 60 * 1000); }
  document.cookie = name + "=" + escape(value) +
    ((expires) ? "; expires=" + exp.toGMTString() : "") +
    "; path=" + ((path) ? path : "/") +
    ((domain) ? "; domain=" + domain : ""); }

/* Below two Functions required to check the logged in stage and fire event2 in new_s_code_iv file. Don't remove. */
function iv_getCookie(Name) {
    var tCookie = document.cookie; if (tCookie.length == 0) { return null; }
    var search = Name + "=";
    offset = tCookie.indexOf(search); if (offset == -1) { return null; }
    offset += search.length;
    end = tCookie.indexOf(";", offset);
    if (end == -1) { end = tCookie.length; }
    return unescape(tCookie.substring(offset, end));
}

function iv_getLoginTkt() {
    // iv_tkt cookie necessary to be considered logged in
    var logintkt = iv_getCookie('iv_tkt');
    if (!logintkt) { return ""; }
    return logintkt;
}

//end of old functions from iv_header