wpniSite='slate'
wpniDomain='slate.com'
show_doubleclick_ad = true
rssString = "from=rss"
hourScope = 5;
numPop = 2;
tileThatGetsDcopt = 2;

if (typeof wp_quantcast !== 'undefined') {
  wp_quantcast.exec('p-5cYn7dCzvaeyA');
}

wpniAds.templates.initRule('defaultTemplate');
wpniAds.templates.rules.defaultTemplate.what = new Array('!tiffanytile','!120x60','!88x31','!120x90','!customcover','!leaderboard_2','!336x60','!336x90','!336x90_most','!120x30','!mostread','!pushdown','!rightflex_2','!featurebar','!sponsor','!comment','!tooltile','!rightflex_3','!bigbox_2','!twitter','!flip','!bigad', '!hive_textlinks','!167x115','!agoogleaday','!meebo');

wpniAds.templates.initRule('bmDev');
wpniAds.templates.rules.bmDev.what = new Array('120x90');
wpniAds.templates.rules.bmDev.where = new Array('^bigmoney');

wpniAds.templates.initRule('homepage');
wpniAds.templates.rules.homepage.what = new Array('!leaderboard','!336x90','!120x240top','tiffanytile')
wpniAds.templates.rules.homepage.where = new Array('^homepage');
wpniAds.templates.rules.homepage.when= new Array('');

if(location.href.match('test_ads=apple-hero'))
{
wpniAds.templates.initRule('applehero');
wpniAds.templates.rules.applehero.what = new Array('!leaderboard','!tiffanytile','!rightflex','!120x240top','!120x240bottom','!mostread','pushdown','rightflex_3');
wpniAds.templates.rules.applehero.where = new Array('^homepage');
wpniAds.templates.rules.applehero.when = new Array('');
}

//12039-DG
wpniAds.templates.initRule('invhplevers');
wpniAds.templates.rules.invhplevers.what = new Array('!bigbox_2');
wpniAds.templates.rules.invhplevers.where = new Array('^homepage');

//14079
wpniAds.templates.initRule('siemens_textlink');
wpniAds.templates.rules.siemens_textlink = {
  what:['1x1'],
  where:['news/thehive'],
  when:[''],
  hardcodes:'<div style="text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#0C4790">The Hive is sponsored by Siemens. <a href="http://ad.doubleclick.net/clk;226506771;50306605;a" target="_blank" style="color:#0C4790">Find out more about Siemens rail solutions.</a></div>'
}


if(urlCheck("test_ads=appleslate") && navigator.appName==="Netscape" && !navigator.userAgent.match(/mobile/gi)){
wpniAds.addCss("body #slug_pushdown { background-color:#fff } body #pushdown_ad { padding:5px 0 0 0;width:100% }")
wpniAds.templates.initRule('apple');
wpniAds.templates.rules.apple = {
  what:['pushdown','!tiffanytile','!120x240bottom','!rightflex'],
  where:['homepage'],
  when:['']
}
}

//16397-RZ
/*if(front()=='front=n;'){
  wpniAds.templates.initRule('bb_lever');
  wpniAds.templates.rules.bb_lever = {
    what:['bigbox_2'],
    where:[''],
    when:['201106300000/201106302359']
  }
}*/

//CD
/*
wpniAds.templates.initRule('hivesponsor');
wpniAds.templates.rules.hivesponsor = {
  what:['sponsor', 'featurebar', 'featurebar_2'],
  where:['business/inventyourfuture'],
  when:['201110240000/201112042359']
}*/

//17282 - JH
/*wpniAds.templates.initRule('hivetextlinks');
wpniAds.templates.rules.hivetextlinks = {
  what:['hive_textlinks'],
  where:['business/inventyourfuture'],
  when:['201110310000/201112042359'],
  hardcodes : '<link rel="stylesheet" type="text/css" href="http://media.washingtonpost.com/wp-adv/advertisers/hivesponsor/hive_textlinks.css" />\
    <ul id="ad_hive_textlinks">\
      <li><a href="http://responsibility-project.libertymutual.com/reporting/-life-is-good-doing-good" target="_blank">"Life is good" is doing good </a></li>\
      <li><a href="http://responsibility-project.libertymutual.com/q-and-as/a-new-life-for-medical-supplies" target="_blank">A new life for medical supplies</a></li>\
      <li><a href="http://responsibility-project.libertymutual.com/reporting/weaving-humanity" target="_blank">Creating sustainable Nepalese carpets</a></li>\
      <li id="hive_textlinks_label">SPONSORED LINKS</li>\
    </ul>'
}*/

