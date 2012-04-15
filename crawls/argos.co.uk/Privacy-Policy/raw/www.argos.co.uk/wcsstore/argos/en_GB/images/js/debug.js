

// Do not include twice
if (typeof mboxDebugOldVersionsSupport == 'undefined') {

if (mboxVersion <= 18) {
  mbox.prototype.getName = function() {
    return this.id;
  };
};

if (mboxVersion < 24) {
  mboxFactory = function() { };

  mboxFactory.prototype.getMboxes = function() {
    var _each = function() {};
    _each.prototype.each = function(_action) {
      for (var _mbox in mboxs) {
        mboxs[_mbox].message = mboxs[_mbox].error ? mboxs[_mbox].error : '';
        _action(mboxs[_mbox]);
      }
    };
    return new _each();
  };

  mboxFactory.prototype.isSupported = function() {
    return typeof mboxEnv.isSupported != 'undefined' ? mboxEnv.isSupported() :
      mboxEnv.getPlatform().isSupported();
  };

  mboxFactory.prototype.isEnabled = function() {
    return typeof mboxEnv.isEnabled() != 'undefined';
  };

  mboxFactory.prototype.addOnLoad = function(_onLoad) {
    mboxSafeBodyOnload(_onLoad);
  };

  mboxFactory.prototype.getEllapsedTime = function() {
    return mboxPageEndTime - mboxPageStartTime; 
  }

  mboxFactory.prototype.getEllapsedTimeUntil = function(_eventTime) {
    return _eventTime - mboxPageStartTime;
  }

  mboxFactory.prototype.getPageId = function() {
    return 'not supported';
  };

  mboxFactory.prototype.getPCId = function() {
    return mboxPCId;
  };

  mboxFactory.prototype.getSessionId = function() {
    return mboxSessionId;
  };

  mbox.prototype.getId = function() {
    return 0;
  };

};

if (mboxVersion < 33) {
  // .parameters -> .getParameters
  mbox.prototype.getParameters = function() {
    var _parameters = this.parameters();
    var _result = new Array();
    for (var _i = 0; _i < _parameters.length; _i++) {
      // do not include internal parameters
      if (_parameters[_i].name.indexOf('mbox') != 0) {
        _result[_result.length] = _parameters[_i].name + '=' + _parameters[_i].value;
      }
    }
    return _result;
  };

  mboxFactory.prototype.getCookieManager = function() {
    return mboxCookies;
  };

  mboxFactoriesProto = function() { };

  mboxFactoriesProto.prototype.each = function(_action) {
    _action('default', mboxFactoryDefault);
  };

  mboxFactories = new mboxFactoriesProto();
};

if (typeof mboxFactoryDefault == 'undefined') {
  mboxFactoryDefault = new mboxFactory();
};

mboxDebugOldVersionsSupport = true;
};


// private class internal usage only
_mboxDebugDefaultAction = function() { };

_mboxDebugDefaultAction.prototype.show = function() { };

mboxDebugActionsProto = function() {
  this._map = new Object();
  this._default = _mboxDebugDefaultAction;
};

mboxDebugActionsProto.prototype.register = function(_name, _action) {
  this._map[_name] = _action;
};

mboxDebugActionsProto.prototype.registerDefault = function(_action) {
  this._default = _action;
};

mboxDebugActionsProto.prototype.show = function(_name) {
  var _action = this._map[_name] ? this._map[_name] : this._default;
  (new _action()).show();
};

if (typeof mboxDebugActions == 'undefined') {
  mboxDebugActions = new mboxDebugActionsProto();
};

