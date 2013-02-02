
jQuery.fn.reloadAds= (function($){ 
return function(){
  this.find("[data-ngsadid]").each(function(idx){
    var adid = $(this).attr("data-ngsadid")
    WPF_admanager && WPF_admanager.displayAd( adid )
  }); 
}
})(jQuery);
// helper for determining string endings
String.prototype.endsWith = function(str){
  var lastIndex = this.lastIndexOf(str);
  return (lastIndex != -1) && (lastIndex + str.length == this.length);
}

// hide article text until paginated
if($('.article_text').length > 0) {
  $('.article_text').addClass("hidden");
}

// triggers styles for js enabled users
$('html').addClass('js');

//ensure we don't overwrite an existing instance
if (!window.addthis_share) {
    var addthis_share = {};
}

//declare how and where to use url shortening
window.addthis_share.url_transforms = {
    shorten : {
        twitter: 'bitly'  
    }
};

//configure our url shortening service
window.addthis_share.shorteners = {
    bitly: {
        login: 'natgeo',
        apiKey: 'R_62083d1fa7328bb178db7ffd7d496df9'
    }
}

// Page check to see if Nirvana body class needs to be added for NGM contests
function nirvanaPageCheck() {
    var path = [];
    path = window.location.pathname.split("/");
    for (var i in path) {
      if (path[i].length && path[i] === "photo-contest") {
        if (!$("body").hasClass("nirvana")) {
          $("body").addClass("nirvana");
        }
      }
    } 
};

