function LoadSponsoredHeadlines(arrHL) {
    var j = 0;
    var count = 0;
  
    // Assign randoms.
    for (var i = 0; i < arrHL.Headlines.length; i++) {
        var intRandNum = Math.floor(Math.random() * 30);
        arrHL.Headlines[i].RandNum = intRandNum;
    }
    arrHL.Headlines.sort(NumSort);
    var dvSponsorTop = jQuery('div.sponsors[data-count]');
   
    if (dvSponsorTop.length > 0) {
        for (var i = 0; i < dvSponsorTop.length; i++) {
            try {
                count += parseInt(dvSponsorTop[i].attributes["data-count"].value);
            }
            catch (ex) { count += 5; }
            for (; (j < count) && (arrHL.Headlines.length > j); j++) {
                dvSponsorTop[i].innerHTML += "<li><a class=\"sponsors_link\" onClick='javascript:pageTracker._trackPageview(\"/ext_jump/sponsors/" + arrHL.Headlines[j].SponsorName + "\");' href=\"" + arrHL.Headlines[j].URL + "\" >" + arrHL.Headlines[j].Headline + "</a></li>";
            }
        }
    }
    function NumSort(a, b) {
        return b.RandNum - a.RandNum;  // descending
    }
}

function AjaxFailed(result) {
    if (result.status == 200) {
        var o = eval('(' + result.responseText + ')');
        LoadSponsoredHeadlines(o);
    }
}

function LoadArticles() {
    jQuery.ajax({
        url: '/cmspages/newsmax/handlers/sponsoredheadline.ashx',
        success: function(result) {
            LoadSponsoredHeadlines(result);
        },
        error: AjaxFailed
    });
}

jQuery(document).ready(function($) {
    LoadArticles();
});
