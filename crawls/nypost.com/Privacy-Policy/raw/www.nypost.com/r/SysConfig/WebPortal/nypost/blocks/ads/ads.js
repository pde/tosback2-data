var ord       = 1000000000 + Math.floor(Math.random()*900000000);
var testads   = window.location.href.toString().match("testadpage") ? "1" : "0";
if (testads == 1) {
   var sitezone  = "post.testads/" + (sitezone == "" ? "general" : sitezone);
} else {
   var sitezone  = "post." + (sitezone == "" ? "general" : sitezone);
}
var kws       = (kws == undefined || kws == "" ? [] : kws.split(','));
var kvs       = (kvs == undefined || kvs == "" ? [] : kvs.split(','));
var adexc     = (adexc == undefined || adexc == "" ? [] : adexc.split(','));
var tile      = 0;
var popup     = document.referrer.toString().match("www.yahoo.com") ? "0" : "1";
var referrer  = document.referrer.toString();
referrer = referrer.replace(/http(s)*:\/\//g, "");
referrer = referrer.replace(/\.(com|net|edu|gov|org)+.*?$/g, "");
referrer = referrer.replace(/^.*?\./g, "");


function ad_tag(pos,sz,admode,dcopt,custom_params){
  //console.log(sitezone);
  //if(sitezone != "post.general" && sitezone != "post.news/home" && sitezone != "post.pagesix/home" && sitezone != "post.entertainment/home" &&  sitezone != "post.homepage" && sitezone !="post.sports/home"){ return; }
    
  switch(admode){
     case "script":
       ad  = "<script type='text/javascript' src='";
       ad += "http://ad.doubleclick.net/adj/"+sitezone+";";
       ad += "pos="+pos+";";
       ad += "ref="+referrer+";";       
       ad += "popup="+popup+";";
       ad += crtg_content;       
       if (custom_params.length > 0) {
          ad += custom_params+";";
       }
       for( var kv in kvs ){ ad += kvs[kv]+";"; }
       for( var kw in kws ){ ad += "kw="+kws[kw]+";"; }
       for( var exc in adexc ){ ad += "!c="+adexc[exc]+";"; }       
       if((tile==0) && (dcopt!="false")){ ad += "dcopt=ist;" }
       ad += "sz="+sz+";";
       ad += "tile="+(++tile)+";";
       ad += "ord="+ord+"?";
       ad += "'></script>";
       document.write(ad);
       break;
     case "iframe":
       ad  = "<iframe class='adframe' frameborder='0' scrolling='no' src='";
       ad += "http://ad.doubleclick.net/adi/"+sitezone+";";
       ad += "pos="+pos+";";
       ad += "popup="+popup+";";
       for( var kv in kvs ){ ad += escape(kvs[kv])+";"; }       
       for( var kw in kws ){ ad += "kw="+escape(kws[kw])+";"; }
       for( var exc in adexc ){ ad += "!c="+escape(adexc[exc])+";"; }
       if((tile==0) && (dcopt!="false")){ ad += "dcopt=ist;" }
       ad += "sz="+sz+";";
       ad += "tile="+(++tile)+";";
       ad += "ord="+ord+"?";
       ad += "'></iframe>";
       
       section_class = "#fat_header #section_"+pos.split('_')[2];    
       $(section_class+' .ad.wrap.fh_rollover_sponsorship .ad.fh_rollover_sponsorship').html(ad);
       break;
  }
  return ad;
}