<!-- Mobile Redirect -->
(function() {
  
  // General Variables and RegEx
  var mobileCookie = readCookie("mw_mobile_site");
  var regExUA = /ip(hone|od)|android.*(mobile)|blackberry.*applewebkit/i;
  var regExDomain = /^(www(\d+)?\.)?(.*)$/;
  var regExCookieDomain = /^(www(\d+)?\.)?(m.*\.)?(.*\.\w{3})$/;

  // Build the top level domain
  var hostname = window.location.hostname;
  var domain = hostname.match(regExCookieDomain);
  domain = domain[domain.length-1];
  
  // Cookie helper functions
  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  function createCookie(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/;"+"domain=."+domain;
  }
  
  function redirect(version) {
    var loc = window.location;
    var topDomain;
    version === "mobile" ? topDomain = ("m." + domain) : topDomain = domain;
    t = topDomain.match(regExDomain);
    topDomain = t[t.length-1];
    var newLoc = loc.protocol + "//" + topDomain + loc.pathname + loc.hash;
    version === "mobile" ? createCookie("mw_mobile_site", true, 10) :     createCookie("mw_mobile_site", false, 10);
    
    // Redirect
    loc.href = newLoc;
  }

  function onMobile() {
    var onMobile;
    location.hostname.match(/^m\./) !== null ? onMobile=true : onMobile=false;
    return onMobile;
  }
  
  // Check for the mobile cookie
  if (mobileCookie !== null) {
    if (mobileCookie === "false" && onMobile()) {
      // redirect to desktop
      redirect("desktop");
      return;
    }
    else if (mobileCookie === "true" && !onMobile()) {
      // redirect to mobile site
      redirect("mobile");
      return;
    }
  } else if (!onMobile()) {
    // Check if the navigator is supported
    if (window.navigator) {
      if (navigator.userAgent.match(regExUA) !== null) {
        redirect("mobile");
      }
    }    
  }
})();
<!-- End Mobile Redirect -->