//17378 - JH
wpniAds.templates.initRule('homepage120x240');
wpniAds.templates.rules.homepage120x240 = {
  what:['120x240top'],
  where:['homepage'],
  when:['201111010000/201212302359']
}

//TEST
if(urlCheck('test_ads=agoogleaday')){
  wpniAds.templates.initRule('agoogleadaytest');
  wpniAds.templates.rules.agoogleadaytest = {
    what:['agoogleaday'],
    where:[''],
    when:['']
  }
}

//19383-CD
wpniAds.templates.initRule('meebo');
wpniAds.templates.rules.meebo = {
  what:['meebo'],
  where:[''],
  when:['']
}

//18288
//18551
/*
wpniAds.templates.initRule('agoogleaday');
wpniAds.templates.rules.agoogleaday = {
  what:['agoogleaday'],
  where:['arts','life','technology','science','business','biztech','health'],
  when:['201201190000/201203312359']
}
*/

//18327-JH
wpniAds.templates.initRule('myslateTiles');
wpniAds.templates.rules.myslateTiles = {
  what:['120x60','120x90_2'],
  where:['myslate'],
  when:['201201200000/201203312359']
}

//18471-SP
wpniAds.templates.initRule('slate_hp_leaderboard_bb');
wpniAds.templates.rules.slate_hp_leaderboard_bb = {
  what:['leaderboard', '!tiffanytile'],
  where:['homepage'],
  when:['201202220000/201202222359', '201203140000/201203142359', '201204100000/201204102359']
};

//19487-AL
wpniAds.templates.initRule('hiscox');
wpniAds.templates.rules.hiscox = {
  what:['sponsor', 'featurebar', 'featurebar_2'],
  where:['business/tenrules'],
  when:['201205010000/201205312359']
};



//18479 -SP-252212434
/*wpniAds.templates.initRule('googlePushdown');
wpniAds.templates.rules.googlePushdown = {
  what:['pushdown'],
  where:['homepage'],
  when:['201202130000/201202132359']
}*/

//FIX for forcing opening ads in same window
//17503 - liberty mutual ads
/*if(commercialNode !== 'undefined' && commercialNode === 'homepage' && typeof estNowWithYear !== 'undefined' && (estNowWithYear <= 201111082359 || (estNowWithYear >= 201111100000 && estNowWithYear <= 201111102359)) && typeof jQuery !== 'undefined'){
  $(function(){
    $('#slug_leaderboard a,  #slug_rightflex a').live('click', function(e){
      e.preventDefault();
      location.href = $(this).attr('href');
    });
  })
}*/


wpniAds.gallery={
  count:0,
  refresh:function(){
    this.count++;
    this.count%5==0&&placeAd2(commercialNode,"leaderboard","AJAX","");
    this.count%5==0&&placeAd2(commercialNode,"bigbox","AJAX","");
  }
};


//15788-AH
if(urlCheck("test_ads=ewfixedpanel")){
  wpniAds.addCss("#page_rightcol * { display:none } #page_rightcol * * { display:none }  #page_rightcol #right_ad_wrapper, #page_rightcol #right_ad_wrapper * { display:block } #page_rightcol #right_ad_wrapper script { display:none }")
}

if(front()=='front=n;' && urlCheck('noRightRail'))
{
  document.write('<link href="http://www.washingtonpost.com/wp-srv/ad/css/slate_right_rail.css" type="text/css" rel="stylesheet"/>');
}

if(typeof commercialNode!='undefined' && commercialNode=='homepage'){
  document.write("<style type=\"text\/css\">#slug_pushdown { background-color:#660033 } #pushdown_ad { width:970px;margin:0 auto;text-align:center }<\/style>");
}


