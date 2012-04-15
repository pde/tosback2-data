
//old
/*
setTimeout(function()
{
var url = "http" +
(/https:/.test(document.location.href) ? "s" : "") +
"://beacon.scorecardresearch.com/scripts/beacon.dll" +
"?c1=2&c2=6034816&c3=&c4="+escape(document.location.href)+
"&c5=&c6=&c7="+escape(document.location.href)+
"&c8="+escape(document.title)+
"&c9="+escape(document.referrer)+
"&c10="+escape(screen.width+'x'+screen.height)+
"&c15="+
"&rn=" + (new Date()).getTime();
var i = new Image();
i.src = url;
}, 1);
*/

//new
/*
document.write(unescape("%3Cscript src='" + (document.location.protocol == "https:" ? "https://sb" : "http://b")+ ".scorecardresearch.com/beacon.js' %3E%3C/script%3E"));
COMSCORE.beacon({
c1:2,
c2:"6034816",
c3:"",
c4:escape(document.location.href),
c5:"",
c6:"",
c15:""
});
*/

/* audience science */
function DM_prepClient(csid, client) {
if (csid == 'G10942') {
client.DM_addEncToLoc("adzone", "mso.site/"+lncInfo["mt_adzone"]);
    }
}
document.write(unescape("%3Cscript src='" + (document.location.protocol == "https:" ? "https://" : "http://")+ "js.revsci.net/gateway/gw.js?csid=G10942&auto=t' %3E%3C/script%3E"));

document.write(unescape("%3Cscript src='" + (document.location.protocol == "https:" ? "https://" : "http://")+ "s.skimresources.com/js/2948X595205.skimlinks.js' %3E%3C/script%3E"));

/*Nielsen Audience measurement Code */
function Nielsen_Event() {
    var d = new Image(1, 1);
    d.onerror = d.onload = function () {
      d.onerror = d.onload = null;
    };
    d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-404876h&cg=0&cc=1&si=", escape(window.location.href), "&rp=", escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
  };
Nielsen_Event();

