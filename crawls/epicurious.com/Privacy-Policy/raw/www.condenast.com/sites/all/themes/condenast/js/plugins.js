window.log = function(){
  log.history = log.history || [];
  log.history.push(arguments);
  arguments.callee = arguments.callee.caller;
  // if(this.console) console.log( Array.prototype.slice.call(arguments) );
};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

(function($){

$.fn.disableSelection = function() {
    return this.each(function() {
        $(this).attr('unselectable', 'on')
               .css({
                   '-moz-user-select':'none',
                   '-webkit-user-select':'none',
                   'user-select':'none'
               })
               .each(function() {
                   this.onselectstart = function() { return false; };
               });
    });
};

})(jQuery);

//fgnass.github.com/spin.js#v1.2
(function(a,b,c){function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function m(a,b){for(var d in b)a[d]===c&&(a[d]=b[d]);return a}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1);return g}function h(a,b,c){c&&!c.parentNode&&h(a,c),a.insertBefore(b,c||null);return a}function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}var d=["webkit","Moz","ms","O"],e={},f;h(b.getElementsByTagName("head")[0],g("style"));var i=b.styleSheets[b.styleSheets.length-1],o=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},{lines:12,length:7,width:5,radius:10,color:"#000",speed:1,trail:100,opacity:.25,fps:20})},p=o.prototype={spin:function(a){this.stop();var b=this,c=b.el=l(g(),{position:"relative"}),d,e;a&&(e=n(h(a,c,a.firstChild)),d=n(c),l(c,{left:(a.offsetWidth>>1)-d.x+e.x+"px",top:(a.offsetHeight>>1)-d.y+e.y+"px"})),c.setAttribute("aria-role","progressbar"),b.lines(c,b.opts);if(!f){var i=b.opts,j=0,k=i.fps,m=k/i.speed,o=(1-i.opacity)/(m*i.trail/100),p=m/i.lines;(function q(){j++;for(var a=i.lines;a;a--){var d=Math.max(1-(j+a*p)%m*o,i.opacity);b.opacity(c,i.lines-a,d,i)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))})()}return b},stop:function(){var a=this.el;a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c);return this}};p.lines=function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:"translate3d(0,0,0)",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 ©px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},p.opacity=function(a,b,c){a.childNodes[b].style.opacity=c},function(){var a=l(g("group"),{behavior:"url(#default#VML)"}),b;if(!k(a,"transform")&&a.adj){for(b=4;b--;)i.addRule(["group","roundrect","fill","stroke"][b],"behavior:url(#default#VML)");p.lines=function(a,b){function k(a,d,i){h(f,h(l(e(),{rotation:360/b.lines*a+"deg",left:~~d}),h(l(g("roundrect",{arcsize:1}),{width:c,height:b.width,left:b.radius,top:-b.width>>1,filter:i}),g("fill",{color:b.color,opacity:b.opacity}),g("stroke",{opacity:0}))))}function e(){return l(g("group",{coordsize:d+" "+d,coordorigin:-c+" "+ -c}),{width:d,height:d})}var c=b.length+b.width,d=2*c,f=e(),i=~(b.length+b.radius+b.width)+"px",j;if(b.shadow)for(j=1;j<=b.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=b.lines;j++)k(j);return h(l(a,{margin:i+" 0 0 "+i,zoom:1}),f)},p.opacity=function(a,b,c,d){d=d.shadow&&d.lines||0,a.firstChild.childNodes[b+d].firstChild.firstChild.opacity=c}}else f=k(a,"animation")}(),a.Spinner=o})(window,document)
var spinOptions = { lines: 8, length: 6, width: 2, radius: 6, color: '#000', speed: 2.2, trail: 50, shadow: false }
spinOptions.small = $.extend({}, spinOptions, {radius: 4, length: 4});
window.SPIN_OPTIONS = spinOptions;

/**
 * MEDIA PARTNER WORK API JS
 */

