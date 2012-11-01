function display_rs(rs_data) {
    var lpq = pq.replace(/&tk=[^&]*(?:&|$)/, '&');
    lpq = lpq.replace(/&$/, '');
    var rs_str = '';
    var top_rs_str = '';
    var total_rs = rs_data.length;

    for (var i = 0; i < total_rs; i++) {
        if (i < total_rs - 2) {
            var truncated = false;
            var rs_display = '';
            rs_term_words = rs_data[i].term.split(" ");

            // truncate words larger than 15 chars
            for (var k = 0; k < rs_term_words.length; k++) {
                if (rs_term_words[k].length > 15) {
                    rs_display += rs_term_words[k].substr(0,15) + '...';
                    truncated = true;
                    break;
                } else {
                    rs_display += rs_term_words[k] + ' ';
                }
            }
            if (!truncated) {
                rs_display = rs_display.substr(0, rs_display.length - 1);
            }

            rs_str += '<a href="' + rs_data[i].href_url + '" title="' + rs_data[i].term + '">' + rs_display + '</a><br>';
            if(i % 3 == 0 && i != 0) {
                rs_str += '<br><br>'; 
            }
        } else {
            if (typeof(custom_top_rs[2 - (total_rs - i)]) != 'undefined') {
                var rs_link = lpq + '&aq=' + encodeURIComponent(custom_top_rs[2 - (total_rs - i)]) + '&tk=' + token;
                rs_display = custom_top_rs[2 - (total_rs - i)];
            } else {
                var rs_link = rs_data[i].href_url;
                rs_display = rs_data[i].term;
            }
            top_rs_str += '<td nowrap="nowrap"><a href="' + rs_link + '" title="' + rs_display + '">' + rs_display + '</a></td>';
        }
    }
    document.getElementById('top_rs_container').innerHTML = '<table border="0" cellspacing="0" cellpadding="0"><tr><td nowrap="nowrap">'+language_related_searches+'</td>' + top_rs_str + '</tr></table>';
    document.getElementById('rs_container').innerHTML = rs_str;
}

function set_sb_tokens() {
    if(token) {
        document.forms.frm_search.ltk.value = token;
    }
    if(search_token) {
        document.forms.frm_search.stk.value = search_token;
    }
}

function display_portal(pq, pc_array) {
    var lpq = pq.replace(/&tk=[^&]*(?:&|$)/, '&');
    lpq = lpq.replace(/&$/, '');
    
    // popular categories
    var pc_string = '<table cellspacing="0" cellpadding="0" border="0" width="100%">';
    for (var i = 0; i < max_links; i++) {
        var pc_href = lpq + '&aq=' + encodeURIComponent(pc_array[i]) + '&tk=' + token;
        var truncated = false;
        var pc_display = '';
        pc_term_words = pc_array[i].split(" ");

        // truncate words larger than 18 chars
        for (var k = 0; k < pc_term_words.length; k++) {
            if (pc_term_words[k].length > 18) {
                pc_display += pc_term_words[k].substr(0,17) + '...';
                truncated = true;
                break;
            } else {
                pc_display += pc_term_words[k] + ' ';
            }
        }
        if (!truncated) {
            pc_display = pc_display.substr(0, pc_display.length - 1);
        }

        if ((i % 3) == 0) {
            pc_string += '<tr>';
            if ((i + 3) > max_links) {
                for (var j = 0; j < (3 - (max_links % 3)); j++) {
                    pc_string += '<td class="no_borderl">&nbsp;</td>';
                }
            }
        }

        pc_string += '<td width="33%"><a href="' + pc_href + '" title="' + pc_array[i] + '">' + pc_display + '</a></td>';
        
        if ((i + 1) % 3 == 0) {
            pc_string += '</tr>';
        }
    }
    pc_string += '</table>';

    // display
    document.getElementById("pc_container").innerHTML  = pc_string;
    document.getElementById("portal").style.display = 'block';
}

function display_content() {
    // display rs
    display_rs(rs_data);

    // set tokens for SB
    set_sb_tokens();

    // ads
    if(!force_portal) {
        display_oneclick();
    }
    // portal
    else {
        display_portal(pq, pc_array);
    }
}

// content display call
display_content();