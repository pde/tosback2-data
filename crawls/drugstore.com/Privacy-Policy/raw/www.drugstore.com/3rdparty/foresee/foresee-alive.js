var $$FSR = {
    'timestamp': 'August 14, 2012 @ 9:30 AM',
    'version': '15.0.0',
    'enabled': true,
    'sessionreplay': isSessionReplayEnabled, //This variable is declared in "header_footer.HeaderFooterCls.cs"
    'auto': true,
    'encode': false,
    'files': '/3rdparty/foresee/',
    // needs to be set when foresee-transport.swf is not located at 'files'
    //'swf_files': '__swf_files_'
    'id': 'olsgYRE0R5w0lZEZQldR1w==',
    'definition': 'foresee-surveydef.js',
    'embedded': false,
    'replay_id': 'drugstore.com',
    'renderer': 'W3C', // or "ASRECORDED"
    'layout': 'CENTERFIXED', // or "LEFTFIXED" or "LEFTSTRETCH" or "CENTERSTRETCH"
    'pools': [
      {
          path: '.',
          sp: 100  // CHANGE ONLY WHEN INCLUDING SESSION REPLAY
      }
   ],
      'sites': [{
          name: 'visiondirect',
          path: 'visiondirect.com'
      }, {
          name: 'beauty',
          path: 'beauty.com'
      }, {
          name: 'drugstore',
          path: 'drugstore.com'
      }, {
          path: '.',
          domain: 'default'
      }],
    storageOption: 'cookie'
};
// -------------------------------- DO NOT MODIFY ANYTHING BELOW THIS LINE ---------------------------------------------
for (var a = $$FSR, b = window.document, c = a.sites, d = 0, e = c.length; d < e; d++) { var f; "[object Array]" !== Object.prototype.toString.call(c[d].path) && (c[d].path = [c[d].path]); for (var g = 0, h = c[d].path.length; g < h; g++) if (f = b.location.href.toLowerCase().match(c[d].path[g])) { a.siteid = d; a.site = a.sites[d]; a.site.domain ? "default" == a.site.domain && (a.site.domain = null) : a.site.domain = f[0]; a.site.secure || (a.site.secure = null); a.site.name || (a.site.name = f[0]); break } if (f) break } b.cookie = "fsr.a" + (a.site.cookie ? "." + a.site.cookie : "") + "=suspended;path=/" + (a.site.domain ? ";domain=" + a.site.domain + ";" : ";") + (a.site.secure ? "secure" : "");