wpniSite = 'wpni';
wpniDomain = 'washingtonpost.com';
show_doubleclick_ad = true;
rssString = "fromrss=y";
tileThatGetsDcopt = 1;
hourScope = 24;
numPop = 5;
//this declares what kinds of ads are on this site

//18640
if(location.search.match('test_ads=homepagesyncred')){
  var dfpcomp="254077360";
}

//sponsored advertiser links
if( !urlCheck('no_ads') && (typeof wpAds === 'undefined' || !wpAds.textlinks) ){
    //wpniAds.addScript('http://media.washingtonpost.com/wp-srv/ad/tiffany_manager.js');
    wpniAds.addScript("http://js.washingtonpost.com/wp-srv/ad/textlink_driver.js");
}


//wpniAds.wp_meta_exists = typeof wp_meta_data != 'undefined' ? true : false;
wp_meta_data = typeof wp_meta_data != 'undefined' ? wp_meta_data : {};

/*wpniAds.meta_kv = (wpniAds.wp_meta_exists)?{
    meta_data : {
        ct : wp_meta_data.contentType,
        author : wp_meta_data.author,
        ht : wp_meta_data.hot_topic,
        bn : wp_meta_data.breaking_news
    },
    exec : function(){
        var key, rv='';
        for(key in this.meta_data){
            if(typeof this.meta_data[key] != 'undefined'){
                rv += key+'='+charToCodeAt(String(this.meta_data[key]).toLowerCase())+';'
            }
        }
        return rv;
    }
}:'';*/

wpniAds.contentType = {
    AudioStory:"audio",
    BlogStory:"blog",
    front:"front",
    GraphicStory:"graphic",
    MediaGallery:"photo",
    PanoStory:"pano",
    UGCPhotoStory:"ugc",
    VideoStory:"video"
}


wpniAds.zoneBuilder = {
    name:function(){
        return typeof wp_meta_data.contentName!='undefined' ? '/' + this.valid() + wp_meta_data.contentName : '';
    },
    valid:function(){
        return (wp_meta_data.contentName[0].charAt(0).match(/[^a-z]/gi))?'c':'';
    },
    exec:function(){
        var a = wp_meta_data.contentType;
        a = typeof wpniAds.contentType[a]!='undefined' && commercialNode!=='washingtonpost.com' ? commercialNode+'/'+wpniAds.contentType[a] : typeof commercialNode != 'undefined' ? commercialNode : '';
        a = a.replace(/\s*/g,"");
        return a + this.name();
    }
};
commercialNode=wpniAds.zoneBuilder.exec();

//function to write the stylesheet for google textlinks:
wpniAds.addCSS = function(arg){
    if(typeof exists=='undefined' || !exists){
        var a = document.createElement('link');a.href = 'http://css.wpdigital.net'+arg;a.rel = 'stylesheet';a.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(a);
        exists = true;
    }
    return true;
};

//12780-JB
/*if (typeof wp_quantcast !== 'undefined') {
    wp_quantcast.exec('p-5cYn7dCzvaeyA');
}*/

wpniAds.templates.initRule('defaultTemplate');
wpniAds.templates.rules.defaultTemplate.what = new Array('!336x35','!336x30','!bigad','!leaderboard_2','!extra_bb','!featurebar','!tiffany_tile','!tiffany_tile_2','!336x60','!pushdown','!sponsor','!sponsor_realtor','!deal','!marketing','!nav_tile','!nn','!nn_hp','!nn_sidebar','!nn_footer','!nn_rr','!promo','!sponsor_prem_rental','!tooltile','!agoogleaday','!300x100', '!88x31','!600x130', '!336x35_top');