/* $(document).ready() code -- executed after page load completes */
$(document).ready(function() {
    var $dl = $('div.dl'),
        $newsletter = $('#newsletter input'),
        $carousel = $('div.carousel'),
        $factSlides = $carousel.find('.fact_slides');

  /*---- DL Code ----*/
  if( ($dl.length > 0) && (typeof($.fn.dynamiclead) != "undefined") ) {
    $dl.find('h3').addClass('hidden');
    $dl.find('.credit').removeClass('hidden');

    $dl.find('ul').dynamiclead({
      slideArray: ((typeof(DLslides)!="undefined")?DLslides:[{url:'',link:'',headline:'',caption:''}])
        });
  }

  /*---- Put label text inside input for Newsletters ----*/
  if($newsletter.length > 0) {
    $newsletter.labelify({ text: "label" });
  }


  /*---- Initialize Carousels ----*/
// callback function exclusively for Kids Carousel
function kidsCarouselInitCallback(carousel, state) {
    if (state == "init" || state == "reset") {
    $("ul.kidscarousel.jcarousel-list-horizontal li").each(function(index) {
      var kcTitle = $(this).children("a").attr("title");
      var kcHref = $(this).children("a").attr("href");
      $(this).prepend('<a class="kidscarousel_frame" href="'+kcHref+'" title="'+kcTitle+'">&nbsp;</a>');
      $(this).children("a.kidscarousel_frame").hover(
        function () {
          $(this).next("a").next("p").children("a").addClass("pretty_underline");
        },
        function () {
          $(this).next("a").next("p").children("a").removeClass("pretty_underline");
        }
      );
    });

  }
};

// callback function when an item becomes the first one visible
function mycarousel_itemFirstInCallback(carousel, item, idx, state) {
  $(item).next().removeClass("carousel_first_visible");
  $(item).addClass("carousel_first_visible");
};

// callback function when an item is no longer the first one in the visible range
function mycarousel_itemVisibleOutCallbackAfterAnimation(carousel, item, idx, state) {
    $(item).removeClass("carousel_first_visible");
};

    if($carousel.length > 0) {
        $factSlides.jcarousel({
            scroll: 1,
            visible: 1,
            initCallback: fact_slides_initCallback,
            itemFirstInCallback: fact_slides_itemFirstInCallback
        });
        if($factSlides.find('.jcarousel_prev').length > 0) {
            $factSlides.find('.jcarousel_prev').after();
        }
		
		$carousel.each(function(){

			var $currentCarousel = $(this);
			
			if (!($currentCarousel.is(':hidden') || $currentCarousel.parents(':hidden').length)) {
	
		        $currentCarousel.find('.one').jcarousel({
		            scroll: 1,
		            visible: 1
		        });
		
		        $currentCarousel.find('.three').jcarousel({
		          scroll: 3,
		          visible: 3
		        });
		
		        $currentCarousel.find('.seven').jcarousel({
		          scroll: 7,
		          visible: 7
		        });
		
		        $currentCarousel.find('.four').jcarousel({
		            scroll: 4,
		            visible: 4
		        });
		
		        $currentCarousel.find('.kidscarousel').jcarousel({
		            scroll: 4,
		            visible: 5,
		            initCallback: kidsCarouselInitCallback
		        });
		
		        $currentCarousel.find('.kidsecommercecarousel').jcarousel({
		            scroll: 1,
		            visible: 3,
		            itemFirstInCallback:  mycarousel_itemFirstInCallback,
		            itemVisibleOutCallback: {
		                onAfterAnimation:  mycarousel_itemVisibleOutCallbackAfterAnimation
		            }
		        });
		
		        $currentCarousel.find('.magazine').jcarousel({
		          scroll: 5
		        });
		
		        $currentCarousel.find('.iphone').jcarousel({
		          scroll: 2,
		          visible: 2
		        });
		
		        $currentCarousel.find('.restrain').removeClass('restrain');
			}
		});

        $('ul.magazine li:nth-child(5n), ul.magazine li:last').css('border', 'none');

        if ($('ul.magazine li').length == 5) {
            $('.magazine div.jcarousel-prev, .magazine div.jcarousel-next').hide();
          } else {
              $('.magazine div.jcarousel-prev, .magazine div.jcarousel-next').show();
        }
    }
    /*---- Build link list columns ----*/
    $(' .columns > ol, .columns > ul').each(function() {
        var $this = $(this);
        if (!($this.parent().parent().hasClass('full_width'))) {
            $this.columns({
                cols:2
            });
        }else {
            $this.columns({
                cols:3
            });
        }
    });
  /*---- Share Button Home Code ----*/
  if($('body.home #share, body.level_2 #share').length > 0) {
    $('body.home #share, body.level_2 #share').addClass('collapsed');
  }
  if($('#nav_share').length > 0) {
    $('#nav_share li a').addClass('hiddenText');
    $('#nav_share li').slice(4).addClass('hidden');
    $('#nav_share').append('<li class="more_link"><a href="">More</a></li>');
    var moreLink = $('#nav_share .more_link');
    moreLink.click(function () {
      $('#share').toggleClass('collapsed');
      $('#nav_share li').slice(4, -1).toggleClass('hidden');
      if (moreLink.text() =='More'){
        moreLink.html('<a href="">Collapse</a>');
      } else {
        moreLink.html('<a href="">More</a>');
      }
      return false;
    });
  }
  /*---- Hide Share Email Form ----*/
  if($('#share_email').length > 0) {
    $('#share_email').addClass('hidden');
  }
  /*---- Prepend Print Link to Article Rating div ----*/
  // Causing some error, possibly related to Share Links scripts; user not affected - LB 061009
  if($('#article_rating').length > 0) {
    $('#article_rating').before('<div id="print_link"><a href="#" onclick="ngsprint();return false;">Printer Friendly</a></div>');
  }
  /*---- Most Popular Tabs Code ----*/
  if($('div.tabbed_box').length > 0) {
    $('div.tabbed_box').each(function() {
      // Show just the first tab
      var sections = $('.popularity_type', this);
      sections.hide();
      $(sections[0]).show();

      // Build the tab-links
      var ul = $('<ul class="nav nav_tabbed">');
      sections.each(function(index) {
        var section_obj = $(this);
        var heading = $('h4', this).html();
        var li = $('<li class="nav_0'+(index+1)+'">');
        $('h4', this).remove();
        li.append(
          $('<h4><a href="#">'+heading+'</a></h4>').click(function() {
            // Show just this section.
            sections.hide();
            section_obj.show();

            // And mark just this tab
            tabs.removeClass('selected');
            li.addClass('selected');
            return false;
        }));
        ul.append(li);
      })

      $('div.wrap', this).before(ul);

      // Compile the list of new tabs we just made, and select the first one.
      var tabs = $('li', ul);
      $(tabs[0]).addClass('selected');
    });
  }
  /*---- Table Striping ----*/
  if($('table.striped').length > 0) {
    $('table.striped tr:odd').addClass('striped');
    //$('table.striped tr:odd').css('background-color','#f4f4f4');
  }
  /*---- Article Rating functionality ----*/

  /*---- Video Icon Overlay ----*/
    if($('.video').length > 0) {
    $('.video').each(function(){
          var vid_thumb_width = $('img', this).attr('width');
          if (vid_thumb_width == 160) {
              var overlay_position = 10;
          } else {
              var overlay_position = 5;
          };
          var vid_link = $('a', this).attr('href');

          if (vid_thumb_width == 160 || vid_thumb_width == 100) {
              $('img', this).after('<img src="'+((typeof(staticURL)!="undefined")?staticURL:'/')+'sites/common/i/presentation/video_overlay.png" class="overlay" alt="Video Icon Overlay" style="left: '+ overlay_position +'px; bottom: '+ overlay_position +'px;"/>');
          };
      });
  }

  /*---- Article Pagination functionality ----*/
  // check for the article content container by class
  if(typeof pageSet != "undefined" && $('.article_text').length > 0) {
    // create a new pageSet object
    articlePages = new pageSet({
      oPageContainer:((typeof($)!="undefined")?$(".article_text")[0]:document.getElementsByClassName('article_text')[0]),
      oMatchRE:new RegExp("page_*break"),
      strMatchTagName: "comment",
      activePageIndex:jss.current_page(),
      pageItemClass: "article-page-item",
      callback: function(delaySecs) {
        delaySecs=((delaySecs&&!isNaN(parseInt(delaySecs)))?parseInt(delaySecs):.5);
        if(typeof(ngsPageView)!="undefined") {
          if(typeof(callTmr)!="undefined"){
            clearTimeout(callTmr);
          };
          callTmr = setTimeout("ngsPageView();",(delaySecs*1000));
        }
      }
    });

    if(articlePages.pages.length>1) {
      $($(".article_text").get(0)).append('<div class="nav-article-pages pagination"></div>');
      $(".nav-article-pages").pagination(Math.ceil(articlePages.pages.length), {
        items_per_page:1,
        num_display_entries: 14,
        current_page: jss.current_page(),
        callback:articlePages.viewPage,
        link_to: "#"+articlePages.hashVar+"=__id__",
        prev_text: "&laquo; Previous",
        next_text: "Next &raquo;"
      });
      articlePages.viewPage(articlePages.activePageIndex);
      articlePages.readyState = "4:COMPLETED";
    }
    $('.article_text').removeClass("hidden");
  }

  if(FlashApps[0] != undefined){ loadFlashApps();}
  if(rssFeeds[0] != undefined){ loadRssReaders();}
  if(factsBoxes[0] != undefined){ loadFactsBoxes();}
  if(typeof(VEMaps)!="undefined" && typeof(VEMaps[0]) != "undefined" && VEMaps[0] != undefined) {loadVEMaps();}
  if(typeof(oneMaps)!="undefined" && typeof(oneMaps[0]) != "undefined" && oneMaps[0] != undefined) {loadOneMaps();}

  /*---- Set Equal Heights on Columns ----*/
  if ($.fn.equalHeights) {
    $('.homepage .subsection, .homepage #content_page_specific, .article .subsection, .small_article .subsection, .home .subsection, .article #content_page_specific, .small_article #content_page_specific, .home #content_page_specific, .level_2 #content_page_specific, .level_2 #content_page_specific .subsection, .a_z #content_page_specific, .mobile .promo_collection .horizontal, .subscriptions, .subscriptions2, .mobile .small_article').not('.natgeov .subsection, nav .subscriptions').equalHeights(true);
  }
  /*---- Collapse Any Empty Ad Units ----*/
  var kidsSecondaryAd = ((document.getElementById("advertisingModule210x50") && document.getElementById("advertisingModule210x50").length > 1)?document.getElementById("advertisingModule210x50")[0]:((document.getElementById("advertisingModule210x50"))?document.getElementById("advertisingModule210x50"):false));
  if(kidsSecondaryAd) {
      collapseEmptyHeaderAds();
    if (kidsSecondaryAd && $(kidsSecondaryAd).find('iframe').length > 0) {
      $(kidsSecondaryAd).find('iframe').get(0).onload = function() { collapseEmptyHeaderAds(); };
    }
  } else {
    collapseEmptyHeaderAds({expandDuration:888});
  }
  getLoadTimes();
});