;(function($) {

  $.partnerWork = function(options) {
    var defaults = {
      groupId: null,
      filterContainer: '#filters',
      searchForm: '#search form',
      searchResultContainer: '#search-results',
      searchMessage: '#search-message',
      caseContainer: '#cases .items',
      loadMoreBtn: '#load-more',
      pageSize: 10,
      filters: [
        'media',
        'category',
        'capability',
        'site'
      ],
      urls: {
        groups: '/cnmg/groups',
        programs: '/cnmg/programs',
        program: '/cnmg/program'
      }
    }

    var plugin = this;
    plugin.settings = {}
    plugin.spinners = {};
    plugin.data = {}
    plugin.spinOptions = spinOptions;

    var init = function() {
      plugin.settings = $.extend({}, defaults, options);

      if (!plugin.settings.groupId) {
        console.log("Partner Work No GroupID");
      }
      else {
        console.log("Partner Work GroupID: " + plugin.settings.groupId);
      }

      addSpinners();
      GlobalSpinner.show();
      plugin.data.filtered = null;

      var groupsUrl = !plugin.settings.groupId ? plugin.settings.urls.groups : plugin.settings.urls.groups + '/' + plugin.settings.groupId;
      var programsUrl = !plugin.settings.groupId ? plugin.settings.urls.programs : plugin.settings.urls.programs += '/' + plugin.settings.groupId;

      load(groupsUrl, initFilters);
      load(programsUrl, initCases);

      bindEvents();
    }

    var addSpinners = function() {
      // load more
      plugin.spinners.loadMore = new Spinner(spinOptions.small).spin();
      $(plugin.spinners.loadMore.el).addClass('spinner').hide();
    }

    // public

    plugin.loadMore = function() {
      var itemNum = $(plugin.settings.caseContainer + ' .item').length;
      renderCases(itemNum);
    }

    plugin.updateFilters = function() {
      plugin.data.filtered = null;
      $(plugin.settings.filters).each(function(i){
        var filterName = this;
        var select = $(plugin.settings.filterContainer + ' #filter-' + filterName);
        if (select.val() != -1)
          plugin.data.filtered = plugin.data.filterMap[filterName][select.val()];
      });
    }

    plugin.search = function(query) {
      $(plugin.settings.searchResultContainer).empty();
      q = query.toLowerCase();
      var count = 0;
      $(plugin.data.cases).each(function(i){
        if (String(this.clientName).toLowerCase().match(q) || String(this.displayName).toLowerCase().match(q) || String(this.projectName).toLowerCase().match(q)) {
          var item = tplGridItem(this.id, this.clientName, this.displayName, this.thumbLocation);
          $(plugin.settings.searchResultContainer).append(item);
          $(item).bind('click', openItem);

          count++;
        }
      });

      $(plugin.settings.caseContainer).parent().hide();
      $(plugin.settings.filterContainer).hide();
      $(plugin.settings.searchResultContainer).show();

      var message = $(plugin.settings.searchMessage);
      message.find('.query').text(query);
      message.find('.count').text(count);
      message.show();
    }

    plugin.clearSearch = function() {
      $(plugin.settings.caseContainer).parent().show();
      $(plugin.settings.filterContainer).show();
      $(plugin.settings.searchResultContainer).hide();
      $(plugin.settings.searchMessage).hide();
      $(plugin.settings.searchForm + ' input').val('');
    }

    // private

    var load = function(url, callback) {
      jQuery.support.cors = true;
      $.ajax({
        url: url + '?' + Math.random(),
        crossDomain: true,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          if (data.success) {
            callback.call(this, data.data);
          }
          else {
            console.log("Error: " + data.message);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {console.log(jqXHR, textStatus, errorThrown);}
      });
    }

    var bindEvents = function() {
      $(plugin.settings.loadMoreBtn).bind('click', loadMoreBtnClickHandler);
      $(plugin.settings.filterContainer + ' select').bind('change', filterSelectChangeHandler);
      $(plugin.settings.searchForm).bind('submit', searchSubmitHandler);
      $(plugin.settings.searchMessage + ' a').bind('click', searchClearClickHandler);
       $(window).resize(resizeHandler);
    }

    var initFilters = function(data) {

      plugin.data.filterMap = {};
      $(plugin.settings.filters).each(function(i){

        var filterName = this;
        var select = $(plugin.settings.filterContainer + ' #filter-' + filterName);
        plugin.data.filterMap[filterName] = {};

        $(data[filterName]).each(function(i){
          plugin.data.filterMap[filterName][this.category_id] = this.relatedProjects.split(',');
          select.append($('<option />').attr('value', this.category_id).text(this.name));
        });

        select.find('.loading').remove();
      });

      $('#filters').find('select').each(function()
      {
        $(this).dropkick({
          theme: 'white',
          change: filterSelectChangeHandler
        });
      });
    }

    var initCases = function(data) {
      plugin.data.cases = data;
      renderCases(0);
      var urlstr = window.location.href ? window.location.href : window.location;
      if(urlstr.lastIndexOf('/case/') != -1)
      {
        id = urlstr.substr(urlstr.lastIndexOf('/case/') + 6);
        if(id.lastIndexOf('/') != -1)
        {
          id = id.substr(0, id.lastIndexOf('/'));
        }
        if(id != '%2A' && id != '*')
        {
          loadProject(id);
        }
      }
    }

    var renderCases = function(offset) {
      GlobalSpinner.hide();
      var container = $(plugin.settings.caseContainer);
      if(offset == 0)
      {
        container.empty();

      }
      actual = 0;
      for (var i = offset; i < plugin.data.cases.length; i++) {
        var data = plugin.data.cases[i];
        if (!!data && (actual < plugin.settings.pageSize + offset) && (plugin.data.filtered == null || $.inArray(data.id, plugin.data.filtered) != -1)) {
          actual++;
          var item = tplGridItem(data.id, data.clientName, data.projectName, data.thumbLocation);
          container.append(item);
          $(item).css('opacity', 0);
          $(item).delay((i - offset) * 250).fadeTo('normal', 1);
          $(item).bind('click', openItem);
        }
      }

      plugin.updateFilters();
      $(plugin.spinners.loadMore.el).hide();

      if((!!plugin.data.filtered ? plugin.data.filtered.length : plugin.data.cases.length) - offset > plugin.settings.pageSize)
        $(plugin.settings.loadMoreBtn).show();
      else
        $(plugin.settings.loadMoreBtn).hide();
    }

    var loadProject = function(id) {
      load(plugin.settings.urls.program + '/' + id, renderProject);
    }

    var renderProject = function(project) {

      console.log(project);

      //$(plugin.spinners.main.el).parent().hide();
      GlobalSpinner.hide();
     
      $('body').css({width:$(window).width(), position:'fixed', overflow:'hidden', height:$(window).height()});
      
      var overlay = $('<div/>').attr('id', 'caseoverlay').css({width: $(window).width(), height: $(window).height()});
      $('body').append(overlay);

      $(document).unbind('keyup');
      $(document).bind('keyup', keyHandler);

      var top = $('<div/>').attr('id', 'top');
      var content = $('<div/>').attr('id', 'content');
      var controls = $('<div/>').attr('id', 'controls');

      var tip = $('<div>').attr('id', "tip").text('For more information: ').append($('<a href="mailto:archive@condenast.com">archive@condenast.com</a>'));
      var logo = $('<div>').addClass("logo").append($('<div>').addClass('inner'));
      var corner = $('<div>').addClass("corner");
      var info = $('<div>').attr('id', "info");
      var toggle = $('<div>').attr('id', "toggle");
      toggle.append($('<div>').attr('id', "inner").click(doToggle));
      info.append(toggle);
      var info_inner = $('<div>').attr('id', "inner");
      // var pname = project.projectname.indexOf(project.clientname+", ") == 0 ? project.projectname.substr(project.clientname.length + 3) : project.projectname;
      var pname = project.projectname;
      var cname = Object.prototype.toString.apply(project.clientname) === '[object Array]' ? project.clientname.join(", ") : project.clientname;
      info_inner.append($('<h2/>').text(pname));
      info_inner.append($('<h3/>').text(cname));
      info.append(info_inner);
      info.append($('<div>').attr('id', 'separator'));
      var body = $('<div>').attr('id', "body");
      body.addClass('cf');
      var close = $('<a href="#" class="close"></a>').click(closeCase);
      var prev = $('<a href="#" id="prev-slide"></a>').addClass('inactive').click(prevSlide);

      var next = $('<a href="#" id="next-slide"></a>').click(nextSlide);
      var num = $('<div/>').attr('id', 'pagi');
      var wrapper = $('<div/>').css({position:'absolute', top:'50%'});

      top.append(corner);
      top.append(logo);
      top.append(close);
      wrapper.append(prev);
      wrapper.append(num);
      wrapper.append(next);
      controls.append(wrapper);

      var slides = $('<ul/>').attr('id', 'slides');
      var left = $('<div/>').css({float: 'left', width:'450px'});
      var right = $('<div/>').css({float: 'left', width:'250px', 'padding-left':'28px'});

      left.append($('<p/>').text(project.objective));
      left.append($('<p/>').text(project.solution));

      var caparr, catarr;
      caparr = project.tags.capability;
      catarr = project.tags.category;

      if(!!catarr)
      {
        right.append($('<h4/>').text("Category"));
        var catp = $('<div/>');
        for(var i = 0; i < catarr.length; i++)
        {
          var categ = $('<span/>').addClass("regularButtonTiny");
          categ.append($('<span/>').text(catarr[i]));
          catp.append(categ);
        }
        right.append(catp);
      }

      if(!!caparr)
      {
        right.append($('<h4/>').text("Capabilities"));
        var capp = $('<div/>');
        for(var i = 0; i < caparr.length; i++)
        {
          var cape = $('<span/>').addClass("regularButtonTiny");
          cape.append($('<span/>').text(caparr[i]));
          capp.append(cape);
        }
        right.append(capp);
      }

      body.append(left);
      body.append(right);

      var cursors = $('<div>').attr('id', "cursors");
      cursors.text("Tip: You can also use arrow keys to navigate");
      info.append(body);

      $(project.slides).each(function(i) {

        var li = $('<li/>');
        if(this.type == 'image')
        {
          var img = $('<img/>').attr('src', this.imglocation);
          img.load(adjustSlideImg)
          li.append(img);
          var caption = $('<div/>').addClass('caption').text(this.description);
          if(!!this.full_description)
          {
            caption.append($('<p>').text(this.full_description));
          }
          li.append(caption);
          slides.append(li);
        }
        else if(this.type == 'hero')
        {
          var img = $('<img/>').attr('src', this.imglocation);
          img.load(adjustImage);
          li.addClass('selected first');
          li.append(img);
          slides.prepend(li);
        }
        else if(this.type == 'video')
        {

          li.addClass("video");

          // default video size
          var videoWidth = 640;
          var videoHeight = 480;
          var videoBgColor = '#fff';

          var assetTag = $.trim(this.asset_tag).toLowerCase();
          if (assetTag) {
            li.addClass(assetTag);

            // desktop video size
            if (assetTag == 'desktop') {
              videoWidth = 672;
              videoHeight = 380;
              videoBgColor = '#000';
            }
          }

          var container = $('<div/>').addClass('videoContainer');//.attr('id', 'videoContainer');

          var wrap = $('<div/>').css({position:'relative', top:'50%'});
          wrap.append(container);
          var caption = $('<div/>').addClass('caption').text(this.description);
          if(!!this.full_description)
          {
            caption.append($('<p>').text(this.full_description));
          }
          wrap.append(caption);
          li.append(wrap);

          var params = [
            {name: 'bgcolor', value: videoBgColor},
            {name: 'width', value: videoWidth},
            {name: 'height', value: videoHeight},
            {name: 'playerID', value: this.brightcove_id},
            {name: 'playerKey', value: 'AQ~~,AAAAAFiRLbQ~,NEfaHYpPAaWCXaZ9S5E-ZA3UMLNCtDwI'},
            {name: 'isVid', value: true},
            {name: 'isUI', value: true},
            {name: 'dynamicStreaming', value: true},
            {name: 'wmode', value: 'transparent'},
            {name: '@videoPlayer', value: this.brightcove_id}
          ];

          var object = $('<object />').attr('id', 'experience'+this.brightcove_id).addClass('BrightcoveExperience');

          $(params).each(function(i){
            var param = $('<param />').attr(this);
            object.append(param);
          });
          slides.append(li);
          $('body').append(object);

          brightcove.createExperiences();
          $('body #experience'+this.brightcove_id).appendTo(container);

          if (assetTag && assetTag == 'desktop')
            container.append($('<div/>').addClass('glare'));//.attr('id', 'glare'));
        }
      });
      num.text("1/"+slides.find("li").length);
      content.append(slides);
      overlay.append(content);
      overlay.append(info);
      overlay.append(controls);
      overlay.append(top);

      var th = -$('#caseoverlay #info').outerHeight() + 120;
      $('#caseoverlay #info').css({bottom:th});

      content.detectFlicks({
        axis: 'y',
        threshold: 60,
        flickEvent: flicked});
    }

    // events

    var adjustImage = function()
    {
        img = $('#caseoverlay #slides li.first img');
        if(img)
        {
          img.css({width:'auto', height:'auto', top:'0', left:'0'});

          var w = img.outerWidth();
          var h = img.outerHeight();
          var scale = Math.max(($(window).width() / w), ($(window).height() / h));
          var divX = Math.min(0, Math.floor(($(window).width() - scale * w) / 2));
          var divY = Math.min(0, Math.floor(($(window).height() - scale * h) / 2));
          img.css({width: Math.ceil(scale * w)+'px', height:Math.ceil(scale * h)+'px', 'margin-left':divX+'px', top:'0px'});
        }
    }

    var adjustSlideImg =function()
    {
      adjustSlide($(this).parent());
    }

    var resizeHandler = function()
    {
      var overlay = $('#caseoverlay');
      if(!!overlay)
      {
        overlay.css({width: $(window).width(), height: $(window).height()});
        adjustSlides();
        adjustImage();
        var index = $('#caseoverlay #slides li.selected').index();
        if(index != -1)
        {
          $('#caseoverlay #slides').css({top: - $('#caseoverlay #slides li:eq(' + (index) + ')').position().top});
        }

        $('body').css({width:$(window).width(), height:$(window).height()});
      }
    }

    var adjustSlides = function()
    {
      $('#caseoverlay #slides li').each(function(i)
      {
        if(!$(this).hasClass("video") && !$(this).hasClass("first"))
        {
          adjustSlide(this);
        }
      });
    }

    var adjustSlide = function(slide)
    {
        var img = $(slide).find('img');
        var cap = $(slide).find('.caption');
        img.css({width:'auto', height:'auto', top:'0'});
        var maxWidth = Math.min($(window).width(), 946);// 640;
        var maxHeight = Math.round($(window).height() - (cap.outerHeight() + 45 + 70));
        var w = img.outerWidth();
        var h = img.outerHeight();
        var ratio = w / h;
        var width = maxWidth;
        var height = maxHeight;

      if (maxWidth >= maxHeight * ratio)
            width = height * ratio;
        else
            height = width / ratio;

        width = Math.round(width);
        height = Math.round(height);
        var left = Math.round((maxWidth - width) / 2);
        var top =  70 + Math.round(((maxHeight) - height) / 2);

        img.css({width: width, height: height, top: top});
        cap.css({top:(top+height), width:maxWidth})
    }

    var keyHandler = function(event)
    {
      if (event.keyCode == 40)
      {
        nextSlide();
        event.preventDefault();
      }
      else if (event.keyCode == 38)
      {
        prevSlide();
        event.preventDefault();
      }

    }

    var doToggle = function()
    {
      var index = $('#caseoverlay #slides li.selected').index();
      var target = '0px';
      if($(this).hasClass('open'))
      {
        $(this).removeClass('open');
        target = index == 0 ? -$('#caseoverlay #info').outerHeight() + 120 : -$('#caseoverlay #info').outerHeight();
      }
      else
      {
        $(this).addClass('open');
        target = /*index == 0 ?*/ 0/* : -$('#caseoverlay #info').outerHeight() + 120*/;
      }
      $('#caseoverlay #info').stop(true).animate({bottom:target}, 400);
      if(index != 0 && !$(this).hasClass('open'))
      {
        $(this).stop(true).animate({top:'-26px'}, 400);
      }
      else
      {
        $(this).stop(true).animate({top:'-4px'}, 400);
      }
    }

    var adjustInfo = function(slide)
    {
      var index = $('#caseoverlay #slides li.selected').index();
      var target = '0px';
      var toggle = $('#caseoverlay #info #toggle #inner');
      if(slide && toggle.hasClass('open'))
      {
        toggle.removeClass('open');
      }
      if(!toggle.hasClass('open'))
      {

        target = index == 0 ? -$('#caseoverlay #info').outerHeight() + 120 : -$('#caseoverlay #info').outerHeight();
      }
      else
      {
        target =/* index == 0 ?*/ 0 /*: -$('#caseoverlay #info').outerHeight() + 120*/;
      }
      $('#caseoverlay #info').stop(true).animate({bottom:target}, 400);
      if(index != 0 && !toggle.hasClass('open'))
      {
        toggle.stop(true).animate({top:'-26px'}, 400);
      }
      else
      {
        toggle.stop(true).animate({top:'-4px'}, 400);
      }
    }

    var flicked = function(d)
    {
      nextSlide();
    }


    var closeCase = function() {
      $('#caseoverlay').remove();
      $(document).unbind('keyup');
      $('body').css({width:'auto', position:'static', height:'auto', overflow:'auto'});
      return false;
    }

    var prevSlide = function() {

      var index = $('#caseoverlay #slides li.selected').index();

      if(index > 0)
      {
        if($('#caseoverlay #slides li.selected').hasClass('video'))
        {
          var oeid = $('#caseoverlay #slides li.selected').find('.BrightcoveExperience').first().attr("id");

          try {
            brightcove.getExperience(oeid).getModule(APIModules.VIDEO_PLAYER).stop();
          } catch( err ) {
            // handle error
          }
        }
        $('#caseoverlay #slides li.selected').removeClass('selected');
        $('#caseoverlay #slides li:eq(' + (index - 1) + ')').addClass('selected');
        $('#caseoverlay #slides').stop(true).animate({top: - $('#caseoverlay #slides li:eq(' + (index - 1) + ')').position().top}, 800);
        if($('#caseoverlay #slides li:eq(' + (index - 1) + ')').hasClass('video'))
        {
          var eid = $('#caseoverlay #slides li:eq(' + (index - 1) + ')').find('.BrightcoveExperience').first().attr("id");
          try {
            brightcove.getExperience(eid).getModule(APIModules.VIDEO_PLAYER).play();
          } catch (err) {

          }
        }
        $('#caseoverlay #controls #pagi').text((index)+"/"+$('#caseoverlay #slides li').length);
        adjustControls($('#caseoverlay #slides li.selected').index(), $('#caseoverlay #slides li').length - 1);
        adjustInfo(true);
      }
      return false;
    }

    var adjustControls = function(index, max)
    {
      if(index == 0)
      {
        $('#caseoverlay #controls #prev-slide').addClass('inactive');
        if(max > 0)
        {
          $('#caseoverlay #controls #next-slide').removeClass('inactive');
        }
        else
        {
          $('#caseoverlay #controls #next-slide').addClass('inactive');
        }
      }
      else if(index == max)
      {
        $('#caseoverlay #controls #prev-slide').removeClass('inactive');
        $('#caseoverlay #controls #next-slide').addClass('inactive');
      }
      else
      {
        $('#caseoverlay #controls #prev-slide').removeClass('inactive');
        $('#caseoverlay #controls #next-slide').removeClass('inactive');
      }
    }


    var nextSlide = function() {

      var index = $('#caseoverlay #slides li.selected').index();

      if(index < $('#caseoverlay #slides li').length - 1)
      {
        if($('#caseoverlay #slides li.selected').hasClass('video'))
        {
          var oeid = $('#caseoverlay #slides li.selected').find('.BrightcoveExperience').first().attr("id");
          try {
            brightcove.getExperience(oeid).getModule(APIModules.VIDEO_PLAYER).stop();
          } catch (err) {

          }
        }
        $('#caseoverlay #slides li.selected').removeClass('selected');
        $('#caseoverlay #slides li:eq(' + (index + 1) + ')').addClass('selected')
        $('#caseoverlay #slides').stop(true).animate({top: - $('#caseoverlay #slides li:eq(' + (index + 1) + ')').position().top}, 800);
        if($('#caseoverlay #slides li:eq(' + (index + 1) + ')').hasClass('video'))
        {
          var eid = $('#caseoverlay #slides li:eq(' + (index + 1) + ')').find('.BrightcoveExperience').first().attr("id");
          try {
            brightcove.getExperience(eid).getModule(APIModules.VIDEO_PLAYER).play();
          } catch (err) {
          }
        }
        $('#caseoverlay #controls #pagi').text((index + 2)+"/"+$('#caseoverlay #slides li').length);
        adjustControls(index + 1, $('#caseoverlay #slides li').length - 1);
        adjustInfo(true);
      }
      return false;
    }


    var openItem = function(e)
    {
      GlobalSpinner.show();
      e.stopPropagation();
      e.preventDefault();
      loadProject( $(this).attr( 'id' ) );
    }

    var loadMoreBtnClickHandler = function(e) {
      $(plugin.spinners.loadMore.el).show();
      $(defaults.loadMoreBtn).hide();
      plugin.loadMore();
      e.stopPropagation();
      return false;
    }

    var filterSelectChangeHandler = function(value, label) {

      var selected = this;
      plugin.settings.groupId = value;
      var fname = this.attr('id').replace("filter-", "");
      plugin.data.filtered = plugin.data.filterMap[fname][value];
        renderCases(0);
    }

    var searchSubmitHandler = function(e) {
      var query = $(plugin.settings.searchForm + " input").val();
      plugin.search(query);
      e.stopPropagation();
      return false;
    }

    var searchClearClickHandler = function(e) {
      plugin.clearSearch();
      e.stopPropagation();
      return false;
    }

    // "template functions"

    var tplGridItem = function(id, client, title, thumb) {
      return $('<div class="item"/>').attr({id: id})
        .append($('<a href="our-work/case/' + id +'" />')
          .append($('<div class="thumb"/>').append($('<img/>').attr({src: thumb})))
          .append($('<div class="client"/>').text(client))
          .append($('<div class="title"/>').text(title))
        );
    }

    init();
  }

})(jQuery);

/**
 * AJAX CONTENT
 */

;(function($) {

  $.ajaxContent = function(options) {

    var defaults = {
      filterContainer: '#filters',
      itemContainer: '#press-releases ul',
      searchForm: '#search form',
      searchMessage: '#search-message',
      searchResultContainer: '#search-results ul',
      loadMoreBtn: '#load-more',
      ajaxUrl: '/press_room/ajax',
      prefix: '',
      isFFM: false
    }

    var plugin = this;
    plugin.settings = {}
    plugin.data = {}
    plugin.spinners = {};

    var init = function() {
      plugin.settings = $.extend({}, defaults, options);
      plugin.data.page = 0;

      bindEvents();
      addSpinners();
    }

    // public

    plugin.loadMore = function() {
      plugin.data.page++;

      var data = getFilterData();
      data.p = plugin.data.page;

      // console.log(data);

      load('load_more', data, loadMoreComplete);

      $(plugin.settings.loadMoreBtn).hide();
      $(plugin.spinners.loadMore.el).show();
    }

    plugin.updateFilters = function() {

      plugin.data.page = 0;
      var data = getFilterData();

      load('update_filters', data, updateFiltersComplete);

      $(plugin.settings.loadMoreBtn).hide();
      GlobalSpinner.show();
    }

    plugin.search = function(query) {
      load('search', {q: query}, searchComplete);
      $(plugin.spinners.search.el).show();
      $(plugin.settings.searchForm + ' .icon').hide();

      $(plugin.settings.filterContainer).hide();
      $(plugin.settings.itemContainer).parent().hide();
    }

    plugin.clearSearch = function() {
      $(plugin.settings.searchResultContainer).parent().hide();
      $(plugin.settings.searchMessage).hide();
      $(plugin.settings.searchForm + ' input').val('');

      $(plugin.settings.filterContainer).show();
      $(plugin.settings.itemContainer).parent().show();
    }

    // private

    var bindEvents = function() {
      $(plugin.settings.loadMoreBtn).bind('click', loadMoreBtnClickHandler);
      $(plugin.settings.searchForm).bind('submit', searchFormSubmitHandler);
      $(plugin.settings.searchMessage + ' a').bind('click', searchMessageClearClickHandler);

      $('.white_dk_special').dropkick({
        theme: 'white',
        change: filterSelectChangeHandler
      });
    }

    var addSpinners = function() {

      // load more
      plugin.spinners.loadMore = new Spinner(plugin.settings.spinOptions).spin();
      $(plugin.spinners.loadMore.el).addClass('spinner').hide();
      $(plugin.settings.loadMoreBtn).parent().append(plugin.spinners.loadMore.el);

      // search
      plugin.spinners.search = new Spinner(plugin.settings.spinOptions.small).spin();
      $(plugin.spinners.search.el).addClass('spinner').hide();
      $(plugin.settings.searchForm).append(plugin.spinners.search.el);
    }

    var load = function(operation, data, callback) {

      data.o = plugin.settings.prefix + operation;
      data.ffm = plugin.settings.isFFM;

      $.ajax({
        url: plugin.settings.ajaxUrl,
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function(data) {
          if (data.success)
            callback.apply(this, [data.response]);
          else
            console.log("Error: " + data.message);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error: " + textStatus);
        }
      });
    }

    var loadMoreComplete = function(data) {

      $(plugin.spinners.loadMore.el).hide();

      $(data.output).each(function(i) {
        $(plugin.settings.itemContainer).append(this);
        $(this).hide().delay(150 * (i + 1)).fadeIn();
      });

      if(!data.last_page)
        $(plugin.settings.loadMoreBtn).delay(($(data.output).length + 1) * 150).fadeIn(0);
    }

    var updateFiltersComplete = function(data) {
      $(plugin.settings.itemContainer).hide().empty().append(data.output).fadeIn();

      if(!data.last_page)
        $(plugin.settings.loadMoreBtn).fadeIn();

      GlobalSpinner.hide();
    }

    var searchComplete = function(data) {
      $(plugin.settings.searchResultContainer).empty().append(data.output || '&nbsp;').parent().show();

      var message = $(plugin.settings.searchMessage);
      message.find('.query').text(data.query);
      message.find('.count').text(data.count);
      message.show();

      $(plugin.spinners.search.el).hide();
      $(plugin.settings.searchForm + ' .icon').show();
    }

    var getFilterData = function() {

      var brand = $(plugin.settings.filterContainer + ' select#brand').val();
      var year = $(plugin.settings.filterContainer + ' select#year').val();
      var month = $(plugin.settings.filterContainer + ' select#month').val();
      var data = {};

      if (brand != -1)
        data.b = brand;

      if (year != -1)
        data.y = year;

      if (month != -1)
        data.m = month;

      if (plugin.settings.prefix == 'events_') {
        var tag = $('#events').data('tag');
        if (tag != '') {
          data.t = tag;
        }
      }

      return data;
    }

    // events

    var loadMoreBtnClickHandler = function(e) {
      plugin.loadMore();
      e.stopPropagation();
      return false;
    }

    var filterSelectChangeHandler = function(value, label) {
      plugin.updateFilters();
      return false;
    }

    var searchFormSubmitHandler = function(e) {
      plugin.search($(this).find('input').val());
      e.stopPropagation();
      return false;
    }

    var searchMessageClearClickHandler = function(e) {
      plugin.clearSearch();
      e.stopPropagation();
      return false;
    }

    init();
  }
})(jQuery);


/**
 * ABOUT US LIVING WALL JS
 */

;(function($) {

  $.livingWall = function(el, options) {

    var defaults = {
      interval: 5000,
      ajaxUrl: '/about_us/ajax'
    }

    var plugin = this;
    plugin.el = el;
    plugin.settings = {}
    plugin.data = {}

    var init = function() {
      plugin.settings = $.extend({}, defaults, options);
      loadBrands();
    }

    // public

    // private

    var loadBrands = function() {
      $.ajax({
        url: plugin.settings.ajaxUrl,
        type: 'POST',
        dataType: 'json',
        data: 'o=living_wall',
        success: function(data) {
          if (data.success) {
            plugin.data.brands = data.response.brands;
            preloadImages();
            startTimer();
          }
          else
            console.log("Error: " + data.message);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error: " + textStatus);
        }
      });
    }

    var preloadImages = function() {
      $(plugin.data.brands).each(function(i){
        $('<img/>').attr('src', this.image_medium);
        $('<img/>').attr('src', this.image_small);
      });
    }

    var startTimer = function() {
      plugin.data.t = setTimeout(update, plugin.settings.interval);
    }

    var update = function() {
      plugin.data.brands = shuffle(plugin.data.brands);
      plugin.el.find('.brand').each(function(i){
        var brand = plugin.data.brands[i];

        $(this).delay(i * 200).fadeOut(500, function() {
          var image = i == 2 ? brand.image_medium : brand.image_small;
          $(this).find('img').first().attr('src', image);
          $(this).find('span > img').first().attr('src', brand.logo_small);
          $(this).fadeIn(500);
        });

      })
      startTimer();
    }

    var shuffle = function(array) {
      var tmp, current, top = array.length;
      if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
      return array;
    }

    // events

    init();
  }

})(jQuery);

/**
 * DropKick
 *
 * Highly customizable <select> lists
 * https://github.com/JamieLottering/DropKick
 *
 * &copy; 2011 Jamie Lottering <http://github.com/JamieLottering>
 *                        <http://twitter.com/JamieLottering>
 *
 */
 (function ($, window, document) {

  var ie6 = false;

  // Help prevent flashes of unstyled content
  if ($.browser.msie && $.browser.version.substr(0, 1) < 7) {
    ie6 = true;
  } else {
    document.documentElement.className = document.documentElement.className + ' dk_fouc';
  }

  var
    // Public methods exposed to $.fn.dropkick()
    methods = {},

    // Cache every <select> element that gets dropkicked
    lists   = [],

    // Convenience keys for keyboard navigation
    keyMap = {
      'left'  : 37,
      'up'    : 38,
      'right' : 39,
      'down'  : 40,
      'enter' : 13
    },

    // HTML template for the dropdowns
    dropdownTemplate = [
      '<div class="dk_container" id="dk_container_{{ id }}" tabindex="{{ tabindex }}">',
        '<a class="dk_toggle">',
          '<span class="dk_label">{{ label }}</span>',
        '</a>',
        '<div class="dk_options">',
          '<ul class="dk_options_inner">',
          '</ul>',
        '</div>',
      '</div>'
    ].join(''),

    // HTML template for dropdown options
    optionTemplate = '<li class="{{ current }}"><a data-dk-dropdown-value="{{ value }}">{{ text }}</a></li>',

    // Some nice default values
    defaults = {
      startSpeed : 1000,  // I recommend a high value here, I feel it makes the changes less noticeable to the user
      theme  : false,
      change : false
    },

    // Make sure we only bind keydown on the document once
    keysBound = false
  ;

  // Called by using $('foo').dropkick();
  methods.init = function (settings) {
    settings = $.extend({}, defaults, settings);

    return this.each(function () {
      var
        // The current <select> element
        $select = $(this),

        // Store a reference to the originally selected <option> element
        $original = $select.find(':selected').first(),

        // Save all of the <option> elements
        $options = $select.find('option'),

        // We store lots of great stuff using jQuery data
        data = $select.data('dropkick') || {},

        // This gets applied to the 'dk_container' element
        id = $select.attr('id') || $select.attr('name'),

        // This gets updated to be equal to the longest <option> element
        width  = settings.width || $select.outerWidth(),

        // Check if we have a tabindex set or not
        tabindex  = $select.attr('tabindex') ? $select.attr('tabindex') : '',

        // The completed dk_container element
        $dk = false,

        theme
      ;

      // Dont do anything if we've already setup dropkick on this element
      if (data.id) {
        return $select;
      } else {
        data.settings  = settings;
        data.tabindex  = tabindex;
        data.id        = id;
        data.$original = $original;
        data.$select   = $select;
        data.value     = _notBlank($select.val()) || _notBlank($original.attr('value'));
        data.label     = $original.text();
        data.options   = $options;
      }

      // Build the dropdown HTML
      $dk = _build(dropdownTemplate, data);

      // Make the dropdown fixed width if desired
      $dk.find('.dk_toggle').css({
        'width' : width + 'px'
      });

      // Hide the <select> list and place our new one in front of it
      $select.before($dk);

      // Update the reference to $dk
      $dk = $('#dk_container_' + id).fadeIn(settings.startSpeed);

      // Save the current theme
      theme = settings.theme ? settings.theme : 'default';
      $dk.addClass('dk_theme_' + theme);
      data.theme = theme;

      // Save the updated $dk reference into our data object
      data.$dk = $dk;

      // Save the dropkick data onto the <select> element
      $select.data('dropkick', data);

      // Do the same for the dropdown, but add a few helpers
      $dk.data('dropkick', data);

      lists[lists.length] = $select;

      // Fix identified in issue #11.
      if(!$.browser.msie) {
        // Focus events
        $dk.bind('focus.dropkick', function (e) {
          $dk.addClass('dk_focus');
        }).bind('blur.dropkick', function (e) {
          $dk.removeClass('dk_open dk_focus');
        });
      } else {
        $('body').click(function(event) {
          if(!$(event.target).parents('.dk_container').length) {
            _closeDropdown($dk);
          }
        });
      }

      setTimeout(function () {
        $select.hide();
      }, 0);
    });
  };

  // Allows dynamic theme changes
  methods.theme = function (newTheme) {
    var
      $select   = $(this),
      list      = $select.data('dropkick'),
      $dk       = list.$dk,
      oldtheme  = 'dk_theme_' + list.theme
    ;

    $dk.removeClass(oldtheme).addClass('dk_theme_' + newTheme);

    list.theme = newTheme;
  };

  // Reset all <selects and dropdowns in our lists array
  methods.reset = function () {
    for (var i = 0, l = lists.length; i < l; i++) {
      var
        listData  = lists[i].data('dropkick'),
        $dk       = listData.$dk,
        $current  = $dk.find('li').first()
      ;

      $dk.find('.dk_label').text(listData.label);
      $dk.find('.dk_options_inner').animate({ scrollTop: 0 }, 0);

      _setCurrent($current, $dk);
      _updateFields($current, $dk, true);
    }
  };

  // Close dropdown when clicking outside
  methods.close = function() {
    if(!!($(this).data('dropkick')))
    {
      _closeDropdown($(this).data('dropkick').$dk);
    }
  }

  $('html').click(function(e) {
    $.each($('select'), function(index, value) {
      $(value).dropkick('close');
    });
  });

  // Expose the plugin
  $.fn.dropkick = function (method) {
    if (!ie6) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || ! method) {
        return methods.init.apply(this, arguments);
      }
    }
  };

  // private
  function _handleKeyBoardNav(e, $dk) {
    var
      code     = e.keyCode,
      data     = $dk.data('dropkick'),
      options  = $dk.find('.dk_options'),
      open     = $dk.hasClass('dk_open'),
      current  = $dk.find('.dk_option_current'),
      first    = options.find('li').first(),
      last     = options.find('li').last(),
      next,
      prev
    ;

    switch (code) {
      case keyMap.enter:
        if (open) {
          _updateFields(current.find('a'), $dk);
          _closeDropdown($dk);
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
      break;

      case keyMap.up:
        prev = current.prev('li');
        if (open) {
          if (prev.length) {
            _setCurrent(prev, $dk);
          } else {
            _setCurrent(last, $dk);
          }
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
      break;

      case keyMap.down:
        if (open) {
          next = current.next('li').first();
          if (next.length) {
            _setCurrent(next, $dk);
          } else {
            _setCurrent(first, $dk);
          }
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
      break;

      default:
      break;
    }
  }

  // Update the <select> value, and the dropdown label
  function _updateFields(option, $dk, reset) {
    var value, label, data;

    value = option.attr('data-dk-dropdown-value');
    label = option.text();
    data  = $dk.data('dropkick');

    $select = data.$select;
    $select.val(value);

    $dk.find('.dk_label').text(label);

    reset = reset || false;

    if (data.settings.change && !reset) {
      data.settings.change.call($select, value, label);
    }
  }

  // Set the currently selected option
  function _setCurrent($current, $dk) {
    $dk.find('.dk_option_current').removeClass('dk_option_current');
    $current.addClass('dk_option_current');

    _setScrollPos($dk, $current);
  }

  function _setScrollPos($dk, anchor) {
    var height = anchor.prevAll('li').outerHeight() * anchor.prevAll('li').length;
    $dk.find('.dk_options_inner').animate({ scrollTop: height + 'px' }, 0);
  }

  // Close a dropdown
  function _closeDropdown($dk) {
    $dk.removeClass('dk_open');
  }

  // Open a dropdown
  function _openDropdown($dk) {
    var data = $dk.data('dropkick');
    $dk.find('.dk_options').css({ top : $dk.find('.dk_toggle').outerHeight() - 1 });
    $dk.toggleClass('dk_open');

  }

  /**
   * Turn the dropdownTemplate into a jQuery object and fill in the variables.
   */
  function _build (tpl, view) {
    var
      // Template for the dropdown
      template  = tpl,
      // Holder of the dropdowns options
      options   = [],
      $dk
    ;

    template = template.replace('{{ id }}', view.id);
    template = template.replace('{{ label }}', view.label);
    template = template.replace('{{ tabindex }}', view.tabindex);

    if (view.options && view.options.length) {
      for (var i = 0, l = view.options.length; i < l; i++) {
        var
          $option   = $(view.options[i]),
          current   = 'dk_option_current',
          oTemplate = optionTemplate
        ;

        oTemplate = oTemplate.replace('{{ value }}', $option.val());
        oTemplate = oTemplate.replace('{{ current }}', (_notBlank($option.val()) === view.value) ? current : '');
        oTemplate = oTemplate.replace('{{ text }}', $option.text());

        options[options.length] = oTemplate;
      }
    }

    $dk = $(template);
    $dk.find('.dk_options_inner').html(options.join(''));

    return $dk;
  }

  function _notBlank(text) {
    return ($.trim(text).length > 0) ? text : false;
  }

  $(function () {

    // Handle click events on the dropdown toggler
    $('.dk_toggle').live('click', function (e) {
      var $dk  = $(this).parents('.dk_container').first();

      _openDropdown($dk);

      if ("ontouchstart" in window) {
        $dk.addClass('dk_touch');
        $dk.find('.dk_options_inner').addClass('scrollable vertical');
      }

      e.preventDefault();
      return false;
    });

    // Handle click events on individual dropdown options
    $('.dk_options a').live(($.browser.msie ? 'mousedown' : 'click'), function (e) {
      var
        $option = $(this),
        $dk     = $option.parents('.dk_container').first(),
        data    = $dk.data('dropkick')
      ;

      _closeDropdown($dk);
      _updateFields($option, $dk);
      _setCurrent($option.parent(), $dk);

      e.preventDefault();
      return false;
    });

    // Setup keyboard nav
    $(document).bind('keydown.dk_nav', function (e) {
      var
        // Look for an open dropdown...
        $open    = $('.dk_container.dk_open'),

        // Look for a focused dropdown
        $focused = $('.dk_container.dk_focus'),

        // Will be either $open, $focused, or null
        $dk = null
      ;

      // If we have an open dropdown, key events should get sent to that one
      if ($open.length) {
        $dk = $open;
      } else if ($focused.length && !$open.length) {
        // But if we have no open dropdowns, use the focused dropdown instead
        $dk = $focused;
      }

      if ($dk) {
        _handleKeyBoardNav(e, $dk);
      }
    });
  });
})(jQuery, window, document);


// accordion
(function($)
{
  $.accordion = function(element, o)
  {

    // check the hash
    var searchFor  = window.location.hash.replace('#','');

    // compare the hash to the list
    // find the item with the same hash
    // move the item to the top of the list
    // expand the item as in the accordion element

    return element.each(function(){
        var defaults = {
              item_class: '.unit-item',
              header_class: '.unit-header',
              content_class: '.unit-content',
              close_class: '.unit-close',
              speed: 500,
              anchors: false,
              scrollTop: true,
              offset: 11
        };
        var root = $(this);
        root.settings = $.extend({}, defaults, o );

        if (!$(element).hasClass('contacts'))
          tidy();

        // $.browser.msie

        var topArray = [];
        root.find(defaults.item_class).each( function() {
            if ( $(this).attr('id') == searchFor && $(this).attr('id') != '' ){
            console.log ( "searchFor: " + searchFor + "$(this).attr('id'): " + $(this).attr('id') );
              $(this).remove().prependTo( root.children(0) );
            }
            $(this).css( 'display', 'block');
            if ( $(this).hasClass('collapsible') ){
                $(this).find(defaults.content_class).hide();
                $(this).find(defaults.content_class).height($(this).find(defaults.content_class).height());
                $(this).find(defaults.close_class).css ( "cursor", "pointer" );
                $(this).find(defaults.header_class).css ( "cursor", "pointer" );
                $(this).find(defaults.close_class).click(function(e){
                    set($(this).parent().index());
                    return false;
                });

                $(this).find(defaults.header_class).click(function(e){
                    set($(this).parent().index());
                    return false;
                });
            } else {
                $(this).find(defaults.content_class).slideDown(defaults.speed, function(){} );
            }

            if ( $(this).attr('id') == searchFor && $(this).attr('id') != '' ){
              set(0);
            }
        });

        if ( root.settings.collapsed == false ) {
            if ( root.find(defaults.item_class+'.collapsible').length > 0 ) {
                set( root.find(defaults.item_class+'.collapsible').index() );
            } else {
                set( 0 );
            }
        }

        if ( root.find(defaults.item_class+'.noncollapsible').length > 0 ) {
            root.find(defaults.item_class+'.noncollapsible').css( 'display','block' );
        }

        root.css( "display", "block" );

        function set(index) {

            if ( root.settings.fading ) {
              root.find(defaults.item_class + ':eq(' + index + ')').find(defaults.content_class).find('.bio').hide();
              root.find(defaults.item_class + ':eq(' + index + ')').find(defaults.content_class).find('.bio').fadeOut();
            }
            var selected = root.find(defaults.item_class + '.selected');
            if ( selected.hasClass('collapsible') ){

                selected.find(defaults.content_class).find('.bio').hide();
                selected.find(defaults.content_class).slideUp(defaults.speed, function() {
                    $(this).parent().removeClass('selected');
                });
                root.find(defaults.close_class).removeClass('selected');
                //root.find(defaults.item_class).removeClass('selected');
                //selected.find('hr').first().removeClass('selected').find(defaults.content_class).slideUp(defaults.speed);
                //root.find(defaults.item_class).find('hr').first().removeClass('selected');
            }
            var top = 0;

            if(selected.index() != index) {
              var item = root.find(defaults.item_class + ':eq(' + index + ')');
              //item.find('hr').first().addClass('selected');
              item.find(defaults.close_class).addClass('selected');
              item.addClass('selected').find(defaults.content_class).slideDown(defaults.speed, function(){
                  $(this).find('.bio').fadeIn();

                  $(this).find("#lastupdate").each ( function() {
                      var dataRollover = new $.dataRollover($(this));
                  });
                  $(this).find('#sources').each ( function() {
                      var dataRollover = new $.dataRollover($(this));
                  });
                  if(defaults.callback) defaults.callback.call();
              });
          }

          var iterator = 0
          root.find(defaults.item_class).each( function() {
              if ( $(this).hasClass('collapsible') ){
                topArray[ iterator ] = $(this).offset().top;
                iterator++;
              }
          });
          var topIndex = root.find(defaults.item_class).length - iterator;

          var newTop = 0;
          if ( index == topIndex ) {
            newTop = topArray[0];
          } else {
            if ( root.find(defaults.header_class).height() > 50 ) {
              newTop = topArray[0] + ((root.find(defaults.header_class).height() + root.settings.offset) * (index) );
            } else {
              newTop = topArray[0] + ((root.find(defaults.header_class).height() + 1) * ( index - topIndex ));
            }
          }


          if ( root.settings.scrollTop ) {
            // console.log ( 'root.settings.scrollTop: ' + root.settings.scrollTop + ' newTop: ' + newTop );
            //$('body').css ('scrollTop', newTop );
              $('body, html').clearQueue();
              $('body, html').animate({
                scrollTop: newTop
              }, 200 );
          }
        }

        function tidy() {

          var skip = ['demographics', 'metrics', 'distribution', 'opportunities-by-device'];


          root.find(defaults.content_class + ' .row').each(function(i) {

            var unitId = $(this).parents('.unit-item').attr('id');

            if (jQuery.inArray(unitId, skip) == -1) {
              var rowWidth = 740; //$(this).width();
              var colWidth = 0;
              $(this).find('.col').each(function(i) {
                colWidth += $(this).width();
              });

              var diff = rowWidth - colWidth;
              if (diff > 0) {
                var lastCol = $(this).find('.col:last-child');
                lastCol.width(lastCol.width() + diff);
              }
            }
        });


      }
    });
  }
})(jQuery);


// accordion
(function($)
{
  $.specialAccordion = function(element, o)
  {
      var plugin = this;
      var defaults = {
          item_class: '.unit-item',
          header_class: '.unit-header',
          content_class: '.unit-content',
          close_class: '.unit-close',
          speed: 500,
          anchors: false,
          scrollTop: true
      };
      var settings = $.extend({}, defaults, o );
      var topArray = [];
      var iterator = 0;
      var currentHash = '';

      var init = function() {

          element.each(function(){
              element.find(defaults.item_class).each( function() {
                  $(this).css( 'display', 'block');
                  topArray[ iterator ] = $(this).offset().top;
                  iterator++;
                  $(this).find(defaults.content_class).height($(this).find(defaults.content_class).height());
                  $(this).find(defaults.close_class).css ( "cursor", "pointer" );
                  $(this).find(defaults.header_class).css ( "cursor", "pointer" );

                  $(this).find(defaults.close_class).click(function(e){
                      set($(this).parent().index(), true);
                      return false;
                  });

                  $(this).find(defaults.header_class).click(function(e){
                      set($(this).parent().index(), true);
                      return false;
                  });

                  if ( $(this).hasClass('collapsible') ){
                      $(this).find(defaults.content_class).hide();
                  } else {
                      $(this).find(defaults.content_class).slideDown(defaults.speed, function(){} );
                  }

                  //$(this).css( "display", "block" );
              });
          });


          if ( !settings.collapsed ) {
              if ( element.find(defaults.item_class+'.collapsible').length > 0 ) {
                  set( element.find(defaults.item_class+'.collapsible').index() );
              } else {
                  set( 0 );
              }
          }

          plugin.setByHash();
      }

      var set = function(index, close, noScrollFromNav) {
            if ( settings.fading ) {
                element.find(defaults.item_class + ':eq(' + index + ')').find(defaults.content_class).find('.bio').hide();
            }

            var selected = element.find(defaults.item_class + '.selected');

            var top = 0;

            if( selected.index() != index ) {

                selected.find(defaults.content_class).find('.bio').hide();
                selected.find(defaults.content_class).slideUp(defaults.speed, function() {
                    $(this).parent().removeClass('selected');
                });
                element.find(defaults.close_class).removeClass('selected');

                var item = element.find(defaults.item_class + ':eq(' + index + ')');
                //item.find('hr').first().addClass('selected');
                item.find(defaults.close_class).addClass('selected');
                if ( noScrollFromNav ) {
                    speed = 0;
                } else {
                    speed = defaults.speed;
                }
                item.addClass('selected').find(defaults.content_class).slideDown(speed, function(){
                    $(this).find('.bio').fadeIn();
                    if(defaults.callback) defaults.callback.call();
                });

                if ( settings.scrollTop ) {
                    if ( !noScrollFromNav ) {
                        $('body, html').clearQueue();
                        $('body, html').animate({
                          scrollTop: topArray[index]
                        }, 500 );
                    }
                }
            }

            if ( close && ( selected.index() == index )) {

                selected.find(defaults.content_class).find('.bio').hide();
                selected.find(defaults.content_class).slideUp(defaults.speed, function() {
                    $(this).parent().removeClass('selected');
                });
                element.find(defaults.close_class).removeClass('selected');
            }
      }

      var tidy = function() {
        element.find(defaults.content_class + ' .row').each(function(i) {
          var rowWidth = $(this).width();
          var colWidth = 0;
          $(this).find('.col').each(function(i) {
            colWidth += $(this).width();
          });

          var diff = rowWidth - colWidth;
          if (diff > 0) {
            var lastCol = $(this).find('.col:last-child');
            lastCol.width(lastCol.width() + diff);
          }
        });
      }

      plugin.setByHash = function() {
        var found = false;
        currentHash = window.location.hash;
        element.find(defaults.item_class).each( function() {
            var hash = window.location.hash.replace("#",'');
            if ( $(this).attr('id') == hash ) {
                set( $(this).index(), false, true );
                window.location = window.location.hash;
                found = true;
            }
        });
        if ( !found ) {
            element.find(defaults.item_class).each( function() {
                var hash = window.location.hash;
                var hashArr = window.location.hash.replace("#",'').split('-');
                if ( $(this).attr('id') == hashArr[0] ) {
                    set( $(this).index(), false, true );
                    window.location = window.location.hash;
                    //found = true;
                }
            });
        }
      }

      init();

      tidy();

      element.css( "display", "block" );
  }

})(jQuery);


// SUBNAV CUSTOM
(function($){
  $.subnav = function( element, o ) {
    var subnav = this;

    // fix brand landing/news menu classes
    if($('body.brands-brand').length > 0) {
      if ($('body.brands-brand.news', 'body.fairchild').length > 0) {
        $('#menu-block > ul.menu > li.first').removeClass('active-trail').find('a').removeClass('active-trail');
      }
      else {
        $('#menu-block > ul.menu > li.first').addClass('active-trail').addClass('active').find('a').addClass('active-trail').addClass('active');
      }
    }

    // fix press-release/news item active item
    if($('body.press-room-press-release, body.brand-feed-item').length > 0) {
      $('#menu-block > ul.menu > li:eq(1)').addClass('active-trail').addClass('active')
    }


    $('#menu-block .menu').css('display', 'block');
    $( "#menu-block > ul.menu > li.expanded" ).each( function(){
        var defaults = {
            item_class: 'ul.menu',
            header_class: 'li.expanded',
            content_class: 'ul.menu',
            speed: 500
        };

        $(this).find( defaults.content_class ).addClass("selected");

        $(this).append("<div class='carat caratExpand'></div>");

        $(this).find('.caratExpand').click(function(e){
            set( $(this).parent(), $(this).parent().index() );
            return false;
        });

        if ( !$(this).hasClass('active-trail') ){
            $(this).find( defaults.content_class ).removeClass('selected').slideUp(0);
            $(this).find( '.carat' ).removeClass( 'caratExpand' ).addClass( 'caratCollapse' );
            $(this).removeClass( 'expanded' ).addClass( 'collapsed' );
        }

        // ffm press-release active item
        if($('body.ffm-press-release').length > 0) {
          $('#menu-block .press-releases-contacts').parent().addClass('active');
          $('#menu-block .press-releases-contacts').parent().parent().addClass('selected').show().parent().addClass('active-trail expanded').removeClass('collapsed').find('a').addClass('active-trail');
        }

        function set( scope, index ) {
            scope.find( defaults.content_class ).each( function() {
                $(this).height( $(this).height() );
            });
            if( scope.find( defaults.content_class + '.selected')[0] == undefined ) {
                scope.find( '.carat' ).removeClass( 'caratCollapse' ).addClass( 'caratExpand' );
                scope.removeClass( 'collapsed' ).addClass( 'expanded' );
                scope.find( defaults.content_class ).each( function() {
                  $(this).find( '.collapsed.active-trail' ).removeClass( 'collapsed' ).addClass( 'expanded' );
                });
                scope.find( defaults.content_class ).addClass('selected').slideDown( defaults.speed );
            } else {
                scope.find( defaults.content_class ).removeClass('selected').slideUp(defaults.speed, function(){
                  $(this).parent().find( '.carat' ).removeClass( 'caratExpand' ).addClass( 'caratCollapse' );
                  $(this).parent().removeClass( 'expanded' ).addClass( 'collapsed' );
                });
            }
        }
    });
  };

  $.collage = function(element) {
    var left = 0;
    if (element.find('.item').length == 1 && element.find('#magazine').length == 1) {
      left = 25;
    }
    else {
      var margin = {
        'seven-inch': -22,
        'tablet': -60,
        'magazine': -60
      };

      var maxWidth = 0;
      element.find('.item').each(function(i) {
        var item = $(this);
        var itemWidth = item.position().left + item.width();

        if (typeof margin[item.attr('id')] !== 'undefined')
          itemWidth += margin[item.attr('id')];

        maxWidth = Math.max(maxWidth, itemWidth);
      });

      left = Math.round((element.width() - maxWidth) / 2);
    }
    element.css({'left': left}).removeClass('invisible');
  }

})(jQuery);

/**
 * miniFeatures
 */
;(function($) {

  $.miniFeatures = function(el, options) {

    var defaults = {
      width: 441,
      margin: 0,
      rolloverHide: false
    }

    var plugin = this;
    settings = {}
    plugin.el = el;

    var init = function() {
      settings = $.extend({}, defaults, options);

      plugin.container = plugin.el.find('.items');
      plugin.items = plugin.el.find('.item');
      plugin.len = plugin.items.length;
      plugin.index = 0;
      plugin.animating = false;

      plugin.videoPlayerCreated = [];
      plugin.currentVideos = [];
      plugin.videoPlayerReady = false;

      bindEvents();
      updateNav();


      $(plugin.items).each(function(i, item){
        if ( checkVideoByIndex(i) ) {
          plugin.currentVideos.push(getVideoPlayer(i));
        }
      });
    }

    // public
    plugin.setItem = function(index) {
      if (index == plugin.index || plugin.animating) return false;

      plugin.animating = true;

      var offset = Math.round( 0 );
      var animateTo;
      if (index > plugin.len - 1)
      {
        var factor = plugin.items.last().length;
        plugin.items.eq(factor).clone().addClass('clone').appendTo(plugin.container);
        animateTo = getContainerLeft() - getItemWidth() + 9;
        updateContainerWidth();
        index = 0;
      }
      else if (index < 0)
      {
        var factor = plugin.items.length;
        plugin.items.eq(plugin.len - (factor + 1)).clone().addClass('clone').prependTo(plugin.container);
        plugin.container.css('left', getContainerLeft() - ( getItemWidth() - 2 ) );
        animateTo = getContainerLeft() + getItemWidth() - 4;
        index = plugin.len - 1;
      }
      else if (index == 0 && plugin.index > 0)
      {
        var factor = plugin.items.length;
        plugin.items.eq(plugin.len - factor).clone().addClass('clone').prependTo(plugin.container);
        plugin.items.eq(plugin.len - (factor + 1)).clone().addClass('clone').prependTo(plugin.container);
        plugin.container.css('left', offset - ((plugin.index + 2) * (getItemWidth()-2)));
        animateTo = offset - (2 * getItemWidth());
      }
      else if (index == plugin.len - 1 && plugin.index < plugin.len - 1) {
        plugin.items.eq(0).clone().addClass('clone').appendTo(plugin.container);
        animateTo = getContainerLeft() + (getItemWidth() * (plugin.index - index));
      }
      else {
        animateTo = offset - ((index ) * getItemWidth());
      }


      $(plugin.currentVideos).each(function(i, v){
        console.log(v);
        v.seekTo(0);
        v.stopVideo();
      });

      plugin.index = index;
      updateContainerWidth();
      updateNav();
      plugin.container.clearQueue().animate({left: Math.round(animateTo)}, 500, animationComplete);
    }

    // private
    var updateContainerWidth = function() {
      plugin.container.width(getItemWidth() * plugin.el.find('.item').length);
    }

    var getContainerLeft = function() {
      return Number(plugin.container.css('left').replace('px', ''));
    }

    var getItemWidth = function() {
      // browser width + margin
      return settings.width + settings.margin;
    }

    var animationComplete = function() {
      resetItems();
      plugin.animating = false;
    }

    var resetItems = function() {

      plugin.container.find('.clone').remove();
      plugin.container.css({left: getContainerPosition()});

      if (plugin.index == plugin.len - 1)
      {
        plugin.items.first().clone().addClass('clone').appendTo(plugin.container);
      }
      else if (plugin.index == 0)
      {
        //plugin.items.last().clone().addClass('clone').prependTo(plugin.container);
        //plugin.container.css({left: getContainerPosition(1)});
      }

      updateContainerWidth();
    }

    var getContainerPosition = function(extra) {
      var offset = Math.round(0);
      return offset - Math.round((extra ? plugin.index + extra : plugin.index) * getItemWidth());
    }

    var updateNav = function() {
      var dot = plugin.el.find('.bottom .dot:eq(' + plugin.index +')');
      var dots = plugin.el.find('.bottom .dot');
      dots.find('a').removeClass( 'selected' );
      dot.find('a').addClass('selected');
    }

    var getItemWidth = function() {
      return settings.itemWidth;
    }

    var bindEvents = function() {
      plugin.el.find('.bottom .dot').click(dotClickHandler);
      plugin.el.find('.arrows a').click(arrowClickHandler);
      if ( settings.rolloverHide ) {
        plugin.el.find('.items .item').each(function(index)
        {
          $(this).find('.description').css({bottom: -$(this).innerHeight()});
          $(this).hover(function()
          {
            $(this).find('.description').show().animate({bottom: "0px"});
          }, function()
          {
            $(this).find('.description').hide().css({bottom: -$(this).innerHeight()});
          });
        });
      }
      $(document).keydown( keyboardHandler );
    }

    var dotClickHandler = function(e) {
      plugin.setItem($(this).index());
      e.stopPropagation();
      return false;
    }

    var arrowClickHandler = function(e) {
      if ($(this).hasClass('prev')) {
          plugin.setItem(plugin.index - 1);
      } else if ($(this).hasClass('next')) {
          plugin.setItem(plugin.index + 1);
      }
      e.stopPropagation();
      return false;
    }

    var keyboardHandler = function(e) {
      // keyboard click
      if (e.keyCode == 37) {
          plugin.setItem(plugin.index - 1);
          return false;
      }
      if (e.keyCode == 39) {
          plugin.setItem(plugin.index + 1);
          return false;
      }
    }

    // YouTube Video control
    var checkVideoByIndex = function( index ) {
      var item = plugin.el.find('.item:eq(' + index +')');
      if ( item.find(".video").length > 0 ) {
          return true;
      } else {
          return false;
      }
    }

    var getVideoPlayer = function( index ) {
      if ( plugin.videoPlayerCreated[index] == null ) {
          plugin.videoPlayerCreated[index] = getNewPlayerByID( plugin.el.find('.item:eq(' + index +')').find('.video').attr( 'id' ) );
      } else {
          plugin.videoPlayerCreated[index].playVideo();
      }
      return plugin.videoPlayerCreated[index];
    }

    var getNewPlayerByID = function( videoID ) {
      var player = new YT.Player( videoID, {
        width: '736',
        height: '458',
        videoId: videoID,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        },
        playerVars: {
          autoplay: 0,
          autohide: 1,
          rel: 0,
          hd: 1,
          modestbranding: 0,
          wmode: 'opaque'
        }
      });
      return player;
    }

    var onPlayerReady = function(evt) {

    }

    var onPlayerStateChange = function(evt) {
      if (evt.data == YT.PlayerState.PLAYING && !done) {
          done = true;
      }
    }

    // add the API jsut in case
    if ( plugin.el.find('.video').length > 0 ) {
      var tag = document.createElement('script');
      tag.async = true;
      tag.src = "http://www.youtube.com/player_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      var done = false;
    } else {
      init();
    }

    window.onYouTubePlayerAPIReady = function () {
      init();
    }; //.bind(plugin);

  }

})(jQuery);

(function($) {
    $.dataRollover = function( element, o ) {
      var left;
      var spanWidth;
      if ( $.browser.mozilla ) {
        spanWidth = element.find('span').width() + parseFloat( element.find('span').css('padding-left').replace('px', '')) + 1;
      } else {
        spanWidth = element.find('span').width() + parseFloat( element.find('span').css('padding-left').replace('px', '')) + parseFloat( element.find('span').css('padding-right').replace('px', ''));
      }
      left = Math.round(( spanWidth - (element.width() ) ) / -2);
      element.find( 'span' ).css( 'left', left );
      //console.log ( "left: " + element.find('span').css('padding-left').replace('px', '') );
    };
})(jQuery);


(function($) {

    $.metricsConfigure = function( element ) {
      var plugin = this;
      plugin.el = element;
      plugin.el.find('li').each( function(){
        var digitsWidth = $(this).find( '.digits' ).width();
        var newWidth = digitsWidth + $(this).find( '.subscript' ).width();
        $(this).find( '.digits' ).width( digitsWidth );
        $(this).find( '.digiContain' ).height( 60 );
        $(this).find( '.digiContain' ).width( newWidth );
        $(this).find( '.digiContain' ).css( 'left', (186 - newWidth) /2 );
        $(this).find( '.subscript' ).css( 'left', digitsWidth );
      });
    };

})(jQuery);


$(document).ready(function() {

    if ( $("#menu-block").length > 0 )
        var subnav = new $.subnav( $('#menu-block') );

    if ( $(".unit").length > 0 ) {
      if ( $(".executiveteam").length > 0 ) {
          var accordion = new $.accordion($('.unit'), {fading: true, collapsed: false, offset:13} );
      } else if ( $(".careers").length > 0 ) {
          var accordion = new $.accordion($('.unit'), {fading: true, collapsed: true} );
      } else if ( $(".terms-and-conditions").length > 0 ) {
        var privacyAccordion = new $.specialAccordion($('.unit'), {scrollTop: true, collapsed: true, anchors: true, offset: 2} );
        $(".top").find( 'a' ).click( function() {
            window.location = $(this).attr( 'href' );
            privacyAccordion.setByHash();
        });
      } else if ( $(".awards").length > 0 ) {
        var accordion = new $.accordion($('.unit'), {fading: true, collapsed: true, offset:12.2} );
      } else if ( $(".user-agreement").length > 0 ) {
        var accordion = new $.specialAccordion($('.unit'), {scrollTop: true, collapsed: true, anchors: true} );
      } else {
        var accordion = new $.accordion($('.unit'));
      }
    }

    $("#container").find("#lastupdate").each ( function() {
      var dataRollover = new $.dataRollover($(this));
    });
    $("#container").find('#sources').each ( function() {
      var dataRollover = new $.dataRollover($(this));
    });

    if ($("#collage").length > 0)
      var collage = new $.collage( $('#collage') );

    if ($(".brands-brand-product-licensing #product-licensing #slideshow, .global-product-licensing #slideshow, .global-generic-page #slideshow").length > 0) {
      var miniFeatures = new $.miniFeatures($('#slideshow'), {maskWidth:356, itemWidth: 356, rolloverHide: false});
    }

    if ($(".life-at-conde-nast #life-at-conde-nast #slideshow ").length > 0) {
      var miniFeatures = new $.miniFeatures($('.life-at-conde-nast #life-at-conde-nast #slideshow '), {maskWidth:736, itemWidth: 736, rolloverHide: false});
    }

    if ($("#careers #slideshow ").length > 0) {
      var miniFeatures = new $.miniFeatures($('#careers #slideshow '), {maskWidth:736, itemWidth: 736, rolloverHide: false});
    }

    if ($("body.media-partners-company-our-work").length > 0) {
      var opts = {};
      if ($("#group_id").length > 0) {
        opts.groupId = $("#group_id").val();
      }
      var work = new $.partnerWork(opts);
    }

    if ($("body.press-room-press-releases-contac").length > 0)
      var pressReleases = new $.ajaxContent({spinOptions: spinOptions, isFFM: $('body').hasClass('fairchild')});

    if ($("body.press-room-events").length > 0)
      var events = new $.ajaxContent({itemContainer: '#events ul', prefix: 'events_', spinOptions: spinOptions, isFFM: $('body').hasClass('fairchild')});

    if ($("body.about-us-landing").length > 0)
      var livingWall = new $.livingWall($('#brands'));

    if ($("#metrics").length > 0)
      var metricsConfigure = new $.metricsConfigure($('#metrics'));

});

jQuery.fn.adjustChildHeights = function()
{
  $(this).each(function(i)
  {
    var maxHeight = 0;
    $(this).children().each(function(j)
    {
      if($(this).height() > maxHeight)
      {
        maxHeight = $(this).height();
      }
    });
    if ($.browser.msie && $.browser.version == 6.0) { $(this).children().css({'height': maxHeight}); }
    $(this).children().css({'min-height': maxHeight});
  });
  return this;
};


/*!
 * jQuery Transit - CSS3 transitions and transformations
 * Copyright(c) 2011 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(d){function j(a){var b=["Moz","Webkit","O","ms"],c=a.charAt(0).toUpperCase()+a.substr(1);if(a in k.style)return a;for(a=0;a<b.length;++a){var d=b[a]+c;if(d in k.style)return d}}function i(a){"string"===typeof a&&this.parse(a);return this}function q(a,b,c){!0===b?a.queue(c):b?a.queue(b,c):c()}function m(a){var b=[];d.each(a,function(a){a=d.camelCase(a);a=d.transit.propertyMap[a]||a;a=s(a);-1===d.inArray(a,b)&&b.push(a)});return b}function r(a,b,c,p){a=m(a);d.cssEase[c]&&(c=d.cssEase[c]);
var f=""+n(b)+" "+c;0<parseInt(p,10)&&(f+=" "+n(p));var h=[];d.each(a,function(a,b){h.push(b+" "+f)});return h.join(", ")}function e(a,b){b||(d.cssNumber[a]=!0);d.transit.propertyMap[a]=h.transform;d.cssHooks[a]={get:function(b){return(d(b).css("transform")||new i).get(a)},set:function(b,h){var f=d(b).css("transform")||new i;f.setFromString(a,h);d(b).css({transform:f})}}}function s(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function g(a,b){return"string"===typeof a&&!a.match(/^[\-0-9\.]+$/)?
a:""+a+b}function n(a){d.fx.speeds[a]&&(a=d.fx.speeds[a]);return g(a,"ms")}d.transit={version:"0.1.2+",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:!0,useTransitionEnd:!0};var k=document.createElement("div"),t=-1<navigator.userAgent.toLowerCase().indexOf("chrome"),h={transition:j("transition"),transitionDelay:j("transitionDelay"),transform:j("transform"),
transformOrigin:j("transformOrigin")};d.extend(d.support,h);var o=h.transitionEnd={MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"}[h.transition]||null,k=null;d.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)"};d.cssHooks.transform={get:function(a){return d(a).data("transform")},set:function(a,b){var c=b;c instanceof i||(c=new i(c));a.style[h.transform]="WebkitTransform"===
h.transform&&!t?c.toString(!0):c.toString();d(a).data("transform",c)}};d.cssHooks.transformOrigin={get:function(a){return a.style[h.transformOrigin]},set:function(a,b){a.style[h.transformOrigin]=b}};e("scale");e("translate");e("rotate");e("rotateX");e("rotateY");e("rotate3d");e("perspective");e("skewX");e("skewY");e("x",!0);e("y",!0);i.prototype={setFromString:function(a,b){var c="string"===typeof b?b.split(","):b.constructor===Array?b:[b];c.unshift(a);i.prototype.set.apply(this,c)},set:function(a){var b=
Array.prototype.slice.apply(arguments,[1]);this.setter[a]?this.setter[a].apply(this,b):this[a]=b.join(",")},get:function(a){return this.getter[a]?this.getter[a].apply(this):this[a]||0},setter:{rotate:function(a){this.rotate=g(a,"deg")},rotateX:function(a){this.rotateX=g(a,"deg")},rotateY:function(a){this.rotateY=g(a,"deg")},scale:function(a,b){void 0===b&&(b=a);this.scale=a+","+b},skewX:function(a){this.skewX=g(a,"deg")},skewY:function(a){this.skewY=g(a,"deg")},perspective:function(a){this.perspective=
g(a,"px")},x:function(a){this.set("translate",a,null)},y:function(a){this.set("translate",null,a)},translate:function(a,b){if(void 0===this._translateX)this._translateX=0;if(void 0===this._translateY)this._translateY=0;if(null!==a)this._translateX=g(a,"px");if(null!==b)this._translateY=g(b,"px");this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var a=(this.scale||"1,1").split(",");a[0]&&
(a[0]=parseFloat(a[0]));a[1]&&(a[1]=parseFloat(a[1]));return a[0]===a[1]?a[0]:a},rotate3d:function(){for(var a=(this.rotate3d||"0,0,0,0deg").split(","),b=0;3>=b;++b)a[b]&&(a[b]=parseFloat(a[b]));a[3]&&(a[3]=g(a[3],"deg"));return a}},parse:function(a){var b=this;a.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(a,d,f){b.setFromString(d,f)})},toString:function(a){var b=[],c;for(c in this)this.hasOwnProperty(c)&&"_"!==c[0]&&(a&&"scale"===c?b.push(c+"3d("+this[c]+",1)"):a&&"translate"===c?b.push(c+"3d("+
this[c]+",0)"):b.push(c+"("+this[c]+")"));return b.join(" ")}};d.fn.transition=d.fn.transit=function(a,b,c,e){var f=this,g=0,i=!0;"function"===typeof b&&(e=b,b=void 0);"function"===typeof c&&(e=c,c=void 0);if("undefined"!==typeof a.easing)c=a.easing,delete a.easing;if("undefined"!==typeof a.duration)b=a.duration,delete a.duration;if("undefined"!==typeof a.complete)e=a.complete,delete a.complete;if("undefined"!==typeof a.queue)i=a.queue,delete a.queue;if(a.delay)g=a.delay,delete a.delay;if("undefined"===
typeof b)b=d.fx.speeds._default;if("undefined"===typeof c)c=d.cssEase._default;var b=n(b),j=r(a,b,c,g),l=d.transit.enabled&&h.transition?parseInt(b,10)+parseInt(g,10):0;if(0===l)return q(f,i,function(b){f.css(a);e&&e();b()}),f;var k={},m=function(b){var c=!1,g=function(){c&&f.unbind(o,g);0<l&&f.each(function(){this.style[h.transition]=k[this]||null});"function"===typeof e&&e.apply(f);"function"===typeof b&&b()};0<l&&o&&d.transit.useTransitionEnd?(c=!0,f.bind(o,g)):window.setTimeout(g,l);f.each(function(){0<
l&&(this.style[h.transition]=j);d(this).css(a)})};q(f,i,function(a){var b=0;"MozTransition"===h.transition&&25>b&&(b=25);window.setTimeout(function(){m(a)},b)});return this};d.transit.getTransitionValue=r})(jQuery);


/*
    jQuery plugin to detect flicks on elements
    Steve Gough 4/12/2010
*/


(function($) {
    $.fn.detectFlicks = function(options) {

        //for reference only
        var LeftToRight = 'left2right',
            RightToLeft = 'right2left',
            UpToDown = 'up2down',
            DownToUp = 'down2up';

        var flickController = {
            direction: '',
            isFlick: false
        };

        var defaults = {
            threshold: 15,
            axis: 'x',
            flickEvent: function() { return true; }
        };

        var options = $.extend(defaults, options);

        flickController.touchStart = function(e) {
            var $el = $(e.target);
            // this is where the touch was first detected
            this.isFlick = false;
            this.startX = event.targetTouches[0].clientX;
            this.startY = event.targetTouches[0].clientY;
            if (options.axis == 'y') {
                $el.bind('touchmove', flickController.touchMoveY);
            }
            else {
                $el.bind('touchmove', flickController.touchMoveX);
            }

            $el.bind('touchend', flickController.touchEnd);
        };

        flickController.touchMoveX = function(e) {

            event.preventDefault(); //no scrolling
            this.movedX = event.targetTouches[0].clientX;
            if (Math.abs(Math.abs(this.movedX) - Math.abs(this.startX)) > options.threshold) {
                this.isFlick = true;
                if (this.movedX > this.startX) {
                    flickController.direction = LeftToRight;
                }
                else {
                    flickController.direction = RightToLeft;
                }
            }
        };

        flickController.touchMoveY = function(e) {

            event.preventDefault(); //no scrolling
            this.movedY = event.targetTouches[0].clientY;
            if (Math.abs(Math.abs(this.movedY) - Math.abs(this.startY)) > options.threshold) {
                this.isFlick = true;
                if (this.movedY > this.startY) {
                    flickController.direction = UpToDown;
                }
                else {
                    flickController.direction = DownToUp;
                }
            }
        };

        // Evaluate the custom code if a flick was detected
        flickController.touchEnd = function(e) {
            var $el = $(e.target);
            if (this.isFlick) {
                options.flickEvent({ direction: flickController.direction });
            }
            $el.unbind('touchmove touchend');
        };

        obj = $(this);
        obj.bind('touchstart', flickController.touchStart);

        return flickController;
    };
})(jQuery);

/**
 * jQuery.timers - Timer abstractions for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2009/10/16
 *
 * @author Blair Mitchelmore
 * @version 1.2
 *
 **/

jQuery.fn.extend({
  everyTime: function(interval, label, fn, times) {
    return this.each(function() {
      jQuery.timer.add(this, interval, label, fn, times);
    });
  },
  oneTime: function(interval, label, fn) {
    return this.each(function() {
      jQuery.timer.add(this, interval, label, fn, 1);
    });
  },
  stopTime: function(label, fn) {
    return this.each(function() {
      jQuery.timer.remove(this, label, fn);
    });
  }
});

jQuery.extend({
  timer: {
    global: [],
    guid: 1,
    dataKey: "jQuery.timer",
    regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
    powers: {
      // Yeah this is major overkill...
      'ms': 1,
      'cs': 10,
      'ds': 100,
      's': 1000,
      'das': 10000,
      'hs': 100000,
      'ks': 1000000
    },
    timeParse: function(value) {
      if (value == undefined || value == null)
        return null;
      var result = this.regex.exec(jQuery.trim(value.toString()));
      if (result[2]) {
        var num = parseFloat(result[1]);
        var mult = this.powers[result[2]] || 1;
        return num * mult;
      } else {
        return value;
      }
    },
    add: function(element, interval, label, fn, times) {
      var counter = 0;

      if (jQuery.isFunction(label)) {
        if (!times)
          times = fn;
        fn = label;
        label = interval;
      }

      interval = jQuery.timer.timeParse(interval);

      if (typeof interval != 'number' || isNaN(interval) || interval < 0)
        return;

      if (typeof times != 'number' || isNaN(times) || times < 0)
        times = 0;

      times = times || 0;

      var timers = jQuery.data(element, this.dataKey) || jQuery.data(element, this.dataKey, {});

      if (!timers[label])
        timers[label] = {};

      fn.timerID = fn.timerID || this.guid++;

      var handler = function() {
        if ((++counter > times && times !== 0) || fn.call(element, counter) === false)
          jQuery.timer.remove(element, label, fn);
      };

      handler.timerID = fn.timerID;

      if (!timers[label][fn.timerID])
        timers[label][fn.timerID] = window.setInterval(handler,interval);

      this.global.push( element );

    },
    remove: function(element, label, fn) {
      var timers = jQuery.data(element, this.dataKey), ret;

      if ( timers ) {

        if (!label) {
          for ( label in timers )
            this.remove(element, label, fn);
        } else if ( timers[label] ) {
          if ( fn ) {
            if ( fn.timerID ) {
              window.clearInterval(timers[label][fn.timerID]);
              delete timers[label][fn.timerID];
            }
          } else {
            for ( var fn in timers[label] ) {
              window.clearInterval(timers[label][fn]);
              delete timers[label][fn];
            }
          }

          for ( ret in timers[label] ) break;
          if ( !ret ) {
            ret = null;
            delete timers[label];
          }
        }

        for ( ret in timers ) break;
        if ( !ret )
          jQuery.removeData(element, this.dataKey);
      }
    }
  }
});

var shuffle = function(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

jQuery(window).bind("unload", function() {
  jQuery.each(jQuery.timer.global, function(index, item) {
    jQuery.timer.remove(item);
  });
});

;(function ($, window, document, undefined) {

  var pluginName = 'heritageList',
      defaults = {
        ajaxPath: '/heritage/$id',
        listItemHeight: 158,
        duration: 500
      };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      $('.item a', this.element).click(this.clickHandler.bind(this));
      $('.item .close', this.element).live('click', this.closeClickHandler.bind(this));
      this.element.bind('closeStart closeEnd', this.closeHandler.bind(this));
      $(window).bind('hashchange', this.hashChange.bind(this)).trigger('hashchange');
    },

    clickHandler: function(e) {
      var parent = $(e.currentTarget).parent();
      var id = parent.attr('id');
      parent.attr('id', id + "temp");
      $.bbq.pushState('/' + id, 2);
      parent.attr('id', id);
      e.stopPropagation();
      e.preventDefault();
      return false;
    },

    closeClickHandler: function(e) {
      this.close();
      $.bbq.pushState('/', 2);
      e.preventDefault();
      return false;
    },

    closeHandler: function(e) {
      this.closing = e.type == 'closeStart';

      if (e.type == 'closeEnd' && this.markup) {
        this.open(this.markup);
        delete this.markup;
      }
    },

    hashChange: function(e) {
      var hash = $.param.fragment().replace('/', '');
      if (hash) {
        this.loadItem(hash);
      }
    },

    loadItem: function(hash) {

      if ($('.item.active', this.element).length > 0) {
        this.close();
      }

      var active =  $('#' + hash, this.element);
      active.addClass('active');

      var id = active.data('id');
      var url = this.options.ajaxPath.replace('$id', id);
      $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        success: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
      GlobalSpinner.show();
    },

    handleResponse: function(data) {
      if (!data.success) {
        this.handleError(null, data.message);
        return false;
      }

      if (this.closing) {
        this.markup = data.markup;
      }
      else {
        this.open(data.markup);
      }
    },

    handleError: function(jqXHR, textStatus, errorThrown) {
      console.log("Error: " + textStatus);
    },

    open: function(content) {
      var active = $('.item.active', this.element);
      active.addClass('expanded');
      active.append(content);

      active.find('.carousel').carousel({animateFirst: false});
      addthis.button('.addthis_button');

      var item = $('#item', active).hide().fadeIn(this.options.duration * 2);
      var height = item.height();
      active.css('height', this.options.listItemHeight).animate({'height': height}, this.options.duration, 'easeOutCirc', function() {
        $(this).removeAttr('style');
        $('html, body').animate({scrollTop: active.offset().top});
      });

      GlobalSpinner.hide();
    },

    close: function() {
      this.element.trigger('closeStart');
      var active = $('.item.active', this.element);
      var item = $('#item', active).fadeOut(this.options.duration);
      active.animate({height: this.options.listItemHeight, paddingBottom: 0}, this.options.duration, 'easeOutCirc', (function() {
        active.removeClass('active').removeClass('expanded');
        active.find('#item').remove();
        active.removeAttr('style');
        this.element.trigger('closeEnd');
      }).bind(this));
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  }

  $(function() {
    $('#heritage #list').heritageList();
  });

}(jQuery, window, document));

;(function ($, window, document, undefined) {

  var pluginName = 'heritageDecades',
      defaults = {};

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, defaults, options);
    this.current = 0;
    this.lastTop = 0;
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      $(window).scroll(this.scollHandler.bind(this));
      $('a', this.element).click(this.clickHandler);
    },

    scollHandler: function(e) {
      var scrollTop = $(window).scrollTop();
      var items = $('#heritage .decade');
      items.each(function(i, decade) {
        var top = $(decade).offset().top;
        var height =  $(decade).height();
        var diff = scrollTop - top;
        if (diff >= 0 && diff < height && this.current != decade.id) {
          this.current = decade.id;
          $('li', this.element).removeClass('active');
          $('li[data-decade="' + decade.id + '"]', this.element).addClass('active');
        }
      }.bind(this));
      
      var top = Math.max(72, Math.min($('#heritage').height() - this.element.height() - 25, $(window).scrollTop()));

      var delta = this.lastTop - top;
      if (delta < 0) {
        delta *= -1;
      }

      if (delta > 1) {
        this.element.css({top: top});
        this.lastTop = top;
      }
    },

    clickHandler: function(e) {
      var item = $('#heritage ' + this.hash).offset();
      $('body,html').animate({scrollTop: item.top});
      e.preventDefault();
      return false;
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  }

  $(function() {
    $('#heritage #decades').heritageDecades();
  });

}(jQuery, window, document));

