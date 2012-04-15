// Fireclick Netflame Web Analytics - COPYRIGHT 1999-2004 - Please do not modify this code
function handle() { return true; }

window.onerror = handle;
var fc_host = 'www.forever21.com';
document.write('<scr' + 'ipt ' + 'src="' + ((location.protocol == 'http:') ? 'http://a644.g.akamai.net/f/644/67/3h/' : 'https://a248.e.akamai.net/f/248/67/3h/ssl-')
+ 'hints.netflame.cc/service/sc' + 'ript/' + fc_host + '"></scr' + 'ipt>');

function fcce() { if (typeof (fcnf) != 'undefined') fcnf(); }

var fcfn = window.onload;

function fcco() { window.setTimeout('fcce();', 100); fcfn(); }

window.onload = null == fcfn ? fcce : fcco;
// Fireclick Netflame Web Analytics - COPYRIGHT 1999-2004 - Please do not modify this code