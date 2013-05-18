
function google_ad_request_done(google_ads){var s='',i,len,clickable_background=0,google_attribution='<div><a style="text-decoration:none" href="https://www.google.com/adsense/support/bin/request.py?contact=abg_afc&gl=US&hideleadgen=1">Ads by Google</span></a></div>',title_span='',description_span='<span class="description">',url_style=' <span class="url">';if(google_ads.length==0)return;if(google_ads[0].type=="html"){s+=google_ads[0].snippet;}
if(google_ads[0].type=="text"){if(isCommentAdvertRenderig()){s+='<div class="attribution wocc link-wox cnr5"><span class="tr"></span><span class="tl"></span>'+
google_attribution+'</div><div class="adsContainer cleared commentAdvertContainer">';}
else
{s+='<div class="attribution wocc link-wox cnr5"><span class="tr"></span><span class="tl"></span>'+
google_attribution+'</div><div class="adsContainer cleared">';}
if(google_ads.length==1){title_span='<span class="title">';description_span='<span class="description">';}
console.log("Comments: ",google_ad_type_location)
if(isCommentAdvertRenderig()){s+='<div class="commentAdvert">'}
for(i=0,len=google_ads.length;i<len;++i){s+='<div class="adsContent"><a href="'+google_ads[i].url+'" '+'onmouseout="window.status=\'\'" '+'onmouseover="window.status=\'go to '+
google_ads[i].visible_url+'\';return true;" '+'class="title">'+
title_span+
google_ads[i].line1+'</span>'+
url_style+
google_ads[i].visible_url+'</span>';if(clickable_background==0){s+='</a>';}
s+=description_span+
google_ads[i].line2+' '+
google_ads[i].line3+'</span>';if(clickable_background==1){s+='</a>';}
s+='</div>'
if(isCommentAdvertRenderig()&&(i+1)==Math.ceil(google_ads.length/2)){s+='</div>'
s+='<div class="commentAdvert secondCommentAdvertColumn">'}}
if(isCommentAdvertRenderig()){s+='</div>'}
s+='</div>';}
document.write(s);return;}
function GetParam(name){var match=new RegExp(name+"=([^&]+)","i").exec(location.search);return(match)?match[1]:null;}
function isCommentAdvertRenderig(){return google_ad_type_location=="comments";}
function google_afs_request_done(google_ads){var len=google_ads.length,i;if(len<=0){return;}
var wideAds="",narrowAds="";for(i=0;i<len;i++){console.log('>>>>>>',google_ads[i].type);if(google_ads[i].type=="text/wide"){wideAds+='<a style="text-decoration:none" onmouseover="javascript:window.status=\''+
google_ads[i].url+'\';return true;" '+'onmouseout="javascript:window.status=\'\';return true;" '+'href="'+google_ads[i].url+'">'+'<span class="ad_line1">11111'+google_ads[i].line1+'</span></a><br>'+'<span class="ad_text">'+google_ads[i].line2+'</span><br>'+'<a style="text-decoration:none" onmouseover="javascript:window.status=\''+
google_ads[i].url+'\';return true;" '+'onmouseout="javascript:window.status=\'\';return true;" '+'href="'+google_ads[i].url+'">'+'<span class="ad_url">'+google_ads[i].visible_url+'</span><br><br></a>';}
else{narrowAds+='<div class="google-ad"><a class="ad_line1" onmouseover="javascript:window.status=\''+
google_ads[i].url+'\';return true;" '+'onmouseout="javascript:window.status=\'\';return true;" '+'href="'+google_ads[i].url+'">'+
google_ads[i].line1+'</a><br>'+'<span class="ad_text">222'+google_ads[i].line2+'</span><br>'+'<span class="ad_text">'+google_ads[i].line3+'</span><br>'+'<a class="ad_url" onmouseover="javascript:window.status=\''+
google_ads[i].url+'\';return true;" '+'onmouseout="javascript:window.status=\'\';return true;" '+'href="'+google_ads[i].url+'">'+
google_ads[i].visible_url+'</a></div>';}}
if(narrowAds!=""){narrowAds='<div class="attribution wocc link-wox cnr5"><a style="text-decoration:none" '+'href="https://www.google.com/adsense/support/bin/request.py?contact=abg_afc&gl=US&hideleadgen=1">'+'<span class="tr"></span><span class="tl"></span>'+'<span class="ad_header" style="text-align:left">Ads by Google</span></a></div>'+narrowAds;document.getElementById("narrow_ad_unit").innerHTML=narrowAds;}
if(wideAds!=""){wideAds='<a style="text-decoration:none" '+'href="https://www.google.com/adsense/support/bin/request.py?contact=abg_afc&gl=US&hideleadgen=1">'+'<span class="ad_header" style="text-align:left">Ads by Google</span><br><br></a>'+wideAds;document.getElementById("wide_ad_unit").innerHTML=wideAds;}}