/* put this script after redirection_mobile.js */
if (window.location.hostname.indexOf("www.") != -1) {
  var host_mobile = "m." + window.location.hostname.substring(window.location.hostname.indexOf("www.")+4);
  var host_website = window.location.protocol + "//" + window.location.hostname;
  host_mobile += (window.location.href.indexOf("#/") != -1) ? window.location.href.substring(window.location.href.indexOf("#/") + 1) : window.location.href.substring(host_website.length);
  SA.redirection_mobile ({ mobile_url : host_mobile, mobile_prefix : "http" });
}