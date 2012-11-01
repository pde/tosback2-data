// ads and rs
var google_ads_array; // = new Array;
var google_ads_repeat_array; // = new Array;
var google_rs_array; // = new Array;

// tokens
var search_token = '';
// already defined
// var token = '';

// iba
var iba_url;

function debug_out(myObject) {
    str = '';
    if(typeof myObject == 'object') {
        for(property in myObject) {
            if(typeof myObject[property] == 'object') {
                str += property + " --> object:\n\t";
                str += debug_out(myObject[property]);
            }
            else {
                str += property + " -> " + myObject[property] + "\n";
            }
        }
    }
    else {
        str += "no obj: " + myObject + "\n";
    }
    return str;
}

function debug_write(MyObject, tag) {
    str = "<pre class='left'>";
    str += "-----------------------------------------\n";
    str += tag + "\n";
    str += "-----------------------------------------\n";
    str += debug_out(MyObject);
    str += "-----------------------------------------\n";
    str += "</pre>";
    document.write(str);
}

function google_set_token() {
    if(token && !google_afd_request.token) {
        google_afd_request.token = token;
        // debug
        if (test) {
            // alert("set token: " + token);
        }
    }
}

function google_afd_ad_request_done(google_afd_response) {
    // sim static counter
    if (google_afd_ad_request_done.counter == undefined) {
        google_afd_ad_request_done.counter = 0;
    }
    google_afd_ad_request_done.counter++;
    
    // debug
    if (test) {
        // alert counter
        // alert("GCALL: " + google_afd_ad_request_done.counter);

        // debug write response info
        debug_write(google_afd_response, google_afd_ad_request_done.counter);
    }
    
    // error code
    if (google_afd_response.error_code) {
        // debug
        if(test) {
            alert('Err code: ' + google_afd_response.error_code);
        }
        else {
            // document.write('<!--Err code: ' + google_afd_response.error_code + '-->');
            document.write('Err code: ' + google_afd_response.error_code);
        }
        return;
    }

    // search token
    if (google_afd_response.search_token) {
        search_token = google_afd_response.search_token;
    }
    
    // token
    if (google_afd_response.token) {
        token = google_afd_response.token;
    }

    // iba
    if(google_afd_response.feedback_url && (!gt || gt != 'AFS')) {
        iba_url = google_afd_response.feedback_url;
    }

    // feedback
    if(run_feedback) {
        var feedback_type='';
        if(is_adult_google != 'unknown' && google_afd_response.adult && is_adult_domain != google_afd_response.adult) {
            feedback_type += ' adultmismatch';
        }
        if((is_adult_google == 'unknown' && google_afd_response.adult && is_adult_google != google_afd_response.adult) 
        || (is_adult_google != 'unknown' && google_afd_response.adult && is_adult_domain != google_afd_response.adult && is_adult_google != google_afd_response.adult)) {
            feedback_type += ' adultupdate';
        }
        if (google_afd_response.faillisted) {
            feedback_type += ' faillisted';
        }
        if (google_afd_response.needsreview) {
            feedback_type += ' needsreview';
        }
        if(feedback_type != '') {
            $.ajax({
                url: 'feed' + 'back.php',
                cache: false,
                type: 'POST',
                data: {'dn': dn, 'type': feedback_type}
            });
        }
    }

    // array google ads
    if(!is_rs_test || (is_rs_test && google_afd_response.request.client != 'ca-dp-namedrive-related')) {
        if (google_afd_response.ads && google_afd_response.ads.length > 0) {
            google_ads_array = new Array;
            google_ads_counter = 0;
            // top ads
            if(is_top_ads) {
                google_ads_repeat_array = new Array; 
                google_ads_repeat_counter = 0;
            }
            for (var i = 0; i < google_afd_response.ads.length; i++) {
                // ads
                var ad_object = new Object;
                ad_object.ad_title = google_afd_response.ads[i].line1;
                ad_object.ad_description = google_afd_response.ads[i].line2;
                if (google_afd_response.ads[i].line3) {
                     ad_object.ad_description += ' ' + google_afd_response.ads[i].line3;
                }
                ad_object.visible_url = google_afd_response.ads[i].visible_url
                ad_object.catcher_url = cl + '&vu=' + encodeURIComponent(google_afd_response.ads[i].visible_url) + '&ru=' + encodeURIComponent(google_afd_response.ads[i].url) + '&no=' + encodeURIComponent(google_afd_response.ads[i].n) + '&rn=' + encodeURIComponent(google_afd_response.ads.length);
                // seller ratings            
                if (google_afd_response.ads[i].seller_ratings) {
                    // v2 
                    if(dn == 'speedparking.com') {
                        ad_object.seller_ratings = new Object;
                        ad_object.seller_ratings.text = google_afd_response.ads[i].seller_ratings.text;
                        ad_object.seller_ratings.rating = google_afd_response.ads[i].seller_ratings.rating;
                        ad_object.seller_ratings.source_url = google_afd_response.ads[i].seller_ratings.source_url;
                        ad_object.seller_ratings.rating_img_url = google_afd_response.ads[i].seller_ratings.rating_img_url;
                    }
                    // v2 to v1 conversion
                    else if(google_afd_response.ads[i].seller_ratings.text) {
                        ad_object.seller_ratings = new Object;
                        ad_object.seller_ratings.advertiser_info = google_afd_response.ads[i].seller_ratings.text.substring(0, google_afd_response.ads[i].seller_ratings.text.indexOf('{{RATING}}'));
                        ad_object.seller_ratings.review_count = google_afd_response.ads[i].seller_ratings.text.substring(google_afd_response.ads[i].seller_ratings.text.indexOf('{{LINK_START}}') + 14, google_afd_response.ads[i].seller_ratings.text.indexOf('{{LINK_END}}'));
                        ad_object.seller_ratings.rating = google_afd_response.ads[i].seller_ratings.rating;
                        ad_object.seller_ratings.source_url = google_afd_response.ads[i].seller_ratings.source_url;
                        ad_object.seller_ratings.rating_img_url = google_afd_response.ads[i].seller_ratings.rating_img_url;
                    }
                    // v1
                    else {
                        ad_object.seller_ratings = new Object;
                        ad_object.seller_ratings.advertiser_info = google_afd_response.ads[i].seller_ratings.advertiser_info;
                        ad_object.seller_ratings.rating = google_afd_response.ads[i].seller_ratings.rating;
                        ad_object.seller_ratings.review_count = google_afd_response.ads[i].seller_ratings.review_count;
                        ad_object.seller_ratings.source_url = google_afd_response.ads[i].seller_ratings.source_url;
                    }
                }
                // sitelinks           
                if (google_afd_response.ads[i].sitelinks && google_afd_response.ads[i].sitelinks.length > 0) {
                    ad_object.sitelinks = new Array;
                    for (var j = 0; j < google_afd_response.ads[i].sitelinks.length; j++) {
                        ad_object.sitelinks[j] = new Object;
                        ad_object.sitelinks[j].link_text = google_afd_response.ads[i].sitelinks[j].link_text;
                        // ad_object.sitelinks[j].url = google_afd_response.ads[i].sitelinks[j].url;
                        ad_object.sitelinks[j].catcher_url = cl + '&vu=' + encodeURIComponent(google_afd_response.ads[i].visible_url) + '&ru=' + encodeURIComponent(google_afd_response.ads[i].sitelinks[j].url) + '&no=' + encodeURIComponent(google_afd_response.ads[i].n) + '&rn=' + encodeURIComponent(google_afd_response.ads.length);
                    }
                }
                
                // top / repeat ads assign
                if(gt == 'AFS' && is_top_ads) {
                    if(google_afd_response.ads[i].position == 'Top') {
                        google_ads_array[google_ads_counter++] = ad_object;
                    }
                    else {
                        google_ads_repeat_array[google_ads_repeat_counter++] = ad_object;
                    }
                }
                // normal ads
                else {
                    google_ads_array[google_ads_counter++] = ad_object;
                }
            }                                                               

            if(test) {
                debug_write(google_ads_array, google_ads_counter);
                if(is_top_ads) {
                    debug_write(google_ads_repeat_array, google_ads_repeat_counter);
                }
            }
            force_portal = 0;
        }
        // no ads
        else {
            force_portal = 1;
        }
    }

    // array google rs
    if(!is_rs_test || (is_rs_test && google_afd_response.request.client == 'ca-dp-namedrive-related')) {
        if(google_afd_response.link_units && google_afd_response.link_units.length > 0) {
            // google_rs_array = google_afd_response.link_units;
            google_rs_array = new Array;
            for (var i = 0; i < google_afd_response.link_units.length; i++) {
                google_rs_array[i] = new Object;
                google_rs_array[i].term = google_afd_response.link_units[i].term;
                google_rs_array[i].token = google_afd_response.link_units[i].token;
            }
        }
    }
    
    // web results
    if(gt == 'AFS' && google_ws_array && google_ads_array) {
        var ws_target_length = 10;
        if(google_ads_array.length < 5) {
            ws_target_length = 5;
        }
        else {
            ws_target_length = google_ads_array.length;
        }
        
        if(google_ws_array.length > ws_target_length) {
            google_ws_array = google_ws_array.slice(0, ws_target_length);
        }
    }
}