/*---- Print function ----*/
function ngsprint() {
  window.print();
}

jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
  validLabels = /^(data|css):/,
  attr = {
    method: matchParams[0].match(validLabels) ? matchParams[0].split(':')[0] : 'attr',
    property: matchParams.shift().replace(validLabels,'')
  },
  regexFlags = 'ig',
  regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
  return regex.test(jQuery(elem)[attr.method](attr.property));
}

getLeadingZeros  = function(opts) {
  var n = ((typeof(opts['n'])!="undefined"&&!isNaN(parseInt(opts['n'])))?opts['n']:0);
  var digits = ((typeof(opts['digits'])!="undefined"&&!isNaN(parseInt(opts['digits'])))?opts['digits']:3);
  return ((n.toString().length>=digits)?n:( (n + 1) * parseFloat( parseFloat('0').toFixed( digits - 1 ) + 1 ) ).toFixed(digits).toString().split('.')[1]);
}

/* FUNCTION: wrapByRegEx({parentSelectorText:[STRING],matchRegEx:[REGULAR EXPRESSION or ARRAY OF REGULAR EXPRESSIONS],wrapHTML:[STRING or ARRAY OF STRINGS],idDigits:[NUMBER]})
--- wraps matching text nodes with supplied HTML snippet, using id attribute if [[id]] is present in the HTML snippet and idDigits > 0  ---
*/
wrapByRegEx = function(opts) {
  var parentSelectorText = ((typeof(opts["parentSelectorText"])!="undefined")?opts["parentSelectorText"]:null);
  if(parentSelectorText==null) {
    return false;
  }
  var idDigits = ((typeof(opts["idDigits"])!="undefined"&&!isNaN(parseInt(opts["idDigits"])))?parseInt(opts["idDigits"]):-1);
  var matchRegEx = ((typeof(opts["matchRegEx"])!="undefined")?((typeof(opts["matchRegEx"])!="string"&&typeof(opts["matchRegEx"].length)!="undefined")?opts["matchRegEx"]:[opts["matchRegEx"]]):null);
  var wrapHTML = ((typeof(opts["wrapHTML"])!="undefined")?((typeof(opts["wrapHTML"])!="string"&&typeof(opts["wrapHTML"].length)!="undefined")?opts["wrapHTML"]:[opts["wrapHTML"]]):null);
  var s_regExCombined = "";
  var is_ignoreCase = false;
  $(matchRegEx).each(function(i){
    s_regExCombined += "("+this.source + ")"+((i==matchRegEx.length-1)?"":"|");
    is_ignoreCase = ((this.ignoreCase)?true:is_ignoreCase);
  });
  var combinedMatchRegEx = new RegExp(s_regExCombined,((is_ignoreCase)?"i":""));
  var n = 1;
  var a_allNodes = $(parentSelectorText)
  .contents()
  .filter( function() {
    if((this.nodeType == Node.TEXT_NODE) && (this.data+'').match(combinedMatchRegEx)!=null) {
      var s_nodeData = (this.data+'');
      var o_textNode = this;
      $(matchRegEx).each(function(i){
        if(s_nodeData.match(this)) {
          var s_matchFlags = ( (this.ignoreCase) ? "i":"" ) + ( (this.global) ? "g":"" ) + ( ( this.multiline)?"m":"" );
          var matchRE = ( ( (this.source+'').match(/(^|[^\\])\(|[^\\]\)/) ? this : new RegExp( "(" + this.source + ")" , s_matchFlags ) ) );
          var is_useMatchText = (wrapHTML[i].match(/\[\[matchText\]\]/) != null);
          var s_wrapped = ( (idDigits) ?
            wrapHTML[i].replace( /\[\[id\]\]/g, getLeadingZeros({n:n,digits:idDigits}) ) :
            wrapHTML[i] );
          var s_wrapped = ( (is_useMatchText) ? s_wrapped.replace(/\[\[matchText\]\]/gi,"\$1") : s_wrapped);
            var s_replaceText = s_nodeData.replace( matchRE , s_wrapped );
            $(o_textNode).replaceWith(s_replaceText);
          n++;
        }
      });
    }
  });
}

