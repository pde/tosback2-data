var prodPage = (location.href.toLowerCase().indexOf("/prod/") != -1 || location.href.toLowerCase().indexOf("product.asp") != -1 || location.href.toLowerCase().indexOf("/pr/") != -1) ;
var searchPage = (location.href.toLowerCase().indexOf("usersearchresults") != -1 || location.href.toLowerCase().indexOf("/umerch/") != -1 || location.href.toLowerCase().indexOf("/sr/") != -1 || location.href.toLowerCase().indexOf("/searchresults.aspx") != -1);
var refSearchPage = (document.referrer.toLowerCase().indexOf("usersearchresults") != -1 || document.referrer.toLowerCase().indexOf("/umerch/") != -1 || document.referrer.toLowerCase().indexOf("/sr/") != -1 || document.referrer.toLowerCase().indexOf("/searchresults.aspx") != -1);
var omTrackURL = '';
var search_query_type;
var search_store;
var search_keyword;
var searchStore;


function getSearchKeyword(url) {
    var regex = new RegExp("/([^/]+?)\.html");
    var results = regex.exec(url.toLowerCase());
    if (results == null) {
        return "";
    } else {
        return results[1];
    }
}

/*
function getQueryStringParameter(name, url) {
    alert(url.toLowerCase());
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url.toLowerCase());
    if (results == null) {
        return "";
    } else {
        return results[1];
    }
}
*/

/*
Returns the value for a give query string key. If the href doesn't have a 
true query string (i.e. ?key=value&key=value....) it parse the url for the managed url
pattern /key/value/.
*/
function getQueryStringParameter(key, url) {
    var value = "";
    try {

        var value = null;
        var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        var match = regex.exec(url);
        if (match != null && match.length == 2) {
            value = match[1];
        }
        else {
            regex = new RegExp("\/" + key + "\/(.*?)\/");
            match = regex.exec(url);
            if (match != null && match.length == 2) {
                value = match[1];
            }
        }
    }
    catch (ex) {
        value = "";
    }
    return value;
}

