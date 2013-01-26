// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
function open_idnet_signin_signup(href) {
  if (is_blacklisted_browser()) {
    window.location = href;
  } else
    window.open(href, 'idnet_popup_window', 'target=_blank, scrollbars=1, width=410, height=565');
  return false
}

function open_idnet_register(href){
  if (is_blacklisted_browser()) {
    window.location = href;
  } else
    window.open(href, 'ID.NET Registration', 'target=_blank, scrollbars=1, width=460, height=565');
  return false
}

function is_blacklisted_browser() {
  if (navigator.appName == 'Opera') return true; // Opera opens popup in a new tab
  if (get_ie_version() >= 8) return true; // IE 8+ does not allow redirection in the opener window

  var re_safari = new RegExp("Safari");
  var re_v4 = new RegExp("Version/4\.0\.3");
  var re_v511 = new RegExp("Version/5\.1\.1");
  var re_mac_os_x_lion = new RegExp("Mac OS X 10_7");
  var ua = navigator.userAgent;
  if (re_safari.exec(ua)) {
    if (re_v4.exec(ua)) return true; // Safari 4.0.3 fails on opener window redirection
    if (re_v511.exec(ua) && re_mac_os_x_lion.exec(ua)) return true; // Safari 5.1.1 on Mac OS X Lion opens popup in a new tab
  }
  return false;
}

function get_ie_version() {
  // Returns the version of Internet Explorer or a -1
  // (indicating the use of another browser).
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}