parseXML = function(xml) {
  if( window.ActiveXObject && window.GetObject ) {
    var dom = new ActiveXObject( 'Microsoft.XMLDOM' );
    dom.loadXML( xml );
    return dom;
    }
    if( window.DOMParser ) {
    return new DOMParser().parseFromString( xml, 'text/xml' );
  }
    throw new Error( 'No XML parser available' );
}


// NG RICH MEDIA FUNCTIONS
var FlashApps = [];
addFlashApp = function(dataObj){
  FlashApps.push(dataObj);
}

loadFlashApps = function(){
  var totApps = FlashApps.length;
  for(var i=0;i<totApps;i++){
    createFlashObject(FlashApps[i]);
  }
}
createFlashObject = function(dataObj){
  $(dataObj.div).css("visibility","visible");
  if(dataObj.customXML){
    loadSWF();
  } else {
    var richMediaXML;
    parseRichMediaXML();
  }
  function parseRichMediaXML(){
    try {
      richMediaXML = parseXML(dataObj.currentXML);
    } catch(err) {
      $(dataObj.div).append("<p><strong>ERROR PARSING XML</strong></p>");
    }
    loadSWF();
  }
  function loadSWF(){

    var params = {};
    params.allowscriptaccess = "always";
    if(dataObj.type == "Quiz"){
        params.wmode = "transparent";
        params.scale = "exactfit";
    } else if(dataObj.type == "game"){
        params.wmode = "window";
        params.scale = "noscale";
    } else if(dataObj.type == "Quiz - Travel Country"){
        params.wmode = "opaque";
        params.scale = "default";
    } else {
        params.wmode = "opaque";
        params.scale = "noscale";
    }

    params.menu = "false";
    params.quality = "best";
    params.bgcolor = dataObj.bgcolor;
    params.base = dataObj.filePath;
    params.salign = "tl";

    //Javascript workaround until the Object tag is working
    var tempSite = window.location.host;
    var siteDomain = "http://" + tempSite;

    var flashvars = {};
    flashvars.css = dataObj.css;
    flashvars.siteDomain = siteDomain;

    // For Dynamic content that needs dimensions\\\\\\\\\\\\\\\\\
    flashvars.width = dataObj.width;
    flashvars.height = dataObj.height;

    // QUIZ ////////////////////////////////////////////////////
    flashvars.cssFile = flashvars.css;
    flashvars.imagePath = dataObj.filePath;
    flashvars.parentDiv = dataObj.parentDiv;
    // END QUIZ \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    if(dataObj.customXML){
      flashvars.xml = dataObj.xmlURL;
      flashvars.xmlfile = dataObj.xmlURL;// for quizzes
      flashvars.xmlFile = dataObj.xmlURL;// for other interactives
    } else {
      if(dataObj.xml != ""){
        flashvars.xml = dataObj.xml;
        flashvars.xmlfile = flashvars.xml;// For quizzes
        flashvars.xmlFile = flashvars.xml;// For other interactives
      }
      $(richMediaXML).find("richmedia").children().each(function(){
        flashvars[this.tagName] = $(this).text();
      });
    };

    var attributes = {};
    attributes.id = dataObj.slug;

    if(dataObj.width == undefined||dataObj.width == ""||dataObj.height == ""||dataObj.height == undefined||dataObj.version == ""||dataObj.version == undefined){
      $(dataObj.div).append("<p><strong>ERROR IN RICH MEDIA TYPE: Please check your settings</strong></p>");
      return;
    } else {
      swfobject.embedSWF(dataObj.flashURL, dataObj.slug, dataObj.width, dataObj.height, dataObj.version, false, flashvars, params, attributes);
    }
  }
}


