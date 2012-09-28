// Initialize with options
var $$FSR = {
    'timestamp': 'February 16, 2012 @ 1:00 PM',
    'version': '11.3.0',
    'enabled': true,
    'sessionreplay': true,
    'auto': true,
    'encode': false,
    'files': '/foreSee/',
    'id': 'ktoZdIQ4NtQZwo8Fkh11MA==',
    'definition': 'foresee-surveydef.js',
    'embedded': false,
    'replay_id': 'site.com',
    'renderer': 'W3C', // or "ASRECORDED"
    'layout': 'CENTERFIXED', // or "LEFTFIXED" or "LEFTSTRETCH" or "CENTERSTRETCH"
    'sites': [{
        name: 'toysrus.ca',
        path: 'toysrus.ca'
    },{
        name: 'toysrus.fr',
        path: 'toysrus.fr'
    },{
        name: 'toysrus.de',
        path: 'toysrus.de'
    },{
        name: 'toysrus.es',
        path: 'toysrus.es'
    },{
        name: 'toysrus.com',
        path: /\w+-?\w+\.(com|org|edu|gov|net|es|co\.uk)/
    }, {
        path: /\w+-?\w+\.(com|org|edu|gov|net|es|co\.uk)/
    }, {
        path: '.',
        domain: 'default'
    }],
    storageOption: 'cookie'
};
// -------------------------------- DO NOT MODIFY ANYTHING BELOW THIS LINE ---------------------------------------------
(function(a,g,d){for(var b=a.sites,c=0,h=b.length;c<h;c++){var e;"[object Array]"!==Object.prototype.toString.call(b[c].path)&&(b[c].path=[b[c].path]);for(var f=0,i=b[c].path.length;f<i;f++)if(e=d.location.href.match(b[c].path[f])){a.siteid=c;a.site=a.sites[c];a.site.domain?"default"==a.site.domain&&(a.site.domain=null):a.site.domain=e[0];a.site.secure||(a.site.secure=null);a.site.name||(a.site.name=e[0]);break}if(e)break}b={b:function(b){var j;j=(b=d.cookie.match("(?:^|;)\\s*"+b.replace(/([-.*+?^${}()|[\]\/\\])/g,
"\\$1")+"=([^;]*)"))?b[1]:null,b=j;a.encode&&(b=b?decodeURIComponent(b):null);return b},a:function(){d.cookie="fsr.a"+(a.site.cookie?"."+a.site.cookie:"")+"="+(new Date).getTime()+";path=/"+(a.site.domain?";domain="+a.site.domain+";":";")+(a.site.secure?"secure":"")}};if(!b.b("fsr.a"+(a.site.cookie?"."+a.site.cookie:"")))b.a(),g.fsr$timer=setInterval(b.a,1E3),d.cookie="fsr.paused=1;path=/"+(a.site.domain?";domain="+a.site.domain+";":";")+(a.site.secure?"secure":"")})($$FSR,window,window.document);