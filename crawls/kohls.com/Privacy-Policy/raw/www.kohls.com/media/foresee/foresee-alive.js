var $$FSR = {
   'timestamp': 'July 26, 2012 @ 1:42 PM',
   'version': '14.0.3',
   'enabled': true,
   'sessionreplay': true,
   'auto' : true,
   'encode' : false,
   'files': '/media/foresee/',
   //'swf_files': '__swf_files_' needs to be set when foresee-transport.swf is not located at 'files'
   'id': 'eZD0aL0T5IwKxKozKPZbGw==',
   'definition': 'foresee-surveydef.js',
   'embedded': false,
   'replay_id': 'site.com',
   'renderer':'W3C',	// or "ASRECORDED"
   'layout':'CENTERFIXED',	// or "LEFTFIXED" or "LEFTSTRETCH" or "CENTERSTRETCH"
   'pools' : [
      {
         path: '.',
         sp: 100  // CHANGE ONLY WHEN INCLUDING SESSION REPLAY
      }
   ],
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
for(var a=$$FSR,b=window.document,c=a.sites,d=0,e=c.length;d<e;d++){var f;"[object Array]"!==Object.prototype.toString.call(c[d].path)&&(c[d].path=[c[d].path]);for(var g=0,h=c[d].path.length;g<h;g++)if(f=b.location.href.toLowerCase().match(c[d].path[g])){a.siteid=d;a.site=a.sites[d];a.site.domain?"default"==a.site.domain&&(a.site.domain=null):a.site.domain=f[0];a.site.secure||(a.site.secure=null);a.site.name||(a.site.name=f[0]);break}if(f)break} b.cookie="fsr.a"+(a.site.cookie?"."+a.site.cookie:"")+"=suspended;path=/"+(a.site.domain?";domain="+a.site.domain+";":";")+(a.site.secure?"secure":"");