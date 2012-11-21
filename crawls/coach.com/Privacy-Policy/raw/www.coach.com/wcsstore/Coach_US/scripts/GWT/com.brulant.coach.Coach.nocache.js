function com_brulant_coach_Coach(){
  var $wnd_0 = window, $doc_0 = document, $stats = $wnd_0.__gwtStatsEvent?function(a){
    return $wnd_0.__gwtStatsEvent(a);
  }
  :null, scriptsDone, loadDone, bodyDone, base = '', metaProps = {}, values = [], providers = [], answers = [], onLoadErrorFunc, propertyErrorFunc;
  $stats && $stats({moduleName:'com.brulant.coach.Coach', subSystem:'startup', evtGroup:'bootstrap', millis:(new Date()).getTime(), type:'begin'});
  if (!$wnd_0.__gwt_stylesLoaded) {
    $wnd_0.__gwt_stylesLoaded = {};
  }
  if (!$wnd_0.__gwt_scriptsLoaded) {
    $wnd_0.__gwt_scriptsLoaded = {};
  }
  function isHostedMode(){
    var result = false;
    try {
      result = $wnd_0.external && ($wnd_0.external.gwtOnLoad && $wnd_0.location.search.indexOf('gwt.hybrid') == -1);
    }
     catch (e) {
    }
    isHostedMode = function(){
      return result;
    }
    ;
    return result;
  }

  function maybeStartModule(){
    if (scriptsDone && loadDone) {
      var iframe = $doc_0.getElementById('com.brulant.coach.Coach');
      var frameWnd = iframe.contentWindow;
      if (isHostedMode()) {
        frameWnd.__gwt_getProperty = function(name_0){
          return computePropValue(name_0);
        }
        ;
      }
      com_brulant_coach_Coach = null;
      frameWnd.gwtOnLoad(onLoadErrorFunc, 'com.brulant.coach.Coach', base);
      $stats && $stats({moduleName:'com.brulant.coach.Coach', subSystem:'startup', evtGroup:'moduleStartup', millis:(new Date()).getTime(), type:'end'});
    }
  }

  function computeScriptBase(){
    var thisScript, markerId = '__gwt_marker_com.brulant.coach.Coach', markerScript;
    $doc_0.write('<script id="' + markerId + '"><\/script>');
    markerScript = $doc_0.getElementById(markerId);
    thisScript = markerScript && markerScript.previousSibling;
    while (thisScript && thisScript.tagName != 'SCRIPT') {
      thisScript = thisScript.previousSibling;
    }
    function getDirectoryOfFile(path){
      var hashIndex = path.lastIndexOf('#');
      if (hashIndex == -1) {
        hashIndex = path.length;
      }
      var queryIndex = path.indexOf('?');
      if (queryIndex == -1) {
        queryIndex = path.length;
      }
      var slashIndex = path.lastIndexOf('/', Math.min(queryIndex, hashIndex));
      return slashIndex >= 0?path.substring(0, slashIndex + 1):'';
    }

    ;
    if (thisScript && thisScript.src) {
      base = getDirectoryOfFile(thisScript.src);
    }
    if (base == '') {
      var baseElements = $doc_0.getElementsByTagName('base');
      if (baseElements.length > 0) {
        base = baseElements[baseElements.length - 1].href;
      }
       else {
        base = getDirectoryOfFile($doc_0.location.href);
      }
    }
     else if (base.match(/^\w+:\/\//)) {
    }
     else {
      var img = $doc_0.createElement('img');
      img.src = base + 'clear.cache.gif';
      base = getDirectoryOfFile(img.src);
    }
    if (markerScript) {
      markerScript.parentNode.removeChild(markerScript);
    }
  }

  function processMetas(){
    var metas = document.getElementsByTagName('meta');
    for (var i = 0, n = metas.length; i < n; ++i) {
      var meta = metas[i], name_0 = meta.getAttribute('name'), content;
      if (name_0) {
        if (name_0 == 'gwt:property') {
          content = meta.getAttribute('content');
          if (content) {
            var value, eq = content.indexOf('=');
            if (eq >= 0) {
              name_0 = content.substring(0, eq);
              value = content.substring(eq + 1);
            }
             else {
              name_0 = content;
              value = '';
            }
            metaProps[name_0] = value;
          }
        }
         else if (name_0 == 'gwt:onPropertyErrorFn') {
          content = meta.getAttribute('content');
          if (content) {
            try {
              propertyErrorFunc = eval(content);
            }
             catch (e) {
              alert('Bad handler "' + content + '" for "gwt:onPropertyErrorFn"');
            }
          }
        }
         else if (name_0 == 'gwt:onLoadErrorFn') {
          content = meta.getAttribute('content');
          if (content) {
            try {
              onLoadErrorFunc = eval(content);
            }
             catch (e) {
              alert('Bad handler "' + content + '" for "gwt:onLoadErrorFn"');
            }
          }
        }
      }
    }
  }

  function __gwt_isKnownPropertyValue(propName, propValue){
    return propValue in values[propName];
  }

  function __gwt_getMetaProperty(name_0){
    var value = metaProps[name_0];
    return value == null?null:value;
  }

  function unflattenKeylistIntoAnswers(propValArray, value){
    var answer = answers;
    for (var i = 0, n = propValArray.length - 1; i < n; ++i) {
      answer = answer[propValArray[i]] || (answer[propValArray[i]] = []);
    }
    answer[propValArray[n]] = value;
  }

  function computePropValue(propName){
    var value = providers[propName](), allowedValuesMap = values[propName];
    if (value in allowedValuesMap) {
      return value;
    }
    var allowedValuesList = [];
    for (var k in allowedValuesMap) {
      allowedValuesList[allowedValuesMap[k]] = k;
    }
    if (propertyErrorFunc) {
      propertyErrorFunc(propName, allowedValuesList, value);
    }
    throw null;
  }

  var frameInjected;
  function maybeInjectFrame(){
    if (!frameInjected) {
      frameInjected = true;
      var iframe = $doc_0.createElement('iframe');
      iframe.src = "javascript:''";
      iframe.id = 'com.brulant.coach.Coach';
      iframe.style.cssText = 'position:absolute;width:0;height:0;border:none';
      iframe.tabIndex = -1;
      $doc_0.body.appendChild(iframe);
      $stats && $stats({moduleName:'com.brulant.coach.Coach', subSystem:'startup', evtGroup:'moduleStartup', millis:(new Date()).getTime(), type:'moduleRequested'});
      iframe.contentWindow.location.replace(base + strongName);
    }
  }

  providers['locale'] = function(){
    try {
      var locale;
      if (locale == null) {
        var args = location.search;
        var startLang = args.indexOf('locale=');
        if (startLang >= 0) {
          var language = args.substring(startLang);
          var begin = language.indexOf('=') + 1;
          var end = language.indexOf('&');
          if (end == -1) {
            end = language.length;
          }
          locale = language.substring(begin, end);
        }
      }
      if (locale == null) {
        locale = __gwt_getMetaProperty('locale');
      }
      if (locale == null) {
        locale = $wnd_0['__gwt_Locale'];
      }
      if (locale == null) {
        return 'default';
      }
      while (!__gwt_isKnownPropertyValue('locale', locale)) {
        var lastIndex = locale.lastIndexOf('_');
        if (lastIndex == -1) {
          locale = 'default';
          break;
        }
         else {
          locale = locale.substring(0, lastIndex);
        }
      }
      return locale;
    }
     catch (e) {
      alert('Unexpected exception in locale detection, using default: ' + e);
      return 'default';
    }
  }
  ;
  values['locale'] = {'default':0, ja_JP:1, us:2, zh_CN:3};
  providers['selectorCapability'] = function(){
    if (document.querySelectorAll && /native/.test(document.querySelectorAll)) {
      return 'native';
    }
    return 'js';
  }
  ;
  values['selectorCapability'] = {js:0, 'native':1};
  providers['user.agent'] = function(){
    var ua = navigator.userAgent.toLowerCase();
    var makeVersion = function(result){
      return parseInt(result[1]) * 1000 + parseInt(result[2]);
    }
    ;
    if (ua.indexOf('opera') != -1) {
      return 'opera';
    }
     else if (ua.indexOf('webkit') != -1) {
      return 'safari';
    }
     else if (ua.indexOf('msie') != -1) {
      if (document.documentMode >= 8) {
        return 'ie8';
      }
       else {
        var result_0 = /msie ([0-9]+)\.([0-9]+)/.exec(ua);
        if (result_0 && result_0.length == 3) {
          var v = makeVersion(result_0);
          if (v >= 6000) {
            return 'ie6';
          }
        }
      }
    }
     else if (ua.indexOf('gecko') != -1) {
      var result_0 = /rv:([0-9]+)\.([0-9]+)/.exec(ua);
      if (result_0 && result_0.length == 3) {
        if (makeVersion(result_0) >= 1008)
          return 'gecko1_8';
      }
      return 'gecko';
    }
    return 'unknown';
  }
  ;
  values['user.agent'] = {gecko:0, gecko1_8:1, ie6:2, ie8:3, opera:4, safari:5};
  com_brulant_coach_Coach.onScriptLoad = function(){
    if (frameInjected) {
      loadDone = true;
      maybeStartModule();
    }
  }
  ;
  com_brulant_coach_Coach.onInjectionDone = function(){
    scriptsDone = true;
    $stats && $stats({moduleName:'com.brulant.coach.Coach', subSystem:'startup', evtGroup:'loadExternalRefs', millis:(new Date()).getTime(), type:'end'});
    maybeStartModule();
  }
  ;
  computeScriptBase();
  var strongName;
  if (isHostedMode()) {
    if ($wnd_0.external.initModule && $wnd_0.external.initModule('com.brulant.coach.Coach')) {
      $wnd_0.location.reload();
      return;
    }
    strongName = 'hosted.html?com_brulant_coach_Coach';
  }
  processMetas();
  $stats && $stats({moduleName:'com.brulant.coach.Coach', subSystem:'startup', evtGroup:'bootstrap', millis:(new Date()).getTime(), type:'selectingPermutation'});
  if (!strongName) {
    try {
      unflattenKeylistIntoAnswers(['default', 'js', 'ie8'], '3D0951BB9529C33E14B464DCB4655BAC.cache.html');
      unflattenKeylistIntoAnswers(['default', 'native', 'ie8'], '3D0951BB9529C33E14B464DCB4655BAC.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'js', 'ie8'], '082A998DC7F84AFAD2BCACCA11FCC01C.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'native', 'ie8'], '082A998DC7F84AFAD2BCACCA11FCC01C.cache.html');
      unflattenKeylistIntoAnswers(['default', 'js', 'ie6'], '14E1823623973913DF743359313601A0.cache.html');
      unflattenKeylistIntoAnswers(['default', 'native', 'ie6'], '14E1823623973913DF743359313601A0.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'js', 'ie6'], '03132ACBA0E98759347F106391CFBBEC.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'native', 'ie6'], '03132ACBA0E98759347F106391CFBBEC.cache.html');
      unflattenKeylistIntoAnswers(['default', 'js', 'opera'], 'D236AA6DDDFE70181F8BAEB1C11CEED1.cache.html');
      unflattenKeylistIntoAnswers(['default', 'native', 'opera'], 'D236AA6DDDFE70181F8BAEB1C11CEED1.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'js', 'opera'], 'AB9BF3CCE2D282E44CE20010EAFC0E7F.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'native', 'opera'], 'AB9BF3CCE2D282E44CE20010EAFC0E7F.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'js', 'ie8'], '1D2B6779777112E1AA7E09D57ADCEDAC.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'native', 'ie8'], '1D2B6779777112E1AA7E09D57ADCEDAC.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'js', 'ie6'], '215E2097191791613C3E6593CAEF9129.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'native', 'ie6'], '215E2097191791613C3E6593CAEF9129.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'js', 'opera'], 'F5A50D66ABBAF9F8283142C726A54093.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'native', 'opera'], 'F5A50D66ABBAF9F8283142C726A54093.cache.html');
      unflattenKeylistIntoAnswers(['default', 'js', 'gecko1_8'], '8CA4CB0F13DDCF3A9CE26090D152949E.cache.html');
      unflattenKeylistIntoAnswers(['default', 'native', 'gecko1_8'], '8CA4CB0F13DDCF3A9CE26090D152949E.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'js', 'gecko1_8'], '657156EF2808B3B1EF47F073885D050E.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'native', 'gecko1_8'], '657156EF2808B3B1EF47F073885D050E.cache.html');
      unflattenKeylistIntoAnswers(['default', 'js', 'safari'], 'A839E539ED29932225538D235BA2C0DC.cache.html');
      unflattenKeylistIntoAnswers(['default', 'native', 'safari'], 'A839E539ED29932225538D235BA2C0DC.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'js', 'safari'], 'C01564D5AE28A4D0D75E5F8A6B974A0C.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'native', 'safari'], 'C01564D5AE28A4D0D75E5F8A6B974A0C.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'js', 'gecko1_8'], '0A488BA627A6E23F106FE1346DBDBB17.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'native', 'gecko1_8'], '0A488BA627A6E23F106FE1346DBDBB17.cache.html');
      unflattenKeylistIntoAnswers(['default', 'js', 'gecko'], '74E9BC7793200FD94EC5659B20CB6EFF.cache.html');
      unflattenKeylistIntoAnswers(['default', 'native', 'gecko'], '74E9BC7793200FD94EC5659B20CB6EFF.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'js', 'gecko'], 'E49172C36C6FC1B3BE6832EC8B85551E.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'native', 'gecko'], 'E49172C36C6FC1B3BE6832EC8B85551E.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'js', 'safari'], '1E558015476FCFC871CA35B2B1AE40E2.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'native', 'safari'], '1E558015476FCFC871CA35B2B1AE40E2.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'js', 'gecko'], '8D54F442C58D06E9ACCEFB3F588AE647.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'native', 'gecko'], '8D54F442C58D06E9ACCEFB3F588AE647.cache.html');
      unflattenKeylistIntoAnswers(['us', 'js', 'ie8'], '9CF0AA03C1604F13A1C13EF80DD3B6C4.cache.html');
      unflattenKeylistIntoAnswers(['us', 'native', 'ie8'], '9CF0AA03C1604F13A1C13EF80DD3B6C4.cache.html');
      unflattenKeylistIntoAnswers(['us', 'js', 'ie6'], '272A8EB71F364622D424F384254E2031.cache.html');
      unflattenKeylistIntoAnswers(['us', 'native', 'ie6'], '272A8EB71F364622D424F384254E2031.cache.html');
      unflattenKeylistIntoAnswers(['us', 'js', 'opera'], '9C3C3638E948533F63B05DA6DB6E0BA5.cache.html');
      unflattenKeylistIntoAnswers(['us', 'native', 'opera'], '9C3C3638E948533F63B05DA6DB6E0BA5.cache.html');
      unflattenKeylistIntoAnswers(['us', 'js', 'gecko1_8'], 'E19A46F6FED11E1B67F751A21F3A0DEE.cache.html');
      unflattenKeylistIntoAnswers(['us', 'native', 'gecko1_8'], 'E19A46F6FED11E1B67F751A21F3A0DEE.cache.html');
      unflattenKeylistIntoAnswers(['us', 'js', 'safari'], '92F7AEEEE2BCB1960761D327C2C2CC7A.cache.html');
      unflattenKeylistIntoAnswers(['us', 'native', 'safari'], '92F7AEEEE2BCB1960761D327C2C2CC7A.cache.html');
      unflattenKeylistIntoAnswers(['us', 'js', 'gecko'], '4AE5A028D4B82EB731042E3DE795561F.cache.html');
      unflattenKeylistIntoAnswers(['us', 'native', 'gecko'], '4AE5A028D4B82EB731042E3DE795561F.cache.html');
      strongName = answers[computePropValue('locale')][computePropValue('selectorCapability')][computePropValue('user.agent')];
    }
     catch (e) {
      return;
    }
  }
  var onBodyDoneTimerId;
  function onBodyDone(){
    if (!bodyDone) {
      bodyDone = true;
      if (!__gwt_stylesLoaded['gwt-log.css']) {
        var l = $doc_0.createElement('link');
        __gwt_stylesLoaded['gwt-log.css'] = l;
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('href', base + 'gwt-log.css');
        $doc_0.getElementsByTagName('head')[0].appendChild(l);
      }
      maybeStartModule();
      if ($doc_0.removeEventListener) {
        $doc_0.removeEventListener('DOMContentLoaded', onBodyDone, false);
      }
      if (onBodyDoneTimerId) {
        clearInterval(onBodyDoneTimerId);
      }
    }
  }

  if ($doc_0.addEventListener) {
    $doc_0.addEventListener('DOMContentLoaded', function(){
      maybeInjectFrame();
      onBodyDone();
    }
    , false);
  }
  var onBodyDoneTimerId = setInterval(function(){
    if (/loaded|complete/.test($doc_0.readyState)) {
      maybeInjectFrame();
      onBodyDone();
    }
  }
  , 50);
  $stats && $stats({moduleName:'com.brulant.coach.Coach', subSystem:'startup', evtGroup:'bootstrap', millis:(new Date()).getTime(), type:'end'});
  $stats && $stats({moduleName:'com.brulant.coach.Coach', subSystem:'startup', evtGroup:'loadExternalRefs', millis:(new Date()).getTime(), type:'begin'});
  $doc_0.write('<script defer="defer">com_brulant_coach_Coach.onInjectionDone(\'com.brulant.coach.Coach\')<\/script>');
}

com_brulant_coach_Coach();