loadGalleryVideo = function(div,slug,siteid,w,h,adenabled,autoplay){
  var params = {allowfullscreen:true,allowscriptaccess:"always",wmode:"opaque",menu:"false",quality:"best",bgcolor:"#FFFFFF",scale:"noscale",salign:"tl"};
  var flashvars = {slug:slug,siteid:siteid,adenabled:adenabled || 'true',autoplay:autoplay || 'true'};
  var attributes = {id:slug};
  var noFlashStr = '<img style="vertical-align:middle;" width="30" height="30" alt="Adobe Flash Player" src="http://wwwimages.adobe.com/www.adobe.com/shockwave/download/images/flashplayer_100x100.jpg"/> This video requires the latest version of Flash Player. <a href="http://get.adobe.com/flashplayer/">Click here to download.</a>';

  if(w == undefined) w = 437;
  if(h == undefined) h = 246;
  var fW = String(w);
  var fH = String(h+31);

  flashvars.width = w;
  flashvars.height = h;

  swfobject.embedSWF("http://images.nationalgeographic.com/wpf/sites/video/swf/ngplayer_satellite.swf", div, fW, fH, "9", false, flashvars, params, attributes, loadH5Video);

  function loadH5Video(e){
    var useragent = navigator.userAgent;
    var supported = false;

    if(useragent.search('iPhone') >= 0 || useragent.search('iPad') >= 0) supported = true;
      else if(useragent.search('Safari')){
      var sPos = useragent.indexOf('Intel Mac OS X ')+15;
      var ePos = useragent.indexOf(';',sPos);
      var version = useragent.substring(sPos,ePos).split('_');

      if(parseInt(version[0]) >= 10 && parseInt(version[1]) >= 6) supported = true;
    }

    if(!e.success && supported){
      $('#'+div).html("<video style='background-color:#000;' src='http://h5media.nationalgeographic.com/video/player/media-mp4/"+slug+"/mp4/variant-playlist.m3u8' poster='http://video.nationalgeographic.com/video/player/media/"+slug+"/"+slug+"_480x360.jpg' controls width='"+w+"' height='"+h+"'></video>");
    }
    else {
      $('#'+div).html(noFlashStr);
    }
  }
}


loadVideo = function(div,slug,siteid,w,h,adenabled,autoplay){
 // Add the video script to the document header
  var headID = document.getElementsByTagName('head')[0];         
  var videoScript = document.createElement('script');
  var videoPlayerURL = (siteid == 'videoplayerkids') ? "sites/video/swf/ngkidsplayer_v2.1.swf" :"sites/video/swf/ngplayer_v2.5.swf";

  videoScript.type = "text/javascript";
  videoScript.src = staticURL+'sites/video/j/natgeov-video.js';
  headID.appendChild(videoScript);

  // Add the geolocater script to the document header
  var geoScript = document.createElement('script');
  geoScript.type = "text/javascript";
  geoScript.src = "http://j.maxmind.com/app/country.js";
  headID.appendChild(geoScript);

  // Wait for video script to completely load before continuing
  videoScript.onload = videoScript.onreadystatechange = function() {
    var done, _ref;
    if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
        done = true;
        
      // Access video data and construct embed code to pass to NGPlayer
      $.getJSON("http://" + window.location.host + "/video/api/get/video/by-slug/" + slug + "/json/?callback=?", null, function(jsonp) {
          var videoslug = jsonp.video.smil;
          if(window.location.host == "localhost"||window.location.host.substr(0,1) == "1"){
            var tempslug = videoslug.split('.com');  
            videoslug = "http://" + window.location.host + tempslug[1];
          }
		var vpOptions = new NGPlayer.Options({
          $container        : $('#'+div+''),
          slug              : videoslug,
          title             : jsonp.video.title,
          caption           : jsonp.video.description,
          poster            : jsonp.video.still,
          restricted        : "" || "false",  
          siteid            : siteid,
          permalink         : jsonp.video.url,
          width             : w || 437,
          height            : h || 246,
          autoplay          : autoplay || "true",
          bgcolor           : "#FFF",
          share             : (siteid == "videoplayerkids") ? "false" : "true",
          allowEmbed        : (siteid == "videoplayerkids") ? "false" : "true",
          cuepoints         : jsonp.video.cuepoints || "",          
          swfURL            : staticURL+videoPlayerURL,
          adenabled         : adenabled || "true",
          adprogramid       : "4a67dd6268de7",
          HTML5src          : jsonp.video.HTML5src,
          isKids            : (siteid == "videoplayerkids")
        });

        // Adjust height for Flash encoded videos but not HTML5
        // This is not feature detection as our current encoding is specific for iOS
        // A more accurate and future appropriate test will need to be written once videos are re-encoded
        if ((/ipod|ipad|iphone/).test(navigator.userAgent.toLowerCase()) === false) {
          vpOptions.height = vpOptions.height + 31;
        }

        // Update poster URL with hostname from permalink if it does not contain a full URL
        // Partial URLs start with a leading slash
        if (!vpOptions.poster.match(/(http:\/\/|https:\/\/)/igm)) {
          vpOptions.poster = "http://" + vpOptions.permalink.match(RegExp('^(?:f|ht)tp(?:s)?\://([^/]+)', 'im'))[1] + jsonp.video.still;
        }

        // If still does not exist, use legacy image
        if (!vpOptions.poster || vpOptions.poster == '') {
          vpOptions.poster = "http://video.nationalgeographic.com/video/player/media/"+slug+"/"+slug+"_480x360.jpg";
        }

        // Update the DART Ad Program ID if this is a Kids site
        if (window.location.hostname === "kids.nationalgeographic.com"||siteid == "videoplayerkids") {
          vpOptions.adprogramid = "4fa81b8d31446";
        }

        // Generic function to convert an array to an object
        function objConv(a) {
          var o = {};
          for(var i=0;i<a.length;i++)
          {
            o[a[i]]='';
          }
          return o;
          }
        
        // Determine if video is restricted in the user's country
        country_code = geoip_country_code();

        if (jsonp.video.is_us_only === "true") {
          if (country_code === "US") {
            vpOptions.restricted = "false";
          } else {
            vpOptions.restricted = "true";
          }
        } else if (jsonp.video.is_us_only === "false") {
          denyList = objConv(jsonp.video.country_code_deny_list);
          allowList = objConv(jsonp.video.country_code_allow_list);

          if (country_code in denyList) {
            vpOptions.restricted = "true";
          } else if (!country_code in denyList || denyList == "undefined") {
            if (country_code in allowList) {
              vpOptions.restricted = "false";
            } else {
              vpOptions.restricted = "false";
            }
          }
        } else {
          vpOptions.restricted = "false";
        }

        // Let's start the show!
        window.videoPlayer = new NGPlayer(vpOptions);
      });
    }
  }  
}

