// Copyright 2011: Thomson Reuters Global Resources. All Rights Reserved. Proprietary and Confidential information of TRGR.  Disclosure, Use or Reproduction without the written authorization of TRGR is prohibited
$(document).ready(function()
{
    // Make sure that we structure direct links into westlaw correctly.  When the content editors
    // cut and paste the links along with a document, they target web2 and they don't have our
    // access method attached.  So, we swap the "web2" part with "www" and add the access method.
    $('a[href*="web2.westlaw.com"]').each(function()
    {
        // Get the unformatted url and break out the web2 part.
        var urlParts = $(this).attr("href").split('web2');

        // Verify that the split worked as expected.
        if (urlParts.length == 2)
        {
            // Swap out the old href with the new properly formatted one.
            $(this).attr("href", urlParts[0] + "www" + urlParts[1] + "&ctam=PW");
        }
    });

    $('a').live('click', function(e)
    {
        // "live" binds to left, right and middle mouse clicks - check here to
        // execute left-clicks only.
        if (e.button == 0)
        {
            var linkUrl = this.href;
            if (linkUrl != null && linkUrl.length > 0)
            {
                // check for NON-WL Today links
                linkUrl = linkUrl.toLowerCase();
                var host = window.location.host.toLowerCase();
                if ((linkUrl.indexOf(host) == -1 || linkUrl.indexOf("linkout.aspx") > 0) &&
    					linkUrl.indexOf('http') == 0)
                {
                    var frameName = "_blank";
                    if (linkUrl.indexOf("linkout.aspx") > 0)
                    {
                        frameName = '_blankWestlawFrame';

                        if (this.href.indexOf("&site") == -1)
                        {
                            this.href += "&site=" + siteDirectory + "&productcheck=yes&trniproductsource=web";
                        }
                    }

                    window.open(this.href, frameName);
                    e.stopPropagation();
                    return false;
                }
            }
        }
    });
});

function AddBookmark() {
    var title = document.title, url = window.location.href;
    if (window.sidebar) // firefox
        window.sidebar.addPanel(title, url, "");
    else if (window.opera && window.print) { // opera
        var elem = document.createElement('a');
        elem.setAttribute('href', url);
        elem.setAttribute('title', title);
        elem.setAttribute('rel', 'sidebar');
        elem.click();
    }
    else if (document.all)// ie
        window.external.AddFavorite(url, title);
}

// create a print preview popup centered on the page
function OpenPopup(url) {
    var width = 710;
    var height = 500;
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;
    var params = 'width=' + width + ', height=' + height;
    params += ', top=' + top + ', left=' + left;
    params += ', directories=no';
    params += ', location=no';
    params += ', menubar=yes';
    params += ', resizable=yes';
    params += ', scrollbars=yes';
    params += ', status=no';
    params += ', toolbar=no';
    newwin = window.open(url, 'westlawTodayPopup', params);
    if (window.focus) {
        newwin.focus()
    }
    return false;
}

function createCookie(name, value, days)
{
    var expires;
    if (days)
    {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name)
{
    createCookie(name, "", -1);
}

function AreCookiesEnabled()
{
    var r = false;
    createCookie("testing", "Hello", 1);
    if (readCookie("testing") != null)
    {
        r = true;
        eraseCookie("testing");
    }
    return r;
}
