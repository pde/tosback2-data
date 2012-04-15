// text on thumb size
var SH=17;

function get(id)
{
    return document.getElementById(id);
}

function uok(src, offset)
{
    var o = document.getElementById("userpicture");
    if (!o)
        return;
    var tmp = new Image;
    tmp.src = src.src;
    var scaled = get_scaled_size(tmp.width, tmp.height, 75, 75, false);
    var rect = get_rect(scaled, 75, 75);
    var html = '<img style="margin: 0px 0px 0px 0px; position: absolute; clip: ' + css_rect(rect) + '" src="' + src.src + '" width="' + scaled[0] + '" height="' + scaled[1] + '" title="' + src.title + '" alt="' + src.alt + '"/>';
    o.style.left = Math.floor(5 + offset + (75 - scaled[0]) / 2) + 'px';
    o.style.top  = Math.floor(4 + offset + (75 - scaled[1]) / 2) + 'px';
    o.innerHTML  = html;
    o.parentNode.style.backgroundImage = 'url(' + ICO_BG + ')';
}

function uerror(src, offset)
{
    var o = document.getElementById("userpicture");
    if (!o)
        return;
    var html = '<img src="' + ICO_NO_PHOTO + '" width="67" height="75" alt="' + src.alt + '" title="' + src.title + '"/>';
    o.style.left = (5 + offset + (75 - 67) / 2) + 'px';
    o.style.top  = (4 + offset) + 'px';
    o.innerHTML  = html;
    o.parentNode.style.backgroundImage = 'url(' + ICO_BG + ')';
}

function quote_html(html)
{
    var ret = '';
    for (var i = 0; i < html.length; i++)
    {
        var c = html.charAt(i);
        switch (c)
        {
            case '>':
                ret += '&gt;';
                break;
            case '<':
                ret += '&lt;';
                break;
            case '"':
                ret += '&quot;';
                break;
            case '&':
                ret += '&amp;';
                break;
            default:
                ret += c;
        }
    }
    return ret;
}