;(function ($, window, document, undefined) {

  var pluginName = 'heritageSearch',
      defaults = {
        ajaxPath: '/heritage/search'
      };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      $('form', this.element).submit(this.submitHandler.bind(this));
      $('#heritage #search-meta .regularButton').click(this.clearClickHandler.bind(this))
    },

    submitHandler: function (e) {

      var data = {
        query: $('input[type="text"]', this.element).val(),
        type: this.options.type
      }

      $.ajax({
        url: this.options.ajaxPath,
        data: data,
        type: 'POST',
        dataType: 'json',
        success: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });

      e.preventDefault();
      return false;
    },

    handleResponse: function(data) {
      if (!data.success) {
        this.handleError(null, data.message);
        return false;
      }

      $('#heritage #search-meta .num').text(data.num);
      $('#heritage #search-meta .keywords').text(data.keywords);

      $('#heritage #contact, #heritage #decades').addClass('hidden');
      $('#heritage #search-meta').removeClass('hidden');

      if (this.options.type == 'list') {
        this.handleList(data.result)
      }
      else if(this.options.type == 'items') {
        this.handleItems(data.result);
      }
    },

    handleError: function(jqXHR, textStatus, errorThrown) {
      console.log("Error: " + textStatus);
    },

    handleList: function(list) {
      $('#heritage #list .item').each(function(i) {
        var id = $(this).data('id').toString();
        if (list.indexOf(id) != -1) {
          $(this).removeClass('hidden');
        }
        else {
          $(this).addClass('hidden');
        }
      });
    },

    handleItems: function(items) {
      var item = $('#heritage #item');
      var list = $('<div id="list" />').html(items);
      list.insertAfter(item);
      list.heritageList();
      item.addClass('hidden');
    },

    clearClickHandler: function(e) {

      if (this.options.type == 'list') {
        $('#heritage #list .item').each(function(i) {
          $(this).removeClass('hidden');
        });
      }
      else if (this.options.type == 'items') {
        $('#heritage #item').removeClass('hidden');
        $('#heritage #list').remove();
      }

      $('#heritage #contact, #heritage #decades').removeClass('hidden');
      $('#heritage #search-meta').addClass('hidden');
      $('#heritage #search input').val("");

      e.preventDefault();
      return false;
    }

  };

  $.fn[pluginName] = function(options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  }

  $(function() {
    var opts = {
      type:  $("#heritage #list").length == 1 ? 'list' : 'items'
    }
    $('#heritage #search').heritageSearch(opts);
  });

}(jQuery, window, document));

