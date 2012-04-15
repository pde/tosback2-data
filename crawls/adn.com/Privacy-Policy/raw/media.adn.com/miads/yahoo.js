// This file contains variable that should be not be overridden.
// We override them here no matter what the defaults say or
// the site specific files say.

// We also have some functions in here for determining if ads should
// be displayed on sites or not (Yahoo AND DART).

var yld_mgr = {};

yld_mgr.container_type = "js";  // DO NOT CHANGE THIS
yld_mgr.disable_content_send = miyahoo.disable_content_send;
yld_mgr.content_topic_id_list = [miyahoo.tax_id.toString()];

var query = window.location.toString().match(/(pubsys_story|pubsys_gallery|pubsys_media|qna_general|movies_showtimes|events_target|sf_search_text)[^a-zA-Z=]*=([^&;]*)/);
search_keywords = null;
if (query && query[1]) {
    search_keywords = unescape(query[2]);
    miyahoo.cstm_sctn_list = "search results";
    if(search_keywords) miyahoo.cstm_content_cat = search_keywords;
}

yld_mgr.cstm_sctn_list = [miyahoo.cstm_sctn_list];

miyahoo.cstm_content_cat = make_safe(miyahoo.cstm_content_cat);

yld_mgr.pub_id = misite.yahoo_pub_id;
yld_mgr.site_name = misite.yahoo_site_name;

mi_live_or_preview = 'preview';
if(mi_is_live){mi_live_or_preview = 'live';}

yld_mgr.request_type = miyahoo.ads[mi_live_or_preview].yahoo.request_type;

// Do InSite cookie stuff.
if(miadcookie = GetCookie('adinfo'))
{
    addUserData();
}

if(yld_mgr.user_country == null)
{
    setGeoinfoData();
}

yld_mgr.slots = populate_per_ad(miyahoo.slots);

// sets country from the geoinfo cookie for ad targeting by country
function setGeoinfoData()
{
    migeoinfocookie = GetCookie('geoinfo');
    if(migeoinfocookie)
    {
        // COUNTRY_CODE|REGION|CITY|ZIPCODE
        migeoinfo = migeoinfocookie.split('|');
        yld_mgr.user_country = migeoinfo[0];
    }
}

// ads insite data to the yahoo object
function addUserData()
{
    miadinfo = miadcookie.split('|');
    mi_gender = miadinfo[0].toLowerCase();
    mi_birthyear = miadinfo[1];
    mi_income = miadinfo[2].toLowerCase();
    mi_city = miadinfo[3].toLowerCase();
    mi_state = miadinfo[4].toLowerCase();
    mi_zip = miadinfo[5];
    mi_country = miadinfo[6].toLowerCase();
    
    if(mi_gender == 'm')
    {
        mi_gender = 'male';
    }
    else if(mi_gender == 'f')
    {
        mi_gender = 'female';
    }
    yld_mgr.user_gender = mi_gender;
    
    yld_mgr.user_city = mi_city;
    yld_mgr.user_country = mi_country;
    if(mi_country == 'us')
    {
        yld_mgr.user_state = mi_state;
    }
    yld_mgr.user_zip = mi_zip;
    
    if(mi_income)
    {
        income = mi_income.split('-');
        if(income[0] != '1'){ income[0] = income[0]+'000'; }
        if(income[1])
        {
            if(income[1] == "999")
            {
                income[1] = "";
            }
            else
            {
                income[1] = income[1]+'999';
            }
        }
        yld_mgr.user_income = income.join('-');
        if(mi_income == "0-0")
        {
            yld_mgr.user_income = "";
        }
    }
    yld_mgr.user_age = getAgeRange(mi_birthyear);
}

// figures out age ranges.
function getAgeRange(year)
{
    //13-17, 18-20, 21-24, 25-29, 30-34, 35-39
    //40-44, 45-49, 50-54, 55-59, 60-64, 65-100
    d = new Date();
    age = d.getFullYear() - year;
    range = '';
    if( age >= 13 && age <= 17)
    {
        range = '13-17';
    }
    else if( age >= 18 && age <= 20)
    {
        range = '18-20';
    }
    else if( age >= 21 && age <= 24)
    {
        range = '21-24';
    }
    else if( age >= 25 && age <= 29)
    {
        range = '25-29';
    }
    else if( age >= 30 && age <= 34)
    {
        range = '30-34';
    }
    else if( age >= 35 && age <= 39)
    {
        range = '35-39';
    }
    else if( age >= 40 && age <= 44)
    {
        range = '40-44';
    }
    else if( age >= 45 && age <= 49)
    {
        range = '45-49';
    }
    else if( age >= 50 && age <= 54)
    {
        range = '50-54';
    }
    else if( age >= 55 && age <= 59)
    {
        range = '55-59';
    }
    else if( age >= 60 && age <= 64)
    {
        range = '60-64';
    }
    else if( age >= 65 && age <= 100)
    {
        range = '65-100';
    }
    return range;
}

// GENERIC COOKIE FUNCTIONS
function GetCookie(c_name) {
    c_name=c_name+"=";
    var ca =document.cookie.split(';');
    var cb=null;
    for(var i=0;i < ca.length;i++) {
        var c=ca[i];
        while (c.charAt(0)==' ')
            c=c.substring(1,c.length);
        if (c.indexOf(c_name) == 0) {
            cb=c.substring(c_name.length,c.length);
            break;
        }
    }
    if(cb == null){ return null; }
    return decodeURIComponent(cb);
} 

function make_safe(str)
{
    str = str.replace(/\+/g, " ");
    str = str.replace(/&[^\s]*;/g, "");
    str = str.replace(/[^a-zA-z0-9-_ ]/g, "");
    str = str.replace(/[`\^\\]/g, "");
    return str;
}

function populate_per_ad(slots)
{
    for (key in slots)
    {
        if(miyahoo.content_type != null && slots[key].content_type == null)
        {
            slots[key].content_type_list = [miyahoo.content_type];
        }
        if(miyahoo.cstm_content_cat != null && slots[key].cstm_content_cat == null)
        {
            slots[key].cstm_content_cat_list = [miyahoo.cstm_content_cat];
            if(yld_mgr.user_country){slots[key].cstm_content_cat_list.push(yld_mgr.user_country.toUpperCase());}
        }
    }
    return slots;
}