// INTERACTIVE MAP FUNCTIONS
var VEMaps = [];
addMapToPage = function(mapObj){
  VEMaps.push(mapObj);
}

loadVEMaps = function(){
  for(var i=0;i<VEMaps.length;i++){
    renderVEMap(VEMaps[i]);
  }
}

renderVEMap = function(mapObj){
  var bingMap = null;
  bingMap = new VEMap(mapObj.div);
  bingMap.LoadMap(new VELatLong(mapObj.latitude,mapObj.longitude), mapObj.zoom, mapObj.viewType, mapObj.lockMap);
  if(mapObj.showMini)bingMap.ShowMiniMap(mapObj.miniXposition, 5);
  if(!mapObj.showTools)bingMap.HideDashboard();
}

//ONEMAP FUNCTIONS
var oneMaps = [];
addOneMapToPage = function(mapObj){
  oneMaps.push(mapObj);
}

loadOneMaps = function(){
  for(var i=0;i<oneMaps.length;i++){
    renderOneMap(oneMaps[i]);
  }
}

renderOneMap = function(mapObj){
  $(mapObj.div).RenderOneMap({collection_id:mapObj.collection_id, search:null, fixed:mapObj.fixed, DefaultTileset:mapObj.tile_set, DefaultLat:mapObj.latitude, DefaultLon:mapObj.longitude, DefaultZoom:mapObj.zoom});
  //collection_id: coll_id,    //To load a single collection worth of results (not used with search:)
    //search: searchterm,        //A string value used to filter results (not used with collection_id:)
    //fixed: false,           //Stops the map from moving
    //DefaultTileset: null,   //Takes an id value for a tileset (you can check the values using the REST svc)
    //DefaultLat: null,       //Map Center Lat/Lon in float-parseable format
    //DefaultLon: null,
    //DefaultZoom: null       //Map Zoom level from 1-21
}


//Carousel Callback

function fact_slides_initCallback(carousel) {
    var count = $('ul.fact_slides li').length;
    $('div.fact_slides .jcarousel-prev').after('<p class="count"><span class="current"></span> of '+count+'</p>');
};


function fact_slides_itemFirstInCallback(carousel, idx, item) {
   $('div.fact_slides span.current').html(item);

};

var taxonomy;
var hasTaxonomy = false;
function highlightNavItem(){
  var navClass;
  if(taxonomy.site == 'environment.nationalgeographic.com'){
    navClass = '#navigation_tophat_primary li.nav4 ul li:contains('+taxonomy.name+')';
  } else if(taxonomy.site == 'photography.nationalgeographic.com'){
    navClass = '#navigation_tophat_primary li.nav2 ul li:contains('+taxonomy.name+')';
  } else if(taxonomy.site == 'travel.nationalgeographic.com'){
    navClass = '#navigation_tophat_primary li.nav5 ul li:contains('+taxonomy.name+')';
  } else if(taxonomy.site == 'animals.nationalgeographic.com'){
    navClass = '#navigation_tophat_primary li.nav3 ul li:contains('+taxonomy.name+')';
  } else if(taxonomy.site == 'adventure.nationalgeographic.com'){
    navClass = '#navigation_tophat_primary li.nav6 ul li:contains('+taxonomy.name+')';
  } else if(taxonomy.site == 'ocean.nationalgeographic.com'){
    navClass = '#navigation_tophat_primary li.nav4 ul li:contains(The Ocean)';
   } else if(taxonomy.site == 'video.nationalgeographic.com'){
    navClass = '#navigation_tophat_primary li.nav9 ul li:contains('+taxonomy.name+')';
  } else {
    return;
  }

  if($(navClass).length == 0)return;
  $(navClass).addClass('highlighted');
}


function hiLiteSubNavByTaxonomy(){
  $('#container div.general ul.nav li a').filter(function() {
      var htmlTax = taxonomy.name.replace(/&/g,"&amp;");
      var subnav = new RegExp('^ *'+taxonomy.name+' *$');
      var subnavHtml = new RegExp('^ *'+htmlTax+' *$');
      if(subnav.test($(this).html())){
      $(this).parents("li:first").addClass('selected');
    } else if(subnavHtml.test($(this).html())){
      $(this).parents("li:first").addClass('selected');
    }
  });
}

var loadTimes = {}
timerCount = function(prop){
  var curTime = new Date().getTime();
  var elapsedTime = curTime - startTime;
  loadTimes[prop] = elapsedTime;
}

getLoadTimes = function(){
  for(var timeStamp in loadTimes){
    $('#test_comments').append('<p>'+timeStamp+' = '+loadTimes[timeStamp]+' ms</p>')
  }
}