function mboxHTMLSafe(_text) {
  return _text.replace(/\"/g, '&quot;').replace(/>/g, '&gt;').replace(/</g,'&lt;');
}



/*
 * Class for the Debug action when mboxDebug=1
 */
mboxDebugActionDefault = function() { };

mboxDebugActionDefault.prototype.show = function() {
  var window = new mboxDebugWindow("Debug");

  window.putPageStart();
  window.put("  <b>Mbox Debug Window (version: " + mboxVersion + ")</b><br/>");

  window.put("<p/>");
  window.put("<b>Page</b>: " + mboxHTMLSafe(document.location.href));
  window.put("<br/><b>Referrer</b>: " + mboxHTMLSafe(document.referrer));

  window.put(" <ul>");

  var _enabled = mboxFactoryDefault.isEnabled();
  window.put('  <li>Enabled: <span style="color:' +
    (_enabled ? 'green' : 'red') + '"><b>' + _enabled + '</b></span></li>');
  window.put("  <li>Cookies: '" + mboxHTMLSafe(document.cookie) + "'</li></ul>");

  mboxFactories.each(function(_name, _factory) {
    var _count = 1;
    window.put("<hr/><ul><li><b>Factory</b>: <i>'" + mboxHTMLSafe(_name) + "'</i></li><ul>");
    window.put("<li><i>pageId</i>: " + mboxHTMLSafe(_factory.getPageId()) + "</li>");
    window.put("<li><i>mboxPC</i>: " + mboxHTMLSafe(_factory.getPCId().getId()) + "</li>");
    window.put("<li><i>sessionId</i>: " + mboxHTMLSafe(_factory.getSessionId().getId()) + "</li>");
    window.put("<hr/>");
    _factory.getMboxes().each(function(_mbox) {
      window.put("  <li>" + _count++ + ". '<a href=\"" + mboxHTMLSafe(_mbox.getURL()) + "\">" +
       mboxHTMLSafe(_mbox.getName()) + "</a>'");
      window.put("   <ul>");
      if (_mbox.getId() != 0) {
        window.put("<li> <b>id</b>: " + mboxHTMLSafe(_mbox.getId()) + "</li>");
      }
      if (_mbox.getParameters().length > 0) {
        window.put(" <li><b>parameters</b>: '" + mboxHTMLSafe(_mbox.getParameters().join(", ")) + "'</li>");
      }
      window.put("<li><i>" + mboxHTMLSafe(_mbox.getURL()) + "</i></li>");
      if (_mbox.message != '') {
        window.put('   <li><span style="color: red"><b>Error: ' +
          mboxHTMLSafe(_mbox.message) + '</b></span></li>');
      }

      if (_mbox.getDefaultDiv() == null) {
        window.put('    <li><span style="color: red">' +
          '<b>Error: cannot find mbox in dom</b></span></li>');
      }

      window.put("   </ul>");
      window.put("  </li>");
    });
    window.put(" </ul>");
    window.put(" </ul>");
  });

  window.put(" <hr/>");
  window.putCloseButton();
  window.putPageEnd();
};

if (typeof mboxDebugActions != 'undefined') {
  mboxDebugActions.registerDefault(mboxDebugActionDefault);
};



var mboxDebugCookies = new Array();

function mboxDebugCookie(name, duration, _factoryId, _cookieManager) {
  this.name = name;
  this.duration = duration;
  this._cookieManager = _cookieManager;
  this.factoryId = _factoryId;

  this.value = this._cookieManager.getCookie(this.name);
  this.zap = mboxDebugCookie_zap;
  this.set = mboxDebugCookie_set;
}

function mboxDebugCookie_zap() {
  this._cookieManager.deleteCookie(this.name);
}

function mboxDebugCookie_set(value) {
  this._cookieManager.setCookie(this.name, value, this.duration)
  this.value = value;

  return value;
}

function mboxDebugIdCookie(name, duration, _factoryId, _cookieManager) {
  this.base = mboxDebugCookie;
  this.base(name, duration, _factoryId, _cookieManager);

  this.generate = mboxDebugIdCookie_generate;
}

function mboxDebugIdCookie_generate() {
  var id = mboxGenerateId();
  this._cookieManager.setCookie(this.name, id, this.duration);
  this.value = id;

  return id;
}

mboxDebugActionAdvancedCookie = function() { };

mboxDebugActionAdvancedCookie.prototype.show = function() {
  mboxFactories.each(function(_name, _factory) {
    var _cookieManager = _factory.getCookieManager();
    mboxDebugCookies[mboxDebugCookies.length] = new mboxDebugIdCookie(
      'session', 31 * 60, _name, _cookieManager);
    mboxDebugCookies[mboxDebugCookies.length] = new mboxDebugIdCookie(
      'PC', 2 * 365 * 24 * 60 * 60,
       _name, _cookieManager);
    mboxDebugCookies[mboxDebugCookies.length] = new mboxDebugCookie(
      'edge',  30 * 60, _name, _cookieManager);
    mboxDebugCookies[mboxDebugCookies.length] = new mboxDebugCookie(
      'disable', 30 * 60, _name, _cookieManager);
    mboxDebugCookies[mboxDebugCookies.length] = new mboxDebugCookie(
      'check', 30 * 60, _name, _cookieManager);
    mboxDebugCookies[mboxDebugCookies.length] = new mboxDebugCookie(
      'debug', 30 * 60, _name, _cookieManager);
    mboxDebugCookies[mboxDebugCookies.length] = new mboxDebugCookie(
      'level', 90 * 24 * 60 * 60,
       _name, _cookieManager);
    mboxDebugCookies[mboxDebugCookies.length] = new mboxDebugCookie(
      'traffic', 90 * 24 * 60 * 60,
       _name, _cookieManager
      );
  });
  var window = new mboxDebugWindow("Debug Cookie");

  window.putPageStart();

  window.put('<' + 'scr' + 'ipt>');
  window.put('function mboxDebugCookieFormSet(index) {')
  window.put('  var value = document["cookieForm" + index]'
    + '.elements["cookie"].value;');
  window.put('  window.opener.mboxDebugCookies[index].set(value);');
  window.put('}');
  window.put('');
  window.put('function mboxDebugCookieFormZap(index) {');
  window.put('  window.opener.mboxDebugCookies[index].zap()');
  window.put('  document["cookieForm" + index].elements["cookie"].value = "";');
  window.put('}');
  window.put('');
  window.put('function mboxDebugCookiesFormZap() {');
  window.put('  var cookiesCount = window.opener.mboxDebugCookies.length;');
  window.put('  for(var i = 0; i < cookiesCount; i++) {');
  window.put('    mboxDebugCookieFormZap(i);');
  window.put('  }');
  window.put('}');
  window.put('');
  window.put('function mboxDebugCookieFormGenerate(index) {');
  window.put('  document["cookieForm" + index].elements["cookie"].value = ');
  window.put('    window.opener.mboxDebugCookies[index].generate();');
  window.put('}');
  window.put('');
  window.put('<' + '\/scr' + 'ipt>');

  window.put("<p/>");
  window.put("<b>Page</b>: " + mboxHTMLSafe(document.location.href) + "<br />");
  window.put("<b>PageId</b>: " + mboxFactoryDefault.getPageId() + "<br />");
  var _done = false;
  mboxFactories.each(function(_name, _factory) {
  _factory.getMboxes().each(function(_mbox) {
    if (_done) {
      return;
    }
    var _XDomainValueRegExp = new RegExp(name + "mboxXDomain=([^\&]*)");
    var _XDomainValueMatch = _XDomainValueRegExp.exec(_mbox.getURL());

    if (_XDomainValueMatch != null && _XDomainValueMatch.length >= 2) {
      window.put("<b>XDomain</b>: " + _XDomainValueMatch[1] + "<br />");
    }
    else {
      window.put("<b>XDomain</b>: disabled<br />");
    }
    _done = true;
  })});

  window.put("<table>");
  window.put(" <tr>");
  for(var i = 0; i < mboxDebugCookies.length; i++) {
    var cookie = mboxDebugCookies[i];
    var value = cookie.value != null ? cookie.value : '';

    window.put(' </tr><tr>');
    window.put('  <form name="cookieForm' + i + '" onsubmit="return false;">');
    window.put('   <td>' + cookie.name + (cookie.factoryId != 'default' ?
      '[<i>' + cookie.factoryId + '</i>]' : '') + '</td>');
    window.put('   <td><input type="text" name="cookie" '
     + ' value="' + value + '" /></td>');
    window.put('   <td>');
    window.put('    <input type="submit" name="set" value="set"'
      + ' onclick="mboxDebugCookieFormSet(' + i + ');" />');
    window.put('    <input type="submit" name="delete" value="delete"'
      + ' onclick="mboxDebugCookieFormZap(' + i + ');" />');
    if (typeof cookie.generate != "undefined") {
      window.put('    <input type="submit" name="generate" value="generate"'
        + ' onclick="mboxDebugCookieFormGenerate(' + i + ')" />');
    }
    window.put('  </td>');
    window.put('  </form>');
  }
  window.put(" </tr>");
  window.put("</table>");

  window.put('<input type="button" value="delete all cookies"'
    + ' onclick="mboxDebugCookiesFormZap();" /><br/>');

  window.putCloseButton()
  window.putPageEnd();
};


if (typeof mboxDebugger != 'undefined' && mboxDebugger.setShowAction) {
  mboxDebugger.setShowAction(new mboxDebugActionAdvancedCookie());
};

if (typeof mboxDebugActions != 'undefined') {
  mboxDebugActions.register('x-cookie', mboxDebugActionAdvancedCookie);
};


function mboxDebugActionAdvancedTime() { };

mboxDebugActionAdvancedTime.prototype.show = function() {
  var _window = new mboxDebugWindow('Debug Time');
  _window.putPageStart();
  _window.put('<p>The times describe below are influenced by many factors ' +
   'including:<ul><li>response time of Test&amp;Target' +
   ' servers</li><li>page layout</li><li>images loaded around the same time' +
   ' as the mbox</li></ul>Portions of the mbox activity can also happen in' + 
   ' parrallel with  other page load activities');
  _window.put('<style type="text/css">table { border: 1px solid }' +
    'td { border: thin dotted }</style><table>');
  this._writePageLoadTimes(_window);
  var _self = this;
  mboxFactories.each(function(_name, _factory) {
  _factory.getMboxes().each(function(_mbox) {
    _self._writeMboxLoadTimes(_window, _mbox);
  })});
  _window.put('</table>');
  _window.putCloseButton();
  _window.putPageEnd();
};

mboxDebugActionAdvancedTime.prototype._writeMboxLoadTimes = function(
  _window, _mbox) {
  _window.put("<tr><td><a href='" + _mbox.getURL() + "'>'" +
    _mbox.getName() + "'</a></td>");

  var _eventTimes = _mbox.getEventTimes();
  var _startEventTime = null;
  var _endEventTime = null;

  _window.put('<td><i>show</i></td><td>&nbsp;&nbsp;&nbsp;</td>');
  for (var _event in _eventTimes) {
    if (_startEventTime == null) {
      _startEventTime = _eventTimes[_event];
    }

    if (_event.indexOf('show.end') >= 0 || _event.indexOf('hide.end') >= 0) {
      _endEventTime = _eventTimes[_event];
    }
    _window.put('<td title="' + _event + '"><i>' + _event + '</i></td>');
  }
  _window.put('</tr><td>&nbsp;</td><td>' + (_endEventTime - _startEventTime) + '</td>');
  _window.put('<td>&nbsp;</td>');

  for (var _event in _eventTimes) {
    _window.put('<td title="' + _event + '">' +
      (_eventTimes[_event] - _startEventTime) + '</td>');
  }
  _window.put('</tr>');
};

mboxDebugActionAdvancedTime.prototype._writePageLoadTimes = function(_window) {
  _window.put('<ul><li>total page load time: ' + mboxFactoryDefault.getEllapsedTime() + 'ms</li>');
  var _totalMboxImpact = 0;
  mboxFactories.each(function(_name, _factory) {
  _factory.getMboxes().each(function(_mbox) {
    var _events = _mbox.getEventTimes();
    var _startTime =
      _factory.getEllapsedTimeUntil(_events['load.start']);
    var _endTime = NaN;
    if (_mbox.isActivated()) {
      for (var _event in _events) {
        if (_event.indexOf('activate') == 0 && _event.indexOf('end') > 0) {
          _endTime = _factory.getEllapsedTimeUntil(_events[_event]);
        }
      }
    }
    _totalMboxImpact += _endTime - _startTime;
  })});
};

if (typeof mboxDebugger != 'undefined' && mboxDebugger.setShowAction) {
  mboxDebugger.setShowAction(new mboxDebugActionAdvancedTime());    
}

if (typeof mboxDebugActions != 'undefined') {
  mboxDebugActions.register('x-time', mboxDebugActionAdvancedTime);
}  

/**
 * Class to log page load times to server
 */
mboxDebugActionLog = function(_mode) {
  this._mode = _mode;
  this._start = (new Date()).getTime();
};

mboxDebugActionLog.prototype.show = function() {
  var _end = (new Date()).getTime();

  var _window = new mboxDebugWindow("Debug Log");

  _window.putPageStart();
  // The breakage below is to prevent search engines from crawling
  _window.put("<img sr" + "c='"
    + document.location.protocol + "//argoslimited.tt.omtrdc.net/ima" + "ges/log.gif"
    + "?mboxDebug=" + this._mode
    + "&mboxClient=argoslimited"
    + "&mboxPageLoadTime=" + (_end - this._start) + "'/>");

  _window.put("<br />");

  _window.putCloseButton();
  _window.putPageEnd();
};

if (typeof mboxDebugger != 'undefined' && mboxDebugger.setShowAction) {
  mboxDebugger.setShowAction(new mboxDebugActionLog());    
}

mboxDebugActions.register('x-log', mboxDebugActionLog);

mboxDebugActionProfile = function() { };

mboxDebugActionProfile.prototype.show = function() {
  var _window = new mboxDebugWindow('Debug Profile');
  _window.putPageStart();
  var _sessionId = mboxFactoryDefault.getCookieManager().getCookie('session');
  _window.put('<iframe width="100%" height="85%" src="http://argoslimited.tt.omtrdc.net/debug/x-profile.jsp?'
    + 'clientCode=argoslimited&mboxSession=' + _sessionId + '"></iframe><hr/>');
  _window.put('Client code: argoslimited<br/>');
  _window.put('Cookies: "' + document.cookie + '"<br/>');
  _window.putCloseButton()
  _window.putPageEnd();
};

if (typeof mboxDebugger != 'undefined' && mboxDebugger.setShowAction) {
  mboxDebugger.setShowAction(new mboxDebugActionProfile());    
}

if (typeof mboxDebugActions != 'undefined') {
  mboxDebugActions.register('x-profile', mboxDebugActionProfile);
}  

/*
 * Class to invoke the specified debug action
 */
mboxDebug = function(_debugModeCookie, _debugModeArg, _factory) {
  this._debugCookie = _debugModeCookie;
  this._action = null;
  this._cookieManager = _factory.getCookieManager();

  var _mode = mboxGetPageParameter(_debugModeArg);
  if (_mode == null) {
    _mode = this._cookieManager.getCookie(this._debugCookie);
  }

  if (_mode != null) {
    if (!_factory.isSupported()) {
      alert("mbox functionality is not supported on this browser");
      this.disable();
    }
    _factory.addOnLoad(function() { mboxDebugActions.show(_mode); });
    this._cookieManager.setCookie(this._debugCookie, _mode, 45 * 60);
  } else {
    this.disable();
  }
};

mboxDebug.prototype.disable = function() {
  this._cookieManager.deleteCookie(this._debugCookie);
};

mboxDebugWindow = function(_name) {
  this._name = _name + " " + document.location.hostname;

  var _notAlphaNumeric = /\W/g;
  var _safeName = this._name.replace(_notAlphaNumeric, '_');

  this._window = window.open("", "mboxDebugWindow" + _safeName,
    "width=600,height=300,resizable,scrollbars=yes,toolbar=yes");

  if (this._window == null) {
    alert("Unable to open debug window.\nAre you blocking popups?\n");
  }
};

mboxDebugWindow.prototype.put = function(_string) {
  if (this._window == null) {
    return;
  }
  try {
    this._window.document.writeln(_string);
    this._window.scrollBy(0, 1000);
  } catch (e) {
    alert("Unable to write to the current mboxDebug window.\n"
     + "Please close any open debug window");
    this._window = null;
  }
};

mboxDebugWindow.prototype.putCloseButton = function() {
  this.put("<a href=\"javascript:mboxDebugWindowClose()\">"
    + "click here to close debug window</a>");
};

mboxDebugWindow.prototype.putPageStart = function() {
  this.put("<html><head>"
    + " <title>" + this._name + "</title>"
    + "  <" + "scr" + "ipt>"
    + "   function mboxDebugWindowClose() {"
    + "     try {"
    + "       window.opener.mboxDebugger.disable();"
    + "     } catch(e) {"
    + "       alert('Could not disable debug mode.\\n'"
    + "         + 'Browse to a page containing an mbox and\\n'"
    + "         + 'click on close link.');"
    + "     }"
    + "     window.close();"
    + "   }"
    + "  <" + "\/scr" + "ipt>"
    + " </head>"
    + " <body>");
};

mboxDebugWindow.prototype.putPageEnd = function() {
  this.put("</body></html>");
  if (this._window != null) {
    this._window.document.close();
  }
};

if (typeof mboxDebugger == 'undefined') {
  mboxDebugger = new mboxDebug("debug",
    "mboxDebug", mboxFactoryDefault);
  mboxDebugLoaded = true;
}