;(function($) {

  $.brandFeeds = function(el, options) {
    
    var defaults = {
      containerTabs: '#brand-news-tabs',
      containerSettings: '#brand-news-settings',
      containerItems: '#brand-news-items',
      containerSearch: '#brand-news-search',
      containerSearchMeta: '#brand-news-search-meta',
      containerSearchResults: '#brand-news-search-results',
      containerSearchFilters: '#brand-news-filters',
      linkLoadMore: '#load-more',
      mode: 'default'
    }
    
    
    var plugin = this;
    
    plugin.settings = {}
    plugin.spinners = {}
    
    var init = function() {
      plugin.settings = $.extend({}, defaults, options);
      plugin.page = 0;
      plugin.mode = plugin.settings.mode;
      plugin.el = el;
      
      bindEvents();
      addSpinners();
    }
    
    plugin.toggleSettings = function() {
      var container = plugin.el.find(plugin.settings.containerSettings);
      
      if(plugin.el.find(plugin.settings.containerTabs).find("a.settings").hasClass("active")) {
        plugin.el.find(plugin.settings.containerTabs).find("li a.settings").removeClass("active");
      }
      else {
        plugin.el.find(plugin.settings.containerTabs).find("li a.settings").addClass("active");
      }
      container.slideToggle();
    }


    
    plugin.setMode = function(mode) {
      
      if (plugin.mode == mode) 
        return false;
      
      plugin.page = 0;
      plugin.mode = mode;
      
      plugin.el.find(plugin.settings.containerTabs).find("li").each(function() {
        if($(this).find('a').hasClass(mode) || ($(this).find('a').hasClass("cols") && mode == "default")) {
          $(this).find('a').addClass("active").find('span').addClass('loading');
          
          //$(this).append(plugin.spinners.tab.el);
          //$(plugin.spinners.tab.el).show();
          $(this).find('.spinner').show();
        
      }
        else {
          if(!$(this).find('a').hasClass("settings") && $(this).find('a').hasClass("active")) {
            $(this).find('a').removeClass("active");
          }
        }
      });

      plugin.updateItems(null, false);
    }
    
    plugin.updateItems = function(data, append) {
      
      data = typeof(data) != 'undefined' ? data : '';
      
      $.ajax({
        url: "/brand_feeds/update/",
        type: 'POST',
        dataType: 'json',
        data: data + '&t=' + plugin.mode,
        success: function(data) {
          if (data.success) {
            var container = plugin.el.find(plugin.settings.containerItems);

            if (!append)
              container.empty();

            if (!data.last_page)
              plugin.el.find(plugin.settings.linkLoadMore).show();

            $(plugin.spinners.loadMore.el).hide();
            //$(plugin.spinners.tab.el).hide();

            $(plugin.settings.containerSearchFilters).find('li').each(function(i) {
              $(this).find('.spinner').hide();
            });

            plugin.el.find(plugin.settings.containerTabs).find('a span').removeClass('loading');

            var c = 0;

            if(plugin.mode == "default")
            {
              if(!append)
                container.append('<div id="col1"></div><div id="col2"></div>');
              
              var left = container.find("#col1");
              var right = container.find("#col2");

              $(data.html).find(".brand-feed-item").each(function()
              {
                if(left.height() >= right.height()) {
                  if($(this).hasClass("even")) {
                    $(this).removeClass("even");
                  }

                  if(!$(this).hasClass("uneven")) {
                    $(this).addClass("uneven");
                  }

                  right.append($(this));
                }
                else {
                  if($(this).hasClass("uneven")) {
                    $(this).removeClass("uneven");
                  }

                  if(!$(this).hasClass("even")) {
                    $(this).addClass("even");
                  }

                  left.append($(this));
                }

                $(this).css('opacity', 0);
                $(this).delay(c * 250).fadeTo('normal', 1);
                c++;
              });
            }
            else if(plugin.mode == "twitter" || plugin.mode ==  "grid" || plugin.mode ==  "brand_feed")
            {
              $(data.html).each(function()
              {
                container.append($(this));
                $(this).css('opacity', 0);
                $(this).delay(c * (plugin.mode == "twitter" ? 100 : 50)).fadeTo('normal', 1);
                c++;
              });
            }
            else {
              container.append(data.html);
            }
            
            // update addthis
            addthis.button('.addthis_button');
          }
        }
      }); 
    }
    
    plugin.loadMore = function() {
      plugin.page++;

      var data = 'p=' + plugin.page;

      if (plugin.settings.mode == 'brand_feed' && plugin.settings.bid) 
        data += '&bids=' + plugin.settings.bid;

      plugin.updateItems(data, true);

      $(plugin.spinners.loadMore.el).show();
      plugin.el.find(plugin.settings.linkLoadMore).hide();
    }
    
    plugin.doSearch = function(keywords) {
      
      // TODO: validation/filtering?
      
      if (keywords.length < 2)
        return;
      
      $(plugin.spinners.search.el).show();
      plugin.el.find(plugin.settings.containerSearch + ' .icon').hide();
      plugin.el.find(plugin.settings.linkLoadMore).hide();

      $.ajax({
        url: "/brand_feeds/search/",
        type: 'POST',
        dataType: 'json',
        data: 'q=' + keywords,
        success: function(data) {
          if (data.success) {
            var meta = plugin.el.find(plugin.settings.containerSearchMeta);
            meta.find('.keywords').text(data.keywords);
            meta.find('.num').text(data.num);
            meta.show();
            
            plugin.el.find(plugin.settings.containerItems).hide();
            plugin.el.find(plugin.settings.containerTabs).hide();
            plugin.el.find(plugin.settings.containerSettings).addClass('visuallyhidden');
            
            var results = plugin.el.find(plugin.settings.containerSearchResults);

            results.empty().show();

            if (data.num > 0) {
              $(data.html).each(function(i){
                results.append($(this));
                $(this).hide().delay(i * 50).fadeIn();
              });
            }
            else {
              results.html('&nbsp');
            }
          $(plugin.spinners.search.el).hide();
          plugin.el.find(plugin.settings.containerSearch + ' .icon').show();
          }
        }
      });
    }
    
    plugin.clearSearchResults = function() {
      plugin.el.find(plugin.settings.containerSearch).find('input[type=text]').val('');
      plugin.el.find(plugin.settings.containerSearchMeta).hide();
      plugin.el.find(plugin.settings.containerSearchResults).hide().empty();
      plugin.el.find(plugin.settings.containerItems).show();
      plugin.el.find(plugin.settings.containerTabs).show();
      plugin.el.find(plugin.settings.linkLoadMore).show();
      plugin.el.find(plugin.settings.containerSettings).removeClass('visuallyhidden');
    }
    
    var bindEvents = function() {

      if (plugin.settings.mode != 'brand_feed') {
        plugin.el.find(plugin.settings.containerTabs).find('a').click(tabClickHandler);
        plugin.el.find(plugin.settings.containerSearch).find('form').submit(searchSubmitHandler);
        plugin.el.find(plugin.settings.containerSearchMeta).find('a').click(metaClearClickHandler);
        
        var settings = plugin.el.find(plugin.settings.containerSettings);
        settings.find('#settings-close').click(settingsCloseClickHandler);
        settings.find('form').submit(settingsSubmitHandler);
        settings.find('input[type="checkbox"]').each(function(index)
        {
          $(this).click(cbClickHandler);
        });
      }
      
      setSubmitStatus(false);
      plugin.el.find(plugin.settings.linkLoadMore).click(loadMoreClickHandler);
    }
    

    var setSubmitStatus = function(enabled)
    {
      var container = plugin.el.find(plugin.settings.containerSettings);
      if(enabled)
      {
        container.find('#settings-save').removeAttr('disabled');
        if(container.find('#settings-save').parent().hasClass('disabled'))
        {
          container.find('#settings-save').parent().removeClass('disabled'); 
        }
      }
      else
      {
        container.find('#settings-save').attr({disabled:'disabled'});
        if(!container.find('#settings-save').parent().hasClass('disabled'))
        {
          container.find('#settings-save').parent().addClass('disabled'); 
        }
      }
    }

    var addSpinners = function() {     
      // load more
      plugin.spinners.loadMore = new Spinner(plugin.settings.spinOptions).spin();
      $(plugin.spinners.loadMore.el).addClass('spinner').hide();
      $(plugin.settings.linkLoadMore).parent().append(plugin.spinners.loadMore.el);

      // search
      plugin.spinners.search = new Spinner(plugin.settings.spinOptions.small).spin();
      $(plugin.spinners.search.el).addClass('spinner').hide();
      $(plugin.settings.containerSearch).append(plugin.spinners.search.el);

      // tab

      $(plugin.settings.containerSearchFilters).find('li').each(function(i) {
        if (i < 3) {
          var tabSpinner = new Spinner(plugin.settings.spinOptions.small).spin();
          $(tabSpinner.el).addClass('spinner').hide();
          $(this).append(tabSpinner.el);
        }
      });

      //$(plugin.settings.containerSearchFilters).find('li').first().find('.spinner').show();

      //plugin.spinners.tab = new Spinner(plugin.settings.spinOptions.small).spin();
      //$(plugin.spinners.tab.el).addClass('spinner').hide();
      //console.log($(plugin.settings.containerSearchFilters).find('li').first());
      //$(plugin.settings.containerSearchFilters).find('li').first().append(plugin.spinners.tab.el);
    }
    
    var tabClickHandler = function(e) {
      
      var mode = $(this).data('mode');
      if (mode != 'settings')
        plugin.setMode(mode);
      else
        plugin.toggleSettings();
        
      e.stopPropagation();
      return false;
    }
    
    var searchSubmitHandler = function(e) {
      var keywords = $(this).find('input[type=text]').val();
      plugin.doSearch(keywords);
      e.stopPropagation();
      return false;
    }
    
    var metaClearClickHandler = function(e) {
      plugin.clearSearchResults();
      e.stopPropagation();
      return false;
    }
    
    var settingsCloseClickHandler = function(e) {
      plugin.toggleSettings();
      e.stopPropagation();
      return false;
    }
    
    var cbClickHandler = function(e)
    {
      var settings = plugin.el.find(plugin.settings.containerSettings);
      if(settings.find('input[type="checkbox"]:checked').length > 0)
      {
        setSubmitStatus(true);
        settings.find('#filterinfo').hide();
      }
      else
      {
        setSubmitStatus(false);
        settings.find('#filterinfo').fadeIn();
      }
    }

    var settingsSubmitHandler = function(e) {
      var bids = [];
      $(this).find('input[type=checkbox]:checked').each(function(i) {
        bids.push($(this).val());
      });
      
      var data;
      if (bids.length > 0)
      {
        bids = bids.join(',');
        $.cookie('cn_brand_news_filter', bids, { expires: 365, path: '/' });
        data = 'bids=' + bids;
      }
      else
        $.cookie('cn_brand_news_filter', null);
      
      plugin.updateItems(data);
      plugin.toggleSettings();
      setSubmitStatus(false);
      e.stopPropagation();
      return false;
    }
    
    var loadMoreClickHandler = function(e) {
      
      plugin.loadMore();
      
      e.stopPropagation();
      return false;
    }
    
    init();  
  }
  
  $(document).ready(function() {
    if ($("#brand-news").length > 0) {
      var brandFeeds = new $.brandFeeds($('#brand-news'), {spinOptions: spinOptions});
    }

    if ($('.brands-brand.news').length > 0) {
      var brandFeeds = new $.brandFeeds($('#news'), {mode: 'brand_feed', containerItems: '.items', bid: $('#bid').val(), spinOptions: spinOptions});
    }
  });
  
})(jQuery);