// OPA Ad functionality object
/* see #1468 comments for more detail on usage */
ngsAdvertisingOPA = function(opts) {
  var o = this;
  o.opts = ((opts)?opts:{});
  o.setOption = function(opt,val) {
    if(typeof(o[opt])=="undefined") {
      o.defaults[opt]=val;
    }
    return o[opt]=val;
  }
  o.getOption = function(v) {
    return ((typeof(o[v])!="undefined")?o[v]:((typeof(o.opts[v])!="undefined")?o.opts[v]:o.defaults[v]));
  };
  o.defaults = {
    state: 'initializing',
    height: ((o.opts && o.opts.height)?o.opts.height:66),
    onCollapse: ((o.opts && o.opts.onCollapse)?o.opts.onCollapse:null),
    onCollapseComplete: ((o.opts && o.opts.onCollapseComplete)?o.opts.onCollapseComplete:null),
    collapseHeight: ((o.opts && o.opts.collapseHeight)?o.opts.collapseHeight:66),
    collapseDuration: ((o.opts && o.opts.collapseDuration)?o.opts.collapseDuration:750),
    onExpand: ((o.opts && o.opts.onExpand)?o.opts.onExpand:null),
    onExpandComplete: ((o.opts && o.opts.onExpandComplete)?o.opts.onExpandComplete:null),
    expandHeight: ((o.opts && o.opts.expandHeight)?o.opts.expandHeight:418),
    expandDuration: ((o.opts && o.opts.expandDuration)?o.opts.expandDuration:1250),
    container: ((o.opts && o.opts.container)?o.opts.container:(($('div.pushdown.advertisement').length>0)?$('div.pushdown.advertisement').get(0):null))
  };
  o.init = function(opts) {
    var opts = ((opts)?opts:o.defaults);
    for(var d in o.defaults) {
      o[d] = o.getOption(d);
    }
    for(var v in opts) {
      o[v] = o.getOption(v);
    }
    if(typeof(o.initCallback)!="undefined") {
      o.initCallback();
    }
    o.setOption('state','initialized');
    return o;
  };
  o.collapse = function(opts) {
    if(o.container) {
      o.setOption('state','collapsing');
      if(o.onCollapse) {
        o.onCollapse();
      }
      $(o.container).animate(
        {'height':o.collapseHeight},
        o.collapseDuration,
        function() {
          o.setOption('state','collapsed');
          if(o.onCollapseComplete) {
            o.onCollapseComplete();
          }
        }
      );
    }
  };
  o.expand = function(opts) {
    if(o.container) {
      o.setOption('state','expanding');
      if(o.onExpand) {
        o.onExpand();
      }
      $(o.container).animate(
        {'height':o.expandHeight},
        o.expandDuration,
        function() {
          o.setOption('state','expanded');
          if(o.onExpandComplete) {
            o.onExpandComplete();
          }
        }
      );
    }
  };
  o.spoof = function() {
    _adModExpand = function(adO) {
      o.expand();
      $(adO).unbind('mouseover');
      $(adO).bind('click',function(){_adModCollapse(adO);});
    };
    _adModCollapse = function(adO) {
      o.collapse();
      $(adO).unbind('click');
      $(adO).bind('mouseover',function(){_adModExpand(adO);});
    };
    $(o.container).css({
      "height":o.collapseHeight,
      "background":"transparent url(http://images.nationalgeographic.com/wpf/media-live/photologue/photos/2010/02/04/cache/40731_990x742.jpg) no-repeat top center"
    });
    _adModExpand(o.container);
  };
  o.init();
}
collapseEmptyHeaderAds = function(opts){

  // get specific ad units in the header by id, inspect their value for the blank ad
  // note: pushdown is never refreshable, so will always be able to determine it's contents
  // (not sure this is possible with iframe?)

  var blankAdFilename = "817-grey.gif";
  var clearAdFilename = "1x1_clear_pixel_placeholder.gif";

  var pushdownAd = ($('#navigation_tophat_container div[id*="970x66"]') || [undefined])[0];
  if (typeof pushdownAd === "undefined") 
  {
  	pushdownAd = ($('#kids_header div[id*="970x66"]') || [undefined])[0];
  }
  var leaderboardAd = ($('#navigation_tophat_container div[id*="728x90"]') || [undefined])[0];
  if (typeof leaderboardAd === "undefined") 
  {
  	leaderboardAd = ($('#kids_header div[id*="728x90"]') || [undefined])[0];
  }  
  var secondaryAd = ($('#navigation_tophat_container div[id*="257x90"]') || [undefined])[0];
  var kidsSecondaryAd = ((document.getElementById("advertisingModule235x90") && document.getElementById("advertisingModule235x90").length > 1)?document.getElementById("advertisingModule235x90")[0]:((document.getElementById("advertisingModule235x90"))?document.getElementById("advertisingModule235x90"):null));

  var foundEmptyAd = 0;
  if (pushdownAd) {
    var html = pushdownAd.innerHTML;
    if ((html.indexOf(blankAdFilename) != -1)||(html.indexOf(clearAdFilename) != -1)) {
      foundEmptyAd = 1;
    } else /* found real pushdown ad, instantiate an 'ngsAdvertisingOPA' object */ {
      opa_ad = new ngsAdvertisingOPA();
    }
  }
  if (kidsSecondaryAd && $(kidsSecondaryAd).find('iframe').length > 0 && $($(kidsSecondaryAd).find('iframe').get(0).contentWindow.document).find('img').length > 0) {
    var ad_img_src = $($(kidsSecondaryAd).find('iframe').get(0).contentWindow.document).find('img').attr('src');
    if ((ad_img_src.indexOf(blankAdFilename) != -1)||(ad_img_src.indexOf(clearAdFilename) != -1)) {
      $(kidsSecondaryAd).remove();
      kidsSecondaryAd = null;
    }
  }

  // set the kidsSecondaryAd to 'secondaryAd' for the efficiency of the logic below
  secondaryAd = ((!secondaryAd && kidsSecondaryAd) ? kidsSecondaryAd : secondaryAd);

  // if pushdown is blank, show leaderboard and secondary/sponsor ad -- remove pushdown
  // otherwise show pushdown -- remove leaderboard and/or sponsor ad (e.g., remove both leaderboard and sponsor ad when present)
  inactiveAdModuleDivs = ((foundEmptyAd)?[pushdownAd.parentNode]:((pushdownAd && leaderboardAd)?[leaderboardAd.parentNode,((pushdownAd && secondaryAd)?secondaryAd.parentNode:null)]:[((pushdownAd && secondaryAd)?secondaryAd.parentNode:null)]));
  for(var inI=0;inI<inactiveAdModuleDivs.length;inI++) {
    if(inactiveAdModuleDivs[inI]!=null) {
      inactiveAdModuleDivs[inI].parentNode.removeChild(inactiveAdModuleDivs[inI]);
    }
  }
  activeAdModuleDivs = ((foundEmptyAd || !pushdownAd)?[((leaderboardAd)?leaderboardAd.parentNode:null),((secondaryAd)?secondaryAd.parentNode:null)]:[((pushdownAd)?pushdownAd.parentNode:null)]);
  for(var inI=0;inI<activeAdModuleDivs.length;inI++) {
    if(activeAdModuleDivs[inI]!=null) {
      var aM = activeAdModuleDivs[inI];
      // expand the ad parent container element before showing the ad
      $(activeAdModuleDivs).each(function() { $(this).removeClass('hidden'); });
    }
  } /* if no ads are found, fallback and remove the 'hidden' status on existing ads (when found) */
  if(!pushdownAd && !leaderboardAd && !secondaryAd) {
    $('div.leaderboard').removeClass('hidden');
    $('div.secondary_ad').removeClass('hidden');
  }
  else {
    if(foundEmptyAd==0 && pushdownAd) {
      // spoof a pushdown when the 'spoof_opa' query string/GET param is present - NOTE: will remove a real pushdown ad if one exists
      if(window.location && window.location.search && /\bspoof_opa\b/.test(window.location.search)) {
        opa_001 = new ngsAdvertisingOPA();
        opa_001.spoof();
      }
    }
  }

  // for kids, need to remove div kids_tophat_row1 when it's a pushdown ad and center the ad
  if (!foundEmptyAd){
      var kids_tophat_row1 = ($('#kids_tophat_row1') || [undefined])[0];
      if (kids_tophat_row1){
        kids_tophat_row1.parentNode.removeChild(kids_tophat_row1);
        $('#kids_header .advertisement').addClass('kids_pushdown');
      }
  }
}


