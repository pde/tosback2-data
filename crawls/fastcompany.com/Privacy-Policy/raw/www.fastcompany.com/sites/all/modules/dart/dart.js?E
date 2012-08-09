
/**
 * Create a DART object to handle tagging functionality
 */
Drupal.DART = {};

/**
 * Overridable settings.
 */
Drupal.DART.settings = {
  "writeTags": true
};

/**
 * If there are tags in the loadLastTags, then load them where they belong.
 */
Drupal.behaviors.DART = function() {
  if (typeof(Drupal.DART.settings.loadLastTags) == 'object') {
    $('.dart-tag:visible').each( function() {
      if (!$(this).hasClass('dart-processed')) {
        var regex = /dart-name-(\w+)$/;
        var result = regex.exec($(this).attr('class'));
        var scriptTag = Drupal.DART.tag(Drupal.DART.settings.loadLastTags[result[1]]);

        $(this).writeCapture().append(scriptTag).addClass('dart-processed');
      }
    });
  }
}

/**
 * Using document.write, add a DART tag to the page
 */
Drupal.DART.tag = function(tag) {
  tag = typeof(tag) == 'string' ? eval('(' + tag + ')') : tag;

  var tagname = tag.settings.options.method == 'adj' ? 'script' : 'iframe';
  var tagsite = tag.site != null ? '.' + tag.site : '';
  var options = tag.settings.options.method == 'adj' ? 'type="text/javascript"' : 'frameborder="0" scrolling="no" width="' + tag.sz.split("x")[0] + '" height="' + tag.sz.split("x")[1] + '"';;

  ad  = '<' + tagname + ' ' + options + ' src="';
  ad += dart_url + "/";
  ad += tag.network_id != "" ? tag.network_id + "/" : "";
  ad += tag.settings.options.method + "/";
  ad += tag.prefix + tagsite + "/" + tag.zone + ";";
  ad += this.keyVals(tag.key_vals);

  // Allow other modules to include js that can manipulate each key|val.
  rendered_ad = $(document).triggerHandler('dart_tag_render', [ad]);
  ad = rendered_ad != undefined ? rendered_ad : ad; ad += '"></' + tagname + '>';

  if (Drupal.DART.settings.writeTags) {
    document.write(ad);
  }

  // console.log('-----------------'+tag.pos+'------------------');
  // console.log(tag);

  return ad;
}

/**
 * Format a key|val pair into a dart tag key|val pair.
 */
Drupal.DART.keyVal = function(key, val, useEval) {
  kvp  = key + "=";
  kvp += useEval ? eval(val) : val;
  kvp += key == "ord" ? "?" : ";";
  return(kvp);
}

/**
 * Loop through an object and create kay|val pairs.
 *
 * @param vals
 *   an object in this form:
 *   {
 *     key1 : {{val:'foo', eval:true}, {val:'foo2', eval:false}}
 *     key2 : {{val:'bar', eval:false}},
 *     key3 : {{val:'foobar', eval:true}}
 *   }
 */
Drupal.DART.keyVals = function(vals) {
  var ad = '';
  for(var key in vals) {
    value = vals[key];
    for(var val in value) {
      v = value[val];
      ad += this.keyVal(key, v['val'], v['eval']);
    }
  }
  return ad;
}
