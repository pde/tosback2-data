var $$FSR = {
   'timestamp': 'February 13, 2013 @ 4:43 PM',
   'version': '15.3.7',
   'enabled': true,
   'frames' : false,
   'sessionreplay': true,
   'auto' : true,
   'encode' : false,
   'files': '/media/hottopic/foresee/',
   // needs to be set when foresee-transport.swf is not located at 'files'
   //'swf_files': '__swf_files_'
   'id': '2M1LYoZ3bRWhinbcuViTew==',
   'definition': 'foresee-surveydef.js',
   'embedded': false,
   'replay_id': 'hottopic.com',
   'attach': false,
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
		 //name: 'hottopic.com',
         path: /\w+-?\w+\.(com|org|edu|gov|net|co\.uk)/
      },
      {
		 //name: 'hottopic.com',
         path: '.',
         domain: 'default'
      }
   ],
   storageOption: 'cookie'
};

var FSRCONFIG = {};

// -------------------------------- DO NOT MODIFY ANYTHING BETWEEN THE DASHED LINES --------------------------------
(function(a,c,f){for(var c=a.sites,b=0,g=c.length;b<g;b++){var d;"[object Array]"!==Object.prototype.toString.call(c[b].path)&&(c[b].path=[c[b].path]);for(var e=0,h=c[b].path.length;e<h;e++)if(d=f.location.href.toLowerCase().match(c[b].path[e])){a.siteid=b;a.site=a.sites[b];a.site.domain?"default"==a.site.domain&&(a.site.domain=null):a.site.domain=d[0];a.site.secure||(a.site.secure=null);a.site.name||(a.site.name=d[0]);break}if(d)break}f.cookie="fsr.a"+(a.site.cookie?"."+a.site.cookie:"")+"=suspended;path=/"+
(a.site.domain?";domain="+a.site.domain+";":";")+(a.site.secure?"secure":"")})($$FSR,window,window.document);