if(!location.href.match('suppress_fb'))
{

wpniAds.templates.initRule('homepage');
wpniAds.templates.rules.homepage.what = new Array('!leaderboard');
wpniAds.templates.rules.homepage.where = new Array('washingtonpost.com');

//10758-HS
wpniAds.templates.initRule('trulia');
wpniAds.templates.rules.trulia.what = new Array('bigbox');
wpniAds.templates.rules.trulia.where = new Array('trulia');

wpniAds.templates.initRule('jobs');
wpniAds.templates.rules.jobs.what = new Array('336x60');
wpniAds.templates.rules.jobs.where = new Array('jobs');

wpniAds.templates.initRule('local_page');
wpniAds.templates.rules.local_page.what = new Array('!leaderboard','!sponsor');
wpniAds.templates.rules.local_page.where = new Array('^metro/front$');

wpniAds.templates.initRule('realestate');
wpniAds.templates.rules.realestate.what = new Array('sponsor_community','sponsor_new_home_builder');
wpniAds.templates.rules.realestate.where = new Array('realestate/front')

wpniAds.templates.initRule('rentals');
wpniAds.templates.rules.rentals.what = new Array('sponsor_rental','sponsor_prem_rental');
wpniAds.templates.rules.rentals.where = new Array('rentals')

wpniAds.templates.initRule('liveonlineflex');
wpniAds.templates.rules.liveonlineflex.what = new Array('!flex_ss_bb_hp');
wpniAds.templates.rules.liveonlineflex.where = new Array('multimedia/livevideo')


//18182-AL-235419621
wpniAds.templates.initRule('lf336');
wpniAds.templates.rules.lf336 = {
    what : ['336x35_top'],
    where : ['realestate/front'],
    when : ['201201010000/201212312359']
}

wpniAds.templates.initRule('capdish');
wpniAds.templates.rules.capdish = {
    what : ['deal'],
    where : ['metro/front','cityguide'],
    when : [''],
    hardcodes : '<sc'+'ript type="text/javascript">\
        (function(){\
            var a = {"metro":"11","artsandliving/foodanddining":"12","cityguide":"13","cityguide/restaurants":"14","cityguide/bars":"15","cityguide/movies":"16","cityguide/events":"17","cityguide/music":"18","cityguide/museums":"19","cityguide/theater":"20","cityguide/bestbets":"21","cityguide/kidfriendly":"22","cityguide/visitors":"23"};\
            if(typeof commercialNode!="undefined" && a[commercialNode]){\
                document.write(\'<sc\'+\'ript type="text/javascript" src="http://files.secondstreetmedia.com/washingtonpost/widget\'+a[commercialNode]+\'.js"></sc\'+\'ript>\');\
            }\
        }())\
    </scr'+'ipt>'
}

wpniAds.templates.initRule('capdish2');
wpniAds.templates.rules.capdish2 = {
    what : ['336x60'],
    where : (function(){
        //hack for bug #16535 - both using 336x60 spot - this is preempt, so we need to free up the spot on the local front
        return (typeof estNowWithYear != 'undefined' && estNowWithYear <= '201108082359' ? ['lifestyle/food/front'] : ['lifestyle/food/front','local/front']);
    }()),
    when : [''],
    hardcodes : '<sc'+'ript type="text/javascript">\
        (function(){\
            var a = {"local/front":"11","lifestyle/food/front":"12"};\
            if(typeof commercialNode!="undefined" && a[commercialNode]){\
                document.write(\'<sc\'+\'ript type="text/javascript" src="http://files.secondstreetmedia.com/washingtonpost/widget\'+a[commercialNode]+\'.js"></sc\'+\'ript>\');\
            }\
        }())\
    </scr'+'ipt>'
}

//15630-ML
wpniAds.templates.initRule('servicealley');
wpniAds.templates.rules.servicealley = {
    what : ['marketing'],
    where : ['blogs/front','local/front','local/trafficandcommuting/front','local/dc-politics/front','local/md-politics/front','local/virginia_politics/front','business/local-business/front','lifestyle/home/front','lifestyle/home_garden','metro/front','metro/traffic','metro/dc/front','metro/md/front','metro/va/front','metro/transportation','metro/local-tools','business/localbusiness/front','artsandliving/homeandgarden/front','realestate','realestate/neighborhoods/front','rentals'],
    when : [''],
    hardcodes : '<sc'+'ript type="text/javascript" src="http://www.servicealley.com/javascripts/wapo-widget.js"></scr'+'ipt>'
}

//example template for networked news DO NOT REMOVE
/*if(urlCheck('test_ads=networknews')){
    wpniAds.templates.initRule('nn_hp');
    wpniAds.templates.rules.nn_hp = {
        what : ['nn_hp'],
        hardcode : '<div id="nn_ad_tile_hp" style="background-color: rgb(153, 153, 153); position: relative; padding: 0px; margin: 0px; height: 20px; width: 190px;"><img src="http://www.washingtonpost.com/wp-srv/images/spacer.gif" width="190" height="20"><div style="position: absolute; top: 5px; left: 5px; color: rgb(255, 255, 255); font-size: 12px; font-family: Arial,Helvetica,sans-serif;">190x20 Test Spot<br></div></div>'
    }
}*/

//example template for networked news DO NOT REMOVE
if(urlCheck('test_ads=networknews')){
    wpniAds.templates.initRule('nn');
    wpniAds.templates.rules.nn = {
        what : ['nn','nn_hp'],
        where:[''],
        when:[''],
        hardcodes : '<a href="http://www.example.com" target="_blank"><img src="http://img.wpdigital.net/wp-adv/test/mstest/190x20.png" alt="" border="0" /></a>'
    }
}

//18123-JH
/*wpniAds.templates.initRule('nn');
wpniAds.templates.rules.nn = {
    what : ['nn'],
    where:['business'],
    when:['201201160000/201201222359']
}*/

wpniAds.templates.initRule('sponsor_links_bt');
wpniAds.templates.rules.sponsor_links_bt = {
    what : ['sponsor_links_bt'],
    where : [''],
    when : [''],
    hardcodes : '<sc'+'ript type="text/javascript"> if(render_google_ads) render_google_ads && typeof googleAds!="undefined" && wpniAds.addCSS("/wp-adv/advertisers/google/textlinks/css/google_textlinks.css") && googleAds.execute(commercialNode,3,false);else wpAds.textlinks.init(wp_meta_data.contentType,"bt",commercialNode)</sc'+'ript>'
}
wpniAds.templates.initRule('sponsor_links_in');
wpniAds.templates.rules.sponsor_links_in = {
    what : ['sponsor_links_in'],
    where : [''],
    when : [''],
    hardcodes : '<sc'+'ript type="text/javascript"> if(render_google_ads) render_google_ads && typeof googleAds!="undefined" && wpniAds.addCSS("/wp-adv/advertisers/google/textlinks/css/google_textlinks.css") && googleAds.execute(commercialNode,3,false);else wpAds.textlinks.init(wp_meta_data.contentType,"in",commercialNode)</sc'+'ript>'
}
wpniAds.templates.initRule('sponsor_links_rr');
wpniAds.templates.rules.sponsor_links_rr = {
    what : ['sponsor_links_rr'],
    where : [''],
    when : [''],
    hardcodes : '<sc'+'ript type="text/javascript"> if(render_google_ads) render_google_ads && typeof googleAds!="undefined" && wpniAds.addCSS("/wp-adv/advertisers/google/textlinks/css/google_textlinks.css") && googleAds.execute(commercialNode,2,false);else wpAds.textlinks.init(wp_meta_data.contentType,"rr",commercialNode)</sc'+'ript>'
}
wpniAds.templates.initRule('topjobs');
wpniAds.templates.rules.topjobs = {
    what : ['topjobs'],
    where : [''],
    when : [''],
    hardcodes : '<sc'+'ript type="text/javascript" src="http://js.washingtonpost.com/wp-adv/topjobs3/top_jobs_v3.js"></sc'+'ript>'
}
/*wpniAds.templates.initRule('topjobs_edu');
wpniAds.templates.rules.topjobs_edu = {
    what : ['topjobs'],
    where : ['local/education','national/higher-education'],
    when : [''],
    hardcodes : '<sc'+'ript type="text/javascript" src="http://media.washingtonpost.com/wp-adv/topjobs2/top_edu_jobs.js"></sc'+'ript>'
}*/

//eidos navtile demo
/*wpniAds.templates.initRule('targettile');
wpniAds.templates.rules.targettile = {
    what : ['nav_tile'],
    where : ['entertainment','lifestyle','local','metro'],
    when : [''],
    hardcodes : '<img src="http://img.wpdigital.net/wp-adv/advertisers/target/images/target_tile_30x90.gif" onclick="wpniAds.target.exec()" id="target-tile" alt="Target" border="0" width="90" height="29"/><img src="http://ad.doubleclick.net/ad/N3550.WashingtonPost/B6283788;sz=1x1;ord='+ Math.floor(Math.random()*1E5)+'?" border="0" width="1" height="1" alt="" style="display:none" />'
}


wpniAds.target = {
    exec:function(){
        var b=$("#main-nav-wrapper").next(),a=document.createElement("link");
        $(a).attr({href:"http://css.wpdigital.net/wp-adv/advertisers/target/eidos/target.css",rel:"stylesheet",height:"text/css"});
        $("head")[0].appendChild(a);
        $("#shell").addClass("target");
        c=document.createElement("div");
        c.id="target";
        $(b).append(c);
        $(c).html('<div class="close" onclick="javascript:wpniAds.target.close()">close x</div><object type="application/x-shockwave-flash" data="http://media.washingtonpost.com/wp-adv/advertisers/target/TargetGannett_70x22_Click_r08.swf" width="950" height="950" id="target-circular"><param name="movie" value="http://media.washingtonpost.com/wp-adv/advertisers/target/TargetGannett_70x22_Click_r08.swf"/><param name="quality" value="high"/><param name="wmode" value="transparent"/><param name="menu" value="false"/><param name="allowfullscreen" value="false"/><param name="allowScriptAccess" value="always"/><param name="flashvars" value="clickTag3=http://ad.doubleclick.net/clk;253289587;77142776;d"></object><img src="http://ad.doubleclick.net/ad/N3550.WashingtonPost/B5040651.2;sz=1x1;ord='+ Math.floor(Math.random()*1E5)+'?" border="0" width="1" height="1" alt="" style="display:none" />')},
    close:function(){
        $("div#target").remove();
        $("div#shell").removeClass("target")
    }
};*/

//15654-JH
wpniAds.templates.initRule('market_minute');
wpniAds.templates.rules.market_minute = {
    what : ['itb'],
    where : ['realestate'],
    when : [''],
    hardcodes : '<div style="clear:both;"></div><div class="hrule single grey dotted wp-pad-top wp-pad-bottom"></div><div class="module advertisement-teaser fontcolor-greypurple">Advertisement</div><div style="width:156px;padding:0;margin:0;"><a href="http://ad.doubleclick.net/clk;236932920;29926764;u?http://www.longandfoster.com/Market-Minutes/MarketMinutesReports.aspx" target="_blank" style="text-decoration:none;border:0;color:#464646;"><img src="http://img.wpdigital.net/wp-adv/advertisers/longfoster/2011/tile/market_minute_logo.png" border="0" height="37" width="156" alt="" /><img src="http://img.wpdigital.net/wp-adv/advertisers/longfoster/2011/tile/market_minute_graph.png" height="40" width="65" alt="" border="" style="float:left;margin:3px 3px 3px 0" /><div style="font-family:\'Georgia Pro\',Georgia,serif;font-size:12px;color:#464646;text-decoration:none;">How many homes are available now? Get the details on your market.</div></a></div>'
}

//15768-JB
/*wpniAds.templates.initRule('tixwidget');
wpniAds.templates.rules.tixwidget = {
    what : ['marketing'],
    where : ['^sports(?!\/blog)'],
    when : [''],
    hardcodes :'<sc'+'ript type="text/javascript">(function(){ var a = document.getElementById("wpni_adi_marketing"); if(a) a.style.backgroundImage = "none";})();</scr'+'ipt><sc'+'ript type="text/javascript" src="http://www.tiqiq.com/jscripts/washingtonpost.aspx"></scr'+'ipt>'
}
*/
if(urlCheck("test_ads=applewp") && navigator.appName==="Netscape" && !navigator.userAgent.match(/mobile/gi)){
    wpniAds.addCss("#wpni_adi_leaderboard.slug { background:none;padding:0 }")
    wpniAds.templates.initRule('apple');
    wpniAds.templates.rules.apple = {
        what : ['leaderboard','!tiffany_tile','!flex_bb_hp','!sponsor_links_rr'],
        where : ['washingtonpost.com'],
        when : ['']
    }
}

//16485-RZ
/*if(typeof wp_meta_data !== 'undefined' && wp_meta_data.contentType && wp_meta_data.contentType[0]==='CompoundStory' && typeof revsci === 'function' && revsci().match(/j10513|j10186|j10567|j10406|j10303|j10145/)){
    wpniAds.templates.initRule('revsci_levers');
    wpniAds.templates.rules.revsci_levers = {
        what : ['leaderboard_2','extra_bb'],
        where : [''],
        when : ['201107150000/201112312359']
    };
}*/

//18183-AL-251594600
wpniAds.templates.initRule('featuredagent');
wpniAds.templates.rules.featuredagent = {
    what : ['sponsor_agent'],
    where : ['realestate/front'],
    when : ['201201110000/201212312359']
};

//disable all ads on "portraits of lives lost" gallery
if(typeof wp_meta_data !== 'undefined' && wp_meta_data.page_id && wp_meta_data.page_id[0] === "1000.1.3877687284"){
    wpniAds.templates.initRule('gallery_ads');
    wpniAds.templates.rules.gallery_ads = {
        what : ['!nav_tile', '!tiffany_tile', '!leaderboard', '!extra_bb', '!leaderboard_2', '!bigbox', '!promo'],
        where : [''],
        when : ['']
    };
}

// 17268
/*wpniAds.templates.initRule('ups_nav_dropdown_tile');
wpniAds.templates.rules.ups_nav_dropdown_tile = {
    what : ['promo'],
    where : [''],
    when : ['201110240000/201112312359']
}*/

//TEST
if(urlCheck('test_ads=agoogleaday')){
  wpniAds.templates.initRule('agoogleadaytest');
  wpniAds.templates.rules.agoogleadaytest = {
    what : ['agoogleaday'],
    where : [''],
    when : ['']
  }
}

//No bug ID, Janette
wpniAds.templates.initRule('ups_no_inline_bb');
wpniAds.templates.rules.ups_no_inline_bb = {
  what : ['!inline_bb'],
  where : ['liveonline/viewpoint/nevellj'],
  when : []
}

//17649-CR
wpniAds.templates.initRule('sponsorCondo');
wpniAds.templates.rules.sponsorCondo = {
  what : ['sponsor_condo'],
  where : ['realestate/front'],
  when : ['201202150000/201205312359']
}

//18875-CD
wpniAds.templates.initRule('re300x100');
wpniAds.templates.rules.re300x100 = {
  what : ['300x100'],
  where : ['realestate'],
  when : ['']
}

//18907-CD
wpniAds.templates.initRule('sponsor_spots_re');
wpniAds.templates.rules.sponsor_spots_re = {
  what : ['sponsor_community','sponsor_condo','sponsor_new_home_builder'],
  where : ['realestate/neighborhoods/front', 'realestate/buy'],
  when : ['']
}

//RICH P
wpniAds.templates.initRule('test_lep');
wpniAds.templates.rules.test_lep = {
  what : ['600x130'],
  where : ['jobs/front'],
  when : ['']
}

//19086-ST-255712959,255712957,255712957
wpniAds.templates.initRule('ING88x31');
wpniAds.templates.rules.ING88x31 = {
  what : ['88x31'],
  where : [''],
  when : ['201204030000/201206302359']
}

//18808-MS-test template
if(location.search.match('test_ft_nav_tile')){
  wpniAds.templates.initRule('flashtalking88x31');
  wpniAds.templates.rules.flashtalking88x31 = {
    what : ['nav_tile'],
    where : [''],
    when : [''],
    hardcodes : "<noscript><a href=\"http://servedby.flashtalking.com/click/3/20603;289051;0;209;0/?url=1652133\" target=\"_blank\"><img border=\"0\" src=\"http://servedby.flashtalking.com/imp/3/20603;289051;205;gif;WashingtonPostUS;88x29SiteWindow/?\"></a></noscript><script language=\"Javascript1.1\" type=\"text/javascript\">var ftClick = \"\";var ftX = \"\";var ftY = \"\";var ftZ = \"\";var ftContent = \"\";var ftCustom = \"\";var ft88x29_OOBclickTrack = \"\";var ftRandom = Math.random()*1000000;var ftBuildTag1 = \"<scr\";var ftBuildTag2 = \"</\";var ftTag = ftBuildTag1 + 'ipt language=\"javascript1.1\" type=\"text/javascript\" ';ftTag += 'src=\"http://servedby.flashtalking.com/imp/3/20603;289051;201;js;WashingtonPostUS;88x29SiteWindow/?click='+ftClick+'&ftx='+ftX+'&fty='+ftY+'&ftadz='+ftZ+'&ftscw='+ftContent+'&ft_custom='+ftCustom+'&cachebuster='+ftRandom+'\" id=\"ftscript_88x29\" name=\"ftscript_88x29\"';ftTag += '\">' + ftBuildTag2 + 'script>';document.write(ftTag);</script>"
  }
}

//19320-ST
wpniAds.templates.initRule('kohls88x31');
wpniAds.templates.rules.kohls88x31 = {
  what : ['nav_tile'],
  where : ['lifestyle','entertainment','local'],
  when : ['201204160000/201205312359'],
  hardcodes : "<div style=\"margin-top:3px;margin-right:1px;\"><noscript><a href=\"http://servedby.flashtalking.com/click/3/20603;289051;0;209;0/?url=1652133\" target=\"_blank\"><img border=\"0\" src=\"http://servedby.flashtalking.com/imp/3/20603;289051;205;gif;WashingtonPostUS;88x29SiteWindow/?\"></a></noscript><script language=\"Javascript1.1\" type=\"text/javascript\">var ftClick = \"\";var ftX = \"\";var ftY = \"\";var ftZ = \"\";var ftContent = \"\";var ftCustom = \"\";var ft88x29_OOBclickTrack = \"\";var ftRandom = Math.random()*1000000;var ftBuildTag1 = \"<scr\";var ftBuildTag2 = \"</\";var ftTag = ftBuildTag1 + 'ipt language=\"javascript1.1\" type=\"text/javascript\" ';ftTag += 'src=\"http://servedby.flashtalking.com/imp/3/20603;289051;201;js;WashingtonPostUS;88x29SiteWindow/?click='+ftClick+'&ftx='+ftX+'&fty='+ftY+'&ftadz='+ftZ+'&ftscw='+ftContent+'&ft_custom='+ftCustom+'&cachebuster='+ftRandom+'\" id=\"ftscript_88x29\" name=\"ftscript_88x29\"';ftTag += '\">' + ftBuildTag2 + 'script>';document.write(ftTag);</script></div>"
}

//18123-CR
wpniAds.templates.initRule('TDA_nn');
wpniAds.templates.rules.TDA_nn = {
  what : ['nn'],
  where : ['business'],
  when : ['201205070000/201205132359']
}

//18123-CR
wpniAds.templates.initRule('TDA_336x60');
wpniAds.templates.rules.TDA_336x60 = {
  what : ['336x60$'],
  where : ['business/front'],
  when : ['201205070000/201205132359']
}

//19533-FN
wpniAds.templates.initRule('arena_stage_336x60');
wpniAds.templates.rules.arena_stage_336x60 = {
  what : ['336x60$'],
  where : ['entertainment'],
  when : ['201205070000/201207152359']
}

//18123 NN - JH
/*
wpniAds.templates.initRule('tda_business_nn');
wpniAds.templates.rules.tda_business_nn = {
  what : ['nn'],
  where : ['bloomberg', 'business', 'washingtonpost.com', 'national', 'opinions', 'politics', 'world', 'onleadership', 'conversations'],
  when : ['201201200000/201201222359']
}
*/

}
function initAdType(what)
{
 var thisAdType = new AdInstance()
 thisAdType.testFlagArray = new Array('test_ads','test_' + what);
 thisAdType.debugFlagArray = new Array('debugAdCode','debug' + what);

 thisAdType.dcCode += orbitFlag() + /*getWPATCookie() + */ wpAd.getWPATC() + mediaPage() + realEstateAreaId() + aptco() + locExpSponsor();/*  + wpAds_article();*/

 switch(what)
 {

  case 'featurebar':
   thisAdType.size = "446x33";
   thisAdType.code = "ad=fb;";
  break

  case 'itb':
   thisAdType.size = "1x1";
   thisAdType.code = "";
  break

  case 'leaderboard':
   thisAdType.size = "728x90";
   thisAdType.code = "ad=lb;";
  break

  case 'bigad':
   thisAdType.size = "1x1";
   thisAdType.code = "";
  break

  case 'bigbox':
   thisAdType.size = "300x250";
   thisAdType.code = "ad=bb;";
  break

  case 'extra_bb':
   thisAdType.size = "300x250";
   thisAdType.code = "ad=bb;";
  break

  case 'skyscraper':
   thisAdType.size = "160x600";
   thisAdType.code = "ad=ss;";
  break

  case 'promo':
   thisAdType.size = "200x60,184x90";
   thisAdType.code = "";
  break

  case 'tiffany_tile':
   thisAdType.size = "184x90,200x60";
   thisAdType.code = ""
  break

  case 'flex_ss_bb_hp':
   thisAdType.size = "160x600,300x250,300x600,336x850";
   thisAdType.code = "ad=ss;ad=bb;ad=hp;";
  break

  case 'flex_bb_hp':
   thisAdType.size = "300x250,300x600,336x850";
   thisAdType.code = "ad=bb;ad=hp;";
  break

  case 'flex_ss_bb':
   thisAdType.size = "160x600,300x250";
   thisAdType.code = "ad=ss;ad=bb;";
  break

  case 'flex_bb_tp':
   thisAdType.size = "300x250,300x600";
   thisAdType.code = "ad=bb;ad=tp;";
  break

  case 'flex_re':
   thisAdType.size = "300x250,300x600";
   thisAdType.code = "ad=bb;ad=tp;";
  break

  case 'flex':
   thisAdType.size = "336x850";
   thisAdType.code = "ad=hp;";
  break

  case '336x30':
   thisAdType.size = "336x30";
   thisAdType.code = "ad=336x30;";
  break

  case '336x35':
   thisAdType.size = "336x35";
   thisAdType.code = "ad=336x35;";
  break

  case '336x35_top':
   thisAdType.size = "336x35";
   thisAdType.code = "ad=336x35;";
  break

  case '336x60':
   thisAdType.size = "336x60";
   thisAdType.code = "ad=336x60;";
  break

   case '200x50':
   thisAdType.size = "200x50";
   thisAdType.code = "ad=200x50;";
  break

  case '120x240':
   thisAdType.size = "120x240";
   thisAdType.code = "ad=120x240;";
  break

  case '150x60':
   thisAdType.size = "150x60";
   thisAdType.code = "ad=150x60;";
  break

  case '285x29':
   thisAdType.size = "285x29";
   thisAdType.code = "ad=285x29;";
  break

  case 'deal':
    thisAdType.size = "1x1";
    thisAdType.tile = "ad=1x1;";
  break

  case 'pushdown':
   thisAdType.size = "1x1";
   thisAdType.code = "";
  break

  case 'sponsor':
    thisAdType.size = '1x1';
    thisAdType.tile = 'false';
  break

  case 'inline_bb':
    thisAdType.size = '300x250';
    thisAdType.tile = 'ad=bb;';
  break

  case 'marketing':
    thisAdType.size = '1x1';
    thisAdType.tile = '';
  break

  case 'nav_tile':
    thisAdType.size = '1x1';
    thisAdType.tile = '';
  break

  case 'nn':
    thisAdType.size = '1x1';
    thisAdType.tile = '';
  break

  case 'nn_hp':
    thisAdType.size = '190x20';
    thisAdType.tile = 'ad=nn_hp;';
    try{wpTiles.nnHasAd();}catch(e){}
  break

  case 'nn_sidebar':
    thisAdType.size = '200x30';
    thisAdType.tile = 'ad=nn_sidebar;';
    try{wpTiles.nnHasAd();}catch(e){}
  break

  case 'nn_footer':
    thisAdType.size = '200x30';
    thisAdType.tile = 'ad=nn_footer;';
    try{wpTiles.nnHasAd();}catch(e){}
  break

  case 'nn_rr':
    thisAdType.size = '200x80';
    thisAdType.tile = 'ad=nn_rr;';
    try{wpTiles.nnHasAd();}catch(e){}
  break

  case 'tooltile':
    thisAdType.size = '1x1';
    thisAdType.tile = '';
  break

  case 'topjobs':
    thisAdType.size = '1x1';
    thisAdType.tile = '';
  break

  case 'sponsor_links_bt':
    thisAdType.size = '1x1';
    thisAdType.tile = '';
  break

  case 'sponsor_links_in':
    thisAdType.size = '1x1';
    thisAdType.tile = '';
  break

  case 'agoogleaday':
    thisAdType.size = '1x1';
    thisAdType.tile = 'ad=agoogleaday;';
  break

  case 'sponsor_links_rr':
    thisAdType.size = '1x1';
    thisAdType.tile = '';
  break

  case 'sponsor_condo':
    thisAdType.size = '1x1';
    thisAdType.tile = '';
  break

  case '88x31':
    thisAdType.size = '88x31';
    thisAdType.tile = '';
  break

  case '300x100':
    thisAdType.size = '300x100';
    thisAdType.tile = '';
  break

  case '600x130':
    thisAdType.size = '600x130';
    thisAdType.tile = '';
  break

 }

return thisAdType
}
//this translates from the old placeAd to the new one
function posMaker(adType,posOverride,delivery)
{

    if(posOverride || delivery=='AJAX')
    {
        var returnValue = adType + ((posOverride) ? '_' + posOverride : '');
    }
    else
    {
        if (typeof this.usedSpots == 'undefined')
        {
            this.usedSpots = new Array();
        }
        if (this.usedSpots[adType] == null)
        {
            this.usedSpots[adType] = 1;
            returnValue = adType;
        }
        else
        {
            this.usedSpots[adType]++;
            returnValue = adType+"_"+this.usedSpots[adType];
        }
    }
    var posArray = { 'leaderboard':1,'leaderboard_2':2,'skyscraper':3,'flex_ss_bb_hp':6,'flex_bb_hp':6, 'flex_bb_tp':6,'featurebar':7,/*'tiffany_tile':14,*/'336_35':19,'bigbox':20,'pushdown':43,'extra_bb':44,'deal':45};

    if ( typeof posArray[returnValue] != 'undefined' && (typeof commercialNode!='undefined' && commercialNode=='metro') )
    {
        posArray['flex_ss_bb_hp'] = 16;
    }
    if ( typeof posArray[returnValue] != 'undefined' && (typeof commercialNode!='undefined' && commercialNode.match('washingtonpost.com')) )
    {
        posArray['flex_bb_hp'] = 16;
    }
    //trulia fix
    if((typeof commercialNode!='undefined' && commercialNode=='trulia') && (typeof posArray[returnValue] != 'undefined' && returnValue=='flex_bb_tp') )
    {
        return  { 'keyvalue':'flex_re','slug':'flex_bb_tp' };
    }

    return  { 'keyvalue' : ( (typeof posArray[returnValue] != 'undefined') ? 'ad' + posArray[returnValue] : returnValue ) , 'slug' : returnValue };

}