function funcPStax()
{
  return (typeof PStax != 'undefined') ? 'dept=' + PStax + ';' : '' ;
}

function initAdType(what)
{
 var thisAdType = new AdInstance()
 thisAdType.testFlagArray = new Array('test_ads','test_' + what);
 thisAdType.debugFlagArray = new Array('debugAdCode','debug' + what);

 thisAdType.dcCode += msnCobrand()  + funcPStax()  + frayId() + articleId()

 switch(what)
 {
  case 'toolbar':
   thisAdType.size = "120x60"
   thisAdType.code = "ad=120x60;"
  break

    case 'customcover':
   thisAdType.size = "1x1"
   thisAdType.code = "ad=customcover;"
  break

  case 'leaderboard':
   thisAdType.size = "728x90"
   thisAdType.code = "ad=lb;"
  break

  case 'bigad':
   thisAdType.size = "1x1"
   thisAdType.code = ""
  break

  case 'bigbox':
   thisAdType.size = "300x250"
   thisAdType.code = "ad=bb;"
  break
  case '150x29':
   thisAdType.size = "150x29"
   thisAdType.code = "ad=150x29;"
  break

  case '120x240top':
   thisAdType.size = "120x240"
   thisAdType.code = "ad=120x240;"
  break

  case '120x240bottom':
   thisAdType.size = "120x240"
   thisAdType.code = "ad=120x240;"
  break

  case '400x140':
   thisAdType.size = "400x140"
   thisAdType.code = "ad=400x140;"
  break

  case 'skyscraper':
   thisAdType.size = "160x600"
   thisAdType.code = "ad=ss;"
  break

  case 'featurebar':
   thisAdType.size = "446x33,468x60"
   thisAdType.code = "ad=fb;"
  break

  case 'midarticleflex':
  thisAdType.size = "446x33,300x250"
   thisAdType.code = "ad=fb;ad=bb;"
  break

  case '1x1':
   thisAdType.size = "1x1"
   thisAdType.code = "ad=onebyone;"
  break

  case 'pushdown':
   thisAdType.size = "1x1"
   thisAdType.code = ""
  break

  case 'tiffanytile':
   thisAdType.size = "200x60,264x90"
   thisAdType.code = "ad=tiff;"
  break

  /*case 'tiffanytile':
   thisAdType.size = "200x60,264x90"
   thisAdType.code = "ad=tiff;"
   if('1|3|5|6'.match(thisDate().getDay()))
   {

     thisAdType.adExecute = function ()
     {
    document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="264" height="120" id="SweetSpot" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="http://www.washingtonpost.com/wp-adv/slate/SweetSpot.swf" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" />  <embed src="http://www.washingtonpost.com/wp-adv/slate/SweetSpot.swf" quality="high" bgcolor="#000000" width="264" height="120" name="SweetSpot" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>')
     }
   }
  break*/

  case '120x60':
   thisAdType.size = "120x60"
   thisAdType.code = "ad=120x60;"
  break

  case '88x31':
   thisAdType.size = "88x31"
   thisAdType.code = "ad=88x31;"
  break

  case '120x90':
   thisAdType.size = "120x90";
   thisAdType.code = "ad=120x90;";
  break

  case 'rightflex':
   thisAdType.size = "160x600,336x850,300x250"
   thisAdType.code = "ad=ss;ad=hp;ad=bb;"
  break

  case 'leftflex':
   thisAdType.size = "160x600,336x850,300x250"
   thisAdType.code = "ad=ss;ad=hp;ad=bb;"
  break

  case 'mostread':
   thisAdType.size = "336x54,336x90"
   thisAdType.code = "ad=mostread;"
  break

  case '336x60':
   thisAdType.size = "336x60"
   thisAdType.code = "ad=336x60;"
  break

  case '336x90':
   thisAdType.size = "336x90"
   thisAdType.code = "ad=336x90;"
  break

  case 'tooltile':
   thisAdType.size = "120x20,120x30,180x31,70x100"
   thisAdType.code = "ad=toolbox_tile;"
  break

  case '120x30':
   thisAdType.size = "120x30"
   thisAdType.code = "ad=120x30;"
  break

  case 'comment':
   thisAdType.size = "120x30"
   thisAdType.code = "ad=comment;"
  break

  case 'sponsor':
   thisAdType.size = "88x31"
   thisAdType.code = ""
  break

  case '264x90':
   thisAdType.size = "264x90"
   thisAdType.code = "ad=264x90;"
  break

  case 'twitter':
   thisAdType.size = "1x1"
   thisAdType.code = "ad=twitter;"
  break

  case 'flip':
   thisAdType.size = "1x1"
   thisAdType.code = "ad=flip;"
  break

  case 'hive_textlinks':
   thisAdType.size = "1x1"
   thisAdType.code = ""
  break

  case '167x115':
   thisAdType.size = "167x115"
   thisAdType.code = "ad=167x115;"
  break

  case 'agoogleaday':
    thisAdType.size = '1x1';
    thisAdType.tile = 'ad=agoogleaday;';
  break

  case 'meebo':
    thisAdType.size = '55x21';
    thisAdType.tile = 'ad=meebo;';
  break

  case 'video':
   thisAdType.adServer = 'http://ad.doubleclick.net/pfadx/'
   thisAdType.code = "ad=video"
   thisAdType.adExecute = function (currentLoc,varDcCount,what,delivery)
   {
    if(typeof config == 'undefined')
    {
     config = new Array();
    }
    config['adServerURL'] = this.adServer + currentLoc + ";" + this.code + ";" + thisAdType.testAction(thisAdType.testFlagArray) + ";";
    config['additionalAdTargetingParams'] = ';' + this.dcCode

    for(var x in this.debugFlagArray)
    {
     if (location.href.match(this.debugFlagArray[x]))
     {
      this.debugAction()
     }
    }
   }

   thisAdType.debugAction = function()
   {
    var output = "config['adServerURL']:" + config['adServerURL'] + "\n\r"
    output += "config['additionalAdTargetingParams']:" + config['additionalAdTargetingParams'] + "\n\r"
   }
  break
 }

return thisAdType
}
//this translates from the old placeAd to the new one




