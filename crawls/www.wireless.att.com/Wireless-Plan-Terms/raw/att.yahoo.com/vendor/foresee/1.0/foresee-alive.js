var $$FSR = {
   'timestamp': 'April 23, 2012 @ 10:06 PM',
   'version': '12.2.4',
   'enabled': true,
   'sessionreplay': true,
   'auto' : true,
   'encode' : false,
   'files': 'http://att.yahoo.com/vendor/foresee/1.0/',
   //'swf_files': '__swf_files_' needs to be sef when foresee-transport.swf is not located at 'files'
   'id': 'JxTg9PsUYKor4P5i9ne0Ug==',
   'definition': 'foresee-surveydef.js',
   'embedded': false,
   'replay_id': 'att.net',
   'renderer':'W3C',	// or "ASRECORDED"
   'layout':'CENTERFIXED',	// or "LEFTFIXED" or "LEFTSTRETCH" or "CENTERSTRETCH"
   'sites': [
      {
         path: /\w+-?\w+\.(com|org|edu|gov|net|co\.uk)/
      },
      {
         path: '.',
         domain: 'default'
      }
   ],
   storageOption: 'cookie'
};
// -------------------------------- DO NOT MODIFY ANYTHING BELOW THIS LINE ---------------------------------------------
(function(a,g,d){for(var b=a.sites,c=0,h=b.length;c<h;c++){var e;"[object Array]"!==Object.prototype.toString.call(b[c].path)&&(b[c].path=[b[c].path]);for(var f=0,i=b[c].path.length;f<i;f++)if(e=d.location.href.match(b[c].path[f])){a.siteid=c;a.site=a.sites[c];a.site.domain?"default"==a.site.domain&&(a.site.domain=null):a.site.domain=e[0];a.site.secure||(a.site.secure=null);a.site.name||(a.site.name=e[0]);break}if(e)break}b={b:function(b){var j;j=(b=d.cookie.match("(?:^|;)\\s*"+b.replace(/([-.*+?^${}()|[\]\/\\])/g,
"\\$1")+"=([^;]*)"))?b[1]:null,b=j;a.encode&&(b=b?decodeURIComponent(b):null);return b},a:function(){d.cookie="fsr.a"+(a.site.cookie?"."+a.site.cookie:"")+"="+(new Date).getTime()+";path=/"+(a.site.domain?";domain="+a.site.domain+";":";")+(a.site.secure?"secure":"")}};if(!b.b("fsr.a"+(a.site.cookie?"."+a.site.cookie:"")))b.a(),g.fsr$timer=setInterval(b.a,1E3),d.cookie="fsr.paused=1;path=/"+(a.site.domain?";domain="+a.site.domain+";":";")+(a.site.secure?"secure":"")})($$FSR,window,window.document);