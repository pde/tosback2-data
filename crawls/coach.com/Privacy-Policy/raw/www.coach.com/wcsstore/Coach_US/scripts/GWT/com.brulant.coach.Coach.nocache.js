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
      unflattenKeylistIntoAnswers(['default', 'js', 'ie8'], '853F35CD2E63ADC824B5B56410772A0C.cache.html');
      unflattenKeylistIntoAnswers(['default', 'native', 'ie8'], '853F35CD2E63ADC824B5B56410772A0C.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'js', 'ie8'], '0C5519089E0063241B755F2972A8C831.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'native', 'ie8'], '0C5519089E0063241B755F2972A8C831.cache.html');
      unflattenKeylistIntoAnswers(['default', 'js', 'ie6'], '027A3E1DE8759B758E8146D9D6645863.cache.html');
      unflattenKeylistIntoAnswers(['default', 'native', 'ie6'], '027A3E1DE8759B758E8146D9D6645863.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'js', 'ie6'], '1AD6614235BA31B5DCBDED3F616430D6.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'native', 'ie6'], '1AD6614235BA31B5DCBDED3F616430D6.cache.html');
      unflattenKeylistIntoAnswers(['default', 'js', 'opera'], '0D5A87C0F9331DA72BDAF7FA787604B6.cache.html');
      unflattenKeylistIntoAnswers(['default', 'native', 'opera'], '0D5A87C0F9331DA72BDAF7FA787604B6.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'js', 'opera'], '58D030F874118CC5BE548C91C42FA6F2.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'native', 'opera'], '58D030F874118CC5BE548C91C42FA6F2.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'js', 'ie8'], '81CC6720F7D5F9D90B1D4AEF5B6B393D.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'native', 'ie8'], '81CC6720F7D5F9D90B1D4AEF5B6B393D.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'js', 'ie6'], '95E2FF9A32594A8E5B84848A21569466.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'native', 'ie6'], '95E2FF9A32594A8E5B84848A21569466.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'js', 'opera'], '0A17D0528F4674E0C4AAD3A88928E193.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'native', 'opera'], '0A17D0528F4674E0C4AAD3A88928E193.cache.html');
      unflattenKeylistIntoAnswers(['default', 'js', 'gecko1_8'], '76888CE9636A72D1A0DE8C3BB4464BE2.cache.html');
      unflattenKeylistIntoAnswers(['default', 'native', 'gecko1_8'], '76888CE9636A72D1A0DE8C3BB4464BE2.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'js', 'gecko1_8'], 'BC49FC936AA1827B8CE9EA287F6BEF9C.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'native', 'gecko1_8'], 'BC49FC936AA1827B8CE9EA287F6BEF9C.cache.html');
      unflattenKeylistIntoAnswers(['default', 'js', 'safari'], '52B457259266E519C42F777254414E18.cache.html');
      unflattenKeylistIntoAnswers(['default', 'native', 'safari'], '52B457259266E519C42F777254414E18.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'js', 'safari'], '56067335C967B8165E3D0B4F68FD43E6.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'native', 'safari'], '56067335C967B8165E3D0B4F68FD43E6.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'js', 'gecko1_8'], '1EC392C704ED45DF573A6899D29B1B88.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'native', 'gecko1_8'], '1EC392C704ED45DF573A6899D29B1B88.cache.html');
      unflattenKeylistIntoAnswers(['default', 'js', 'gecko'], 'C1CB62C657B979F2BFC0A95EF5EE9056.cache.html');
      unflattenKeylistIntoAnswers(['default', 'native', 'gecko'], 'C1CB62C657B979F2BFC0A95EF5EE9056.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'js', 'gecko'], 'CABBB364C3055AF351C4BE958F705D22.cache.html');
      unflattenKeylistIntoAnswers(['zh_CN', 'native', 'gecko'], 'CABBB364C3055AF351C4BE958F705D22.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'js', 'safari'], '38E27E92BFAE14152DE7A028062794F3.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'native', 'safari'], '38E27E92BFAE14152DE7A028062794F3.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'js', 'gecko'], '5E2337993ED2D4A191F2D4926EEDBFCD.cache.html');
      unflattenKeylistIntoAnswers(['ja_JP', 'native', 'gecko'], '5E2337993ED2D4A191F2D4926EEDBFCD.cache.html');
      unflattenKeylistIntoAnswers(['us', 'js', 'ie8'], '2A1FAF2E313A530D22705542EAC668E5.cache.html');
      unflattenKeylistIntoAnswers(['us', 'native', 'ie8'], '2A1FAF2E313A530D22705542EAC668E5.cache.html');
      unflattenKeylistIntoAnswers(['us', 'js', 'ie6'], 'AF4056128BC72DC2025807D37233BE95.cache.html');
      unflattenKeylistIntoAnswers(['us', 'native', 'ie6'], 'AF4056128BC72DC2025807D37233BE95.cache.html');
      unflattenKeylistIntoAnswers(['us', 'js', 'opera'], '95CA5FD8AF2271F3E079D7098A18DEF3.cache.html');
      unflattenKeylistIntoAnswers(['us', 'native', 'opera'], '95CA5FD8AF2271F3E079D7098A18DEF3.cache.html');
      unflattenKeylistIntoAnswers(['us', 'js', 'gecko1_8'], 'F0FDCB030C2A18F316E1ABB71BC392B4.cache.html');
      unflattenKeylistIntoAnswers(['us', 'native', 'gecko1_8'], 'F0FDCB030C2A18F316E1ABB71BC392B4.cache.html');
      unflattenKeylistIntoAnswers(['us', 'js', 'safari'], 'BF40E07FC40FAD8EC03B472E2195730B.cache.html');
      unflattenKeylistIntoAnswers(['us', 'native', 'safari'], 'BF40E07FC40FAD8EC03B472E2195730B.cache.html');
      unflattenKeylistIntoAnswers(['us', 'js', 'gecko'], 'CF26B1B1BE25FD1C741CE19968333E2A.cache.html');
      unflattenKeylistIntoAnswers(['us', 'native', 'gecko'], 'CF26B1B1BE25FD1C741CE19968333E2A.cache.html');
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