function orbitFlag()
{
    return (document.location.href.match('/wp-dyn/')?'orbit=y;':'');
}

//17457-CD
function mediaPage(){
    return (typeof thisNode!="undefined"&&thisNode.match(/media|photo|video/)||typeof commercialNode!="undefined"&&commercialNode.match(/media|photo|video/)||urlCheck(/video|gallery|scene-in|mobile|\/wp-srv\//))?"!c=media;":"";
};


/*function getWPATCookie()
{
  if (document.cookie.indexOf("WPATC") != -1)
  {
    var start = (document.cookie.indexOf("WPATC") + 6);
    var end = (document.cookie.indexOf(";",start)) == -1 ? document.cookie.length : document.cookie.indexOf(";",start);
    var cookie = document.cookie.substring(start,end) + ";";
    while (cookie.indexOf(":") != -1)
      cookie = cookie.substring(0,cookie.indexOf(":"))+";"+cookie.substring(cookie.indexOf(":")+1,cookie.length);
    if (cookie.lastIndexOf(";") != cookie.length - 1) cookie += ';';
    if (cookie.indexOf("=") == 0) cookie = cookie.substring(cookie.indexOf(";")+1,cookie.length);
  }
  else var cookie = "" ;
  return cookie ;
}*/

wpAd = wpAd || {};
wpAd.cache = wpAd.cache || {};
wpAd.getWPATC = function(){
  return typeof wpAd.cache.wpatc !== 'undefined' ? wpAd.cache.wpatc : (function(){
    var cookie = getCookie('WPATC');
    wpAd.cache.wpatc = cookie ? unescape(cookie).replace(/\:/g, ';')+';' : '';
    return wpAd.cache.wpatc;
  })();
}

function getQueryVariable(variable)
{
    var query = location.href.split('?')[1];
    if(!query)
    {
        return null
    }
    var vars = query.split("&");
    for(var i=0;i<vars.length;i++)
    {
        var pair = vars[i].split("=");
        if (pair[0] == variable)
        {
            return pair[1];
        }
    }
    return null
}


function realEstateAreaId()
{
   if(typeof this.returnREAIValue == 'undefined')
    {
        this.returnREAIValue = '';
        if(getQueryVariable('areaId'))
        {
            this.returnREAIValue = 'areaId=' + getQueryVariable('areaId') + ";"
        }
        if(typeof hs != 'undefined' && typeof hs.geo_area_id != 'undefined')
        {
            geo_area_id_array = hs.geo_area_id.split(';');
            for(var x =0; x < geo_area_id_array.length; x++)
            {
                if(typeof geo_area_id_array[x] == 'string')
                {
                    this.returnREAIValue += 'areaId=' + geo_area_id_array[x] + ';'
                }
            }
        }
    }
    return this.returnREAIValue
}

function aptco()
{
    var a = getQSValue('aptco');
    var b = getQSValue('metro');
    if(a && b)
    {
        return 'aptco=' + a + ';metro=' + b + ';';
    }
    return '';
}

function locExpSponsor(){
if (typeof countyName != 'undefined' && typeof stateName != 'undefined')
{
    var invalidKW = ['?','=','/','\\',':',';',',','*','(',')','&','$','%','@','!','^','+',' ','[',']','{','}','.'];
    for (var i=0;i<invalidKW.length;i++)
    {
        csRE = new RegExp('(\\' + invalidKW[i] + ')', 'g');
        countyName = countyName.replace(csRE,"").toLowerCase();
        stateName = stateName.replace(csRE,"").toLowerCase();
    }
    locExpKV = "lexp_spon=" + countyName + "-" + stateName + ";";
    }
    else
    {
        locExpKV = '';
    }
    return locExpKV
}

function realEstateCoSpon()
{
    if( typeof _AD_TARGETING != 'undefined' && _AD_TARGETING.county && _AD_TARGETING.state )
    {
        var co_spon = _AD_TARGETING.county + '-' + _AD_TARGETING.state;
        return ';co_spon=' + co_spon.toLowerCase().replace(/ /gi,'_').replace(/&[a-z]*(?=;)/gi,'').replace(/[^a-z\d\-\_]/gi,'') + ';';
    }
    return '';
}


function front()
{
    return 'front=' + ((typeof commercialPageType != 'undefined' && commercialPageType=='front')?'y':'n') + ';';
}
/*
function wpAds_article()
{
    return  'article=' + ((typeof commercialPageType != 'undefined' && commercialPageType=='article')?'y':'n') + ';';
}

function beta_kv()
{
    return (typeof commercialNode != 'undefined' && commercialNode=='washingtonpost.com')?'!c=intrusive;beta=y;':'beta=n;';
}
*/

wpniAds.kv = {
    articleId : {
        exec : function(){
            if(wp_meta_data.contentType[0]==="CompoundStory"){
                var a=document.location.href.split("/");
                return "articleId="+a[a.length-1].toLowerCase().split("_story")[0]+";";
            };
            return '';
        },
        check : wp_meta_data.contentType ? true : false
    },
    pageId : {
        exec : function(){
            return ('pageId='+wp_meta_data.page_id[0].replace(/\./g,'-')+';');
        },
        check : wp_meta_data.page_id ? true : false
    },
    front : {
        exec : function(){
            return 'front='+ (wp_meta_data.contentType[0]==='front' ? 'y' : 'n') + ';';
        },
        check : wp_meta_data.contentType ? true : false
    },
    /*author : {
        exec : function(){
            return ('author='+wp_meta_data.author[0].toLowerCase().replace(/ /g,'_')+';');
        },
        check : wp_meta_data.author ? true : false
    },*/
    metakw : {
        exec : function(){
            var obj = {
              '!c' : {
                natural_disaster : ['attack', 'disaster', 'fire', 'explosion', 'oil', 'coal', 'death', 'dead', 'quake', 'earthquake', 'tsunami', 'tornado', 'hurricane', 'flood','bed bug','infestation'],
                human_disaster : ['spanair', 'sex abuse','aground', 'rescue', 'attack', 'disaster', 'explosion', 'war', 'hostage', 'terror', 'terrorist', 'bomb', 'blast', 'mining', 'miner', 'violence', 'riot', 'plane crash', '9/11', 'sept. 11', 'september 11','car crash'],
                business_disaster : ['attack', 'disaster', 'exxon', 'goldman', 'mortgage', 'Insurance', 'health', 'bank', 'wall street', 'protest'],
                goldman : ['aig','fraud','foreclosure','litton','mortgage','sec','investigation','inquiry','bonus','travel','goldman','sachs'],
                inappropriate : ['gambling','alcohol','pornography']
              },
              kw : {
                energy : ['energy'],
                re :  ['builder','condo','home','homeowner','housing','mortgage','property','real estate','realtor','refinance','neighborhood']
              }
            },
            m = wp_meta_data.keywords.join(",").toLowerCase(), rv = '',regex, key, val, len;
            for(key in obj){
                for(val in obj[key]){
                    regex = '\\b';
                    len = obj[key][val].length;
                    while(len--){
                        regex += (obj[key][val][len] + '(|s|es|ed|ing|ers)' + (len !== 0 ? '\\b|' : '') + '\\b');
                    }
                    if(m.search(new RegExp(regex,'i'))!==-1){
                        rv += key + '=' + val + ';';
                    }
                }
            }
            return rv;
        },
        check : (wp_meta_data.keywords && (wp_meta_data.contentType && wp_meta_data.contentType[0]!=="front")) ? true : false
    },
    page : {
        exec : function(){
            return 'page='+(wpniAds.contentType[wp_meta_data.contentType[0]] ? wpniAds.contentType[wp_meta_data.contentType[0]] : 'article') + ';';
        },
        check : wp_meta_data.contentType ? true : false
    },
    redefine : function(fn, new_fn){
        if(typeof window[fn] !=='undefined'){
            window[fn] = function(){
                return eval(new_fn+'()');
            }
            return true;
        }
        return false;
    },
    exec : function(){
        var str='', key;
        for(key in wpniAds.kv){
            if(wpniAds.kv[key].check){
                //If we are not redefining the function (where it will be called elsewhere. eg: pageId keyvalue), add the new kv to the string (eg: "author" keyvalue)
                str += !wpniAds.kv.redefine(key, 'wpniAds.kv.'+key+'.exec') ? wpniAds.kv[key].exec() : '';
            }
        }
        return str;
    }
};

wpniAds.kv.string = wpniAds.kv.exec();


function hackBin(_arg,currentLoc,what,delivery,onTheFly)
{
    var hackReturnValue=eval(_arg)
    switch(_arg)
    {
        case 'onTheFly':
            //hackReturnValue += beta_kv();

            /*if(what=='sponsor|new_home_builder')
            {
                if(commercialNode == 'realestate' || commercialNode == 'realestate/front' || commercialNode == 'realestate/buy')
                {
                    hackReturnValue += ';tn=4;tr=2;tcp=0;to=v;ta=left;tva=top;';
                }
                else
                {
                    hackReturnValue += ';tn=4;tr=1;tcp=0;to=v;ta=left;tva=top;';
                }
            }*/

            //18344
            if(currentLoc === 'rentals' && typeof wpAds !== 'undefined' && typeof wpAds.metro !== 'undefined' && typeof wpAds.metro.exec !== 'undefined'){
              hackReturnValue += wpAds.metro.exec();
            }
            if(what=='sponsor|rental')
            {
                hackReturnValue += ';tn=12;tr=1;tcp=0;to=v;ta=left;tva=top;'
            }
            if(currentLoc.match('realestate') || currentLoc.match('trulia'))
            {
                hackReturnValue += realEstateCoSpon();
            }
            if( ( currentLoc.match('^wiki') || currentLoc.match('innovation') ) && what.match('leaderboard') )
            {
                hackReturnValue += '!category=bigleaderboard;';
            }
            //10522-RZ,12622-ML
            if(currentLoc=='reachwall' || currentLoc.match('/email') || currentLoc.match('admin') || currentLoc.match('/puzzles') || urlCheck('_print.html'))
            {
                hackReturnValue += '!c=media;';
            }
            //11958-MB, 13745-JM
            if(currentLoc=='trulia')
            {
                hackReturnValue += ((what=='leaderboard')?'!c=media':(what=='flex_bb_tp')?'!c=intrusive':'')+';';
            }
            //18593-personalpost
            if(commercialNode.match(/washingtonpost\.com|personalpost|obituaries|weather/)){
                hackReturnValue += '!c=intrusive;';
            }

            hackReturnValue += wpniAds.kv.string;

        break;

        //11510-RZ
        case 'delivery':
            if(delivery=='AJAX' && what=='leaderboard')
            {
                ord_override = true;
            }
        break;

        case 'what':
            if(what=='tiffany_tile' && currentLoc=='metro' && typeof jQuery != 'undefined')
            {
                $(function(){
                    $("#slug_tiffany_tile").addClass("ad-tiffany");
                    var tiff_tile = $("#slug_tiffany_tile");
                    var tiff_tile_slug = $('#slug_tiffany_tile img');
                    if(tiff_tile_slug && (tiff_tile_slug.height()==60 || tiff_tile_slug.height()==80))
                    {
                        tiff_tile.css({'height':tiff_tile_slug.height()+'px','top':((tiff_tile.parent().height() - tiff_tile_slug.height())/2)+'px'});
                    }
                    else
                    {
                        tiff_tile.css({'height':'auto','top':((tiff_tile.parent().height() - tiff_tile.height())/2)+'px'});
                    }
                });
            }
            if(what=='pushdown' && currentLoc=='washingtonpost.com' && navigator.userAgent.match(/msie 6/gi))
            {
                document.write('<style type="text/css">.ie.ie6 .module.ad-pushdown{ padding:0px !important }</style>');
            }

            if(what == '336x35_top' && currentLoc == 'realestate' && typeof commercialPageType != 'undefined' && typeof jQuery != 'undefined' && $('div#slug_336x35_top').length){
                $('div#slug_336x35_top').css({paddingTop:'5px'}).prepend('<div class="module advertisement-teaser fontcolor-greypurple">Advertisement</div>');
            }
            if(what==='tiffany_tile' && !urlCheck('allAds')){
                document.write('<sc'+'ript type="text/javascript" src="http://js.washingtonpost.com/wp-srv/ad/tiffany_manager.js"></scr'+'ipt>');
                document.write('<sc'+'ript type="text/javascript" src="http://js.washingtonpost.com/wp-srv/ad/tile_flights.js"></scr'+'ipt>');
            }
        break;

        case 'currentLoc':
            if(currentLoc=='metro' && (typeof commercialPageType!=='undefined' && commercialPageType==='front')){
                hackReturnValue+='/front';
            }
            if(currentLoc.match('washingtonpost.com') && what=='flex_bb_hp' && location.href.match('reload=true')){
                hackReturnValue+='refresh';
            }
            //15706-RZ
            if(currentLoc.match("/email") || urlCheck("_print.html") || urlCheck("GA2010092907128.html") || urlCheck("GA2009012701325.html") || urlCheck("GA2010020403805.html") || urlCheck("GA2010120900367.html") ){
                tileThatGetsDcopt = 0;
            }

            if(currentLoc.match(/classified/) && what === 'leaderboard' && typeof jQuery !== 'undefined' && jQuery.browser.msie && parseInt(jQuery.browser.version) < 8){
                window['explb_ie7positionFix'] = function(){
                    window['explb_ie7positionFix_count'] = window['explb_ie7positionFix_count'] || 0;
                    if($('#brand-wrapper').length){
                        $('#slug_leaderboard').show();
                    } else {
                        window['explb_ie7positionFix_count']++;
                        if(window['explb_ie7positionFix_count'] < 20) {
                            setTimeout(explb_ie7positionFix, 500)
                        }
                    }
                }
                $(window).load(function(){
                    explb_ie7positionFix();
                })
            }

            //18907
            if(currentLoc === 'realestate' && typeof commercialPageType !== 'undefined' && commercialPageType === 'front'){
              hackReturnValue+='/front';
            }

        break;

    }
    return hackReturnValue
}


var wpTiles = typeof wpTiles !== 'undefined' ? wpTiles:{};
wpTiles.nnHasAd = function(){
    if (typeof NetworkNews !== 'undefined' && typeof NetworkNews.Constants !== 'undefined'){
        NetworkNews.Constants.hasAd = true;
    }
}
wpTiles.init = function (a) {
    placeAd2(commercialNode, a, false, '');
}

// This code is calling an Orbit/Non-commercial javascript which piggy-backs on ad_v2.js because this file has such
// deep penetration across all our pages and vendors
if ( (typeof PIGGY_BACK_ALREADY_CALLED == "undefined" || !PIGGY_BACK_ALREADY_CALLED) && !location.href.match('https://') ) {
   if ( !window.TWP || !TWP.Constants || !TWP.Constants.AllowDocwrite || typeof TWP.Constants.AllowDocwrite.IN_ADS == 'undefined' || TWP.Constants.AllowDocwrite.IN_ADS ) {
      document.write('<s\cript src="http://js.washingtonpost.com/wp-srv/javascript/piggy-back-on-ads.js"></s\cript>');
   } else {
      wpniAds.addScript('http://js.washingtonpost.com/wp-srv/javascript/piggy-back-on-ads.js');
   }
}
