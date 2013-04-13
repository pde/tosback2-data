// Search As You Type (SAYT).

/**
 * Initialize SAYT.
 *
 * @param {string} cx commerce search engine identifier.
 * @param {string} apiKey Search API For Shopping Key.
 * @param {Object} opt_saytParams parameters for SAYT. The keys we look for
 *     are:
 *   country: 2 letter country code.  Defaults to 'us'.
 *   language: BCP-47 language code.  If not provided, the default language
 *       for the requested country will be used.
 *   currency: Optional currency code.  If not provided, the default
 *       currency for the country will be used.
 *   extra_params: Extra params to pass to the shopping API.
 *   sayt_thumb_size: thumbnail size, default is 80.
 *   sayt_max_results: how many search results to show, including promotions.
 *   sayt_max_title_len: max title length in characters.
 *   sayt_max_description_len: max description length in characters.
 *   sayt_format: callback func to format the SAYT box, input is response obj,
 *       returns HTML.
 *   sayt_format_product: formats a product row given a product object.
 *   sayt_format_promotion: formats a promotion row given a promotion object.
 *   sayt_format_entry: low level formatting of a row given a title and desc
 *       etc.
 *   sayt_thumbnail_contents: boolean and if true and browser supports it we try
 *       to use data URIs to render thumbnails.
 *   sayt_title_config: if value is undefined then use default title, if null
 *       then don't display, and if a string then use the string to lookup a
 *       custom attribute and use for the title. In the cases where we do a
 *       lookup, we return the default value on failure.
 *   sayt_description_config: similar to sayt_title.
 *   sayt_price_config: similar to sayt_title.
 *   sayt_include_attributes: Array of extra attributes that should be included.
 *       Up to three extra attributes can be included this way (any more will be
 *       ignored).
 *
 * The returned SAYT object contains the following public method to be passed to
 * the google.search.CustomSearchControl.attachAutoCompletion method:
 *   saytSubmit(query, callback, requestor): The submit method to trigger SAYT.
 *
 * The returned object also contains the following methods defined for advanced
 * users, though generally these can be ignored:
 *   formatPrice(price, currency): Formats a price for display.
 *   shortenTitle(s, maxLen): Shortens a title to fit within a max length.
 *   stripTags(s): Strips HTML tags from a string.
 *   format(response): Function that formats the entire SAYT container.
 *   formatPromotion(promotion): Formats a promotion.
 *   formatProduct(product): Formats a SAYT product.
 *   formatEntry(title, link, description, thumbnail, price, isPromotion):
 *       Formats an individual row.
 *   findAttributeByName(product, attName, defaultValue): Finds an attribute
 *       given its name.
 *
 * @return {Object} the SAYT object.
 */