if (searchPage || refSearchPage || prodPage ) 
{
    if (searchPage) {
        omTrackURL = window.location.href.toLowerCase();
    } else if (prodPage) {
        omTrackURL = document.referrer.toLowerCase();
    } 
        

     if (omTrackURL.indexOf("/querytype/networking/") != -1) {
         search_query_type = "networking";
     } else if (omTrackURL.indexOf("/querytype/comp/") != -1) {
        search_query_type = "comp";
     } else if (omTrackURL.indexOf("/querytype/comp_mfgpartno/") != -1) {
        search_query_type = "comp_mfgpartno";
     } else if (omTrackURL.indexOf("/querytype/office/") != -1) {
        search_query_type = "office";
     } else if (omTrackURL.indexOf("/querytype/soft/") != -1) {
        search_query_type = "soft";
     } else if (omTrackURL.indexOf("/querytype/soft_mfgpartno/") != -1) {
        search_query_type = "soft_mfgpartno";
     } else if (omTrackURL.indexOf("/querytype/electronics/") != -1) {
        search_query_type = "electronics";
     } else if (omTrackURL.indexOf("/querytype/digcam/") != -1) {
        search_query_type = "digcam";
     } else if (omTrackURL.indexOf("/querytype/wireless/") != -1) {
        search_query_type = "wireless";
     } else if (omTrackURL.indexOf("/querytype/book/") != -1) {
        search_query_type = "book";
     } else if (omTrackURL.indexOf("/querytype/book_title/") != -1) {
        search_query_type = "book_title";
     } else if (omTrackURL.indexOf("/querytype/book_author/") != -1) {
        search_query_type = "book_author";
     } else if (omTrackURL.indexOf("/querytype/book_isbn/") != -1) {
        search_query_type = "book_isbn";
     } else if (omTrackURL.indexOf("/querytype/book_publisher/") != -1) {
        search_query_type = "book_publisher";
     } else if (omTrackURL.indexOf("/querytype/video/") != -1) {
        search_query_type = "video";
     } else if (omTrackURL.indexOf("/querytype/video_dvd/") != -1) {
        search_query_type = "video_dvd";
     } else if (omTrackURL.indexOf("/querytype/dvd_title/") != -1) {
        search_query_type = "dvd_title";
     } else if (omTrackURL.indexOf("/querytype/dvd_actor/") != -1) {
        search_query_type = "dvd_actor";
     } else if (omTrackURL.indexOf("/querytype/dvd_director/") != -1) {
        search_query_type = "dvd_director";
     } else if (omTrackURL.indexOf("/querytype/dvd_hd/") != -1) {
        search_query_type = "dvd_hd";
     } else if (omTrackURL.indexOf("/querytype/dvd_bluray/") != -1) {
        search_query_type = "dvd_bluray";
     } else if (omTrackURL.indexOf("/querytype/dvd_umd/") != -1) {
        search_query_type = "dvd_umd";
     } else if (omTrackURL.indexOf("/querytype/video_vhs/") != -1) {
        search_query_type = "video_vhs";
     } else if (omTrackURL.indexOf("/querytype/video_title/") != -1) {
        search_query_type = "video_title";
     } else if (omTrackURL.indexOf("/querytype/video_actor/") != -1) {
        search_query_type = "video_actor";
     } else if (omTrackURL.indexOf("/querytype/video_director/") != -1) {
        search_query_type = "video_director";
     } else if (omTrackURL.indexOf("/querytype/game/") != -1) {
        search_query_type = "game";
     } else if (omTrackURL.indexOf("/querytype/game_title/") != -1) {
        search_query_type = "game_title";
     } else if (omTrackURL.indexOf("/querytype/game_pc/") != -1) {
        search_query_type = "game_pc";
     } else if (omTrackURL.indexOf("/querytype/game_gameboy/") != -1) {
        search_query_type = "game_gameboy";
     } else if (omTrackURL.indexOf("/querytype/game_nintendods/") != -1) {
        search_query_type = "game_nintendods";
     } else if (omTrackURL.indexOf("/querytype/game_wii/") != -1) {
        search_query_type = "game_wii";
     } else if (omTrackURL.indexOf("/querytype/game_playstation/") != -1) {
        search_query_type = "game_playstation";
     } else if (omTrackURL.indexOf("/querytype/game_playstation2/") != -1) {
        search_query_type = "game_playstation2";
     } else if (omTrackURL.indexOf("/querytype/game_ps3/") != -1) {
        search_query_type = "game_ps3";
     } else if (omTrackURL.indexOf("/querytype/game_gbadv/") != -1) {
        search_query_type = "game_gbadv";
     } else if (omTrackURL.indexOf("/querytype/game_cube/") != -1) {
        search_query_type = "game_cube";
     } else if (omTrackURL.indexOf("/querytype/game_xbox/") != -1) {
        search_query_type = "game_xbox";
     } else if (omTrackURL.indexOf("/querytype/game_psp/") != -1) {
        search_query_type = "game_psp";
     } else if (omTrackURL.indexOf("/querytype/game_xbox360/") != -1) {
        search_query_type = "game_xbox360";
     } else if (omTrackURL.indexOf("/querytype/music/") != -1) {
        search_query_type = "music";
     } else if (omTrackURL.indexOf("/querytype/music_artist/") != -1) {
        search_query_type = "music_artist";
     } else if (omTrackURL.indexOf("/querytype/music_album/") != -1) {
        search_query_type = "music_album";
     } else if (omTrackURL.indexOf("/querytype/clearance/") != -1) {
        search_query_type = "clearance";
     } else if (omTrackURL.indexOf("/querytype/magazines/") != -1) {
        search_query_type = "magazines";
     } else if (omTrackURL.indexOf("/querytype/luggage/") != -1) {
        search_query_type = "luggage";
     } else if (omTrackURL.indexOf("/querytype/home/") != -1) {
        search_query_type = "home";
     } else if (omTrackURL.indexOf("/querytype/sports/") != -1) {
        search_query_type = "sports";
     } else if (omTrackURL.indexOf("/querytype/toys/") != -1) {
        search_query_type = "toys";
     } else if (omTrackURL.indexOf("/querytype/baby/") != -1) {
        search_query_type = "baby";
     } else if (omTrackURL.indexOf("/querytype/ho/") != -1) {
        search_query_type = "ho";
     } else if (omTrackURL.indexOf("/querytype/jewelry/") != -1) {
        search_query_type = "jewelry";
     } else if (omTrackURL.indexOf("/querytype/apparel/") != -1) {
        search_query_type = "apparel";
     } else if (omTrackURL.indexOf("/querytype/shoes/") != -1) {
        search_query_type = "shoes";
     } else if (omTrackURL.indexOf("/querytype/hb/") != -1) {
        search_query_type = "hb";
     } else if (omTrackURL.indexOf("/querytype/pets/") != -1) {
        search_query_type = "pets";
     } else if (omTrackURL.indexOf("/querytype/tv/") != -1) {
        search_query_type = "tv";
     } else if (omTrackURL.indexOf("/querytype/mi/") != -1) {
        search_query_type = "mi";
     } else if (omTrackURL.indexOf("querytype") != -1) {
           if (searchPage) {
                search_query_type = getQueryStringParameter('querytype',window.location.href);
            } else if (prodPage) {
                search_query_type = getQueryStringParameter('querytype',document.referrer);
            } 
     } else {
        search_query_type = "";
     }

    if (searchPage) {
        if (location.href.indexOf("store") != -1) {
            search_store = getQueryStringParameter('store',window.location.href);
        } else if (location.href.indexOf("search_store") != -1) {
            search_store = getQueryStringParameter('search_store',window.location.href);
        }
    } else if (prodPage) {
        if (document.referrer.indexOf("search_store") != -1) {
            search_store = getQueryStringParameter('search_store',document.referrer);
        } else if (document.referrer.indexOf("store") != -1) {
            search_store = getQueryStringParameter('store',document.referrer);
        }
    }
     
   
    if (search_store == "1" || omTrackURL.indexOf("/store/1/") != -1 || omTrackURL.indexOf("/search_store/1/") != -1) {
        searchStore = "Computers";
    } else if (search_store == "35" || omTrackURL.indexOf("/store/35/") != -1 || omTrackURL.indexOf("/search_store/35/") != -1) {
        searchStore = "Office Supplies";
    } else if (search_store == "2" || omTrackURL.indexOf("/store/2/") != -1 || omTrackURL.indexOf("/search_store/2/") != -1) {
        searchStore = "Software";
    } else if (search_store == "8" || omTrackURL.indexOf("/store/8/") != -1 || omTrackURL.indexOf("/search_store/8/") != -1) {
        searchStore = "Electronics";
    } else if (search_store == "9" || omTrackURL.indexOf("/store/9/") != -1 || omTrackURL.indexOf("/search_store/9/") != -1) {
        searchStore = "Cell Phones";
    } else if (search_store == "48" || omTrackURL.indexOf("/store/48/") != -1 || omTrackURL.indexOf("/search_store/48/") != -1){
        searchStore = "Digital Cameras";
    } else if (search_store == "19" || omTrackURL.indexOf("/store/19/") != -1 || omTrackURL.indexOf("/search_store/19/") != -1) {
        searchStore = "Networking";
    } else if (search_store == "6" || omTrackURL.indexOf("/store/6/") != -1 || omTrackURL.indexOf("/search_store/6/") != -1) {
        searchStore = "Music";
    } else if (search_store == "4" || omTrackURL.indexOf("/store/4/") != -1 || omTrackURL.indexOf("/search_store/4/") != -1) {
        searchStore = "DVDs";
    } else if (search_store == "3" || omTrackURL.indexOf("/store/3/") != -1 || omTrackURL.indexOf("/search_store/3/") != -1){
        searchStore = "Books";
    } else if (search_store == "5" || omTrackURL.indexOf("/store/5/") != -1 || omTrackURL.indexOf("/search_store/5/") != -1) {
        searchStore = "Games";
    } else if (search_store == "20" || omTrackURL.indexOf("/store/20/") != -1 || omTrackURL.indexOf("/search_store/20/") != -1) {
        searchStore = "Bags";
    } else if (search_store == "45" || omTrackURL.indexOf("/store/45/") != -1 || omTrackURL.indexOf("/search_store/45/") != -1) {
        searchStore = "Toys";
    } else if (search_store == "46" || omTrackURL.indexOf("/store/46/") != -1 || omTrackURL.indexOf("/search_store/46/") != -1) {
        searchStore = "Baby";
    } else if (search_store == "23" || omTrackURL.indexOf("/store/23/") != -1 || omTrackURL.indexOf("/search_store/23/") != -1) {
        searchStore = "Sports";
    } else if (search_store == "27" || omTrackURL.indexOf("/store/27/") != -1 || omTrackURL.indexOf("/search_store/27/") != -1) {
        searchStore = "Home & Outdoor";
    } else if (search_store == "28" || omTrackURL.indexOf("/store/28/") != -1 || omTrackURL.indexOf("/search_store/28/") != -1) {
        searchStore = "Health & Beauty";
    } else if (search_store == "24" || omTrackURL.indexOf("/store/24/") != -1 || omTrackURL.indexOf("/search_store/24/") != -1) {
        searchStore = "Jewerly and Watches";
    } else if (search_store == "25" || omTrackURL.indexOf("/store/25/") != -1 || omTrackURL.indexOf("/search_store/25/") != -1) {
        searchStore = "Apparel";
    } else if (search_store == "26" || omTrackURL.indexOf("/store/26/") != -1 || omTrackURL.indexOf("/search_store/26/") != -1) {
        searchStore = "Shoes";
    } else if (search_store == "29" || omTrackURL.indexOf("/store/29/") != -1 || omTrackURL.indexOf("/search_store/29/") != -1) {
        searchStore = "Pets";
    } else if (search_store == "30" || omTrackURL.indexOf("/store/30/") != -1 || omTrackURL.indexOf("/search_store/30/") != -1) {
        searchStore = "Televisions";
    } else if (search_store == "31" || omTrackURL.indexOf("/store/31/") != -1 || omTrackURL.indexOf("/search_store/31/") != -1) {
        searchStore = "Musical Instruments";
     } else {
        searchStore = "Home";
     }
 
    if (searchPage) {
        if (omTrackURL.indexOf(".html") != -1) {
          search_keyword = getSearchKeyword(window.location.href);
        } else {
          search_keyword = getQueryStringParameter('qu',window.location.href);  
        }
    } else if (prodPage) {
        if (omTrackURL.indexOf(".html") != -1) {
          search_keyword = getSearchKeyword(document.referrer);
        } else {
          search_keyword = getQueryStringParameter('qu',document.referrer);  
        }
    }

}
