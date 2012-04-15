var I18nUrlHelper = I18nUrlHelper || {};
I18nUrlHelper.urlFor = function(url) {
  if (url.substring(0, 1) != "/") { return url; }

  var locales = I18n.availableLocales ? new RegExp('^\\/(' + I18n.availableLocales.join("|") + ')') : null;
  if (url.search(locales) >= 0){
    if (url.split('/')[1] == I18n.defaultLocale){
      return url.replace(locales, '');
    }
  } else if (I18n.locale != I18n.defaultLocale){
    return ('/' + I18n.locale + url);
  }

  return url;
}