var saytInitialize = function(cx, apiKey, opt_saytParams) {
  // Constant Declarations

  // Thumbnail size in pixels.
  var DEF_THUMB_SIZE_ = 80;
  // How many search results to display, including promotions.
  var DEF_MAX_RESULTS_ = 5;
  // Don't let product titles get longer than this number of characters.
  // We assume that there's limited space so we clamp the titles the rightmost
  // word boundary that doesn't exceed this.
  var DEF_MAX_TITLE_LEN_ = 45;
  var DEF_MAX_DESCRIPTION_LEN_ = 100;
  var PROMOTION_STANDARD_ = 'standard';
  var PROMOTION_PRODUCT_ = 'product';

  // Variable Declarations

  // Globals that hold state of SAYT configuration.
  var thumbSize = DEF_THUMB_SIZE_;
  var maxResults = DEF_MAX_RESULTS_;
  var maxTitleLen = DEF_MAX_TITLE_LEN_;
  var maxDescriptionLen = DEF_MAX_DESCRIPTION_LEN_;

  // The next 3 vars define how and if fields are displayed.
  //  - If null then the indicated field is not displayed.
  //  - If undefined then the values come from the default location.
  //  - If a string then we look for a custom attribute and use that if present,
  //    else we display the default value.
  // Note that as there are 3 possibilities here this is potentially confusing
  // to users, however at least they are only exposed to 'null' and string
  // values.
  // They don't really need to know about 'undefined' as it is the default.
  var titleConfig = undefined;
  var descriptionConfig = undefined;
  var priceConfig = undefined;
  var extraAttributes = [];

  /**
   * Request thumbnail images inline in a larger JSON response so
   * that the image data URI approach can be used.
   * If false then we don't do this and instead use URLs to
   * populate the thumbnails on the screen.
   */
  var thumbnailAsData = true;

  // Function that formats the entire SAYT container.
  // This is the highest level formatting function.
  var formatSayt;

  // Function that formats a SAYT promotion entry given a promotion
  // object.
  var formatPromotion;

  // Function that formats a SAYT product entry given a product
  // object.
  var formatProduct;

  // Function that formats a SAYT product entry and is passed
  // the parts of the entry (title, desc etc) broken apart.
  var formatEntry;

  // Private Method Declarations

  /**
   * Gets the value under an object, returning null if any part of the path
   * doesn't exist.
   * For example, this:
   *   getValueOrNull(myObject, 'foo', 'bar', 0, 'baz')
   * is a safe way of doing this:
   *   myObject['foo']['bar'][0]['baz']
   * when you don't know if the entire path will exist.
   *
   * @param {Object} object The object to dereference.
   * @param ... The elements of the path.
   * @return {Object} The object at the path or null if it couldn't be found.
   */
  var getValueOrNull = function(object /*, ... path*/) {
    for (var i = 1; object != null && i < arguments.length; ++i) {
      object = object[arguments[i]];
    }
    return object;
  };

  /**
   * Default low level formatter for an individual row.
   *
   * @param {string} title product title.
   * @param {string} link product page link.
   * @param {string} description product description.
   * @param {string} thumb image thumbnail URL or data URI.
   * @param {string} price item price.
   * @param {string} isPromotion is this a promotion?.
   * @return {string} HTML for display.
   */
  var formatEntryDef = function(title, link, description, thumb, price,
                                isPromotion) {
    if (title) {
      title = escapeHtml(shortenTitle(stripTags(title), maxTitleLen));
    }
    link = escapeUrl(link);
    if (description) {
      description = escapeHtml(shortenTitle(stripTags(description),
                                            maxDescriptionLen));
    }
    var result = [];
    if (isPromotion) {
      result.push('<tr class="cse-sayt-promotion">');
    } else {
      result.push('<tr class="cse-sayt-result">');
    }
    result.push('<td>');
    if (thumb) {
      // Do not escapeUrl(thumb), because it may be a data URI.
      result.push('<div class="cse-sayt-image">');
      result.push('<a class="url" title="' + title + '"' + ' href="' + link +
                  '"><img src="' + thumb + '" border="0"></a></div>');
    }
    result.push('</td>');
    result.push('<td class="cse-sayt-text">');
    if (title) {
      result.push('<div class="cse-sayt-title">');
      result.push('<a href="' + link + '">' + title + '</a></div>');
    }
    if (description) {
      result.push('<div class="cse-sayt-descr">' + description + '</div>');
    }
    if (price) {
      result.push('<div class="cse-sayt-price">' + price + '</div>');
    }
    result.push('</td>');
    result.push('</tr>');
    return result.join('');
  };

  /**
   * Format a product "row" for SAYT.
   * @param {Object} product one product entry from the shopping response.
   * @return {string} formatted HTML.
   */
  var formatProductDef = function(product) {
    // Note: for custom prices we do not call formatPrice on them as we
    // assume the custom attr has a price formatted correctly.
    var defaultPrice = formatPrice(product['inventories'][0]['price'],
                                   product['inventories'][0]['currency']);
    var price = findAttributeByName(product, priceConfig, defaultPrice);
    var title = findAttributeByName(product, titleConfig, product['title']);
    var description = findAttributeByName(product, descriptionConfig,
                                          product['description']);

    var thumb = null;
    var first_thumb = getValueOrNull(product, 'images', 0, 'thumbnails', 0);
    if (first_thumb) {
      if (thumbnailAsData && first_thumb['content']) {
        thumb = 'data:image/jpeg;base64,' + first_thumb['content'];
      } else {
        thumb = first_thumb['link'];
      }
    }
    return formatEntry(title, product['link'], description, thumb, price,
                       false);
  };

  /**
   * Format one promotion.
   * @param {Object} promotion the promotion part of a shopping response.
   * @return {string} HTML descripting this promotion.
   */
  var formatPromotionDef = function(promotion) {
    if (promotion['type'] == PROMOTION_STANDARD_) {
      // Promotion does not have price, hence last ''.
      var title = titleConfig === null ? undefined : promotion['name'];
      var description = descriptionConfig === null ? undefined :
          promotion['description'];
      return formatEntry(title, promotion['destLink'], description,
          promotion['imageLink'] ? escapeUrl(promotion['imageLink']) : '',
          '', true);
    } else if (promotion['type'] == PROMOTION_PRODUCT_) {
      var product = promotion['product'];
      var title = findAttributeByName(product, titleConfig, product['title']);
      var description = findAttributeByName(product, descriptionConfig,
                                            product['description']);
      var defaultPrice = formatPrice(product['inventories'][0]['price'],
                                     product['inventories'][0]['currency']);
      var price = findAttributeByName(product, priceConfig, defaultPrice);

      var thumb = getValueOrNull(product, 'images', 0, 'thumbnails', 0, 'link');
      thumb = thumb ? escapeUrl(thumb) : '';
      return formatEntry(title, product['link'], description, thumb, price,
                         true);
    } else {
      return undefined; // Promotion type not understood
    }
  };

  /**
   * Default formatting of the entire SAYT container.
   * This is the highest level formatting function.
   *
   * @param {Object} response is an entire Shopping API response.
   * @return {string} HTML for entire SAYT container.
   */
  var formatSaytDef = function(response) {
    var numResults = 0;
    var sayt = [];
    sayt.push('<table class="cse-sayt">');
    // Format and add promotion results first.
    if (response['promotions']) {
      for (var i = 0; i < response['promotions']['length'] &&
           numResults < maxResults; ++i) {
        var promotion = response['promotions'][i];
        var html = formatPromotion(promotion);
        if (html) {
          sayt.push(html);
          ++numResults;
        }
      }
    }
    // Then format and add product results.
    if (response['items']) {
      for (var i = 0; i < response['items'].length && numResults < maxResults;
           ++i, ++numResults) {
        sayt.push(formatProduct(response['items'][i]['product']));
      }
    }
    sayt.push('</table>');
    return sayt.join('');
  };

  /**
   * Find an attribute given its name.
   *
   * @param {Object} opt_product product portion of shopping API response for 1
   *     product.
   * @param {string} opt_attrName attribute name with type to find.
   * @param {string} opt_defaultValue default value to return if lookup fails or
   *     if opt_attrName is undefined.
   * @return {string} attr value or modified default value.
   */
  var findAttributeByName = function(opt_product, opt_attrName,
                                     opt_defaultValue) {
    if (opt_attrName === null) {
      return null;
    }
    if (opt_attrName) {
      opt_attrName = opt_attrName.split('(')[0];
    }
    if (opt_product && opt_attrName && opt_product['attributes']) {
      var attributes = opt_product['attributes'];
      for (var i = 0; i < attributes.length; ++i) {
        if (attributes[i]['name'] == opt_attrName) {
          return attributes[i]['value'];
        }
      }
    }
    // Default returned if attrName is undefined and if name isn't found.
    return opt_defaultValue;
  };

  /**
   * Strip HTML tags out of a string.
   *
   * @param {string} s input string.
   * @return {string} inupt with tags removed.
   */
  var stripTags = function(s) {
    // Regex explanation, as they always seem write-only:
    // [1] leading angle bracket
    // [2] optional / (for close tag)
    // [3] tag name with leading characters
    // [4] no embedded anglebrackets
    // [5] closing angle bracket
    //
    // If we get more sophisticated then with tags
    // like <p> and <table> we should replace them with
    // a space instead of just removing them.
    if (s) {
      return s.replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, '');
    } else {
      return '';
    }
  }

  var formatPrice = function(priceValue, currency) {
    if (currency == 'AUD') {
      return '$' + priceValue.toFixed(2);
    } else if (currency == 'CNY') {
      return '\u00A5' + priceValue.toFixed(2);
    } else if (currency == 'EUR') {
      return '\u20ac' + priceValue.toFixed(2);
    } else if (currency == 'GBP') {
      return '\u00A3' + priceValue.toFixed(2);
    } else if (currency == 'JPY') {
      return '\u00A5' + priceValue.toFixed(0);
    } else if (currency == 'USD') {
      return '$' + priceValue.toFixed(2);
    } else {
      return priceValue.toFixed(2) + ' ' + currency;
    }
  }

  /**
   * Escapes the given string, so it is HTML safe.
   * @param {string} html The input HTML to escape.
   * @return {string} The escaped HTML.
   */
  var escapeHtml = function(html) {
    var s = '' + html;
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /**
   * Escapes the given URL.
   * @param {string} url The URL to escape.
   * @return {string} The escaped URL.
   */
  var escapeUrl = function(url) {
    return url.replace(/</g, '%3C').replace(/>/g, '%3E').replace(/"/g, '%22');
  }

  // Initialization Logic

  var resultsCallback = null;
  var resultsRequestor = null;

  var saytParams = opt_saytParams || {};  // Makes following code simplier

  // Normalize country code
  var country = saytParams['country'] ?
      saytParams['country'].toLowerCase() : 'us';
  country = country == 'uk' ? 'gb' : country;

  var language = saytParams['language'];
  var useCase = saytParams['use_case'] || 'CommerceSearchUseCase';
  var currency = saytParams['currency'];
  var app = saytParams['from_preview'] ? 'pfe_preview:sayt' : 'sayt';

  thumbSize = saytParams['sayt_thumb_size'] || DEF_THUMB_SIZE_;
  maxResults = saytParams['sayt_max_results'] || DEF_MAX_RESULTS_;
  maxTitleLen = saytParams['sayt_max_title_len'] || DEF_MAX_TITLE_LEN_;
  maxDescriptionLen = saytParams['sayt_max_description_len'] ||
      DEF_MAX_DESCRIPTION_LEN_;
  formatSayt = saytParams['sayt_format'] || formatSaytDef;
  if (typeof saytParams['sayt_thumbnail_contents'] != 'undefined') {
    thumbnailAsData = saytParams['sayt_thumbnail_contents'];
  } else {
    thumbnailAsData = true;
  }
  formatProduct = saytParams['sayt_format_product'] || formatProductDef;
  formatPromotion = saytParams['sayt_format_promotion'] || formatPromotionDef;
  formatEntry = saytParams['sayt_format_entry'] || formatEntryDef;

  titleConfig = saytParams['sayt_title_config'];
  priceConfig = saytParams['sayt_price_config'];
  descriptionConfig = saytParams['sayt_description_config'];

  var includedAttributes = [];
  if (titleConfig) {
    includedAttributes.push(titleConfig);
  }
  if (priceConfig) {
    includedAttributes.push(priceConfig);
  }
  if (descriptionConfig) {
    includedAttributes.push(descriptionConfig);
  }

  var saytIncludeAttributes = saytParams['sayt_include_attributes'] || [];
  for (var i = 0; i < saytIncludeAttributes.length && i < 3; ++i) {
    includedAttributes.push(saytIncludeAttributes[i]);
  }

  // Default value to ask for no attributes from Shopping API.
  var attributeFilter = includedAttributes.join(',');

  // If we are asked to use data URIs for thumbnails, check the browser
  // version to make sure it supports this.
  if (thumbnailAsData) {
    // Allow 'navigator' to be overridden for testing.
    var myNavigator = saytParams['navigator'] || navigator;
    var ua = myNavigator['userAgent'];
    var ieName = 'MSIE';
    var ie = ua.indexOf(ieName);
    if (ie >= 0) {
      var version = parseFloat(ua.substring(ie + ieName.length + 1));
      thumbnailAsData = version >= 8.0;
    }
  }

  // Callback function to handle the shopping API search response for search-
  // as-you-type requests.  It builds and returns a list of HTML search result
  // strings.  Each HTML search result string contains image, title, and price.
  var handleSaytShoppingApiResponse = function(query, response) {
    // We want to show SAYT if we have search results or promotions.
    if (resultsCallback && (response['items'] || response['promotions'])) {
      // The results don't contain the items or promotions blocks when there
      // aren't any.  However, existing customizations of formatSayt may try
      // referencing the items object without checking its existence.  To
      // protect against that we force it to exist, using an empty array when
      // there are no items.
      response['items'] = response['items'] || [];
      resultsCallback([formatSayt(response)], resultsRequestor, query);
    } else {
      // No results, so no need to call formatSayt.  We'll just use an empty
      // result.
      resultsCallback([], resultsRequestor, query);
    }
  };

  // Called by autocompletion JS to implement search-as-you-type.  When called,
  // we build and send the shopping API search request, and set callback
  // function handleSaytShoppingApiResponse() to handle the search response.
  var saytSubmit = function(query, callback, requestor) {
    var queryString = query.replace(/#/g, '%23');
    if (window['gapi'] && gapi.client) {
      saytSubmit_gapi(queryString, callback, requestor);
    } else if (window['shopping']) {
      saytSubmit_googleapis(query, callback, requestor);
    }
  };

  var saytSubmit_gapi = function(queryString, callback, requestor) {
    resultsCallback = callback;
    resultsRequestor = requestor;

    var params = {
      'rankBy': 'relevancy',
      'startIndex': 1,
      'maxResults': maxResults,
      'q': queryString,
      'country': country,
      'spelling.enabled': false,
      'promotions.enabled': true,
      'promotions.useGcsConfig': true,
      'thumbnails': '' + thumbSize + ':' + thumbSize,
      'facets.enabled': false,
      'facets.useGcsConfig': false,
      'redirects.enabled': false,
      'sayt.enabled': thumbnailAsData,
      'sayt.useGcsConfig': thumbnailAsData,
      'useCase': useCase,
      'attributeFilter': attributeFilter,
      'app': app,
      // We always want the following default top level fields.
      'productFields': 'title,description,link,inventories,images'
    };
    if (language) {
      params['language'] = language;
    }
    if (currency) {
      params['currency'] = currency;
    }

    var fullparams = {};
    // Apply the user-provided params first so that they can't override the
    // params we want to explicitly set.
    if (saytParams['extra_params']) {
      for (var name in saytParams['extra_params']) {
        fullparams[name] = saytParams['extra_params'][name];
      }
    }
    for (var name in params) {
      fullparams[name] = params[name];
    }

    gapi.config.update('client/jsonpOverride', true);
    gapi.client.setApiKey(apiKey);
    gapi.client.request({
      'path': '/shopping/search/v1/cx:' + cx + '/products',
      'params': fullparams
    }).execute(function(response) {
      handleSaytShoppingApiResponse(queryString, response);
    });
  };

  var saytSubmit_googleapis = function(queryString, callback, requestor) {
    resultsCallback = callback;
    resultsRequestor = requestor;

    var params = {
      'rankBy': 'relevancy',
      'startIndex': 1,
      'maxResults': maxResults,
      'q': queryString,
      'source': 'cx:' + cx,
      'country': country,
      'spellingCorrection': {'enabled': false},
      'promotions': {'enabled': true, 'useGcsConfig': true},
      'thumbnails': '' + thumbSize + ':' + thumbSize,
      'facets': {'enabled': false, 'useGcsConfig': false},
      'redirects': {'enabled': false, 'useGcsConfig': false},
      'sayt': {'enabled': thumbnailAsData, 'useGcsConfig': thumbnailAsData},
      'useCase': useCase,
      'attributeFilter': attributeFilter,
      'app': 'sayt',
      // We always want the following default top level fields.
      'productFields': 'title,description,link,inventories,images'
    };
    if (language) {
      params['language'] = language;
    }
    if (currency) {
      params['currency'] = currency;
    }

    var fullparams = {};
    // Apply the user-provided params first so that they can't override the
    // params we want to explicitly set.
    if (saytParams['extra_params']) {
      for (var name in saytParams['extra_params']) {
        fullparams[name] = saytParams['extra_params'][name];
      }
    }
    for (var name in params) {
      fullparams[name] = params[name];
    }

    googleapis.setDeveloperKey(apiKey);
    shopping.products.list(fullparams).execute(function(response) {
        handleSaytShoppingApiResponse(queryString, response);
      });
  };

  // Intelligently shorten the title by including words until the title
  // reaches a maxLen.
  var shortenTitle = function(s, maxLen) {
    try {
      if (s.length <= maxLen) { return s; }
      var words = s.split(/\s+/);
      // Cover special, essentially pathalogical cases first:
      //     one word or first word long enough.
      if (words.length <= 1) {
        return s;
      } else if (words[0].length >= maxLen) {
        return words[0];
      }
      var len = 0;
      for (var i = 0; i < words.length; i++) {
        // Check if next word makes us too long.
        if (len + words[i].length >= maxLen) {
          words.splice(i, words.length);
          // Don't end the shortened title on hanging punctuation.
          var last = words[words.length - 1];
          if (last.length == 1 && ! last.match(/\w/)) {
            words.splice(i - 1, words.length);
          }
          return words.join(' ');
        }
        len += words[i].length;
        if (i > 0) len++; // Spaces words but there is no trailing space..
      }
      return words.join(' ');
    } catch (err) {
      // Looks like we're in a browser that is missing something.
      // Fallback to simple title trimming.
      return s.trim(0, maxLen);
    }
  };

  // SAYT Object Definition.
  return {
    // Main submit function
    'saytSubmit': saytSubmit,

    // Helper functions
    'formatPrice': formatPrice,
    'shortenTitle': shortenTitle,
    'stripTags': stripTags,
    'findAttributeByName': findAttributeByName,

    // Default implementations.
    'format': formatSaytDef,
    'formatPromotion': formatPromotionDef,
    'formatProduct': formatProductDef,
    'formatEntry': formatEntryDef,

    // status variables, needed for testing.
    'thumbnailsSupported': thumbnailAsData
  };
};

/**
 * Initialize SAYT in a more self-contained way.
 *
 * @param {string} cx Commerce search engine identifier.
 * @param {string} apiKey Search API For Shopping Key.
 * @param {string} searchText The Id of the search box input.
 * @param {string} searchForm The Id of the search box form.
 * @param {Function} opt_saytInitializedCallback The callback function to call
 *     when the sayt object is initialized.
 * @param {Object} opt_styleOptions Style options of the search box.
 * @param {Object} opt_saytParams parameters for SAYT, which will be passed
 * to sayInitialize.
 */
var setupSayt = function(cx,
                         apiKey,
                         searchText,
                         searchForm,
                         opt_saytInitializedCallback,
                         opt_styleOptions,
                         opt_saytParams) {
  var emitSaytEvent = function(action, label, nonInteraction) {
    if (window['_gaq']) {
      window['_gaq'].push(
          ['_trackEvent', 'GCS', action, label, null, nonInteraction]);
    }
  }

  // Setup tracking for user input in the search box.
  var hasSearchBoxInput = false;
  var searchBoxInputListener = function() {
    if (hasSearchBoxInput) {
      return;
    }
    hasSearchBoxInput = true;
    emitSaytEvent('SearchBox', 'hasInput', true);
  }

  var input = document.getElementById(searchText);
  if (input.addEventListener) {
    input.addEventListener('keydown', searchBoxInputListener, true);
  } else if (input.attachEvent) {
    input.attachEvent('onkeydown', searchBoxInputListener);
  }

  var getCookie = function(cookieName) {
    var nameeq = cookieName + '=';
    var cookie = String(document.cookie);
    for (var pos = -1; (pos = cookie.indexOf(nameeq, pos + 1)) >= 0;) {
      var i = pos;
      while (--i >= 0) {
        var ch = cookie.charAt(i);
        if (ch == ';') {
          i = -1;  // indicate success
          break;
        } else if (' \t'.indexOf(ch) < 0) {
          break;
        }
      }
      if (-1 === i) {  // first cookie in the string or we found a ;
        var end = cookie.indexOf(';', pos);
        if (end < 0) { end = cookie.length; }
        return cookie.substring(pos + nameeq.length, end);
      }
    }
    return '';
  }

  var getSessionStartTime = function(utmaCookie) {
    var ids = utmaCookie.split('.');
    if (ids.length < 6) return null;
    return parseInt(ids[4], 10);
  }

  var onloadCompleted = false;
  var experimentConfigResponse = null;

  var getExperimentConfigs = function() {
    if (!window['gapi'] || !gapi.client) {
      emitSaytEvent('Sayt', 'Unknown', true);
      initializeSayt();
      return;
    }

    gapi.client.setApiKey(apiKey);
    gapi.client.request({
      'path': '/shopping/search/v1/customers/cx:' + cx
    }).execute(function(response) {
      experimentConfigResponse = response;
      if (onloadCompleted) {
        initializeSaytWithExperimentSettings(experimentConfigResponse);
      }
    });
  }

  var loadScript = function(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = true;

    document.body.appendChild(script);
  }

  window['__sayt_gapi_callback'] = getExperimentConfigs;
  loadScript(
      'https://apis.google.com/js/client.js?onload=__sayt_gapi_callback');

  var initializeSayt = function() {
    var saytParams = opt_saytParams || {};
    saytParams['extra_params'] = saytParams['extra_params'] || {};
    saytParams['extra_params']['clickTracking'] = 'true';
    var sayt = saytInitialize(cx, apiKey, saytParams);
    var opt_options = {
      saytActor: sayt.saytSubmit,
      styleOptions: opt_styleOptions
    };

    google.search.CustomSearchControl.attachAutoCompletionWithOptions(
        cx, document.getElementById(searchText), searchForm, opt_options);
    opt_saytInitializedCallback && opt_saytInitializedCallback(sayt);
  }

  var initializeSaytWithExperimentSettings = function(response) {
    var sessionStartTime = getSessionStartTime(getCookie('__utma'));
    if (!sessionStartTime) {
      emitSaytEvent('Wait', 'Cookie', true);
    }
    if (sessionStartTime && response.saytExperiment &&
        response.saytExperiment == 'SPLIT_TRAFFIC' &&
        response.saytDisabledPercent &&
        sessionStartTime % 100 < response.saytDisabledPercent) {
      emitSaytEvent('Sayt', 'Disabled', true);
      return;
    }

    if (!response || response.error) {
      emitSaytEvent('Sayt', 'Failed', true);
    } else {
      emitSaytEvent('Sayt', 'Enabled', true);
    }
    initializeSayt();
  }

  google.load('search', '1');
  google.setOnLoadCallback(function() {
    onloadCompleted = true;
    if (experimentConfigResponse) {
      initializeSaytWithExperimentSettings(experimentConfigResponse);
    }
  });
};
