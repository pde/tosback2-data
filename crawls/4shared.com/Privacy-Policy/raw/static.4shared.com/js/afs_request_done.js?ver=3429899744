function afs_request_done(aff_ads){
    var aff_num_ads = aff_ads.length;
    adsShown=aff_num_ads;
    setTimeout('sendSearchStats()',50);
    if (aff_num_ads <= 0){
        return;
    }
    var wideAds = "";
    var narrowAds = "";
    for(i = 0; i < aff_num_ads; i++){
        if (aff_ads[i].type=="text/wide"){
            wideAds+='<a style="text-decoration:none" onmouseover="window.status=\'' +
                    aff_ads[i].visible_url + '\';return true;" ' +
                    'onmouseout="window.status=\'\';return true;" ' +
                    'href="' + aff_ads[i].url + '">' +
                    '<span class="ad_line1">' + aff_ads[i].title + '</span></a><br>' +
                    '<span class="ad_text"><a onmouseover="window.status=\'' +
                    aff_ads[i].visible_url + '\';return true;" ' +
                    'onmouseout="window.status=\'\';return true;" ' +
                    'href="' + aff_ads[i].url + '">' + aff_ads[i].description + '</a></span><br>'+
                    '<a style="text-decoration:none" onmouseover="window.status=\'' +
                    aff_ads[i].visible_url + '\';return true;" ' +
                    'onmouseout="window.status=\'\';return true;" ' +
                    'href="' + aff_ads[i].url + '">' +
                    '<span class="ad_url">' + aff_ads[i].visible_url + '</span><br><br></a>';
        }

        else
        {
            narrowAds+='<a style="text-decoration:none" onmouseover="window.status=\'' +
                    aff_ads[i].visible_url + '\';return true;" ' +
                    'onmouseout="window.status=\'\';return true;" ' +
                    'href="' + aff_ads[i].url + '">' +
                    '<span class="ad_line1">' + aff_ads[i].title + '</span></a><br>' +
                    '<span class="ad_text"><a onmouseover="window.status=\'' +
                    aff_ads[i].visible_url + '\';return true;" ' +
                    'onmouseout="window.status=\'\';return true;" ' +
                    'href="' + aff_ads[i].url + '">' + aff_ads[i].description + '</a></span><br>'+
                    '<a style="text-decoration:none" onmouseover="window.status=\'' +
                    aff_ads[i].visible_url + '\';return true;" ' +
                    'onmouseout="window.status=\'\';return true;" ' +
                    'href="' + aff_ads[i].url + '">' +

                    '<span class="ad_url">' + aff_ads[i].visible_url + '</span><br><br></a>';
        }
    }

    // Write HTML for wide and narrow ads to the proper <div> elements
  if(document.getElementById("aSFDiv_wide")!=null){
    document.getElementById("aSFDiv_wide").innerHTML = wideAds;
  }
  if(document.getElementById("aSFDiv_narrow")!=null && false){
    document.getElementById("aSFDiv_narrow").innerHTML = narrowAds;
  }

}