function placeAd()
{
 var transArray = new Array('','leaderboard','bigbox','120x240top','skyscraper','featurebar','120x240bottom','1x1','120x60','tiffanytile','','rightflex','rightflex','toolbar')
 placeAd2(arguments[1],transArray[arguments[0]],false,'')
}

//detects msn cobranding status--once a page
function msnCobrand()
{
 if (typeof this.msnReturnValue == 'undefined')
 {
  this.msnReturnValue='msn_refer=n;'
  if (typeof msn_cobrand != "undefined")
  {
   if (msn_cobrand != 0)
   {
    this.msnReturnValue='msn_refer=y;';
   }
  }
 }

 return this.msnReturnValue
}
//this is to for targeting ads to specific pages on fray==returns frayId
function frayId()
{
 //if fray is in the query string and id= has a query string value, return id=value
 returnValue =  (location.href.match('fray') && getQSValue('id')!='')?"frayId="+getQSValue('id')+";":""
 //this is a hack
 returnValue += (document.getElementById && document.getElementById( 'threadname' ) && getQSValue( 'tp',document.getElementById( 'threadname' ).getAttribute( 'href' ) ) == 'fixfray' )?"kw=cisco_landing;":""
 return returnValue
}

function articleId(){
  return (typeof wp_meta_data !== 'undefined' && wp_meta_data.page_id) ? 'articleId='+ wp_meta_data.page_id +';' : '';
}