var rssFeeds = [];
addRSSFeed = function(rssObj){
  rssFeeds.push(rssObj);
}

loadRssReaders = function(){
  if(typeof($.jGFeed)=="undefined"){
    $('div.rssReader').remove();
    return;
  }
  var totFeeds = rssFeeds.length;
  for(var i=0;i<totFeeds;i++){
    var itemCount = rssFeeds[i].count;
    var resultsDiv = rssFeeds[i].div;
    var rssURL = rssFeeds[i].feed;

    $.jGFeed(rssURL,
    function(feeds){
      if(!feeds){
        $('#'+resultsDiv).append("<p>ERROR LOADING RSS FEED</p>");
        return false;
      }
      $('#rss_loading').remove();
      var html = '<ul class="bullets">';
      for(var j=0; j<itemCount; j++){
        var item = feeds.entries[j];
        html += '<li><a href="'+item.link+'">'+item.title+'</a>'+'</li>';
      }
      html += '</ul>';
      $('#'+resultsDiv).append(html);
    }, itemCount);
  }
}

var factsBoxes = [];
addFactsBox = function(factObj){
  factsBoxes.push(factObj);
}

loadFactsBoxes = function(){
  var totBoxes = factsBoxes.length;

  for(var i=0;i<totBoxes;i++){
    factsBoxes[i].get_data();
  }
}

//wrapper function to make NGM Flash interactives refresh ads and register page views
function ngmPageView(){
  ngsPageView();
}

checkKidsSponsor = function(){
  return false;
  var blankAdFilename = "817-grey.gif";
  var clearAdFilename = "1x1_clear_pixel_placeholder.gif";

  if($("#advertisingModule210x50").find("iframe").get(0) != undefined){

    var sponsor_img_src = $($("#advertisingModule210x50").find("iframe").get(0).contentWindow.document).find("img").attr('src');

    if ((sponsor_img_src != undefined&&( sponsor_img_src.indexOf(blankAdFilename) != -1)||(sponsor_img_src.indexOf(clearAdFilename) != -1) ) ) {
      $("#sponsorAd").addClass('hidden');
    } else {
      $("#sponsorAd").removeClass('hidden');
    }
  } else {
    $("#sponsorAd").removeClass('hidden');
  }
}