;(function ($, window, document, undefined) {

  var pluginName = 'carousel',
      defaults = {
        duration: 200,
        animateFirst: false
      };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.index = 0;
      this.items = $('.carousel-item', this.element);
      this.max = this.items.length - 1;
      this.options.width = this.items.first().outerWidth();
      this.options.variableHeight = this.element.data('height') == 'variable';
      
      if ($('.video', this.element).length > 0) {
        this.loadVideoAPI();
      }

      //$('.carousel-item:not(:first)', this.element).remove();
      $('.carousel-item', this.element).slice(1).remove();

      $('.prev, .next', this.element).click(this.clickHandler.bind(this));

      if (this.options.variableHeight) {
        this.initVariableHeight();
      }
    },

    loadVideoAPI: function() {

      if (!window.YOUTUBE_IFRAME_API) {
        var tag = document.createElement('script');
        tag.src = "//www.youtube.com/iframe_api";
        
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.YOUTUBE_IFRAME_API = true;
      }

      window.onYouTubeIframeAPIReady = function() {
        window.YOUTUBE_IFRAME_API_READY = true;
        console.log("onYouTubeIframeAPIReady");
      }
    },

    clickHandler: function(e) {
      this.slide(this.index + ($(e.currentTarget).hasClass('prev') ? -1 : 1));
      e.preventDefault();
      return false;
    },

    initVariableHeight: function() {
      this.updateHeight();
      $('img', this.items.first()).load((function(e) {
        this.updateHeight();
      }).bind(this));
    },

    updateHeight: function() {
      if (!this.options.variableHeight) {
        return false;
      }
      var height = $(this.items[this.index]).height();
      if (height > 100) {
        var opts = {height: height};
        if (this.options.animateFirst) {
          $('.viewport', this.element).animate(opts, this.options.duration);
        }
        else {
          $('.viewport', this.element).css(opts);
          this.options.animateFirst = true;
        }
      }
    },

    slide: function(index) {

      if (this.animating) {
        return false;
      }

      var dir = index - this.index;

      if (index < 0) {
        index = this.max;
      }
      else if (index > this.max) {
        index = 0;
      }
      
      var current = this.items[this.index];
      var next = this.items[index];

      if ($(next).hasClass('video')) {
        this.stopAllVideos();
      }

      if ($(current).hasClass('video')) {
        $('iframe', current).hide();
      }

      $(current).addClass('remove');

      if ($('.index .current', this.element).length > 0) {
        $('.index .current', this.element).text(index + 1);
      }

      this.items.remove();

      var container = $('.carousel-items', this.element);
      var negativeWidth = this.options.width * -1;
      var left = 0;

      if (dir > 0) {
        container.append(current).append(next);
        container.css('left', 0);
        left = negativeWidth;
      }
      else {
        container.prepend(current).prepend(next);
        container.css('left', negativeWidth);
      }

      container.animate({left: left}, this.options.duration, this.slideComplete.bind(this));
      
      this.animating = true;
      this.index = index;
      this.updateHeight();
    },

    slideComplete: function() {
      $('.remove', this.element).removeClass('remove').remove();
      $('.carousel-items', this.element).css('left', 0);
      this.animating = false;

      $('iframe', this.elements).show();

    },

    stopAllVideos: function() {
      $('.carousel .video iframe').each(function(i) {
        new YT.Player(this.id, { 
          events: { 
            onReady: function (e) { 
              e.target.pauseVideo();
            } 
          } 
        }); 
      });
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  }

  $(function() {
    $('.carousel').carousel();
  });

}(jQuery, window, document));


