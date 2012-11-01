function get_ad_ratings(ad) {
    var ad_extensions = '';
    if (typeof(ad.seller_ratings) != 'undefined') {
        var seller_rating = ad.seller_ratings;
        // v1 structure
        if(dn != 'speedparking.com') {
            ad_extensions += '<div class="ad_rating"><table cellpadding="0" cellspacing="0" border="0"><tr>';
            ad_extensions += '<td class="ad_rating_text">' + seller_rating.advertiser_info + '</td>';
            for (var j=0; j < 5; j++) {
                var star = 'e';
                if (seller_rating.rating > 0) {
                    if (seller_rating.rating >= 1) {
                    star = 'f';
                    } else {
                    star = 'p';
                    }
                }
                seller_rating.rating--;
                ad_extensions += '<td class="ad_rating_star' + star + '"></td>';
            }
            ad_extensions += '<td> (<a href="' + seller_rating.source_url + '" target="_blank">' + seller_rating.review_count + '</a>)</td>';
            ad_extensions += '</tr></table></div>';
        }
        // v2 structure
        else {
            var sr_text = seller_rating.text;
            sr_text = sr_text.replace('{{RATING}}', '<img src="' + seller_rating.rating_img_url + '">');
            sr_text = sr_text.replace('{{LINK_START}}', '<a href="' + seller_rating.source_url + '" target="_blank">');
            sr_text = sr_text.replace('{{LINK_END}}', '</a>');
            
            ad_extensions += '<div class="ad_rating"><table cellpadding="0" cellspacing="0" border="0"><tr>';
            ad_extensions += '<td class="ad_rating_text">' + sr_text + '</td>';
            ad_extensions += '</tr></table></div>';
        }
    }
    return ad_extensions;
}

function get_ad_sitelinks(ad) {
    var ad_extensions = '';
    if (typeof(ad.sitelinks) != 'undefined') {
        ad_extensions += '<div class="ad_sitelinks"><table cellpadding="0" cellspacing="0" border="0">';
        for (var j=0; j < ad.sitelinks.length; j++) {
            var sitelink = ad.sitelinks[j];
            if ((j % 2) == 0) {
                ad_extensions += '<tr><td class="sitelinks_col1">'
            } else {
                ad_extensions += '<td class="sitelinks_col2">'
            }
            ad_extensions += '<a href="' + sitelink.catcher_url + '" target="_blank">' + sitelink.link_text + '</a>';
            if ((j % 2) == 0) {
                ad_extensions += '</td>'
            } else {
                ad_extensions += '</td></tr>'
            }
        }
        ad_extensions += '</table></div>';
    }

    return ad_extensions;
}

function display_ads(google_ads_array, iba_url, wrapper) {
    
    var ads_string = '';
    for (var i = 0; i < google_ads_array.length; i++) {
        var ad_title = '<div class="ads_title"><a href="' + google_ads_array[i].catcher_url + '" target="_blank">' + google_ads_array[i].ad_title + '</a></div>';
        var ad_link = '<a class="ads_link" href="' + google_ads_array[i].catcher_url + '" target="_blank">' + google_ads_array[i].visible_url + '</a>';
        var ad_description = '<div class="ads_desc">';
        if (typeof(ad_format) != 'undefined' && ad_format == 2) {
            ad_description += '<span class="ad_urlline">' + ad_link + '</span>';
            ad_link = '';
        }
        ad_description += google_ads_array[i].ad_description + '</div>';
        var ad_ratings = get_ad_ratings(google_ads_array[i]);
        var ad_sitelinks = get_ad_sitelinks(google_ads_array[i]);

        var extra_class = '';
        if (i == 0) {
            extra_class = ' ad_first';
        } else if (i == google_ads_array.length - 1) {
            extra_class = ' ad_last';
        }
        ads_string += '<div class="ad'+extra_class+'">' + ad_title + ad_description + ad_ratings + ad_link + ad_sitelinks + '</div>';
    }

    // display
    document.getElementById(wrapper+"_container").innerHTML = ads_string;
    if(iba_url) {
        var sponsored_label = document.getElementById(wrapper+"_title").innerHTML;
        document.getElementById(wrapper+"_title").innerHTML = '<a href="' + iba_url + '" target="_blank">' + sponsored_label + '</a>';
    }
    document.getElementById(wrapper).style.display = 'block';
    document.getElementById("portal").style.display = 'none';
}

function display_ws(google_ws_array) {
    if(google_ws_array.length > 0) {
        var ws_string = '';
        for (var i = 0; i < google_ws_array.length; i++) {
            var ws_title = '<div class="ads_title"><a class="title-add" href="' + google_ws_array[i].ws_url + '" target="_blank">' + google_ws_array[i].ws_title + '</a></div>';
            var ws_description = '<div class="ads_desc">' + google_ws_array[i].ws_description + '</div>';
            var ws_link = '<a class="ads_link" href="' + google_ws_array[i].ws_url + '" target="_blank">' + google_ws_array[i].ws_url + '</a>';

            var extra_class = '';
            if (i == 0) {
                extra_class = ' ad_first';
            } else if (i == google_ws_array.length - 1) {
                extra_class = ' ad_last';
            }
            ws_string += '<div class="ad'+extra_class+'">' + ws_title + ws_description + ws_link + '</div>';
        }
        
        // display
        document.getElementById("web_container").innerHTML  = ws_string;
    }

    document.getElementById("web").style.display = 'block';
}

function display_oneclick() {
    display_ads(google_ads_array, iba_url, 'ads');
    if(gt == 'AFS' && google_ws_array) {
        display_ws(google_ws_array);
    }
    if(gt == 'AFS' && google_ads_repeat_array && google_ads_repeat_array.length > 0) {
        display_ads(google_ads_repeat_array, '', 'ads_repeat');
    }
}