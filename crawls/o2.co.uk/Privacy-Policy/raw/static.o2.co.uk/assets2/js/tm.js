(function (w) {
w.tm2BootPosition = 0;
w.tm2BootAsync = true;
w.tmPageId = 1;
w.tmParam = {};
var conf = { host: 'pfa.levexis.com',
account: 'telefonicauk',
version: '3',
async: true,
cdn: (location.protocol === 'https:') ? 'sec.levexis.com' : 'res.levexis.com',
waitService: 'wt.tagman.com',
waitTest: false,
bootstrap: true,
param: w.tmParam || {} };
// do not change values below this line
function ap(sr , ol) {
var e = document.createElement('script'); 
e.src = sr;
e.async = true;
if (ol) {
e.onload = e.onerror = function() { if (!this.loaded) { ol(); this.loaded = true; } };
e.onreadystatechange = function() { if (this.readyState === 'complete' || this.readyState === 'loaded') { this.onload(); } };
}
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore( e , s);
}
w.TMAN = w.TMAN || {};
w.TMAN.startTime = +new Date();
w.TMAN.asyncLoader = function() {
TMAN.addContainer( new TMAN.Container(conf.account, w.tmPageId, conf) );
};
var tm = '//' + conf.cdn + '/clientfiles/v' + conf.version + '/' + conf.account + '.js'; 
if (conf.waitService && conf.waitTest) ap ( '//' + conf.waitService + '/wait/0/' + Math.random() , function() { TMAN.waitLatency=new Date() - TMAN.startTime; } );
if (conf.async) {
w.TMAN.position = {};
w.TMAN.doTags = function(p) { TMAN.currentPosition = p; };
w.TMAN.addParam = function(n,v) {
w.tmParam[n]=v;
};
ap(tm);
} else {
document.write('<script src="' + tm + '"><\/script>');
}
})(window);