;(function ($, window, document, undefined) {

  var pluginName = 'homepageCarousel',
      defaults = {
        jsonPath: '/sites/all/files/cache/carousel.json',
        width: 1200,
        height: 546,
        margin: 4,
        cycle: 5000
      };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.container = $('.container', this.element);
      this.visibility = $('#ribbon .hp-carousel-visibility');
      this.dots = $('#ribbon .hp-carousel-dots');
      this.arrows = $('#ribbon .right .btn');
      this.loadJSON();
    },

    // INITS

    loadJSON: function(id) {

      this.spinner = new Spinner(window.SPIN_OPTIONS).spin();
      $(this.spinner.el).addClass('spinner');
      this.element.append(this.spinner.el);

      $.ajax({
        url: this.options.jsonPath + '?r=' + Math.random(),
        type: 'GET',
        dataType: 'json',
        success: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
    },

    handleResponse: function(data) {
      if (!data.success) {
        this.handleError(null, data.message);
        return false;
      }

      this.data = data;
      this.initCarousel();
    },

    handleError: function(jqXHR, textStatus, errorThrown) {
      console.log("Error: " + textStatus);
    },

    initCarousel: function() {

      $(this.data.items).each((function(i, item) {

        var data = item;

        if (item == 'random_brand') {
          data = item = this.getRandomBrand();
          data.classes += ' random skip';
        }
        else if (item.type == 'brand' && this.data.brands[item.nid]) {
          data = this.data.brands[item.nid];
        }

        var el = $(Mustache.render(this.data.templates[item.type], data));
        el.data('type', item.type);
        this.container.append(el);

        this.dots.append(Mustache.render(this.data.templates['dot'], {index: i}));
      }).bind(this));
      
      this.items = $('.item', this.element);
      this.len = this.items.length;
      this.index = 0;
      this.animating = false;

      this.items.last().clone().addClass('clone').prependTo(this.container);
      this.container.css('left', this.getContainerPosition(1));
      this.updateContainerWidth();

      $('a', this.dots).click(this.dotClickHandler.bind(this)).first().addClass('active');
      $('.item.link', this.container).live('click', this.linkItemClickHandler);
      this.visibility.click(this.visibilityClickHandler.bind(this));
      this.arrows.click(this.arrowClickHandler.bind(this));

      this.initItems();
    },

    initItems: function() {
      this.getAllItems().each((function (i, item) {
        var bgImg = $('.background img', item)[0];
        if (bgImg && (bgImg.complete || bgImg.readyState === 4)) {
          this.itemComplete(item);
        }
        else {
          $(bgImg).load((function(e){
            this.itemComplete(item);
          }).bind(this));
        }
      }).bind(this));
    },

    itemComplete: function(item) {
      $('.background', item).fadeIn();

      if (item == this.items[0]) {
        this.startCarousel();
      }
    },

    startCarousel: function() {

      this.spinner.stop();
      $(this.spinner.el).remove();
      delete this.spinner;

      if (!$.cookie('cn_video') && this.data.video) {
        $(this).oneTime(2000, this.openVideo.bind(this));
      }
      else {
        this.animateItem('intro');
        this.startCycle();
      }
    },

    // INTERACTION

    dotClickHandler: function(e) {
      this.setItem($(e.currentTarget).index());
      e.preventDefault();
      return false;
    },

    visibilityClickHandler: function(e) {

      if ($(e.currentTarget).hasClass('collapse')) {
        this.collapse();
      }
      else {
        this.expand();
      }

      e.preventDefault();
      return false;
    },

    arrowClickHandler: function(e) {
      this.setItem(this.index + ($(e.currentTarget).hasClass('prev') ? -1 : 1));
      e.preventDefault();
      return false;
    },

    linkItemClickHandler: function(e) {
      var link = $(this).find('.button a');
      window.open(link.attr('href'), link.attr('target'));
      return false;
    },

    // CAROUSEL

    setItem: function(index) {

      if (index == this.index || this.animating) {
        return false;
      }

      this.closeVideo();
      this.stopCycle();
      this.animating = true;

      var offset = Math.round(($(window).width() - this.getItemWidth()) / 2);
      var animateTo;
      if (index > this.len - 1) {
        var factor = $('#' + this.items.first().attr('id')).length;
        this.items.eq(factor).clone().addClass('clone').appendTo(this.container);
        this.items.eq(factor + 1).clone().addClass('clone').appendTo(this.container);
        animateTo = this.getContainerLeft() - this.getItemWidth();
        this.updateContainerWidth();
        index = 0;
      }
      else if (index < 0) {
        var factor = $('#' + this.items.last().attr('id')).length;
        this.items.eq(this.len - (factor + 1)).clone().addClass('clone').prependTo(this.container);
        this.items.eq(this.len - (factor + 2)).clone().addClass('clone').prependTo(this.container);
        this.container.css('left', this.getContainerLeft() - (2 * this.getItemWidth()));
        animateTo = this.getContainerLeft() + this.getItemWidth();
        index = this.len - 1;
      }
      else if (index == 0 && this.index > 0) {
        var factor = $('#' + this.items.last().attr('id')).length;
        this.items.eq(this.len - factor).clone().addClass('clone').prependTo(this.container);
        this.items.eq(this.len - (factor + 1)).clone().addClass('clone').prependTo(this.container);
        this.container.css('left', offset - ((this.index + 2) * this.getItemWidth()));
        animateTo = offset - (2 * this.getItemWidth());
      }
      else if (index == this.len - 1 && this.index < this.len - 1) {
        this.items.eq(0).clone().addClass('clone').appendTo(this.container);
        this.items.eq(1).clone().addClass('clone').appendTo(this.container);
        animateTo = this.getContainerLeft() + (this.getItemWidth() * (this.index - index));
      }
      else {
        animateTo = offset - ((index + (this.index == 0 ? 1 : 0)) * this.getItemWidth());
      }

      this.animateItem('outro');
      this.index = index;
      this.updateContainerWidth();
      this.container.clearQueue().animate({left: Math.round(animateTo)}, 500, this.animationComplete.bind(this));

      $('a', this.dots).removeClass('active').eq(this.index).addClass('active');
    },

    animationComplete: function() {
      this.resetItems();
      this.animating = false;
      this.updateRandomBrand();
      this.animateItem('intro');
    },

    resetItems: function() {

      this.container.find('.clone').remove();
      this.container.css({left: this.getContainerPosition()});

      if (this.index == this.len - 1) {
        this.items.first().clone().addClass('clone').appendTo(this.container);
      }
      else if (this.index == 0) {
        this.items.last().clone().addClass('clone').prependTo(this.container);
        this.container.css({left: this.getContainerPosition(1)});
      }

      this.updateContainerWidth();
    },

    animateItem: function(animation, item, type) {

      if (item == undefined) {
        item = this.items.eq(this.index);
      }

      item = $(item);

      if (type == undefined) {
        type = item.data('type');
      }

      var animationType = $('html.ie7, html.ie8').length > 0 ? this.animationsSimple[type] : this.animations[type];
      if (animationType && animationType[animation]) {
        animationType[animation].apply(this, [item]);
      }
      else {
        console.log("Animation not found: " + type + " " + animation);
      }
    },

    // VISIBILITY 

    collapse: function() {

      this.closeVideo();
      this.stopCycle();

      this.element.animate({marginTop: -461});
      $('#ribbon .hp-carousel-dots').fadeOut();
      $('#ribbon .right a.btn').fadeOut();
      $('#ribbon .hp-carousel-visibility').removeClass('collapse').addClass('expand').find('.label').text('Expand');

      $('#topnav .overlay').fadeOut();

      if (!$('html').hasClass('ie7')) {
        $('#highlight, #post-content').slideUp();
        $('#main').animate({marginTop: -46});
        $('#brand-news').animate({paddingTop: 62});
      }
      else {
        $('#highlight, #post-content').hide();
        $('#main').css({marginTop: -69});
        $('#brand-news').css({paddingTop: 62});
        $('#homepage-carousel .container').css({height: 83, top: -465});
      }
    },

    expand: function() {
      this.element.animate({marginTop: 0});
      $('#ribbon .hp-carousel-dots').fadeIn();
      $('#ribbon .right a.btn').fadeIn();
      $('#ribbon .hp-carousel-visibility').removeClass('expand').addClass('collapse').find('.label').text('Collapse');

      $('#topnav .overlay').fadeIn();

      if (!$('html').hasClass('ie7')) {
        $('#highlight, #post-content').slideDown();
        $('#main').animate({marginTop: 0});
        $('#brand-news').animate({paddingTop: 20});
      }
      else {
        $('#highlight, #post-content').show();
        $('#main').css({marginTop: 0});
        $('#brand-news').css({paddingTop: 20});
        $('#homepage-carousel .container').css({height: 546, top: 0});
      }
    },

    // CYCLE

    startCycle: function() {
      this.stopCycle();
      this.timer = setTimeout(this.cycle.bind(this), this.options.cycle);
    },

    stopCycle: function() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },

    cycle: function() {
      this.setItem(this.index + 1);
      this.startCycle();
    },

    // OPENING VIDEO

    openVideo: function() {

      var video = $(Mustache.render(this.data.templates.video));
      $('.close', video).click(this.videoCloseClickHandler.bind(this));
      this.items.first().append(video);
      
      var tag = document.createElement('script');
      tag.src = "//www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var _this = this;
      window.onYouTubeIframeAPIReady = function() {

        $.cookie('cn_video', 'true', {path: '/'});
        video.fadeIn();

        _this.video = new YT.Player('opening-video', {
          height: '414',
          width: '736',
          videoId: _this.data.video,
          playerVars: {
            autoplay: 1,
            autohide: 1,
            rel: 0,
            hd: 1,
            modestbranding: 0,
            wmode: 'opaque',
            controls: 1
          },
          events: {
            onReady: function(e) {},
            onStateChange: function(e) {
              if (e.data == YT.PlayerState.ENDED) {
                _this.closeVideo(true);
              }
            }
          }
        });
      }
    },

    closeVideo: function(cycle) {

      if (!this.video) {
        return false;
      }

      _this = this;
      $('.video', this.container).fadeOut(500, function(){
        _this.video.stopVideo();
        _this.video.destroy();
        $(this).remove();
        delete _this.video;
        _this.animateItem('in');
        if (cycle) {
          _this.startCycle();
        }
      });
    },

    videoCloseClickHandler: function(e) {
      this.closeVideo();
      e.preventDefault();
      return false;
    },

    // RANDOM BRAND
    
    getRandomBrand: function() {
      var keys = Object.keys(this.data.brands);
      var key;
      var inCarousel = true;
      while (inCarousel) {
        key = keys[Math.floor(Math.random() * keys.length)];
        inCarousel = $('#' + key, this.container).length > 0;
      }
      return this.data.brands[key];
    },

    updateRandomBrand: function() {

      this.items.eq(this.index).removeClass('skip');

      $(this.items).each((function(i, item) {
        item = $(item);
        if (item.hasClass('random') && !item.hasClass('skip')) {

          var delta = this.index - item.index();
          if (delta < 0) {
            delta *= -1;
          }

          if ((this.len < 4 && delta == 1) || (this.len >= 4 && delta > 2)) {
            var data = this.getRandomBrand();
            var random = $(Mustache.render(this.data.templates.brand, data));
            item.html(random.html()).attr('id', random.attr('id')).attr('class', random.attr('class')).addClass('random skip');
            $('.background', item).show();
          }
        }
      }).bind(this));

    },

    // HELPERS

    getContainerPosition: function(increment) {
      var index = increment ? this.index + increment : this.index;
      var itemWidth = this.getItemWidth();
      var offset = Math.round((Math.max(974, $(window).width()) - itemWidth) / 2);
      return offset - Math.round(index * itemWidth);
    },

    getContainerLeft: function() {
      return Number(this.container.css('left').replace('px', ''));
    },

    getItemWidth: function() {
      return this.options.width + this.options.margin;
    },

    getAllItems: function() {
      return $('.item', this.element);
    },

    updateContainerWidth: function() {
      this.container.width(this.getItemWidth() * this.getAllItems().length);
    },

    // ITEM ANIMATIONS

    animations: {
      styles: {
        bottom: {
          visible: { opacity: 1, bottom: 0 },
          hidden: { opacity: 0, bottom: -20 }
        }
      },
      standard: {
        intro: function(item) {
          var content = $('.content', item);
          content.css('margin-top', - content.height() / 2).fadeIn();

          var image =  $('.image', item);
          if (image.hasClass('bottom')) {
            image.clearQueue().css(this.animations.styles.bottom.hidden).show().animate(this.animations.styles.bottom.visible);
          }
          else {
            image.css('margin-top', - image.height() / 2).fadeIn();
          }
        },
        outro: function(item) {
          $('.content', item).fadeOut();
          
          var image =  $('.image', item);
          if (image.hasClass('bottom')) {
            image.clearQueue().css(this.animations.styles.bottom.visible).animate(this.animations.styles.bottom.hidden);
          }
          else {
            image.fadeOut();
          }
        }
      },
      brand: {
        intro: function(item) {
          $('.content', item).fadeIn();
          $('.logo', item).clearQueue().css(this.animations.styles.bottom.hidden).show().animate(this.animations.styles.bottom.visible);
        },
        outro: function(item) {
          $('.content', item).fadeOut();
          $('.logo', item).clearQueue().css(this.animations.styles.bottom.visible).animate(this.animations.styles.bottom.hidden);
        }
      },
      frame: {
        intro: function(item) {
          var content = $('.content', item);
          content.css('margin-top', - content.height() / 2).fadeIn();

          $('.frames img', item).each(function(i) {
            $(this).delay((i + 1) * 100).fadeIn();
          });

        },
        outro: function(item) {
          $('.content', item).fadeOut();
          $('.frames img', item).fadeOut();
        }
      },
      polaroid: {
        intro: function(item) {
          var content = $('.content', item);
          content.css('margin-top', - content.height() / 2).fadeIn();

          $('.polaroids img', item).each(function(i) {
            var css = {
              marginLeft: - $(this).width() / 2,
              marginTop: - $(this).height() / 2
            }

            if ($('html.ie7, html.ie8').length > 0) {

              $(this).css(css).delay((i + 1) * 100).show();
            } 
            else { 
              $(this).css(css).delay((i + 1) * 100).fadeIn();
            }
          });

        },
        outro: function(item) {
          $('.content', item).fadeOut();

          var items = $('.polaroids img', item);

          if ($('html.ie7, html.ie8').length > 0) {
            items.hide();
          }
          else {
            items.fadeOut();
          }
        }
      }
    },

    animationsSimple: {
      standard: {
        intro: function(item) {
          var content = $('.content', item);
          content.css('margin-top', - content.height() / 2).show();

          var image =  $('.image', item);
          image.show();
        },
        outro: function(item) {
          $('.content', item).hide();
          
          var image =  $('.image', item);
          image.hide();
        }
      },
      brand: {
        intro: function(item) {
          $('.content', item).show();
          $('.logo', item).show();
        },
        outro: function(item) {
          $('.content', item).hide();
          $('.logo', item).hide();
        }
      },
      frame: {
        intro: function(item) {
          var content = $('.content', item);
          content.css('margin-top', - content.height() / 2).show();

          $('.frames img', item).each(function(i) {
            $(this).delay((i + 1) * 100).show();
          });

        },
        outro: function(item) {
          $('.content', item).hide();
          $('.frames img', item).hide();
        }
      },
      polaroid: {
        intro: function(item) {
          var content = $('.content', item);
          content.css('margin-top', - content.height() / 2).show();

          $('.polaroids img', item).each(function(i) {
            var css = {
              marginLeft: - $(this).width() / 2,
              marginTop: - $(this).height() / 2
            }
            $(this).css(css).delay((i + 1) * 100).show();
          });

        },
        outro: function(item) {
          $('.content', item).hide();
          var items = $('.polaroids img', item);
          items.hide();
        }
      }
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  }

  $(function() {
    $('#homepage-carousel').homepageCarousel();
  });

}(jQuery, window, document));