function get_cookie(name) 
{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

function set_cookie(name, value, days, domain)
{
  if (days)
  {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  }
  else 
    var expires = "";
  var cstr = name + "=" + value + expires + "; path=/";
  if (domain)
    cstr += '; domain=' + domain;
  document.cookie = cstr;
}

function highlight(field) 
{
  field.focus();
  field.select();
}

function jsstring(src)
{
    var ret = '';
    for (var i = 0; i < src.length; i++)
    {
        var c = src.charAt(i);
        switch (c)
        {
            case '\'':
                ret += '\\\'';
                break;
            case '"':
                ret += '\\"';
                break;
            case '\\':
                ret += '\\\\';
                break;
            default:
                ret += c;
        }
    }
    return ret;
}

function get_rect(dim, max_width, max_height)
{
    var browser_offset = 0;
    var offset = 0;
    return [0, offset + max_width, max_height - browser_offset, offset, offset];
}

function css_rect(rect)
{
    return 'rect(' + rect[0] + 'px,' + rect[1] + 'px,' + rect[2] + 'px,' + rect[3] + 'px)';
}

function image_details_url(user, server, filename, tagname)
{
    // Redirect to LP
    /*
    var ret = '/user/' + user + '/images/detail/#';
    if(tagname && tagname != '')
    {
        ret += 'tag/' + tagname + '/';
    } 
    ret += server + '/' + filename;
    */
    var ret = 'http://img'+server+'.imageshack.us/i/'+filename+'/';
    return ret;
}

function slideshow_details_url(user, id, tagname)
{
    // Redirect to slideshow page
    /*
    var ret = '/user/' + user + '/slideshows/detail/#';
    if(tagname && tagname != '')
    {
        ret += 'tag/' + tagname + '/';
    } 
    ret += id;
    */
    var temp = id.split("/");
    var ret = 'http://'+temp[0]+'.imageshack.us/slideshow/player.php?id='+id;    
    return ret;
}

function thumb_url(srv, bucket, thumbname, direct)
{
    var id = srv + '/' + bucket + '/' + thumbname . replace(/\.th\.mp4$/, ".mp4.th.jpg");
    if (direct)
        return 'http://img' + srv + '.imageshack.us/img' + id;
    return 'http://' + cache_host(id) + '/img' + id;
    // For now user a.imageshack.us instead of cach hosts
    //return 'http://a.imageshack.us/img' + id;
}

function thumb_url_desmond(srv, bucket, thumbname, direct)
{
//    var fn = thumbname . replace(/\.mp4$/, ".mp4.th.jpg");
    var fn = thumbname;
//  if (direct) {
//        var id = srv + '/' + bucket + '/' + fn;
//        return 'http://a.imageshack.us/img' + id;
//  }
    id = srv + '/scaled.php?server=' + srv + '&filename=' + fn + '&res=crop';
    return 'http://desmond.imageshack.us/Himg' + id;
}

function get_scaled_size(width, height, max_width, max_height, crop)
{
    if (width <= max_width && height <= max_height && !crop)
        return [width, height];

    if (crop)
    {
        max_width  += SH;
        max_height += SH;
    }
    height *= 1.0;
    width  *= 1.0;
    k = crop ? Math.max(max_width/width, max_height/height) : Math.min(max_width/width, max_height/height);;
    w = Math.floor(width * k);
    h = Math.floor(height * k);
    if (w == 0)
        w = 1;
    if (h == 0)
        h = 1;
    return [w, h];
}

function noimage_url()
{
    return 'http://www.imageshack.us/common/images/thumbnail.gif';
}

function pdflogo()
{
    return 'http://www.imageshack.us/common/images/pdf.gif';
}


function list_url(user, tagname)
{
    var ret = '/user/' + user + '/images';
    if (tagname != '')
        ret += '/tag/' + encodeURIComponent(tagname);
    return ret;
}

function slideshow_list_url(user, tagname)
{
    var ret = '/user/' + user + '/slideshows';
    if (tagname != '')
        ret += '/tag/' + encodeURIComponent(tagname);
    return ret;
}

function scaled_image_url(server, filename)
{
    var id = '' + server + '/scaled.php?server=' + server + '&filename=' + filename + '&xsize=640&ysize=480';
    return 'http://' + cache_host(id) + '/Himg' + id;
}

function show_links()
{
    var c = get_cookie('myimages');
    var is_user = c && c.length > 0;

    var o = get('hmyshows');
    if (o)
        o.innerHTML = 
            is_user ? 
            "| <a class=\"menu\" href=\"http://my.imageshack.us/slideshow/my_shows.php\" onClick=\"pageTracker._trackEvent('header-click','old-header-slideshows');\">Slideshows</a> " :
            "";
    var o = get('hmyimages');
    if (o)
        o.innerHTML = 
            is_user ? 
            "| <a class=\"menu\" href=\"" + myimages_url() + "\" onClick=\"pageTracker._trackEvent('header-click','old-header-myimages');\">My Images</a> " :
            "| <a class=\"menu\" href=\"http://my.imageshack.us/registration\" onClick=\"pageTracker._trackEvent('header-click','old-header-myimages');\">My Images</a> ";
    var o = get('hmyvideos');
    if (o)
        o.innerHTML = 
            is_user ? 
            "| <a class=\"menu\" href=\"http://my.imageshack.us/video/my_videos.php\" onClick=\"pageTracker._trackEvent('header-click','old-header-videos');\">Videos</a> " :
            "";
    var o = get('hmyfriends');
    if (o)
        o.style.display = is_user ? 'inline' : 'none';
    var o = get('hmyprefs');
    if (o)
        o.innerHTML = 
            is_user ? 
            "| <a class=\"menu\" href=\"http://profile.imageshack.us/prefs/index.php\" onClick=\"pageTracker._trackEvent('header-click','old-header-preferences');\">Preferences</a> " :
            "";
}

function trim(src, length)
{
    if (!src)
        return '';
    if (src.length <= length)
        return src;
    return src.substring(0, length - 2) + '..';
}

function make_nav(navscript, page, start_page, end_page, numpages, prefix, navbarprefix)
{
    var html = '<table border="0"><tr><td>';

    if (prev)
        html+= "<a class=\"ser\" href=\"javascript:" + navscript + "(1)\"><img src=\"" + ICO_FIRST + "\" valign=\"middle\" alt=\"First\" title=\"First\"/></a>\n";
    else
        html += "<img src=\"" + ICO_FIRSTD + "\" alt=\"First\" title=\"First\"/></td>";
    html += '</td><td style="padding-left:20px;">';
    if (prev)
        html += "<a class=\"ser\" href=\"javascript:" + navscript + "(" + (page - 1) + ")\"><img src=\"" + ICO_PREV + "\" alt=\"Previous\" title=\"Previous\"/></a>\n";
    else
        html += "<img src=\"" + ICO_PREVD + "\" alt=\"Previous\" title=\"Previous\"/>\n";
    html += '</td><td style="width:250px;text-align:center;padding-left:20px;padding-right:20px;">';

    for (var i = start_page; i <= end_page; i++)
    {
        if (page == i)
            html += "<b>" + i + "</b>&nbsp;&nbsp;";
        else
            html += "<a class=\"ser\" href=\"javascript:" + navscript + "(" + i + ")\">" + i + "</a>&nbsp;&nbsp;";
    }
    html += '</td><td>';

    if (next)
        html += "<a class=\"ser\" href=\"javascript:" + navscript + "(" + (page + 1) + ")\"><img src=\"" + ICO_NEXT + "\" alt=\"Next\" title=\"Next\"/></a>\n";
    else
        html += "<img src=\"" + ICO_NEXTD + "\" alt=\"Next\" title=\"Next\"/>\n";
    html += '</td><td style="padding-left:20px;">';
    if (next)
        html += "<a class=\"ser\" href=\"javascript:" + navscript + "(" + numpages + ")\"><img src=\"" + ICO_LAST + "\" alt=\"Last\" title=\"Last\"/></a>\n";
    else
        html += "<img src=\"" + ICO_LASTD + "\" alt=\"Last\" title=\"Last\"/>";
    html += '</td></tr><tr><td colspan="5">';

    if (navbarprefix)
    {
        html+= '<a href="javascript:void(0)" class=\"ser\" onclick="if (valid_page(\'' + prefix + '\',\'' + navbarprefix + '\')) ' + navscript + '(parseInt(get(\'' + navbarprefix + prefix + 'pageno\').value, 10)); return false;">Go to page # </a>';
        html+= '&nbsp;<input type="text" id="' + navbarprefix + prefix + 'pageno" style="width: 20px;" onkeydown="if(event.keyCode==13) if (valid_page(\'' + prefix + '\',\'' + navbarprefix + '\')) ' + navscript + '(parseInt(this.value, 10))"/> of ' + numpages;
    }
    else
    {
        html+= '<a href="javascript:void(0)" class=\"ser\" onclick="if (valid_page(\'' + prefix + '\')) ' + navscript + '(parseInt(get(\'' + prefix + 'pageno\').value, 10)); return false;">Go to page # </a>';
        html+= '&nbsp;<input type="text" id="' + prefix + 'pageno" style="width: 20px;" onkeydown="if(event.keyCode==13) if (valid_page(\'' + prefix + '\')) ' + navscript + '(parseInt(this.value, 10))"/> of ' + numpages;
    }
    html += '</td></tr></table>';
    return html;
}

function set_loading(holderid)
{
    var o = get(holderid);
    if (!o)
        return;
    o.innerHTML = '<div style="width: 100%; height: 100%; text-align: center; vertical-align: middle;"><img src="' + ICO_LOADING + '" width="56" height="16" alt="Loading" title="Loading"/></div>';
}

function homepage_url(user)
{
    return 'http://profile.imageshack.us/user/' + user;
}

function base_name(name)
{
    var pos = name.lastIndexOf('.');
    if (pos == -1)
        return name;
    return name.substr(0, pos);
}

function thumb_name(name)
{
    var pos = name.lastIndexOf('.');
    if (pos == -1)
        return '';
    return name.substr(0, pos) + '.th' + name.substr(pos);
}

function list_hosts()
{
    var hosts = get('img_cache_hosts').value;
    var ret = new Array();
    var pos;
    while ((pos = hosts.indexOf(',')) >= 0)
    {
        ret[ret.length] = hosts.substring(0, pos);
        hosts = hosts.substring(pos + 1);
    }
    if (hosts.length > 0)
        ret[ret.length] = hosts;
    return ret;
}

function cache_host(id)
{
    var hosts = list_hosts();
    var hash = 0;
    for (var i = 0; i < id.length; i++)
        hash ^= id.charCodeAt(i);
    return hosts[hash % hosts.length];
}

function iurl(id, root)
{
    if (typeof USE_IMAGE_CACHE=='undefined' || !USE_IMAGE_CACHE)
    {
        if (!root)
            return '/images/' + id;
        else
            return root + '/' + id;
    }
    // return 'http://imgcash.imageshack.us/common/images/' + id;
    return 'http://imageshack.us/common/images/' + id;
}

function myimages_url()
{
    return 'http://my.imageshack.us/v_images.php';
}

function lightencode(s)
{
    return s.replace('?', '%3F').replace('&', '%26');
}

function is_swf(href)
{
    if (href.length < 3)
        return false;
    var ext = href.substr(href.length  - 3);
    return ext == 'swf';
}

function is_pdf(href)
{
    if (href.length < 3)
        return false;
    var ext = href.substr(href.length  - 3);
    return ext == 'pdf';
}

