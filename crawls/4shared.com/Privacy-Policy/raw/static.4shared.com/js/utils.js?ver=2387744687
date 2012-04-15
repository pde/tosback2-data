function Utils() {
  return this;
}

Utils.isHtml5UploadSupport = !!('multiple' in document.createElement('input'));

Utils.isFunctionExists = function(functionName) {
  return (eval('typeof ' + functionName) == 'function');
}

Utils.fixEventCoords = function(e) {
  // Calculate pageX/Y if missing and clientX/Y available
  // note: IE seems to be the only one that needs this because
  //       jQuery will add it for others. Don't know why not
  //       for IE.
  if (e.pageX == null && e.clientX != null) {
    var e = document.documentElement, b = document.body
    e.pageX = e.clientX + (e && e.scrollLeft || b.scrollLeft || 0)
    e.pageY = e.clientY + (e && e.scrollTop || b.scrollTop || 0)
  }

  return e
}

Utils.getFlashVersion = function() {
  var version;

  try {
    version = navigator.plugins['Shockwave Flash'];
    version = version.description;
  } catch (e1) {
    try {
      version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');
    } catch (e2) {
      version = '0.0';
    }
  }

  version = version.match(/\d+/g);

  return parseFloat(version[0] + '.' + version[1]);
}

Utils.getCpuArch = function() {
  try {
    var cpu = window.navigator.oscpu
    if (!cpu)
      cpu = window.navigator.cpuClass

    return cpu.indexOf('64') > 0 ? 64 : 32
  } catch (err) {
    return 64
  }
}

Utils.getSelection = function() {
  if (window.getSelection) {
    return window.getSelection().toString()
  } else if(document.getSelection) {
    return document.getSelection()
  } else if(document.selection) {
    return document.selection.createRange().text
  }
}

Utils.validateUrl = function(url) {
  return (/^([a-z0-9]([a-z]|\d|\+|-|\.)*):?(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url))
}

Utils.toShortString = function(str, limit) {
  return str.length <= limit ? str : (str.substring(0, limit) + '...')
}

Utils.indexOf = function(arr, obj) {
  if (arr.indexOf) {
    return arr.indexOf(obj)
  }

  for(var i = 0; i < arr.length; i++) {
    if (arr[i] == obj) {
      return i
    }
  }

  return -1
}

Utils.copyToClipboard = function(meintext) {
  if (window.clipboardData)
    window.clipboardData.setData("Text", meintext)
  else if (window.netscape) {
    netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect')

    var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard)
    if (!clip)
      return false

    var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable)
    if (!trans)
      return false

    trans.addDataFlavor('text/unicode')
    var str = new Object()
    var len = new Object()
    var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString)
    str.data = meintext
    trans.setTransferData("text/unicode", str, meintext.length * 2)
    var clipid = Components.interfaces.nsIClipboard
    if (!clipid)
      return false;

    clip.setData(trans, null, clipid.kGlobalClipboard)
  }
  return false;
}

Utils.getSearchName = function(string) {
  if (typeof(string) != 'string') return string
  string = $.trim(string.replace(/\\/g, '').replace(/\//g, ''))
  return encodeURIComponent(getSearchNameForSeo(string)).replace(/%2B/g, '+')

  function getSearchNameForSeo(string) {
    if (!Config.isReplaceSearchNameForSeo) return string
    var arr = string.split("")
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == " ") arr[i] = "-"
      else if (arr[i] == "+") arr[i] = "-"
      else if (arr[i] == "-") arr[i] = "+"
    }
    return arr.join("")
  }
}