if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
 
    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };
 
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
 
    return fBound;
  };
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}

if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;
 
    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
 
      var result = [];
 
      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop);
      }
 
      if (hasDontEnumBug) {
        for (var i=0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
        }
      }
      return result;
    }
  })()
};


// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
  def: 'easeOutQuad',
  swing: function (x, t, b, c, d) {
    //alert(jQuery.easing.default);
    return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
  },
  easeInQuad: function (x, t, b, c, d) {
    return c*(t/=d)*t + b;
  },
  easeOutQuad: function (x, t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  },
  easeInOutQuad: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  },
  easeInCubic: function (x, t, b, c, d) {
    return c*(t/=d)*t*t + b;
  },
  easeOutCubic: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  },
  easeInOutCubic: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  },
  easeInQuart: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
  },
  easeOutQuart: function (x, t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  easeInOutQuart: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
  },
  easeInQuint: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
  },
  easeOutQuint: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
  },
  easeInOutQuint: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
  },
  easeInSine: function (x, t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },
  easeOutSine: function (x, t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
  },
  easeInOutSine: function (x, t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  },
  easeInExpo: function (x, t, b, c, d) {
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function (x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  },
  easeOutCirc: function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  },
  easeInOutCirc: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  },
  easeInElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  },
  easeOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  },
  easeInOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
  },
  easeInBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
  },
  easeOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  },
  easeInOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158; 
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  },
  easeInBounce: function (x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
  },
  easeOutBounce: function (x, t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
  },
  easeInOutBounce: function (x, t, b, c, d) {
    if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
    return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
  }
});