function front()
{
  if(typeof this.frontReturnValue != 'undefined')
  {
    return this.frontReturnValue;
  }


  this.frontReturnValue = 'front=' + ((location.href.match('/view/') || location.href.split('?')[0].match(/http:\/\/www.slate.com\/*$/gi))?'y':'n') + ";"
  return this.frontReturnValue
}

var wpad = typeof wpad !== 'undefined' ? wpad : {};

wpad.getmetakw = function(){
  if(typeof commercialNode !== 'undefined' && commercialNode === 'homepage')return  ''; //no <meta name="keywords"> on homepage

  var obj = {// obj is set up this way so that we can easily add to it if necessary
    '!c' : {
      natural_disaster : ['attack', 'disaster', 'fire', 'explosion', 'oil', 'coal', 'death', 'dead', 'quake', 'earthquake', 'tsunami', 'tornado', 'hurricane', 'flood'],
      human_disaster : ['spanair', 'sex abuse','aground', 'rescue', 'attack', 'disaster', 'explosion', 'war', 'hostage', 'terror', 'terrorist', 'bomb', 'blast', 'mining', 'miner', 'violence', 'riot', 'plane crash', '9/11', 'sept. 11', 'september 11'],
      business_disaster : ['attack', 'disaster', 'exxon', 'goldman', 'mortgage', 'Insurance', 'health', 'bank'],
      goldman : ['aig','fraud','foreclosure','litton','mortgage','sec','investigation','inquiry','bonus','travel','goldman','sachs']
    }
  },
  rv='', meta, l, keywords, key, val, len, regex;

   /* if(typeof wp_meta_data !== 'undefined' && wp_meta_data.keywords){
        keywords = wp_meta_data.keywords.join(",").toLowerCase();
    }
    else{*/
        meta = document.getElementsByTagName('meta');
        l = meta.length;
        while(l--){
            if( (meta[l].getAttribute('name') === 'description' || meta[l].getAttribute('property') === 'og:description' ) && meta[l].getAttribute('content')){
                keywords = meta[l].getAttribute('content').toLowerCase();
                break;
            }
        }
   // }
  if(typeof keywords === 'string'){
    for(key in obj){
      for(val in obj[key]){
        regex = '\\b';
        len = obj[key][val].length;
        while(len--){
          regex += (obj[key][val][len] + '(|s|es|ed|ing|ers)' + (len !== 0 ? '\\b|' : '') + '\\b');
        }
        if(keywords.search(new RegExp(regex,'i'))!==-1){
          rv += key + '=' + val + ';';
        }
      }
    }
  }
  return rv;
};

function hackBin(_arg,currentLoc,what,delivery,onTheFly)
{

  var hackReturnValue = eval(_arg)
  switch(_arg)
  {
    case 'currentLoc':



           //this has to be here for now because wp_meta_data is below our ad scripts
            if(!wpad.metakw){
                wpad.metakw = wpad.getmetakw();
            }

       if(typeof commercialNode != 'undefined' && hackReturnValue != commercialNode)
      {
        hackReturnValue = commercialNode;
      }
       if(currentLoc == 'fray')
       {

        hackReturnValue = 'arts/fray';

       }
        //13123-MB
      //hackReturnValue += ( what == 'leaderboard' || what == 'rightflex' || what == 'midarticleflex' ) ? ('/' + what) : '';
      //illegal substrings: slate., slate or marginad zones, slash at end, and spaces
      hackReturnValue = hackReturnValue.replace(/(^slate\.)|(\/(slate|marginad)(?=\/|$))|(\/$)| /gi,'');
      hackReturnValue.replace(/ /gi,'_');

      if(what == 'rightflex' && currentLoc == 'homepage')
      {
        hackReturnValue += '/hp';
        hackReturnValue += ( location.href.match('reload=true') ) ? 'refresh' : '';
      }

      if(currentLoc.match("/photo")){
        tileThatGetsDcopt = 0;
      }


    break;

    case 'onTheFly':
      if(location.href.match('/slideshow/') || commercialNode.match("/photo")){
        hackReturnValue += '!c=media;'
      }
      //10834-MB
      hackReturnValue += (urlCheck(/default\.aspx\?id\=3944/))?'search=y;':'';

      //12162-CS
      hackReturnValue += (urlCheck('/emailafriend'))?'kw=emailsend;':'';
      hackReturnValue += (urlCheck('/emailConfirmation'))?'kw=emailconf;':'';

      //15694-ML
      if(typeof commercialNode!=='undefined' && commercialNode==='doonesbury'){
        hackReturnValue += '!c=intrusive;';
      }

      //16253-ST
      hackReturnValue += wpad.metakw;

      //18477-CD-CRITEO implementation
      if( typeof crtg_content !== 'undefined' ){
        hackReturnValue += crtg_content;
      }

    break;
  }
  return hackReturnValue
}