function get_rs_data(google_rs_array, rs_array, rs_target, rs_insert_pos, rs_target, token) {
    // def return data
    rs_return = new Array;

    // def temp data
    rs_data = new Array;

    var lpq = pq.replace(/&tk=[^&]*(?:&|$)/, '&');
    lpq = lpq.replace(/&$/, '');
    // alert((typeof pq) + pq + '\n' + (typeof lpq) + lpq);

    // prepare temp rs data
    // normal mode
    if(!rs_jsx_mode) {
        for (var i = 0; i < rs_array.length; i++) {
            rs_data[i] = new Object;
            rs_data[i].term = rs_array[i];
            rs_data[i].token = token;
            rs_data[i].href_url = lpq + '&aq=' + encodeURIComponent(rs_data[i].term) +
                                   '&tk=' + rs_data[i].token;
        }
    }
    // jsx mode
    else {
        for (var i = 0; i < rs_array.length; i++) {
            rs_data[i] = new Object;
            rs_data[i].Name = new Object;
            rs_data[i].Name.term = rs_array[i]['Name'];
            rs_data[i].Name.token = token;
            rs_data[i].Name.href_url = lpq + '&aq=' + encodeURIComponent(rs_data[i].Name.term) +
                                   '&tk=' + rs_data[i].Name.token;
            if(rs_array[i]['Cat'] && rs_array[i]['Cat'].length > 0) {
                rs_data[i].Cat = new Array;
                for ( var k = 0; k < rs_array[i]['Cat'].length; k++) {
                    rs_data[i].Cat[k] = new Object;
                    rs_data[i].Cat[k].term = rs_array[i]['Cat'][k];
                    rs_data[i].Cat[k].token = token;
                    rs_data[i].Cat[k].href_url = lpq + '&aq=' + encodeURIComponent(rs_data[i].Cat[k].term) +
                                           '&tk=' + rs_data[i].Cat[k].token;
                }
            }
        }
    }

    // insert google rs
    if (rs_insert_pos >= 0 && google_rs_array && google_rs_array.length > 0) {
        rs_start_data = rs_data.slice(0, rs_insert_pos);
        rs_end_data = rs_data.slice(rs_insert_pos);

        rs_return = rs_start_data;
        
        var google_rs_counter = 0;
        var rs_counter = rs_return.length;
        while (rs_return.length < rs_target && google_rs_counter < google_rs_array.length) {
            // normal mode
            if(!rs_jsx_mode) {
                rs_return[rs_counter] = google_rs_array[google_rs_counter++];
                rs_return[rs_counter].href_url = lpq + '&aq=' + encodeURIComponent(rs_return[rs_counter].term) +
                                                '&tk=' + rs_return[rs_counter].token;
            }
            // jsx mode
            else {
                rs_return[rs_counter] = new Object;
                rs_return[rs_counter].Name = google_rs_array[google_rs_counter++];
                // rs_return[rs_counter].Name.term = google_rs_array[google_rs_counter].term;
                // rs_return[rs_counter].Name.token = google_rs_array[google_rs_counter].token;
                rs_return[rs_counter].Name.href_url = lpq + '&aq=' + encodeURIComponent(rs_return[rs_counter].Name.term) +
                                                        '&tk=' + rs_return[rs_counter].Name.token;
                // google_rs_counter++;
            }
            rs_counter++;
        }
        
        if (rs_return.length < rs_target) {
            var rs_end_counter = 0;
            for(var i = rs_return.length; i < rs_target; i++) {
                rs_return[i] = rs_end_data[rs_end_counter++];
            }
        }
    }
    // nothing to insert
    else {
        rs_return = rs_data;
    }

    // if(test) {
    //     debug_write(rs_return, 'RS_RETURN');
    // }
    
    // return
    return rs_return;
}