(function(a,b){"object"==typeof exports&&exports?module.exports=b:"function"==typeof define&&define.amd?define(b):a.Mustache=b})(this,function(){function h(a,b){return RegExp.prototype.test.call(a,b)}function i(a){return!h(d,a)}function k(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function m(a){return(a+"").replace(/[&<>"'\/]/g,function(a){return l[a]})}function n(a){this.string=a,this.tail=a,this.pos=0}function o(a,b){this.view=a,this.parent=b,this.clearCache()}function p(){this.clearCache()}function q(a){function c(a,c,d){if(!b[a]){var e=q(c);b[a]=function(a,b){return e(a,b,d)}}return b[a]}var b={};return function(b,d,e){for(var g,h,f="",i=0,j=a.length;j>i;++i)switch(g=a[i],g[0]){case"#":h=e.slice(g[3],g[5]),f+=b._section(g[1],d,h,c(i,g[4],e));break;case"^":f+=b._inverted(g[1],d,c(i,g[4],e));break;case">":f+=b._partial(g[1],d);break;case"&":f+=b._name(g[1],d);break;case"name":f+=b._escaped(g[1],d);break;case"text":f+=g[1]}return f}}function r(a){for(var e,b=[],c=b,d=[],f=0,g=a.length;g>f;++f)switch(e=a[f],e[0]){case"#":case"^":d.push(e),c.push(e),c=e[4]=[];break;case"/":var h=d.pop();h[5]=e[2],c=d.length>0?d[d.length-1][4]:b;break;default:c.push(e)}return b}function s(a){for(var c,d,b=[],e=0,f=a.length;f>e;++e)c=a[e],"text"===c[0]&&d&&"text"===d[0]?(d[1]+=c[1],d[3]=c[3]):(d=c,b.push(c));return b}function t(a){return[RegExp(k(a[0])+"\\s*"),RegExp("\\s*"+k(a[1]))]}var a={};a.name="mustache.js",a.version="0.7.2",a.tags=["{{","}}"],a.Scanner=n,a.Context=o,a.Writer=p;var b=/\s*/,c=/\s+/,d=/\S/,e=/\s*=/,f=/\s*\}/,g=/#|\^|\/|>|\{|&|=|!/,j=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},l={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};a.escape=m,n.prototype.eos=function(){return""===this.tail},n.prototype.scan=function(a){var b=this.tail.match(a);return b&&0===b.index?(this.tail=this.tail.substring(b[0].length),this.pos+=b[0].length,b[0]):""},n.prototype.scanUntil=function(a){var b,c=this.tail.search(a);switch(c){case-1:b=this.tail,this.pos+=this.tail.length,this.tail="";break;case 0:b="";break;default:b=this.tail.substring(0,c),this.tail=this.tail.substring(c),this.pos+=c}return b},o.make=function(a){return a instanceof o?a:new o(a)},o.prototype.clearCache=function(){this._cache={}},o.prototype.push=function(a){return new o(a,this)},o.prototype.lookup=function(a){var b=this._cache[a];if(!b){if("."===a)b=this.view;else for(var c=this;c;){if(a.indexOf(".")>0){var d=a.split("."),e=0;for(b=c.view;b&&d.length>e;)b=b[d[e++]]}else b=c.view[a];if(null!=b)break;c=c.parent}this._cache[a]=b}return"function"==typeof b&&(b=b.call(this.view)),b},p.prototype.clearCache=function(){this._cache={},this._partialCache={}},p.prototype.compile=function(b,c){var d=this._cache[b];if(!d){var e=a.parse(b,c);d=this._cache[b]=this.compileTokens(e,b)}return d},p.prototype.compilePartial=function(a,b,c){var d=this.compile(b,c);return this._partialCache[a]=d,d},p.prototype.compileTokens=function(a,b){var c=q(a),d=this;return function(a,e){if(e)if("function"==typeof e)d._loadPartial=e;else for(var f in e)d.compilePartial(f,e[f]);return c(d,o.make(a),b)}},p.prototype.render=function(a,b,c){return this.compile(a)(b,c)},p.prototype._section=function(a,b,c,d){var e=b.lookup(a);switch(typeof e){case"object":if(j(e)){for(var f="",g=0,h=e.length;h>g;++g)f+=d(this,b.push(e[g]));return f}return e?d(this,b.push(e)):"";case"function":var i=this,k=function(a){return i.render(a,b)},l=e.call(b.view,c,k);return null!=l?l:"";default:if(e)return d(this,b)}return""},p.prototype._inverted=function(a,b,c){var d=b.lookup(a);return!d||j(d)&&0===d.length?c(this,b):""},p.prototype._partial=function(a,b){a in this._partialCache||!this._loadPartial||this.compilePartial(a,this._loadPartial(a));var c=this._partialCache[a];return c?c(b):""},p.prototype._name=function(a,b){var c=b.lookup(a);return"function"==typeof c&&(c=c.call(b.view)),null==c?"":c+""},p.prototype._escaped=function(b,c){return a.escape(this._name(b,c))},a.parse=function(d,h){function v(){if(q&&!u)for(;p.length;)o.splice(p.pop(),1);else p=[];q=!1,u=!1}if(d=d||"",h=h||a.tags,"string"==typeof h&&(h=h.split(c)),2!==h.length)throw Error("Invalid tags: "+h.join(", "));for(var w,x,y,z,j=t(h),l=new n(d),m=[],o=[],p=[],q=!1,u=!1;!l.eos();){if(w=l.pos,y=l.scanUntil(j[0]))for(var A=0,B=y.length;B>A;++A)z=y.charAt(A),i(z)?p.push(o.length):u=!0,o.push(["text",z,w,w+1]),w+=1,"\n"===z&&v();if(w=l.pos,!l.scan(j[0]))break;if(q=!0,x=l.scan(g)||"name",l.scan(b),"="===x)y=l.scanUntil(e),l.scan(e),l.scanUntil(j[1]);else if("{"===x){var C=RegExp("\\s*"+k("}"+h[1]));y=l.scanUntil(C),l.scan(f),l.scanUntil(j[1]),x="&"}else y=l.scanUntil(j[1]);if(!l.scan(j[1]))throw Error("Unclosed tag at "+l.pos);if("/"===x){if(0===m.length)throw Error('Unopened section "'+y+'" at '+w);var D=m.pop();if(D[1]!==y)throw Error('Unclosed section "'+D[1]+'" at '+w)}var E=[x,y,w,l.pos];if(o.push(E),"#"===x||"^"===x)m.push(E);else if("name"===x||"{"===x||"&"===x)u=!0;else if("="===x){if(h=y.split(c),2!==h.length)throw Error("Invalid tags at "+w+": "+h.join(", "));j=t(h)}}var D=m.pop();if(D)throw Error('Unclosed section "'+D[1]+'" at '+l.pos);return r(s(o))};var u=new p;return a.clearCache=function(){return u.clearCache()},a.compile=function(a,b){return u.compile(a,b)},a.compilePartial=function(a,b,c){return u.compilePartial(a,b,c)},a.compileTokens=function(a,b){return u.compileTokens(a,b)},a.render=function(a,b,c){return u.render(a,b,c)},a.to_html=function(b,c,d,e){var f=a.render(b,c,d);return"function"!=typeof e?f:(e(f),void 0)},a}());


/*
 * jQuery BBQ: Back Button & Query Library - v1.3pre - 8/26/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,r){var h,n=Array.prototype.slice,t=decodeURIComponent,a=$.param,j,c,m,y,b=$.bbq=$.bbq||{},s,x,k,e=$.event.special,d="hashchange",B="querystring",F="fragment",z="elemUrlAttr",l="href",w="src",p=/^.*\?|#.*$/g,u,H,g,i,C,E={};function G(I){return typeof I==="string"}function D(J){var I=n.call(arguments,1);return function(){return J.apply(this,I.concat(n.call(arguments)))}}function o(I){return I.replace(H,"$2")}function q(I){return I.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(K,P,I,L,J){var R,O,N,Q,M;if(L!==h){N=I.match(K?H:/^([^#?]*)\??([^#]*)(#?.*)/);M=N[3]||"";if(J===2&&G(L)){O=L.replace(K?u:p,"")}else{Q=m(N[2]);L=G(L)?m[K?F:B](L):L;O=J===2?L:J===1?$.extend({},L,Q):$.extend({},Q,L);O=j(O);if(K){O=O.replace(g,t)}}R=N[1]+(K?C:O||!N[1]?"?":"")+O+M}else{R=P(I!==h?I:location.href)}return R}a[B]=D(f,0,q);a[F]=c=D(f,1,o);a.sorted=j=function(J,K){var I=[],L={};$.each(a(J,K).split("&"),function(P,M){var O=M.replace(/(?:%5B|=).*$/,""),N=L[O];if(!N){N=L[O]=[];I.push(O)}N.push(M)});return $.map(I.sort(),function(M){return L[M]}).join("&")};c.noEscape=function(J){J=J||"";var I=$.map(J.split(""),encodeURIComponent);g=new RegExp(I.join("|"),"g")};c.noEscape(",/");c.ajaxCrawlable=function(I){if(I!==h){if(I){u=/^.*(?:#!|#)/;H=/^([^#]*)(?:#!|#)?(.*)$/;C="#!"}else{u=/^.*#/;H=/^([^#]*)#?(.*)$/;C="#"}i=!!I}return i};c.ajaxCrawlable(0);$.deparam=m=function(L,I){var K={},J={"true":!0,"false":!1,"null":null};$.each(L.replace(/\+/g," ").split("&"),function(O,T){var N=T.split("="),S=t(N[0]),M,R=K,P=0,U=S.split("]["),Q=U.length-1;if(/\[/.test(U[0])&&/\]$/.test(U[Q])){U[Q]=U[Q].replace(/\]$/,"");U=U.shift().split("[").concat(U);Q=U.length-1}else{Q=0}if(N.length===2){M=t(N[1]);if(I){M=M&&!isNaN(M)?+M:M==="undefined"?h:J[M]!==h?J[M]:M}if(Q){for(;P<=Q;P++){S=U[P]===""?R.length:U[P];R=R[S]=P<Q?R[S]||(U[P+1]&&isNaN(U[P+1])?{}:[]):M}}else{if($.isArray(K[S])){K[S].push(M)}else{if(K[S]!==h){K[S]=[K[S],M]}else{K[S]=M}}}}else{if(S){K[S]=I?h:""}}});return K};function A(K,I,J){if(I===h||typeof I==="boolean"){J=I;I=a[K?F:B]()}else{I=G(I)?I.replace(K?u:p,""):I}return m(I,J)}m[B]=D(A,0);m[F]=y=D(A,1);$[z]||($[z]=function(I){return $.extend(E,I)})({a:l,base:l,iframe:w,img:w,input:w,form:"action",link:l,script:w});k=$[z];function v(L,J,K,I){if(!G(K)&&typeof K!=="object"){I=K;K=J;J=h}return this.each(function(){var O=$(this),M=J||k()[(this.nodeName||"").toLowerCase()]||"",N=M&&O.attr(M)||"";O.attr(M,a[L](N,K,I))})}$.fn[B]=D(v,B);$.fn[F]=D(v,F);b.pushState=s=function(L,I){if(G(L)&&/^#/.test(L)&&I===h){I=2}var K=L!==h,J=c(location.href,K?L:{},K?I:2);location.href=J};b.getState=x=function(I,J){return I===h||typeof I==="boolean"?y(I):y(J)[I]};b.removeState=function(I){var J={};if(I!==h){J=x();$.each($.isArray(I)?I:arguments,function(L,K){delete J[K]})}s(J,2)};e[d]=$.extend(e[d],{add:function(I){var K;function J(M){var L=M[F]=c();M.getState=function(N,O){return N===h||typeof N==="boolean"?m(L,N):m(L,O)[N]};K.apply(this,arguments)}if($.isFunction(I)){K=I;return J}else{K=I.handler;I.handler=J}}})})(jQuery,this);
/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);